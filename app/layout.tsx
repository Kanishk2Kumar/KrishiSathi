import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import { UserProvider } from "@/context/UserContext";

// Bebas Neue Font Configuration
const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

// Cormorant Garamond Font Configuration
const cormorantGaramond = localFont({
  src: [
    { path: "/fonts/CormorantGaramond-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/CormorantGaramond-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--cormorant-garamond",
});

export const metadata: Metadata = {
  title: "Krishi Sathi",
  description: "Krishi Sathi: किसान की हर मुश्किल का हल।",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <UserProvider>
        <body
          className={`${bebasNeue.variable} ${cormorantGaramond.variable} antialiased`}
        >
            {children}
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;