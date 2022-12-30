from flask import Flask, Blueprint
from flask_cors import CORS

from utils.DB import DB

Analytics = Blueprint("Analytics", __name__, url_prefix="/analytics")
CORS(Analytics)

@Analytics.after_request
def middleware_for_response(response):
    # Allowing the credentials in the response.
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

#Connect to DB
db = DB()

from routes.Analytics.charts import *
