from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from Helpers import HashGenerator
import Utils_Mongo
import random


current_hash = HashGenerator(
    password = "mygovkey"+str(random.randint(a = 10, b = 1000))
).getHash()

print(current_hash)


#get an instance of DB:
db = Utils_Mongo.initializeDatabase()

app = Flask(__name__)
CORS(app)

@app.route('/add_user', methods = ['POST'])
@cross_origin()
def add_user():
    data = request.get_json()
    Utils.AddNewUser(
        uname = data['name'],
        password = data['password'],
        cache_reference = cache,
        db = db
    ).run()
    return jsonify({
        'success' : True
    })

@app.route('/simple_auth' , methods = ['POST'])
@cross_origin()
def simple_auth():

    data = request.get_json()
    return jsonify({
        'success' : True
    }) if Utils_Mongo.auth(data['name'], data['password'], db) else jsonify({
        'success' : False
    })

@app.route('/admin_auth', methods = ['POST'])
@cross_origin()
def admin_auth():
    data = request.get_json()
    success, region = Utils_Mongo.area_auth(data['area'], data['password'], db)
    return jsonify({
        'success' : success,
        'region' : region
    })
    
@app.route('/new_user', methods = ['POST'])
@cross_origin()
def add_new_user():
    data = request.get_json()['data']
    print(data)
    Utils_Mongo.add_new_user(data, db)
    return jsonify({
        'success' : True,
        'message' : 'Successful registration'
    })

@app.route('/get_user_by_area', methods = ['POST'])
@cross_origin()
def get_user_by_area():
    area = request.get_json()['area']
    return jsonify({
        'success' : True,
        'result' : Utils_Mongo.get_user_by_area(area, db)
    })

@app.route('/get_profile', methods = ['POST'])
@cross_origin()
def get_profile():
    user_id = request.get_json()['user_id']
    return jsonify(Utils_Mongo.get_profile(user_id, db))

@app.route('/upload_document', methods = ['POST'])
@cross_origin()
def upload_document():
    data = request.get_json()
    Utils_Mongo.upload_document(
        data['user_id'],
        data['document'],
        data['document_name'],
        data['file_name'],
        data['file_tag'],
        db
    )
    return jsonify({'success' : True})

@app.route('/get_single_document', methods = ['POST'])
def get_single_document():

    return jsonify(
        Utils_Mongo.get_single_document(
            request.get_json()['user_id'],
            request.get_json()['document_name'],
            db
        )
    )

@app.route('/api/document', methods = ['POST'])
def api_document():
    data = request.get_json()
    if data['api_key'] == current_hash :
        return jsonify(
        Utils_Mongo.get_single_document(
            request.get_json()['user_id'],
            request.get_json()['document_name'],
            db
        )
    ) 
    else : return jsonify({'status' : '500', 'error' : "Invalid API Key"})

@app.route('/get_documents_of_user', methods = ['POST'])
@cross_origin()
def get_documents_of_user():
    user_id = request.get_json()['user_id']
    return jsonify({
        'status' : 'ok',
        'doc_list' : Utils_Mongo.search_documents_by_user(user_id, db)
    })

@app.route('/get_api_key', methods = ['POST'])
def get_api_key():
    data = request.get_json()
    name = data['name']
    password = data['password']
    return jsonify({
        'api_key' : current_hash
    })

@app.route('/developer_auth', methods = ['POST'])
@cross_origin()
def dev_auth():
    data = request.get_json()
    dev_id = data['dev_id']
    password = data['password']
    if Utils_Mongo.developer_auth(dev_id, password, db):
        return jsonify({
            "success" : True
        })
    else: jsonify({"success" : False})

@app.route('/developer_create', methods = ['POST'])
@cross_origin()
def developer_create():
    data = request.get_json()
    Utils_Mongo.add_new_developer(data , db)
    return jsonify({"success" : True})

@app.route('/add_new', methods = ['POST'])
def developer_add_new():
    data = request.get_json()
    title = data['title']
    text = data['text']
    

app.run(host = '192.168.43.190')