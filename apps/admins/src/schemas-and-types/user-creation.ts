import { MentorType, Role } from "@local/database";
import { z } from "zod";

export const UserCreationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(Role),
  name: z.string(),
  sub_role: z.nativeEnum(MentorType),
});

export type UserCreationType = z.infer<typeof UserCreationSchema>;

export const studentCreationSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type StudentCreationType = z.infer<typeof studentCreationSchema>;

export const MentorCreationSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  mentorType: z.nativeEnum(MentorType),
});

export type MentorCreationType = z.infer<typeof MentorCreationSchema>;

export const studentAdminCreationSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  mentorType: z.nativeEnum(MentorType),
});

export type StudentAdminCreationType = z.infer<
  typeof studentAdminCreationSchema
>;

export const MentorAdminCreationSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type MentorAdminCreationType = z.infer<typeof MentorCreationSchema>;

export const companyCreationSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(6, {
    message: "description must be at least 6 characters.",
  }),
  location: z.string().min(3, {
    message: "location must be at least 3 characters.",
  }),
});

export type CompanyCreationType = z.infer<typeof companyCreationSchema>;

export const jobCreationSchema = z.object({
  role: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(6, {
    message: "description must be at least 6 characters.",
  }),
  location: z.string().min(3, {
    message: "location must be at least 3 characters.",
  }),
  salary: z.coerce.number(),
  passedOutYear: z.coerce.number(),
  lastDate: z.coerce.date(),
  noOfOpenings: z.coerce.number(),
});

export type JobCreationType = z.infer<typeof jobCreationSchema>;
