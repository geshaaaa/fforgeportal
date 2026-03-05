'use client';

import "./globals.css";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Set document title
    document.title = "FeedForge - Data Feeding Portal";
    
    const completed =
      typeof window !== "undefined" &&
      window.localStorage.getItem("onboardingCompleted") === "true";

    // If onboarding not completed, force user to onboarding page
    if (!completed && pathname !== "/") {
      router.replace("/");
    }

    // If onboarding completed and user hits root, send them to dashboard
    if (completed && pathname === "/") {
      router.replace("/dashboard");
    }

    setChecked(true);
  }, [pathname, router]);

  if (!checked) {
    return (
      <html lang="en">
        <body className="bg-[#EDE8D0]" />
      </html>
    );
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

