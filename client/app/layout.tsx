import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitnessTrack",
  description:
    "App designed to help YOU track your daily achievements at the gym",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
