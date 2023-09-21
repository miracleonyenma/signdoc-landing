import { authOptions } from "@/utils/authOptions";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
