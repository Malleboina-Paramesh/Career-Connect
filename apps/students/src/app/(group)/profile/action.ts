"use server";

import { auth } from "@/auth";
import { db } from "@/utils/db";

export async function getUserProfile() {
  try {
    const session = await auth();
    if (!session) {
      return { profile: null, error: "User not found" };
    }
    const { id, email } = session.user;
    const profile = await db.profile.findFirst({
      where: {
        userId: id,
      },
    });

    if (!profile) {
      return { profile: null, error: "No profile found for the you" };
    }

    return { profile: { ...profile, email }, error: null };
  } catch (error) {
    console.error(error);
    return { profile: null, error: "Error while fetching user profile" };
  }
}

export type UserProfileType = Awaited<ReturnType<typeof getUserProfile>>;

type UpdateProfileType = {
  bio: string;
  image: string;
  location: string;
  phone: string;
  profession: string;
  name: string;
  email: string;
};

export async function updateProfile(data: UpdateProfileType) {
  try {
    const session = await auth();
    if (!session) return { profile: null, error: "User not found" };
    const { email, name, id } = session.user;

    const profile = await db.profile.update({
      where: {
        userId: id,
      },
      data: {
        bio: data.bio,
        image: data.image,
        location: data.location,
        phone: data.phone,
        profession: data.profession,
        name: data.name,
      },
    });

    return { profile: { ...profile, email }, error: null };
  } catch (error) {
    console.error(error);
    return { profile: null, error: "Error while updating user profile" };
  }
}
