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
    <Card className="h-full transition-all duration-300 hover:shadow-lg overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-40 w-full relative overflow-hidden">
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
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <h3 className="font-semibold text-lg line-clamp-1">{company.title}</h3>
        <div className="flex space-x-2 justify-between">
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
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Badge variant="secondary" className="flex items-center">
          <Briefcase className="w-3 h-3 mr-1" />
          {company.jobs} {company.jobs === 1 ? "job" : "jobs"}
        </Badge>
        <Link href={`/opportunities/${company.title}`}>
          <Button variant="link" className="text-sm">
            View details →
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
