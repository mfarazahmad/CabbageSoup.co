import traceback, os

from flask import jsonify, session, request, redirect, url_for
import google_auth_oauthlib.flow as flow

from Routes import Auth, db
from service.hasher import hashPassword, verifyUser

# Prevents OAuthlib from raising an error requiring HTTPS
if os.environ.get('ENV') == 'dev':
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

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

@Auth.route('/create/credentials', methods=['POST'])
def createAuthCreds():
    try:
        loginData = request.json

        hashedPassword = hashPassword(loginData['password'])
        loginData['password'] = hashedPassword

        db.connect('auth')
        data = db.save(loginData)

        if data:
            session['loggedIn'] = True
            session['user_name'] = loginData["user_name"]
            session['user_type'] = loginData["user_type"]
            msg = 'User is logged in'
            error = ''
            user_type = loginData["user_type"]
        else: 
            msg = 'Cant Login User'
            error = 'Failed to create credentials!'
            user_type = ''
    except Exception as e:
        print(traceback.format_exc())
        user_type = ''
        error = str(e)
        msg = 'Failed to login user'
    
    return jsonify({'data': user_type, 'msg': msg, 'err':error})

@Auth.route('/login', methods=['POST'])
def login():
    try:
        loginData = request.json
        
        hashedPassword = hashPassword(loginData['password'])

        db.connect('auth')
        data = db.get({"user_name": loginData['user_name'], "password": hashedPassword})
        user_type = data[0]['user_type']

        verifyCorrectPass = verifyUser(hashedPassword, loginData['password'])

        if data and verifyCorrectPass:
            session['loggedIn'] = True
            session['user_name'] = loginData['user_name']
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

@Auth.route('/oauth', methods=['GET'])
def oauthLogin():
    try:
        # Setup a flow instance to authorize to Google
        authFlow = flow.Flow.from_client_secrets_file('oauthSecret.json', scopes=["https://www.googleapis.com/auth/cloud-platform.read-only"])
        authFlow.redirect_uri = url_for('Auth.oauthLoginCallback', _external=True)

        authorization_url, state = authFlow.authorization_url(
            access_type='offline',
            prompt='select_account',
            include_granted_scopes='true'
        )

        session['state'] = state

        # Redirect the user to Google for authorization
        return redirect(authorization_url)

    except Exception as e:
        print(str(e))
        return redirect("http://localhost:3000/")

@Auth.route('/oauth/callback', methods=['GET'])
def oauthLoginCallback():
    try:
        state = session['state']

         # Resetup the same flow state to verify the auth to Google
        cbFlow = flow.Flow.from_client_secrets_file('oauthSecret.json', scopes=["https://www.googleapis.com/auth/cloud-platform.read-only"], state=state)
        cbFlow.redirect_uri = url_for('Auth.oauthLoginCallback', _external=True)

        # Verify the authorization flow worked out
        authorization_response = request.url
        cbFlow.fetch_token(authorization_response=authorization_response)

        # Store the auth creds in session
        session['credentials'] = credentials_to_dict(cbFlow.credentials)
        session['loggedIn'] = True
        session['user_name'] = "Faraz"
        session['user_type'] = "admin"

        # Redirect to the frontend
        return redirect(os.environ.get('AUTH_REDIRECT_URL', "http://localhost:3000/"))
    except Exception as e:
        print(str(e))
        return redirect("http://localhost:3000/")

def credentials_to_dict(credentials):
  return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}

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

