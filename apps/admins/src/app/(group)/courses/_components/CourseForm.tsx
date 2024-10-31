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
import { createACategory, createAcourse } from "../action";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@local/ui/components/label";
import ProcessTheUploads from "@/components/ProcessTheUploads";
import { BiImageAdd } from "react-icons/bi";

interface CourseFormProps {
  user: {
    role: string;
    subRole: string;
    id: string;
    realId: string;
  };
  trigger: React.ReactNode;
  categoryName: string;
}

const courseSchema = z.object({
  course: z
    .string({
      required_error: "course name is required",
    })
    .min(3, "course name should be atleast 3 characters long"),
  image: z.string({
    required_error: "course image is required",
  }),
  description: z
    .string({
      required_error: "course description is required",
    })
    .min(3, "course description should be atleast 3 characters long"),
  duration: z.coerce.number().int().positive(),
  price: z.coerce.number().int().positive(),
});

const CourseForm = ({ user, trigger, categoryName }: CourseFormProps) => {
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      image: "",
    },
  });

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const createcourse = async (data: z.infer<typeof courseSchema>) => {
    try {
      toast.loading("Creating course", {
        id: "create-course",
      });
      const response = await createAcourse(
        data.course,
        data.image,
        data.description,
        user.realId,
        categoryName,
        data.duration,
        data.price
      );
      if (response.error) {
        toast.error(response.error, {
          id: "create-course",
        });
        return;
      }
      toast.success("course created successfully", {
        id: "create-course",
      });
      setOpen(false);
    } catch (error) {
      console.log("Error in createcourse", error);
      toast.error("Something went wrong", {
        id: "create-course",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="items-center">
          <DialogTitle>Add course</DialogTitle>
          <DialogDescription>Add a new course</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(createcourse)}>
          <div className="w-full space-y-2">
            <div className="space-y-1">
              <Input placeholder="Enter course name" {...register("course")} />
              {errors.course && (
                <p className="text-red-500">{errors.course.message}</p>
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
                type="number"
                id="duration"
                placeholder="duration of the course..."
                {...register("duration")}
              />
              {errors.duration && (
                <p className="text-red-500">{errors.duration.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                type="number"
                id="price"
                placeholder="price of the course..."
                {...register("price")}
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
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
                Add course
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseForm;
