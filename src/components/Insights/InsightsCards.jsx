function InsightsCards({ total, expense }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card bg-base-100 p-4 shadow">
        Total Transactions: {total}
      </div>

      <div className="card bg-base-100 p-4 shadow">
        Total Expense: ₹{expense}
      </div>
    </div>
  );
}
export default InsightsCards;