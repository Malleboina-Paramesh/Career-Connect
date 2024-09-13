import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "@local/ui/components/sonner";
import "@local/ui/globals.css";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import ContextProvider from "@/Providers/ContextProvider";

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
          </ThemeProvider>
          <Toaster position="top-center" />
        </ContextProvider>
      </body>
    </html>
  );
}
