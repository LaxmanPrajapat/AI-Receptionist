import { useParams } from "react-router-dom";

export default function PatientDetails() {
  const { id } = useParams();

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold">
        Patient #{id}
      </h1>

      <div className="mt-8 border rounded-xl p-6">

        <p>Name: John Doe</p>

        <p>Phone: 9876543210</p>

        <p>
          Query: Need appointment with
          Cardiologist
        </p>

      </div>
    </div>
  );
}