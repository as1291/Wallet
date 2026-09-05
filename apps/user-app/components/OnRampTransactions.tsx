"use client"
import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({ transactions }: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    return (
        <Card title="Recent Transactions">
            {!transactions.length ? (
                <div className="text-center pb-8 pt-8">
                    No Recent transactions
                </div>
            ) : (
                <div className="pt-2">
                    {transactions.map(t => (
                        <div className="flex justify-between"
                            key={t.time.getTime()}>
                            <div>
                                <div className="text-sm">
                                    Received INR
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {t.time.toDateString()}
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {t.time.toLocaleTimeString()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                + Rs {t.amount / 100}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    )
}