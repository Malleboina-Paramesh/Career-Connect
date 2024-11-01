import React from "react";
import {
  companyDetailedInfo,
  CompanyDetailedInfoType,
  isFaviorated,
} from "../action";
import { Button } from "@local/ui/components/button";
import Link from "next/link";
import OpportunitiesHistory from "@/components/History";
import {
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaLinkedin,
} from "react-icons/fa";
import { BiLink } from "react-icons/bi";
import Viewer from "@/components/editor/Viewer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@local/ui/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@local/ui/components/avatar";
import { Separator } from "@local/ui/components/separator";
import { HeartIcon, HeartOff } from "lucide-react";
import { BsHeartFill } from "react-icons/bs";
import FaviorateButton from "./_components/FaviorateButton";

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

const CompanyDetailedPage = async ({
  companyDetails,
}: {
  companyDetails: NonNullable<CompanyDetailedInfoType>;
}) => {
  const isFaviorate = await isFaviorated(companyDetails.id);
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <OpportunitiesHistory />

      {/* Company Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24 flex-shrink-0">
                <AvatarImage
                  src={companyDetails.logo || "/default-company-logo.png"}
                  alt={companyDetails.title}
                />
                <AvatarFallback>
                  {companyDetails.title.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4">
                  {companyDetails.title}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {companyDetails.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={companyDetails.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGlobe className="mr-2" /> Website
                      </a>
                    </Button>
                  )}
                  {companyDetails.linkedin && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={companyDetails.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="mr-2" /> LinkedIn
                      </a>
                    </Button>
                  )}
                  <Link
                    href={`/opportunities/${companyDetails.title}/jobs`}
                    className="group"
                  >
                    <Button variant="outline" size="sm">
                      <FaExternalLinkAlt className="mr-2" /> Jobs
                    </Button>
                  </Link>
                  <Link
                    href={`/opportunities/${companyDetails.title}/prepare`}
                    className="group"
                  >
                    <Button variant="outline" size="sm">
                      <FaExternalLinkAlt className="mr-2" /> Prepare
                    </Button>
                  </Link>
                  <FaviorateButton
                    id={companyDetails.id}
                    isFaviorate={isFaviorate}
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <Viewer content={JSON.parse(companyDetails.description)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Locations and Roles */}
      <Card>
        <CardHeader>
          <CardTitle>Locations and Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Viewer content={JSON.parse(companyDetails.location)} />
        </CardContent>
      </Card>

      {/* What They Provide */}
      <Card>
        <CardHeader>
          <CardTitle>What They Provide</CardTitle>
        </CardHeader>
        <CardContent>
          <Viewer content={JSON.parse(companyDetails.sections)} />
        </CardContent>
      </Card>

      {/* Application Process */}
      <Card>
        <CardHeader>
          <CardTitle>Application Process</CardTitle>
        </CardHeader>
        <CardContent>
          <Viewer content={JSON.parse(companyDetails.process)} />
        </CardContent>
      </Card>

      {/* Mentor Information */}
      {companyDetails.mentorId && (
        <Card>
          <CardHeader>
            <CardTitle>Company Mentor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={
                    companyDetails.mentorImage ||
                    "https://via.placeholder.com/130"
                  }
                  alt={companyDetails.mentorName || "Mentor"}
                />
                <AvatarFallback>
                  {companyDetails.mentorName?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {companyDetails.mentorName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {companyDetails.mentorEmail}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {companyDetails.mentorProfession ||
                      "Mentoring for this company since 2021"}
                  </p>
                </div>
                <Link href={`/opportunities/${companyDetails.title}/mentor`}>
                  <Button>
                    <BiLink className="mr-2" />
                    Connect
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
