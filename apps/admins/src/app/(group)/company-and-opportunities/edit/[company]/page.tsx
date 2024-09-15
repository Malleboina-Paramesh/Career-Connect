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
    <div className="p-2">
      <h1 className="font-bold text-3xl">Edit Company</h1>
      <div className="">
        <FormSection company={params.company.split("-").join(" ")} />
      </div>
    </div>
  );
};

export default page;
