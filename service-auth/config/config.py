from os import path, environ
from dotenv import load_dotenv

# Take environment variables from .env.
loadPath = path.join(path.dirname(__file__), '.env')
print(f'Loading Config from path: {loadPath}')
load_dotenv(loadPath)

CFG = {
    "env": environ.get('ENV', 'dev'),
    "secret": environ.get("SECRET_KEY", "localsess"),
    "whitelist": environ.get("CORS_WHITELIST", "http://localhost:3000"),
    "auth_url": environ.get('AUTH_REDIRECT_URL', "http://localhost:3000/"),
    "auth_scopes": environ.get("AUTH_SCOPES", "https://www.googleapis.com/auth/userinfo.profile"),
    "redis": environ.get("REDIS_HOST", 'redis://localhost:6379'),
    "mongo_host": environ.get("DB_CONNECTION_STRING", 'mongo://localhost:27017'),
    "mongo_db": environ.get("DB_CONNECTION_DB", 'auth')  
}

print(CFG)
