import os, traceback
from dotenv import load_dotenv

from flask import Flask
from flask_cors import CORS

from datetime import timedelta

# Take environment variables from .env.
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = Flask(__name__)
app.config.update(  SECRET_KEY=os.urandom(12).hex(), 
                    SESSION_COOKIE_SAMESITE="None", 
                    SESSION_COOKIE_SECURE=True,
                )
CORS(app)

from Routes import Auth
try:
    app.register_blueprint(Auth)
except Exception as e:
    print(e)
    print(traceback.format_exc())

if __name__ == "__main__":
    #from werkzeug.middleware.profiler import ProfilerMiddleware
    #app.wsgi_app = ProfilerMiddleware(app.wsgi_app, restrictions=[10], profile_dir='./')
    app.run(host="0.0.0.0", debug=True, port=6889)
