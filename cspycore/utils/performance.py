import json, gzip
from flask import make_response

def gzipResponse(response: dict):
    # Compress GET request for possible large payload
    content = gzip.compress(json.dumps(response).encode('utf8'), 5)

    response = make_response(content)
    response.headers['Content-length'] = len(content)
    response.headers['Content-Encoding'] = 'gzip'
    return response
