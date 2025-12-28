// This function MUST be exported for static export to work with dynamic routes
// It runs at build time to generate static paths for all blog posts
export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.vishaltechzone.com";
    const response = await fetch(`${apiUrl}/api/v1/blogs?limit=1000`, { cache: 'no-store' });
    
    if (response.ok) {
      const data = await response.json();
      if (data?.success && Array.isArray(data.data?.blogs)) {
        return data.data.blogs.map((blog: { slug: string }) => ({ slug: blog.slug }));
      }
    }
  } catch {
    // API not available - return empty array to allow build to succeed
  }
  
  return [];
}

import BlogDetailClient from "./BlogDetailClient";

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
