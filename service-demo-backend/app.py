import os, traceback
from dotenv import load_dotenv

from flask import Flask
from flask_cors import CORS
from flask_session import Session

from datetime import timedelta
from pymongo import MongoClient

# Take environment variables from .env.
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

DB_CONNECTION_STRING = os.environ.get("DB_CONNECTION_STRING")

app = Flask(__name__)
app.config.update(  SECRET_KEY=os.urandom(12).hex(), 
                    #SESSION_TYPE="mongodb",
                    SESSION_COOKIE_SAMESITE="None", 
                    SESSION_COOKIE_SECURE=True,
                    #PERMANENT_SESSION_LIFETIME=21600
                    #SESSION_MONGODB= MongoClient(DB_CONNECTION_STRING)
                )
CORS(app)
#sess = Session()
#sess.init_app(app)

from Routes.Query import Query
from Routes.Search import Search
from Routes.Analytics import Analytics
from Routes.Admin import Admin

try:
    app.register_blueprint(Admin)
    app.register_blueprint(Search)
    app.register_blueprint(Query)
    app.register_blueprint(Analytics)

except Exception as e:
    print(e)
    print(traceback.format_exc())

if __name__ == "__main__":
    #from werkzeug.middleware.profiler import ProfilerMiddleware
    #app.wsgi_app = ProfilerMiddleware(app.wsgi_app, restrictions=[10], profile_dir='./')
    app.run(host="0.0.0.0", debug=True, port=6888)
