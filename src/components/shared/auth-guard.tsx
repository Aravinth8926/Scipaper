"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authStore } from "@/lib/auth-store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!authStore.isAuthenticated()) {
      router.push("/sign-in");
    }
  }, [router]);

  if (!authStore.isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
