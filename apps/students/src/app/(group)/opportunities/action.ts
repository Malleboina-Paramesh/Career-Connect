"use server";

import { auth } from "@/auth";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function applyForJob(jobId: string, companyId: string) {
  try {
    const user = await auth();
    if (!user?.user) return { error: "User not found" };
    await db.jobApplication.create({
      data: {
        studentId: user.user.realId,
        jobId,
      },
    });
    revalidatePath("/opportunities");
    revalidatePath(`/opportunities/${companyId}`);
    return { error: null };
  } catch (error) {
    console.log(error);
    return { error: "Error while applying for job maybe you already applied" };
  }
}
