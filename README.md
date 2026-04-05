# 💰 FinFlow — Personal Finance Dashboard
 
A modern, responsive personal finance dashboard built as part of the **Zorvyn Frontend Screening Assignment**. FinFlow helps users track income, expenses, and gain insights into their spending patterns — with a clean UI powered by React, DaisyUI, and Recharts.
 
---
 
## 🚀 Live Demo:https://zorvyn-frontend-peach.vercel.app/
 
> Run locally with `npm run dev` → [http://localhost:5173](http://localhost:5173)
 
 
## ✨ Features
 
- 📊 **Dashboard Overview** — Net balance, total income, total expenses, savings rate progress bar
- 📈 **Balance Trend Chart** — Area chart showing cumulative balance over time
- 🍩 **Spending Breakdown** — Donut pie chart grouped by expense category
- 💳 **Transactions Page** — Full transaction table with type filters (All / Income / Expense)
- ➕ **Add Transaction** — Admin-only form to add new transactions (amount, category, date, type)
- 🗑️ **Delete Transaction** — Admin-only delete per row
- 🔐 **Role-Based Access** — Viewer (read-only) vs Admin (full CRUD)
- 🎨 **Theme Switcher** — 7 DaisyUI themes: Luxury, Dark, Light, Cupcake, Forest, Dracula, Synthwave
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
 
---
 
## 🛠️ Tech Stack
 
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **Zustand** | Global state management |
| **React Router v7** | Client-side routing |
| **DaisyUI v4** | Component library & theming |
| **Tailwind CSS v3** | Utility-first styling |
| **Recharts** | Charts (AreaChart, PieChart) |
| **Google Fonts** | Syne + DM Mono typography |
 
---
 
## 📁 Project Structure
 
```
src/
├── components/
│   ├── common/
│   │   └── Navbar.jsx           # Sticky navbar with role switcher & theme selector
│   ├── Dashboard/
│   │   ├── SummaryCards.jsx     # Balance / Income / Expense cards
│   │   ├── BalanceChart.jsx     # Recharts AreaChart
│   │   └── CategoryChart.jsx   # Recharts Donut PieChart
│   ├── Transactions/
│   │   ├── TransactionForm.jsx  # Add transaction form (admin only)
│   │   ├── TransactionTable.jsx # Transactions table with delete
│   │   └── Filters.jsx          # Type filter button group
│   └── Insights/
│       └── InsightsCards.jsx    # KPI stat cards
├── pages/
│   ├── DashboardPage.jsx
│   ├── TransactionsPage.jsx
│   └── InsightsPage.jsx
├── store/
│   └── useFinanceStore.js       # Zustand store (transactions, role)
├── data/
│   └── mockData.js              # 10 seed transactions
├── utils/
│   └── helpers.js               # getIncome, getExpense, getTrendData, etc.
├── App.jsx                      # Root component with router & theme state
└── index.css                    # Tailwind directives + custom animations
```
 
---
 
## ⚙️ Getting Started
 
### Prerequisites
- Node.js v18+
- npm v9+
 
### Installation
 
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/zorvyn-frontend.git
 
# Navigate into the project
cd zorvyn-frontend
 
# Install dependencies
npm install
 
# Start the dev server
npm run dev
```
 
Open [http://localhost:5173](http://localhost:5173) in your browser.
 
### Build for Production
 
```bash
npm run build
npm run preview
```
 
---
 
## 🔐 Role System
 
| Feature | Viewer | Admin |
|---|---|---|
| View Dashboard | ✅ | ✅ |
| View Transactions | ✅ | ✅ |
| View Insights | ✅ | ✅ |
| Add Transaction | ❌ | ✅ |
| Delete Transaction | ❌ | ✅ |
 
Switch roles using the **dropdown in the navbar**.
 
---
 
## 🎨 Available Themes
 
Switch themes live using the theme selector in the navbar:
 
- 🖤 **Luxury** (default)
- 🌑 **Dark**
- ☀️ **Light**
- 🍭 **Cupcake**
- 🌲 **Forest**
- 🧛 **Dracula**
- 🌊 **Synthwave**
 
---
 
## 📊 Mock Data
 
The app ships with 10 seed transactions across these categories:
 
| Category | Type |
|---|---|
| Salary | Income |
| Freelance | Income |
| Bonus | Income |
| Food | Expense |
| Transport | Expense |
| Shopping | Expense |
 
---
 
## 🧠 State Management
 
Global state is managed with **Zustand**:
 
```js
{
  role: "viewer" | "admin",
  transactions: Transaction[],
  setRole: (role) => void,
  addTransaction: (tx) => void,
  deleteTransaction: (id) => void,
}
```
 
---
 
## 👨‍💻 Author
 
**Ajay Sai Ganesh Voruganti**
 
