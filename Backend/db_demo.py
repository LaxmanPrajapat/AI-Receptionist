from database import appointments_collection

appointments = list(
    appointments_collection.find({})
)

for appointment in appointments:
    print(appointment)