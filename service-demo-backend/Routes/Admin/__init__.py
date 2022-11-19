from flask import Flask, Blueprint
from flask_cors import CORS

from utils.DB import DB

Admin = Blueprint("Admin", __name__, url_prefix="/admin")
CORS(Admin)

#Connect to DB
db = DB()

from Routes.Admin.tools import *
