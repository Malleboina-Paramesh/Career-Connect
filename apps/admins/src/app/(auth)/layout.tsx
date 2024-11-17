import { auth } from "@/auth";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Button } from "@local/ui/components/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@local/ui/components/sheet";
import { Menu, ArrowRight, Check, Star, Shield, Clock } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Roles", href: "/#roles" },
    { name: "Benefits", href: "/#benefits" },
    { name: "Testimonials", href: "/#testimonials" },
  ];
  return (
    <div className="min-h-screen bg-background">
      {/* <div className="flex items-center justify-center py-12 w-full lg:w-1/2"> */}
      <nav className="fixed w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-zinc-200 dark:border-zinc-800 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-transparent bg-clip-text"
              >
                Career Connect
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <ThemeSwitch />
              {session?.user ? (
                <Link href="/dashboard">
                  <Button variant="default" className="group">
                    Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="group">
                    Join Our Team
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    {session?.user ? (
                      <Link href="/dashboard">
                        <Button className="w-full">Dashboard</Button>
                      </Link>
                    ) : (
                      <Link href="/login">
                        <Button className="w-full">Join Our Team</Button>
                      </Link>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex justify-center items-center min-h-screen">
        {children}
      </div>
      {/* </div> */}
    </div>
  );
};

export default layout;
