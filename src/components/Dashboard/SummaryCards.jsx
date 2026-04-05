function SummaryCards({ income, expense, balance }) {
  const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

  const cards = [
    {
      label: "Net Balance",
      value: fmt(balance),
      sub: "income − expenses",
      gradient: "from-primary/20 to-secondary/10",
      badge: "badge-primary",
      icon: "⚖️",
    },
    {
      label: "Total Income",
      value: fmt(income),
      sub: "all credit entries",
      gradient: "from-success/20 to-success/5",
      badge: "badge-success",
      icon: "↑",
    },
    {
      label: "Total Expenses",
      value: fmt(expense),
      sub: "all debit entries",
      gradient: "from-error/20 to-error/5",
      badge: "badge-error",
      icon: "↓",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`card bg-gradient-to-br ${c.gradient} border border-base-300 shadow-xl hover:-translate-y-1 transition-transform duration-300 fade-up delay-${i + 2}`}
        >
          <div className="card-body gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest uppercase text-base-content/50">
                {c.label}
              </span>
              <span className={`badge ${c.badge} badge-sm font-mono`}>{c.icon}</span>
            </div>
            <p className="text-3xl font-bold font-mono text-base-content tracking-tight">
              {c.value}
            </p>
            <p className="text-xs text-base-content/40 font-mono">{c.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;