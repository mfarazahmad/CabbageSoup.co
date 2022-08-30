import requests, traceback, gzip, json
from flask import Flask, Blueprint, jsonify, session, request, make_response

from Routes.Query import Query, db

@Query.route('/customer', methods=['GET'])
def viewCustomers():
    # Collect Arguments
    user_name = request.args.get('user_name', None)
    email = request.args.get('email', None)
    limit = request.args.get('limit', None)

    data = []
    try:
        if user_name:
            collection = db.connect('customers')
            document = collection.find_one({"user_name": user_name})
            del document['_id']
            data.append(document)  
        elif email:
            collection = db.connect('customers')
            document = collection.find_one({"email": email})
            del document['_id']
            data.append(document)  
        else:
            # Check Session to see if data has already been retrieved
            userType = session.get('user_type', None)
            searchData = session.get('search', None)

            if searchData and 'customers' in searchData and userType != 'admin':
                data = searchData['customers']
            else:
                collection = db.connect('customers')
                for document in collection.find():
                    del document['_id']
                    data.append(document)
                    #Sessions aren't working cross-origin
                    #session['search'] = {'customers': data}

        msg = 'Customer(s) {user_name} found!'
        error = ''

        if limit:
            if len(data) > int(limit):
                data = data[0:int(limit)]

    except Exception as e:
        print(str(e))
        print(traceback.format_exc())

        error = str(e)
        msg = 'Failed to retrieve customer(s)'
        data = None
    
    response = {'data': data, 'msg': msg, 'err':error}

    # Compress GET request for possible large payload
    content = gzip.compress(json.dumps(response).encode('utf8'), 5)

    response = make_response(content)
    response.headers['Content-length'] = len(content)
    response.headers['Content-Encoding'] = 'gzip' 

    return response

@Query.route('/customer', methods=['POST'])
def addCustomer():
    collection = db.connect('customers')
    try:
        incomingData = request.json
        result = collection.insert_one(incomingData)
        responseData = str(result.inserted_id)
        msg = 'Successfully saved customer!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to save customer!'
        responseData = None
    
    return jsonify({'data': responseData, 'msg': msg, 'err': error})  

@Query.route('/customer/<user_name>', methods=['PUT'])
def updateCustomer(user_name):
    collection = db.connect('customers')
    try:
        incomingData = request.json
        result = collection.update_one({'user_name':user_name},  {"$set": incomingData})
        msg = 'Successfully saved customer!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to update customer'
        responseData = None
    
    return jsonify({'data': '', 'msg': msg, 'err': error})  

@Query.route('/customer/<user_name>', methods=['DELETE'])
def deleteCustomer(user_name):
    collection = db.connect('customers')
    try:
        collection.delete_one({'user_name':user_name})
        msg = 'Successfully deleted customer!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to delete customer'
    
    return jsonify({'data': '', 'msg': msg, 'err': error})  
    