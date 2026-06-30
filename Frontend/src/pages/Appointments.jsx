
import { useState } from "react";
import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Skeleton } from "@/components/ui/skeleton";

import { CalendarIcon, Search } from "lucide-react";

import { format } from "date-fns";

import { toast } from "sonner";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



export default function Appointments() {
  const [date, setDate] = useState(new Date());

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${BACKEND_URL}/list_appointments/`,
        {
          date: format(date, "yyyy-MM-dd"),
        }
      );

      setAppointments(res.data);

      toast.success("Appointments loaded successfully");
    } catch (error) {
      console.error(error);

      toast.error("Unable to load appointments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Heading */}

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Appointments
          </h1>

          <p className="text-muted-foreground mt-1">
            View and manage hospital appointments.
          </p>
        </div>

        {/* Search Card */}

        <Card>
          <CardHeader>
            <CardTitle>Select Appointment Date</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col md:flex-row gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start md:w-72"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(value) => value && setDate(value)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button
              onClick={fetchAppointments}
              disabled={loading}
            >
              <Search className="mr-2 h-4 w-4" />

              {loading ? "Loading..." : "Check Appointments"}
            </Button>
          </CardContent>
        </Card>

        {/* Table */}

        <Card>
          <CardHeader>
            <CardTitle>Appointments List</CardTitle>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          {appointment.patient_name}
                        </TableCell>

                        <TableCell>
                          {appointment.reason}
                        </TableCell>

                        <TableCell>
                          {new Date(
                            appointment.start_time
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>

                        <TableCell>
                          {appointment.canceled ? (
                            <Badge variant="destructive">
                              Cancelled
                            </Badge>
                          ) : (
                            <Badge>
                              Scheduled
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No appointments found for this date.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}