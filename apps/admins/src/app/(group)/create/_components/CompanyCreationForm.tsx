"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@local/ui/components/button";
import { Input } from "@local/ui/components/input";
import { toast } from "sonner";
import {
  companyCreationSchema,
  CompanyCreationType,
} from "@/schemas-and-types/user-creation";
import { Textarea } from "@local/ui/components/textarea";
import { createCompany } from "../action";

const CompanyCreationForm = () => {
  const form = useForm<CompanyCreationType>({
    resolver: zodResolver(companyCreationSchema),
    defaultValues: {
      description: "",
      title: "",
      location: "",
    },
  });

  async function onSubmit(values: CompanyCreationType) {
    try {
      toast.loading("Creating Company", {
        id: "creating-Company",
      });
      const data = await createCompany(values);
      if (data.error) {
        toast.error(data.error, {
          id: "creating-Company",
        });
        return;
      }
      toast.success("Company Created Successfully", {
        id: "creating-Company",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full  md:w-1/2 mx-auto mt-8 p-6 rounded-lg shadow-md space-y-4">
      <h1 className="font-bold text-2xl">Create Company</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...form.register("title")}
            placeholder="Company Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>
        <div>
          <Textarea
            {...form.register("description")}
            placeholder="Company description"
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
            placeholder="Company Location"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.location.message}
            </p>
          )}
        </div>
        <Button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
          Create Company
        </Button>
      </form>
    </div>
  );
};

export default CompanyCreationForm;
