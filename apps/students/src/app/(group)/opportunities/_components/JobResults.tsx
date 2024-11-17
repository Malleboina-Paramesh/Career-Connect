"use client";

import { useGeneralStore } from "@/Providers/ContextProvider";
import Link from "next/link";
import { SearchCompanyByTitleType } from "../action";
import { Loader2, Briefcase, Linkedin, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@local/ui/components/card";
import { Badge } from "@local/ui/components/badge";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@local/ui/components/avatar";
import { Button } from "@local/ui/components/button";

const JobResults = () => {
  const { companies, loading } = useGeneralStore();

  if (loading.reason.includes("searching") && loading.loading) {
    return (
      <div className="w-full flex-1 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {companies.map((company) => (
        <Job key={company.id} company={company} />
      ))}
    </div>
  );
};

export default JobResults;

const Job = ({ company }: { company: SearchCompanyByTitleType }) => {
  return (
    <Card className="h-full relative flex flex-col sm:flex-row transition-all duration-300 hover:shadow-lg overflow-hidden">
      {/* Thumbnail Section */}
      <div className="sm:w-1/3 h-40 sm:h-auto relative overflow-hidden">
        <Avatar className="w-full h-full rounded-none">
          <AvatarImage
            src={company.logo}
            alt={company.title}
            className="object-cover"
          />
          <AvatarFallback className="text-4xl font-bold">
            {company.title.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Info Section */}
      <div className="sm:w-2/3 p-4 space-y-4 flex flex-col">
        {/* Jobs Notification Badge */}
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 flex items-center text-xs"
        >
          {company.jobs}
          {company.jobs === 1 ? " job" : " jobs"}
        </Badge>

        <h3 className="font-semibold text-lg line-clamp-1">{company.title}</h3>
        <div className="flex space-x-2">
          {company.linkedin && (
            <Link
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {company.website && (
            <Link
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
        <div className="mt-auto">
          <Link href={`/opportunities/${company.title}`}>
            <Button variant="link" className="text-sm">
              View details →
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
