"use client";
import { useGeneralStore } from "@/Providers/ContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@local/ui/components/button";
import { Input } from "@local/ui/components/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@local/ui/components/sheet";
import { Textarea } from "@local/ui/components/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateProfile } from "../action";
import { toast } from "sonner";

const ProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  location: z.string().min(5, {
    message: "Location must be atleast 5 characters long",
  }),
  bio: z.string(),
  phone: z.string().length(10, {
    message: "Phone number must be 10 characters long",
  }),
  profession: z.string(),
  image: z.string().min(5, {
    message: "plz provide a valid image url",
  }),
});

const ProfileUpdateSection = ({ trigger }: { trigger: React.ReactNode }) => {
  const { setUserProfile, userProfile } = useGeneralStore();
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: userProfile?.profile?.name || "",
      email: userProfile?.profile?.email || "",
      location: userProfile?.profile?.location || "",
      bio: userProfile?.profile?.bio || "",
      phone: userProfile?.profile?.phone || "",
      profession: userProfile?.profile?.profession || "",
      image: userProfile?.profile?.image || "",
    },
  });

  const updateDetails = async (values: z.infer<typeof ProfileSchema>) => {
    try {
      setLoading(true);
      toast.loading("updating...", {
        id: "update-profile",
      });
      const data = await updateProfile(values);
      if (data.error) {
        console.log(data.error);
        toast.error(data.error, {
          id: "update-profile",
        });
        return;
      }
      setUserProfile(data);
      setOpen(false);
      toast.success("Profile updated successfully", {
        id: "update-profile",
      });
    } catch (error) {
      console.error(error);
      toast.error("someting went wrong!", {
        id: "update-profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Basic Details</SheetTitle>
        </SheetHeader>
        <div className="mt-2">
          <form onSubmit={handleSubmit(updateDetails)}>
            <div className="space-y-4">
              <div>
                <Input
                  {...register("name")}
                  placeholder="Name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("email")}
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Textarea
                  {...register("location")}
                  placeholder="Location"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.location.message}
                  </p>
                )}
              </div>
              <div>
                <Textarea
                  {...register("bio")}
                  placeholder="Bio"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bio.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("phone")}
                  placeholder="Phone"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("profession")}
                  placeholder="Profession"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.profession && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.profession.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("image")}
                  placeholder="Image"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.image.message}
                  </p>
                )}
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileUpdateSection;
