import { useState } from "react";
import { useFinanceStore } from "../store/useFinanceStore";
import TransactionTable from "../components/Transactions/TransactionTable";
import Filters from "../components/Transactions/Filters";
import TransactionForm from "../components/Transactions/TransactionForm";

function TransactionsPage() {
  const { transactions, deleteTransaction, role } = useFinanceStore();
  const [filter, setFilter] = useState("all");

  const filtered = transactions.filter((t) =>
    filter === "all" ? true : t.type === filter
  );

  return (
    <div>
      <div className="mb-8 fade-up delay-1">
        <h1 className="text-3xl font-bold tracking-tight text-base-content">
          Transactions
        </h1>
        <p className="text-base-content/40 text-sm font-mono mt-1">
           manage your financial records
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 fade-up delay-2">
          <TransactionForm />
        </div>
        <div className="lg:col-span-2 fade-up delay-3">
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