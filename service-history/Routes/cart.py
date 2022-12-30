import traceback
from flask import jsonify, session, request

from routes import Query, db
from cspycore.performance import gzipResponse


@Query.route('/cart', methods=['GET'])
def getCart():
    try:
        cart = session.get('cart')
        print(cart)

        if cart:
            msg = 'Cart data available!'
        else:
            msg = 'Empty cart!'

        data = cart
        error = ''
    except Exception as e:
        print(str(e))
        print(traceback.format_exc())

        msg = 'Failed to retrieve cart'
        data = None
        error = str(e)

    response = {'data': data, 'msg': msg, 'err': error}
    return gzipResponse(response)


@Query.route('/cart', methods=['POST'])
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

    return jsonify({'msg': msg, 'err': error})
