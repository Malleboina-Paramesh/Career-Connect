import React from "react";
import AddOrUpdateCompany from "../_components/AddOrUpdateCompany";

const page = () => {
  return (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Company creation</h1>
        {/* <ActionsSection action="create" /> */}
      </div>
      <div className="mt-2">
        <AddOrUpdateCompany action="add" />
      </div>
    </div>
  );
};

export default page;
