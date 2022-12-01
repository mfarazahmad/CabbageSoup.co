from flask import Blueprint
from flask_cors import CORS

from utils.repo import DB

Auth = Blueprint("Auth", __name__, url_prefix="/auth")
CORS(Auth)

@Auth.after_request
def middleware_for_response(response):
    # Allowing the credentials in the response.
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

#Connect to DB
db = DB()

from Routes.auth import *