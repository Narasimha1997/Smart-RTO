import base64
import hashlib

class HashGenerator():

    def __init__(self, password):
        self.password = password
    
    def getHash(self):
        hasher = hashlib.sha256(bytes(self.password.encode())).hexdigest()
        return hasher

def __bytes_from_string(string):
    return string.encode('utf-8')

def construct_file_from_encoding(encoded_string, file_name):
    data = __bytes_from_string(encoded_string)
    bytes_x86_64 = base64.b64decode(data.decode('utf-8'))
    with open('file.pdf', 'wb') as Writer:
        Writer.write(bytes_x86_64)
        Writer.close()

def __build_encoded_url_from_pieces(tag, string):
    return tag.lower()+','+string

def prepare_file_message(data):
    del data['_id']
    doc_name = data['document_name']
    file_name = data['file_name']
    url_encoded_string = __build_encoded_url_from_pieces(
        data['file_tag'], data['document']
    )
    type_ = "image" if "image" in data['file_tag'] else "document"
    return {
        "file_name" : file_name,
        "document_name" : doc_name,
        "url_string_basex64" : url_encoded_string,
        "document_type" : type_
    }
