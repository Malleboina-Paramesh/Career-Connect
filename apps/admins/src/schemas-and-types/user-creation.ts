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
