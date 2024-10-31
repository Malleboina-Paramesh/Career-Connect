"use server";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function getCategoriesWithCoursesCount(userId: string) {
  try {
    const data = await db.courseCategory.findMany({
      include: {
        _count: {
          select: {
            courses: true,
          },
        },
      },
    });

    const categories = data.map((category) => {
      return {
        id: category.id,
        name: category.name,
        coursesCount: category._count.courses,
        image: category.image,
      };
    });

    return {
      error: null,
      data: categories,
    };
  } catch (error) {
    console.log("Error in getCategoriesWithCoursesCount", error);
    return {
      error: "something went wrong",
      data: null,
    };
  }
}

export async function createACategory(
  name: string,
  image: string,
  description: string,
  userId: string
) {
  try {
    const category = await db.courseCategory.create({
      data: {
        name,
        image,
        description,
      },
    });

    revalidatePath("/courses");

    return {
      error: null,
      data: category,
    };
  } catch (error) {
    console.log("Error in createACategory", error);
    return {
      error: "something went wrong",
      data: null,
    };
  }
}

export async function getCoursesWithModulesCount(userId: string) {
  try {
    const data = await db.course.findMany({
      include: {
        _count: {
          select: {
            modules: true,
          },
        },
      },
    });

    const courses = data.map((course) => {
      return {
        id: course.id,
        name: course.title,
        modulesCount: course._count.modules,
        image: course.image,
      };
    });

    return {
      error: null,
      data: courses,
    };
  } catch (error) {
    console.log("Error in getCoursesWithModulesCount", error);
    return {
      error: "something went wrong",
      data: null,
    };
  }
}

export async function createAcourse(
  title: string,
  image: string,
  description: string,
  userId: string,
  categoryName: string,
  duration: number,
  price: number
) {
  try {
    const category = await db.courseCategory.findFirst({
      where: {
        name: categoryName,
      },
    });

    if (!category) {
      return {
        error: "Category not found",
        data: null,
      };
    }

    const course = await db.course.create({
      data: {
        title,
        image,
        description,
        duration,
        Adminid: userId,
        categoryId: category.id,
        price,
      },
    });

    console.log("course", course);

    revalidatePath("/courses");
    revalidatePath(`/courses/${categoryName}`);

    return {
      error: null,
      data: course,
    };
  } catch (error) {
    console.log("Error in createAcourse", error);
    return {
      error: "something went wrong",
      data: null,
    };
  }
}
