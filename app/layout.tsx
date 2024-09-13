import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import ExitModal from "@/components/modals/ExitModal";
import HeartModal from "@/components/modals/HeartModal";
import PracticeModal from "@/components/modals/PracticeModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doulingo",
  description: "Learn and master new languages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          {children}
          <Toaster />
          <HeartModal />
          <PracticeModal />
          <ExitModal />
        </body>
      </html>
    </ClerkProvider>
  );
}
