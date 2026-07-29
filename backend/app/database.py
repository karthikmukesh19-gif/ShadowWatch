from pymongo import MongoClient


client = MongoClient("mongodb://localhost:27017")

db = client["shadowwatch"]

threat_collection = db["threats"]
user_collection = db["users"]
audit_logs_collection = db["audit_logs"]
notification_collection = db["notifications"]