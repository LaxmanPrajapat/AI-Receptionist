import { Link,useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-4">
      <h1 className="text-xl font-bold mb-8">
        Hospital AI
      </h1>

      <nav className="space-y-3">
        <Link to="/dashboard" className="block">
          Dashboard
        </Link>

        <Link to="/patients" className="block">
          Patients
        </Link>

        <Link to="/appointments" className="block">
          Appointments
          
        </Link>
          <button
          onClick={handleLogout}
          className="block mt-8 text-red-400"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}