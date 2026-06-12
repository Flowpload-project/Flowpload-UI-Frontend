"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const PODCAST_PLATFORMS = [
  { id: "amazonmusic", name: "Amazon Music", submitUrl: "https://podcasters.amazon.com" },
  { id: "deezer", name: "Deezer", submitUrl: "https://podcasters.deezer.com" },
  { id: "iheartradio", name: "iHeartRadio", submitUrl: "https://www.iheart.com/content/submit-your-podcast/" },
  { id: "tunein", name: "TuneIn", submitUrl: "https://help.tunein.com/contact/add-podcast-S19TR3Sdf" },
  { id: "podchaser", name: "Podchaser", submitUrl: "https://www.podchaser.com/podcasts/submit" },
  { id: "applepodcasts", name: "Apple Podcasts", submitUrl: "https://podcastsconnect.apple.com" },
  { id: "spotifypodcasts", name: "Spotify for Podcasters", submitUrl: "https://podcasters.spotify.com" },
];

const ITUNES_CATEGORIES = [
  "Arts", "Business", "Comedy", "Education", "Fiction",
  "Government", "Health & Fitness", "History", "Kids & Family", "Leisure",
  "Music", "News", "Religion & Spirituality", "Science", "Society & Culture",
  "Sports", "Technology", "True Crime", "TV & Film",
];

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
  { code: "hi", name: "Hindi" },
  { code: "ar", name: "Arabic" },
];

type Step = 1 | 2 | 3;
type Podcast = { id: string; slug: string; title: string; feedUrl: string };
type ApiError = { response?: { data?: { error?: string | { message?: string } } }; message?: string };

