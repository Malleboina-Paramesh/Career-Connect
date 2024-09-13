"use client";

import { useGeneralStore } from "@/Providers/ContextProvider";
import { Input } from "@local/ui/components/input";
import { useEffect } from "react";
import { searchCompanyByTitle } from "../action";

const SearchBar = () => {
  const { setSearch, search, companies, setCompanies, setLoading } =
    useGeneralStore();
  console.log(companies);

  useEffect(() => {
    const searchResults = async () => {
      setLoading({ reason: ["searching"], loading: true });
      const companies = await searchCompanyByTitle(search);
      setCompanies(companies);
      setLoading({ reason: [], loading: false });
    };
    searchResults();
  }, [search]);

  return (
    <div className="w-full mt-2 flex justify-center ">
      <Input
        type="text"
        placeholder="search for opportunities"
        className="border-2 border-gray-200 rounded-lg p-2 w-1/2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
