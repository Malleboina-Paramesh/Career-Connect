"use client";

import { useStore } from "@/Providers/ContextProvider";
import { useEffect, useState } from "react";
import { getCompanyByTitle } from "../action";
import { toast } from "sonner";
import AddOrUpdateCompany from "./AddOrUpdateCompany";
import Loading from "@/components/Loading";

const FormSection = ({ company }: { company: string }) => {
  const { companyDraft, setCompanyDraft } = useStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      toast.loading("loading company data", {
        id: "loading-company-data",
      });
      const data = await getCompanyByTitle(company);
      if (data.error) {
        toast.error(data.error, {
          id: "loading-company-data",
        });
      } else {
        setCompanyDraft({
          description: data.data?.description || "",
          title: data.data?.title || "",
          location: data.data?.location || "",
          website: data.data?.website || "",
          linkedin: data.data?.linkedin || "",
          process: data.data?.process || "",
          logo: data.data?.logo || "",
          sections: data.data?.sections || "",
        });
        toast.success("company data loaded", {
          id: "loading-company-data",
        });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  return <AddOrUpdateCompany action="update" />;
};

export default FormSection;
