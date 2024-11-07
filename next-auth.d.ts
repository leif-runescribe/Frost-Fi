// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id_token?: string; // Adding optional id_token property
    access_token?: string; // Adding optional access_token property
  }

  interface JWT {
    id_token?: string; // Adding optional id_token property
    access_token?: string; // Adding optional access_token property
  }
}
