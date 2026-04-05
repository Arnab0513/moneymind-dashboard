import { ArrowDownRight, LogOut, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../components/Card";
import Chart from "../components/Chart";
import Navbar from "../components/Navbar";
import { useApp } from "../context/AppContext";
import { expenseBreakdown, monthlyTrend, roleMessages, summaryCards, transactions } from "../data/mockData";
import { useNavigate } from "react-router-dom";

const iconMap = {
  balance: Wallet,
  income: TrendingUp,
  expenses: ArrowDownRight,
  savings: PiggyBank,
};

function ExpenseTooltip({ active, payload, theme, formatCurrency }) {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;
  if (!item) return null;

  return (
    <div
      className="min-w-[180px] rounded-2xl border px-4 py-3 shadow-2xl"
      style={{
        backgroundColor: theme === "light" ? "rgba(255,255,255,0.98)" : "rgba(15,23,42,0.98)",
        borderColor: theme === "light" ? "rgba(148,163,184,0.3)" : "rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
        <span
          className="text-sm font-semibold"
          style={{ color: theme === "light" ? "#0f172a" : "#f8fafc" }}
        >
          {item.name}
        </span>
      </div>
      <p
        className="mt-2 text-base font-bold"
        style={{ color: item.color }}
      >
        {formatCurrency(item.value)}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const { currency, formatCurrency, logout, searchQuery, theme, user } = useApp();
  const navigate = useNavigate();

  const query = searchQuery.trim().toLowerCase();
  const filteredTransactions = transactions.filter((transaction) => {
    if (!query) return true;

    return [transaction.date, transaction.description, transaction.category, String(transaction.amount)]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const filteredExpenseBreakdown = expenseBreakdown.filter((entry) =>
    query ? entry.name.toLowerCase().includes(query) : true,
  );

  const visibleExpenseBreakdown = filteredExpenseBreakdown.length > 0 ? filteredExpenseBreakdown : expenseBreakdown;
  const [activeExpense, setActiveExpense] = useState(visibleExpenseBreakdown[0] ?? null);

  useEffect(() => {
    if (!visibleExpenseBreakdown.length) {
      setActiveExpense(null);
      return;
    }

    setActiveExpense((current) => {
      if (!current) return visibleExpenseBreakdown[0];

      return visibleExpenseBreakdown.find((entry) => entry.name === current.name) ?? visibleExpenseBreakdown[0];
    });
  }, [query]);

  const chartStroke = theme === "light" ? "rgba(148,163,184,0.22)" : "rgba(148,163,184,0.12)";
  const axisColor = theme === "light" ? "#64748b" : "#94a3b8";
  const tooltipStyle = {
    backgroundColor: theme === "light" ? "rgba(255,255,255,0.98)" : "rgba(15, 23, 42, 0.95)",
    border: theme === "light" ? "1px solid rgba(148,163,184,0.28)" : "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    color: theme === "light" ? "#0f172a" : "#ffffff",
  };

  return (
    <div className="pb-8">
      <Navbar title="Dashboard" />

      <div className="space-y-6 px-4 sm:px-6">
        <Card className="overflow-hidden p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-sky-500/80">Portfolio snapshot</p>
              <h1 className="theme-text mt-3 font-display text-3xl font-bold sm:text-4xl">
                Clear financial visibility for {user?.name.split(" ")[0]}
              </h1>
              <p className="theme-muted mt-3 max-w-2xl text-sm leading-7">{roleMessages[user?.role ?? "viewer"]}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="rounded-3xl border border-sky-400/20 bg-sky-400/10 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.22em] text-sky-500/80">Primary currency</p>
                <p className="theme-text mt-2 font-display text-2xl font-bold">{currency}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="theme-text inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-semibold transition hover:bg-white/[0.08]"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </div>
        </Card>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((item) => {
            const Icon = iconMap[item.key];
            const positive = item.change.startsWith("+");

            return (
              <Card
                key={item.key}
                className="group p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/[0.08] hover:shadow-[0_24px_80px_rgba(79,70,229,0.18)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="theme-muted text-sm">{item.title}</p>
                    <p className="theme-text mt-4 font-display text-3xl font-bold">{formatCurrency(item.value)}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-400/20">
                    <Icon size={20} />
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className={positive ? "text-emerald-300" : "text-rose-300"}>{item.change}</span>
                  <span className="theme-soft">{item.hint}</span>
                </div>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
          <Chart
            title="Expense Breakdown"
            subtitle={
              query && filteredExpenseBreakdown.length > 0
                ? `Showing categories matching "${searchQuery}"`
                : "How money is being allocated this month"
            }
          >
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={visibleExpenseBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={72}
                    outerRadius={110}
                    paddingAngle={4}
                    activeIndex={
                      activeExpense
                        ? visibleExpenseBreakdown.findIndex((entry) => entry.name === activeExpense.name)
                        : 0
                    }
                    onClick={(_, index) => setActiveExpense(visibleExpenseBreakdown[index])}
                  >
                    {visibleExpenseBreakdown.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                        stroke={activeExpense?.name === entry.name ? entry.color : "#ffffff"}
                        strokeWidth={activeExpense?.name === entry.name ? 3 : 1}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={<ExpenseTooltip theme={theme} formatCurrency={formatCurrency} />}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {activeExpense ? (
              <div
                className="mb-3 flex items-center justify-between rounded-2xl border px-4 py-3"
                style={{
                  backgroundColor: `${activeExpense.color}18`,
                  borderColor: `${activeExpense.color}55`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: activeExpense.color }} />
                  <span className="theme-text text-sm font-semibold">{activeExpense.name}</span>
                </div>
                <span className="text-sm font-semibold" style={{ color: activeExpense.color }}>
                  {formatCurrency(activeExpense.value)}
                </span>
              </div>
            ) : null}
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {visibleExpenseBreakdown.map((entry) => (
                <button
                  key={entry.name}
                  type="button"
                  onClick={() => setActiveExpense(entry)}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-left transition hover:bg-white/[0.06]"
                  style={{
                    backgroundColor: activeExpense?.name === entry.name ? `${entry.color}18` : undefined,
                    borderColor: activeExpense?.name === entry.name ? `${entry.color}55` : undefined,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="theme-text text-sm font-medium">{entry.name}</span>
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: activeExpense?.name === entry.name ? entry.color : undefined }}
                  >
                    {formatCurrency(entry.value)}
                  </span>
                </button>
              ))}
            </div>
          </Chart>

          <Chart title="Income vs Expenses" subtitle="Monthly trend line for quick financial health checks">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid stroke={chartStroke} vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fill: axisColor, fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                  />
                  <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="income" stroke="#38bdf8" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="expenses" stroke="#818cf8" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Chart>
        </section>

        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <h3 className="theme-text font-display text-xl font-bold">Recent Transactions</h3>
              <p className="theme-muted mt-1 text-sm">
                {query ? `Showing entries matching "${searchQuery}"` : "Clean, scan-friendly ledger for the latest account activity"}
              </p>
            </div>
            <div className="theme-muted rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm">
              {filteredTransactions.length} items
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="theme-soft border-b border-white/10 text-xs uppercase tracking-[0.22em]">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-white/5 transition hover:bg-white/[0.03]">
                      <td className="theme-muted px-6 py-4 text-sm">{transaction.date}</td>
                      <td className="theme-text px-6 py-4 text-sm font-medium">{transaction.description}</td>
                      <td className="theme-muted px-6 py-4 text-sm">{transaction.category}</td>
                      <td
                        className={`px-6 py-4 text-right text-sm font-semibold ${
                          transaction.amount > 0 ? "text-emerald-300" : "text-rose-300"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(transaction.amount)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="theme-muted px-6 py-10 text-center text-sm">
                      No dashboard transactions matched your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
