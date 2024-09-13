"use client";
import { SearchCompanyByTitleType } from "@/app/(group)/opportunities/action";
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
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  companies: SearchCompanyByTitleType[];
  loading: ILoading;
  setLoading: Dispatch<SetStateAction<ILoading>>;
  setCompanies: Dispatch<SetStateAction<SearchCompanyByTitleType[]>>;
  oppurtunities: Job[];
  setOppurtunities: Dispatch<SetStateAction<Job[]>>;
}

export const generalStore = createContext<IGeneralStore>({
  search: "",
  setSearch: () => {},
  companies: [],
  setCompanies: () => {},
  oppurtunities: [],
  setOppurtunities: () => {},
  loading: { reason: [], loading: false },
  setLoading: () => {},
});
export const useGeneralStore = () => useContext(generalStore);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<ILoading>({
    reason: [],
    loading: false,
  });
  const [companies, setCompanies] = useState<SearchCompanyByTitleType[]>([]);
  const [oppurtunities, setOppurtunities] = useState<Job[]>([]);
  return (
    <generalStore.Provider
      value={{
        oppurtunities,
        setOppurtunities,
        search,
        setSearch,
        companies,
        setCompanies,
        loading,
        setLoading,
      }}
    >
      {children}
    </generalStore.Provider>
  );
};

export default ContextProvider;
