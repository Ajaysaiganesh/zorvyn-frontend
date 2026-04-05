function TransactionTable({ transactions, role, deleteTransaction }) {
  const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

  return (
    <div className="card bg-base-100 border border-base-300 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-xs tracking-widest uppercase text-base-content/50">
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={role === "admin" ? 5 : 4}>
                  <div className="text-center py-12 text-base-content/30">
                    <div className="text-4xl mb-2">🚫</div>
                    <p className="font-mono text-sm">No transactions found</p>
                  </div>
                </td>
              </tr>
            ) : (
              [...transactions].reverse().map((t) => (
                <tr key={t.id} className="hover">
                  <td className="font-mono text-sm text-base-content/60">{t.date}</td>
                  <td className="font-semibold">{t.category}</td>
                  <td className={`font-mono font-bold ${t.type === "income" ? "text-success" : "text-error"}`}>
                    {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
                  </td>
                  <td>
                    <span className={`badge badge-sm font-bold uppercase tracking-wider ${
                      t.type === "income" ? "badge-success" : "badge-error"
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  {role === "admin" && (
                    <td>
                      <button
                        className="btn btn-error btn-xs btn-outline"
                        onClick={() => deleteTransaction(t.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;