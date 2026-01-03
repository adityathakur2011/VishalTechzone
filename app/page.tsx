"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SubscribeButton } from "@/components/auth/SubscribeButton";
import { AuthRedirectHandler } from "@/components/auth/AuthRedirectHandler";
import { ArrowRight, TrendingUp, Shield, Rocket, Eye, GraduationCap, Trophy, Users, BookOpen, Star, Lightbulb, DollarSign, ShieldCheck } from "lucide-react";
import AchievementsGrid from "@/components/AchievementsGrid";
import { extractYouTubeId } from "@/lib/mediaUtils";

interface YouTubePost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  mediaUrl: string | null;
  publishedAt: string | null;
  views: number;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

function HomeContent() {
  const [latestVideos, setLatestVideos] = useState<YouTubePost[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [showVideosSection, setShowVideosSection] = useState(false);

  useEffect(() => {
    fetchLatestYouTubePosts();
  }, []);

  const fetchLatestYouTubePosts = async () => {
    try {
      setVideosLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/v1/blogs/youtube/latest?limit=3`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.blogs && data.data.blogs.length > 0) {
          setLatestVideos(data.data.blogs);
          setShowVideosSection(true);
        } else {
          setShowVideosSection(false);
        }
      } else {
        setShowVideosSection(false);
      }
    } catch (error) {
      console.error("Error fetching latest YouTube posts:", error);
      setShowVideosSection(false);
    } finally {
      setVideosLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Suspense fallback={null}>
        <AuthRedirectHandler />
      </Suspense>
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-sm font-medium">
                  #Top Crypto KOL in Asia
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                  Building Wealth in the{" "}
                  <span className="text-orange-600 dark:text-orange-400">
                    Digital Economy
                  </span>
                </h1>
                
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Join 250,000+ ambitious learners mastering crypto, stocks, and
                  future tech with trusted analysis.
                </p>

                {/* Metrics Cards */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      250K+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Subscribers
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      20M+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Views
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      4.8/5
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Community Rating
                    </div>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="pt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex flex-wrap justify-start gap-5">
                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@Vishalsahu21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition"
                    aria-label="YouTube"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href="https://x.com/VishalSahu21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
                    aria-label="X / Twitter"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/Vishalshahu21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/vishalsahu21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 
                        1.366.062 2.633.35 3.608 1.325.975.975 
                        1.263 2.242 1.325 3.608.058 1.266.07 
                        1.646.07 4.85s-.012 3.584-.07 4.85c-.062 
                        1.366-.35 2.633-1.325 3.608-.975.975-2.242 
                        1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608.975-.975 2.242-1.263 3.608-1.325C8.416 2.175 8.796 2.163 12 2.163zM12 6.838a5.162 5.162 0 1 0 0 10.324 
                        5.162 5.162 0 0 0 0-10.324zm0 8.486a3.324 
                        3.324 0 1 1 0-6.648 3.324 3.324 0 0 1 0 
                        6.648zm6.406-8.845a1.44 1.44 0 1 0 0 
                        2.88 1.44 1.44 0 0 0 0-2.88z"/>
                    </svg>
                  </a>

                  {/* Telegram */}
                  <a
                    href="https://t.me/vishaltechzone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-400 transition"
                    aria-label="Telegram"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                      <path d="M9.993 15.674l-.398 5.59c.57 0 .82-.244 1.118-.537l2.68-2.545 5.56 4.067c1.02.563 1.747.266 2.002-.944L24 3.684c.334-1.484-.54-2.065-1.53-1.703L1.16 10.318c-1.455.566-1.434 1.378-.264 1.74l5.486 1.71L19.11 6.02c.6-.39 1.148-.174.697.217z" />
                    </svg>
                  </a>

                  {/* CoinMarketCap */}
                  <a
                    href="https://coinmarketcap.com/community/profile/vishalsahu21/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition"
                    aria-label="CoinMarketCap"
                  >
                    <svg viewBox="0 0 500.98 508.49" className="h-6 w-6 fill-current">
                      <path
                        fillRule="evenodd"
                        d="M435.62,303.86c-8.87,5.6-19.31,6.3-27.25,1.82-10.08-5.69-15.63-19-15.63-37.57V212.64c0-26.79-10.59-45.85-28.3-51-30-8.74-52.58,28-61.07,41.77l-52.93,85.82V184.34c-.6-24.14-8.43-38.58-23.32-42.93-9.84-2.88-24.58-1.72-38.89,20.18L69.64,352a209.19,209.19,0,0,1-24.11-97.76c0-114.71,91.92-208,204.91-208s204.9,93.32,204.9,208c0,.2.05.37.06.55s0,.38,0,.58c1.07,22.21-6.12,39.88-19.75,48.49Zm65.25-49.6v-.57l0-.57C500.22,113.41,388.14,0,250.43,0,112.35,0,0,114.05,0,254.25S112.35,508.49,250.44,508.49a247.57,247.57,0,0,0,170.26-67.8A23.35,23.35,0,0,0,421.91,408a22.54,22.54,0,0,0-31.83-1.55l-.34.31a202.51,202.51,0,0,1-139.3,55.48c-60.5,0-114.93-26.78-152.47-69.24L204.91,221.31v79.16c0,38,14.75,50.32,27.11,53.91s31.29,1.14,51.15-31.1L342,227.92c1.89-3.08,3.62-5.73,5.21-8v48.22c0,35.55,14.24,64,39.06,78,22.37,12.62,50.5,11.48,73.42-3C487.46,325.56,502.43,293.23,500.87,254.26Z"
                      />
                    </svg>
                  </a>

                  {/* Binance */}
                  <a
                    href="https://www.binance.com/en-IN/square/profile/VishalTechzone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 transition"
                    aria-label="Binance"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                      <path d="M12 2.04L8.3 5.75l3.7 3.7 3.7-3.7L12 2.04zM5.75 8.3L2.04 12l3.71 3.7 3.7-3.7-3.7-3.7zm12.5 0l-3.7 3.7 3.7 3.7 3.71-3.7-3.71-3.7zM12 14.55l-3.7 3.7L12 21.96l3.7-3.71-3.7-3.7z" />
                    </svg>
                  </a>
                </div>
              </div>



              </div>

              {/* Right Image */}
              <div className="relative flex justify-center lg:justify-end w-full">
                {/* Soft Background Glow */}
                <div className="absolute -inset-10 bg-gradient-to-br from-orange-500/20 via-blue-500/20 to-cyan-400/20 blur-3xl rounded-full" />

                {/* Main Card */}
                <div className="relative w-[300px] h-[360px] sm:w-[360px] sm:h-[440px] lg:w-[460px] lg:h-[560px] rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center">
                  
                  {/* Circular Portrait */}
                  <div className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden">
                    <img
                      src="/asset/img/home_profile.webp"
                      alt="Vishal Kumar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Founder Badge */}
                  <div className="absolute bottom-8 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl text-center">
                    <p className="text-xs text-gray-500 tracking-wide">
                      FOUNDER & YOUTUBER
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      Vishal
                    </p>
                  </div>
                </div>
              </div>



            </div>
          </div>
        </section>

        {/* Achievements Section (animated component) */}
        <AchievementsGrid />

        {/* Mission / Content Focus Section */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-sm font-medium">
                CONTENT FOCUS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Empowering You in the Crypto Space
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Vishal Techzone delivers clear, actionable insights for crypto enthusiasts and investors. Learn market analysis, altcoins, investment strategies, and emerging trends with real-world examples and expert guidance.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              
              {/* Crypto Market Analysis */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <TrendingUp className="h-10 w-10 text-red-500 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                  Crypto Market Analysis
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                  In-depth analysis of price trends, market capitalization, emerging sectors, and key drivers of the crypto market.
                </p>
              </div>

              {/* Cryptocurrency Fundamentals */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <BookOpen className="h-10 w-10 text-yellow-500 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                  Cryptocurrency Fundamentals
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                  Learn the basics of crypto, blockchain, DeFi, and safe storage, trading, and management of cryptocurrencies.
                </p>
              </div>

              {/* Altcoin Spotlights */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <Star className="h-10 w-10 text-purple-500 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                  Altcoin Spotlights
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                  Discover high-potential altcoins, analyze their tech, team, and roadmap, and get insights on investment potential and risks.
                </p>
              </div>

              {/* Crypto Investment Strategies */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <DollarSign className="h-10 w-10 text-green-500 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                  Crypto Investment Strategies
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                  Learn portfolio diversification, dollar-cost averaging, long-term hodling, and risk management strategies for crypto investing.
                </p>
              </div>

              {/* Industry Trends & Innovations */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <Lightbulb className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                  Industry Trends & Innovations
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                  Explore NFTs, DeFi, L2 solutions, regulatory impacts, institutional adoption, and hear expert insights on crypto's future.
                </p>
              </div>

              {/* Crypto Security & Best Practices */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <ShieldCheck className="h-10 w-10 text-teal-500 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                  Crypto Security & Best Practices
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                  Learn how to secure your crypto assets, avoid scams, set up wallets safely, and follow best practices for trading and storing digital currencies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        {/* <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Smart Investors Choose Us
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  We don't just give signals. We teach you the system.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <TrendingUp className="h-10 w-10 text-orange-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Data Over Hype
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    On-chain metrics, order book depth, and macro-economic
                    indicators. No 'trust me bro' analysis.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <Shield className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Unbiased & Secure
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We never accept payments for project reviews. Our reputation
                    is our most valuable asset.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <Rocket className="h-10 w-10 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Early Alpha
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Identifying narratives before they hit the mainstream media.
                    Positioning you before the pump.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Analysis Section - Only show if API succeeds */}
        {showVideosSection && !videosLoading && latestVideos.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Latest <span className="text-orange-600 dark:text-orange-400">Videos</span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Stay ahead of the market with my recent video analysis.
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="hidden md:flex items-center gap-2 text-orange-600 hover:text-orange-700 dark:text-orange-400 font-medium"
                >
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              
              {/* Featured Video (Latest) */}
              {latestVideos[0] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <Link
                    href={`/blog/${latestVideos[0].slug}`}
                    className="group relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 aspect-video bg-gray-100 dark:bg-gray-800 hover:shadow-xl transition-all"
                  >
                    {(() => {
                      const videoId = latestVideos[0].mediaUrl ? extractYouTubeId(latestVideos[0].mediaUrl) : null;
                      return videoId ? (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt={latestVideos[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-red-500 flex items-center justify-center">
                              <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Video Preview</p>
                          </div>
                        </div>
                      );
                    })()}
                    <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
                      YOUTUBE
                    </div>
                  </Link>
                  <div className="space-y-4 flex flex-col justify-center">
                    {latestVideos[0].category && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 text-sm font-medium w-fit">
                        {latestVideos[0].category.name}
                      </div>
                    )}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {latestVideos[0].title}
                    </h3>
                    {latestVideos[0].excerpt && (
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {latestVideos[0].excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      {latestVideos[0].publishedAt && (
                        <span>
                          {new Date(latestVideos[0].publishedAt).toLocaleDateString()}
                        </span>
                      )}
                      {/* {latestVideos[0].views > 0 && (
                        <span>• {latestVideos[0].views.toLocaleString()} views</span>
                      )} */}
                    </div>
                    <Link
                      href={`/blog/${latestVideos[0].slug}`}
                      className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 dark:text-orange-400 font-medium mt-4"
                    >
                      Watch Video <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}

              {/* More Videos Grid */}
              {/* {latestVideos.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestVideos.slice(1).map((video) => {
                    const videoId = video.mediaUrl ? extractYouTubeId(video.mediaUrl) : null;
                    return (
                      <Link
                        key={video.id}
                        href={`/blog/${video.slug}`}
                        className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all hover:border-orange-500 dark:hover:border-orange-500"
                      >
                        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                          {videoId ? (
                            <>
                              <img
                                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                                  <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                YT
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              YouTube Video
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          {video.category && (
                            <span className="inline-block px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-medium mb-2">
                              {video.category.name}
                            </span>
                          )}
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                            {video.title}
                          </h4>
                          {video.excerpt && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {video.excerpt}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            {video.publishedAt && (
                              <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                            )}
                            {video.views > 0 && (
                              <span>• {video.views.toLocaleString()} views</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )} */}
            </div>
          </section>
        )}

        {/* Newsletter CTA Section */}
        <section className="bg-gray-900 dark:bg-black py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Stop Guessing. <span className="text-orange-500">Start Knowing.</span>
              </h2>
              <p className="text-lg text-gray-400">
                Join the inner circle. Get the exact trade setups, macro updates,
                and gem alerts that I use personally.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                  Get Access <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Free Weekly Newsletter. No Spam. Unsubscribe Anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}
