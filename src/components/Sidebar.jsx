import { BarChart3, CreditCard, LayoutDashboard, Settings, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";

const navItems = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/transactions", label: "Transactions", icon: CreditCard },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function SidebarLinks({ onNavigate }) {
  return (
    <div className="space-y-2">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
        >
          <Icon size={18} />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default function Sidebar() {
  const { user, mobileSidebarOpen, setMobileSidebarOpen } = useApp();

  return (
    <>
      <aside className="hidden h-screen w-60 flex-col border-r border-white/10 bg-slate-950/95 px-5 py-6 lg:fixed lg:inset-y-0 lg:left-0 lg:flex light-sidebar">
        <div className="mb-10">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-2xl ring-1 ring-indigo-400/30">
            $
          </div>
          <h1 className="theme-text font-display text-2xl font-bold tracking-tight">MoneyMind 💰</h1>
          <p className="theme-muted mt-2 text-sm">Premium finance command center</p>
        </div>

        <SidebarLinks />

        <div className="mt-auto rounded-3xl border border-white/10 bg-white/[0.04] p-4">
          <p className="theme-soft text-xs uppercase tracking-[0.24em]">Signed in as</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-sky-400 font-semibold text-slate-950">
              {user?.avatar ?? "MM"}
            </div>
            <div>
              <p className="theme-text text-sm font-semibold">{user?.name}</p>
              <p className="theme-muted text-xs capitalize">
                {user?.title} · {user?.role}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition lg:hidden ${
          mobileSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileSidebarOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-slate-950 px-5 py-6 transition-transform duration-300 lg:hidden light-sidebar ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="theme-text font-display text-2xl font-bold">MoneyMind 💰</h1>
            <p className="theme-muted mt-2 text-sm">Finance at a glance</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-2xl border border-white/10 p-2 text-slate-300"
          >
            <X size={18} />
          </button>
        </div>
        <SidebarLinks onNavigate={() => setMobileSidebarOpen(false)} />
      </aside>
    </>
  );
}
