from argon2 import PasswordHasher

def verifyUser(hash: str, password: str) -> bool:
    ph = PasswordHasher()
    return ph.verify(hash, password)

def hashPassword(password: str) -> str:
    ph = PasswordHasher()
    return ph.hash(password)
    
