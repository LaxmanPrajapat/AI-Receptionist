
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCare";

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

          <StatCard
            title="Total Patients"
            value="1,240"
            icon={<Users />}
          />

          <StatCard
            title="Appointments"
            value="245"
            icon={<Calendar />}
          />

          <StatCard
            title="Doctors"
            value="28"
            icon={<UserCheck />}
          />

          <StatCard
            title="Cancelled"
            value="12"
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
              <LineChart data={appointmentData}>
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
                  data={patientData}
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
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="font-semibold mb-4">
              Today's Appointments
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span>Rahul Sharma</span>
                <span>10:00 AM</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Priya Singh</span>
                <span>11:30 AM</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Amit Kumar</span>
                <span>2:00 PM</span>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="font-semibold mb-4">
              Recent Activity
            </h2>

            <div className="space-y-4 text-sm">
              <p>✅ Appointment booked by Rahul</p>
              <p>🩺 Doctor available: Dr. Sharma</p>
              <p>❌ Appointment cancelled</p>
              <p>📅 New appointment scheduled</p>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}