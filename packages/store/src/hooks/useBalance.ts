// packages/store/src/hooks/useBalance.ts
import { useBalanceStore } from "../store/useBalanceStore";

export const useBalance = () => {
  const balance = useBalanceStore((state) => state.balance);
  const setBalance = useBalanceStore((state) => state.setBalance);
  const increment = useBalanceStore((state) => state.increment);
  const decrement = useBalanceStore((state) => state.decrement);

  return {
    balance,
    setBalance,
    increment,
    decrement,
  };
};