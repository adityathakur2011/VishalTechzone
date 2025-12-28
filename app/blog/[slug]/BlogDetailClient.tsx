"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SubscribeButton } from "@/components/auth/SubscribeButton";
import { ArrowLeft, Share2, Bookmark, Rocket } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  tags: Array<{
    tag: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
  publishedAt: string | null;
  readTimeMinutes: number | null;
  views: number;
}

export default function BlogDetailClient() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetchBlog(params.slug as string);
    }
  }, [params.slug]);

  const fetchBlog = async (slug: string) => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/v1/blogs/${slug}`);
      const data = await response.json();
      if (data.success) {
        setBlog(data.data.blog);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Blog Not Found
            </h1>
            <Link
              href="/blog"
              className="text-orange-600 hover:text-orange-700 dark:text-orange-400"
            >
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Category and Read Time */}
          <div className="flex items-center gap-4 mb-4">
            {blog.category && (
              <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-sm font-medium">
                {blog.category.name}
              </span>
            )}
            {blog.readTimeMinutes && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {blog.readTimeMinutes} min read
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {blog.title}
          </h1>

          {/* Author and Date */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                V
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Vishal Tech
                </p>
                {blog.publishedAt && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Published on {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Inline CTA */}
          <div className="my-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Get Daily Alpha Signals
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Join 15,000+ subscribers for a morning brief on entry/exit points
              and hidden gems.
            </p>
            <SubscribeButton />
          </div>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {blog.tags.map((blogTag) => (
                <span
                  key={blogTag.tag.id}
                  className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm"
                >
                  #{blogTag.tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Premium CTA */}
          <div className="bg-gray-900 dark:bg-black rounded-lg p-8 md:p-12 text-center mb-12">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium mb-4">
                VISHALTECHZONE PREMIUM
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Master the Markets
              </h2>
              <p className="text-gray-400">
                Weekly deep-dive report delivered every Sunday. Portfolio
                updates, watchlist analysis, and exclusive video content.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-500">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Disclaimer:</strong> Content is for educational purposes
              only. Not financial advice.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

