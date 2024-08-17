import { Button } from "@local/ui/components/button";
import Link from "next/link";
import React from "react";
import { BiUser } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";

const CompanyPage = ({ company }: { company: any }) => {
  return (
    <div className=" mx-auto p-6 border-2 border-gray-300 rounded-lg  relative">
      <div className="flex items-center justify-between mb-4">
        <BsArrowLeft className="w-6 h-6" />
        <h1 className="text-3xl font-bold">{company.title}</h1>
        <Link href={`/opportunities/${company.id}/jobs`}>
          <Button variant={"outline"}>Jobs</Button>
        </Link>
      </div>

      <p className="text-sm mb-6">{company.description}</p>

      {/* TODO : this locations should be dynamic */}
      <div className="mb-6">
        <h2 className="font-bold mb-2">Located At</h2>
        <ul className="list-disc list-inside">
          <li>hyderabad</li>
          <li>bengaluru</li>
          <li>chennai</li>
          <li>pune..so more.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="font-bold mb-2">Major Roles Offering For Freshers</h2>
        <ol className="list-decimal list-inside">
          <li className="mb-2">
            <span className="font-semibold">
              ASE (Associate Software Engineer)
            </span>
            <p className="ml-6">
              This is an entry-level role that involves working on software
              development and IT projects.
            </p>
            <p className="ml-6">Offering 4.5 LPA</p>
          </li>
          <li>
            <span className="font-semibold">
              AASE (Advanced Associate Software Engineer)
            </span>
            <p className="ml-6">
              This role is a step above the Associate Software Engineer (ASE)
              position and typically involves more responsibilities and a higher
              level of expertise.
            </p>
            <p className="ml-6">Offering 6.5 LPA</p>
          </li>
        </ol>
      </div>

      <div className="mb-6">
        <h2 className="font-bold mb-2">Rounds And Process</h2>
        <ol className="list-decimal list-inside">
          <li>Aptitude And Coding</li>
          <li>Communication</li>
          <li>HR</li>
        </ol>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center">
        <div className="border-2 border-gray-300 rounded p-2 mr-4">
          Guide To crack.
        </div>
        <div className="flex items-center">
          <BiUser className="w-10 h-10 mr-2" />
          <span>Mentor</span>
        </div>
      </div>

      {/* <BiBriefcase className="absolute top-4 right-4 w-6 h-6" /> */}
    </div>
  );
};

export default CompanyPage;
