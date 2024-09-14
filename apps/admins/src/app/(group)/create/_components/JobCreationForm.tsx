"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@local/ui/components/button";
import { Input } from "@local/ui/components/input";
import { toast } from "sonner";
import { Textarea } from "@local/ui/components/textarea";
import {
  jobCreationSchema,
  JobCreationType,
} from "@/schemas-and-types/user-creation";
import { createJob } from "../action";

const JobCreationForm = ({ companyId }: { companyId: string }) => {
  const form = useForm<JobCreationType>({
    resolver: zodResolver(jobCreationSchema),
    defaultValues: {
      applyLink: "",
    },
  });

  async function onSubmit(values: JobCreationType) {
    try {
      toast.loading("Creating Job", {
        id: "creating-Job",
      });
      const data = await createJob(values, companyId);
      if (data.error) {
        toast.error(data.error, {
          id: "creating-Job",
        });
        return;
      }
      toast.success("Job Created Successfully", {
        id: "creating-Job",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full  md:w-1/2 mx-auto mt-8 p-6 rounded-lg shadow-md space-y-4">
      <h1 className="font-bold text-2xl">Create Job</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...form.register("role")}
            placeholder="Job tole"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.role && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.role.message}
            </p>
          )}
        </div>
        <div>
          <Textarea
            {...form.register("description")}
            placeholder="Job description"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...form.register("location")}
            placeholder="Job Location"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.location.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...form.register("applyLink")}
            placeholder="Job apply link"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.applyLink && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.applyLink.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...form.register("salary")}
            placeholder="Salary"
            type="number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.salary && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.salary.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...form.register("passedOutYear")}
            placeholder="Passed out year"
            type="number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.passedOutYear && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.passedOutYear.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...form.register("noOfOpenings")}
            placeholder="No of openings"
            type="number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.noOfOpenings && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.noOfOpenings.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...form.register("lastDate")}
            placeholder="Last date"
            type="date"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.lastDate && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.lastDate.message}
            </p>
          )}
        </div>

        <Button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
          Create Job
        </Button>
      </form>
    </div>
  );
};

export default JobCreationForm;
