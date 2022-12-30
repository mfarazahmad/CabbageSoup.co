import json

def credsToDict(creds):
  return {'token': creds.token,
          'refresh_token': creds.refresh_token,
          'token_uri': creds.token_uri,
          'client_id': creds.client_id,
          'client_secret': creds.client_secret,
          'scopes': creds.scopes}


def openSecretsFile():
  f = open('oauthSecret.json')
  data = json.load(f)
  return data['web']
