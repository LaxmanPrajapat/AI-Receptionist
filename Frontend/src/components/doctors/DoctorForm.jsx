import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export default function DoctorForm({
  doctor,
  isEditing,
  onSave,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    qualification: "",
    experience: "",
    phone: "",
    email: "",
    room: "",
    startTime: "",
    endTime: "",
    status: "Available",
  });

  const handleChange = (e) => {
   setFormData({
  ...formData,
  [e.target.name]: e.target.value,
});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting doctor:", formData);
  onSave(formData);
    onSuccess();
  };
useEffect(() => {
  if (doctor) {
    setFormData(doctor);
  } else {
    setFormData({
      name: "",
      department: "",
      qualification: "",
      experience: "",
      phone: "",
      email: "",
      room: "",
      startTime: "",
      endTime: "",
      status: "Available",
    });
  }
}, [doctor]);
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div className="grid grid-cols-2 gap-5">

        <div>

          <label className="text-sm font-medium">
            Doctor Name
          </label>

          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Dr. Amit Sharma"
          />

        </div>

        <div>

          <label className="text-sm font-medium">
            Department
          </label>

          <Input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Cardiology"
          />

        </div>

        <div>

          <label className="text-sm font-medium">
            Qualification
          </label>

          <Input
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="MBBS, MD"
          />

        </div>

        <div>

          <label className="text-sm font-medium">
            Experience
          </label>

          <Input
            name="experience"
            type="number"
            value={formData.experience}
            onChange={handleChange}
            placeholder="10"
          />

        </div>

        <div>

          <label className="text-sm font-medium">
            Phone
          </label>

          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
          />

        </div>

        <div>

          <label className="text-sm font-medium">
            Email
          </label>

          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="doctor@gmail.com"
          />

        </div>

        <div>

          <label className="text-sm font-medium">
            Room Number
          </label>

          <Input
            name="room"
            value={formData.room}
            onChange={handleChange}
            placeholder="201"
          />

        </div>

        <div>

          <label className="text-sm font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full h-10 border rounded-md px-3"
          >
            <option>Available</option>
            <option>Busy</option>
            <option>On Leave</option>
          </select>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-5">

        <div>

          <label className="text-sm font-medium">
            Start Time
          </label>

          <Input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />

        </div>

        <div>

          <label className="text-sm font-medium">
            End Time
          </label>

          <Input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />

        </div>

      </div>

      <div className="flex justify-end gap-3">

        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
        >
          Cancel
        </Button>

        <Button type="submit">
          Save Doctor
        </Button>

      </div>

    </form>
  );
}