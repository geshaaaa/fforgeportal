'use client';

import "./globals.css";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Set document title
    if (typeof document !== "undefined") {
      document.title = "FeedForge - Data Feeding Portal";
    }

    if (typeof window === "undefined") {
      return;
    }

    const checkOnboarding = () => {
      try {
        const completed =
          window.localStorage.getItem("onboardingCompleted") === "true";

        // Allow access to landing page and onboarding page
        if (pathname === "/" || pathname === "/onboarding") {
          return;
        }

        // If onboarding not completed, redirect to landing page
        if (!completed && pathname !== "/" && pathname !== "/onboarding") {
          router.replace("/");
          return;
        }

        // If onboarding is completed and user is on landing/onboarding, allow it
        // (they can access these pages even after completion)
      } catch (error) {
        console.error("Layout error:", error);
      }
    };

    // Run check after router is ready
    const timeoutId = setTimeout(() => {
      checkOnboarding();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, router]);

  return (
    <html lang="en">
      <body className="bg-[#FBF9F7]">{children}</body>
    </html>
  );
}

