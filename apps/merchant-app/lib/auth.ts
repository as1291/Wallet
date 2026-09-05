import GoogleProvider from "next-auth/providers/google";
import { db, merchants, authTypeEnum } from "@repo/db/client";
import { signIn } from "next-auth/react";
// import Email from "next-auth/providers/email";
import { AuthOptions } from "next-auth";

export const authOptionsMerch : AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
        async signIn({ user, account }
            // :
            // {
            //     user:
            //     {
            //         email: string,
            //         name: string
            //     },
            //     account: { provider: "google" }
            // },
        ) {
            console.log("hi signin");
            if(!user || !user.email){
                return false;
            }

            await db.insert(merchants).values({
                email: user.email,
                name: user.name,
                authType: "Google"
            }).onConflictDoUpdate({
                target: merchants.email,
                set:{
                    name: user.name,
                    authType: "Google"
                }
            });
            return true;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || ""
}