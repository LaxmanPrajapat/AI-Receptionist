from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise ValueError("MONGODB_URI not found in .env")

client = MongoClient(MONGODB_URI)

db = client["hexa_ai"]

appointments_collection = db["appointments"]
doctors_collection = db["doctors"]


def init_db():
    print("MongoDB Connected Successfully")


def get_db():
    return db