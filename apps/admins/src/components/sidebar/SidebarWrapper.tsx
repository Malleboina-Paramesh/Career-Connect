"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@local/ui/lib/utils";
import { usePathname } from "next/navigation";
import { CgClose, CgProfile } from "react-icons/cg";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { Button } from "@local/ui/components/button";
import { BiLogOutCircle } from "react-icons/bi";
import { FcMenu } from "react-icons/fc";
import { signOut } from "next-auth/react";
import { ScrollArea, ScrollBar } from "@local/ui/components/scroll-area";
import { FaEnvelope } from "react-icons/fa";
import { IoAccessibilitySharp } from "react-icons/io5";
import { IoMdCreate } from "react-icons/io";
import { ThemeSwitch } from "../ThemeSwitch";
import { AdminType, MentorType, Role } from "@local/database";
import { MdSubject } from "react-icons/md";

interface IMenuItem {
  icon: React.ElementType;
  text: string;
  href: string;
  animation: string;
  access: (AdminType | MentorType | "ALL")[];
}

const Layout = ({
  children,
  role,
  subRole,
}: {
  children: React.ReactNode;
  role: Role;
  subRole: AdminType | MentorType;
}) => {
  const path = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems: IMenuItem[] = [
    {
      icon: RiDashboardHorizontalFill,
      text: "Dashboard",
      href: "dashboard",
      animation: "group-hover:animate-bounce",
      access: ["ALL"],
    },
    {
      icon: CgProfile,
      text: "Profile",
      href: "profile",
      animation: "group-hover:animate-spin",
      access: ["ALL"],
    },
    {
      icon: MdSubject,
      text: "Courses",
      href: "courses",
      animation: "group-hover:animate-ping",
      access: ["MASTER_ADMIN", "COURSE_ADMIN"],
    },
    {
      icon: FaEnvelope,
      text: "Messages",
      href: "messages",
      access: ["ALL"],
      animation: "group-hover:animate-bounce",
    },
    {
      icon: IoAccessibilitySharp,
      text: "Access Control",
      href: "access-management",
      access: ["MASTER_ADMIN", "MENTOR_ADMIN", "STUDENT_ADMIN"],
      animation: "group-hover:animate-ping",
    },
    {
      icon: IoMdCreate,
      text: "Companies",
      href: "company-and-opportunities",
      access: ["MASTER_ADMIN", "MENTOR_ADMIN", "COMPANY_MENTOR"],
      animation: "group-hover:animate-spin",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-inherit py-2 px-4 flex justify-between items-center z-50 border-b">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden mr-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FcMenu size={20} />
          </Button>
          <Link
            href={"/"}
            className="font-bold text-2xl font-mono animate-bounce"
          >
            Career
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <Button
            size="sm"
            variant="outline"
            onClick={async () => {
              await signOut({ callbackUrl: "/thank-you" });
            }}
          >
            <BiLogOutCircle size={18} className="mr-1" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:static inset-y-0 left-0 w-64 bg-background border-r transition-all duration-300 ease-in-out z-40 pt-14 lg:pt-0",
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          )}
        >
          <ScrollArea className="h-full py-4">
            <div className="space-y-2 px-3">
              {menuItems
                .filter(
                  (i) => i.access.includes(subRole) || i.access.includes("ALL")
                )
                .map((item) => (
                  <Link
                    key={item.text}
                    href={`/${item.href}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group hover:bg-accent",
                      path.includes(item.href) &&
                        "bg-primary text-primary-foreground"
                    )}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className={`text-xl ${item.animation}`} />
                    <span>{item.text}</span>
                  </Link>
                ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-3 w-full">
          <ScrollArea className="h-full">
            {children}
            <ScrollBar />
          </ScrollArea>
        </main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
