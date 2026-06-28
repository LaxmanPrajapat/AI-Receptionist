

import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Skeleton } from "@/components/ui/skeleton";

import { toast } from "sonner";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:4444/patients/"
      );

      setPatients(res.data);
    } catch (err) {
      console.error(err);

      toast.error("Unable to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Patients
          </h1>

          <p className="text-muted-foreground">
            All patients who interacted with the AI Receptionist.
          </p>
        </div>

        <Card>

          <CardHeader>
            <CardTitle>
              Patient Records
            </CardTitle>
          </CardHeader>

          <CardContent>

            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <Table>

                <TableHeader>

                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>

                </TableHeader>

                <TableBody>

                  {patients.length > 0 ? (
                    patients.map((patient, index) => (
                      <TableRow key={index}>

                        <TableCell className="font-medium">
                          {patient.patient_name}
                        </TableCell>

                        <TableCell>
                          {patient.phone_number}
                        </TableCell>

                        <TableCell>
                          {patient.reason}
                        </TableCell>

                        <TableCell>
                          {patient.doctor}
                        </TableCell>

                        <TableCell>
                          {new Date(patient.start_time).toLocaleString()}
                        </TableCell>

                        <TableCell>
                          {patient.canceled ? (
                            <Badge variant="destructive">
                              Cancelled
                            </Badge>
                          ) : (
                            <Badge>
                              Active
                            </Badge>
                          )}
                        </TableCell>

                      </TableRow>
                    ))
                  ) : (
                    <TableRow>

                      <TableCell
                        colSpan={6}
                        className="text-center py-10"
                      >
                        No patient records found.
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