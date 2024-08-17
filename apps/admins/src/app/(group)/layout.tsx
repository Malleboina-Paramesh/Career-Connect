import SidebarContent from "@/components/SidenarContext";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-yellow-400">
      <SidebarContent>{children}</SidebarContent>
    </div>
  );
};

export default Layout;
