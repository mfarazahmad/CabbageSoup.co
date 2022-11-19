from flask import Flask, Blueprint
from flask_cors import CORS

from utils.DB import DB

Query = Blueprint("Query", __name__, url_prefix="/query")
CORS(Query)

@Query.after_request
def middleware_for_response(response):
    # Allowing the credentials in the response.
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

#Connect to DB
db = DB()

from Routes.Query.customer import *
from Routes.Query.history import *
from Routes.Query.products import *
from Routes.Query.login import *