import { useState } from "react";
import { useFinanceStore } from "../../store/useFinanceStore";

function TransactionForm() {
  const { addTransaction, role } = useFinanceStore();
  const [form, setForm] = useState({ amount: "", category: "", type: "expense", date: "" });

  if (role !== "admin") {
    return (
      <div className="alert alert-warning mb-4 rounded-xl">
        <span className="text-sm font-semibold">
          🔒 Switch to <strong>Admin</strong> mode to add or delete transactions.
        </span>
      </div>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) return;
    addTransaction({ ...form, id: Date.now(), amount: Number(form.amount) });
    setForm({ amount: "", category: "", type: "expense", date: "" });
  };

  return (
    <div className="card bg-base-100 border border-base-300 shadow-xl mb-6">
      <div className="card-body">
        <h2 className="text-xs font-bold tracking-widest uppercase text-base-content/50 mb-4 flex items-center gap-2">
          <span className="w-1 h-4 rounded bg-primary inline-block" />
          New Transaction
        </h2>
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold">Amount (₹)</span>
            </label>
            <input
              type="number"
              className="input input-bordered input-sm bg-base-200"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold">Category</span>
            </label>
            <input
              className="input input-bordered input-sm bg-base-200"
              placeholder="e.g. Food, Salary..."
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold">Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered input-sm bg-base-200"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold">Type</span>
            </label>
            <div className="join w-full">
              <button
                type="button"
                className={`btn btn-sm join-item flex-1 ${form.type === "income" ? "btn-success" : "btn-ghost"}`}
                onClick={() => setForm({ ...form, type: "income" })}
              >
                ↑ Income
              </button>
              <button
                type="button"
                className={`btn btn-sm join-item flex-1 ${form.type === "expense" ? "btn-error" : "btn-ghost"}`}
                onClick={() => setForm({ ...form, type: "expense" })}
              >
                ↓ Expense
              </button>
            </div>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn btn-primary w-full btn-sm mt-1">
              + Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;