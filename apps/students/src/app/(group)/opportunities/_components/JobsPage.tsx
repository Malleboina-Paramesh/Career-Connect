"use client";

import { useGeneralStore } from "@/Providers/ContextProvider";
import { useEffect, useState } from "react";
import { applyForJob, companyJobs, CompanyJobsType } from "../action";
import Loading from "@/components/Loading";
import { Button } from "@local/ui/components/button";
import { format } from "date-fns";
import { BiLinkExternal } from "react-icons/bi";
import { toast } from "sonner";
import Link from "next/link";
import Viewer from "@/components/editor/Viewer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@local/ui/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@local/ui/components/avatar";
import { Badge } from "@local/ui/components/badge";

const JobsPage = ({ company }: { company: string }) => {
  const { tab, loading, setLoading, oppurtunities, setOppurtunities } =
    useGeneralStore();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading({ reason: ["fetching-jobs"], loading: true });
      const jobs = await companyJobs(company, tab as "active" | "applied");
      setOppurtunities(jobs);
      setLoading({ reason: [], loading: false });
    };
    fetchJobs();
  }, [tab]);

  if (loading.reason.includes("fetching-jobs") && loading.loading) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!oppurtunities.length) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] justify-center items-center">
        <h1 className="text-2xl text-gray-800 dark:text-gray-200">
          No Jobs Found
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {oppurtunities.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobsPage;

const JobCard = ({ job }: { job: CompanyJobsType }) => {
  const { oppurtunities, setOppurtunities } = useGeneralStore();
  const [loading, setLoading] = useState(false);

  const apply = async () => {
    try {
      setLoading(true);
      toast.loading("Applying for job", { id: "apply" });
      const response = await applyForJob(job.id, job.company);
      if (response.error) {
        toast.error(response.error, { id: "apply" });
        return;
      }
      toast.success("Applied for job", { id: "apply" });

      const updatedOppurtunities = oppurtunities.map((opp) =>
        opp.id === job.id ? { ...opp, applied: true } : opp
      );
      setOppurtunities(updatedOppurtunities);
    } catch (error) {
      console.log(error);
      toast.error("Error while applying for job", { id: "apply" });
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = format(new Date(job.lastDate), "dd MMMM yyyy");

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={job.companyImage} alt={job.company} />
          <AvatarFallback>
            {job.company.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{job.role}</h2>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Viewer content={JSON.parse(job.description)} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="font-semibold">{job.location}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Salary</p>
            <p className="font-semibold">{job.salary}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Openings</p>
            <p className="font-semibold">{job.noOfOpenings}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Date to Apply</p>
            <p className="font-semibold">{formattedDate}</p>
          </div>
        </div>
        <Badge variant="secondary">Passed Out Year: {job.passedOutyear}</Badge>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Link href={job.applyLink} target="_blank">
          <Button variant="outline" className="group">
            Apply on Website{" "}
            <BiLinkExternal className="ml-2 group-hover:animate-bounce" />
          </Button>
        </Link>
        {job.applied ? (
          <Button variant="secondary" disabled>
            Applied
          </Button>
        ) : (
          <Button onClick={apply} disabled={loading}>
            {loading ? "Applying..." : "Quick Apply"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
