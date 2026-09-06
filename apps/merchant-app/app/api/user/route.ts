import { NextResponse } from "next/server";
import { db, merchants } from "@repo/db";

export const GET = async () => {
    await db.insert(merchants).values({
        email: "asd",
        name: "adsads",
        authType: "Google"
    })
    return NextResponse.json({
        message: "hi there"
    })
}