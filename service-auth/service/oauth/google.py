import requests

def getAccessToken(payload):
    endpoint = "https://accounts.google.com/o/oauth2/token"

    r = requests.post(endpoint, payload)
    return r.json()['access_token']

def getUserInfo(token):
    endpoint = "https://www.googleapis.com/oauth2/v1/userinfo"
    headers = {'Content-Type': "application/json", 'Authorization': f"Bearer {token}"}

    r = requests.get(endpoint, headers=headers)
    return r.json()
