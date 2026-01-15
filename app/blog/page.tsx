"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Search, Filter } from "lucide-react";
import Image from "next/image";
import { extractYouTubeId } from "@/lib/mediaUtils";

interface Blog {
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
  readTimeMinutes: number | null;
  views: number;
}

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [observedElement, setObservedElement] = useState<HTMLDivElement | null>(null);
  const [loadingBlogId, setLoadingBlogId] = useState<string | null>(null);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    fetchCategories();
    // Try to load preloaded blogs from session storage
    const preloaded = sessionStorage.getItem('preloadedBlogs');
    let isCacheValid = false;

    if (preloaded) {
      try {
        const data = JSON.parse(preloaded);
        // Check if cache is still valid (not expired)
        const now = Date.now();
        const cacheAge = now - data.cachedAt;
        const cacheExpiry = data.cacheExpiry || 5 * 60 * 1000; // Default 5 minutes
        
        if (cacheAge < cacheExpiry && data.blogs && data.blogs.length > 0) {
          setBlogs(data.blogs || []);
          setTotalPages(data.pagination?.totalPages || 1);
          setLoading(false);
          isCacheValid = true;
          console.log(`Using cached blogs (${Math.round(cacheAge / 1000)}s old)`);
        }
      } catch (error) {
        console.error("Error parsing preloaded blogs:", error);
      }
    }

    // If cache doesn't exist or is expired, fetch fresh data
    if (!isCacheValid) {
      console.log('Cache expired or not found, fetching fresh data');
      fetchBlogs(1, true);
    }
  }, []);

  useEffect(() => {
    // Only reset and refetch if search or category actually changed
    if (search || selectedCategory) {
      setPage(1);
      setBlogs([]);
      setTotalPages(1);
      fetchBlogs(1, true);
    }
  }, [search, selectedCategory]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!observedElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages && !isLoadingMore && !loading) {
          fetchBlogs(page + 1, false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observedElement);
    return () => observer.disconnect();
  }, [observedElement, page, totalPages, isLoadingMore, loading]);

  const fetchCategories = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/v1/categories`);
      const data = await response.json();
      if (data.success) {
        setCategories(data.data.categories || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBlogs = async (pageNum: number, isFirstPage: boolean) => {
    try {
      if (isFirstPage) {
        setLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const params = new URLSearchParams();
      params.append("page", pageNum.toString());
      params.append("limit", "10");
      if (search) params.append("search", search);
      if (selectedCategory) params.append("categoryId", selectedCategory);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(
        `${apiUrl}/api/v1/blogs?${params.toString()}`
      );
      const data = await response.json();
      if (data.success) {
        const newBlogs = data.data.blogs || [];
        setTotalPages(data.data.pagination?.totalPages || 1);
        
        if (isFirstPage) {
          setBlogs(newBlogs);
        } else {
          setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
        }
        
        setPage(pageNum);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      if (isFirstPage) {
        setLoading(false);
      } else {
        setIsLoadingMore(false);
      }
    }
  };

  const handleBlogClick = (blogId: string) => {
    setLoadingBlogId(blogId);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, category, or tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Blog List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No blogs found. Check back soon!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) => (
                  <div
                    key={blog.id}
                    ref={index === blogs.length - 1 ? setObservedElement : null}
                  >
                    <Link
                      href={`/blog/${blog.slug}`}
                      onClick={() => handleBlogClick(blog.id)}
                      className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow block h-full relative"
                    >
                      {/* Loading Overlay */}
                      {loadingBlogId === blog.id && (
                        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center rounded-lg z-50 backdrop-blur-sm">
                          <div className="flex flex-col items-center gap-2">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
                            <p className="text-white text-sm font-medium">Loading...</p>
                          </div>
                        </div>
                      )}
                  {/* Show media if available */}
                  {(blog.mediaType === "IMAGE" || blog.mediaType === "IMAGE_URL") &&
 blog.mediaUrl ? (
  <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
    {blog.mediaUrl.startsWith("data:image/") ? (
      <img
        src={blog.mediaUrl}
        alt={blog.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        loading="lazy"
      />
    ) : (
      <Image
        src={blog.mediaUrl}
        alt={blog.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover group-hover:scale-105 transition-transform"
      />
    )}
  </div>

                  ) : blog.mediaType === "YOUTUBE" && blog.mediaUrl ? (
                    <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                      {(() => {
                        const videoId = extractYouTubeId(blog.mediaUrl);
                        return videoId ? (
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            YouTube Video
                          </div>
                        );
                      })()}
                    </div>
                  ) : null}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.category && (
                        <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-medium">
                          {blog.category.name}
                        </span>
                      )}
                      {blog.tags && blog.tags.length > 0 && blog.tags.map((blogTag) => (
                        <span
                          key={blogTag.tag.id}
                          className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium"
                        >
                          #{blogTag.tag.name}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {blog.title}
                    </h2>
                    {blog.excerpt && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {blog.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
                      {blog.publishedAt && (
                        <span>
                          {new Date(blog.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                      {blog.readTimeMinutes && (
                        <span>{blog.readTimeMinutes} min read</span>
                      )}
                      {/* <span>{blog.views.toLocaleString()} views</span> */}
                    </div>
                  </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Loading More Indicator */}
              {isLoadingMore && (
                <div className="text-center py-8">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Loading more blogs...</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
