import React from "react";
import JobSearchPage from "./_components/JobSearchPage";
import { db } from "@/utils/db";

const Page = async () => {
  //TODO : this is not proper way to fetch data from db, you should server actions
  const companies = await db.company.findMany({
    include: {
      _count: {
        select: {
          Jobs: {
            where: {
              lastDate: {
                gte: new Date(),
              },
            },
          },
        },
      },
    },
  });
  return <JobSearchPage companies={companies} />;
};

export default Page;
