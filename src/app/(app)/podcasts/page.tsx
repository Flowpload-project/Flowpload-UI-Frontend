"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Podcast = {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  author?: string | null;
  category?: string | null;
  language?: string | null;
  explicit?: boolean;
  artworkUrl?: string | null;
  websiteUrl?: string | null;
  copyright?: string | null;
  feedUrl?: string | null;
};

const ITUNES_CATEGORIES = [
  "Arts", "Business", "Comedy", "Education", "Fiction",
  "Government", "Health & Fitness", "History", "Kids & Family", "Leisure",
  "Music", "News", "Religion & Spirituality", "Science", "Society & Culture",
  "Sports", "Technology", "True Crime", "TV & Film",
];

export default function PodcastsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // editable fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Technology");
  const [explicit, setExplicit] = useState(false);
  const [artworkUrl, setArtworkUrl] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/v1/podcasts/me");
        const p: Podcast = res.data;
        setPodcast(p);
        setTitle(p.title || "");
        setDescription(p.description || "");
        setAuthor(p.author || "");
        setCategory(p.category || "Technology");
        setExplicit(!!p.explicit);
        setArtworkUrl(p.artworkUrl || "");
      } catch {
        setPodcast(null); // 404 = no podcast yet
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      const res = await api.patch("/api/v1/podcasts/me", {
        title: title.trim(),
        description: description.trim() || undefined,
        author: author.trim() || undefined,
        category,
        explicit,
        artworkUrl: artworkUrl.trim() || undefined,
      });
      setPodcast(res.data);
      setEditing(false);
    } catch (e) {
      const err = e as { response?: { data?: { error?: string } } };
      setError(err?.response?.data?.error || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  function copyFeed() {
    if (!podcast?.feedUrl) return;
    navigator.clipboard.writeText(podcast.feedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-[#2D89FF] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Empty state — no podcast yet
  if (!podcast) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="text-5xl mb-4">🎙️</div>
        <h1 className="text-2xl font-bold dark:text-white mb-2">No podcast yet</h1>
        <p className="text-black/60 dark:text-white/60 mb-6">
          Set up your podcast to get a Crimson-hosted RSS feed and distribute it everywhere.
        </p>
        <button
          onClick={() => router.push("/onboarding")}
          className="rounded-lg px-6 py-3 text-sm font-bold text-white hover:brightness-95"
          style={{ backgroundColor: "#2D89FF" }}
        >
          Create your podcast
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold dark:text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Your Podcast
        </h1>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="text-sm px-4 py-2 rounded-lg border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 dark:text-white"
          >
            Edit details
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 px-4 py-3 text-red-800 dark:text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* RSS feed card */}
      <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-gray-800 p-5 mb-6">
        <div className="text-xs text-black/60 dark:text-white/60 mb-1">Your Flowpload RSS feed</div>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-sm break-all font-mono dark:text-white">{podcast.feedUrl}</code>
          <button
            onClick={copyFeed}
            className="text-xs px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 dark:text-white"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <a
            href={podcast.feedUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-[#2D89FF]"
          >
            Open
          </a>
        </div>
      </div>

      {/* Details */}
      {!editing ? (
        <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-gray-800 p-6 space-y-3">
          <Row label="Title" value={podcast.title} />
          <Row label="Description" value={podcast.description || "—"} />
          <Row label="Author / Host" value={podcast.author || "—"} />
          <Row label="Category" value={podcast.category || "—"} />
          <Row label="Language" value={podcast.language || "—"} />
          <Row label="Explicit" value={podcast.explicit ? "Yes" : "No"} />
          <Row label="Artwork URL" value={podcast.artworkUrl || "—"} />
        </div>
      ) : (
        <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-gray-800 p-6 space-y-5">
          <Field label="Podcast title *">
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2" />
          </Field>
          <Field label="Description">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2" />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Author / Host">
              <input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2" />
            </Field>
            <Field label="Category">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2">
                {ITUNES_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Artwork URL">
            <input type="url" value={artworkUrl} onChange={(e) => setArtworkUrl(e.target.value)} placeholder="https://..." className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2" />
          </Field>
          <label className="flex items-center gap-2 text-sm dark:text-white/80">
            <input type="checkbox" checked={explicit} onChange={(e) => setExplicit(e.target.checked)} />
            Contains explicit content
          </label>
          <div className="flex gap-3">
            <button onClick={() => setEditing(false)} className="flex-1 rounded-lg border border-black/20 dark:border-white/20 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 dark:text-white">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving || !title.trim()} className="flex-1 rounded-lg px-4 py-2 text-sm font-bold text-white hover:brightness-95 disabled:opacity-50" style={{ backgroundColor: "#2D89FF" }}>
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
      <div className="w-32 shrink-0 text-xs uppercase tracking-wide text-black/50 dark:text-white/50">{label}</div>
      <div className="text-sm dark:text-white break-words">{value}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 dark:text-white/80">{label}</label>
      {children}
    </div>
  );
}
