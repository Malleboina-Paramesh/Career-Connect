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
        email: true,
        role: true,
        Profile: {
          select: {
            name: true,
            image: true,
          },
        },
        Admin: {
          select: {
            role: true,
            id: true,
          },
        },
        Mentor: {
          select: {
            mentorType: true,
            id: true,
          },
        },
      },
    });
    if (!user) return null;
    console.log("User:", user);
    //structure the user object to {id,email,emailVerified,role,password,image,subRole}
    let role = user.Admin?.role || user.Mentor?.mentorType;
    let realId = user.Admin?.id || user.Mentor?.id;
    const { Profile, ...remaining } = user;

    return {
      ...remaining,
      image: Profile?.image || DEFAULT_PROFILE_IMAGE,
      subRole: role,
      realId,
      name: Profile?.name || "",
    };
  } catch (error) {
    return null;
  }
}
