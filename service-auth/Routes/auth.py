import traceback
from flask import jsonify, session, request

from Routes import Auth, db

@Auth.route('/check', methods=['GET'])
def checkAuth():
    try:
         if session.get('loggedIn'):
            msg = 'User is logged in!'
            data = {'user_name': session.get('user_name'), 'user_type': session.get('user_type')}
            error = ''
         else:
            msg = 'User is not logged in!'
            error = ''
            data = None
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to verify user'
        data = None
    
    return jsonify({'data': data, 'msg': msg, 'err':error})  

@Auth.route('/login', methods=['POST'])
def login():
    try:
        loginData = request.json
        username = loginData['user_name']
        password = loginData['password']

        db.connect('auth')
        data = db.get({"user_name": username, "password": password})
        user_type = data[0]['user_type']

        if data:
            session['loggedIn'] = True
            session['user_name'] = username
            session['user_type'] = user_type
            msg = 'User is logged in'
            error = ''
        else: 
            msg = 'Cant Login User'
            error = 'Credentials not found!'
            user_type = ''
    except Exception as e:
        print(traceback.format_exc())
        user_type = ''
        error = str(e)
        msg = 'Failed to login user'
    
    return jsonify({'user_type': user_type, 'msg': msg, 'err':error})  

@Auth.route('/logout', methods=['GET'])
def logout():
    try:
        session.clear()
        msg = 'User is logged out'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to logout user'
    
    return jsonify({'msg': msg, 'err':error})  
