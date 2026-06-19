from pymongo import MongoClient


# Local MongoDB Compass connection
MONGO_URL = "mongodb://localhost:27017"
client = MongoClient(MONGO_URL)

# Database Name
db = client["hexa_ai"]

# Collection Name
appointments_collection = db["appointments"]


def init_db():
    print("MongoDB Connected Successfully")


def get_db():
    return appointments_collection