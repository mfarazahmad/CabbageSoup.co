import os, traceback
from pymongo import MongoClient

DB_CONNECTION_STRING = os.environ.get("DB_CONNECTION_STRING")
print(DB_CONNECTION_STRING)

class DB():
    def __init__(self):
        client = MongoClient(DB_CONNECTION_STRING)
        self.db = client['analytics']
        self.collection = None

    def connect(self, collection):
        try:
            db = self.db
            self.collection = db[collection]
            return self.collection
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return None

    def select(self):
        pass

    def insert(self, data):
        pass

    def update(self, identifier, data):
        pass

    def delete(self, identifier, data):
        pass