"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@local/ui/components/dialog";
import {
  getMentorByCompanyTitle,
  getMentorByEmail,
  MentorDetailsType,
  MentorDetailsTypeByEmail,
  assignMentor,
  removeMentorByCompanyTitle,
  MentorDetailsListType,
  searchMentorsByEmail,
} from "../action";
import { Button } from "@local/ui/components/button";
import { Input } from "@local/ui/components/input";
import { FaUser, FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa";
import debounce from "lodash/debounce";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa6";
import { ScrollArea, ScrollBar } from "@local/ui/components/scroll-area";

const MentorSection = ({
  trigger,
  company,
}: {
  trigger: React.ReactNode;
  company: string;
}) => {
  const [mentor, setMentor] = useState<MentorDetailsType>({
    error: null,
    data: {
      bio: "",
      email: "",
      image: "",
      name: "",
      phone: "",
      profession: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [mentors, setMentors] = useState<MentorDetailsListType>({
    error: null,
    data: [],
  });
  const [assignLoading, setAssignLoading] = useState(false);

  useEffect(() => {
    const getMentor = async () => {
      setLoading(true);
      const data = await getMentorByCompanyTitle(company);
      setMentor(data);
      setLoading(false);
    };
    getMentor();
  }, [company]);

  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm) {
        setAssignLoading(true);
        const data = await searchMentorsByEmail(searchTerm);
        setMentors(data);
        setAssignLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search, debouncedSearch]);

  const handleAssignMentor = async (email: string) => {
    setAssignLoading(true);
    await assignMentor(company, email);
    const updatedMentor = await getMentorByCompanyTitle(company);
    setMentor(updatedMentor);
    setAssignLoading(false);
    setSearch("");
  };

  const removeMentor = async () => {
    await removeMentorByCompanyTitle(company);
    setMentor({
      error: null,
      data: {
        bio: "",
        email: "",
        image: "",
        name: "",
        phone: "",
        profession: "",
      },
    });
  };

  const MentorInfo = ({ data }: { data: any }) => (
    <div
      className="bg-white border border-gray-200 rounded-xl  overflow-hidden transition-all duration-300   hover:cursor-pointer hover:shadow-xl mb-6 "
      onClick={() => handleAssignMentor(data.email)}
    >
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <Image
            src={data.image || "https://via.placeholder.com/150"}
            alt={data.name}
            width={100}
            height={100}
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>
      <div className="pt-16 pb-6 px-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {data.name || "Name Not Available"}
        </h1>
        {data.profession && (
          <p className="text-blue-600 font-semibold mb-4">{data.profession}</p>
        )}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <FaEnvelope className="text-blue-500" />
            <span>{data.email || "Email Not Available"}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <FaPhone className="text-blue-500" />
            <span>{data.phone || "Phone Not Available"}</span>
          </div>
        </div>
        {data.bio && (
          <div className="mt-6 text-gray-600">
            <FaQuoteLeft className="text-blue-400 mb-2 mx-auto" />
            <p className="italic text-sm">{data.bio}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-blue-600">
            Assign Mentor to Company
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            Assign a new mentor or view current mentor details.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {loading ? (
            <div className="text-center py-4">
              Loading mentor information...
            </div>
          ) : mentor.data?.email ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Current Mentor</h3>
              <MentorInfo data={mentor.data} />
              <Button className="w-full" onClick={removeMentor}>
                Remove Mentor
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 text-center">
                No mentor assigned to this company
              </p>
              <Input
                placeholder="Search mentor by email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
              {assignLoading ? (
                <div className="text-center py-2">Searching...</div>
              ) : mentors ? (
                <ScrollArea className="h-96">
                  {mentors.data?.map((mentor) => {
                    return <MentorInfo key={mentor.email} data={mentor} />;
                  })}

                  {/* <Button
                    className="w-full"
                    onClick={handleAssignMentor}
                    disabled={assignLoading}
                  >
                    {assignLoading ? "Assigning..." : "Assign Mentor"}
                  </Button> */}
                  <ScrollBar />
                </ScrollArea>
              ) : null}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MentorSection;
