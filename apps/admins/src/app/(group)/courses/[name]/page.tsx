import { auth } from "@/auth";
import { Button } from "@local/ui/components/button";
import CourseForm from "../_components/CourseForm";
import CoursesSection from "../_components/CoursesSection";

const page = async ({ params }: { params: { name: string } }) => {
  const session = await auth();
  if (!session) return <div>no access</div>;
  const { user } = session;
  const { name } = params;

  const access = ["MASTER_ADMIN", "COURSE_ADMIN"];

  if (!access.includes(user.subRole)) return <div>no access</div>;

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl">Courses in {decodeURIComponent(name)}</h1>
          <span className="text-sm text-gray-500">view and manage courses</span>
        </div>
        <div>
          <CourseForm
            user={user}
            categoryName={decodeURIComponent(name)}
            trigger={
              <Button
                size="sm"
                color="primary"
                className="rounded-lg font-bold"
              >
                Add Course
              </Button>
            }
          />
        </div>
      </div>
      <div className="mt-3">
        <CoursesSection
          user={{
            role: user.role,
            subRole: user.subRole,
            id: user.id,
            realId: user.realId,
          }}
          categoryName={decodeURIComponent(name)}
        />
      </div>
    </div>
  );
};

export default page;
