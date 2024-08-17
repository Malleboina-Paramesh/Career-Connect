import { getSessionUserDetails } from "@/utils/helpers";
import React from "react";
import CompanyCreationForm from "./_components/CompanyCreationForm";
import { db } from "@/utils/db";
import Link from "next/link";

const page = async () => {
  const user = await getSessionUserDetails();
  const companies = await db.company.findMany();
  return (
    <div>
      <h1>create comapny and add jobs </h1>
      <div>
        {(user.subRole === "MASTER_ADMIN" ||
          user.subRole === "ADVISOR_MENTOR") && (
          <div>
            <CompanyCreationForm />
            <div className="mt-7">
              <h1 className="text-4xl">Companies</h1>
              <div className="flex">
                {companies.map((company) => {
                  return (
                    <Link href={`/create/company/${company.id}`}>
                      <div className="shadow-md p-4">
                        <h1 className="text-3xl font-bold">{company.title}</h1>
                        <p>{company.description}</p>
                        <p>{company.location}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
