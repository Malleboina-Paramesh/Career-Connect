"use server";

import { auth } from "@/auth";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function applyForJob(jobId: string, company: string) {
  try {
    const user = await auth();
    if (!user?.user) return { error: "User not found" };

    await db.jobApplication.create({
      data: {
        studentId: user.user.realId,
        jobId,
      },
    });

    revalidatePath(`/opportunities/${company}/jobs`);
    return { error: null };
  } catch (error) {
    console.log(error);
    return { error: "Error while applying for job maybe you already applied" };
  }
}

export async function searchCompanyByTitle(title: string) {
  try {
    const companies = await db.company.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
      include: {
        _count: {
          select: {
            Jobs: {
              where: {
                lastDate: {
                  gt: new Date(Date.now()),
                },
              },
            },
          },
        },
      },
      take: 10,
    });

    const filteredData = companies.map((company) => ({
      ...company,
      jobs: company._count.Jobs,
      _count: undefined,
    }));

    return filteredData;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export type SearchCompanyByTitleType = Awaited<
  ReturnType<typeof searchCompanyByTitle>
>[0];

export async function companyDetailedInfo(title: string) {
  try {
    const company = await db.company.findUnique({
      where: {
        title,
      },
      include: {
        Jobs: {
          where: {
            lastDate: {
              gt: new Date(Date.now()),
            },
          },
        },
        Mentor: {
          include: {
            user: {
              select: {
                email: true,
                role: true,
                Profile: {
                  select: {
                    name: true,
                    image: true,
                    profession: true,
                    phone: true,
                  },
                },
              },
            },
          },
        },
        Admin: {
          select: {
            user: {
              select: {
                email: true,
                role: true,
                Profile: {
                  select: {
                    name: true,
                    image: true,
                    profession: true,
                    phone: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!company) return null;

    const locations = company.Jobs.map((job) => job.location);
    company.location = locations.join(", ");

    return company;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export type CompanyDetailedInfoType = Awaited<
  ReturnType<typeof companyDetailedInfo>
>;

export async function companyJobs(title: string, filter: "active" | "applied") {
  try {
    const session = await auth();
    if (!session) return [];
    const user = session.user;
    const company = await db.company.findUnique({
      where: {
        title,
      },
      include: {
        Jobs: {
          include: {
            JobApplication: {
              select: {
                studentId: true,
              },
            },
          },
        },
      },
    });

    if (!company) return [];

    const jobs = company.Jobs.map((job) => ({
      id: job.id,
      role: job.role,
      description: job.description,
      location: job.location,
      salary: job.salary,
      noOfOpenings: job.noOfOpenings,
      lastDate: job.lastDate,
      passedOutyear: job.passedOutyear,
      companyId: job.companyId,
      company: company.title,
      applied: job.JobApplication.some((app) => app.studentId === user.realId),
      companyImage: company.image,
      applyLink: job.applyLink,
    }));

    if (filter === "active") {
      return jobs.filter((job) => new Date(job.lastDate) > new Date());
    } else {
      return jobs.filter((job) => job.applied);
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export type CompanyJobsType = Awaited<ReturnType<typeof companyJobs>>[0];
