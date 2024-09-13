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
                name: true,
                email: true,
                role: true,
                Profile: {
                  select: {
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
                name: true,
                email: true,
                role: true,
                Profile: {
                  select: {
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
