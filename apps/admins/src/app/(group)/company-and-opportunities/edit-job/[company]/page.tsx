import React from "react";
import AddOrUpdateJob from "../../_components/AddOrUpdateJob";

const page = ({
  params,
}: {
  params: {
    company: string;
  };
}) => {
  return (
    <div className="p-2">
      <h1 className="font-bold text-3xl">Edit Job</h1>
      <div className="">
        <AddOrUpdateJob
          action="update"
          company={params.company.replaceAll("-", " ")}
        />
      </div>
    </div>
  );
};

export default page;
