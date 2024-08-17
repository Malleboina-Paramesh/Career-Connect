"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@local/ui/components/button";
import { Input } from "@local/ui/components/input";
import {
  studentCreationSchema,
  StudentCreationType,
} from "@/schemas-and-types/user-creation";
import { toast } from "sonner";
import { createStudent } from "../action";

const StudentCreationForm = () => {
  const form = useForm<StudentCreationType>({
    resolver: zodResolver(studentCreationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: StudentCreationType) {
    try {
      toast.loading("Creating Student", {
        id: "creating-student",
      });
      const data = await createStudent(values);
      if (data.error) {
        toast.error(data.error, {
          id: "creating-student",
        });
        return;
      }
      toast.success("Student Created Successfully", {
        id: "creating-student",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full  md:w-1/2  mx-auto mt-8 p-6 rounded-lg shadow-md space-y-4">
      <h1 className="font-bold text-2xl">Create Student</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...form.register("name")}
            placeholder="Student Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...form.register("email")}
            placeholder="Student Email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...form.register("password")}
            type="password"
            placeholder="Initial Password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <Button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
          Create Student
        </Button>
      </form>
    </div>
  );
};

export default StudentCreationForm;
