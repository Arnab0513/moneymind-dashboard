import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useApp } from "../context/AppContext";

export default function DashboardLayout() {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar />
      <main className="min-h-screen lg:ml-60">
        <Outlet />
      </main>
    </div>
  );
}
