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
    let timeoutId: NodeJS.Timeout | null = null;
    
    try {
      // Set document title
      if (typeof document !== "undefined") {
        document.title = "FeedForge - Data Feeding Portal";
      }
      
      if (typeof window === "undefined") {
        setChecked(true);
        return;
      }

      const completed =
        window.localStorage.getItem("onboardingCompleted") === "true";

      // If onboarding not completed, force user to onboarding page
      if (!completed && pathname !== "/") {
        router.replace("/");
        setChecked(true);
        return;
      }

      // Allow users to access onboarding page even after completion
      // Users can navigate to it via header links
      // Only redirect to dashboard on initial page load (not on manual navigation)
      if (completed && pathname === "/") {
        // Check if user intentionally navigated to onboarding via header link
        const navigateToOnboarding = sessionStorage.getItem('navigateToOnboarding');
        
        if (navigateToOnboarding === 'true') {
          // User clicked the onboarding link - allow access and clear flag
          sessionStorage.removeItem('navigateToOnboarding');
          setChecked(true);
        } else {
          // Direct load or other navigation - redirect to dashboard
          // Use a small delay to prevent redirect loops
          timeoutId = setTimeout(() => {
            if (pathname === "/") {
              router.replace("/dashboard");
            }
          }, 100);
          setChecked(true);
        }
      } else {
        setChecked(true);
      }
    } catch (error) {
      console.error("Layout error:", error);
      setChecked(true);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [pathname, router]);

  if (!checked) {
    return (
      <html lang="en">
        <body className="bg-[#FBF3EA]" />
      </html>
    );
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

