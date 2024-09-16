"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@local/ui/components/button";

import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeSwitch() {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    setTheme(() => (theme === "dark" ? "light" : "dark"));
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleTheme}>
      <FaSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <FaMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
