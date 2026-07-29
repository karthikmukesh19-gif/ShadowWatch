from app.database import user_collection
from app.auth import hash_password

username = "admin"
password = "admin123"

existing_user = user_collection.find_one({"username": username})

if existing_user:
    print("Admin user already exists.")
else:
    user_collection.insert_one({
        "username": username,
        "password": hash_password(password),
        "role": "admin"
    })
    print("Admin user created successfully.")