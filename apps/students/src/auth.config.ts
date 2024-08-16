import { type NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas-and-types/login";
import { getUserByEmailForAuth } from "./actions/user";

export const authConfig = {
  providers: [
    credentials({
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

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
