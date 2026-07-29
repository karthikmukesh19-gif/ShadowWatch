from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

client = MongoClient(MONGODB_URI)

db = client["shadowwatch"]

threat_collection = db["threats"]
user_collection = db["users"]
audit_logs_collection = db["audit_logs"]
notification_collection = db["notifications"]