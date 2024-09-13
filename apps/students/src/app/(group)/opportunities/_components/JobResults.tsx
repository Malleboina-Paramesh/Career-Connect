"use client";

import { useGeneralStore } from "@/Providers/ContextProvider";
import { Company } from "@local/database";
import Link from "next/link";
import { SearchCompanyByTitleType } from "../action";

const JobResults = () => {
  const { companies } = useGeneralStore();
  return (
    <div className="h-full w-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {companies.map((company) => (
        <Job key={company.id} company={company} />
      ))}
    </div>
  );
};

export default JobResults;

const Job = ({ company }: { company: SearchCompanyByTitleType }) => {
  return (
    <Link
      href={`/opportunities/${company.title}`}
      className="block w-full h-full transition-all duration-300 ease-in-out transform hover:scale-105 group"
    >
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
        <div className="h-48 w-full relative overflow-hidden">
          <img
            alt={company.title}
            src={company.image}
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
          />
          <Link href={`/opportunities/${company.title}/jobs`}>
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
              <span className="text-white text-lg font-bold px-4 py-2 bg-gray-900 bg-opacity-75 rounded-full">
                View Jobs
              </span>
            </div>
          </Link>
        </div>
        <div className="p-5">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {company.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {company.location}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {company.jobs} {company.jobs === 1 ? "job" : "jobs"} available
            </p>
            <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full invisible group-hover:visible">
              set goal
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
