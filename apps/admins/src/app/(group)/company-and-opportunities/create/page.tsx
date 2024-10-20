import React from "react";
import AddOrUpdateCompany from "../_components/AddOrUpdateCompany";

const page = () => {
  return (
    <div className="px-2 pt-2">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div>
          <h1 className="font-extrabold text-4xl text-gray-800">
            Create a Company
          </h1>
          <p className="text-md text-gray-500 mt-2">
            Start by filling in the details below to create a new company.
          </p>
        </div>

        {/* TODO: Optional Action Buttons */}
        {/* <ActionsSection action="create" /> */}
      </div>

      <div className=" py-2">
        <AddOrUpdateCompany action="add" />
      </div>
    </div>
  );
};

export default page;
