from flask import Blueprint
import os
from flask_cors import CORS

from config.config import CFG

from cspycore.repo import DB

Auth = Blueprint("Auth", __name__, url_prefix="/auth")
CORS(Auth, CORS_ORIGINS=CFG["whitelist"].split(','))

@Auth.after_request
def middleware_for_response(response):
    # Allowing the credentials in the response.
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


# Connect to DB
db = DB(CFG["mongo_host"], CFG["mongo_db"])

from routes.auth import *