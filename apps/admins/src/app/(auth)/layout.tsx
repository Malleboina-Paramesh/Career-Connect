import Image from "next/image";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex items-center justify-center py-12 w-full lg:w-1/2">
        {children}
      </div>
      <div className="hidden w-0 bg-muted lg:block lg:w-1/2">
        <Image
          src="/sidebar.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full object-cover dark:brightness-[0.2] dark:grayscale "
        />
      </div>
    </div>
  );
};

export default layout;
