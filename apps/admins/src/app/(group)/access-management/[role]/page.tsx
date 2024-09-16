import MentorsDataSection from "../_components/sections/MentorsDataSection";
import { ScrollArea, ScrollBar } from "@local/ui/components/scroll-area";
import StudentsDataSection from "../_components/sections/StudentsDataSection";
import AdminsDataSection from "../_components/sections/AdminsDataSection";

const page = async ({
  params,
}: {
  params: {
    role: string;
  };
}) => {
  return (
    <div className="">
      <h1 className="text-2xl">Access Management</h1>
      <p className="text-sm text-gray-400">
        add new users to the system and assign roles
      </p>
      <ScrollArea className="w-full  mt-3 overflow-x-auto">
        {params.role === "mentors" && <MentorsDataSection />}
        {params.role === "students" && <StudentsDataSection />}
        {params.role === "admins" && <AdminsDataSection />}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default page;
