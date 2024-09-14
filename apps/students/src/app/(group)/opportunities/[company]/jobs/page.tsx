import React from "react";
import OpportunitiesHistory from "@/components/History";
import JobTabs from "../../_components/JobTabs";
import JobsPage from "../../_components/JobsPage";

const page = async ({ params }: { params: { company: string } }) => {
  return (
    <div className="p-3 h-full w-full">
      <div className="flex justify-between items-center">
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
