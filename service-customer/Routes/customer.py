import traceback
from flask import jsonify, session, request

from Routes import Query, db
from cspycore.perforrmance import gzipResponse


@Query.route('/customer', methods=['GET'])
def viewCustomers():
    # Collect Arguments
    user_name = request.args.get('user_name', None)
    email = request.args.get('email', None)
    limit = request.args.get('limit', None)

    data = []
    try:
        db.connect('customers')
        if user_name:
            data = db.get({"user_name": user_name})
        elif email:
            collection = db.connect('customers')
            data = db.get({"email": email})
        else:
            # Check Session to see if data has already been retrieved
            userType = session.get('user_type', None)
            searchData = session.get('search', None)

            if searchData and 'customers' in searchData and userType != 'admin':
                data = searchData['customers']
            else:
                data = db.get()
                # Sessions aren't working cross-origin
                #session['search'] = {'customers': data}

        msg = f'Customer(s) {user_name} found!'
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

    response = {'data': data, 'msg': msg, 'err': error}
    return gzipResponse(response)


@Query.route('/customer', methods=['POST'])
def addCustomer():
    try:
        incomingData = request.json
        db.connect('customers')
        db.save(incomingData)

        msg = 'Successfully saved customer!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to save customer!'

    return jsonify({'data': "", 'msg': msg, 'err': error})


@Query.route('/customer/<user_name>', methods=['PUT'])
def updateCustomer(user_name):
    try:
        incomingData = request.json
        db.connect('customers')
        db.update({'user_name': user_name},  {"$set": incomingData})

        msg = 'Successfully saved customer!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to update customer'

    return jsonify({'data': '', 'msg': msg, 'err': error})


@Query.route('/customer/<user_name>', methods=['DELETE'])
def deleteCustomer(user_name):
    try:
        db.connect('customers')
        db.delete({'user_name': user_name})

        msg = 'Successfully deleted customer!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to delete customer'

    return jsonify({'data': '', 'msg': msg, 'err': error})
