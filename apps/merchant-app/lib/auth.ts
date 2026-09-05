import GoogleProvider from "next-auth/providers/google";
import { Schema, db } from "@repo/db/client";
import { signIn } from "next-auth/react";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    
}