"use server";

import { auth } from "@/auth";
import { db } from "@/utils/db";
import { AdminType, MentorType } from "@local/database";
import { revalidatePath } from "next/cache";
import { CompanyDraftType } from "./_components/AddOrUpdateCompany";
import { JobDraftType } from "./_components/AddOrUpdateJob";

export async function getCompanies() {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized", data: null };
    const { user } = session;
    const access: (MentorType | AdminType)[] = [
      "MASTER_ADMIN",
      "MENTOR_ADMIN",
      "COMPANY_MENTOR",
    ];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized", data: null };
    }

    if (user.subRole === "COMPANY_MENTOR") {
      const data = await db.company.findMany({
        where: {
          Mentor: {
            id: user.realId,
          },
        },
        include: {
          Mentor: true,
        },
      });

      return { error: null, data };
    }

    const data = await db.company.findMany({
      include: {
        Mentor: true,
      },
    });

    return { error: null, data };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong", data: null };
  }
}

export type CompanyType = Awaited<ReturnType<typeof getCompanies>>;

export async function createCompany(data: CompanyDraftType) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized" };
    const { user } = session;

    const access: (MentorType | AdminType)[] = [
      "MASTER_ADMIN",
      "MENTOR_ADMIN",
      "COMPANY_MENTOR",
    ];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized" };
    }

    const company = await db.company.findFirst({
      where: {
        title: data.title,
      },
    });

    if (company) {
      return { error: "company already exists" };
    }

    const processedData: CompanyDraftType = {
      ...data,
      description: JSON.stringify(data.description),
      location: JSON.stringify(data.location),
      process: JSON.stringify(data.process),
      sections: JSON.stringify(data.sections),
    };

    await db.company.create({
      data: {
        title: data.title,
        description: processedData.description,
        location: processedData.location,
        website: data.website,
        linkedin: data.linkedin,
        process: processedData.process,
        logo: data.logo,
        sections: processedData.sections,
      },
    });

    revalidatePath("/company-and-opportunities");

    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong" };
  }
}

export async function updateCompany(data: CompanyDraftType) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized" };
    const { user } = session;

    const access: (MentorType | AdminType)[] = [
      "MASTER_ADMIN",
      "MENTOR_ADMIN",
      "COMPANY_MENTOR",
    ];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized" };
    }

    const company = await db.company.findFirst({
      where: {
        title: data.title,
      },
    });

    if (!company) {
      return { error: "company not found" };
    }

    const processedData: CompanyDraftType = {
      ...data,
      description: JSON.stringify(data.description),
      location: JSON.stringify(data.location),
      process: JSON.stringify(data.process),
      sections: JSON.stringify(data.sections),
    };

    await db.company.update({
      where: {
        title: data.title,
      },
      data: {
        ...processedData,
      },
    });

    revalidatePath("/company-and-opportunities");

    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong" };
  }
}

export async function getCompanyByTitle(title: string) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized", data: null };
    const { user } = session;
    const access: (MentorType | AdminType)[] = [
      "MASTER_ADMIN",
      "MENTOR_ADMIN",
      "COMPANY_MENTOR",
    ];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized", data: null };
    }

    const data = await db.company.findFirst({
      where: {
        title,
      },
    });

    return { error: null, data };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong", data: null };
  }
}

export async function createJob(company: string, data: JobDraftType) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized" };
    const { user } = session;

    const access: (MentorType | AdminType)[] = [
      "MASTER_ADMIN",
      "MENTOR_ADMIN",
      "COMPANY_MENTOR",
    ];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized" };
    }

    const companyData = await db.company.findUnique({
      where: {
        title: company,
      },
    });

    if (!companyData) {
      return { error: "company not found" };
    }

    const des = JSON.stringify(data.description);

    await db.job.create({
      data: {
        applyLink: data.applyLink,
        description: des,
        images: data.images,
        lastDate: data.lastDate,
        location: data.location,
        noOfOpenings: data.noOfOpenings,
        passedOutyear: data.passedOutyear,
        role: data.role,
        salary: data.salary,
        companyId: companyData.id,
      },
    });

    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong" };
  }
}

export async function updateJob(company: string, data: JobDraftType) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized" };
    const { user } = session;

    const access: (MentorType | AdminType)[] = [
      "MASTER_ADMIN",
      "MENTOR_ADMIN",
      "COMPANY_MENTOR",
    ];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized" };
    }

    const des = JSON.stringify(data.description);

    const companyData = await db.company.findUnique({
      where: {
        title: company,
      },
    });

    if (!companyData) {
      return { error: "company not found" };
    }

    await db.job.update({
      where: {
        id: data.id,
        companyId: companyData.id,
      },
      data: {
        ...data,
        description: des,
      },
    });

    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong" };
  }
}

