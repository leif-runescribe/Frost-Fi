import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  secret: 'aQTpVtFgzTDL9qAkTiDMepYUHzTsNH7bis5X3+DUkK0=',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.id_token = account.id_token; // Store ID token
      }
      return token; // Return the modified token
    },
    async session({ session, token }) {
      session.id_token = token.id_token as string; // Attach ID token to session
      return session; // Return the modified session
    },
  }
  
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };