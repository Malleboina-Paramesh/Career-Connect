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
    <div className="">
      <h1 className="font-bold text-2xl">Edit Job</h1>
      <p className="text-sm text-gray-500">
        Edit a job in {decodeURIComponent(params.company)} company
      </p>
      <div className="mt-3">
        <AddOrUpdateJob
          action="update"
          company={decodeURIComponent(params.company)}
        />
      </div>
    </div>
  );
};

export default page;