function extractError(e: ApiError, fallback: string): string {
  const err = e?.response?.data?.error;
  if (typeof err === "string") return err;
  if (typeof err === "object" && err?.message) return err.message;
  return e?.message || fallback;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Technology");
  const [language, setLanguage] = useState("en");
  const [explicit, setExplicit] = useState(false);
  const [artworkUrl, setArtworkUrl] = useState("");

  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [connectResult, setConnectResult] = useState<{ connected: number; failed: number } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/v1/podcasts/me");
        if (res.data?.id) {
          setPodcast(res.data);
          setStep(2);
        }
      } catch {
        // 404 = no podcast yet, that's fine
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  async function handleCreatePodcast(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await api.post("/api/v1/podcasts", {
        title: title.trim(),
        description: description.trim() || undefined,
        author: author.trim() || undefined,
        category,
        language,
        explicit,
        artworkUrl: artworkUrl.trim() || undefined,
      });
      setPodcast(res.data);
      setStep(2);
    } catch (e) {
      setError(extractError(e as ApiError, "Failed to create podcast"));
    } finally {
      setBusy(false);
    }
  }

  async function handleBulkConnect() {
    if (!podcast?.feedUrl) {
      setError("Feed URL not yet generated. Please refresh.");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const res = await api.post("/api/v1/channels/bulk-connect", {
        rssUrl: podcast.feedUrl,
        platforms: PODCAST_PLATFORMS.map((p) => p.id),
        displayName: podcast.title,
      });
      setConnectResult({
        connected: res.data?.connected?.length ?? 0,
        failed: res.data?.failed?.length ?? 0,
      });
      setStep(3);
    } catch (e) {
      setError(extractError(e as ApiError, "Bulk connect failed"));
    } finally {
      setBusy(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-[#2D89FF] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold dark:text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Welcome to Flowpload
        </h1>
        <p className="text-sm text-black/60 dark:text-white/60 mt-1">
          Let&apos;s get your podcast live. AI-powered distribution and repurposing — in 3 quick steps.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-3 flex-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= n ? "bg-[#2D89FF] text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {step > n ? "✓" : n}
            </div>
            <div className={`flex-1 h-1 rounded ${step > n ? "bg-[#2D89FF]" : "bg-gray-200 dark:bg-gray-700"}`}></div>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 px-4 py-3 text-red-800 dark:text-red-200 text-sm">
          {error}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleCreatePodcast} className="bg-white dark:bg-gray-800 rounded-2xl border border-black/5 dark:border-white/10 p-6 space-y-5">
          <div>
            <h2 className="text-xl font-bold mb-1 dark:text-white">Tell us about your podcast</h2>
            <p className="text-sm text-black/60 dark:text-white/60">This becomes your iTunes-compatible RSS feed.</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white/80">Podcast title *</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Future of Podcasting"
              className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white/80">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What is your podcast about?"
              className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white/80">Author / Host</label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white/80">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2"
              >
                {ITUNES_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white/80">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white/80">Artwork URL</label>
              <input
                type="url"
                value={artworkUrl}
                onChange={(e) => setArtworkUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-gray-900 text-[#111827] dark:text-white px-3 py-2"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm dark:text-white/80">
            <input type="checkbox" checked={explicit} onChange={(e) => setExplicit(e.target.checked)} />
            Contains explicit content
          </label>

          <button
            type="submit"
            disabled={busy || !title.trim()}
            className="w-full rounded-lg px-4 py-3 text-sm font-bold text-white hover:brightness-95 disabled:opacity-50"
            style={{ backgroundColor: "#2D89FF" }}
          >
            {busy ? "Creating…" : "Create podcast & continue"}
          </button>
        </form>
      )}

      {step === 2 && podcast && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-black/5 dark:border-white/10 p-6 space-y-5">
          <div>
            <h2 className="text-xl font-bold mb-1 dark:text-white">Your RSS feed is live</h2>
            <p className="text-sm text-black/60 dark:text-white/60">
              Submit this feed URL to each podcast platform. We&apos;ve pre-marked all 7 as ready to connect.
            </p>
          </div>

          <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 bg-gray-50 dark:bg-gray-900">
            <div className="text-xs text-black/60 dark:text-white/60 mb-1">Your Flowpload RSS feed</div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm break-all font-mono dark:text-white">{podcast.feedUrl}</code>
              <button
                onClick={() => navigator.clipboard.writeText(podcast.feedUrl)}
                className="text-xs px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {PODCAST_PLATFORMS.map((p) => (
              <a
                key={p.id}
                href={p.submitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/10 p-3 text-sm hover:bg-black/5 dark:hover:bg-white/10"
              >
                <span className="font-medium dark:text-white">{p.name}</span>
                <span className="text-xs text-[#2D89FF]">Submit feed →</span>
              </a>
            ))}
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 text-xs text-blue-800 dark:text-blue-200">
            <strong>What happens next:</strong> Click &quot;Mark all as connected&quot; once you&apos;ve submitted to the platforms above. We&apos;ll track them in your dashboard. Approvals on each platform usually take 24-48h.
          </div>

          <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-3 text-xs text-yellow-800 dark:text-yellow-200">
            <strong>Phase 2 — Coming soon:</strong> YouTube, SoundCloud &amp; Audiomack direct upload integrations are in development and will be available soon.
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex-1 rounded-lg border border-black/20 dark:border-white/20 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            >
              I&apos;ll do this later
            </button>
            <button
              onClick={handleBulkConnect}
              disabled={busy}
              className="flex-1 rounded-lg px-4 py-2 text-sm font-bold text-white hover:brightness-95 disabled:opacity-50"
              style={{ backgroundColor: "#2D89FF" }}
            >
              {busy ? "Connecting…" : "Mark all as connected"}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-black/5 dark:border-white/10 p-8 text-center space-y-4">
          <div className="text-5xl">🎙️</div>
          <h2 className="text-2xl font-bold dark:text-white">You&apos;re live</h2>
          {connectResult && (
            <p className="text-sm text-black/60 dark:text-white/60">
              {connectResult.connected} platform{connectResult.connected === 1 ? "" : "s"} connected
              {connectResult.failed > 0 && <> · {connectResult.failed} failed (you can retry from the Channels page)</>}
            </p>
          )}
          <p className="text-sm text-black/60 dark:text-white/60">
            Upload your first episode and Flowpload will distribute it everywhere — plus auto-generate clips, captions, and shorts.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => router.push("/uploads")}
              className="rounded-lg px-6 py-3 text-sm font-bold text-white hover:brightness-95"
              style={{ backgroundColor: "#2D89FF" }}
            >
              Upload your first episode
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-lg border border-black/20 dark:border-white/20 px-6 py-3 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
