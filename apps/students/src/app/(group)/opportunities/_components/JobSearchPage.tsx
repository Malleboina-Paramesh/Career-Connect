"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@local/ui/components/input";

const JobSearchPage = ({ companies }: { companies: any }) => {
  const router = useRouter();
  // const companies = [
  //   "Google",
  //   "Microsoft",
  //   "Uber",
  //   "Meta",
  //   "Cisco",
  //   "Intuit",
  //   "Atlassian",
  //   "Accenture",
  // ];

  const handleCardClick = (company: string) => {
    // Navigate to the company page (you'll need to set up these routes)
    router.push(`/opportunities/${company.toLowerCase()}`);
  };

  return (
    <div className=" mx-auto p-6  rounded-lg mt-5 flex flex-col  items-center gap-10 overflow-y-auto h-full">
      <pre>{JSON.stringify(companies, null, 2)}</pre>
      <h1 className=" font-bold mb-4 text-4xl">opportunities</h1>

      <Input
        type="text"
        placeholder="search your dream job"
        className="w-[600px] p-2 rounded"
      />

      <div className="grid grid-cols-4 gap-4 w-full">
        {companies.map((company: any) => (
          <div
            key={company.id}
            className="relative  border-2 border-black rounded p-2 h-32  cursor-pointer group"
            onClick={() => handleCardClick(company.id)}
          >
            <div className="absolute inset-0">
              <Image
                src={`https://c8.alamy.com/comp/HYR04B/corporate-office-background-with-abstract-geometric-shapes-blur-ideal-HYR04B.jpg`}
                alt={company.id}
                layout="fill"
                objectFit="cover"
                className="filter blur-sm group-hover:blur-none"
              />
            </div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <span className="text-white text-xl font-bold">
                {company.title}
              </span>
            </div>
            <span className="absolute -top-3 -right-3 group-hover:scale-150 z-20 w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center">
              {company._count.Jobs}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearchPage;
