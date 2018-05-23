import hashlib
import plyvel
from threading import Thread


DB_NAME = "./DATA/pwdstore"
DB_NAME_ADMIN = "./DATA/admin"

class HashGenerator():

    def __init__(self, password):
        self.password = password
    
    def getHash(self):
        hasher = hashlib.sha256(bytes(self.password.encode())).hexdigest()
        return hasher


def create_database():
    return plyvel.DB(name = DB_NAME, create_if_missing = True)


class AddNewUser():
    
    def __init__(self, uname, password, cache_reference, db):
        self.uname = uname
        self.password = password
        self.cache_reference = cache_reference
        self.db = db
    
    def run(self):
        hash_ = HashGenerator(password = self.password).getHash()
        self.db.put(bytes(self.uname.encode()), bytes(hash_.encode()))
        self.cache_reference.refresh()

class DatabaseUserSnapshot():

    def __init__(self, database):
        self.db = database
        self.cache = database.snapshot()
    
    def refresh(self):
        self.cache = self.db.snapshot()
    
    def search(self, uname, password):
        pwd_ = self.cache.get(bytes(uname.encode()))
        hash_ = HashGenerator(password = password).getHash()
        return True if (pwd_ is not None and hash_ == pwd_.decode()) else False

def create_admin_database():
    return plyvel.DB(name = DB_NAME_ADMIN, create_if_missing = True)

class AddNewAdminThread(Thread):

    def __init__(self, db_reference, password, region_name):
        Thread.__init__(self)
        self.db = db_reference
        self.password = password
        self.region_name = region_name
    
    def run(self):
        password = HashGenerator(password = self.password).getHash()
        self.db.put(
            bytes(self.region_name.encode()),
            bytes(password.encode())
        )

def search_for_admin(db_reference, password):
    if password is None:
        return (False, '')
    print(password)
    snapshot = db_reference
    pwd_ = HashGenerator(password).getHash().encode()
    for region, pass_ in snapshot:
        #print(region, pass_)
        if pass_ == pwd_:
            #print(region, pass_)
            return (True, region.decode())
    return (False, '')

#AddNewAdminThread(create_admin_database(), 'Prasanna', 'Banashankri').run()