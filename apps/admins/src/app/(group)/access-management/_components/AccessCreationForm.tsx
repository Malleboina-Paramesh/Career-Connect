"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@local/ui/components/button";
import { Input } from "@local/ui/components/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@local/ui/components/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@local/ui/components/dialog";
import { toast } from "sonner";
import { createAccess } from "../action";
import { useState } from "react";

const AccessFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["ADMIN", "MENTOR", "STUDENT"]),
  subRole: z
    .enum([
      "MASTER_ADMIN",
      "MENTOR_ADMIN",
      "STUDENT_ADMIN",
      "TRAINER_MENTOR",
      "ADVISOR_MENTOR",
      "COMPANY_MENTOR",
    ])
    .optional(),
});

export type AccessFormType = z.infer<typeof AccessFormSchema>;

const AccessCreationForm = ({
  userRole,
  userSubRole,
  trigger,
  role,
}: {
  userRole: string;
  userSubRole: string;
  trigger: React.ReactNode;
  role: string;
}) => {
  if (userRole !== "ADMIN") {
    return <div>You don't have access to this form.</div>;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<AccessFormType>({
    resolver: zodResolver(AccessFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: role as AccessFormType["role"],
      subRole: undefined,
    },
  });

  console.log(getValues("role"), getValues("subRole"));

  const [open, setOpen] = useState(false);

  const onSubmit = async (data: AccessFormType) => {
    toast.loading("Creating user...", {
      id: "creating-user",
    });
    const res = await createAccess(data);
    if (res.error) {
      toast.error(res.error, {
        id: "creating-user",
      });
    } else {
      toast.success("User created successfully", {
        id: "creating-user",
      });

      setOpen(false);
      reset();
    }
  };

  // const canAddRole = (role: string) => {
  //   if (userSubRole === "MASTER_ADMIN") return true;
  //   if (userSubRole === "STUDENT_ADMIN" && role === "STUDENT") return true;
  //   if (userSubRole === "MENTOR_ADMIN" && role === "MENTOR") return true;
  //   return false;
  // };

  const selectedRole = watch("role");
  console.log(errors);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Access</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="name"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              id="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* <div className="space-y-2">
            <Select
              onValueChange={(value) =>
                setValue("role", value as AccessFormType["role"])
              }
              value={role}
            >

              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {canAddRole("ADMIN") && (
                  <SelectItem value="ADMIN">Admin</SelectItem>
                )}
                {canAddRole("MENTOR") && (
                  <SelectItem value="MENTOR">Mentor</SelectItem>
                )}
                {canAddRole("STUDENT") && (
                  <SelectItem value="STUDENT">Student</SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div> */}

          {selectedRole && selectedRole !== "STUDENT" && (
            <div className="space-y-2">
              <Select
                onValueChange={(value) =>
                  setValue("subRole", value as AccessFormType["subRole"])
                }
                value={getValues("subRole")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a sub-role" />
                </SelectTrigger>
                <SelectContent>
                  {selectedRole === "ADMIN" && (
                    <>
                      <SelectItem value="MASTER_ADMIN">Master Admin</SelectItem>
                      <SelectItem value="MENTOR_ADMIN">Mentor Admin</SelectItem>
                      <SelectItem value="STUDENT_ADMIN">
                        Student Admin
                      </SelectItem>
                    </>
                  )}
                  {selectedRole === "MENTOR" && (
                    <>
                      <SelectItem value="TRAINER_MENTOR">
                        Trainer Mentor
                      </SelectItem>
                      <SelectItem value="ADVISOR_MENTOR">
                        Advisor Mentor
                      </SelectItem>
                      <SelectItem value="COMPANY_MENTOR">
                        Company Mentor
                      </SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              {errors.subRole && (
                <p className="text-sm text-red-500">{errors.subRole.message}</p>
              )}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "adding..." : "add user"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccessCreationForm;
