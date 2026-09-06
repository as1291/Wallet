import NextAuth from "next-auth";
import { authOptionsMerch } from "../../../../lib/auth";

const handler = NextAuth(authOptionsMerch);

export {handler as POST, handler as GET}