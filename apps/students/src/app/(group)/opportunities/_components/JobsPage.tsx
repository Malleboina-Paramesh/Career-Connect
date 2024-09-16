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
        <h1 className="text-2xl text-gray-800">No Jobs Found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
      toast.loading("Applying for job", {
        id: "apply",
      });
      const response = await applyForJob(job.id, job.company);
      if (response.error) {
        toast.error(response.error, {
          id: "apply",
        });
        return;
      }
      toast.success("Applied for job", {
        id: "apply",
      });

      const updatedOppurtunities = oppurtunities.map((opp) => {
        if (opp.id === job.id) {
          return {
            ...opp,
            applied: true,
          };
        }
        return opp;
      });
      setOppurtunities(updatedOppurtunities);
    } catch (error) {
      console.log(error);
      toast.error("Error while applying for job", {
        id: "apply",
      });
    } finally {
      setLoading(false);
    }
  };
  const formattedDate = format(new Date(job.lastDate), "dd-MMMM-yyyy");

  return (
    <div className="border rounded-lg shadow-md p-6 mb-6 transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={job.companyImage}
          alt={job.company}
          className="w-16 h-16 rounded-full mr-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">{job.role}</h2>
      </div>
      <p className="text-gray-600 mb-4">{job.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-semibold">{job.location}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Salary</p>
          <p className="font-semibold">{job.salary}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Openings</p>
          <p className="font-semibold">{job.noOfOpenings}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Last Date to Apply</p>
          <p className="font-semibold">{formattedDate}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Passed Out Year:{" "}
          <span className="font-semibold">{job.passedOutyear}</span>
        </p>
        <div className="flex gap-3 items-center">
          <Link href={job.applyLink} target="_blank">
            <Button className="group ">
              Apply <BiLinkExternal className="group-hover:animate-ping ml-2" />
            </Button>
          </Link>
          {job.applied ? (
            <Button
              className="bg-green-400 hover:bg-green-400 px-4 py-2 rounded hover:cursor-not-allowed"
              variant={"outline"}
            >
              Applied
            </Button>
          ) : (
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={apply}
            >
              {loading ? "Applying..." : "Apply"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
