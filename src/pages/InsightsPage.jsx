import { useFinanceStore } from "../store/useFinanceStore";
import { getIncome, getExpense, getCategoryData, getSavingsRate } from "../utils/helpers";

const COLORS = ["#7c6cfc","#fc6c8f","#4ade80","#f59e0b","#38bdf8","#f472b6"];

function InsightsPage() {
  const { transactions } = useFinanceStore();
  const income = getIncome(transactions);
  const expense = getExpense(transactions);
  const savings = getSavingsRate(transactions);
  const categoryData = getCategoryData(transactions);
  const incomeCount = transactions.filter((t) => t.type === "income").length;
  const expenseCount = transactions.filter((t) => t.type === "expense").length;
  const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

  
  const topCategory = [...categoryData].sort((a, b) => b.value - a.value)[0];

  
  const monthlyMap = {};
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7); // "2026-04"
    if (!monthlyMap[month]) monthlyMap[month] = { income: 0, expense: 0 };
    if (t.type === "income") monthlyMap[month].income += t.amount;
    else monthlyMap[month].expense += t.amount;
  });
  const monthlyData = Object.entries(monthlyMap).sort();

  const stats = [
    { label: "Total Transactions", value: transactions.length, sub: "all entries", icon: "📊" },
    { label: "Total Expenses",     value: fmt(expense),         sub: "money spent",   icon: "💸" },
    { label: "Income Entries",     value: incomeCount,          sub: "credit records", icon: "📈" },
    { label: "Savings Rate",       value: savings + "%",        sub: "of income kept", icon: "🏦" },
  ];

  return (
    <div>
      <div className="mb-8 fade-up delay-1">
        <h1 className="text-3xl font-bold tracking-tight text-base-content">Insights</h1>
        <p className="text-base-content/40 text-sm font-mono mt-1">// deep dive into your spending patterns</p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((s, i) => (
          <div key={i} className={`card bg-base-100 border border-base-300 shadow-xl hover:-translate-y-1 transition-transform fade-up delay-${i + 2}`}>
            <div className="card-body gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold tracking-widest uppercase text-base-content/40">{s.label}</span>
                <span className="text-xl">{s.icon}</span>
              </div>
              <p className="text-2xl font-bold font-mono text-primary">{s.value}</p>
              <p className="text-xs text-base-content/30 font-mono">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        <div className="card bg-base-100 border border-base-300 shadow-xl fade-up delay-3">
          <div className="card-body">
            <h2 className="text-xs font-bold tracking-widest uppercase text-base-content/50 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded bg-error inline-block" />
              Highest Spending Category
            </h2>
            {topCategory ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-error font-mono">{topCategory.name}</p>
                    <p className="text-base-content/40 text-sm mt-1 font-mono">{fmt(topCategory.value)} spent</p>
                  </div>
                  <div className="radial-progress text-error font-mono text-sm"
                    style={{"--value": expense > 0 ? Math.round((topCategory.value/expense)*100) : 0, "--size":"5rem"}}>
                    {expense > 0 ? Math.round((topCategory.value/expense)*100) : 0}%
                  </div>
                </div>
                <div className="divider my-0 text-xs text-base-content/30">All Categories</div>
                {[...categoryData].sort((a,b) => b.value - a.value).map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background: COLORS[i % COLORS.length]}}/>
                    <span className="text-sm font-semibold w-24">{c.name}</span>
                    <div className="flex-1">
                      <progress className="progress w-full h-2"
                        value={expense > 0 ? Math.round((c.value/expense)*100) : 0}
                        max="100"
                        style={{"--tw-progress-bar-color": COLORS[i % COLORS.length]}}
                      />
                    </div>
                    <span className="text-xs font-mono text-base-content/50 w-8 text-right">
                      {expense > 0 ? Math.round((c.value/expense)*100) : 0}%
                    </span>
                    <span className="text-xs font-mono font-bold text-error w-20 text-right">{fmt(c.value)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-base-content/30">
                <div className="text-4xl mb-2">📭</div>
                <p className="font-mono text-sm">No expense data yet</p>
              </div>
            )}
          </div>
        </div>

        
        <div className="card bg-base-100 border border-base-300 shadow-xl fade-up delay-4">
          <div className="card-body">
            <h2 className="text-xs font-bold tracking-widest uppercase text-base-content/50 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded bg-primary inline-block" />
              Monthly Comparison
            </h2>
            {monthlyData.length === 0 ? (
              <div className="text-center py-8 text-base-content/30">
                <div className="text-4xl mb-2">📭</div>
                <p className="font-mono text-sm">No data yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {monthlyData.map(([month, data]) => {
                  const net = data.income - data.expense;
                  return (
                    <div key={month}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold font-mono text-sm">{month}</span>
                        <span className={`font-mono text-sm font-bold ${net >= 0 ? "text-success" : "text-error"}`}>
                          {net >= 0 ? "+" : ""}{fmt(net)}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-base-content/40 w-16">Income</span>
                          <progress className="progress progress-success flex-1 h-2" value={data.income} max={data.income + data.expense}/>
                          <span className="text-xs font-mono text-success w-20 text-right">{fmt(data.income)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-base-content/40 w-16">Expense</span>
                          <progress className="progress progress-error flex-1 h-2" value={data.expense} max={data.income + data.expense}/>
                          <span className="text-xs font-mono text-error w-20 text-right">{fmt(data.expense)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      
      <div className="card bg-base-100 border border-base-300 shadow-xl fade-up delay-5">
        <div className="card-body">
          <h2 className="text-xs font-bold tracking-widest uppercase text-base-content/50 mb-2 flex items-center gap-2">
            <span className="w-1 h-4 rounded bg-secondary inline-block" />
            Summary
          </h2>
          <div className="stats stats-horizontal shadow w-full flex-wrap">
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
              <div className="stat-value text-primary text-2xl font-mono">{fmt(income - expense)}</div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs">Top category</div>
              <div className="stat-value text-warning text-xl">{topCategory?.name || "—"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightsPage;