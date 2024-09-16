import React from "react";
import { companyDetailedInfo, CompanyDetailedInfoType } from "../action";
import Image from "next/image";
import { Button } from "@local/ui/components/button";
import Link from "next/link";
import OpportunitiesHistory from "@/components/History";
import { FaExternalLinkAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaGlobe, FaLinkedin } from "react-icons/fa6";
import { BiLink } from "react-icons/bi";
import { FcReading } from "react-icons/fc";
import { RiHeading2 } from "react-icons/ri";

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
    <div className="max-w-7xl mx-auto space-y-3">
      <OpportunitiesHistory />

      {/* Company Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Image
            src={companyDetails.logo || "/default-company-logo.png"}
            alt={companyDetails.title}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div className="flex-1 text-center md:text-left">
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-2xl md:text-3xl font-bold">
                {companyDetails.title}
              </h1>
              <div className="flex items-center gap-2">
                <Link
                  href={`/opportunities/${companyDetails.title}/prepare`}
                  className="group"
                >
                  <Button>
                    Prepare{" "}
                    <FaExternalLinkAlt className="inline ml-2 group-hover:animate-bounce" />
                  </Button>
                </Link>
                <Link
                  href={`/opportunities/${companyDetails.title}/jobs`}
                  className="group"
                >
                  <Button>
                    Jobs{" "}
                    <FaExternalLinkAlt className="inline ml-2 group-hover:animate-bounce" />
                  </Button>
                </Link>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {companyDetails.description}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {/* <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                <span>{companyDetails.location}</span>
              </div> */}
              {companyDetails.website && (
                <div className="flex items-center">
                  <FaGlobe className="mr-2 text-gray-500" />
                  <a
                    href={companyDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Website
                  </a>
                </div>
              )}
              {companyDetails.linkedin && (
                <div className="flex items-center">
                  <FaLinkedin className="mr-2 text-gray-500" />
                  <a
                    href={companyDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Linkedin
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* company locations and roles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Locations and Roles</h2>
        <div className="space-y-4">{companyDetails.location}</div>
      </div>

      {/* other stuff */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">What they provide ?</h2>
        <div className="space-y-4">{companyDetails.sections}</div>
      </div>

      {/* Company Process */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Application Process</h2>
        <div className="space-y-4">{companyDetails.process}</div>
      </div>

      {/* Mentor Information */}
      {companyDetails.mentorId && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ">
          <h2 className="text-2xl font-bold mb-4">Company Mentor</h2>
          <div className="flex items-center gap-4">
            <Image
              src={
                companyDetails.mentorImage || "https://via.placeholder.com/130"
              }
              alt={companyDetails.mentorName || "Mentor"}
              width={130}
              height={130}
              className="rounded-full"
            />
            <div className="flex flex-col  md:flex-row md:items-center justify-between  gap-3 w-full">
              <div>
                <h3 className="text-xl md:text-4xl font-semibold">
                  {companyDetails.mentorName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {companyDetails.mentorEmail}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {companyDetails.mentorProfession ||
                    "Mentoring for this company since 2021 "}
                </p>
              </div>
              <Link href={`/opportunities/${companyDetails.title}/mentor`}>
                <Button>
                  <BiLink className="inline mr-2" />
                  <span>Connect</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
