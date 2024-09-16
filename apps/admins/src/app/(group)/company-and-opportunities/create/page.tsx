import React from "react";
import AddOrUpdateCompany from "../_components/AddOrUpdateCompany";

const page = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Company creation</h1>
          <p className="text-sm text-gray-500">Create a new company</p>
        </div>

        {/* <ActionsSection action="create" /> */}
      </div>
      <div className="mt-3">
        <AddOrUpdateCompany action="add" />
      </div>
    </div>
  );
};

export default page;
