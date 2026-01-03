"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SubscribeButton } from "@/components/auth/SubscribeButton";
import { ArrowLeft, Share2, Bookmark, Rocket } from "lucide-react";
import { getYouTubeEmbedUrl, extractYouTubeId } from "@/lib/mediaUtils";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  mediaType: "IMAGE" | "IMAGE_URL" | "YOUTUBE" | null;
  mediaUrl: string | null;
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

interface RelatedBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  mediaType: "IMAGE" | "IMAGE_URL" | "YOUTUBE" | null;
  mediaUrl: string | null;
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
  views: number;
}

export default function BlogDetailClient() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [showRelatedSection, setShowRelatedSection] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchBlog(params.slug as string);
      fetchRelatedBlogs(params.slug as string);
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

  const fetchRelatedBlogs = async (slug: string) => {
    try {
      setRelatedLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/v1/blogs/${slug}/related?limit=3`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.blogs && data.data.blogs.length > 0) {
          setRelatedBlogs(data.data.blogs);
          setShowRelatedSection(true);
        } else {
          setShowRelatedSection(false);
        }
      } else {
        setShowRelatedSection(false);
      }
    } catch (error) {
      console.error("Error fetching related blogs:", error);
      setShowRelatedSection(false);
    } finally {
      setRelatedLoading(false);
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

          {/* Media - YouTube Video or Image */}
          {blog.mediaType === "YOUTUBE" && blog.mediaUrl && (
            <div className="aspect-video mb-8 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <iframe
                src={getYouTubeEmbedUrl(blog.mediaUrl)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={blog.title}
              />
            </div>
          )}
          {(blog.mediaType === "IMAGE" || blog.mediaType === "IMAGE_URL") && blog.mediaUrl && (
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              {blog.mediaUrl.startsWith("data:image/") ? (
                // Use regular img tag for base64 data URLs
                <img
                  src={blog.mediaUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                // Use Next.js Image for regular URLs
                <Image
                  src={blog.mediaUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Inline CTA */}
          {/* <div className="my-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
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
          </div> */}

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

          {/* Related Posts Section - Only show if API succeeds */}
          {showRelatedSection && !relatedLoading && relatedBlogs.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-800 pt-12 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {blog.mediaType === "YOUTUBE" 
                  ? "More Videos You Might Like" 
                  : "Related Posts"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    href={`/blog/${relatedBlog.slug}`}
                    className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all hover:border-orange-500 dark:hover:border-orange-500"
                  >
                    {/* Media */}
                    {relatedBlog.mediaType === "YOUTUBE" && relatedBlog.mediaUrl ? (
                      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                        {(() => {
                          const videoId = extractYouTubeId(relatedBlog.mediaUrl);
                          return videoId ? (
                            <div className="relative">
                              <img
                                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                alt={relatedBlog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                }}
                              />
                              {/* YouTube Play Icon Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                              </div>
                              {/* YouTube Badge */}
                              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                YT
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              YouTube Video
                            </div>
                          );
                        })()}
                      </div>
                    ) : (relatedBlog.mediaType === "IMAGE" || relatedBlog.mediaType === "IMAGE_URL") && relatedBlog.mediaUrl ? (
                      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        {relatedBlog.mediaUrl.startsWith("data:image/") ? (
                          <img
                            src={relatedBlog.mediaUrl}
                            alt={relatedBlog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <Image
                            src={relatedBlog.mediaUrl}
                            alt={relatedBlog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        )}
                      </div>
                    ) : null}
                    
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {relatedBlog.category && (
                          <span className="inline-block px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-medium">
                            {relatedBlog.category.name}
                          </span>
                        )}
                        {relatedBlog.mediaType === "YOUTUBE" && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            Video
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      {relatedBlog.excerpt && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {relatedBlog.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        {relatedBlog.publishedAt && (
                          <span>
                            {new Date(relatedBlog.publishedAt).toLocaleDateString()}
                          </span>
                        )}
                        {relatedBlog.views > 0 && (
                          <span>• {relatedBlog.views.toLocaleString()} views</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Premium CTA */}
          {/* <div className="bg-gray-900 dark:bg-black rounded-lg p-8 md:p-12 text-center mb-12">
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
          </div> */}

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

