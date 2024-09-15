"use client";
import { useStore } from "@/Providers/ContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@local/ui/components/button";
import { Input } from "@local/ui/components/input";
import { Textarea } from "@local/ui/components/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createJob, updateJob } from "../action";
import { z } from "zod";
import { useRouter } from "next/navigation";

const JobSchema = z.object({
  id: z.string().optional(),
  role: z.string().min(3),
  description: z.string().min(3),
  location: z.string().min(3),
  salary: z.coerce.number(),
  noOfOpenings: z.coerce.number(),
  applyLink: z.string().min(3),
  images: z.string().min(3).optional(),
  lastDate: z.coerce.date(),
  passedOutyear: z.coerce.number(),
});

export type JobDraftType = z.infer<typeof JobSchema>;

const AddOrUpdateJob = ({
  action,
  company,
}: {
  action: "add" | "update";
  company: string;
}) => {
  const { jobDraft, setJobDraft } = useStore();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<JobDraftType>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      ...jobDraft,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: JobDraftType) => {
    setLoading(true);
    setJobDraft(data);
    let res;
    if (action === "update") {
      res = await updateJob(company, data);
    } else {
      res = await createJob(company, data);
    }
    if (res.error) {
      toast.error(res.error);
    } else {
      setJobDraft({
        role: "",
        description: "",
        location: "",
        salary: 0,
        noOfOpenings: 0,
        applyLink: "",
        images: "",
        lastDate: new Date(),
        passedOutyear: 0,
        id: "",
      });
      if (action === "add") {
        toast.success("Job added successfully");
      } else {
        toast.success("Job updated successfully");
      }
      router.replace("/company-and-opportunities");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-2 " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3 w-full h-full">
        <div className="w-full space-y-2">
          <Input placeholder="Title" {...register("role")} />
          {errors.role && (
            <span className="text-red-500">{errors.role.message}</span>
          )}

          <Textarea placeholder="Description" {...register("description")} />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
          <Textarea
            placeholder="images with , seperated"
            {...register("images")}
          />
          {errors.images && (
            <span className="text-red-500">{errors.images.message}</span>
          )}
        </div>
        <div className="w-full space-y-2">
          <div>
            <Input placeholder="Location" {...register("location")} />
            {errors.location && (
              <span className="text-red-500">{errors.location.message}</span>
            )}
          </div>
          <div>
            <Input placeholder="applyLink" {...register("applyLink")} />
            {errors.applyLink && (
              <span className="text-red-500">{errors.applyLink.message}</span>
            )}
          </div>
          <div>
            <Input placeholder="passout year" {...register("passedOutyear")} />
            {errors.passedOutyear && (
              <span className="text-red-500">
                {errors.passedOutyear.message}
              </span>
            )}
          </div>
          <div>
            <Input placeholder="salary" {...register("salary")} />
            {errors.salary && (
              <span className="text-red-500">{errors.salary.message}</span>
            )}
          </div>
          <div>
            <Input placeholder="noOfOpenings" {...register("noOfOpenings")} />
            {errors.noOfOpenings && (
              <span className="text-red-500">
                {errors.noOfOpenings.message}
              </span>
            )}
          </div>
          <div>
            <Input
              type="date"
              placeholder="lastDate"
              {...register("lastDate")}
            />
            {errors.lastDate && (
              <span className="text-red-500">{errors.lastDate.message}</span>
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

export default AddOrUpdateJob;
