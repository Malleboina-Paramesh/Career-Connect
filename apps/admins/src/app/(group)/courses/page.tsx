import { auth } from "@/auth";
import CourseCategoriesSection from "./_components/CourseCategoriesSection";
import { Button } from "@local/ui/components/button";
import Link from "next/link";
import CategoryForm from "./_components/CategoryForm";

const page = async () => {
  const session = await auth();
  if (!session) return <div>no access</div>;
  const { user } = session;

  const access = ["MASTER_ADMIN", "COURSE_ADMIN"];

  if (!access.includes(user.subRole)) return <div>no access</div>;

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl">Courses</h1>
          <span className="text-sm text-gray-500">view and manage courses</span>
        </div>
        <div>
          <CategoryForm
            user={user}
            trigger={
              <Button
                size="sm"
                color="primary"
                className="rounded-lg font-bold"
              >
                Add Category
              </Button>
            }
          />
        </div>
      </div>
      <div className="mt-3">
        <CourseCategoriesSection
          user={{
            role: user.role,
            subRole: user.subRole,
            id: user.id,
            realId: user.realId,
          }}
        />
      </div>
    </div>
  );
};

export default page;
