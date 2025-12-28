import BlogDetailClient from "./BlogDetailClient";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.vishaltechzone.com";
    const response = await fetch(`${apiUrl}/api/v1/blogs?limit=1000`, {
      cache: 'no-store',
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data?.success && Array.isArray(data.data?.blogs) && data.data.blogs.length > 0) {
        return data.data.blogs.map((blog: { slug: string }) => ({
          slug: String(blog.slug),
        }));
      }
    }
  } catch {
    // API unavailable during build
  }
  
  // Return at least one dummy param to ensure Next.js recognizes the function
  // All blog pages will work client-side at runtime
  return [{ slug: '_placeholder' }];
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
