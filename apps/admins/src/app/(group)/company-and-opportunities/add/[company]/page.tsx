import React from "react";
import AddOrUpdateJob from "../../_components/AddOrUpdateJob";

const page = ({ params }: { params: { company: string } }) => {
  return (
    <div className="">
      <h1 className="text-2xl">Add a opportunities</h1>
      <p className="text-sm text-gray-500">
        Add a openning in {params.company} company
      </p>
      <div className="mt-3">
        <AddOrUpdateJob
          action="add"
          company={params.company.replace("-", " ")}
        />
      </div>
    </div>
  );
};

export default page;
