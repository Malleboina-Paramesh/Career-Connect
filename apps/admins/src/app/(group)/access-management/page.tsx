import { auth } from "@/auth";
import DetailsSection from "./_components/sections/DetailsSection";

const page = async () => {
  const session = await auth();
  if (!session) return <div>no access</div>;
  const { user } = session;

  const access = ["MASTER_ADMIN", "MENTOR_ADMIN", "STUDENT_ADMIN"];

  if (!access.includes(user.subRole)) return <div>no access</div>;

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl">Access Management</h1>
          <span className="text-sm text-gray-500">
            add new users to the system and assign roles.
          </span>
        </div>
      </div>
      <div className="mt-3">
        <DetailsSection userRole={user.role} userSubRole={user.subRole} />
      </div>
    </div>
  );
};

export default page;
