import traceback
from flask import jsonify, session, request

from Routes import Query, db
from utils.perf import gzipResponse

@Query.route('/product', methods=['GET'])
def viewProducts():
    # Collect Arguments
    id = request.args.get('id', None)
    limit = request.args.get('limit', None)

    data = []
    try:
        db.connect('products')
        if id:
            data = db.get({"product_id": id})
        else:
            # Check Session to see if data has already been retrieved
            userType = session.get('user_type', None)
            searchData = session.get('search', None)

            if searchData and 'products' in searchData and userType != 'admin':
                data = searchData['products']
            else:
                # Retrieve all data
                data = db.get()
                #Sessions aren't working cross-origin
                #session['search'] = {'products': data[0:2]}

        msg = f'Product(s) {id} found!'
        error = ''

        if limit:
            if len(data) > int(limit):
                data = data[0:int(limit)]

    except Exception as e:
        print(str(e))
        print(traceback.format_exc())

        error = str(e)
        msg = 'Failed to retrieve Products(s)'
        data = None
    
    response = {'data': data, 'msg': msg, 'err':error}
    return gzipResponse(response) 

@Query.route('/product', methods=['POST'])
def addProducts():
    try:
        incomingData = request.json
        db.connect('products')
        db.save(incomingData)

        msg = 'Successfully saved Products!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to save Products'
    
    return jsonify({'data': "", 'msg': msg, 'err': error})  

@Query.route('/product/<id>', methods=['PUT'])
def updateProducts(id):
    try:
        incomingData = request.json
        db.connect('products')
        db.update({'_id':id}, incomingData)
        
        msg = 'Successfully saved Products!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to update Products'

    return jsonify({'data': '', 'msg': msg, 'err': error})  

@Query.route('/product/<id>', methods=['DELETE'])
def deleteProducts(id):
    try:
        db.connect('products')
        db.delete({'_id':id})

        msg = 'Successfully deleted Products!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to delete Products'

    response = {'data': '', 'msg': msg, 'err': error}
    return response 