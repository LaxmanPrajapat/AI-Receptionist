# Step1: Import Database objects
from fastapi.middleware.cors import CORSMiddleware
from database import init_db, appointments_collection
from fastapi import FastAPI, HTTPException
from fastapi import APIRouter


init_db()

# Step3: Create Data Contracts using Pydantic Models
import datetime as dt
from pydantic import BaseModel

class AppointmentRequest(BaseModel):
    patient_name: str
    reason: str
    mobile:str
    start_time: dt.datetime

class AppointmentResponse(BaseModel):
    id: str
    patient_name: str
    reason: str | None
    mobile:str
    start_time: dt.datetime
    canceled: bool
    created_at: dt.datetime

class CancelAppointmentRequest(BaseModel):
    patient_name: str
    date: dt.date

class CancelAppointmentResponse(BaseModel):
    canceled_count: int

class ListAppointmentRequest(BaseModel):
    date: dt.date




app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# schedule appt

@app.post("/schedule_appointment/")
def schedule_appointment(request: AppointmentRequest):
    
    appointment_data = {
        "patient_name": request.patient_name,
        "reason": request.reason,
        "mobile":request.mobile,
        "start_time": request.start_time,
        "canceled": False,
        "created_at": dt.datetime.utcnow()
    }

    result = appointments_collection.insert_one(appointment_data)

    return AppointmentResponse(
        id=str(result.inserted_id),
        patient_name=request.patient_name,
        reason=request.reason,
        mobile=request.mobile,
        start_time=request.start_time,
        canceled=False,
        created_at=appointment_data["created_at"]
    )

@app.post("/cancel_appointment/")
def cancel_appointment(request: CancelAppointmentRequest):

    start_dt = dt.datetime.combine(request.date, dt.time.min)
    end_dt = start_dt + dt.timedelta(days=1)

    result = appointments_collection.update_many(
        {
            "patient_name": request.patient_name,
            "start_time": {
                "$gte": start_dt,
                "$lt": end_dt
            },
            "canceled": False
        },
        {
            "$set": {"canceled": True}
        }
    )

    if result.modified_count == 0:
        raise HTTPException(
            status_code=404,
            detail="No matching appointment found"
        )

    return CancelAppointmentResponse(
        canceled_count=result.modified_count
    )
# list appt
@app.post("/list_appointments/")
def list_appointments(request: ListAppointmentRequest):

    start_dt = dt.datetime.combine(request.date, dt.time.min)
    end_dt = start_dt + dt.timedelta(days=1)

    appointments = appointments_collection.find(
        {
            "canceled": False,
            "start_time": {
                "$gte": start_dt,
                "$lt": end_dt
            }
        }
    ).sort("start_time", 1)

    booked_appointments = []

    for appointment in appointments:
        booked_appointments.append(
            AppointmentResponse(
                id=str(appointment["_id"]),
                patient_name=appointment["patient_name"],
                reason=appointment.get("reason"),
                mobile=appointment.get("mobile", "N/A"),
                start_time=appointment["start_time"],
                canceled=appointment["canceled"],
                created_at=appointment["created_at"]
            )
        )

    return booked_appointments


@app.get("/patients/")
async def get_all_patients():
    patients = list(appointments_collection.find({}, {"_id": 0}))

    return patients
# dashboard.py

@app.get("/dashboard")
async def get_dashboard():

    appointments = list(appointments_collection.find())

    total_patients = len(
        set(
            appointment.get("mobile")
            for appointment in appointments
            if appointment.get("mobile")
        )
    )

    total_appointments = len(appointments)

    total_cancelled = sum(
        1
        for appointment in appointments
        if appointment.get("canceled", False)
    )

    total_doctors = 0   # Replace later with doctors collection

    return {
        "total_patients": total_patients,
        "total_appointments": total_appointments,
        "total_cancelled": total_cancelled,
        "total_doctors": total_doctors,

        "appointment_trend": [],

        "patient_analytics": [],

        "today_appointments": [],

        "recent_activity": []
    }
import uvicorn
if __name__ == "__main__":
    uvicorn.run("backend:app", host="127.0.0.1", port=4444, reload=True)