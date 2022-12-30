import os, traceback
from dotenv import load_dotenv

from flask import Flask
from flask_cors import CORS
from flask_session import Session
import redis

# Take environment variables from .env.
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = Flask(__name__)
app.config.update(  SECRET_KEY=os.environ.get("SECRET_KEY", "localsess"), 
                    SESSION_COOKIE_NAME = "session_customer",
                    SESSION_COOKIE_SAMESITE="lax", 
                    SESSION_COOKIE_HTTPONLY=True,
                    SESSION_COOKIE_SECURE=True,

                    SESSION_TYPE = 'redis',
                    SESSION_PERMANENT = False,
                    SESSION_USE_SIGNER = True,
                    SESSION_REDIS = redis.from_url(os.environ.get("REDIS_HOST", "redis://127.0.0.1:6379")),
                    SESSION_PORT = 6890,

                )
CORS(app)
sess = Session()
sess.init_app(app)

from routes import Query
try:
    app.register_blueprint(Query)
except Exception as e:
    print(e)
    print(traceback.format_exc())

if __name__ == "__main__":
    #from werkzeug.middleware.profiler import ProfilerMiddleware
    #app.wsgi_app = ProfilerMiddleware(app.wsgi_app, restrictions=[10], profile_dir='./')
    app.run(host="0.0.0.0", debug=True, port=6890)
