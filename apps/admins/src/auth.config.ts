import { type NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas-and-types/login";
import { getUserByEmailForAuth } from "./actions/user";

export const authConfig = {
  providers: [
    credentials({
      // @ts-ignore
      async authorize(credentials) {
        const isValid = LoginSchema.safeParse(credentials);

        if (!isValid.success) {
          console.log("Validation failed:", isValid.error);
          return null;
        }

        const user = await getUserByEmailForAuth(isValid.data.email);

        if (!user) {
          console.log("No user found");
          return null;
        }

        if (user.password !== isValid.data.password) {
          console.log("Password mismatch");
          return null;
        }

        console.log("User found:", user);

        //it will go to jwt callback
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          realId: user.realId,
          image: user.image,
          name: user.name,
          subRole: user.subRole,
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
