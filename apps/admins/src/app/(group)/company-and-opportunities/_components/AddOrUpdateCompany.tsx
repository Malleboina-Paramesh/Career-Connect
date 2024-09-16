"use client";
import { useStore } from "@/Providers/ContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@local/ui/components/button";
import { Input } from "@local/ui/components/input";
import { Textarea } from "@local/ui/components/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createCompany, updateCompany } from "../action";
import { z } from "zod";
import { useRouter } from "next/navigation";

const CompanySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  location: z.string().min(3),
  website: z.string().min(3),
  linkedin: z.string().min(3),
  process: z.string().min(3),
  logo: z.string().min(3),
  sections: z.string().min(3),
});

export type CompanyDraftType = z.infer<typeof CompanySchema>;

const AddOrUpdateCompany = ({ action }: { action: "add" | "update" }) => {
  const { companyDraft, setCompanyDraft } = useStore();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<CompanyDraftType>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      ...companyDraft,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: CompanyDraftType) => {
    setLoading(true);
    setCompanyDraft(data);
    let res;
    if (action === "update") {
      res = await updateCompany(data);
    } else {
      res = await createCompany(data);
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
      if (action === "update") {
        toast.success("Company updated successfully");
      } else {
        toast.success("Company added successfully");
      }

      router.replace("/company-and-opportunities");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-2 " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row gap-3 w-full h-full">
        <div className="w-full space-y-2">
          <Input placeholder="Title" {...register("title")} />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
          <Input placeholder="Logo" {...register("logo")} />
          {errors.logo && (
            <span className="text-red-500">{errors.logo.message}</span>
          )}
          <Textarea placeholder="Description" {...register("description")} />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
          <Textarea placeholder="sections" {...register("sections")} />
          {errors.sections && (
            <span className="text-red-500">{errors.sections.message}</span>
          )}
        </div>
        <div className="w-full space-y-2">
          <div>
            <Textarea placeholder="Location" {...register("location")} />
            {errors.location && (
              <span className="text-red-500">{errors.location.message}</span>
            )}
          </div>
          <div>
            <Input placeholder="Website" {...register("website")} />
            {errors.website && (
              <span className="text-red-500">{errors.website.message}</span>
            )}
          </div>
          <div>
            <Input placeholder="Linkedin" {...register("linkedin")} />
            {errors.linkedin && (
              <span className="text-red-500">{errors.linkedin.message}</span>
            )}
          </div>
          <div>
            <Textarea placeholder="Process" {...register("process")} />
            {errors.process && (
              <span className="text-red-500">{errors.process.message}</span>
            )}
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {action === "update" ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default AddOrUpdateCompany;
