"use client";
import { useStore } from "@/Providers/ContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@local/ui/components/button";
import { Input } from "@local/ui/components/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createJob, updateJob } from "../action";
import { z } from "zod";
import { useRouter } from "next/navigation";
import ProcessTheUploads from "@/components/ProcessTheUploads";
import { BiImageAdd } from "react-icons/bi";
import { Label } from "@local/ui/components/label";
import Editor from "@/components/Editor/Editor";

const JobSchema = z.object({
  id: z.string().optional(),
  role: z.string().min(3),
  description: z.any(),
  location: z.string().min(3),
  salary: z.coerce.number(),
  noOfOpenings: z.coerce.number(),
  applyLink: z.string().min(3),
  images: z.string().min(3),
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
  const [edit, setEdit] = useState(false);

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    setValue,
    getValues,
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
    <form
      className="space-y-2"
      onSubmit={handleSubmit(onSubmit, (e) => {
        console.log("error", e);
      })}
    >
      <div className="flex flex-col md:flex-row gap-5 w-full h-full">
        {/* left side */}
        <div className="w-full space-y-4">
          {/* role  */}
          <div className="space-y-1 ">
            <Label htmlFor="role" className="font-bold text-xl">
              Role <span className="text-red-600">*</span>
            </Label>
            <Input id="role" placeholder="Job role..." {...register("role")} />
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* location  */}
          <div className="space-y-1 ">
            <Label htmlFor="location" className="font-bold text-xl">
              Location <span className="text-red-600">*</span>
            </Label>
            <Input
              id="location"
              placeholder="Job location..."
              {...register("location")}
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>

          {/* applyLink */}
          <div className="space-y-1 ">
            <Label htmlFor="applyLink" className="font-bold text-xl">
              Apply Link <span className="text-red-600">*</span>
            </Label>
            <Input
              id="applyLink"
              placeholder="Application link..."
              {...register("applyLink")}
            />
            {errors.applyLink && (
              <p className="text-red-500">{errors.applyLink.message}</p>
            )}
          </div>
        </div>

        {/* right side */}
        <div className="w-full space-y-2">
          {/* images */}
          <div className="space-y-1 ">
            <div className="flex justify-between">
              <Label htmlFor="images" className="font-bold text-xl">
                Images <span className="text-red-600">*</span>
              </Label>
              <button
                type="button"
                onClick={() => setEdit(!edit)}
                className="hover:underline"
              >
                {edit ? "Cancel" : "Edit"}
              </button>
            </div>
            {edit ? (
              <div className=" rounded-md  w-full">
                <ProcessTheUploads
                  endpoint="uploadImages"
                  onChange={(url: string) => {
                    setValue("images", url);
                    setEdit(false);
                  }}
                />
              </div>
            ) : getValues("images") === "" ? (
              <div className="border-2 rounded-md border-dashed flex flex-col gap-3 justify-center items-center min-h-60">
                <BiImageAdd size={40} />
                <p className="text-gray-500">Upload Job Images</p>
              </div>
            ) : (
              <img
                src={getValues("images")}
                alt="job image"
                className=" border-2 rounded-md border-dashed object-fill h-60 w-full"
              />
            )}
            {errors.images && (
              <span className="text-red-500">{errors.images.message}</span>
            )}
          </div>
        </div>
      </div>
      <div className="w-full space-y-4">
        {/* description */}
        <div className="space-y-1 ">
          <Label htmlFor="description" className="font-bold text-xl">
            Description <span className="text-red-600">*</span>
          </Label>
          <Editor
            content={getValues("description") || undefined}
            setContent={(data) => setValue("description", data)}
          />
        </div>

        {/* Additional fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 ">
            <Label htmlFor="salary" className="font-bold text-xl">
              Salary <span className="text-red-600">*</span>
            </Label>
            <Input
              id="salary"
              type="number"
              placeholder="Salary..."
              {...register("salary")}
            />
            {errors.salary && (
              <p className="text-red-500">{errors.salary.message}</p>
            )}
          </div>

          <div className="space-y-1 ">
            <Label htmlFor="noOfOpenings" className="font-bold text-xl">
              Number of Openings <span className="text-red-600">*</span>
            </Label>
            <Input
              id="noOfOpenings"
              type="number"
              placeholder="Number of openings..."
              {...register("noOfOpenings")}
            />
            {errors.noOfOpenings && (
              <p className="text-red-500">{errors.noOfOpenings.message}</p>
            )}
          </div>

          <div className="space-y-1 ">
            <Label htmlFor="lastDate" className="font-bold text-xl">
              Last Date to Apply <span className="text-red-600">*</span>
            </Label>
            <Input id="lastDate" type="date" {...register("lastDate")} />
            {errors.lastDate && (
              <p className="text-red-500">{errors.lastDate.message}</p>
            )}
          </div>

          <div className="space-y-1 ">
            <Label htmlFor="passedOutyear" className="font-bold text-xl">
              Passed Out Year <span className="text-red-600">*</span>
            </Label>
            <Input
              id="passedOutyear"
              type="number"
              placeholder="Passed out year..."
              {...register("passedOutyear")}
            />
            {errors.passedOutyear && (
              <p className="text-red-500">{errors.passedOutyear.message}</p>
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
