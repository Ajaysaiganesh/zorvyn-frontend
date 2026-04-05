import { useState, useMemo } from "react";
import { useFinanceStore } from "../store/useFinanceStore";
import TransactionTable from "../components/Transactions/TransactionTable";
import Filters from "../components/Transactions/Filters";
import TransactionForm from "../components/Transactions/TransactionForm";

function TransactionsPage() {
  const { transactions, deleteTransaction, role } = useFinanceStore();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  const filtered = useMemo(() => {
    let result = transactions.filter((t) => {
      const typeMatch = filter === "all" ? true : t.type === filter;
      const searchMatch =
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        String(t.amount).includes(search) ||
        t.date.includes(search);
      return typeMatch && searchMatch;
    });

    result = [...result].sort((a, b) => {
      let valA = sortKey === "amount" ? a.amount : a.date;
      let valB = sortKey === "amount" ? b.amount : b.date;
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [transactions, filter, search, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  
  const exportCSV = () => {
    const headers = ["Date,Category,Amount,Type"];
    const rows = filtered.map((t) => `${t.date},${t.category},${t.amount},${t.type}`);
    const blob = new Blob([...headers, ...rows].join("\n"), { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "transactions.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "transactions.json"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-6 fade-up delay-1">
        <h1 className="text-3xl font-bold tracking-tight text-base-content">Transactions</h1>
        <p className="text-base-content/40 text-sm font-mono mt-1">// manage your financial records</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 fade-up delay-2">
          <TransactionForm />
        </div>

        
        <div className="lg:col-span-2 fade-up delay-3">
          <div className="flex flex-wrap gap-3 mb-3 items-center">
            <input
              className="input input-bordered input-sm flex-1 min-w-[180px]"
              placeholder="🔍 Search by category, amount, date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
            <div className="join">
              <button
                className={`btn btn-sm join-item ${sortKey === "date" ? "btn-primary" : "btn-ghost border border-base-300"}`}
                onClick={() => toggleSort("date")}
              >
                Date {sortKey === "date" ? (sortDir === "asc" ? "↑" : "↓") : ""}
              </button>
              <button
                className={`btn btn-sm join-item ${sortKey === "amount" ? "btn-primary" : "btn-ghost border border-base-300"}`}
                onClick={() => toggleSort("amount")}
              >
                Amount {sortKey === "amount" ? (sortDir === "asc" ? "↑" : "↓") : ""}
              </button>
            </div>
            
            <div className="dropdown dropdown-end">
              <button className="btn btn-sm btn-ghost border border-base-300">
                Export ↓
              </button>
              <ul className="dropdown-content menu bg-base-100 rounded-box shadow border border-base-300 z-50 w-32 mt-1">
                <li><button onClick={exportCSV}>📄 CSV</button></li>
                <li><button onClick={exportJSON}>📦 JSON</button></li>
              </ul>
            </div>
          </div>

          
          <div className="flex items-center justify-between mb-3">
            <Filters filter={filter} setFilter={setFilter} />
            <span className="badge badge-ghost font-mono text-xs">
              {filtered.length} records
            </span>
          </div>

          <TransactionTable
            transactions={filtered}
            role={role}
            deleteTransaction={deleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;