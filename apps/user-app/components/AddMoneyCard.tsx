"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
},
{
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [onRampAmount, setOnRampAmount] = useState("0");
    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput placeholder="Amount" label="Amount" onChange={(val) => {
                    setOnRampAmount(val)
                }} />
                <div className="py-4 text-left">
                    Bank
                </div>
                <Select onSelect={(value) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                    setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
                }}
                    options={SUPPORTED_BANKS.map(x => ({
                        key: x.name,
                        value: x.name
                    }))}
                />
                <div className="flex justify-center pt-4">
                    <Button onClick={async () => {
                        const amount = Number(onRampAmount);
                        if (!amount || amount <= 0) {
                            alert("please enter valid amount");
                            return;
                        }
                        try {
                            await createOnRampTransaction(provider, amount);
                            window.location.href = redirectUrl || ""
                        } catch (error) {
                            console.log("failed to create on ramp transaction : ", error);
                        }
                    }}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    )
}