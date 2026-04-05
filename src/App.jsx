import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/common/Navbar";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";

function App() {
  const [theme, setTheme] = useState("luxury");

  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <div className="min-h-screen bg-base-200">
          <Navbar theme={theme} setTheme={setTheme} />
          <div className="max-w-7xl mx-auto p-6">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;