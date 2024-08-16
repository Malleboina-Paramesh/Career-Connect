import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "./auth.config";
import { db } from "./utils/db";
import { getUserByIdForJWT } from "./actions/user";

declare module "next-auth" {
  // Extend session to hold the extra user data
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      image: string;
      name: string;
    } & DefaultSession["user"];
  }

  // Extend JWT to hold the extra user data
  interface JWT {
    id: string;
    email: string;
    role: string;
    image: string;
    name: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const info = await getUserByIdForJWT(token.sub);
      if (!info) return token;
      token.id = info.id;
      token.email = info.email;
      token.role = info.role;
      token.image = info.image;
      token.name = info.name;
      return token;
    },
    async session({ session, token, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.email && session.user) {
        session.user.email = token.email;
      }
      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      if (token.image && session.user) {
        session.user.image = token.image as string;
      }
      if (token.name && session.user) {
        session.user.name = token.name;
      }

      console.log("Session:", session);
      console.log("Token:", token);
      return session;
    },
  },
});