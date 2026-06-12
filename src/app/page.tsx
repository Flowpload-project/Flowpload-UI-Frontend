"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CookieConsent from "@/components/CookieConsent";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";
import { getToken } from "@/lib/auth";

// MUI Icons
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ShieldIcon from "@mui/icons-material/Shield";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PublicIcon from "@mui/icons-material/Public";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MicIcon from "@mui/icons-material/Mic";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

const PRIMARY = "#6C63FF";
const ACCENT = "#FF6584";

// Animated Background Blobs
function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-blob" style={{ background: `radial-gradient(circle, ${PRIMARY}, transparent)` }} />
      <div className="absolute top-[60%] right-[10%] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000" style={{ background: `radial-gradient(circle, ${ACCENT}, transparent)` }} />
      <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full opacity-20 blur-3xl animate-blob animation-delay-4000" style={{ background: `radial-gradient(circle, #4F46E5, transparent)` }} />
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!countRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuad = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutQuad * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
}


// A5: Removed dead Header() function — page renders <MarketingNav /> directly


function Hero() {
  // No mouse-parallax necessary if everything is "set"
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[600px] md:min-h-screen bg-black"
    >
      {/* Responsive Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
        style={{
          minHeight: '100vh',
        }}
        src="https://cdn.pixabay.com/video/2023/09/02/178826-860734645_large.mp4"
        aria-hidden="true"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />

      {/* Animated particles - hide on small/medium screens */}
      <div className="absolute inset-0 z-10 opacity-30 hidden md:block">
        <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute top-[60%] right-[20%] w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDuration: "4s", animationDelay: "1s" }} />
        <div className="absolute bottom-[30%] left-[40%] w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDuration: "5s", animationDelay: "2s" }} />
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[600px] md:min-h-screen py-12 md:py-16 lg:py-20">
          {/* Text content */}
          <div data-aos="fade-up" className="flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-3xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-xs text-white shadow-lg mb-4">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75" style={{ background: ACCENT }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: PRIMARY }} />
              </span>
              AI-powered podcast distribution
            </div>

            <h1 className="mt-4 md:mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white drop-shadow-2xl leading-tight max-w-4xl">
              Upload your episode.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF] animate-gradient">
                Clips, captions, and reach
              </span>{" "}
              — automatic.
            </h1>

            <p className="mt-5 md:mt-6 text-lg sm:text-xl md:text-2xl lg:text-xl text-white/90 drop-shadow-lg leading-relaxed max-w-2xl">
              Flowpload publishes your podcast to every major platform and turns each episode into social clips, burned-in captions, and shorts — all AI-generated, zero extra work.
            </p>

            {/* Call-to-action Section */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 w-full">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 rounded-full px-7 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(108,99,255,0.5)]"
                style={{ backgroundImage: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})` }}
              >
                <RocketLaunchIcon className="group-hover:rotate-12 transition-transform w-5 h-5 md:w-6 md:h-6" />
                <span>Start for Free</span>
              </Link>
              <a
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-full px-7 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white bg-white/10 border border-white/30 hover:bg-white/20 backdrop-blur transition-all hover:scale-105"
              >
                <PlayCircleOutlineIcon className="w-5 h-5 md:w-6 md:h-6" />
                <span>See How It Works</span>
              </a>
            </div>
          </div>

          {/* Hero Image with no 3D Tilt Effect, static */}
          <div className="relative hidden lg:flex justify-center items-center w-full" data-aos="zoom-in">
            <div className="absolute -inset-16 md:-inset-20 lg:-inset-24 bg-gradient-to-tr from-[#6C63FF40] to-[#FF658440] blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
            <div
              className="relative rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-xl p-6 md:p-8 shadow-2xl w-full"
            >
              <Image src="/hero-draw.png" alt="Hero illustration" width={800} height={600} className="w-full h-auto rounded-lg" />
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl border-2 border-purple-500 animate-bounce" style={{ animationDuration: "3s" }}>
                <VerifiedIcon className="text-purple-500 w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl border-2 border-pink-500 animate-bounce" style={{ animationDuration: "3s", animationDelay: "1s" }}>
                <TrendingUpOutlinedIcon className="text-pink-500 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </section>
  );
}

function Problem() {
  return (
    <section className="bg-white dark:bg-gray-900 relative overflow-hidden" data-aos="fade-up">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle, ${PRIMARY} 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />

      <div className="container py-16 grid lg:grid-cols-2 gap-10 items-center my-16 md:my-48 relative z-10">
        <div data-aos="fade-right">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 text-xs text-purple-700 dark:text-purple-300 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
            </span>
            The Problem We Solve
          </div>
          <blockquote className="text-xl sm:text-3xl leading-relaxed text-[#111827] dark:text-white/90 font-bold">
            &ldquo;Podcasters waste{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">hours</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded" />
            </span>
            {" "}submitting feeds, cutting clips, and writing captions manually.&rdquo;
          </blockquote>
          <p className="mt-6 text-lg text-[#111827]/70 dark:text-white/70">
            Flowpload does all of it automatically — one upload distributes your episode everywhere and generates all the social content you need.
          </p>
        </div>
        <div className="relative" data-aos="fade-left">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
          <div className="relative rounded-2xl border-2 border-purple-200/50 dark:border-purple-500/30 bg-white dark:bg-gray-800 p-6 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2">
            <Image src="/problem-draw.png" alt="Tired creator illustration" width={640} height={420} className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Carousel
function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Gaming YouTuber",
      avatarColor: "#7C3AED",
      content: "Flowpload helped me reach 2M+ viewers across 15 countries. My content now feels native everywhere!",
      stats: "2M+ views",
      verified: true,
    },
    {
      name: "Marcus Johnson",
      role: "Music Producer",
      avatarColor: "#DB2777",
      content: "I used to spend 10 hours a week on uploads. Now it's done in minutes. Game changer for independent artists.",
      stats: "10hrs → 10mins",
      verified: true,
    },
    {
      name: "Aisha Patel",
      role: "Tech Reviewer",
      avatarColor: "#0284C7",
      content: "The AI localization is incredible. My tech reviews now rank in Japan, Brazil, and Germany without extra effort.",
      stats: "3x reach growth",
      verified: true,
    },
    {
      name: "Carlos Rodriguez",
      role: "Fitness Coach",
      avatarColor: "#16A34A",
      content: "From 50K to 500K subs in 6 months. The automated optimization is like having a global marketing team.",
      stats: "500K subscribers",
      verified: true,
    },
  ];


  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-xl" />

      <div className="container py-20 my-16 md:my-48 relative z-10">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#111827] dark:text-white">
            Loved by Creators{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="mt-4 text-lg text-[#111827]/70 dark:text-white/70">
            See what creators are saying about Flowpload
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="relative" data-aos="zoom-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-purple-200/50 dark:border-purple-500/30">
              <FormatQuoteIcon className="text-purple-500 text-5xl opacity-20 absolute top-6 left-6" />

              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  {/* A6: Self-hosted initials avatar — no external image dependency */}
                  <svg width="64" height="64" viewBox="0 0 64 64" className="rounded-full border-2 border-purple-500">
                    <circle cx="32" cy="32" r="32" fill={testimonials[activeIndex].avatarColor} />
                    <text
                      x="32" y="38"
                      textAnchor="middle"
                      fontSize="22"
                      fontWeight="bold"
                      fontFamily="Montserrat, sans-serif"
                      fill="white"
                    >
                      {testimonials[activeIndex].name.split(" ").map((n: string) => n[0]).join("")}
                    </text>
                  </svg>
                  {testimonials[activeIndex].verified && (
                    <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-1">
                      <VerifiedIcon className="text-white text-sm" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#111827] dark:text-white">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-sm text-[#111827]/60 dark:text-white/60">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="text-yellow-400 text-xl" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-lg sm:text-xl text-[#111827] dark:text-white/90 leading-relaxed mb-6 italic">
                &ldquo;{testimonials[activeIndex].content}&rdquo;
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold">
                <TrendingUpIcon className="text-sm" />
                {testimonials[activeIndex].stats}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-500/30 hover:border-purple-500 transition-all hover:scale-110 shadow-lg"
              aria-label="Previous testimonial"
            >
              <ArrowBackIcon className="text-purple-600 dark:text-purple-400" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === activeIndex
                    ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500"
                    : "w-2 bg-gray-300 dark:bg-gray-600"
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-500/30 hover:border-purple-500 transition-all hover:scale-110 shadow-lg"
              aria-label="Next testimonial"
            >
              <ArrowForwardIcon className="text-purple-600 dark:text-purple-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  // CR-6: Explainer video section
  // TODO: Replace with real YouTube video ID once available
  // const videoId = "YOUR_VIDEO_ID_HERE";
  // const videoTitle = "How Flowpload Works - AI-Powered Content Distribution";

  return (
    <section id="how-it-works" className="bg-[#F9FAFB] dark:bg-gray-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle, ${PRIMARY} 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />

      <div className="container py-20 my-16 md:my-48 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 text-xs text-purple-700 dark:text-purple-300 mb-6">
            <PlayCircleOutlineIcon className="w-4 h-4" />
            See It In Action
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white">
            See Flowpload in{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="mt-4 text-lg text-[#111827]/70 dark:text-white/70 max-w-2xl mx-auto">
            Upload one episode and watch Flowpload distribute it everywhere, generate clips with captions, and create social content — automatically.
          </p>
        </div>

        {/* CR-6: Branded placeholder until real video ID is set */}
        <div className="max-w-5xl mx-auto" data-aos="zoom-in" data-aos-delay="100">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-200/50 dark:border-purple-500/30">
              <div
                className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-white"
                style={{ minHeight: "420px" }}
              >
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-6 border-4 border-purple-400/30" style={{ backdropFilter: "blur(8px)" }}>
                  <PlayCircleOutlineIcon style={{ fontSize: 56, color: "#a78bfa" }} />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>Explainer Video Coming Soon</h3>
                <p className="text-white/60 text-sm max-w-sm text-center px-4">
                  A full walkthrough of the Flowpload platform is being filmed. Sign up to get notified when it&apos;s live.
                </p>
                <Link
                  href="/signup"
                  className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ backgroundImage: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})` }}
                >
                  Get Early Access
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick feature highlights below video */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          {[
            { icon: CloudUploadIcon, text: "Upload Once" },
            { icon: AutoFixHighIcon, text: "AI Optimize" },
            { icon: PublicIcon, text: "Global Reach" },
            { icon: AutoGraphIcon, text: "Auto Analytics" },
          ].map(({ icon: Icon, text }, idx) => (
            <div
              key={text}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={200 + idx * 50}
            >
              <Icon className="text-purple-600 dark:text-purple-400 w-6 h-6" />
              <span className="text-sm font-semibold text-[#111827] dark:text-white text-center">{text}</span>
            </div>
          ))}
        </div>

        {/* CTA: Professionally encourage signup */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(108,99,255,0.18)]"
            style={{ backgroundImage: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})` }}
            data-aos="fade-up"
            data-aos-delay="350"
          >
            Get Started Free&nbsp;
            <span className="hidden md:inline">— Experience Flowpload Today</span>
            <RocketLaunchIcon className="w-6 h-6" />
          </Link>
          <p className="text-sm text-[#111827]/60 dark:text-white/60">
            No credit card required • 2 uploads free • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

// Bento Grid Features Section
function Features() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const features = [
    {
      title: "Podcast Distribution",
      desc: "Crimson-hosted RSS feed auto-submitted to Apple Podcasts, Spotify, Amazon Music, iHeartRadio, Deezer, TuneIn, and Podchaser.",
      Icon: MicIcon,
      color: "from-purple-500 to-pink-500",
      bullets: ["7 platforms, one click", "iTunes-compliant RSS", "Auto-updating feed"]
    },
    {
      title: "AI Clip Generation",
      desc: "Every episode is automatically sliced into short-form clips with the most engaging moments highlighted.",
      Icon: MovieFilterIcon,
      color: "from-blue-500 to-cyan-500",
      bullets: ["Highlights auto-detected", "9:16, 1:1, 4:5, 16:9", "Ready to post"]
    },
    {
      title: "Burned-in Captions",
      desc: "Whisper AI transcribes your episode and burns styled captions into every clip for silent-scroll viewers.",
      Icon: RecordVoiceOverIcon,
      color: "from-green-500 to-emerald-500",
      bullets: ["Word-level accuracy", "Custom font & color", "SRT/VTT download"]
    },
    {
      title: "Social-Ready Exports",
      desc: "Export every clip in the right format for every platform — Reels, Shorts, TikTok, Twitter, and LinkedIn.",
      Icon: SyncAltIcon,
      color: "from-orange-500 to-red-500",
      bullets: ["Platform presets", "Batch export", "One-click share"]
    },
    {
      title: "YouTube Audiograms",
      desc: "Turn audio-only episodes into watch-worthy YouTube videos with waveform animation and artwork overlay.",
      Icon: MusicNoteIcon,
      color: "from-indigo-500 to-blue-500",
      bullets: ["Auto-generated video", "Artwork + waveform", "Direct YouTube upload"]
    },
    {
      title: "Promotion Automation",
      desc: "When an episode publishes, Flowpload auto-tweets, posts to Instagram, and schedules LinkedIn — with AI-written copy.",
      Icon: RocketLaunchIcon,
      color: "from-pink-500 to-rose-500",
      bullets: ["Twitter, IG, LinkedIn", "AI-written posts", "Custom scheduling"]
    },
    {
      title: "Analytics Dashboard",
      desc: "Track streams, downloads, and audience growth across every podcast platform in one unified view.",
      Icon: AutoGraphIcon,
      color: "from-yellow-500 via-orange-500 to-red-500",
      bullets: ["Multi-platform stats", "Episode performance", "Audience trends"]
    },
    {
      title: "Brand Consistency",
      desc: "Your podcast artwork, tone, and intro music stay consistent across every platform and every clip.",
      Icon: ShieldIcon,
      color: "from-teal-500 to-cyan-500",
      bullets: ["Artwork sync", "Intro/outro templates", "Voice style guide"]
    },
  ];

  return (
    <section id="features" className="bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(${PRIMARY} 1px, transparent 1px), linear-gradient(90deg, ${PRIMARY} 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      <div className="container py-20 my-16 md:my-48 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#111827] dark:text-white">
            The complete <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI Podcast OS</span>
          </h2>
          <p className="mt-4 text-lg text-[#111827]/70 dark:text-white/70 max-w-2xl mx-auto">
            Everything from RSS distribution to clips, captions, and analytics — in one platform
          </p>
        </div>

        {/* Professional, Consistent Feature Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => (
            <Link key={f.title} href="/signup">
              <div
                onMouseEnter={() => setHoveredFeature(f.title)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group relative h-full flex flex-col rounded-2xl border-2 border-black/10 dark:border-white/10 bg-white dark:bg-gray-800 p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 cursor-pointer overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={idx * 70}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-8 transition-opacity duration-300 bg-gradient-to-br ${f.color}`} />

                {/* Top Border Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${f.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

                <div className="relative z-10">
                  {/* Icon with Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex items-center justify-center p-4 rounded-2xl text-white shadow-lg bg-gradient-to-br ${f.color} group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300`}>
                      <f.Icon className="text-3xl" />
                    </div>
                    <ArrowForwardIcon className={`text-[#6C63FF] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-bold text-[#111827] dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300`}>
                    {f.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#111827]/70 dark:text-white/70 group-hover:text-[#111827] dark:group-hover:text-white transition-colors duration-300">
                    {f.desc}
                  </p>

                  {/* Bullet Points with Animation */}
                  <ul className={`mt-4 space-y-2 transition-all duration-300 ${hoveredFeature === f.title ? 'opacity-100' : 'opacity-100'}`}>
                    {f.bullets.map((b, bulletIdx) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-sm text-[#111827] dark:text-white/90 transform transition-all duration-300"
                        style={{
                          transitionDelay: hoveredFeature === f.title ? `${bulletIdx * 50}ms` : '0ms'
                        }}
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                          <CheckCircleIcon className="text-white text-xs" />
                        </span>
                        <span className="group-hover:font-semibold transition-all duration-300">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-4 inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300">
                    Explore Now
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-t from-purple-400/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .group:hover {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}

// Platform Logo Carousel
function PlatformCarousel() {
  const platforms = [
    { name: "Apple Podcasts", color: "#9B59B6", icon: "🎙️" },
    { name: "Spotify for Podcasters", color: "#1ED760", icon: "🎧" },
    { name: "Amazon Music", color: "#00A8E1", icon: "🎼" },
    { name: "iHeartRadio", color: "#C6002B", icon: "📻" },
    { name: "Deezer", color: "#FF6700", icon: "💿" },
    { name: "TuneIn", color: "#14D8CC", icon: "📡" },
    { name: "Podchaser", color: "#5C68E2", icon: "🎙️" },
    { name: "YouTube", color: "#FF0000", icon: "🎥" },
    { name: "SoundCloud", color: "#FF5500", icon: "☁️" },
    { name: "Audiomack", color: "#FFA200", icon: "🎧" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-32 md:py-48 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-300 dark:border-purple-700 bg-purple-100/50 dark:bg-purple-900/30 backdrop-blur-md px-6 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300 shadow-lg mb-6">
            <span className="text-xl">🚀</span>
            <span>Global Distribution Network</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111827] dark:text-white mb-6 leading-tight">
            Connect to{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Every Major Platform
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-[#111827]/70 dark:text-white/70 max-w-3xl mx-auto">
            One upload, unlimited reach across all your favorite streaming platforms
          </p>
        </div>

        <div className="relative mb-16">
          {/* Stronger Gradient Fade on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-purple-50 dark:from-gray-900 via-purple-50/80 dark:via-gray-900/80 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-pink-50 dark:from-gray-900 via-pink-50/80 dark:via-gray-900/80 to-transparent z-10" />

          {/* Scrolling Animation - Row 1 */}
          <div className="flex gap-6 md:gap-8 animate-scroll mb-6 md:mb-8">
            {[...platforms, ...platforms].map((platform, index) => (
              <div
                key={`${platform.name}-${index}`}
                className="flex-shrink-0 w-64 md:w-80 h-48 md:h-56 rounded-3xl border-3 border-purple-200/50 dark:border-purple-500/30 bg-white dark:bg-gray-800 shadow-2xl hover:shadow-[0_20px_60px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-110 flex flex-col items-center justify-center gap-3 group relative overflow-hidden"
                style={{
                  boxShadow: `0 10px 40px ${platform.color}20`,
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${platform.color}, transparent)` }}
                />

                <span className="text-5xl md:text-6xl group-hover:scale-125 transition-transform duration-300">
                  {platform.icon}
                </span>
                <span
                  className="text-2xl md:text-3xl font-extrabold group-hover:scale-110 transition-transform duration-300 relative z-10"
                  style={{ color: platform.color }}
                >
                  {platform.name}
                </span>
              </div>
            ))}
          </div>

          {/* Scrolling Animation - Row 2 (Reverse direction) */}
          <div className="flex gap-6 md:gap-8 animate-scroll-reverse">
            {[...platforms.slice().reverse(), ...platforms.slice().reverse()].map((platform, index) => (
              <div
                key={`${platform.name}-reverse-${index}`}
                className="flex-shrink-0 w-64 md:w-80 h-48 md:h-56 rounded-3xl border-3 border-pink-200/50 dark:border-pink-500/30 bg-white dark:bg-gray-800 shadow-2xl hover:shadow-[0_20px_60px_rgba(236,72,153,0.4)] transition-all duration-300 hover:scale-110 flex flex-col items-center justify-center gap-3 group relative overflow-hidden"
                style={{
                  boxShadow: `0 10px 40px ${platform.color}20`,
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${platform.color}, transparent)` }}
                />

                <span className="text-5xl md:text-6xl group-hover:scale-125 transition-transform duration-300">
                  {platform.icon}
                </span>
                <span
                  className="text-2xl md:text-3xl font-extrabold group-hover:scale-110 transition-transform duration-300 relative z-10"
                  style={{ color: platform.color }}
                >
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto " data-aos="fade-up" data-aos-delay="200">
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-purple-200 dark:border-purple-700 shadow-xl">
            <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {platforms.length}
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-semibold">Platforms</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-purple-200 dark:border-purple-700 shadow-xl">
            <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              50+
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-semibold">Countries</div>
          </div>
          {/* <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-purple-200 dark:border-purple-700 shadow-xl">
            <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-semibold">Availability</div>
          </div> */}
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-purple-200 dark:border-purple-700 shadow-xl">
            <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Instant
            </div>
            <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-semibold">Sync</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 20s linear infinite;
        }
        .animate-scroll:hover,
        .animate-scroll-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// Live Activity Feed
function LiveActivity() {
  const allActivities = [
    { user: "Sarah", action: "uploaded", content: "Tech Review 2024", time: "just now", country: "🇺🇸" },
    { user: "Marcus", action: "reached", content: "1M views", time: "just now", country: "🇬🇧" },
    { user: "Aisha", action: "published to", content: "15 channels", time: "just now", country: "🇮🇳" },
    { user: "Carlos", action: "gained", content: "10K subs", time: "just now", country: "🇧🇷" },
    { user: "Emma", action: "optimized", content: "Gaming Stream", time: "just now", country: "🇦🇺" },
    { user: "Liam", action: "uploaded", content: "Tutorial Series", time: "just now", country: "🇨🇦" },
    { user: "Sofia", action: "reached", content: "500K views", time: "just now", country: "🇪🇸" },
    { user: "Yuki", action: "published to", content: "8 channels", time: "just now", country: "🇯🇵" },
    { user: "David", action: "gained", content: "5K subs", time: "just now", country: "🇩🇪" },
    { user: "Priya", action: "optimized", content: "Vlog Daily", time: "just now", country: "🇮🇳" },
    { user: "Alex", action: "uploaded", content: "Product Launch", time: "just now", country: "🇫🇷" },
    { user: "Zara", action: "reached", content: "2M views", time: "just now", country: "🇿🇦" },
    { user: "Chen", action: "published to", content: "20 channels", time: "just now", country: "🇨🇳" },
    { user: "Nina", action: "gained", content: "15K subs", time: "just now", country: "🇸🇪" },
    { user: "Omar", action: "optimized", content: "Comedy Sketch", time: "just now", country: "🇪🇬" },
  ];

  const [activities, setActivities] = useState(allActivities.slice(0, 5));
  const [usedIndices, setUsedIndices] = useState(new Set([0, 1, 2, 3, 4]));

  useEffect(() => {
    const interval = setInterval(() => {
      // Get a random activity that hasn't been shown recently
      let newIndex;
      const availableIndices = Array.from({ length: allActivities.length }, (_, i) => i)
        .filter(i => !usedIndices.has(i));

      if (availableIndices.length === 0) {
        setUsedIndices(new Set());
        newIndex = Math.floor(Math.random() * allActivities.length);
      } else {
        newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      }

      const newActivity = allActivities[newIndex];

      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
      setUsedIndices(prev => new Set([...prev, newIndex]));
    }, 5000); // New activity every 5 seconds (less frequent)

    return () => clearInterval(interval);
  }, [usedIndices]);

  return (
    <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-40 h-40 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container py-20 my-16 md:my-48 relative z-10">
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur border border-purple-200 dark:border-purple-500/30 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span className="text-sm font-medium text-[#111827] dark:text-white">Live Activity</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#111827] dark:text-white mb-4">
            Join Thousands of Active Creators
          </h2>
          <p className="text-lg text-[#111827]/70 dark:text-white/70">See what&apos;s happening right now</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3" data-aos="fade-up">
          {activities.map((activity, index) => (
            <div
              key={`${activity.user}-${activity.content}-${index}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-purple-200/50 dark:border-purple-500/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-x-2 animate-slideInFromRight"
              style={{
                animation: index === 0 ? 'slideInFromRight 0.5s ease-out' : 'none',
                opacity: index === 4 ? 0.5 : 1,
              }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                {activity.user[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#111827] dark:text-white">
                  <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">{activity.content}</span>
                </p>
                <p className="text-xs text-[#111827]/60 dark:text-white/60">
                  {index < 3 ? "just now" : index === 3 ? "1min ago" : "2min ago"}
                </p>
              </div>
              <div className="text-2xl">{activity.country}</div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto" data-aos="fade-up">
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-purple-200/50 dark:border-purple-500/30 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              <AnimatedCounter end={500} suffix="K+" />
            </div>
            <div className="text-sm text-[#111827]/70 dark:text-white/70 mt-1">Videos Uploaded</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-pink-200/50 dark:border-pink-500/30 shadow-lg">
            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
              <AnimatedCounter end={99} suffix="%" />
            </div>
            <div className="text-sm text-[#111827]/70 dark:text-white/70 mt-1">Satisfaction Rate</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-blue-200/50 dark:border-blue-500/30 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              <AnimatedCounter end={50} suffix="+" />
            </div>
            <div className="text-sm text-[#111827]/70 dark:text-white/70 mt-1">Countries</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-green-200/50 dark:border-green-500/30 shadow-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              <AnimatedCounter end={47} suffix="%" />
            </div>
            <div className="text-sm text-[#111827]/70 dark:text-white/70 mt-1">Avg. CTR Boost</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const bullets = [
    { text: "One upload, every podcast platform", icon: PublicIcon, detail: "Apple, Spotify, Amazon, iHeart, Deezer, TuneIn, Podchaser — all from one RSS feed" },
    { text: "AI clips in minutes, not hours", icon: AutoGraphIcon, detail: "Whisper transcription + AI moment detection generates social-ready clips automatically" },
    { text: "Burned-in captions on every clip", icon: RecordVoiceOverIcon, detail: "Styled captions increase watch time by 40% on silent-scroll feeds" },
    { text: "Zero setup friction", icon: RocketLaunchIcon, detail: "Create your podcast and connect all platforms in under 3 minutes" },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 relative overflow-hidden" data-aos="fade-in">
      {/* Animated background circles with gradient shift */}
      <div className="absolute top-0 left-[20%] w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-[20%] w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container py-20 my-16 md:my-48 relative z-10">
        <h2 className="text-3xl sm:text-5xl font-bold text-[#111827] dark:text-white text-center max-w-3xl mx-auto mb-4">
          Because great podcasts deserve{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">automatic reach</span>.
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto mt-12">
          {bullets.map(({ text, icon: Icon, detail }, i) => (
            <div
              key={text}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200/50 dark:border-purple-500/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay={i * 100}
              style={{
                perspective: '1000px',
                transform: hoveredIndex === i ? 'rotateX(2deg) rotateY(-2deg)' : 'rotateX(0) rotateY(0)',
              }}
            >
              {/* Animated gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />

              {/* Background glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-purple-400/20 group-hover:via-pink-400/20 group-hover:to-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex-shrink-0">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  <Icon className="text-2xl" />
                </div>
              </div>

              <div className="relative z-10 flex-1">
                <span className="text-lg font-semibold text-[#111827] dark:text-white/90 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300 block">
                  {text}
                </span>

                {/* Expandable detail section */}
                <div className={`overflow-hidden transition-all duration-300 ${hoveredIndex === i ? 'max-h-20 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-[#111827]/70 dark:text-white/70 leading-relaxed">
                    {detail}
                  </p>
                </div>
              </div>

              {/* Hover indicator line */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${hoveredIndex === i ? 'w-full' : 'w-0'}`} />
            </div>
          ))}
        </div>

        {/* Trust line below bullets */}
        <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="500">
          <p className="text-sm md:text-base text-black/80 dark:text-white/80">
            <span className="font-semibold text-black dark:text-white">15,000+</span> creators trust Flowpload for global distribution
          </p>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    { Icon: MicIcon, title: "Podcasters", desc: "RSS distribution + AI clips + captions on autopilot", color: "from-purple-500 to-pink-500", bg: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20", border: "border-purple-200/50 dark:border-purple-500/30" },
    { Icon: MovieFilterIcon, title: "Video Creators", desc: "Turn long videos into short-form social clips", color: "from-red-500 to-orange-500", bg: "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20", border: "border-red-200/50 dark:border-red-500/30" },
    { Icon: WorkspacesIcon, title: "Agencies", desc: "Multi-client podcast management & analytics", color: "from-green-500 to-emerald-500", bg: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20", border: "border-green-200/50 dark:border-green-500/30" },
    { Icon: RocketLaunchIcon, title: "Indie Creators", desc: "Launch your podcast and grow your audience fast", color: "from-orange-500 to-yellow-500", bg: "from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20", border: "border-orange-200/50 dark:border-orange-500/30" },
  ];
  return (
    <section className="bg-[#F9FAFB] dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236C63FF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container py-20 my-16 md:my-48 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#111827] dark:text-white mb-4">
            Who It&apos;s <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">For</span>
          </h2>
          <p className="text-lg text-[#111827]/70 dark:text-white/70">Built for podcasters, creators, and agencies of all sizes</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {cases.map(({ Icon, title, desc, color, bg, border }, i) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-3xl border-2 ${border} bg-gradient-to-br ${bg} p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
              data-aos="zoom-in"
              data-aos-delay={i * 80}
            >
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${color} rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`} />
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-2xl text-white shadow-lg mb-4 bg-gradient-to-br ${color} group-hover:scale-110 transition-transform`}>
                  <Icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-[#111827]/70 dark:text-white/70">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      features: ["2 video uploads", "1 podcast upload", "2 platforms accessible", "Auto-Reupload", "And More..."],
      popular: false,
      gradient: "from-gray-500 to-gray-700",
      icon: "🚀",
    },
    {
      name: "Pro",
      price: "$19",
      period: "/mo",
      features: ["20 video uploads", "10 podcast upload", "Up to 5 platforms", "Auto-Reupload", "And More..."],
      popular: false,
      gradient: "from-blue-500 to-cyan-500",
      icon: "⚡",
    },
    {
      name: "Pro+",
      price: "$49",
      period: "/mo",
      features: ["Unlimited video uploads", "Unlimited podcast upload", "All 10 integrated platforms", "Auto-Reupload", "And More..."],
      popular: true,
      gradient: "from-purple-500 to-pink-500",
      icon: "👑",
    },
  ];

  return (
    <section id="pricing" className="bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container py-20 my-16 md:my-48 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#111827] dark:text-white mb-4">
            Simple, <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-[#111827]/70 dark:text-white/70">Choose the plan that&apos;s right for you</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {tiers.map((t, index) => (
            <div
              key={t.name}
              className={`group relative rounded-3xl border-2 ${t.popular ? 'border-purple-500 dark:border-purple-400' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${t.popular ? 'scale-105 lg:scale-110' : 'hover:scale-105'}`}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              {t.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white shadow-xl bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
                  <EmojiEventsIcon className="text-sm" />
                  Most Popular
                </div>
              )}

              {/* Icon Badge */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-4 bg-gradient-to-br ${t.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {t.icon}
              </div>

              <h3 className="text-2xl font-bold text-[#111827] dark:text-white mb-2">{t.name}</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-extrabold text-[#111827] dark:text-white">{t.price}</span>
                <span className="text-lg text-[#111827]/60 dark:text-white/60 pb-2">{t.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-base text-[#111827] dark:text-white/90">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br ${t.gradient}`}>
                      <CheckCircleIcon className="text-white text-sm" />
                    </div>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`group/btn inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 ${t.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/50' : `bg-gradient-to-r ${t.gradient}`}`}
              >
                <span>Get Started</span>
                <RocketLaunchIcon className="text-sm group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <p className="text-sm text-[#111827]/70 dark:text-white/70 mb-4">Trusted by creators worldwide</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-[#111827] dark:text-white">
              <ShieldIcon className="text-green-500" />
              <span className="text-sm font-medium">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-[#111827] dark:text-white">
              <CheckCircleIcon className="text-green-500" />
              <span className="text-sm font-medium">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 relative overflow-hidden" data-aos="fade-up">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="container py-24 text-center my-16 md:my-36 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white text-sm font-medium mb-8" data-aos="zoom-in">
            <RocketLaunchIcon className="text-sm" />
            <span>Join 15,000+ Creators Today</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight" data-aos="fade-up" data-aos-delay="100">
            Publish once. <br className="hidden sm:block" />Repurpose everywhere.
          </h2>

          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Upload your episode and Flowpload handles distribution, clips, captions, and promotion — automatically. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8" data-aos="zoom-in" data-aos-delay="300">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold text-purple-600 bg-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/50"
            >
              <span>🌎 Start for Free</span>
              <RocketLaunchIcon className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white bg-white/10 border-2 border-white/30 backdrop-blur hover:bg-white/20 transition-all duration-300"
            >
              <PlayCircleOutlineIcon />
              <span>Watch Demo</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 text-white/80 text-sm" data-aos="fade-up" data-aos-delay="400">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="text-white" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="text-white" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="text-white" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="500">
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">15K+</div>
              <div className="text-sm text-white/80">Active Creators</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-sm text-white/80">Countries Served</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">500K+</div>
              <div className="text-sm text-white/80">Videos Uploaded</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Item 1: Redirect authenticated users to dashboard
  useEffect(() => {
    const token = getToken();
    if (token) {
      router.replace("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  // Show nothing while checking auth status to prevent flash
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] dark:bg-gray-950 text-[#111827] dark:text-white relative">
      <MarketingNav />
      <AnimatedBlobs />
      <Hero />
      <Problem />
      <Testimonials />
      <HowItWorks />
      <PlatformCarousel />
      <Features />
      <LiveActivity />
      <WhyChooseUs />
      <UseCases />
      <Pricing />
      <FinalCTA />
      <MarketingFooter />
      <CookieConsent />
    </div>
  );
}
