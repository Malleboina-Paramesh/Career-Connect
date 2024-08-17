"use client";

import { cn } from "@local/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { FaHome, FaUser, FaEnvelope } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { IoAccessibilitySharp } from "react-icons/io5";

const SidebarContent = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const path = usePathname();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  //TODO :  access control to be implemented e.g access: ['MENTOR','STUDENT_ADMIN'] for specific roles

  const menuItems = [
    { icon: FaHome, text: "Dashboard", href: "dashboard", access: [] },
    { icon: FaUser, text: "Profile", href: "profile", access: [] },
    { icon: FaEnvelope, text: "Messages", href: "messages", access: [] },
    {
      icon: IoAccessibilitySharp,
      text: "Access Control",
      href: "access-management",
      access: [],
    },
    {
      icon: IoMdCreate,
      text: "Create",
      href: "create",
      access: [],
    },
  ];

  return (
    <div className="flex h-screen w-full">
      <div
        className={`relative bg-white text-black dark:bg-black dark:text-white transition-all duration-300 ${
          isExpanded ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-2 -right-4 bg-white text-black dark:bg-black dark:text-white p-2 rounded-full hover:font-bold transition-colors duration-200"
        >
          {isExpanded ? "←" : "→"}
        </button>
        <div className="p-4">
          <h2 className={`text-xl font-bold mb-6 `}>
            {isExpanded ? "Career-Connect" : "CC"}
          </h2>
          <div>
            {menuItems.map((item, index) => (
              <div key={index} className="mb-4">
                <Link
                  href={`/${item.href}`}
                  className={cn(
                    "flex items-center p-2 rounded-lg transition-all duration-1000 group border",
                    path.includes(item.href) &&
                      "bg-black text-white dark:bg-white dark:text-black "
                  )}
                >
                  <item.icon
                    className={`text-xl ${isExpanded ? "mr-4 group-hover:animate-bounce" : "mx-auto"}`}
                  />
                  <span
                    className={
                      isExpanded ? "block group-hover:translate-x-1" : "hidden"
                    }
                  >
                    {item.text}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 p-5 ">{children}</div>
    </div>
  );
};

export default SidebarContent;
