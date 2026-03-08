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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set document title
    if (typeof document !== "undefined") {
      document.title = "FeedForge - Data Feeding Portal";
    }
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") {
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
          setChecked(true);
          return;
        }

        // If onboarding is completed and user is on onboarding page
        if (completed && pathname === "/") {
          // Check if user intentionally navigated to onboarding via header link
          const navigateToOnboarding = sessionStorage.getItem('navigateToOnboarding');
          
          if (navigateToOnboarding === 'true') {
            // User clicked the onboarding link - allow access and clear flag
            sessionStorage.removeItem('navigateToOnboarding');
            setChecked(true);
          } else {
            // Direct load - redirect to dashboard
            router.replace("/dashboard");
            setChecked(true);
          }
        } else {
          setChecked(true);
        }
      } catch (error) {
        console.error("Layout error:", error);
        setChecked(true);
      }
    };

    // Run check after a small delay to ensure router is ready
    const timeoutId = setTimeout(() => {
      checkOnboarding();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, router, mounted]);

  if (!mounted || !checked) {
    return (
      <html lang="en">
        <body className="bg-[#FBF3EA]">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#07011c] to-[#1a0d3d] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                <span className="text-white text-2xl font-bold">FF</span>
              </div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

