import traceback
from flask import jsonify, session, request

from routes import Query, db
from cspycore.performance import gzipResponse


@Query.route('/orders', methods=['GET'])
def viewOrders():
    # Collect Arguments
    user_name = request.args.get('user_name', None)
    limit = request.args.get('limit', None)

    data = []
    try:
        db.connect('history')
        if user_name:
            data = db.get({"user_name": user_name})
        else:
            # Check to see if data is already retreived
            user_name = 'for Admin'
            userType = session.get('user_type', None)
            searchData = session.get('search', None)

            if searchData and 'history' in searchData and userType != 'admin' and userType:
                print(searchData and 'history' in searchData )
                data = searchData['history']
            else:
                # Retrieve all data
                data = db.get()
                print(data)
                if userType and userType != 'admin':
                    session['search'] = {'history': data}

        if limit:
            if len(data) > int(limit):
                data = data[0:int(limit)]

        msg = f'Order(s) {user_name} found!'
        error = ''
    except Exception as e:
        print(str(e))
        print(traceback.format_exc())

        error = str(e)
        msg = 'Failed to retrieve Order(s)'
        data = None

    response = {'data': data, 'msg': msg, 'err': error}
    return gzipResponse(response)


@Query.route('/orders/<order_number>', methods=['GET'])
def viewOrderByOrderNumber(order_number):

    data = []
    try:
        db.connect('history')
        db.get({"order_number": order_number})

        msg = f'Order {order_number} found!'
        error = ''
    except Exception as e:
        print(str(e))
        print(traceback.format_exc())

        error = str(e)
        msg = 'Failed to retrieve Order(s)'
        data = None

    response = {'data': data, 'msg': msg, 'err': error}
    return gzipResponse(response)


@Query.route('/orders', methods=['POST'])
def addOrder():
    try:
        incomingData = request.json

        db.connect('history')
        db.save(incomingData)

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
    try:
        incomingData = request.json

        db.connect('history')
        db.update({'order_number': order_number}, incomingData)

        msg = 'Successfully saved Order!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to update Order'

    return jsonify({'data': '', 'msg': msg, 'err': error})


@Query.route('/orders/<order_number>', methods=['DELETE'])
def deleteOrder(order_number):
    db.connect('history')
    try:
        db.delete({'order_number': order_number})
        msg = 'Successfully deleted Order!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to delete Order'

    return jsonify({'data': '', 'msg': msg, 'err': error})
