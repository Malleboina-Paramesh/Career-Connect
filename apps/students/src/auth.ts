import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { authConfig } from "./auth.config";
import { db } from "./utils/db";
import { getUserByIdForJWT } from "./actions/user";
import { AdminType, Mentor, MentorType, Role } from "@local/database";

declare module "next-auth" {
  // Extend session to hold the extra user data
  interface Session {
    user: {
      id: string;
      realId: string;
      email: string;
      role: Role;
      image: string;
      name: string;
      subRole: MentorType | AdminType;
    } & DefaultSession["user"];
  }

  // Extend JWT to hold the extra user data
  interface JWT {
    id: string;
    realId: string;
    email: string;
    role: Role;
    subRole: MentorType | AdminType;
    image: string;
    name: string;
    emailVerified: boolean;
  }

  // Extend User to hold the extra user data
  interface User {
    realId: string;
    role: Role;
    subRole: MentorType | AdminType;
    emailVerified: Date | null;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      //adding extra data to the token (it happens when user login for the first time) then after that it will be added to the session
      if (user) {
        token.id = user.id; // user id
        token.email = user.email;
        token.role = user.role; // main role
        token.subRole = user.subRole; // sub role
        token.image = user.image;
        token.name = user.name;
        token.realId = user.realId; // either mentorId or adminId
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          realId: token.realId as string,
          email: token.email as string,
          role: token.role as Role,
          subRole: token.subRole as MentorType | AdminType,
          image: token.image as string,
          name: token.name as string,
          emailVerified: token.emailVerified as Date | null,
        };
      }
      console.log("@@@@@@@@@session", session);
      return session;
    },
  },
});
