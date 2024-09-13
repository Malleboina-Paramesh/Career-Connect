"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@local/ui/lib/utils";
import { usePathname } from "next/navigation";
import { CgClose, CgProfile } from "react-icons/cg";
import { FaArrowTrendUp } from "react-icons/fa6";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { Button } from "@local/ui/components/button";
import { BiLogOutCircle } from "react-icons/bi";
import { ThemeSwitch } from "../ThemeSwitch";
import { FcMenu } from "react-icons/fc";
import { signOut } from "next-auth/react";
import { ScrollArea, ScrollBar } from "@local/ui/components/scroll-area";

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const menuItems = [
    {
      icon: RiDashboardHorizontalFill,
      text: "Dashboard",
      href: "dashboard",
      animation: "group-hover:animate-bounce",
    },
    {
      icon: CgProfile,
      text: "Profile",
      href: "profile",
      animation: "group-hover:animate-spin",
    },
    {
      icon: FaArrowTrendUp,
      text: "Opportunities",
      href: "opportunities",
      animation: "group-hover:animate-bounce",
    },
  ];

  //TODO: add a useEffect to close the sidebar when screen size changes

  return (
    <div className=" lg:flex gap-3 items-center h-screen overflow-y-auto p-3">
      <div className="lg:hidden ">
        {!isExpanded && (
          <FcMenu
            className="absolute top-2 left-4 z-20"
            size={30}
            onClick={() => setIsExpanded(true)}
          />
        )}
      </div>
      <div
        className={cn(
          "h-screen  lg:h-[calc(100vh-40px)] w-1/3 lg:w-52 rounded-lg border-2 p-2 flex flex-col gap-8 items-center",
          isExpanded ? " absolute top-0 left-0" : "hidden lg:flex"
        )}
      >
        <CgClose
          className="absolute top-2 right-2 z-30 lg:invisible"
          size={30}
          onClick={() => setIsExpanded(false)}
        />
        <div className="font-bold text-2xl">LOGO</div>
        <div className="w-full flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <Link
              key={item.text}
              href={`/${item.href}`}
              className={cn(
                "flex items-center gap-3 px-1 py-2  rounded-md border-2 transition-all duration-300 group",
                path.includes(item.href) &&
                  "bg-black text-white dark:bg-white dark:text-black "
              )}
            >
              <item.icon className={`text-xl ${item.animation}`} />
              <span>{item.text}</span>
            </Link>
          ))}
        </div>
        <div className="flex  h-full w-full justify-between items-end">
          <Button
            size={"icon"}
            variant={"destructive"}
            onClick={async () => {
              await signOut({
                callbackUrl: "/thank-you", // Redirect to thank-you page after logout
              });
            }}
          >
            <BiLogOutCircle />
          </Button>
          <ThemeSwitch />
        </div>
      </div>

      <ScrollArea className=" w-full lg:h-[calc(100vh-40px)] rounded-lg border-2 overflow-y-auto">
        {children}
        <ScrollBar />
      </ScrollArea>
    </div>
  );
};

export default SidebarWrapper;
