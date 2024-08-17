"use client";
import React from "react";
import { toast } from "sonner";
import { applyForJob } from "../action";

const ApplyButton = ({
  jobId,
  companyId,
}: {
  jobId: string;
  companyId: string;
}) => {
  const handleClick = async () => {
    try {
      toast.loading("Applying for job", {
        id: "apply",
      });
      const response = await applyForJob(jobId, companyId);
      if (response.error) {
        toast.error(response.error, {
          id: "apply",
        });
        return;
      }
      toast.success("Applied for job", {
        id: "apply",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error while applying for job", {
        id: "apply",
      });
    }
  };
  return (
    <button
      className="border-2 border-gray-300 rounded px-4 py-1 hover:bg-gray-100"
      onClick={handleClick}
    >
      Apply
    </button>
  );
};

export default ApplyButton;
