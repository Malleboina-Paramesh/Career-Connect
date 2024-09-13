import React from "react";
import { db } from "@/utils/db";
import SearchBar from "./_components/SearchBar";
import JobResults from "./_components/JobResults";

const Page = async () => {
  //TODO : this is not proper way to fetch data from db, you should server actions
  // const companies = await db.company.findMany({
  //   include: {
  //     _count: {
  //       select: {
  //         Jobs: {
  //           where: {
  //             lastDate: {
  //               gte: new Date(),
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  // console.log(companies);
  return (
    <div className="flex flex-col gap-2 items-center p-2">
      <h1 className=" font-bold  text-5xl">opportunities</h1>
      <span className=" text-sm text-gray-500">
        find the company that you want to work for and apply for the job that
        you like the most 🚀
      </span>
      <SearchBar />
      <JobResults />
    </div>
  );
};

export default Page;
