from threading import Thread
import hashlib 
import Helpers
from pymongo import MongoClient

def initializeDatabase():
    client =  MongoClient()
    return client.RTO

class HashGenerator():

    def __init__(self, password):
        self.password = password
    
    def getHash(self):
        hasher = hashlib.sha256(bytes(self.password.encode())).hexdigest()
        return hasher


def auth(uid, password, db_instance):

    #use collection Users
    collection = db_instance.Users
    if collection.find_one({"user_id" : uid, "password" : password}
    ) is not None: return collection.find_one({"user_id" : uid, "password" : password})
    return False


def area_auth(area_name, area_password, db_instance):
    collection = db_instance.Admin
    data = collection.find_one({'name' : area_name, "Password" : area_password})
    if data is not None:
        return (True, data['name'])
    return (False, None)

def add_new_user(data, db_instance):
    collection = db_instance.Users
    collection.insert_one(data)

def get_user_by_area(area, db_instance):
    collection = db_instance.Users
    data = collection.find({"area" : area})
    users = []
    for user in data: 
        user.pop('_id', None)
        users.append(user)
    return users

def upload_document(user_id, document, document_name, file_name, file_tag, db):
    collection = db.Documents
    data = collection.insert_one({
        "user_id" : user_id,
        "document" : document,
        "document_name" : document_name,
        "file_name" : file_name,
        "file_tag" : file_tag
    })

def search_documents_by_user(user_id, db):
    collection = db.Documents
    data = collection.find({"user_id" : user_id})
    documents = []
    for d in data:
        del d['_id']
        del d['document']
        documents.append(d)
    return documents

def get_profile(user_id, db):

    collection = db.Users
    data = collection.find_one({"user_id" : user_id})
    del data['_id']
    return data

def get_single_document(user_id, document_name, db):

    collection = db.Documents
    data = collection.find_one({"user_id" : user_id, "document_name" : document_name})
    return Helpers.prepare_file_message(data)


def developer_auth(dev_id, password , db):

    collection = db.Developers
    data = collection.find_one({"dev_id" : dev_id, "password" : password})
    del data['_id']
    return data

def add_new_developer(dev_data, db):

    collection = db.Developers
    collection.insert_one({
        "dev_name" : dev_data['name'],
        "dev_id" : dev_data['dev_id'],
        "password" : dev_data['dev_password']
    })

def add_new_info(dev_id,dev_title, dev_content, db):
    collection = db.Articles
    collection.insert_one({
        "dev_id" : dev_id,
        "dev_title" : dev_title,
        "dev_content" : dev_content
    })
