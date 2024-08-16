import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "@local/ui/components/sonner";
import "@local/ui/globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "students",
  description: "students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
      <Toaster position="top-center" />
    </html>
  );
}
