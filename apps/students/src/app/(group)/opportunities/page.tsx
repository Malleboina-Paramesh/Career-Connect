import React from "react";
import SearchBar from "./_components/SearchBar";
import JobResults from "./_components/JobResults";

const Page = async () => {
  return (
    <div className="flex flex-col gap-2 items-center p-2 min-h-[calc(100vh-50px)]">
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
