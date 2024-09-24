"use server";

import {
  MentorAdminCreationType,
  MentorCreationType,
  StudentAdminCreationType,
  StudentCreationType,
} from "@/schemas-and-types/user-creation";
import { db } from "@/utils/db";
import { getSessionUserDetails } from "@/utils/helpers";
import { AccessFormType } from "./_components/AccessCreationForm";
import { auth } from "@/auth";

export async function createStudent(data: StudentCreationType) {
  try {
    const session = await auth();

    if (!session)
      return {
        error: "You are not authorized to perform this action",
        data: null,
      };

    const user = session.user;

    if (user.subRole === "STUDENT_ADMIN" || user.subRole === "MASTER_ADMIN") {
      const student = await db.user.create({
        data: {
          email: data.email,
          password: data.password,
          role: "STUDENT",
          emailVerified: new Date(),
          Student: {
            create: {
              AdminId: user.realId,
            },
          },
          Profile: {
            create: {
              name: data.name,
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
    const session = await auth();

    if (!session)
      return {
        error: "You are not authorized to perform this action",
        data: null,
      };

    const user = session.user;

    if (user.subRole === "MASTER_ADMIN") {
      const student = await db.user.create({
        data: {
          email: data.email,
          password: data.password,
          role: "ADMIN",
          emailVerified: new Date(),
          Admin: {
            create: {
              role: "MENTOR_ADMIN",
            },
          },
          Profile: {
            create: {
              name: data.name,
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
    const session = await auth();

    if (!session)
      return {
        error: "You are not authorized to perform this action",
        data: null,
      };

    const user = session.user;

    if (user.subRole === "MASTER_ADMIN") {
      const student = await db.user.create({
        data: {
          email: data.email,

          password: data.password,
          role: "ADMIN",
          emailVerified: new Date(),
          Admin: {
            create: {
              role: "STUDENT_ADMIN",
            },
          },
          Profile: {
            create: {
              name: data.name,
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
    const session = await auth();

    if (!session)
      return {
        error: "You are not authorized to perform this action",
        data: null,
      };

    const user = session.user;

    if (user.subRole === "MENTOR_ADMIN" || user.subRole === "MASTER_ADMIN") {
      const student = await db.user.create({
        data: {
          email: data.email,
          password: data.password,
          role: "MENTOR",
          emailVerified: new Date(),
          Mentor: {
            create: {
              mentorType: data.mentorType,
              AdminId: user.realId,
            },
          },
          Profile: {
            create: {
              name: data.name,
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

export async function createAccess(data: AccessFormType) {
  try {
    const session = await auth();
    if (!session)
      return {
        error: "You are not authorized to perform this action",
        data: null,
      };
    const user = session.user;

    if (user.role !== "ADMIN")
      return {
        error: "You are not authorized to perform this action",
        data: null,
      };

    if (data.role === "ADMIN" || data.role === "MENTOR") {
      if (!data.subRole) {
        return {
          error: "add sub role",
          data: null,
        };
      }
    }

    if (data.email === user.email)
      return { error: "You cannot create an account for yourself", data: null };

    const existingUser = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingUser)
      return {
        error: "A user with this email already exists",
        data: null,
      };

    let createdUser;
    if (
      data.role === "STUDENT" &&
      (user.subRole === "STUDENT_ADMIN" || user.subRole === "MASTER_ADMIN")
    ) {
      createdUser = await db.user.create({
        data: {
          email: data.email,
          password: data.email,
          role: "STUDENT",
          isVerified: true,

          emailVerified: new Date(),
          Student: {
            create: {
              AdminId: user.realId,
            },
          },
          Profile: {
            create: {
              name: data.name,
            },
          },
        },
      });
    } else if (
      data.role === "MENTOR" &&
      (user.subRole === "MASTER_ADMIN" || user.subRole === "MENTOR_ADMIN")
    ) {
      createdUser = await db.user.create({
        data: {
          email: data.email,
          password: data.email,
          role: "MENTOR",
          isVerified: true,

          emailVerified: new Date(),
          Mentor: {
            create: {
              mentorType: data.subRole as
                | "TRAINER_MENTOR"
                | "ADVISOR_MENTOR"
                | "COMPANY_MENTOR",
              AdminId: user.realId,
            },
          },
          Profile: {
            create: {
              name: data.name,
            },
          },
        },
      });
    } else if (data.role === "ADMIN" && user.subRole === "MASTER_ADMIN") {
      createdUser = await db.user.create({
        data: {
          email: data.email,
          password: data.email,
          role: "ADMIN",
          isVerified: true,
          emailVerified: new Date(),
          Admin: {
            create: {
              role: data.subRole as
                | "MENTOR_ADMIN"
                | "STUDENT_ADMIN"
                | "MASTER_ADMIN",
              createdBy: user.realId,
            },
          },
          Profile: {
            create: {
              name: data.name,
            },
          },
        },
      });
    }
    return { error: null, data: createdUser };
  } catch (error) {
    console.log(error);
    return { error: "An error occured maybe email already exists", data: null };
  }
}

export type UserCreationType = Awaited<ReturnType<typeof createAccess>>;

export async function getMentors() {
  try {
    const session = await auth();
    if (!session) return [];
    const user = session.user;

    if (user.role !== "ADMIN") return [];

    let mentors = await db.user.findMany({
      where: {
        role: "MENTOR",
      },
      include: {
        Mentor: {
          select: {
            id: true,
            mentorType: true,
            AdminId: true,

            Admin: {
              select: {
                user: {
                  select: {
                    email: true,
                    Profile: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        Profile: {
          select: {
            name: true,
          },
        },
      },
    });

    const data = mentors.map((mentor) => {
      return {
        id: mentor.id,
        email: mentor.email,
        name: mentor.Profile?.name || "No name",
        mentorType: mentor.Mentor?.mentorType,
        adminId: mentor.Mentor?.AdminId,
        adminEmail: mentor.Mentor?.Admin.user.email,
        adminName: mentor.Mentor?.Admin.user.Profile?.name || "No name",
      };
    });

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export type MentorTableDataType = Awaited<ReturnType<typeof getMentors>>;

export async function getStudents() {
  try {
    const session = await auth();
    if (!session) return [];
    const user = session.user;

    if (user.role !== "ADMIN") return [];

    let students = await db.user.findMany({
      where: {
        role: "STUDENT",
      },
      include: {
        Student: {
          select: {
            id: true,
            AdminId: true,
            Admin: {
              select: {
                user: {
                  select: {
                    email: true,
                    Profile: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        Profile: {
          select: {
            name: true,
          },
        },
      },
    });

    const data = students.map((student) => {
      return {
        id: student.id,
        email: student.email,
        name: student.Profile?.name || "No name",
        adminId: student.Student?.AdminId,
        adminEmail: student.Student?.Admin.user.email,
        adminName: student.Student?.Admin.user.Profile?.name || "No name",
      };
    });

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export type StudentTableDataType = Awaited<ReturnType<typeof getStudents>>;

export async function getAdmins() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") return [];

    const admins = await db.user.findMany({
      where: { role: "ADMIN" },
      include: {
        Admin: {
          select: {
            role: true,
            createdBy: true,
          },
        },
        Profile: {
          select: { name: true },
        },
      },
    });

    const data = await Promise.all(
      admins.map(async (admin) => {
        let creator = null;
        if (admin.Admin?.createdBy) {
          creator = await db.admin.findFirst({
            where: { id: admin.Admin.createdBy },
            include: {
              user: {
                select: {
                  email: true,
                  Profile: {
                    select: { name: true },
                  },
                },
              },
            },
          });
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.Profile?.name || "No name",
          adminType: admin.Admin?.role,
          createdBy: admin.Admin?.createdBy,
          createdByName: creator?.user.Profile?.name || "No name",
          createdByEmail: creator?.user.email || "No email",
        };
      })
    );

    return data;
  } catch (error) {
    console.error("Error in getAdmins:", error);
    return [];
  }
}

export type AdminTableDataType = Awaited<ReturnType<typeof getAdmins>>;
