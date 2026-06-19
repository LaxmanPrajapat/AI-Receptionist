import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ADMIN_EMAIL = "admin@hospital.com";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("token", "admin-token");
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Hexa Hospital
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Secure Staff Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Staff Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
          />

          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Hospital Management System
        </div>
      </div>
    </div>
  );
}