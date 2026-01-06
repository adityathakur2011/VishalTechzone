"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { useRouter } from "next/navigation";
import { Eye, Search } from "lucide-react";
import { apiClient } from "@/lib/api/client";
import { AdminProtection } from "@/components/admin/AdminProtection";
import { MediaInput } from "@/components/ui/MediaInput";
import { MultiSelectTags } from "@/components/ui/MultiSelectTags";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

function CreateBlogPageContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [mediaType, setMediaType] = useState<"IMAGE" | "IMAGE_URL" | "YOUTUBE" | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    categoryId: "",
    seoTitle: "",
    seoDescription: "",
    publishedAt: "",
    publishImmediately: false,
  });

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "link",
    "image",
  ];

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

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

  const fetchTags = async () => {
    try {
      const response = await apiClient("/api/v1/admin/tags");
      const data = await response.json();
      if (data.success) {
        setTags(data.data.tags || []);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Use mediaType and mediaUrl directly
      const finalMediaType = mediaType;
      const finalMediaUrl = mediaUrl;

      const response = await apiClient("/api/v1/admin/blogs", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          mediaType: finalMediaType,
          mediaUrl: finalMediaUrl,
          tagIds: selectedTagIds,
          publishedAt: formData.publishedAt || undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        router.push("/admin/blogs");
      } else {
        alert("Error creating blog: " + (data.error?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Post
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Compose a new article for your subscribers.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Publishing..." : "Publish Article"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Article Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Bitcoin's Next Move: What the Charts Say"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Rich Text Editor */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Content
            </label>
            <style>{`
              .ql-container {
                font-size: 1rem;
              }
              .ql-editor {
                min-height: 400px;
                padding: 1.5rem;
                line-height: 1.8;
              }
              .ql-editor h1 {
                font-size: 2.5rem;
                font-weight: 800;
                line-height: 1.2;
                margin-top: 2.5rem;
                margin-bottom: 1.5rem;
              }
              .ql-editor h2 {
                font-size: 2rem;
                font-weight: 700;
                line-height: 1.3;
                margin-top: 2rem;
                margin-bottom: 1.25rem;
                padding-top: 0.5rem;
                border-top: 1px solid #e5e7eb;
              }
              .ql-editor h3 {
                font-size: 1.625rem;
                font-weight: 600;
                line-height: 1.4;
                margin-top: 1.75rem;
                margin-bottom: 1rem;
              }
              .ql-editor h4 {
                font-size: 1.25rem;
                font-weight: 600;
                margin-top: 1.5rem;
                margin-bottom: 0.875rem;
              }
              .ql-editor p {
                margin-bottom: 1.5rem;
                line-height: 1.8;
                font-size: 1.0625rem;
              }
              .ql-editor ul, .ql-editor ol {
                margin-left: 2rem;
                margin-bottom: 1.5rem;
              }
              .ql-editor li {
                margin-bottom: 0.75rem;
                line-height: 1.8;
              }
              .ql-editor blockquote {
                border-left: 5px solid #f97316;
                padding: 1rem 0 1rem 1.5rem;
                margin: 1.5rem 0;
                background-color: #fef3c7;
                font-style: italic;
                font-size: 1.0625rem;
              }
              .ql-editor code {
                background-color: #f3f4f6;
                color: #dc2626;
                padding: 0.25rem 0.5rem;
                border-radius: 0.375rem;
                font-family: 'Courier New', monospace;
              }
              .ql-editor pre {
                background-color: #1f2937;
                color: #e5e7eb;
                padding: 1.5rem;
                border-radius: 0.5rem;
                font-family: 'Courier New', monospace;
                margin-bottom: 1.5rem;
              }
              .ql-editor pre code {
                background-color: transparent;
                color: #e5e7eb;
                padding: 0;
              }
              .dark .ql-editor {
                background-color: #1f2937;
                color: #e5e7eb;
              }
              .dark .ql-editor h1, .dark .ql-editor h2, .dark .ql-editor h3, .dark .ql-editor h4 {
                color: #f3f4f6;
              }
              .dark .ql-editor h2 {
                border-top-color: #374151;
              }
              .dark .ql-editor blockquote {
                background-color: #78350f;
                color: #fcd34d;
              }
              .dark .ql-editor code {
                background-color: #1f2937;
                color: #fca5a5;
              }
              .ql-toolbar {
                border-top: none;
                border-left: none;
                border-right: none;
                background-color: #f9fafb;
              }
              .dark .ql-toolbar {
                background-color: #111827;
                border-color: #374151;
              }
              .dark .ql-toolbar.ql-snow {
                border-color: #374151;
              }
            `}</style>
            {/* React Quill WYSIWYG editor */}
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(value: string) => setFormData({ ...formData, content: value })}
              modules={quillModules}
              formats={quillFormats}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Preview matches your published blog styling.
            </p>
          </div>

          {/* SEO Settings */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                SEO Settings
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="SEO optimized title"
                  maxLength={60}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formData.seoTitle.length}/60
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="Brief summary for search engines"
                  maxLength={160}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formData.seoDescription.length}/160
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Publishing
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Status
                </label>
                <div className="px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg text-sm font-medium">
                  Draft
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Visibility
                </label>
                <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
                  Public
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Publish Immediately
                </label>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, publishImmediately: !formData.publishImmediately })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.publishImmediately ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.publishImmediately ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              {!formData.publishImmediately && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Schedule Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Organization */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Organization
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Category
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Tags
                </label>
                <MultiSelectTags
                  tags={tags}
                  selectedTagIds={selectedTagIds}
                  onChange={setSelectedTagIds}
                  placeholder="Select tags..."
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Media
            </h3>
            <MediaInput
              mediaType={mediaType}
              mediaUrl={mediaUrl}
              onChange={(type, url) => {
                setMediaType(type);
                setMediaUrl(url);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CreateBlogPage() {
  return (
    <AdminProtection>
      <CreateBlogPageContent />
    </AdminProtection>
  );
}

