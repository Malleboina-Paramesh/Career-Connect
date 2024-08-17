"use server";

import {
  MentorAdminCreationType,
  MentorCreationType,
  StudentAdminCreationType,
  StudentCreationType,
} from "@/schemas-and-types/user-creation";
import { db } from "@/utils/db";
import { getSessionUserDetails } from "@/utils/helpers";

export async function createStudent(data: StudentCreationType) {
  try {
    const user = await getSessionUserDetails();

    if (user.subRole === "STUDENT_ADMIN" || user.subRole === "MASTER_ADMIN") {
      const student = await db.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: data.password,
          role: "STUDENT",
          emailVerified: new Date(),
          Student: {
            create: {
              AdminId: user.realId,
            },
          },
        },
      });
      return { error: null, data: student };
    } else {
      return {
        error: "You are not authorized to perform this action",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return { error: "An error occured maybe email already exists", data: null };
  }
}

export async function createMentorAdmin(data: MentorAdminCreationType) {
  try {
    const user = await getSessionUserDetails();

    if (user.subRole === "MASTER_ADMIN") {
      const student = await db.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: data.password,
          role: "ADMIN",
          emailVerified: new Date(),
          Admin: {
            create: {
              role: "MENTOR_ADMIN",
            },
          },
        },
      });
      return { error: null, data: student };
    } else {
      return {
        error: "You are not authorized to perform this action",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return { error: "An error occured maybe email already exists", data: null };
  }
}

export async function createStudentAdmin(data: StudentAdminCreationType) {
  try {
    const user = await getSessionUserDetails();

    if (user.subRole === "MASTER_ADMIN") {
      const student = await db.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: data.password,
          role: "ADMIN",
          emailVerified: new Date(),
          Admin: {
            create: {
              role: "STUDENT_ADMIN",
            },
          },
        },
      });
      return { error: null, data: student };
    } else {
      return {
        error: "You are not authorized to perform this action",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return { error: "An error occured maybe email already exists", data: null };
  }
}

export async function createMentor(data: MentorCreationType) {
  try {
    const user = await getSessionUserDetails();

    if (user.subRole === "MENTOR_ADMIN" || user.subRole === "MASTER_ADMIN") {
      const student = await db.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: data.password,
          role: "MENTOR",
          emailVerified: new Date(),
          Mentor: {
            create: {
              mentorType: data.mentorType,
              AdminId: user.realId,
            },
          },
        },
      });
      return { error: null, data: student };
    } else {
      return {
        error: "You are not authorized to perform this action",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return { error: "An error occured maybe email already exists", data: null };
  }
}
