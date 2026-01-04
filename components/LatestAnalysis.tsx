"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  youtubeUrl?: string;
};

export default function LatestAnalysis() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch("/api/latest-youtube", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) return null;
        const data = await res.json();
        return data;
      })
      .then((data) => {
        if (data && data.youtubeUrl) setPost(data);
      })
      .catch(() => {
        // ignore errors - silently hide the section
      })
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  if (loading) return null; // don't show placeholder while loading
  if (!post) return null; // hide the entire section when there's no data

  const youtubeHref = post.youtubeUrl;
  const articleHref = `/blog/${post.slug}`;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Latest <span className="text-orange-600 dark:text-orange-400">Analysis</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Stay ahead of the market with my recent video.</p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-orange-600 hover:text-orange-700 dark:text-orange-400 font-medium"
          >
            Visit Channel <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 aspect-video bg-gray-100 dark:bg-gray-800">
            {youtubeHref ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={youtubeHref.replace("watch?v=", "embed/")}
                title={post.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">No video available</div>
            )}
            <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">YOUTUBE</div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 text-sm font-medium">
              LATEST ANALYSIS
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
            <div className="flex gap-4">
              {youtubeHref && (
                <a
                  href={youtubeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 dark:text-orange-400 font-medium"
                >
                  Watch on YouTube <ArrowRight className="h-4 w-4" />
                </a>
              )}

              <Link href={articleHref} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium">
                Read the Article <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
