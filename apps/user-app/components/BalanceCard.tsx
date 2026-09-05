"use client"

import { Card } from "@repo/ui/card"

export const BalanceCard = ({amount, locked}:{
    amount: any,
    locked : any
})=>{
    
    return (
        <Card title="Balance">
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div >
                    Unlocked Amount
                </div>
                <div>
                     {amount / 100} INR
                </div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>
                    Total Locked Balance
                </div>
                <div>
                     {locked / 100} INR
                </div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>
                    Total Balance
                </div>
                <div>
                     {(locked + amount) / 100} INR
                </div>
            </div>
        </Card>
    )
}