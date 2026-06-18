# 🏥 AI Hospital Appointment Scheduling System

An AI-powered hospital appointment scheduling system built with **Python**, **FastAPI**, and **SQLite**. The system enables AI voice agents and web applications to schedule, cancel, and manage patient appointments through REST APIs.

## 🚀 Project Overview

This project serves as the backend for an AI Receptionist that can:

* Schedule hospital appointments
* Cancel existing appointments
* Check doctor availability
* Retrieve appointments for a specific date
* Integrate with AI Voice Agents (VAPI, Retell, Bland, etc.)
* Provide a scalable foundation for healthcare automation

The frontend is currently under development. The backend APIs are fully functional and can be tested using Swagger UI, Postman, or AI Voice Agents.

---

## 🛠️ Tech Stack

### Backend

* Python 3.12+
* FastAPI
* SQLAlchemy
* SQLite
* Pydantic
* Uvicorn

### Integrations

* AI Voice Agents
* REST APIs
* Ngrok (for public testing)

---

## 📂 Project Structure

```bash
project/
│
├── backend.py          # FastAPI application
├── database.py         # Database models and configuration
├── appointments_db.db  # SQLite database
├── requirements.txt
└── README.md
```

---

## ✨ Features

### Schedule Appointment

Create a new appointment.

**Endpoint**

```http
POST /schedule_appointment/
```

**Request**

```json
{
  "patient_name": "John Doe",
  "reason": "General Checkup",
  "start_time": "2026-06-18T10:00:00"
}
```

---

### Cancel Appointment

Cancel appointments for a patient on a specific date.

**Endpoint**

```http
POST /cancel_appointment/
```

**Request**

```json
{
  "patient_name": "John Doe",
  "date": "2026-06-18"
}
```

---

### List Appointments

Retrieve all appointments for a given date.

**Endpoint**

```http
POST /list_appointments/
```

**Request**

```json
{
  "date": "2026-06-18"
}
```

---

## 🗄️ Database Schema

### Appointment

| Field        | Type     |
| ------------ | -------- |
| id           | Integer  |
| patient_name | String   |
| reason       | String   |
| start_time   | DateTime |
| canceled     | Boolean  |
| created_at   | DateTime |

---

## 🧪 Running Locally

### Clone Repository

```bash
git clone <repository-url>
cd project
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Backend

```bash
python backend.py
```

Server will start at:

```text
http://127.0.0.1:4444
```

Swagger Documentation:

```text
http://127.0.0.1:4444/docs
```

---

## 🔗 AI Agent Integration

The backend is designed to work with AI voice assistants.

Typical workflow:

1. Patient requests appointment.
2. AI collects date and time.
3. Backend checks availability.
4. AI confirms available slot.
5. Appointment is scheduled.
6. Confirmation is provided to the patient.

---

## 🔮 Future Roadmap

### Frontend Development

* React.js Dashboard
* Patient Portal
* Admin Dashboard

### AI Enhancements

* Natural Language Scheduling
* Doctor Availability Prediction
* Multi-language Voice Support
* Automated Appointment Reminders

### Production Features

* PostgreSQL Database
* JWT Authentication
* Role-Based Access Control
* Docker Deployment
* Cloud Hosting

---

## 👨‍💻 Author

Laxman Prajapat

BCA Student | AI & Machine Learning Developer | Backend Developer

Focused on building AI-powered automation and healthcare solutions.
