import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "../components/Card";
import Chart from "../components/Chart";
import Navbar from "../components/Navbar";
import { useApp } from "../context/AppContext";
import { analyticsCards, expenseBreakdown, monthlyTrend } from "../data/mockData";

export default function AnalyticsPage() {
  const { formatCurrency } = useApp();

  return (
    <div className="pb-8">
      <Navbar title="Analytics" />

      <div className="space-y-6 px-4 sm:px-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {analyticsCards.map((card) => (
            <Card key={card.title} className="p-5">
              <p className="text-sm text-slate-400">{card.title}</p>
              <p className={`mt-3 font-display text-3xl font-bold ${card.accent}`}>{card.value}</p>
              <p className="mt-2 text-sm text-slate-500">{card.note}</p>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <Chart title="Revenue Momentum" subtitle="Area chart for steady growth and expense control">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }}
                  />
                  <Area type="monotone" dataKey="income" stroke="#38bdf8" fill="url(#incomeFill)" strokeWidth={3} />
                  <Area type="monotone" dataKey="expenses" stroke="#818cf8" fill="url(#expenseFill)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Chart>

          <Chart title="Category Spend" subtitle="Bar chart for where your money goes">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseBreakdown}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#818cf8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Chart>
        </section>
      </div>
    </div>
  );
}
