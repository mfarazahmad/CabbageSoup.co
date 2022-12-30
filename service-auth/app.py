import os, traceback, datetime

from flask import Flask
from flask_cors import CORS
from flask_session import Session
from redis import Redis

from config.config import CFG

app = Flask(__name__)
app.config.update(  SECRET_KEY=CFG["secret"],
                    SESSION_COOKIE_NAME="session_auth",
                    SESSION_TYPE='redis',
                    SESSION_REDIS=Redis(host=CFG["redis"], port=6379),

                    SESSION_PERMANENT=False,
                    PERMANENT_SESSION_LIFETIME=datetime.timedelta(minutes=180),
                    SESSION_USE_SIGNER=True,
                    
                    SESSION_PORT=6889,
                    SESSION_COOKIE_HTTPONLY=False,
                    SESSION_COOKIE_SAMESITE="lax", 
                    SESSION_COOKIE_SECURE=False,
                    #SESSION_COOKIE_DOMAIN="127.0.0.1",
                )
CORS(app)
sess = Session()
sess.init_app(app)

from routes import Auth
try:
    app.register_blueprint(Auth)
except Exception as e:
    print(e)
    print(traceback.format_exc())

if __name__ == "__main__":
    #from werkzeug.middleware.profiler import ProfilerMiddleware
    #app.wsgi_app = ProfilerMiddleware(app.wsgi_app, restrictions=[10], profile_dir='./')
    app.run(host="0.0.0.0", debug=True, port=6889)
