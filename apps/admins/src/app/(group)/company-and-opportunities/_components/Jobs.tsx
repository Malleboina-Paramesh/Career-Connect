"use client";

import { useStore } from "@/Providers/ContextProvider";
import { useEffect, useState } from "react";
import { deleteJob, getJobsByCompany, JobResultsType } from "../action";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { FcViewDetails } from "react-icons/fc";
import { Button } from "@local/ui/components/button";
import { CgViewList } from "react-icons/cg";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@local/ui/components/card";
import { Separator } from "@local/ui/components/separator";
import {
  MapPin,
  DollarSign,
  Users,
  Calendar,
  GraduationCap,
  ExternalLink,
  Edit,
  Trash2,
} from "lucide-react";

// TODO : Need to redesign and add some students analytics

const Jobs = ({ company }: { company: string }) => {
  const { setJobDraft } = useStore();
  const router = useRouter();

  const [jobs, setJobs] = useState<JobResultsType>({
    data: null,
    error: "",
  });

  const [loading, setLoading] = useState(false);
  const fetchJobs = async () => {
    toast.loading("loading jobs", {
      id: "loading-jobs",
    });
    setLoading(true);
    const data = await getJobsByCompany(company);
    setJobs(data);
    if (data.error) {
      toast.error("something went wrong", {
        id: "loading-jobs",
      });
    } else {
      toast.success("jobs loaded", {
        id: "loading-jobs",
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await getJobsByCompany(company);
      setJobs(data);
      if (data.error) {
        toast.error("something went wrong", {
          id: "loading-jobs",
        });
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  if (loading)
    return (
      <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  if (jobs.data?.length === 0)
    return <div className="text-center">No jobs found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.data?.map((job) => (
        <Card key={job.id} className="overflow-hidden">
          <CardHeader className="p-0">
            {job.images && (
              <div className="h-48 overflow-hidden">
                <img
                  src={job.images}
                  alt={job.role}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
            )}
          </CardHeader>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-3">{job.role}</h2>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                {job.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="w-4 h-4 mr-2" />${job.salary}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="w-4 h-4 mr-2" />
                {job.noOfOpenings} openings
              </div>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Apply by: {new Date(job.lastDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                Batch: {job.passedOutyear}
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="p-4 flex justify-between items-center">
            <Button variant="outline" asChild>
              <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                Apply Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setJobDraft({
                    ...job,
                    images: job.images || "",
                    description: JSON.parse(job.description),
                  });
                  router.push(`/company-and-opportunities/edit-job/${company}`);
                }}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={async () => {
                  setJobDraft({
                    applyLink: "",
                    description: "",
                    images: "",
                    lastDate: new Date(),
                    location: "",
                    noOfOpenings: 0,
                    passedOutyear: 0,
                    role: "",
                    salary: 0,
                    id: "",
                  });
                  setLoading(true);
                  await deleteJob(company, job.id);
                  fetchJobs();
                  setLoading(false);
                  router.refresh();
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Jobs;
