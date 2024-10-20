import React from "react";
import FormSection from "../../_components/FormSection";

const page = ({
  params,
}: {
  params: {
    company: string;
  };
}) => {
  return (
    <div className="">
      <div>
        <h1 className="font-bold text-3xl">Edit Company</h1>
        <p className="text-sm text-gray-500">Edit company details</p>
      </div>
      <div className="mt-3 mr-4">
        <FormSection company={decodeURIComponent(params.company)} />
      </div>
    </div>
  );
};

export default page;
