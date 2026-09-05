import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import { db, users, eq, and, or, desc, balances, onRampTransactions, sql } from "@repo/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "phone", type: " text", placeholder: "123456789", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials: any) {
                if (!credentials?.phone || !credentials?.password) return null;

                const hashedPassword = await bcrypt.hash(credentials.password, 10);

                const [existingUser] = await
                    db.select().from(users).where(eq(users.number, credentials.phone));

                if (existingUser) {
                    const passwordValidation = await
                        bcrypt.compare(credentials.password, existingUser.password);

                    console.log("logged in : ", existingUser);
                    

                    if (passwordValidation)
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email,
                            number: existingUser.number
                        }

                    return null;

                }

                try {
                    const [user] = await db.insert(users).values({
                        number: credentials.phone,
                        password: hashedPassword
                    }).returning();

                    if (!user) {
                        return null;
                    } else {
                        const [userBalance] = await db.insert(balances).values({
                            userId: user.id,
                            amount: 0,
                            locked: 0
                        }).returning();

                        console.log(userBalance);

                    }

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        number: user.number
                    }

                } catch (e) {
                    console.log(e);
                }
                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ token, session }: any) {
            console.log(session);
            
            session.user.id = token.sub
            return session;
        }
    }
}