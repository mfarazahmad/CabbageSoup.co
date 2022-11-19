import os, traceback
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

SQL_CONNECTION_STRING = os.environ.get("SQL_CONNECTION_STRING")
print(SQL_CONNECTION_STRING)

class SQL_DB():

    def __init__(self):
        self.db = create_engine(SQL_CONNECTION_STRING)
        
        print("Database opened successfully")

    def execute(self, query):
        self.db.execute(query)