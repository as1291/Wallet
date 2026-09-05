import { db, users, eq, and, or, desc, balances, onRampTransactions, sql } from "@repo/db";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    console.log(userId);
    
    if (!userId) {
        return { amount: 0, locked: 0 };
    }

    const [balance] = await db.select().from(balances).where(eq(balances.userId, userId));
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    if (!userId) {
        return [];
    }

    const txns = await db.select().from(onRampTransactions).where(eq(onRampTransactions.userId, userId));
    return txns.map(t=>({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney/>
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked}/>
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions}/>
                </div>
            </div>
        </div>
    </div>
}