"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import {
    db,
    users,
    eq,
    sql,
    balances,
    p2pTransfers,
} from "@repo/db"
// import { useSearchParams } from "next/navigation";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);

    const from = session?.user?.id;
    const fromUserNum = session?.user?.number;
    console.log(from);
    console.log(fromUserNum);


    // const from = session?.user?.number;

    if (!from && !fromUserNum) {
        return {
            message: "Error while sending"
        };
    }

    if (amount <= 0) {
        return {
            message: "Invalid amount"
        };
    }

    //to(string) - number
    const toUserId = parseInt(to);
    const fromUserId = parseInt(from);

    if (fromUserNum === toUserId) {
        return {
            message: "Cannot transfer to yourself"
        };
    }

    const [toUser] = await db
        .select()
        .from(users)
        .where(eq(users.number, to));

    if (!toUser) {
        return {
            message: "User not found"
        };
    }

    console.log(toUser);

    try {
        await db.transaction(async (tx) => {

            // Lock sender's balance
            const [fromBalance] = await tx
                .select()
                .from(balances)
                .where(eq(balances.userId, fromUserId))
                .for("update");

            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error("Insufficient funds");
            }

            // Deduct from sender
            await tx
                .update(balances)
                .set({
                    amount: sql`${balances.amount} - ${amount}`
                })
                .where(eq(balances.userId, fromUserId));

            // Add to receiver
            await tx
                .update(balances)
                .set({
                    amount: sql`${balances.amount} + ${amount}`
                })
                .where(eq(balances.userId, toUser.id));

            // Record transfer
            await tx
                .insert(p2pTransfers)
                .values({
                    amount: amount,
                    timestamp: new Date(),
                    fromUserId: fromUserId,
                    toUserId: toUser.id
                });
        });

        return {
            message: "Transfer successful"
        };

    } catch (e) {
        console.log(e);

        return {
            message: "Transaction failed"
        };
    }
}

export async function p2p(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const fromUserId = session?.user?.id;
    console.log(fromUserId);

    if (!fromUserId) {
        return ({
            message: "session expired"
        })
    }

    // const toUserNum = parseInt(to);
    const [toUser] = await db.select().from(users).where(eq(users.number, to));
    if (!toUser) {
        console.log("user not found");

        return ({
            message: "user not found"
        });
    }

    console.log(toUser);

    try {
        await db.transaction(async (tx) => {
            const [fromBalance] = await db.select().from(balances).where(eq(balances.userId, fromUserId)).for("update");
            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error("Insufficient funds");
            }
            await tx.update(balances).set(({
                amount: sql`${balances.amount} - ${amount}`
            })).where(eq(balances.userId, fromUserId));
            await tx.update(balances).set({
                amount: sql`${balances.amount} + ${amount}`
            }).where(eq(balances.userId, toUser.id));
            await tx.insert(p2pTransfers).values({
                amount: amount,
                timestamp: new Date(),
                fromUserId: fromUserId,
                toUserId: toUser.id
            })
        });
        return {
            message: "Transfer successful"
        };
    }
    catch (e) {
        console.log(e);
        return ({
            message: "Transaction failed"
        })
    }


}