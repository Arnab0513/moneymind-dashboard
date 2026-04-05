export const summaryCards = [
  {
    key: "balance",
    title: "Total Balance",
    value: 1248000,
    change: "+12.4%",
    hint: "Across all accounts",
  },
  {
    key: "income",
    title: "Income",
    value: 322000,
    change: "+8.1%",
    hint: "This month",
  },
  {
    key: "expenses",
    title: "Expenses",
    value: 184500,
    change: "-3.2%",
    hint: "Operational + personal",
  },
  {
    key: "savings",
    title: "Savings",
    value: 137500,
    change: "+18.6%",
    hint: "Goal progress 72%",
  },
];

export const expenseBreakdown = [
  { name: "Rent", value: 68000, color: "#818cf8" },
  { name: "Food", value: 26000, color: "#38bdf8" },
  { name: "Travel", value: 18000, color: "#22c55e" },
  { name: "Team", value: 29000, color: "#f59e0b" },
  { name: "Subscriptions", value: 14000, color: "#f472b6" },
  { name: "Other", value: 29500, color: "#94a3b8" },
];

export const monthlyTrend = [
  { month: "Jan", income: 240000, expenses: 162000 },
  { month: "Feb", income: 255000, expenses: 171000 },
  { month: "Mar", income: 278000, expenses: 176500 },
  { month: "Apr", income: 290000, expenses: 183000 },
  { month: "May", income: 305000, expenses: 179500 },
  { month: "Jun", income: 314000, expenses: 187000 },
  { month: "Jul", income: 322000, expenses: 184500 },
];

export const transactions = [
  { id: 1, date: "2026-04-04", description: "Razorpay settlement", category: "Income", amount: 125000, status: "credit" },
  { id: 2, date: "2026-04-04", description: "Office rent", category: "Rent", amount: -68000, status: "debit" },
  { id: 3, date: "2026-04-03", description: "Meta ads campaign", category: "Marketing", amount: -24500, status: "debit" },
  { id: 4, date: "2026-04-03", description: "Client retainer", category: "Income", amount: 98000, status: "credit" },
  { id: 5, date: "2026-04-02", description: "Team payroll", category: "Team", amount: -29000, status: "debit" },
  { id: 6, date: "2026-04-02", description: "AWS cloud bill", category: "Infrastructure", amount: -16500, status: "debit" },
  { id: 7, date: "2026-04-01", description: "Travel reimbursement", category: "Travel", amount: 12000, status: "credit" },
  { id: 8, date: "2026-04-01", description: "Notion + Slack", category: "Subscriptions", amount: -6200, status: "debit" },
  { id: 9, date: "2026-03-31", description: "Stripe subscription payout", category: "Income", amount: 76500, status: "credit" },
  { id: 10, date: "2026-03-31", description: "Google Workspace", category: "Subscriptions", amount: -4800, status: "debit" },
  { id: 11, date: "2026-03-30", description: "Laptop EMI", category: "Equipment", amount: -15500, status: "debit" },
  { id: 12, date: "2026-03-30", description: "Consulting invoice", category: "Income", amount: 54000, status: "credit" },
  { id: 13, date: "2026-03-29", description: "Uber business trips", category: "Travel", amount: -3900, status: "debit" },
  { id: 14, date: "2026-03-29", description: "Figma organization plan", category: "Subscriptions", amount: -2700, status: "debit" },
  { id: 15, date: "2026-03-28", description: "Angel investment tranche", category: "Income", amount: 145000, status: "credit" },
  { id: 16, date: "2026-03-28", description: "Legal and compliance", category: "Operations", amount: -18200, status: "debit" },
  { id: 17, date: "2026-03-27", description: "Team lunch", category: "Food", amount: -7400, status: "debit" },
  { id: 18, date: "2026-03-27", description: "Referral revenue", category: "Income", amount: 21500, status: "credit" },
  { id: 19, date: "2026-03-26", description: "Electricity bill", category: "Utilities", amount: -6200, status: "debit" },
  { id: 20, date: "2026-03-26", description: "Performance bonus payout", category: "Team", amount: -12000, status: "debit" },
  { id: 21, date: "2026-03-25", description: "Bank interest credit", category: "Income", amount: 3200, status: "credit" },
  { id: 22, date: "2026-03-25", description: "Canva Pro annual", category: "Subscriptions", amount: -8900, status: "debit" },
  { id: 23, date: "2026-03-24", description: "Office snacks", category: "Food", amount: -2500, status: "debit" },
  { id: 24, date: "2026-03-24", description: "Marketplace sale", category: "Income", amount: 28600, status: "credit" },
];

export const analyticsCards = [
  { title: "Burn Rate", value: "57%", note: "Healthy runway", accent: "text-sky-300" },
  { title: "Cash Runway", value: "14 mo", note: "Assuming current spend", accent: "text-emerald-300" },
  { title: "Net Margin", value: "42%", note: "Improved from last month", accent: "text-indigo-300" },
  { title: "Forecast", value: "+9.8%", note: "Projected growth", accent: "text-amber-300" },
];

export const roleMessages = {
  admin: "Admin access unlocked. You can export reports, adjust settings, and manage operational data.",
  viewer: "Viewer mode is active. You can inspect financial health but management actions stay locked.",
};

export const seededUsers = [
  {
    id: "admin",
    name: "Aarav Shah",
    username: "aarav",
    countryCode: "+91",
    phone: "9876543210",
    password: "admin123",
    role: "admin",
    title: "Finance Lead",
    avatar: "AS",
  },
  {
    id: "viewer",
    name: "Mira Rao",
    username: "mira",
    countryCode: "+91",
    phone: "9123456780",
    password: "viewer123",
    role: "viewer",
    title: "Analyst",
    avatar: "MR",
  },
];
