"use client";

import { Button } from "@local/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@local/ui/components/dialog";
import { Input } from "@local/ui/components/input";
import { useState } from "react";
import { toast } from "sonner";
import { createACategory } from "../action";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@local/ui/components/label";
import ProcessTheUploads from "@/components/ProcessTheUploads";
import { BiImageAdd } from "react-icons/bi";

interface CategoryFormProps {
  user: {
    role: string;
    subRole: string;
    id: string;
    realId: string;
  };
  trigger: React.ReactNode;
}

const CategorySchema = z.object({
  category: z
    .string({
      required_error: "Category name is required",
    })
    .min(3, "Category name should be atleast 3 characters long"),
  image: z.string({
    required_error: "Category image is required",
  }),
  description: z
    .string({
      required_error: "Category description is required",
    })
    .min(3, "Category description should be atleast 3 characters long"),
});

const CategoryForm = ({ user, trigger }: CategoryFormProps) => {
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      image: "",
    },
  });

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const createCategory = async (data: z.infer<typeof CategorySchema>) => {
    try {
      toast.loading("Creating category", {
        id: "create-category",
      });
      const response = await createACategory(
        data.category,
        data.image,
        data.description,
        user.realId
      );
      if (response.error) {
        toast.error(response.error, {
          id: "create-category",
        });
        return;
      }
      toast.success("Category created successfully", {
        id: "create-category",
      });
      setOpen(false);
    } catch (error) {
      console.log("Error in createCategory", error);
      toast.error("Something went wrong", {
        id: "create-category",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="items-center">
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add a new category to the course
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(createCategory)}>
          <div className="w-full space-y-2">
            <div className="space-y-1">
              <Input
                placeholder="Enter category name"
                {...register("category")}
              />
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-1 ">
              <div className="flex justify-between">
                {/* <button
                  type="button"
                  onClick={() => setEdit(!edit)}
                  className="hover:underline"
                >
                  {edit ? "Cancel" : "Edit"}
                </button> */}
              </div>
              {edit ? (
                <div className="border-2 rounded-md border-dashed flex flex-col gap-3 justify-center items-center min-h-60">
                  <ProcessTheUploads
                    endpoint="uploadImages"
                    onChange={(url: string) => {
                      setValue("image", url);
                      setEdit(false);
                    }}
                  />
                </div>
              ) : getValues("image") === "" ? (
                <div
                  onClick={() => setEdit(true)}
                  className="border-2 rounded-md border-dashed flex flex-col gap-3 justify-center items-center min-h-60"
                >
                  <BiImageAdd size={40} />
                  <p className="text-gray-500">Upload Image</p>
                </div>
              ) : (
                <img
                  onClick={() => setEdit(!edit)}
                  src={getValues("image")}
                  alt="job image"
                  className=" border-2 rounded-md border-dashed object-fill h-60 w-full"
                />
              )}
              {errors.image && (
                <span className="text-red-500">{errors.image.message}</span>
              )}
            </div>

            <div className="space-y-1">
              <Input
                id="description"
                placeholder="Description..."
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="mt-2 w-full text-center">
              <Button
                className="w-full"
                variant={"outline"}
                type="submit"
                disabled={isSubmitting}
              >
                Add Category
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
