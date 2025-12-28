import BlogDetailClient from "./BlogDetailClient";

// This function runs at build time to generate static paths for all blog posts
// It MUST return an array, even if empty, for static export to work
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  // If API is not available during build, return empty array
  // The build will succeed, but blog pages won't be pre-generated
  // They will still work via client-side rendering at runtime
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.vishaltechzone.com";
  
  // Wrap in Promise to ensure we always return an array
  return new Promise<Array<{ slug: string }>>((resolve) => {
    // Use a timeout to prevent hanging
    const timeout = setTimeout(() => {
      console.warn("API fetch timeout during build. Returning empty params.");
      resolve([]);
    }, 8000); // 8 second timeout
    
    fetch(`${apiUrl}/api/v1/blogs?limit=1000`, {
      cache: 'no-store',
    })
      .then((response) => {
        clearTimeout(timeout);
        if (!response.ok) {
          resolve([]);
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data?.success && data?.data?.blogs && Array.isArray(data.data.blogs)) {
          const params = data.data.blogs.map((blog: { slug: string }) => ({
            slug: blog.slug,
          }));
          resolve(params);
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        clearTimeout(timeout);
        // Silently fail - API might not be accessible during build
        // This is acceptable for static export
        const errorMsg = error?.message || String(error);
        if (errorMsg.includes('ENOTFOUND') || errorMsg.includes('fetch failed')) {
          // Expected when API is not available during build
          resolve([]);
        } else {
          // Other errors - still return empty array to allow build to continue
          resolve([]);
        }
      });
  });
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
