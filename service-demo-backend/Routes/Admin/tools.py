from flask import jsonify

from routes.Admin import Admin, db

from scripts.dataGenerator import *

@Admin.route('/generate/data/save', methods=['GET'])
def saveGeneratedData():
    saveDataToDB(db)
    return jsonify({'msg':'Success!', 'err': ''})

@Admin.route('/generate/data/<type>', methods=['GET'])
def generateData():
    if type == 'inventory':
        generateInventory()
    elif type == 'customers':
        generateCustomers()
    elif type == 'orders':
        generateOrderHistory

    return jsonify({'msg':'Success!', 'err': ''})