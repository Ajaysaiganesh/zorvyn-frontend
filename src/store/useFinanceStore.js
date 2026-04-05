import { create } from "zustand";
import { initialTransactions } from "../data/mockData";

export const useFinanceStore = create((set) => ({
  role: "viewer",
  transactions: initialTransactions,
  setRole: (role) => set({ role }),
  addTransaction: (tx) =>
    set((state) => ({ transactions: [...state.transactions, tx] })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));