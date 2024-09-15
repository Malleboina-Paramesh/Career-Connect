import React from "react";
import Jobs from "../../_components/Jobs";

const page = ({
  params,
}: {
  params: {
    company: string;
  };
}) => {
  return (
    <div className="p-2">
      <h1 className="text-3xl">Jobs</h1>
      <p className="text-sm text-gray-500">opennings in {params.company}</p>
      <div className="mt-3">
        <Jobs company={params.company.replace("-", " ")} />
      </div>
    </div>
  );
};

export default page;
