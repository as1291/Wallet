"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/Center"
import { TextInput } from "@repo/ui/TextInput"
import { useState } from "react"
import { p2pTransfer, p2p } from "../app/lib/actions/p2pTransfer"

export const SendCard = () => {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder="number" label="number"
                        onChange={(value) => {
                            setNumber(value)
                        }} />
                    <TextInput placeholder="amount" label="amount"
                        onChange={(value) => {
                            setAmount(value)
                        }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={(async () => {
                            await p2p(number, parseInt(amount) * 100)
                        })}>
                            Send
                        </Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}