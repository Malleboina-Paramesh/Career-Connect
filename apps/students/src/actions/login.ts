"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginUser(data: {
  email: string;
  password: string;
  device: { browser: string; os: string; deviceType: string };
}) {
  try {
    console.log("Login attempt for:", data.email);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log("SignIn result:", result);

    // Send login details and device information to the backend
    await fetch(
      `${process.env.BACKEND_URL}${process.env.API_PATH}/email/notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: data.email,
          loginTime: new Date().toISOString(),
          device: data.device,
        }),
      }
    );

    return result;
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        case "AccessDenied":
          return { error: "Access Denied" };
        default:
          return { error: "Something went wrong! or no account" };
      }
    }
    throw error;
  }
}
