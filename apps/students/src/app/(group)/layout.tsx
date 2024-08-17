import SidebarWraper from "@/components/SideBarWraper";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-yellow-400">
      <SidebarWraper>{children}</SidebarWraper>
    </div>
  );
};

export default Layout;
