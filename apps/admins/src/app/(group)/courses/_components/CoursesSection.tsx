import React from "react";
import {
  getCategoriesWithCoursesCount,
  getCoursesWithModulesCount,
} from "../action";
import ToolTip from "@/components/ToolTip";
import Link from "next/link";
import { Button } from "@local/ui/components/button";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineListAlt } from "react-icons/md";

interface CoursesSectionProps {
  user: {
    role: string;
    subRole: string;
    id: string;
    realId: string;
  };
  categoryName: string;
}

const CoursesSection = async ({ user, categoryName }: CoursesSectionProps) => {
  const { role, subRole, id, realId } = user;
  const courses = await getCoursesWithModulesCount(realId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {courses.data && courses.data.length === 0 ? (
        <div>No courses found</div>
      ) : null}
      {courses.data &&
        courses.data.map((course) => {
          return (
            <div key={course.id} className=" rounded-lg overflow-hidden border">
              <div className="relative h-48">
                <img
                  src={course?.image || "/courses/course-placeholder.png"} //TODO: add a default image
                  alt={course.name}
                  className="w-full h-full object-fit"
                />
                <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-gray-700 ">
                    {course.modulesCount}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h1 className="font-bold text-xl mb-2  text-center">
                  {course.name}'s
                </h1>
                <div className="flex items-center justify-between">
                  <ToolTip
                    content="Add a course"
                    trigger={
                      <Link
                        href={`/courses/${categoryName}/${course.name}/studio`}
                      >
                        <Button
                          size={"icon"}
                          className="rounded-full hover:shadow-lg"
                        >
                          <IoMdAdd className="inline-block text-2xl cursor-pointer hover:animate-spin" />
                        </Button>
                      </Link>
                    }
                  />
                  <ToolTip
                    content="View modules"
                    trigger={
                      <Link href={`/courses/${categoryName}/${course.name}/`}>
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

export default CoursesSection;
