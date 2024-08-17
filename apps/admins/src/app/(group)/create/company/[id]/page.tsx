import { db } from "@/utils/db";
import React from "react";
import JobCreationForm from "../../_components/JobCreationForm";

const page = async ({ params }: { params: { id: string } }) => {
  const company = await db.company.findUnique({
    where: {
      id: params.id,
    },
    include: {
      Jobs: true,
    },
  });
  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <div className="overflow-y-auto h-full">
      <JobCreationForm companyId={params.id} />
      <pre>{JSON.stringify(company, null, 2)}</pre>
    </div>
  );
};

export default page;
