import { CheckCircle2, Lock, Shield, UserCog } from "lucide-react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useApp } from "../context/AppContext";

const settingsRows = [
  {
    title: "Workspace role",
    description: "Access level inside the dashboard",
    icon: UserCog,
  },
  {
    title: "Security alerts",
    description: "Receive login and anomaly notifications",
    icon: Shield,
  },
  {
    title: "Report exports",
    description: "Download operational summaries and transaction CSVs",
    icon: Lock,
    adminOnly: true,
  },
];

export default function SettingsPage() {
  const { currency, setCurrency, user } = useApp();

  return (
    <div className="pb-8">
      <Navbar title="Settings" />

      <div className="space-y-6 px-4 sm:px-6">
        <Card className="p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Profile</p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-300 to-sky-300 font-display text-2xl font-bold text-slate-950">
                {user?.avatar}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">{user?.name}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  {user?.title} · <span className="capitalize">{user?.role}</span>
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="text-sm text-slate-400">Display currency</p>
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                className="mt-2 bg-transparent text-sm font-semibold text-white outline-none"
              >
                <option value="USD" className="bg-slate-900">
                  USD
                </option>
                <option value="INR" className="bg-slate-900">
                  INR
                </option>
              </select>
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          {settingsRows.map(({ title, description, icon: Icon, adminOnly }) => {
            const locked = adminOnly && user?.role !== "admin";

            return (
              <Card key={title} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-slate-200">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{description}</p>
                  </div>
                </div>
                <div
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium ${
                    locked ? "border border-white/10 bg-white/[0.04] text-slate-500" : "bg-emerald-400/10 text-emerald-300"
                  }`}
                >
                  {locked ? <Lock size={16} /> : <CheckCircle2 size={16} />}
                  {locked ? "Admin only" : "Enabled"}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
