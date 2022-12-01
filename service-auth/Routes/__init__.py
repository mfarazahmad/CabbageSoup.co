from flask import Blueprint
from flask_cors import CORS
import os

from cspycore.utils.repo import DB

Auth = Blueprint("Auth", __name__, url_prefix="/auth")
CORS(Auth)


@Auth.after_request
def middleware_for_response(response):
    # Allowing the credentials in the response.
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


# Connect to DB
db = DB(os.environ.get("DB_CONNECTION_STRING"), 'auth')

from Routes.auth import *