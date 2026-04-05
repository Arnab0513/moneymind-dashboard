import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { expenseBreakdown } from "../data/mockData";
import { useApp } from "../context/AppContext";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/90 px-4 py-2 rounded-lg shadow-lg">
        
        <span className="text-white">
          {payload[0].name} :
        </span>

        <span className="text-green-400 font-semibold ml-1">
          ₹{payload[0].value}
        </span>

      </div>
    );
  }
  return null;
};
const CustomLegend = ({ payload }) => (
  <div className="flex flex-col gap-2 mt-4">
    {payload.map((entry, i) => (
      <div key={i} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span className="text-xs text-white/60 font-body">{entry.value}</span>
        </div>
        <span className="text-xs font-display font-600 text-white">{expenseBreakdown[i]?.percent}%</span>
      </div>
    ))}
  </div>
);

export default function ExpenseChart() {
  const { formatCurrency } = useApp();

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-700 text-base text-white">Expense Breakdown</h3>
          <p className="text-xs text-white/40 mt-0.5">By category this month</p>
        </div>
        <span className="text-xs bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-lg text-white/50">April 2025</span>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="w-full lg:w-48 h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={index} fill={entry.color} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip content={CustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 w-full">
          <CustomLegend payload={expenseBreakdown.map((e) => ({ value: e.name, color: e.color }))} />
        </div>
      </div>
    </div>
  );
}