"use client";

import { cn } from "@local/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { FaHome, FaUser, FaEnvelope } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoAccessibilitySharp } from "react-icons/io5";

const SidebarWraper = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const path = usePathname();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: FaHome, text: "Dashboard", href: "dashboard" },
    { icon: FaUser, text: "Profile", href: "profile" },
    {
      icon: FaArrowTrendUp,
      text: "Opportunities",
      href: "opportunities",
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

export default SidebarWraper;
