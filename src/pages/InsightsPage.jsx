import { useFinanceStore } from "../store/useFinanceStore";
import { getIncome, getExpense, getCategoryData, getSavingsRate } from "../utils/helpers";

const COLORS = ["#7c6cfc", "#fc6c8f", "#4ade80", "#f59e0b", "#38bdf8", "#f472b6"];

function InsightsPage() {
  const { transactions } = useFinanceStore();
  const income = getIncome(transactions);
  const expense = getExpense(transactions);
  const savings = getSavingsRate(transactions);
  const categoryData = getCategoryData(transactions);
  const incomeCount = transactions.filter((t) => t.type === "income").length;
  const expenseCount = transactions.filter((t) => t.type === "expense").length;
  const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

  const stats = [
    { label: "Total Transactions", value: transactions.length, sub: "all entries", icon: "📊" },
    { label: "Total Expenses",     value: fmt(expense),         sub: "money spent",   icon: "💸" },
    { label: "Income Entries",     value: incomeCount,           sub: "credit records", icon: "📈" },
    { label: "Savings Rate",       value: savings + "%",         sub: "of income kept", icon: "🏦" },
  ];

  return (
    <div>
      <div className="mb-8 fade-up delay-1">
        <h1 className="text-3xl font-bold tracking-tight text-base-content">Insights</h1>
        <p className="text-base-content/40 text-sm font-mono mt-1">
          deep dive into your spending patterns
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`card bg-base-100 border border-base-300 shadow-xl hover:-translate-y-1 transition-transform fade-up delay-${i + 2}`}
          >
            <div className="card-body gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold tracking-widest uppercase text-base-content/40">
                  {s.label}
                </span>
                <span className="text-xl">{s.icon}</span>
              </div>
              <p className="text-2xl font-bold font-mono text-primary">{s.value}</p>
              <p className="text-xs text-base-content/30 font-mono">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      
      <div className="card bg-base-100 border border-base-300 shadow-xl fade-up delay-5">
        <div className="card-body">
          <h2 className="text-xs font-bold tracking-widest uppercase text-base-content/50 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded bg-primary inline-block" />
            Category Breakdown
          </h2>
          <div className="flex flex-col gap-3">
            {categoryData
              .sort((a, b) => b.value - a.value)
              .map((c, i) => {
                const pct = expense > 0 ? Math.round((c.value / expense) * 100) : 0;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-sm font-semibold w-24">{c.name}</span>
                    <div className="flex-1">
                      <progress
                        className="progress w-full h-2"
                        style={{ "--progress-color": COLORS[i % COLORS.length] }}
                        value={pct}
                        max="100"
                      />
                    </div>
                    <span className="text-xs font-mono text-base-content/50 w-8 text-right">{pct}%</span>
                    <span className="text-xs font-mono font-bold text-error w-20 text-right">{fmt(c.value)}</span>
                  </div>
                );
              })}
          </div>

          
          <div className="divider text-xs text-base-content/30">Summary</div>
          <div className="stats stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-title text-xs">Income txns</div>
              <div className="stat-value text-success text-2xl">{incomeCount}</div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs">Expense txns</div>
              <div className="stat-value text-error text-2xl">{expenseCount}</div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs">Net saved</div>
              <div className="stat-value text-primary text-2xl font-mono">
                {fmt(income - expense)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightsPage;