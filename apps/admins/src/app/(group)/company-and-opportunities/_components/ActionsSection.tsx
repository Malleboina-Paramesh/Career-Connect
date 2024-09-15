"use client";
import { useStore } from "@/Providers/ContextProvider";
import { Button } from "@local/ui/components/button";
import React, { useState } from "react";
import { createCompany, updateCompany } from "../action";
import { toast } from "sonner";

const ActionsSection = ({ action }: { action: string }) => {
  const { companyDraft, setCompanyDraft } = useStore();
  const [loading, setLoading] = useState(false);

  const performAction = async () => {
    setLoading(true);
    let res;
    if (action === "create") {
      res = await createCompany(companyDraft);
    } else {
      res = await updateCompany(companyDraft);
    }
    if (res.error) {
      toast.error(res.error);
    } else {
      setCompanyDraft({
        title: "",
        description: "",
        location: "",
        website: "",
        linkedin: "",
        process: "",
        logo: "",
        sections: "",
      });
    }
    setLoading(false);
  };
  return (
    <div className="flex items-center gap-2">
      <Button onClick={performAction}>
        {loading ? "Loading..." : action === "create" ? "Create" : "Update"}
      </Button>
    </div>
  );
};

export default ActionsSection;
