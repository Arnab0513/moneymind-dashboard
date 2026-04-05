import { Download, Lock, SearchX } from "lucide-react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useApp } from "../context/AppContext";
import { transactions } from "../data/mockData";

export default function TransactionsPage() {
  const { formatCurrency, searchQuery, user } = useApp();

  const filteredTransactions = transactions.filter((item) => {
    const needle = searchQuery.trim().toLowerCase();
    if (!needle) return true;

    return [item.date, item.description, item.category, String(item.amount)]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });

  const credits = filteredTransactions.filter((item) => item.amount > 0).reduce((sum, item) => sum + item.amount, 0);
  const debits = Math.abs(filteredTransactions.filter((item) => item.amount < 0).reduce((sum, item) => sum + item.amount, 0));

  const handleExport = () => {
    if (user?.role !== "admin") return;

    const csvRows = [
      ["Date", "Description", "Category", "Amount"],
      ...filteredTransactions.map((item) => [item.date, item.description, item.category, item.amount]),
    ];

    const csvContent = csvRows.map((row) => row.map((value) => `"${value}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "moneymind-transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pb-8">
      <Navbar title="Transactions" />

      <div className="space-y-6 px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-5">
            <p className="theme-muted text-sm">Credits</p>
            <p className="mt-3 font-display text-3xl font-bold text-emerald-300">{formatCurrency(credits)}</p>
          </Card>
          <Card className="p-5">
            <p className="theme-muted text-sm">Debits</p>
            <p className="mt-3 font-display text-3xl font-bold text-rose-300">{formatCurrency(debits)}</p>
          </Card>
          <Card className="flex items-center justify-between p-5">
            <div>
              <p className="theme-muted text-sm">Export access</p>
              <p className="theme-text mt-2 font-display text-2xl font-bold capitalize">{user?.role}</p>
            </div>
            <button
              type="button"
              onClick={handleExport}
              disabled={user?.role !== "admin"}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                user?.role === "admin"
                  ? "bg-white text-slate-950 transition hover:scale-[1.03]"
                  : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-slate-500"
              }`}
            >
              {user?.role === "admin" ? <Download size={16} /> : <Lock size={16} />}
            </button>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <div className="border-b border-white/10 px-6 py-5">
            <h3 className="theme-text font-display text-xl font-bold">All Transactions</h3>
            <p className="theme-muted mt-1 text-sm">
              {searchQuery ? `Showing results for "${searchQuery}"` : "Structured table with clean spacing and quick hover scanning"}
            </p>
          </div>
          <div className="max-h-[560px] overflow-auto">
            <table className="min-w-full text-left">
              <thead className="sticky top-0 bg-slate-950/90 backdrop-blur">
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.22em] text-slate-500">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((item) => (
                    <tr key={item.id} className="border-b border-white/5 transition hover:bg-white/[0.03]">
                      <td className="theme-muted px-6 py-4 text-sm">{item.date}</td>
                      <td className="theme-text px-6 py-4 text-sm font-medium">{item.description}</td>
                      <td className="theme-muted px-6 py-4 text-sm">{item.category}</td>
                      <td className={`px-6 py-4 text-right text-sm font-semibold ${item.amount > 0 ? "text-emerald-300" : "text-rose-300"}`}>
                        {item.amount > 0 ? "+" : ""}
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <SearchX className="theme-soft" size={28} />
                        <p className="theme-text text-sm font-semibold">No transactions matched your search</p>
                        <p className="theme-muted text-xs">Try a different keyword from the top search bar.</p>
                      </div>
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
