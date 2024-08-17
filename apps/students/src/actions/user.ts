"use server";

import { db } from "@/utils/db";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/static_variables";

export async function getUserByEmailForAuth(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        role: true,
        password: true,
        Profile: {
          select: {
            image: true,
          },
        },
      },
    });
    if (!user) return null;

    //structure the user object to {id,email,emailVerified,role,password,image}
    const { Profile, ...remaining } = user;

    return { ...remaining, image: Profile?.image || DEFAULT_PROFILE_IMAGE };
  } catch (error) {
    return null;
  }
}

export async function getUserByIdForJWT(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        Profile: {
          select: {
            image: true,
          },
        },
        Student: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!user) return null;
    console.log("User:", user);
    //structure the user object to {id,email,emailVerified,role,password,image,realId}
    let realId = user.Student?.id;
    const { Profile, ...remaining } = user;

    return {
      ...remaining,
      image: Profile?.image || DEFAULT_PROFILE_IMAGE,
      realId,
    };
  } catch (error) {
    return null;
  }
}
