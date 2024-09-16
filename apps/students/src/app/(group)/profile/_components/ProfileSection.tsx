"use client";
import React, { useEffect, useState } from "react";
import { getUserProfile, UserProfileType } from "../action";
import Loading from "@/components/Loading";
import ProfileUpdateSection from "./ProfileUpdateSection";
import { BiEdit } from "react-icons/bi";
import { Button } from "@local/ui/components/button";
import { useGeneralStore } from "@/Providers/ContextProvider";

const ProfileSection = () => {
  const { setUserProfile, userProfile } = useGeneralStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const details = await getUserProfile();
      setUserProfile(details);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="col-span-1 p-4 border shadow-md rounded-lg flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!userProfile?.profile) {
    return (
      <div className="col-span-1 p-4 border shadow-md rounded-lg flex flex-col gap-2 justify-center items-center">
        <p>{userProfile?.error}</p>
        <ProfileUpdateSection
          trigger={<Button variant={"ghost"}>create</Button>}
        />
      </div>
    );
  }

  return (
    <div className="col-span-1 border shadow-md p-4 rounded-lg relative">
      <ProfileUpdateSection
        trigger={
          <BiEdit
            size={20}
            className="absolute top-3 right-3 hover:scale-125 transition-all duration-500 "
          />
        }
      />
      <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4">
        <img
          src={userProfile.profile.image || "https://via.placeholder.com/150"}
          alt={userProfile.profile.name || "User Image"}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <h2 className="text-center font-bold mb-2">{userProfile.profile.name}</h2>
      <p className="text-center text-sm mb-2">{userProfile.profile.email}</p>
      <p className="text-center text-sm mb-2">
        <span className="font-bold">Location:</span>{" "}
        {userProfile.profile.location}
      </p>
      <p className="text-center text-sm mb-2">
        <span className="font-bold"> Profession:</span>{" "}
        {userProfile.profile.profession}
      </p>
      <div className="h-32 border shadow-md rounded-lg flex justify-center items-center">
        {/* TODO: Add Performance Graph */}
        <p className="text-center pt-2">Performance Graph</p>
      </div>
    </div>
  );
};

export default ProfileSection;
