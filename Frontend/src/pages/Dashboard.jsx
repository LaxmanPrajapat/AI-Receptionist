
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCare";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log(BACKEND_URL)
import {
  Users,
  Calendar,
  UserCheck,
  XCircle,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const appointmentData = [
  { day: "Mon", appointments: 12 },
  { day: "Tue", appointments: 18 },
  { day: "Wed", appointments: 25 },
  { day: "Thu", appointments: 15 },
  { day: "Fri", appointments: 28 },
  { day: "Sat", appointments: 20 },
];

const patientData = [
  { name: "New", value: 70 },
  { name: "Returning", value: 30 },
];

const COLORS = ["#2563eb", "#06b6d4"];

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
  total_patients: 0,
  total_appointments: 0,
  total_cancelled: 0,
  total_doctors: 0,
  appointment_trend: [],
  patient_analytics: [],
  today_appointments: [],
  recent_activity: [],
});

const [loading, setLoading] = useState(true);
const fetchDashboard = async () => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/dashboard`
    );

    setDashboard(res.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchDashboard();
}, []);
  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Hospital Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor appointments, doctors and patient activity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
       <Link to="/patients" style={{ textDecoration: 'none', color: 'inherit' }}>
          <StatCard
            title="Total Patients"
           value={loading ? "..." : dashboard.total_patients}
            icon={<Users />}
          />
</Link>
          
           <Link to="/appointments" style={{ textDecoration: 'none', color: 'inherit' }}>
      <StatCard 
        title="Appointments"
       value={loading ? "..." : dashboard.total_appointments}
        icon={<Calendar />}
      />
    </Link>

        <Link
  to="/doctors"
  style={{ textDecoration: "none", color: "inherit" }}
>
  <StatCard
    title="Doctors"
    value={loading ? "..." : dashboard.total_doctors}
    icon={<UserCheck />}
  />
</Link>

          <StatCard
            title="Cancelled"
            value={loading ? "..." : dashboard.total_cancelled}
            icon={<XCircle />}
          />

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Appointment Trend */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="font-semibold mb-4">
              Appointment Trend
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              data={dashboard.appointment_trend}
              <LineChart data={dashboard.appointment_trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Patient Analytics */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="font-semibold mb-4">
              Patient Analytics
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboard.patient_analytics}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {patientData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Today's Appointments */}
          <div className="space-y-3">
  {dashboard.today_appointments.map((item, index) => (
    <div
      key={index}
      className="flex justify-between border-b pb-2"
    >
      <span>{item.patient_name}</span>
      <span>{item.time}</span>
    </div>
  ))}
</div>
<div className="space-y-4 text-sm">
  {dashboard.recent_activity.map((activity, index) => (
    <p key={index}>• {activity}</p>
  ))}
</div>
        

        </div>

      </div>
    </DashboardLayout>
  );
}