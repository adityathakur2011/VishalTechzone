"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, FileText, Eye, Send, ArrowRight, Edit, Trash2 } from "lucide-react";
import { apiClient } from "@/lib/api/client";

interface DashboardStats {
  totalSubscribers: number;
  activeBlogs: number;
  draftBlogs: number;
  monthlyViews: number;
  telegramUsers: number;
  subscriberGrowth: number;
  viewsGrowth: number;
}

interface RecentBlog {
  id: string;
  title: string;
  category: { name: string } | null;
  status: string;
  publishedAt: string | null;
  views: number;
}

// Helper function to format numbers with M/B
const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSubscribers: 0,
    activeBlogs: 0,
    draftBlogs: 0,
    monthlyViews: 0,
    telegramUsers: 0,
    subscriberGrowth: 0,
    viewsGrowth: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState<RecentBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDelete = async (blogId: string, blogTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await apiClient(`/api/v1/admin/blogs/${blogId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        // Refresh the blog list
        fetchDashboardData();
      } else {
        alert("Error deleting blog: " + (data.error?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats
      const statsResponse = await apiClient("/api/v1/admin/dashboard/stats");
      const statsData = await statsResponse.json();
      
      if (statsData.success) {
        const statsResult = statsData.data.stats;
        setStats({
          totalSubscribers: statsResult.totalSubscribers,
          activeBlogs: statsResult.activeBlogs,
          draftBlogs: statsResult.draftBlogs || 0,
          monthlyViews: statsResult.monthlyViews,
          telegramUsers: statsResult.telegramUsers || 0,
          subscriberGrowth: statsResult.subscriberGrowth || 0,
          viewsGrowth: statsResult.viewsGrowth || 0,
        });
      }
      
      // Fetch all blogs for dashboard
      const blogsResponse = await apiClient("/api/v1/admin/blogs?limit=100&includeDrafts=true");
      const blogsData = await blogsResponse.json();
      
      if (blogsData.success) {
        setRecentBlogs(
          blogsData.data.blogs.map((blog: any) => ({
            id: blog.id,
            title: blog.title,
            category: blog.category,
            status: blog.status,
            publishedAt: blog.publishedAt,
            views: blog.views || 0,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Overview of your platform performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Subscribers
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatNumber(stats.totalSubscribers)}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {stats.subscriberGrowth > 0 ? `+${stats.subscriberGrowth.toFixed(1)}% this month` : stats.totalSubscribers > 0 ? 'No growth this month' : 'No subscribers yet'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Active Blogs
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.activeBlogs}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {stats.draftBlogs > 0 ? `${stats.draftBlogs} drafts pending` : 'No drafts'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Monthly Views
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatNumber(stats.monthlyViews)}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {stats.viewsGrowth > 0 ? `+${stats.viewsGrowth.toFixed(1)}% vs last mo` : stats.monthlyViews > 0 ? 'No growth vs last month' : 'No views yet'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

      </div>

      {/* All Publications */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            All Publications ({recentBlogs.length})
          </h2>
          <Link
            href="/admin/blogs"
            className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 flex items-center gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
                  </td>
                </tr>
              ) : recentBlogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-600 dark:text-gray-400">
                    No blogs found. Create your first blog!
                  </td>
                </tr>
              ) : (
                recentBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {blog.title}
                    </div>
                    {blog.publishedAt && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {blog.category && (
                      <span className="inline-block px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-medium">
                        {blog.category.name}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        blog.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/blogs/${blog.id}/edit`}
                        className="p-1 text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id, blog.title)}
                        className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
