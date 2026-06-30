import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";
import { useEffect } from "react";

// Components (We'll create these next)
import DoctorTable from "../components/doctors/DoctorTable";
import DoctorDialog from "../components/doctors/DoctorDialog";
import {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/doctorApi";
export default function Doctors() {
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [dialogOpen, setDialogOpen] = useState(false);

 const [doctors, setDoctors] = useState([]);
const [selectedDoctor, setSelectedDoctor] = useState(null);

const [isEditing, setIsEditing] = useState(false);
const handleAddDoctor = async (doctor) => {
  try {
    await addDoctor({
      ...doctor,
      experience: Number(doctor.experience),
    });

    await loadDoctors();
  } catch (error) {
    console.error(error);
  }
};

const handleUpdateDoctor = async (doctor) => {
  try {
    await updateDoctor(doctor._id, {
      ...doctor,
      experience: Number(doctor.experience),
    });

    await loadDoctors();
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteDoctor = async (id) => {
  if (!window.confirm("Are you sure you want to delete this doctor?")) {
    return;
  }

  try {
    await deleteDoctor(id);
    await loadDoctors();
  } catch (error) {
    console.error(error);
  }
};

const loadDoctors = async () => {
  try {
    const response = await getDoctors();
    setDoctors(response.data);
  } catch (error) {
    console.error("Error loading doctors:", error);
  }
};
useEffect(() => {
  loadDoctors();
}, []);



  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Doctors
          </h1>

          <p className="text-slate-500 mt-1">
            Manage doctor information and availability
          </p>
        </div>

       <Button
  onClick={() => {
    setSelectedDoctor(null);
    setIsEditing(false);
    setDialogOpen(true);
  }}
>
  <Plus className="mr-2 h-4 w-4" />
  Add Doctor
</Button>

      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">

        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">

          <Input
            placeholder="Search doctor..."
            className="max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-md px-3 py-2"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Available</option>
            <option>Busy</option>
            <option>On Leave</option>
          </select>

        </div>
<DoctorTable
  doctors={doctors}
  search={search}
  statusFilter={statusFilter}
  onEdit={(doctor) => {
    setSelectedDoctor(doctor);
    setIsEditing(true);
    setDialogOpen(true);
  }}
  onDelete={handleDeleteDoctor}
/>

      </div>

      <DoctorDialog
  open={dialogOpen}
  setOpen={setDialogOpen}
  doctor={selectedDoctor}
  isEditing={isEditing}
  onSave={(doctorData) => {
    if (isEditing) {
      handleUpdateDoctor(doctorData);
    } else {
      handleAddDoctor(doctorData);
    }

    setDialogOpen(false);
    setSelectedDoctor(null);
    setIsEditing(false);
  }}
/>

    </DashboardLayout>
  );
}