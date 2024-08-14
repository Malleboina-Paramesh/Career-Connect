"use server";

import { db } from "@/utils/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function AddNewAdmin() {
  try {
    await db.user.create({
      data: {
        email: "admin@demo.com",
        name: "demo",
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
