"use client";
import { useStore } from "@/Providers/ContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@local/ui/components/button";
import { Input } from "@local/ui/components/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createCompany, updateCompany } from "../action";
import { z } from "zod";
import { useRouter } from "next/navigation";
import ProcessTheUploads from "@/components/ProcessTheUploads";
import { BiImageAdd } from "react-icons/bi";
import { Label } from "@local/ui/components/label";
import Editor from "@/components/Editor/Editor";

const CompanySchema = z.object({
  title: z.string().min(3),
  website: z.string().min(3),
  linkedin: z.string().min(3),
  logo: z.string().min(3),
  process: z.any(),
  location: z.any(),
  description: z.any(),
  sections: z.any(),
});

export type CompanyDraftType = z.infer<typeof CompanySchema>;

const AddOrUpdateCompany = ({ action }: { action: "add" | "update" }) => {
  const { companyDraft, setCompanyDraft } = useStore();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<CompanyDraftType>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      ...companyDraft,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: CompanyDraftType) => {
    setLoading(true);

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
    <form
      className="space-y-2"
      onSubmit={handleSubmit(onSubmit, (e) => {
        console.log("error", e);
      })}
    >
      <div className="flex flex-col md:flex-row gap-5 w-full h-full">
        {/* left side */}
        <div className="w-full space-y-4">
          {/* title  */}
          <div className="space-y-1 ">
            <Label htmlFor="title" className="font-bold text-xl">
              Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="title"
              placeholder="company name...."
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* website  */}
          <div className="space-y-1 ">
            <Label htmlFor="website" className="font-bold text-xl">
              Website <span className="text-red-600">*</span>
            </Label>
            <Input
              id="website"
              placeholder="company's website...."
              {...register("website")}
            />
            {errors.website && (
              <p className="text-red-500">{errors.website.message}</p>
            )}
          </div>

          {/* linkedin */}
          <div className="space-y-1 ">
            <Label htmlFor="linkedin" className="font-bold text-xl">
              LinkedIn <span className="text-red-600">*</span>
            </Label>
            <Input
              id="linkedin"
              placeholder="company's linkedin...."
              {...register("linkedin")}
            />
            {errors.linkedin && (
              <p className="text-red-500">{errors.linkedin.message}</p>
            )}
          </div>
        </div>

        {/* right side */}
        <div className="w-full space-y-2">
          {/* logo */}
          <div className="space-y-1 ">
            <div className="flex justify-between">
              <Label htmlFor="logo" className="font-bold text-xl">
                Logo <span className="text-red-600">*</span>
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
                    setValue("logo", url);
                    setEdit(false);
                  }}
                />
              </div>
            ) : getValues("logo") === "" ? (
              <div className="border-2 rounded-md border-dashed flex flex-col gap-3 justify-center items-center min-h-60">
                <BiImageAdd size={40} />
                <p className="text-gray-500">Upload Company's Logo</p>
              </div>
            ) : (
              <img
                src={getValues("logo")}
                alt="thumbnail"
                className=" border-2 rounded-md border-dashed object-fill h-60 w-full"
              />
            )}
            {errors.logo && (
              <span className="text-red-500">{errors.logo.message}</span>
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
        {/* locations */}
        <div className="space-y-1 ">
          <Label htmlFor="locations" className="font-bold text-xl">
            Locations <span className="text-red-600">*</span>
          </Label>
          <div className="border-dashed border-2 rounded-md px-9">
            <Editor
              content={getValues("location") || undefined}
              setContent={(data) => setValue("location", data)}
            />
          </div>
        </div>
        {/* process */}
        <div className="space-y-1 ">
          <Label htmlFor="process" className="font-bold text-xl">
            Process <span className="text-red-600">*</span>
          </Label>
          <div className="border-dashed border-2 rounded-md px-9">
            <Editor
              content={getValues("process") || undefined}
              setContent={(data) => setValue("process", data)}
            />
          </div>
        </div>
        {/* sections */}
        <div className="space-y-1 ">
          <Label htmlFor="sections" className="font-bold text-xl">
            Sections <span className="text-red-600">*</span>
          </Label>
          <div className="border-dashed border-2 rounded-md px-9">
            <Editor
              content={getValues("sections") || undefined}
              setContent={(data) => setValue("sections", data)}
            />
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
