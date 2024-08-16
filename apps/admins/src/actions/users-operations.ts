"use server";

import { auth } from "@/auth";
import { UserCreationType } from "@/schemas-and-types/user-creation";
import { db } from "@/utils/db";

export async function createUser(user: UserCreationType) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("User is not authenticated");
    }
    // Hash the user's password before storing it

    // Create the user based on the provided role
    const createdUser = await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        emailVerified: new Date(),
        role: user.role,
        Mentor:
          user.role === "MENTOR"
            ? {
                create: {
                  mentorType: user.sub_role,
                  AdminId: session.user.id,
                },
              }
            : undefined,
        Student:
          user.role === "STUDENT"
            ? {
                create: {
                  // Add any Student-specific fields here
                  AdminId: session.user.id,
                },
              }
            : undefined,
        Admin:
          user.role === "ADMIN"
            ? {
                create: {
                  role: user.sub_role as any, // Ensure this matches your ADMIN_ROLE type
                },
              }
            : undefined,
      },
    });

    return createdUser;
  } catch (error) {
    console.log("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}
