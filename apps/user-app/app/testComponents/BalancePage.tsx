"use client";
import { useState } from "react";
import { useBalance } from "@repo/store";

export default function BalancePage() {
  const { balance,setBalance, increment, decrement } = useBalance();
  const [diffAmount, setDiffAmount] = useState(0);
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Current Balance: ₹{balance}</h1>
      <div className="flex gap-2">
        <input type="number" placeholder="enter amount" />
        <button 
          onClick={() => increment(100)} 
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Add ₹100
        </button>
        <button 
          onClick={() => increment(100)} 
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Add ₹100
        </button>
        <button 
          onClick={() => decrement(50)} 
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Deduct ₹50
        </button>
      </div>
    </div>
  );
}