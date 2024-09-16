"use client";

import ToolTip from "@/components/ToolTip";
import { Button } from "@local/ui/components/button";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineEdit, MdOutlineListAlt } from "react-icons/md";
import AccessCreationForm from "../AccessCreationForm";

interface IDetailsSectionProps {
  userRole: string;
  userSubRole: string;
}

const DetailsSection = ({ userRole, userSubRole }: IDetailsSectionProps) => {
  const accessTables: {
    [key: string]: string[];
  } = {
    MASTER_ADMIN: ["admins", "mentors", "students"],
    MENTOR_ADMIN: ["mentors"],
    STUDENT_ADMIN: ["students"],
  };
  const tables = accessTables[userSubRole];
  if (!tables) {
    return <div>No access to this section</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tables.map((table) => (
        <div key={table} className=" rounded-lg overflow-hidden border">
          <div className="relative h-48">
            <img
              src={"https://via.placeholder.com/150"}
              alt={table}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h1 className="font-bold text-xl mb-2  text-center">{table}</h1>
            <div className="flex items-center justify-between">
              <ToolTip
                content="Add a user"
                trigger={
                  <AccessCreationForm
                    trigger={
                      <Button
                        size={"icon"}
                        className="rounded-full hover:shadow-lg"
                      >
                        <IoMdAdd className="inline-block text-2xl cursor-pointer " />
                      </Button>
                    }
                    userRole={userRole}
                    userSubRole={userSubRole}
                  />
                }
              />
              <ToolTip
                content="View users"
                trigger={
                  <Link href={`/access-management/${table}`}>
                    <Button
                      size={"icon"}
                      className="rounded-full hover:shadow-lg"
                    >
                      <MdOutlineListAlt className="inline-block text-2xl cursor-pointer " />
                    </Button>
                  </Link>
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailsSection;
