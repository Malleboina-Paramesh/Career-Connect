import { auth } from "@/auth";
import { AdminType, MentorType } from "@local/database";
import React from "react";
import CompaniesSection from "./_components/CompaniesSection";
import { Button } from "@local/ui/components/button";
import Link from "next/link";

const page = async () => {
  const session = await auth();
  if (!session?.user) return null;
  const { user } = session;

  const access: (MentorType | AdminType)[] = [
    "MASTER_ADMIN",
    "MENTOR_ADMIN",
    "COMPANY_MENTOR",
  ];

  return (
    <div className="">
      {access.includes(user.subRole) ? (
        <div className="flex flex-col gap-3 w-full h-full ">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold text-2xl">Companys</h1>
              <p className="text-sm text-gray-500">List of all companies</p>
            </div>

            {user.subRole !== "COMPANY_MENTOR" ? (
              <Link href="/company-and-opportunities/create">
                <Button>Add Company</Button>
              </Link>
            ) : null}
          </div>
          <div className="">
            <CompaniesSection subRole={user.subRole} />
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full items-center">
          <h1 className="font-bold text-2xl">
            You are not authorized to view this page
          </h1>
        </div>
      )}
    </div>
  );
};

export default page;
