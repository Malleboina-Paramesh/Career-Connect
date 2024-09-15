import { auth } from "@/auth";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user) return null;
  return (
    <SidebarWrapper role={session.user.role} subRole={session.user.subRole}>
      {children}
    </SidebarWrapper>
  );
};

export default Layout;
