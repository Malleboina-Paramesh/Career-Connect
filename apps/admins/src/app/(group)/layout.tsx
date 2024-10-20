import { auth } from "@/auth";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";
import { ReactNode } from "react";
// import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
// import { extractRouterConfig } from "uploadthing/server";
// import { ourFileRouter } from "../api/uploadthing/core";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user) return null;
  return (
    <>
      {/* <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} /> */}
      <SidebarWrapper role={session.user.role} subRole={session.user.subRole}>
        {children}
      </SidebarWrapper>
    </>
  );
};

export default Layout;
