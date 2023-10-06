import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGO_URL || '');
const clientPromise = client.connect();

export const authOptions: NextAuthOptions = {
  adapter:  MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  //     pages: {
  //       signIn: "/auth/signin",
  //       signOut: '/auth/signout',
  //   },

  secret: process.env.SECRET,
}
