"use client";
import { LoginSchema } from "@/schemas-and-types/login";
import { Button } from "@local/ui/components/button";
import { Input } from "@local/ui/components/input";
import { Label } from "@local/ui/components/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { loginUser } from "@/actions/login";
import { useRouter } from "next/navigation";
import { UAParser } from "ua-parser-js";

interface LoginFormProps {
  title: string;
  description: string;
}

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm = ({ description, title }: LoginFormProps) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();
  const onSubmit = async (formData: LoginFormData) => {
    try {
      toast.loading("Logging in...", { id: "login" });
      console.log("Login attempt:", formData);
      const parser = new UAParser();
      const deviceInfo = parser.getResult();

      const loginData = {
        email: formData.email,
        password: formData.password,
        device: {
          browser: deviceInfo.browser.name,
          os: deviceInfo.os.name,
          deviceType: deviceInfo.device.type || "Desktop",
        },
      };
      const result = await loginUser(loginData as any);
      if (result?.error) {
        toast.error(result.error, { id: "login" });
      } else {
        toast.success("Login Successful", { id: "login" });
        // Redirect here if needed
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred", { id: "login" });
    }
  };
  return (
    <div className="mx-auto flex flex-col justify-center items-center ">
      <div className="text-pretty text-center space-y-3 mb-7">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 min-w-full w-[400px]">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" {...register("password")} />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href={`/contact?query=from-login`} className="underline">
            contact us
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
