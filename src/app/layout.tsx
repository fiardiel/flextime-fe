import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlexTime",
  description: "Flex up with FlexTime!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme='dracula' className="h-full">
      <body className={`${inter} h-full dark`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
