"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginUser(data: { email: string; password: string }) {
  try {
    console.log("Login attempt for:", data.email);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false, // Handle redirection manually
    });
    console.log("SignIn result:", result);
    return result;
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error; // Rethrow if it's not an AuthError
  }
}
