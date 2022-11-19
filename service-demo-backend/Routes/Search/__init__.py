from flask import Flask, Blueprint
from flask_cors import CORS

from utils.DB import DB

Search = Blueprint("Search", __name__, url_prefix="/search")
CORS(Search)

#Connect to DB
db = DB()

from Routes.Search.search import *