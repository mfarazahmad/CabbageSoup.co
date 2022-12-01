from flask import Blueprint
from flask_cors import CORS

from utils.repo import DB

Query = Blueprint("Query", __name__, url_prefix="/query")
CORS(Query)

@Query.after_request
def middleware_for_response(response):
    # Allowing the credentials in the response.
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

#Connect to DB
db = DB()

from Routes.products import *