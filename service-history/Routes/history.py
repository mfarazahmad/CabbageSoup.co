import traceback
from flask import jsonify, session, request

from Routes import Query, db
from lib_web_python.utils.perforrmance import gzipResponse


@Query.route('/orders', methods=['GET'])
def viewOrders():
    # Collect Arguments
    user_name = request.args.get('user_name', None)
    limit = request.args.get('limit', None)

    data = []
    try:
        db.connect('orders')
        if user_name:
            data = db.get({"user_name": user_name})
        else:
            # Check to see if data is already retreived
            userType = session.get('user_type', None)
            searchData = session.get('search', None)

            if searchData and 'history' in searchData and userType != 'admin':
                data = searchData['history']
            else:
                # Retrieve all data
                data = db.get()
                # Sessions aren't working cross-origin
                #session['search'] = {'history': data}

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
        db.connect('orders')
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

        db.connect('orders')
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

        db.connect('orders')
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
    db.connect('orders')
    try:
        db.delete({'order_number': order_number})
        msg = 'Successfully deleted Order!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to delete Order'

    return jsonify({'data': '', 'msg': msg, 'err': error})