export async function deleteJob(company: string, id: string) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized" };
    const { user } = session;

    const access: (MentorType | AdminType)[] = [
      "MASTER_ADMIN",
      "MENTOR_ADMIN",
      "COMPANY_MENTOR",
    ];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized" };
    }

    await db.job.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/company-and-opportunities/jobs/${company}`);

    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong" };
  }
}

export async function getJobById(id: string) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized", data: null };
    const { user } = session;
    const access: (MentorType | AdminType)[] = [
      "MASTER_ADMIN",
      "MENTOR_ADMIN",
      "COMPANY_MENTOR",
    ];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized", data: null };
    }

    const data = await db.job.findUnique({
      where: {
        id,
      },
    });

    return { error: null, data };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong", data: null };
  }
}

export async function getJobsByCompany(company: string) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized", data: null };
    const { user } = session;
    const access: (MentorType | AdminType)[] = [
      "MASTER_ADMIN",
      "MENTOR_ADMIN",
      "COMPANY_MENTOR",
    ];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized", data: null };
    }

    const companyData = await db.company.findUnique({
      where: {
        title: company,
      },
    });

    if (!companyData) {
      return { error: "company not found", data: null };
    }

    const data = await db.job.findMany({
      where: {
        companyId: companyData.id,
      },
      orderBy: {
        lastDate: "asc",
      },
    });

    return { error: null, data };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong", data: null };
  }
}

export type JobResultsType = Awaited<ReturnType<typeof getJobsByCompany>>;

export async function getMentorByCompanyTitle(company: string) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized", data: null };
    const { user } = session;

    const access: (MentorType | AdminType)[] = [
      "MASTER_ADMIN",
      "MENTOR_ADMIN",
      "COMPANY_MENTOR",
    ];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized", data: null };
    }

    const data = await db.company.findUnique({
      where: {
        title: company,
      },
      include: {
        Mentor: {
          include: {
            user: {
              include: {
                Profile: true,
              },
            },
          },
        },
      },
    });

    if (!data) {
      return { error: "company not found", data: null };
    }

    if (!data.Mentor) {
      return { error: "mentor not found", data: null };
    }

    const mentor = {
      name: data.Mentor.user.Profile?.name,
      phone: data.Mentor.user.Profile?.phone,
      email: data.Mentor.user.email,
      bio: data.Mentor.user.Profile?.bio,
      profession: data.Mentor.user.Profile?.profession,
      image: data.Mentor.user.Profile?.image,
    };

    return { error: null, data: mentor };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong", data: null };
  }
}

export type MentorDetailsType = Awaited<
  ReturnType<typeof getMentorByCompanyTitle>
>;

export async function getMentorByEmail(email: string) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized", data: null };
    const { user } = session;

    const access: (MentorType | AdminType)[] = ["MASTER_ADMIN", "MENTOR_ADMIN"];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized", data: null };
    }

    const data = await db.user.findUnique({
      where: {
        email,
      },
      include: {
        Profile: true,
        Mentor: true,
      },
    });

    if (!data || !data.Mentor || data.Mentor.mentorType !== "COMPANY_MENTOR") {
      return { error: "mentor not found", data: null };
    }

    const mentor = {
      name: data.Profile?.name,
      phone: data.Profile?.phone,
      email: data.email,
      bio: data.Profile?.bio,
      profession: data.Profile?.profession,
      image: data.Profile?.image,
    };

    return { error: null, data: mentor };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong", data: null };
  }
}

export type MentorDetailsTypeByEmail = Awaited<
  ReturnType<typeof getMentorByEmail>
>;

export async function searchMentorsByEmail(email: string) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized", data: null };
    const { user } = session;

    const access: (MentorType | AdminType)[] = ["MASTER_ADMIN", "MENTOR_ADMIN"];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized", data: null };
    }

    const data = await db.user.findMany({
      where: {
        email: {
          contains: email,
        },
        Mentor: {
          mentorType: "COMPANY_MENTOR",
        },
      },
      include: {
        Profile: true,
        Mentor: true,
      },
    });

    if (!data || data.length === 0) {
      return { error: "mentor not found", data: null };
    }

    const mentors = data.map((item) => ({
      name: item.Profile?.name,
      phone: item.Profile?.phone,
      email: item.email,
      bio: item.Profile?.bio,
      profession: item.Profile?.profession,
      image: item.Profile?.image,
    }));

    return { error: null, data: mentors };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong", data: null };
  }
}

export type MentorDetailsListType = Awaited<
  ReturnType<typeof searchMentorsByEmail>
>;

export async function assignMentor(company: string, email: string) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized" };
    const { user } = session;

    const access: (MentorType | AdminType)[] = ["MASTER_ADMIN", "MENTOR_ADMIN"];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized" };
    }

    const companyData = await db.company.findUnique({
      where: {
        title: company,
      },
      include: {
        Mentor: true,
      },
    });

    if (!companyData) {
      return { error: "company not found" };
    }

    const mentorData = await db.mentor.findFirst({
      where: {
        user: {
          email,
        },
      },
    });

    if (!mentorData) {
      return { error: "mentor not found" };
    }

    if (companyData.Mentor) {
      if (companyData.Mentor.id !== mentorData.id) {
        return { error: "mentor already allocated to this company" };
      }
    }

    await db.company.update({
      where: {
        title: company,
      },
      data: {
        Mentor: {
          connect: {
            id: mentorData.id,
          },
        },
      },
    });

    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong" };
  }
}

export async function removeMentorByCompanyTitle(company: string) {
  try {
    const session = await auth();
    if (!session?.user) return { error: "not authorized" };
    const { user } = session;

    const access: (MentorType | AdminType)[] = ["MASTER_ADMIN", "MENTOR_ADMIN"];

    if (!access.includes(user.subRole)) {
      return { error: "not authorized" };
    }

    const companyData = await db.company.findUnique({
      where: {
        title: company,
      },
    });

    if (!companyData) {
      return { error: "company not found" };
    }

    await db.company.update({
      where: {
        title: company,
      },
      data: {
        Mentor: {
          disconnect: true,
        },
      },
    });

    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "something went wrong" };
  }
}
