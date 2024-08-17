import { getSessionUserDetails } from "@/utils/helpers";
import { AdminType } from "@local/database";
import React from "react";
import StudentCreationForm from "./_components/StudentCreationForm";
import MentorCreationForm from "./_components/MentorCreationForm";
import MentorAdminCreationForm from "./_components/MentorAdminCreationForm";
import StudentAdminCreationForm from "./_components/StudentAdminCreationForm";

const page = async () => {
  const user = await getSessionUserDetails();

  const actions: { role: AdminType; message: string }[] = [
    {
      role: "MASTER_ADMIN",
      message: "You can perform all actions",
    },
    {
      role: "MENTOR_ADMIN",
      message: "You can only add mentors",
    },
    {
      role: "STUDENT_ADMIN",
      message: "You can only add students",
    },
    {
      role: "COURSE_ADMIN",
      message: "You can only add courses",
    },
  ];

  const responability = actions.find((action) => action.role === user.subRole);

  if (!responability) {
    return <div>no access</div>;
  }

  return (
    <div className=" w-full text-center space-y-3  overflow-scroll h-full">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <p className="font-serif">
        {responability.message} as you are {responability.role}
      </p>
      <div className="flex flex-wrap w-full h-full  ">
        {user.subRole === "STUDENT_ADMIN" ||
          (user.subRole === "MASTER_ADMIN" && <StudentCreationForm />)}

        {(user.subRole === "MENTOR_ADMIN" ||
          user.subRole === "MASTER_ADMIN") && <MentorCreationForm />}

        {user.subRole === "MASTER_ADMIN" && <MentorAdminCreationForm />}
        {user.subRole === "MASTER_ADMIN" && <StudentAdminCreationForm />}
        {/* TODO : Add Course Creation Form and make this form reusable */}
      </div>
    </div>
  );
};

export default page;
