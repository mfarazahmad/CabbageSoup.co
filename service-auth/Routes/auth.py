import traceback, os

from flask import jsonify, session, request, redirect
import google_auth_oauthlib.flow as flow

from routes import Auth, db
from service.hasher import hashPassword, verifyUser
from service.oauth.google import getUserInfo, getAccessToken
from utils.helpers import openSecretsFile
from config.config import CFG

# Prevents OAuthlib from raising an error requiring HTTPS
if CFG['env'] == 'dev':
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

@Auth.route('/check', methods=['GET'])
def checkAuth():
    try:
        isLoggedIn = session.get('loggedIn')
        print(isLoggedIn)

        if isLoggedIn:
            resp = {
                'data':  {
                    'user_name': session.get('user_name'), 
                    'user_type': session.get('user_type')
                }, 
                'msg': 'User is logged in!', 
                'err':''
            }
        else:
            resp = {'data': None, 'msg': 'User is not logged in!', 'err':''}
    except Exception as e:
        print(traceback.format_exc())
        resp = {'data': None, 'msg': 'Failed to verify user', 'err':str(e)}
    
    return jsonify(resp)

@Auth.route('/create', methods=['POST'])
def createCreds():
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

            resp = {'user_type': loginData["user_type"], 'msg': 'Created User!', 'err':''}
        else: 
            resp = {'data': '', 'msg': 'Cant Login User', 'err':'Failed to create credentials!'}
    except Exception as e:
        print(traceback.format_exc())
        resp = {'data': '', 'msg': 'Failed to login user', 'err':str(e)}
    
    return jsonify(resp)

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

            resp = {'user_type': user_type, 'msg': 'Verified User!', 'err':''}
        else: 
            resp = {'user_type': '', 'msg': 'Cant Login User', 'err':'Credentials not found!'}
    except Exception as e:
        print(traceback.format_exc())
        resp = {'data': None, 'msg': 'Failed to login user', 'err':str(e)}
    
    return jsonify(resp)

@Auth.route('/oauth', methods=['GET'])
def oauth():
    try:
        # Setup a flow instance to authorize to Google
        scopes = CFG["auth_scopes"].split(',')
        authFlow = flow.Flow.from_client_secrets_file('oauthSecret.json', scopes=scopes)
        authFlow.redirect_uri = f'{CFG["auth_url"]}'

        auth_url, state = authFlow.authorization_url(
            access_type='offline',
            prompt='select_account',
            include_granted_scopes='true'
        )

        print(auth_url)

        # Redirect the user to Google for authorization
        return redirect(auth_url)
    except Exception as e:
        print(traceback.format_exc())
        return redirect(f'{CFG["auth_url"]}/?login=failed')

@Auth.route('/oauth/callback', methods=['POST'])
def oauthCallback():
    try:
        auth = request.json
        print(auth)

        oauthSecret = openSecretsFile()
        payload = {
            "code": auth['code'],	
            "grant_type":"authorization_code",
            "redirect_uri": CFG["auth_url"],
            "client_secret": oauthSecret['client_secret'],	
            "client_id": oauthSecret['client_id']
        }

        token = getAccessToken(payload)
        userInfo = getUserInfo(token)

        # Store the auth creds in session
        session["credentials"] = token
        session["loggedIn"] = True
        session["user_name"] = userInfo["given_name"]
        session["user_type"] = "admin"

        resp = {'data': session['user_name'], 'msg': 'Verified User!', 'err':""}
    except Exception as e:
        print(traceback.format_exc())
        resp = {'data': None, 'msg': 'Failed to verify user', 'err':str(e)}
    
    return jsonify(resp) 

@Auth.route('/logout', methods=['GET'])
def logout():
    try:
        session.clear()
        resp = {'msg': 'User is logged out', 'err':''}
    except Exception as e:
        print(traceback.format_exc())
        resp = {'msg': 'Failed to logout user', 'err':str(e)}
    
    return jsonify(resp)