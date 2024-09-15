"use client";
import { CompanyDraftType } from "@/app/(group)/company-and-opportunities/_components/AddOrUpdateCompany";
import { JobDraftType } from "@/app/(group)/company-and-opportunities/_components/AddOrUpdateJob";
import React, { createContext, useContext } from "react";

interface IStore {
  companyDraft: CompanyDraftType;
  setCompanyDraft: (draft: CompanyDraftType) => void;
  jobDraft: JobDraftType;
  setJobDraft: (draft: JobDraftType) => void;
}

const store = createContext<IStore>({
  companyDraft: {
    title: "",
    description: "",
    location: "",
    website: "",
    linkedin: "",
    process: "",
    logo: "",
    sections: "",
  },
  setCompanyDraft: () => {},
  jobDraft: {
    applyLink: "",
    description: "",
    images: "",
    lastDate: new Date(),
    location: "",
    noOfOpenings: 0,
    passedOutyear: 0,
    salary: 0,
    role: "",
  },
  setJobDraft: () => {},
});

export const useStore = () => {
  return useContext(store);
};

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [companyDraft, setCompanyDraft] = React.useState<CompanyDraftType>({
    title: "",
    description: "",
    location: "",
    website: "",
    linkedin: "",
    process: "",
    logo: "",
    sections: "",
  });
  const [jobDraft, setJobDraft] = React.useState<JobDraftType>({
    applyLink: "",
    description: "",
    images: "",
    lastDate: new Date(),
    location: "",
    noOfOpenings: 0,
    passedOutyear: 0,
    salary: 0,
    role: "",
  });
  return (
    <store.Provider
      value={{
        companyDraft,
        setCompanyDraft,
        jobDraft,
        setJobDraft,
      }}
    >
      {children}
    </store.Provider>
  );
};

export default ContextProvider;
