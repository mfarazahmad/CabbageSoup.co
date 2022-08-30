import requests, traceback, json, gzip
from flask import Flask, Blueprint, jsonify, session, request, make_response

from Routes.Query import Query, db


@Query.route('/getCart', methods=['GET'])
def getCart():
    try:
        cart = session.get('cart')
        print(cart)

        if cart:
            msg = 'Cart data available!'
        else:
            msg = 'Failed to retrieve cart'
            
        data = cart
        error = ''
    except Exception as e:
        print(str(e))
        print(traceback.format_exc())

        msg = 'Failed to retrieve cart'
        data = None
        error = str(e)
    
    response = {'data': data, 'msg': msg, 'err':error}

    # Compress GET request for possible large payload
    content = gzip.compress(json.dumps(response).encode('utf8'), 5)

    response = make_response(content)
    response.headers['Content-length'] = len(content)
    response.headers['Content-Encoding'] = 'gzip' 
    
    return response

@Query.route('/saveCart', methods=['POST'])
def saveCart():
    try:
        cart = request.json
        print(cart)

        session['cart'] = cart
        msg = 'Saved user cart!'
        error = ''
    except Exception as e:
        print(str(e))
        print(traceback.format_exc())

        error = str(e)
        msg = 'Failed to save cart'
    
    return jsonify({'msg': msg, 'err':error})  


@Query.route('/orders', methods=['GET'])
def viewOrders():
    # Collect Arguments
    user_name = request.args.get('user_name', None)
    limit = request.args.get('limit', None)

    data = []
    try:
        if user_name:
            collection = db.connect('history')
            for document in collection.find({"user_name": user_name}):
                del document['_id']
                data.append(document)
        else:
            # Check to see if data is already retreived
            userType = session.get('user_type', None)
            searchData = session.get('search', None)

            if searchData and 'history' in searchData and userType != 'admin':
                data = searchData['history']
            else:
                # Retrieve all data
                collection = db.connect('history')
                for document in collection.find():
                    del document['_id']
                    data.append(document)
                    #Sessions aren't working cross-origin
                    #session['search'] = {'history': data}

        if limit:
            if len(data) > int(limit):
                data = data[0:int(limit)]

        msg = 'Order(s) {user_name} found!'
        error = ''
    except Exception as e:
        print(str(e))
        print(traceback.format_exc())

        error = str(e)
        msg = 'Failed to retrieve Order(s)'
        data = None

    response = {'data': data, 'msg': msg, 'err':error}

    # Compress GET request for possible large payload
    content = gzip.compress(json.dumps(response).encode('utf8'), 5)

    response = make_response(content)
    response.headers['Content-length'] = len(content)
    response.headers['Content-Encoding'] = 'gzip'
    
    return response 


@Query.route('/orders/<order_number>', methods=['GET'])
def viewOrderByOrderNumber(order_number):
    collection = db.connect('history')

    data = []
    try:
        for document in collection.find({"order_number": order_number}):
            del document['_id']
            data.append(document)

        msg = 'Order {order_number} found!'
        error = ''
    except Exception as e:
        print(str(e))
        print(traceback.format_exc())

        error = str(e)
        msg = 'Failed to retrieve Order(s)'
        data = None
    
    response = {'data': data, 'msg': msg, 'err':error}

    # Compress GET request for possible large payload
    content = gzip.compress(json.dumps(response).encode('utf8'), 5)

    response = make_response(content)
    response.headers['Content-length'] = len(content)
    response.headers['Content-Encoding'] = 'gzip'
    
    return response 

@Query.route('/orders', methods=['POST'])
def addOrder():
    collection = db.connect('history')

    try:
        incomingData = request.json
        result = collection.insert_many(incomingData)

        data = incomingData[0]['order_number']
        msg = 'Successfully saved order!'
        error = ''
    except Exception as e:
        print(str(e))
        print(traceback.format_exc())

        error = str(e)
        msg = 'Failed to save order!'
        data = None
    
    return jsonify({'data': data, 'msg': msg, 'err': error})  

@Query.route('/orders/<order_number>', methods=['PUT'])
def updateOrder(order_number):
    collection = db.connect('history')
    try:
        incomingData = request.json
        result = collection.update_one({'order_number':order_number}, incomingData)
        msg = 'Successfully saved Order!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to update Order'
        responseData = None
    
    return jsonify({'data': '', 'msg': msg, 'err': error})  

@Query.route('/orders/<order_number>', methods=['DELETE'])
def deleteOrder(order_number):
    collection = db.connect('history')
    try:
        collection.delete_one({'order_number':order_number})
        msg = 'Successfully deleted Order!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to delete Order'
    
    return jsonify({'data': '', 'msg': msg, 'err': error})