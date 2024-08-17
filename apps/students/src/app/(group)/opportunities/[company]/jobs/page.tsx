import React from "react";
import Link from "next/link";
import { db } from "@/utils/db";
import ApplyButton from "../../_components/ApplyButton";
import { auth } from "@/auth";

type JobProps = {
  id: string;
  role: string;
  description: string;
  location: string;
  salary: number;
  noOfOpenings: number;
  lastDate: string;
  passedOutyear: number;
  companyId: string;
};

const JobListing = ({
  id,
  role,
  description,
  location,
  salary,
  noOfOpenings,
  lastDate,
  passedOutyear,
  companyId,
}: JobProps) => (
  <div className="border-2 border-gray-300 rounded-lg p-4 mb-4">
    <h3 className="text-lg font-bold">{role}</h3>
    <div className="border-2 border-gray-300 rounded-lg p-3 my-2">
      <p className="font-semibold">Description:</p>
      <p>{description}</p>

      <p className="font-semibold mt-2">Location:</p>
      <p>{location}</p>

      <p className="font-semibold mt-2">Salary:</p>
      <p>Rs.{salary.toLocaleString()}</p>

      <p className="font-semibold mt-2">Number of Openings:</p>
      <p>{noOfOpenings}</p>

      <p className="font-semibold mt-2">Last Date to Apply:</p>
      <p>{new Date(lastDate).toLocaleDateString()}</p>

      <p className="font-semibold mt-2">Graduation Year:</p>
      <p>{passedOutyear}</p>
    </div>
    <div className="flex items-center justify-between mt-2">
      <ApplyButton jobId={id} companyId={companyId} />
      {/* <div className="border-b-2 border-gray-300 flex-grow ml-4"></div> */}
    </div>
  </div>
);

const JobsPage = async ({ params }: { params: { company: string } }) => {
  const user = await auth();
  if (!user) return null;

  const jobs = await db.job.findMany({
    where: {
      companyId: params.company,
      JobApplication: {
        none: {
          studentId: user.user.realId,
        },
      },
      lastDate: {
        gte: new Date(),
      },
    },
  });

  return (
    <div className="mx-auto p-6 overflow-y-auto h-full">
      <div className="mb-6">
        <Link
          href={`/opportunities/${params.company}`}
          className="text-blue-500 hover:underline"
        >
          ← Back to {params.company}
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">
        Job Openings at {params.company}
      </h1>

      <div>
        {jobs.map((job) => (
          <JobListing
            key={job.id}
            {...job}
            companyId={params.company}
            lastDate={job.lastDate.toString()}
          />
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
