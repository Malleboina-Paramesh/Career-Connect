"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/utils/uploader";
import { Uploader } from "@uploadthing/react";
import { toast } from "sonner";
import { ClientUploadedFileData } from "uploadthing/types";
interface FileuploadProps {
  endpoint: keyof typeof ourFileRouter;
  onChange: (url: string, res?: ClientUploadedFileData<null>[]) => void;
}
export default function ProcessTheUploads({
  endpoint,
  onChange,
}: FileuploadProps) {
  return (
    <UploadDropzone
      className="border border-spacing-4 border-dashed border-gray-300 rounded-md p-4"
      //   onUploadBegin={() => {
      //     toast.loading("uploading...", {
      //       id: "uploading",
      //     });
      //   }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log(res);
        onChange(res[0]!.url, res);
        // toast.success("uploaded successfully", {
        //   id: "uploading",
        // });
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message, {
          id: "uploading",
        });
      }}
    />
  );
}
