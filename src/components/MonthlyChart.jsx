import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { monthlyData } from "../data/mockData";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card border border-white/10 px-4 py-3 text-xs">
        <p className="font-display font-600 text-white/60 mb-2">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
              <span className="text-white/50 capitalize">{p.name}</span>
            </div>
            <span className="font-display font-600 text-white">${p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function MonthlyChart() {
  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-700 text-base text-white">Monthly Trends</h3>
          <p className="text-xs text-white/40 mt-0.5">Income, expenses & savings</p>
        </div>
        <div className="flex gap-2">
          {[
            { label: "Income", color: "#00ff87" },
            { label: "Expenses", color: "#f472b6" },
            { label: "Savings", color: "#60efff" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              <span className="text-[10px] text-white/50">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ff87" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#00ff87" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f472b6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60efff" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#60efff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.06)", strokeWidth: 1 }} />
          <Area type="monotone" dataKey="income" stroke="#00ff87" strokeWidth={2} fill="url(#incomeGrad)" dot={false} activeDot={{ r: 4, fill: "#00ff87" }} />
          <Area type="monotone" dataKey="expenses" stroke="#f472b6" strokeWidth={2} fill="url(#expenseGrad)" dot={false} activeDot={{ r: 4, fill: "#f472b6" }} />
          <Area type="monotone" dataKey="savings" stroke="#60efff" strokeWidth={2} fill="url(#savingsGrad)" dot={false} activeDot={{ r: 4, fill: "#60efff" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}