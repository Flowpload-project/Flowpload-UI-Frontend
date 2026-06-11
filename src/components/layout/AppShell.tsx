"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { clearToken, getToken, getRole } from "@/lib/auth";
import HomeIcon from "@mui/icons-material/Home";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DnsIcon from "@mui/icons-material/Dns";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsIcon from "@mui/icons-material/Settings";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import MicIcon from "@mui/icons-material/Mic";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

type NavItem = { href: string; label: string; Icon: React.ElementType };

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [role, setRole] = useState<'admin' | 'admin_viewer' | 'user' | null>(null);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    // Compute on client after mount to avoid SSR/CSR mismatch
    setRole(getRole());
    setAuthed(!!getToken());
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const nav = useMemo<NavItem[]>(() => {
    const items: NavItem[] = [];
    if (role === 'admin' || role === 'admin_viewer') {
      items.push({ href: "/admin/dashboard", label: "Dashboard", Icon: HomeIcon });
      items.push({ href: "/admin/users", label: "Admin", Icon: PeopleIcon });
    } else {
      items.push({ href: "/dashboard", label: "Dashboard", Icon: HomeIcon });
      items.push({ href: "/podcasts", label: "Podcasts", Icon: MicIcon });
      items.push({ href: "/episodes", label: "Episodes", Icon: LibraryMusicIcon });
      items.push({ href: "/clips", label: "Clips", Icon: ContentCutIcon });
      items.push({ href: "/channels", label: "Channels", Icon: DnsIcon });
      items.push({ href: "/uploads", label: "Uploads", Icon: CloudUploadIcon });
      items.push({ href: "/automation", label: "Automation", Icon: SmartToyIcon });
      items.push({ href: "/monetization", label: "Plans", Icon: HomeIcon });
      items.push({ href: "/status", label: "Status", Icon: MonitorHeartIcon });
      items.push({ href: "/settings", label: "Settings", Icon: SettingsIcon });
    }
    return items;
  }, [role]);

  function signOut() {
    clearToken();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#0f172a] text-[#171717] dark:text-[#f1f5f9] transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* CR-5 fix: use full page reload so the homepage's logged-in redirect is bypassed.
              Using a button instead of <a> to avoid nesting <a> inside Logo's own <Link> */}
          <button
            onClick={() => { window.location.href = "/"; }}
            aria-label="Flowpload - Home"
            className="focus:outline-none"
          >
            <Logo href={undefined} width={160} height={45} priority />
          </button>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {authed && (
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#2D89FF] text-white hover:brightness-110 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <LogoutIcon fontSize="small" /> Sign out
              </button>
            )}
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 grid grid-cols-12 gap-4 sm:gap-6">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <nav className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-black/5 dark:border-white/10 overflow-hidden sticky top-24">
            {!mounted ? (
              <div className="p-3 space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              nav.map(({ href, label, Icon }) => {
                const active = pathname?.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-all duration-200 ${active
                      ? "bg-[#E8F2FF] dark:bg-[#2D89FF]/20 text-[#2D89FF] border-l-4 border-[#2D89FF]"
                      : "hover:bg-black/5 dark:hover:bg-white/5 dark:text-white/80 border-l-4 border-transparent"
                      }`}
                  >
                    <Icon fontSize="small" />
                    <span>{label}</span>
                  </Link>
                );
              })
            )}
          </nav>
        </aside>
        <main className="col-span-12 md:col-span-9 lg:col-span-10">{children}</main>
      </div>
    </div>
  );
}


