// packages/store/src/store/useBalanceStore.ts
import { create } from "zustand";

interface BalanceStore {
  balance: number;
  setBalance: (balance: number) => void;
  increment: (amount: number) => void;
  decrement: (amount: number) => void;
}

export const useBalanceStore = create<BalanceStore>((set) => ({
  balance: 100,
  setBalance: (balance) => set({ balance }),
  increment: (amount) => set((state) => ({ balance: state.balance + amount })),
  decrement: (amount) => set((state) => ({ balance: state.balance - amount })),
}));