"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Episode = {
  id: string;
  title: string;
  description?: string | null;
  audioUrl: string;
  durationSec?: number | null;
  episodeNum?: number | null;
  publishedAt: string;
};

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

export default function EpisodesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [hasPodcast, setHasPodcast] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [description, setDescription] = useState("");

  async function load() {
    try {
      const res = await api.get("/api/v1/episodes");
      setEpisodes(Array.isArray(res.data) ? res.data : []);
      setHasPodcast(true);
    } catch (e) {
      const err = e as { response?: { status?: number } };
      // A missing podcast surfaces as a 400/404 depending on flow
      if (err?.response?.status === 404 || err?.response?.status === 400) setHasPodcast(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd() {
    setError(null);
    setSaving(true);
    try {
      await api.post("/api/v1/episodes", {
        title: title.trim(),
        audioUrl: audioUrl.trim(),
        description: description.trim() || undefined,
      });
      setTitle(""); setAudioUrl(""); setDescription("");
      setShowAdd(false);
      setLoading(true);
      await load();
    } catch (e) {
      const err = e as { response?: { data?: { error?: string | { message?: string } } } };
      const raw = err?.response?.data?.error;
      setError(typeof raw === "string" ? raw : raw?.message || "Failed to add episode");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-[#2D89FF] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!hasPodcast) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="text-5xl mb-4">🎧</div>
        <h1 className="text-2xl font-bold dark:text-white mb-2">Create a podcast first</h1>
        <p className="text-black/60 dark:text-white/60 mb-6">Episodes belong to your podcast. Set up your podcast to start adding episodes.</p>
        <button onClick={() => router.push("/onboarding")} className="rounded-lg px-6 py-3 text-sm font-bold text-white hover:brightness-95" style={{ backgroundColor: "#2D89FF" }}>
          Create your podcast
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold dark:text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Episodes
        </h1>
        <button
          onClick={() => setShowAdd((s) => !s)}
          className="text-sm px-4 py-2 rounded-lg font-bold text-white hover:brightness-95"
          style={{ backgroundColor: "#2D89FF" }}
        >
          {showAdd ? "Close" : "+ Add episode"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 px-4 py-3 text-red-800 dark:text-red-200 text-sm">
          {error}
        </div>
      )}

      {showAdd && (
        <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-gray-800 p-6 space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white/80">Episode title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Episode 1 — Welcome" className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white/80">Audio URL *</label>
            <input type="url" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} placeholder="https://.../episode1.mp3" className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white/80">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2" />
          </div>
          <button onClick={handleAdd} disabled={saving || !title.trim() || !audioUrl.trim()} className="w-full rounded-lg px-4 py-2.5 text-sm font-bold text-white hover:brightness-95 disabled:opacity-50" style={{ backgroundColor: "#2D89FF" }}>
            {saving ? "Adding…" : "Add episode"}
          </button>
        </div>
      )}

      {episodes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/15 dark:border-white/15 p-10 text-center text-black/60 dark:text-white/60">
          No episodes yet. Add your first episode — it will appear in your RSS feed automatically.
        </div>
      ) : (
        <div className="space-y-3">
          {episodes.map((ep) => (
            <div key={ep.id} className="rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-gray-800 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold dark:text-white truncate">{ep.title}</div>
                  {ep.description && <div className="text-sm text-black/60 dark:text-white/60 line-clamp-2 mt-0.5">{ep.description}</div>}
                  <div className="text-xs text-black/40 dark:text-white/40 mt-1">Published {fmtDate(ep.publishedAt)}</div>
                </div>
                <a href={ep.audioUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-xs px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-[#2D89FF]">
                  Audio
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
