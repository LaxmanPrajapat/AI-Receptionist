import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCare";

import {
  Users,
  Calendar,
  UserCheck,
  XCircle,
} from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Patients"
          value="120"
          icon={<Users />}
        />

        <StatCard
          title="Appointments"
          value="25"
          icon={<Calendar />}
        />

        <StatCard
          title="Available Doctors"
          value="8"
          icon={<UserCheck />}
        />

        <StatCard
          title="Cancelled"
          value="5"
          icon={<XCircle />}
        />

      </div>
    </DashboardLayout>
  );
}