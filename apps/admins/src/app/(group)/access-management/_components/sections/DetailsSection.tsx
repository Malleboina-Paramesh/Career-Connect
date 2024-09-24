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
    MASTER_ADMIN: ["admin", "mentor", "student"],
    MENTOR_ADMIN: ["mentor"],
    STUDENT_ADMIN: ["student"],
  };
  const tables = accessTables[userSubRole];
  if (!tables) {
    return <div>No access to this section</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tables.map((table) => {
        let role = undefined;
        let subRole = undefined;

        if (table === "admin") {
          role = "ADMIN";
        } else if (table === "mentor") {
          role = "MENTOR";
        } else if (table === "student") {
          role = "STUDENT";
        } else {
          throw Error("Accha scamming");
        }
        console.log(role, subRole);
        return (
          <div key={table} className=" rounded-lg overflow-hidden border">
            <div className="relative h-48">
              <img
                src={`/access-management/${table}-placeholder.png`}
                alt={table}
                className="w-full h-full object-fit"
              />
            </div>
            <div className="p-4">
              <h1 className="font-bold text-xl mb-2  text-center">{table}'s</h1>
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
                      role={role}
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
        );
      })}
    </div>
  );
};

export default DetailsSection;
