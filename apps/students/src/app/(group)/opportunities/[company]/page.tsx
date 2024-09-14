import React from "react";
import { companyDetailedInfo, CompanyDetailedInfoType } from "../action";
import Image from "next/image";
import { Button } from "@local/ui/components/button";
import Link from "next/link";
import OpportunitiesHistory from "@/components/History";

const Page = async ({
  params,
}: {
  params: {
    company: string;
  };
}) => {
  const companyDetails = await companyDetailedInfo(params.company);
  if (!companyDetails) {
    return (
      <div className="text-center text-gray-800 dark:text-gray-200">
        Company not found
      </div>
    );
  }
  return <CompanyDetailedPage companyDetails={companyDetails} />;
};

export default Page;

const CompanyDetailedPage = ({
  companyDetails,
}: {
  companyDetails: NonNullable<CompanyDetailedInfoType>;
}) => {
  return (
    <div className="p-3">
      <OpportunitiesHistory />
      <div className="w-full flex items-start gap-3  mx-auto mt-2   text-gray-800 dark:text-gray-200">
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <Image
                src={companyDetails.image || "/default-company-logo.png"}
                alt={companyDetails.title}
                width={64}
                height={64}
                className="rounded-full mr-4"
              />
              <h1 className="text-2xl font-bold">{companyDetails.title}</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {companyDetails.description}
            </p>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Located At</h2>
              <ul className="list-disc list-inside">
                {companyDetails.location.split(",").map((loc, index) => (
                  <li key={index}>{loc.trim()}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Major Roles Offering</h2>
            {companyDetails.Jobs.map((job, index) => (
              <div key={job.id} className="mb-4">
                <h3 className="text-lg font-semibold">
                  {index + 1}. {job.role}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {job.description}
                </p>
                <p className="font-semibold">Offering {job.salary} LPA</p>
              </div>
            ))}
          </div>
          {/* TODO: need to add the data to the db (new table/fileds) ( for now its static data) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Rounds And Process</h2>
            <ol className="list-decimal list-inside">
              <li>Aptitude And Coding</li>
              <li>Communication</li>
              <li>HR</li>
            </ol>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {companyDetails.Mentor ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-w-80">
              <h2 className="text-xl font-bold mb-4">Mentor</h2>
              <div className="flex items-center">
                <Image
                  src={
                    companyDetails.Mentor.user.Profile?.image ||
                    "/default-avatar.png"
                  }
                  alt={companyDetails.Mentor.user.name || "Mentor"}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {companyDetails.Mentor.user.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {companyDetails.Mentor.user.Profile?.profession}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {companyDetails.Mentor.user.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {companyDetails.Mentor.user.Profile?.phone}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-w-80">
              <h2 className="text-xl font-bold mb-4">Mentor</h2>
              <div className="flex items-center">
                <Image
                  src={
                    companyDetails.Admin!.user.Profile?.image ||
                    "/default-avatar.png"
                  }
                  alt={companyDetails.Admin!.user.name || "Admin"}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {companyDetails.Admin!.user.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {companyDetails.Admin!.user.Profile?.profession}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {companyDetails.Admin!.user.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {companyDetails.Admin!.user.Profile?.phone}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="w-full flex flex-col gap-2 ">
            <Button>
              <Link href={`/opportunities/${companyDetails.title}/jobs`}>
                view jobs
              </Link>
            </Button>

            <Button variant={"outline"}>
              <Link href={`/contact?reason=${companyDetails.title}`}>
                contact mentor
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
