import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "@local/ui/components/sonner";
import "@local/ui/globals.css";
import { ThemeProvider } from "@/Providers/ThemeProvider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Admins",
  description: "Admins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
