import express, { Request, Response } from "express";
// import {  } from "drizzle-orm";
import { db, users, and, or, desc, balances, onRampTransactions, eq, sql } from "@repo/db";

const app = express();
app.use(express.json());
app.get("/ping", (req: Request, res: Response) => {
    res.status(200).json({
        message: "check"
    })
})

app.post("/hdfcWebhook", async (req: Request, res: Response) => {
    const paymentInfo: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // console.log(paymentInfo.token);
    // console.log(paymentInfo.userId);
    // console.log(paymentInfo.amount);

    const existingUser = await db.select().from(users).where(eq(users.id, Number(paymentInfo.userId)));
    console.log(existingUser);

    let addedAmount : number = Number(paymentInfo.amount) * 100;


    try {
        await db.transaction(
            async (tx) => {
                await tx.update(balances).set({
                    // Fixed string interpolation syntax:
                    amount: sql`${balances.amount} + ${addedAmount}`
                }).where(
                    eq(balances.userId, Number(paymentInfo.userId))
                );

                await tx.update(onRampTransactions).set({
                    status: "Success"
                }).where(
                    eq(
                        onRampTransactions.token,
                        paymentInfo.token
                    )
                )
            }
        )
        res.json({
            message: "Captured"
        })

    } catch (e) {
        console.log(e);
        res.status(411).json({
            message: "error while processing webhook"
        })
    }

})

app.listen(5003, () => {
    console.log("bank webhook server is running on port 5003");
});