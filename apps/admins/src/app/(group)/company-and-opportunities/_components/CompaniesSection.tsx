"use client";
import { useEffect, useState } from "react";
import { CompanyType, getCompanies } from "../action";
import Loading from "@/components/Loading";
import ToolTip from "@/components/ToolTip";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineEdit, MdOutlineListAlt } from "react-icons/md";
import { Button } from "@local/ui/components/button";
import { FaStreetView } from "react-icons/fa6";
import Link from "next/link";
import { AdminType, MentorType } from "@local/database";
import MentorSection from "./MentorSection";

const CompaniesSection = ({ subRole }: { subRole: MentorType | AdminType }) => {
  const [companies, setCompanies] = useState<CompanyType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const data = await getCompanies();
      setCompanies(data);
      setLoading(false);
    };
    fetchCompanies();
  }, []);

  if (loading)
    return (
      <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  if (companies?.data?.length === 0)
    return (
      <h1 className="text-center text-2xl">
        you havent got alloted any compnay or companies havent created
      </h1>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {companies?.data?.map((company) => (
        <div key={company.id} className=" rounded-lg overflow-hidden border">
          <div className="relative h-48">
            <img
              src={company.logo}
              alt={company.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h1 className="font-bold text-xl mb-2  text-center">
              {company.title}
            </h1>
            <div className="flex items-center justify-between">
              <ToolTip
                content="Edit"
                trigger={
                  <Link
                    href={`/company-and-opportunities/edit/${company.title}`}
                  >
                    <Button
                      size={"icon"}
                      className="rounded-full hover:shadow-lg"
                    >
                      <MdOutlineEdit
                        className="inline-block text-2xl cursor-pointer"
                        onClick={() => console.log("bro clicked me!!")}
                      />
                    </Button>
                  </Link>
                }
              />
              <ToolTip
                content="Add a job"
                trigger={
                  <Link
                    href={`/company-and-opportunities/add/${company.title.replace(" ", "-")}`}
                  >
                    <Button
                      size={"icon"}
                      className="rounded-full hover:shadow-lg"
                    >
                      <IoMdAdd className="inline-block text-2xl cursor-pointer " />
                    </Button>
                  </Link>
                }
              />
              <ToolTip
                content="View jobs"
                trigger={
                  <Link
                    href={`/company-and-opportunities/jobs/${company.title.replace(" ", "-")}`}
                  >
                    <Button
                      size={"icon"}
                      className="rounded-full hover:shadow-lg"
                    >
                      <MdOutlineListAlt className="inline-block text-2xl cursor-pointer " />
                    </Button>
                  </Link>
                }
              />
              {subRole !== "COMPANY_MENTOR" && (
                <MentorSection
                  company={company.title}
                  trigger={
                    <ToolTip
                      content="assign mentor or remove mentor"
                      trigger={
                        <Button
                          size={"icon"}
                          className="rounded-full hover:shadow-lg"
                        >
                          <FaStreetView className="inline-block text-2xl cursor-pointer " />
                        </Button>
                      }
                    />
                  }
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompaniesSection;
