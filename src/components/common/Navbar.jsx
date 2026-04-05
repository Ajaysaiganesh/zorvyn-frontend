import { Link, useLocation } from "react-router-dom";
import { useFinanceStore } from "../../store/useFinanceStore";

const THEMES = ["light", "dark", "cupcake", "forest", "dracula", "luxury", "synthwave"];

function Navbar({ theme, setTheme }) {
  const { role, setRole } = useFinanceStore();
  const { pathname } = useLocation();

  const navLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/transactions", label: "Transactions" },
    { to: "/insights", label: "Insights" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-lg px-6 sticky top-0 z-50 border-b border-base-300">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-bold text-sm">
            ₹
          </div>
          <span className="text-xl font-bold text-base-content tracking-tight">
            FinFlow
          </span>
        </Link>
      </div>

      <div className="flex gap-1 items-center">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`btn btn-sm btn-ghost font-semibold ${
              pathname === to ? "text-primary underline underline-offset-4" : "text-base-content/60"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      
      <div className="flex gap-3 items-center ml-4">
        <span className={`badge font-bold text-xs tracking-widest uppercase ${
          role === "admin" ? "badge-primary" : "badge-ghost"
        }`}>
          {role}
        </span>

        
        <select
          className="select select-sm select-bordered"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        
        <select
          className="select select-sm select-bordered"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {THEMES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Navbar;