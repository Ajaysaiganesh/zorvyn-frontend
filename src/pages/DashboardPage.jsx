import { useFinanceStore } from "../store/useFinanceStore";
import SummaryCards from "../components/Dashboard/SummaryCards";
import BalanceChart from "../components/Dashboard/BalanceChart";
import CategoryChart from "../components/Dashboard/CategoryChart";
import { getIncome, getExpense, getTrendData, getCategoryData, getSavingsRate } from "../utils/helpers";

function DashboardPage() {
  const { transactions } = useFinanceStore();
  const income = getIncome(transactions);
  const expense = getExpense(transactions);
  const balance = income - expense;
  const savings = getSavingsRate(transactions);
  const trendData = getTrendData(transactions);
  const categoryData = getCategoryData(transactions);

  return (
    <div>
      <div className="mb-8 fade-up delay-1">
        <h1 className="text-3xl font-bold tracking-tight text-base-content">
          Financial Overview
        </h1>
        <p className="text-base-content/40 text-sm font-mono mt-1">
          april 2026 · real-time tracking
        </p>
      </div>

      
      <SummaryCards income={income} expense={expense} balance={balance} />

      
      <div className="card bg-base-100 border border-base-300 shadow-md mb-6 fade-up delay-3">
        <div className="card-body py-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold tracking-widest uppercase text-base-content/50">
              Savings Rate
            </span>
            <span className="font-mono font-bold text-primary text-sm">{savings}%</span>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={savings}
            max="100"
          />
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 fade-up delay-4">
        <div className="card bg-base-100 border border-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="text-xs font-bold tracking-widest uppercase text-base-content/50 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded bg-primary inline-block" />
              Balance Trend
            </h2>
            <BalanceChart data={trendData} />
          </div>
        </div>
        <div className="card bg-base-100 border border-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="text-xs font-bold tracking-widest uppercase text-base-content/50 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded bg-secondary inline-block" />
              Spending Breakdown
            </h2>
            <CategoryChart data={categoryData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;