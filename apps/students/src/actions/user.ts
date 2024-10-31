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
        Mentor: {
          select: {
            id: true,
            mentorType: true,
          },
        },
        Admin: {
          select: {
            id: true,
            role: true,
          },
        },
        emailVerified: true,
        role: true,
        password: true,
        Profile: {
          select: {
            image: true,
            name: true,
          },
        },
      },
    });
    if (!user) return null;

    //structure the user object to {id,email,emailVerified,role,password,image}
    const { Profile, ...remaining } = user;
    console.log(
      "@@@getUserByEmailForAuth called",
      user.Admin?.id || user.Mentor?.id
    );
    //TODO : add password decryption and check
    return {
      image: Profile?.image || DEFAULT_PROFILE_IMAGE,
      id: user.id,
      email: user.email,
      role: user.role,
      realId: user.Admin?.id || user.Mentor?.id,
      name: user.Profile?.name || "User",
      subRole: user.Admin?.role || user.Mentor?.mentorType,
      emailVerified: user.emailVerified,
      password: user.password,
    };
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
    console.log("@@@getUserByIdForJWT called");
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
