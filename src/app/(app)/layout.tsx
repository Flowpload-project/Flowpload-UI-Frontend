"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { getToken, isUser, isEmailVerified } from "@/lib/auth";
import Providers from "@/app/providers";

// Routes a newly-signed-up (unverified) user is still allowed to reach,
// so the signup → onboarding flow is not blocked by the email-verification gate.
const VERIFY_EXEMPT = ["/onboarding"];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // Check if user is authenticated
    if (!getToken()) {
      router.replace("/login");
      return;
    }

    // Check if email is verified (Item 9) — except on exempt routes (onboarding)
    const isExempt = VERIFY_EXEMPT.some((p) => pathname?.startsWith(p));
    if (!isEmailVerified() && !isExempt) {
      router.replace("/verify-email");
      return;
    }

    // Redirect admin users to admin dashboard
    if (!isUser()) {
      router.replace("/admin/dashboard");
    }
  }, [router, pathname]);
  return <Providers><AppShell>{children}</AppShell></Providers>;
}


