import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seededUsers } from "../data/mockData";

const AppContext = createContext(null);

const STORAGE_KEY = "moneymind-session";
const USERS_KEY = "moneymind-users";

const defaultSession = {
  user: null,
  currency: "USD",
  mobileSidebarOpen: false,
  theme: "dark",
  searchQuery: "",
};

const initialNotifications = [
  { id: 1, title: "Weekly report ready", detail: "Your MoneyMind summary is available to review.", read: false },
  { id: 2, title: "Budget alert", detail: "Infrastructure spending crossed 80% of monthly target.", read: false },
  { id: 3, title: "New payout received", detail: "A Razorpay settlement was credited today.", read: true },
];

export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const stored = window.localStorage.getItem(USERS_KEY);
    if (!stored) return seededUsers;

    try {
      return JSON.parse(stored);
    } catch {
      return seededUsers;
    }
  });

  const [session, setSession] = useState(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultSession;

    try {
      return { ...defaultSession, ...JSON.parse(stored) };
    } catch {
      return defaultSession;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    document.documentElement.dataset.theme = session.theme;
  }, [session.theme]);

  const login = (user) => {
    setSession((prev) => ({
      ...prev,
      user,
      currency: user.currency ?? prev.currency,
    }));
  };

  const authenticateUser = ({ countryCode, phone, password, role, currency }) => {
    const existingUser = users.find(
      (user) =>
        user.countryCode === countryCode &&
        user.phone === phone &&
        user.password === password &&
        user.role === role,
    );

    if (!existingUser) {
      return { ok: false, message: "No account found for that phone number, password, and role." };
    }

    login({ ...existingUser, currency });
    return { ok: true, user: existingUser };
  };

  const registerUser = ({ name, countryCode, phone, password, role, currency }) => {
    const existingUser = users.find((user) => user.countryCode === countryCode && user.phone === phone);

    if (existingUser) {
      return { ok: false, message: "This phone number is already registered." };
    }

    const createdUser = {
      id: `user-${Date.now()}`,
      name,
      username: name.toLowerCase().replace(/\s+/g, ""),
      countryCode,
      phone,
      password,
      role,
      title: role === "admin" ? "Workspace Admin" : "Viewer",
      avatar: name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")
        .slice(0, 2),
    };

    setUsers((prev) => [...prev, createdUser]);
    login({ ...createdUser, currency });

    return { ok: true, user: createdUser };
  };

  const logout = () => {
    setSession(defaultSession);
  };

  const setCurrency = (currency) => {
    setSession((prev) => ({ ...prev, currency }));
  };

  const setMobileSidebarOpen = (mobileSidebarOpen) => {
    setSession((prev) => ({ ...prev, mobileSidebarOpen }));
  };

  const setTheme = (theme) => {
    setSession((prev) => ({ ...prev, theme }));
  };

  const toggleTheme = () => {
    setSession((prev) => ({ ...prev, theme: prev.theme === "dark" ? "light" : "dark" }));
  };

  const setSearchQuery = (searchQuery) => {
    setSession((prev) => ({ ...prev, searchQuery }));
  };

  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadNotifications = notifications.filter((item) => !item.read).length;

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en", {
      style: "currency",
      currency: session.currency,
      maximumFractionDigits: 0,
    }).format(value);

  const value = useMemo(
    () => ({
      user: session.user,
      users,
      currency: session.currency,
      theme: session.theme,
      searchQuery: session.searchQuery,
      notifications,
      unreadNotifications,
      login,
      logout,
      authenticateUser,
      registerUser,
      setCurrency,
      setTheme,
      toggleTheme,
      setSearchQuery,
      markAllNotificationsRead,
      mobileSidebarOpen: session.mobileSidebarOpen,
      setMobileSidebarOpen,
      formatCurrency,
    }),
    [notifications, session, unreadNotifications, users],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }

  return context;
}
