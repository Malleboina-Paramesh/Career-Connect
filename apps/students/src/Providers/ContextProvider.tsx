"use client";
import {
  CompanyJobsType,
  SearchCompanyByTitleType,
} from "@/app/(group)/opportunities/action";
import { UserProfileType } from "@/app/(group)/profile/action";
import { Company, Job } from "@local/database";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ILoading {
  reason: string[];
  loading: boolean;
}

interface IGeneralStore {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  companies: SearchCompanyByTitleType[];
  loading: ILoading;
  setLoading: Dispatch<SetStateAction<ILoading>>;
  setCompanies: Dispatch<SetStateAction<SearchCompanyByTitleType[]>>;
  oppurtunities: CompanyJobsType[];
  setOppurtunities: Dispatch<SetStateAction<CompanyJobsType[]>>;
  userProfile: UserProfileType;
  setUserProfile: Dispatch<SetStateAction<UserProfileType>>;
}

export const generalStore = createContext<IGeneralStore>({
  tab: "",
  setTab: () => {},
  search: "",
  setSearch: () => {},
  companies: [],
  setCompanies: () => {},
  oppurtunities: [],
  setOppurtunities: () => {},
  loading: { reason: [], loading: false },
  setLoading: () => {},
  userProfile: {
    error: "",
    profile: null,
  },
  setUserProfile: () => {},
});
export const useGeneralStore = () => useContext(generalStore);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfileType>({
    error: "",
    profile: null,
  });
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("active");
  const [loading, setLoading] = useState<ILoading>({
    reason: [],
    loading: false,
  });
  const [companies, setCompanies] = useState<SearchCompanyByTitleType[]>([]);
  const [oppurtunities, setOppurtunities] = useState<CompanyJobsType[]>([]);
  return (
    <generalStore.Provider
      value={{
        tab,
        setTab,
        oppurtunities,
        setOppurtunities,
        search,
        setSearch,
        companies,
        setCompanies,
        loading,
        setLoading,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </generalStore.Provider>
  );
};

export default ContextProvider;
