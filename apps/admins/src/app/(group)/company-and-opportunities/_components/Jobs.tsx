"use client";

import { useStore } from "@/Providers/ContextProvider";
import { useEffect, useState } from "react";
import { deleteJob, getJobsByCompany, JobResultsType } from "../action";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {jobs.data?.map((job) => (
        <div
          key={job.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl"
        >
          {job.images && (
            <div className="h-48 overflow-hidden">
              <img
                src={job.images}
                alt={job.role}
                className="w-full h-full object-cover transition duration-300 ease-in-out transform hover:scale-110"
              />
            </div>
          )}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              {job.role}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {job.description}
            </p>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {job.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                ${job.salary}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {job.noOfOpenings} openings
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Apply by: {new Date(job.lastDate).toLocaleDateString()}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Batch: {job.passedOutyear}
              </span>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
            <a
              href={job.applyLink}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition duration-300 ease-in-out font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
            </a>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setJobDraft({ ...job, images: job.images || "" });
                  router.push(`/company-and-opportunities/edit-job/${company}`);
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-300 ease-in-out"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
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
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition duration-300 ease-in-out"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
