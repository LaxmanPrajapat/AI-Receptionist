import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pencil,
  Trash2,
  Clock,
  Stethoscope,
} from "lucide-react";

export default function DoctorTable({
  doctors,
  search,
  statusFilter,
  onEdit,
  onDelete,
}){
  const filteredDoctors = doctors.filter((doctor) => {
const matchesSearch =
  (doctor.name || "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||
  (doctor.department || "")
    .toLowerCase()
    .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      doctor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-lg border overflow-hidden">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>Doctor</TableHead>

            <TableHead>Department</TableHead>

            <TableHead>Working Hours</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {filteredDoctors.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={5}
                className="text-center py-8 text-slate-500"
              >
                No doctors found.
              </TableCell>

            </TableRow>

          ) : (

            filteredDoctors.map((doctor) => (

              <TableRow key={doctor.id}>

                <TableCell>

                  <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">

                      <Stethoscope className="h-5 w-5 text-slate-600" />

                    </div>

                    <div>

                      <p className="font-semibold">
                        {doctor.name}
                      </p>

                    </div>

                  </div>

                </TableCell>

                <TableCell>
                  {doctor.department}
                </TableCell>

                <TableCell>

                  <div className="flex items-center gap-2">

                    <Clock className="h-4 w-4 text-slate-500" />

                    {doctor.startTime} - {doctor.endTime}

                  </div>

                </TableCell>

                <TableCell>

                  <Badge
                    variant={
                      doctor.status === "Available"
                        ? "default"
                        : doctor.status === "Busy"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {doctor.status}
                  </Badge>

                </TableCell>

                <TableCell>

          <div className="flex justify-end gap-2">

  <Button
    size="icon"
    variant="outline"
    onClick={() => onEdit(doctor)}
  >
    <Pencil className="h-4 w-4" />
  </Button>

  <Button
    size="icon"
    variant="destructive"
    onClick={() => onDelete(doctor._id)}
  >
    <Trash2 className="h-4 w-4" />
  </Button>

</div>

                </TableCell>

              </TableRow>

            ))

          )}

        </TableBody>

      </Table>

    </div>
  );
}