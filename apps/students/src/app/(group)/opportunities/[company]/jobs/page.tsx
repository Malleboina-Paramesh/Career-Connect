import React from "react";
import OpportunitiesHistory from "@/components/History";
import JobTabs from "../../_components/JobTabs";
import JobsPage from "../../_components/JobsPage";

const page = async ({ params }: { params: { company: string } }) => {
  return (
    <div className=" h-full w-full">
      <div className="flex flex-col gap-2 md:flex-row  md:justify-between">
        <OpportunitiesHistory />
        <JobTabs />
      </div>
      <div className="mx-auto mt-3">
        <JobsPage company={params.company} />
      </div>
    </div>
  );
};

export default page;
