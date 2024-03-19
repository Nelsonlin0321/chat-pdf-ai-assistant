import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/components/Providers";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDF AI Assistant",
  description: "Chat with PDF Powered by Genimi",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en" data-color-mode="light">
          <body className={inter.className}>
            <>
              <Navbar />
              {children}
            </>
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
