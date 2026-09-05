"use server"

import { db, onRampTransactions } from "@repo/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { v4 as uuidv4 } from "uuid"

export async function createOnRampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session?.user.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = uuidv4();
    if (!token) {
        return {
            message: "Unauthenticated request"
        }
    }

    let addedAmount : Number = amount*100;

    await db.insert(onRampTransactions).values({
        provider: provider,
        status: "Processing",
        startTime: new Date(),
        token: token,
        userId: Number(session?.user?.id),
        amount: amount * 100
    });

    try{
        await fetch ("http://localhost:5003/hdfcWebhook", {
            method: "POST",
            headers :{
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                token: token,
                user_identifier: session.user.id,
                amount: amount.toString()

            })
        })
    }catch(error){
        console.log("not able to call the bank hook : ", error);
        return;
    }


    return {
        message: "Done"
    }
}