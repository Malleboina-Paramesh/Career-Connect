import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const funAuth = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return redirect("/");
  }
  return { userId };
};

export const ourFileRouter = {
  uploadImages: f({ image: { maxFileCount: 1 } })
    .middleware(() => funAuth())
    .onUploadComplete(() => {}),
  //TODO: add more upload routes
  //   uploadChapterVideo: f({
  //     "video/mp4": { maxFileCount: 1, maxFileSize: "8GB" },
  //     "video/ogg": { maxFileCount: 1, maxFileSize: "8GB" },
  //     "video/webm": { maxFileCount: 1, maxFileSize: "8GB" },
  //   })
  //     .middleware(() => funAuth())
  //     .onUploadComplete(() => {}),
  //   uploadChapterAttachement: f({
  //     image: { maxFileCount: 5 },
  //     text: { maxFileCount: 5 },
  //     pdf: { maxFileCount: 5 },
  //     "application/docbook+xml": { maxFileCount: 3 },
  //   })
  //     .middleware(() => funAuth())
  //     .onUploadComplete(() => {}),
  //   uploadBasicStuff: f({ image: { maxFileCount: 1 } })
  //     .middleware(() => funAuth())
  //     .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
