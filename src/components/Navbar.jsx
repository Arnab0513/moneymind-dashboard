import { Bell, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getCurrencyOptions } from "../data/options";

const currencyOptions = getCurrencyOptions();

export default function Navbar({ title }) {
  const {
    user,
    currency,
    setCurrency,
    setMobileSidebarOpen,
    searchQuery,
    setSearchQuery,
    theme,
    toggleTheme,
    notifications,
    unreadNotifications,
    markAllNotificationsRead,
  } = useApp();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 px-4 pb-4 pt-4 sm:px-6">
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-3xl px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="rounded-2xl border border-white/10 p-2 text-slate-300 lg:hidden"
          >
            <Menu size={18} />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">MoneyMind</p>
            <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
          </div>
        </div>

        <div className="hidden min-w-[240px] flex-1 items-center justify-center lg:flex">
          <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-400">
            <Search size={16} />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              placeholder="Search transactions, accounts, categories"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 sm:flex sm:items-center sm:gap-2">
            <span className="text-sm text-slate-400">Currency</span>
            <div className="relative">
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                className="appearance-none bg-transparent pr-6 text-sm font-medium text-white outline-none"
              >
                {currencyOptions.map((option) => (
                  <option key={option.code} value={option.code} className="bg-slate-900">
                    {option.code}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition hover:bg-white/[0.08]"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition hover:bg-white/[0.08]"
            >
              <Bell size={18} />
              {unreadNotifications > 0 ? (
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-sky-400" />
              ) : null}
            </button>

            {showNotifications ? (
              <div className="glass-panel absolute right-0 top-[calc(100%+12px)] z-40 w-80 rounded-3xl p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="theme-text text-sm font-semibold">Notifications</p>
                    <p className="theme-soft text-xs">{unreadNotifications} unread</p>
                  </div>
                  <button
                    type="button"
                    onClick={markAllNotificationsRead}
                    className="text-xs font-medium text-sky-400 transition hover:text-sky-300"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="space-y-3">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-2xl border p-3 ${
                        item.read ? "border-white/10 bg-white/[0.03]" : "border-sky-400/20 bg-sky-400/10"
                      }`}
                    >
                      <p className="theme-text text-sm font-semibold">{item.title}</p>
                      <p className="theme-muted mt-1 text-xs leading-5">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <button type="button" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-300 to-sky-300 font-semibold text-slate-950">
              {user?.avatar ?? "MM"}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs capitalize text-slate-400">{user?.role}</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
