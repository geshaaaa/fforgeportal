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

        // If onboarding not completed, always redirect to onboarding page
        if (!completed) {
          if (pathname !== "/") {
            router.replace("/");
          }
          return;
        }

        // If onboarding is completed and user is on onboarding page
        if (completed && pathname === "/") {
          // Check if user intentionally navigated to onboarding via header link
          const navigateToOnboarding = sessionStorage.getItem('navigateToOnboarding');
          
          if (navigateToOnboarding !== 'true') {
            // Direct load - redirect to dashboard
            router.replace("/dashboard");
          } else {
            // User clicked the onboarding link - allow access and clear flag
            sessionStorage.removeItem('navigateToOnboarding');
          }
        }
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
      <body className="bg-[#FBF3EA]">{children}</body>
    </html>
  );
}

