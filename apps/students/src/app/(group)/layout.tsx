import SidebarWrapper from "@/components/sidebar/SidebarWrapper";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <SidebarWrapper>{children}</SidebarWrapper>;
};

export default Layout;
