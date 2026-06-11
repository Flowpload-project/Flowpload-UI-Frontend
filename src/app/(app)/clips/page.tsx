"use client";
import { useRouter } from "next/navigation";

export default function ClipsPage() {
  const router = useRouter();
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <div className="text-5xl mb-4">✂️</div>
      <h1 className="text-2xl font-bold dark:text-white mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
        AI Clips are coming soon
      </h1>
      <p className="text-black/60 dark:text-white/60 mb-6 max-w-md mx-auto">
        Flowpload will automatically turn each episode into short, captioned clips for Reels, Shorts,
        TikTok, and more — with the most engaging moments detected for you. This lands in the next release.
      </p>
      <span className="inline-block rounded-full bg-[#2D89FF]/10 text-[#2D89FF] text-xs font-semibold px-3 py-1 mb-8">
        Phase 2 — in development
      </span>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => router.push("/episodes")}
          className="rounded-lg px-5 py-2.5 text-sm font-bold text-white hover:brightness-95"
          style={{ backgroundColor: "#2D89FF" }}
        >
          Manage episodes
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="rounded-lg border border-black/20 dark:border-white/20 px-5 py-2.5 text-sm hover:bg-black/5 dark:hover:bg-white/10 dark:text-white"
        >
          Back to dashboard
        </button>
      </div>
    </div>
  );
}
