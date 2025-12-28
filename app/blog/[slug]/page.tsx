import BlogDetailClient from "./BlogDetailClient";

// This function runs at build time to generate static paths for all blog posts
export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.vishaltechzone.com";
    
    // Fetch all blogs at build time
    const response = await fetch(`${apiUrl}/api/v1/blogs?limit=1000`, {
      // Disable cache for build time to get fresh data
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.warn("Failed to fetch blogs for static generation, returning empty array");
      return [];
    }
    
    const data = await response.json();
    if (data.success && data.data?.blogs) {
      return data.data.blogs.map((blog: { slug: string }) => ({
        slug: blog.slug,
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error generating static params:", error);
    // Return empty array to allow build to continue
    // Pages will be generated on-demand if needed (though with static export, they won't be)
    return [];
  }
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
