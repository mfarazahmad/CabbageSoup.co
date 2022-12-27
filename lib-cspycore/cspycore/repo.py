import traceback
from pymongo import MongoClient
#import certifi

class DB():
    def __init__(self, host:str, dbName: str):
        client = MongoClient(host) #, tlsCAFile=certifi.where())
        self.db = client[dbName]
        self.collection = None

    def connect(self, collection):
        try:
            db = self.db
            self.collection = db[collection]
        except Exception as e:
            print(e)
            print(traceback.format_exc())

    def get(self, query=None) -> list:
        data = []
        if query:
            for document in self.collection.find(query):
                del document['_id']
                data.append(document)
        else:
            for document in self.collection.find():
                del document['_id']
                data.append(document)
        return data

    def save(self, data):
        if data == isinstance(list):
            self.collection.insert_many(data)
        else:
            self.collection.insert_one(data)

    def update(self, query, data):
        self.collection.update_one(query, data)

    def delete(self, query):
        self.collection.delete_one(query)