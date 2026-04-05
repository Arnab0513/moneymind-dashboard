import { Eye, EyeOff, ShieldCheck, Smartphone, TrendingUp, UserPlus, Wallet } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useApp } from "../context/AppContext";
import { countryDialCodes, getCurrencyOptions } from "../data/options";

const highlights = [
  { icon: Wallet, title: "See all accounts", description: "Balance, cash flow, savings, and expense mix in one clean workspace." },
  { icon: TrendingUp, title: "Spot trends faster", description: "Structured charts make income and burn patterns easy to read." },
  { icon: ShieldCheck, title: "Role-based access", description: "Admin and viewer modes help you present the right level of control." },
];

const currencyOptions = getCurrencyOptions();

const initialLoginForm = {
  countryCode: "+91",
  phone: "",
  password: "",
  role: "viewer",
  currency: "INR",
};

const initialRegisterForm = {
  name: "",
  countryCode: "+91",
  phone: "",
  password: "",
  role: "viewer",
  currency: "INR",
};

function PhoneField({ countryCode, onCountryCodeChange, phone, onPhoneChange, placeholder }) {
  return (
    <div className="flex gap-3">
      <select
        value={countryCode}
        onChange={onCountryCodeChange}
        className="w-40 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-white outline-none"
      >
        {countryDialCodes.map((item) => (
          <option key={`${item.code}-${item.country}`} value={item.code} className="bg-slate-900">
            {item.code} {item.country}
          </option>
        ))}
      </select>
      <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
        <Smartphone size={18} className="text-slate-400" />
        <input
          value={phone}
          onChange={onPhoneChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}

function CurrencySelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none"
    >
      {currencyOptions.map((option) => (
        <option key={option.code} value={option.code} className="bg-slate-900">
          {option.code} - {option.label}
        </option>
      ))}
    </select>
  );
}

export default function LoginPage() {
  const { authenticateUser, registerUser, users } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [error, setError] = useState("");

  const registeredKeys = useMemo(
    () => users.map((user) => `${user.countryCode}-${user.phone}`),
    [users],
  );

  const sanitizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);
  const registerPhoneKey = `${registerForm.countryCode}-${registerForm.phone}`;

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    if (loginForm.phone.length !== 10) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    if (!loginForm.password) {
      setError("Password is required.");
      return;
    }

    const result = authenticateUser(loginForm);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/app/dashboard");
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setError("");

    if (!registerForm.name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (registerForm.phone.length !== 10) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    if (registerForm.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const result = registerUser(registerForm);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/app/dashboard");
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 px-8 py-10 shadow-2xl shadow-black/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.2),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.3),rgba(2,6,23,0.75))]" />
          <div className="relative z-10">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-xl ring-1 ring-indigo-400/30">
                $
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white">MoneyMind 💰</h1>
                <p className="text-sm text-slate-400">A premium fintech SaaS dashboard</p>
              </div>
            </div>

            <div className="max-w-2xl">
              <p className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-indigo-200">
                Smart login experience
              </p>
              <h2 className="mt-6 max-w-xl font-display text-5xl font-bold leading-tight text-white">
                Secure access with role-based entry.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                Pick your country code, use your phone number, choose your role, and enter the dashboard with the currency you want to see.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-200">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <Card className="w-full max-w-xl p-8 sm:p-10">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Secure access</p>
              <h3 className="mt-3 font-display text-3xl font-bold text-white">Login or register</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                The number stays unique with its country code, and duplicate registrations are blocked automatically.
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  mode === "login" ? "bg-white text-slate-950" : "text-slate-300"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  mode === "register" ? "bg-white text-slate-950" : "text-slate-300"
                }`}
              >
                Register
              </button>
            </div>

            {error ? (
              <div className="mb-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            ) : null}

            {mode === "login" ? (
              <form className="space-y-4" onSubmit={handleLogin}>
                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Phone number</span>
                  <PhoneField
                    countryCode={loginForm.countryCode}
                    onCountryCodeChange={(event) => setLoginForm((prev) => ({ ...prev, countryCode: event.target.value }))}
                    phone={loginForm.phone}
                    onPhoneChange={(event) => setLoginForm((prev) => ({ ...prev, phone: sanitizePhone(event.target.value) }))}
                    placeholder="Enter 10-digit phone number"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Password</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                      placeholder="Enter password"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      className="text-slate-400 transition hover:text-white"
                    >
                      {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Use the eye icon to hide or show your password.</p>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">Role</span>
                    <select
                      value={loginForm.role}
                      onChange={(event) => setLoginForm((prev) => ({ ...prev, role: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none"
                    >
                      <option value="admin" className="bg-slate-900">
                        Admin
                      </option>
                      <option value="viewer" className="bg-slate-900">
                        Viewer
                      </option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">Currency</span>
                    <CurrencySelect
                      value={loginForm.currency}
                      onChange={(event) => setLoginForm((prev) => ({ ...prev, currency: event.target.value }))}
                    />
                  </label>
                </div>

                <button type="submit" className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">
                  Log in to MoneyMind
                </button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleRegister}>
                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Full name</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <UserPlus size={18} className="text-slate-400" />
                    <input
                      value={registerForm.name}
                      onChange={(event) => setRegisterForm((prev) => ({ ...prev, name: event.target.value }))}
                      placeholder="Enter your full name"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Phone number</span>
                  <PhoneField
                    countryCode={registerForm.countryCode}
                    onCountryCodeChange={(event) => setRegisterForm((prev) => ({ ...prev, countryCode: event.target.value }))}
                    phone={registerForm.phone}
                    onPhoneChange={(event) => setRegisterForm((prev) => ({ ...prev, phone: sanitizePhone(event.target.value) }))}
                    placeholder="Register with phone number"
                  />
                  {registeredKeys.includes(registerPhoneKey) && registerForm.phone.length === 10 ? (
                    <p className="mt-2 text-xs text-amber-200">This phone number is already registered for that country code.</p>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Password</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      value={registerForm.password}
                      onChange={(event) => setRegisterForm((prev) => ({ ...prev, password: event.target.value }))}
                      placeholder="Create password"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword((prev) => !prev)}
                      className="text-slate-400 transition hover:text-white"
                    >
                      {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Set a password with at least 6 characters.</p>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">Choose role</span>
                    <select
                      value={registerForm.role}
                      onChange={(event) => setRegisterForm((prev) => ({ ...prev, role: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none"
                    >
                      <option value="admin" className="bg-slate-900">
                        Admin
                      </option>
                      <option value="viewer" className="bg-slate-900">
                        Viewer
                      </option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">Currency</span>
                    <CurrencySelect
                      value={registerForm.currency}
                      onChange={(event) => setRegisterForm((prev) => ({ ...prev, currency: event.target.value }))}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={registeredKeys.includes(registerPhoneKey) && registerForm.phone.length === 10}
                  className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Create account
                </button>
              </form>
            )}
          </Card>
        </section>
      </div>
    </div>
  );
}
