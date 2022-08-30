from flask import Flask, Blueprint
from flask_cors import CORS

from utils.DB import DB

Analytics = Blueprint("Analytics", __name__, url_prefix="/analytics")
CORS(Analytics)

#Connect to DB
db = DB()

from Routes.Analytics.charts import *
