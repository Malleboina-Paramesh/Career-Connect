import React from "react";
import CompanyPage from "../_components/CompanyPage";
import { db } from "@/utils/db";

const Page = async ({
  params,
}: {
  params: {
    company: string;
  };
}) => {
  const companyDetails = await db.company.findUnique({
    where: {
      id: params.company,
    },
  });
  return <CompanyPage company={companyDetails} />;
};

export default Page;
