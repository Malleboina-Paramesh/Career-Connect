"use server";

import {
  CompanyCreationType,
  JobCreationType,
} from "@/schemas-and-types/user-creation";
import { db } from "@/utils/db";
import { getSessionUserDetails } from "@/utils/helpers";
import { revalidatePath } from "next/cache";

export async function createCompany(values: CompanyCreationType) {
  try {
    const user = await getSessionUserDetails();
    if (user.subRole !== "ADVISOR_MENTOR" && user.subRole !== "MASTER_ADMIN") {
      return {
        error: "You are not authorized to perform this action",
        data: null,
      };
    }
    const isAdmin = user.subRole === "MASTER_ADMIN";
    if (!isAdmin) {
      const data = await db.company.create({
        data: {
          description: values.description,
          location: values.location,
          title: values.title,
          mentorId: user.realId,
          image: values.image || "",
        },
      });
      return { error: null, data: data };
    }
    const data = await db.company.create({
      data: {
        description: values.description,
        location: values.location,
        title: values.title,
        AdminId: user.realId,
        image: values.image || "",
      },
    });
    revalidatePath("/create");
    return { error: null, data: data };
  } catch (error) {
    console.log(error);
    return {
      error: "An error occurred maybe compnay name already present",
      data: null,
    };
  }
}

export async function createJob(values: JobCreationType, companyId: string) {
  try {
    const user = await getSessionUserDetails();
    if (user.subRole !== "ADVISOR_MENTOR" && user.subRole !== "MASTER_ADMIN") {
      return {
        error: "You are not authorized to perform this action",
        data: null,
      };
    }
    const data = await db.job.create({
      data: {
        description: values.description,
        location: values.location,
        role: values.role,
        salary: values.salary,
        passedOutyear: values.passedOutYear,
        lastDate: values.lastDate,
        noOfOpenings: values.noOfOpenings,
        companyId: companyId,
        applyLink: values.applyLink || "",
      },
    });
    revalidatePath(`/create/company/${companyId}`);
    return { error: null, data: data };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred", data: null };
  }
}
