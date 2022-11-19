import traceback, gzip, json
from flask import Flask, jsonify, session, request, make_response

from Routes.Query import Query, db

@Query.route('/product', methods=['GET'])
def viewProducts():
    # Collect Arguments
    id = request.args.get('id', None)
    limit = request.args.get('limit', None)

    data = []
    try:
        if id:
            collection = db.connect('products')
            document = collection.find_one({"product_id": id})
            del document['_id']
            data.append(document)
        else:
            # Check Session to see if data has already been retrieved
            userType = session.get('user_type', None)
            searchData = session.get('search', None)

            if searchData and 'products' in searchData and userType != 'admin':
                data = searchData['products']
            else:
                # Retrieve all data
                collection = db.connect('products')
                for document in collection.find():
                    del document['_id']
                    data.append(document)
                #Sessions aren't working cross-origin
                #session['search'] = {'products': data[0:2]}

        msg = 'Product(s) {id} found!'
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

    # Compress GET request for possible large payload
    content = gzip.compress(json.dumps(response).encode('utf8'), 5)

    response = make_response(content)
    response.headers['Content-length'] = len(content)
    response.headers['Content-Encoding'] = 'gzip'
    
    return response 

@Query.route('/product', methods=['POST'])
def addProducts():
    collection = db.connect('products')
    try:
        incomingData = request.json
        result = collection.insert_one(incomingData)
        responseData = str(result.inserted_id)
        msg = 'Successfully saved Products!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to save Products'
        responseData = None
    
    return jsonify({'data': responseData, 'msg': msg, 'err': error})  

@Query.route('/product/<id>', methods=['PUT'])
def updateProducts(id):
    collection = db.connect('products')
    try:
        incomingData = request.json
        result = collection.update_one({'_id':id}, incomingData)
        msg = 'Successfully saved Products!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to update Products'
        responseData = None
    
    return jsonify({'data': '', 'msg': msg, 'err': error})  

@Query.route('/product/<id>', methods=['DELETE'])
def deleteProducts(id):
    collection = db.connect('products')
    try:
        print(id)
        collection.delete_one({'_id':id})
        msg = 'Successfully deleted Products!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to delete Products'


    response = {'data': '', 'msg': msg, 'err': error}

    # Compress GET request for possible large payload
    content = json.dumps(response).encode('utf8')

    response = make_response(content)
    response.headers['Content-length'] = len(content)
    response.headers['Content-Encoding'] = 'gzip'
    response.headers['Access-Control-Allow-Origin'] = '*'
    
    return response 