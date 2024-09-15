import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "@local/ui/components/sonner";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import "@local/ui/globals.css";
import ContextProvider from "@/Providers/ContextProvider";

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
        <ContextProvider>
          <ThemeProvider attribute="class">
            <NextTopLoader
              color="#2299DD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              template='<div class="bar" role="bar"><div class="peg"></div></div>'
              zIndex={1600}
              showAtBottom={false}
            />
            {children}
            <Toaster position="top-center" />
          </ThemeProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
