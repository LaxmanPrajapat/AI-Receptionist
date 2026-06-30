import {
  LayoutDashboard,
  Users,
  CalendarDays,
  LogOut,
  HeartPulse,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Patients",
      path: "/patients",
      icon: <Users size={20} />,
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: <CalendarDays size={20} />,
    },
     {
      name: "Doctors Info",
      path: "/doctors",
      icon: <CalendarDays size={20} />,
    },
  ];

  return (
   <aside className="fixed left-0 top-0 w-72 h-screen bg-slate-950 text-white flex flex-col border-r border-slate-800 z-50">

      {/* Logo */}
      <div className="px-6 py-8 border-b border-slate-800">
        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
            <HeartPulse size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              Hexa Hospital
            </h1>

            <p className="text-xs text-slate-400">
              AI Receptionist
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="font-medium">
              {item.name}
            </span>
          </Link>
        ))}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">

        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            bg-red-500/10
            text-red-400
            hover:bg-red-500
            hover:text-white
            transition-all
            duration-300
          "
        >
          <LogOut size={20} />
          <span className="font-medium">
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
}