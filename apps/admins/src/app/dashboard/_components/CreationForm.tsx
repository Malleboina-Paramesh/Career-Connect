"use client";

import { UserCreationType } from "@/schemas-and-types/user-creation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { UserCreationSchema } from "@/schemas-and-types/user-creation";
import { Button } from "@local/ui/components/button";
import { Input } from "@local/ui/components/input";
import { Label } from "@local/ui/components/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@local/ui/components/select";
import { createUser } from "@/actions/users-operations";

const CreationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreationType>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(UserCreationSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "MENTOR",
      name: "",
      sub_role: "TRAINER",
    },
  });

  const onSubmit = async (data: UserCreationType) => {
    console.log("Form Data:", data);
    await createUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter your name"
          className="mt-1"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register("email")}
          placeholder="Enter your email"
          className="mt-1"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Enter your password"
          className="mt-1"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Select {...register("role")}>
          <SelectTrigger id="role" className="mt-1">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GLOBAL_ADMIN">Global Admin</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="STUDENT">Student</SelectItem>
            <SelectItem value="MENTOR">Mentor</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>

      <div>
        <Label htmlFor="sub_role">Sub Role</Label>
        <Select {...register("sub_role")}>
          <SelectTrigger id="sub_role" className="mt-1">
            <SelectValue placeholder="Select a sub role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MENTOR">Mentor</SelectItem>
            <SelectItem value="TRAINER">Trainer</SelectItem>
            <SelectItem value="ADVISOR">Advisor</SelectItem>
          </SelectContent>
        </Select>
        {errors.sub_role && (
          <p className="text-red-500">{errors.sub_role.message}</p>
        )}
      </div>

      <Button type="submit" className="mt-4">
        Create User
      </Button>
    </form>
  );
};

export default CreationForm;
