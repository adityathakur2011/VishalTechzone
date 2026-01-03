// Required for static export with dynamic routes
// Provide slugs for static export. This fetch tries to request only slugs
// and uses a no-store fetch so Next won't attempt to cache large payloads
// during build time.
export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  try {
    // Ask the API to return only slugs if supported (fields=slug). If your API
    // doesn't support `fields`, it should still work but return a larger payload.
    const res = await fetch(`${apiUrl}/api/v1/blogs?limit=1000&fields=slug`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    const blogs = data?.data?.blogs || data?.data || [];
    if (!Array.isArray(blogs)) return [];
    return blogs.map((b: any) => ({ slug: String(b.slug) }));
  } catch (err) {
    // If slug fetching fails during build, return an empty array so the
    // static export can continue. You can improve this by providing a
    // lightweight endpoint that returns only slugs.
    console.error('generateStaticParams error:', err);
    return [];
  }
}
import BlogDetailClient from "./BlogDetailClient";
import type { Metadata } from "next";

// Make this dynamic to avoid static generation issues
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/api/v1/blogs/${params.slug}`);
    if (!res.ok) return {};
    const data = await res.json();
    if (!data.success || !data.data || !data.data.blog) return {};
    const blog = data.data.blog;
    const title = blog.title;
    const description = blog.excerpt || blog.title;
    const url = `https://vishaltechzone.com/blog/${blog.slug}`;
    const image = blog.mediaUrl && blog.mediaType === "YOUTUBE"
      ? `https://img.youtube.com/vi/${(function(){ try { const m = blog.mediaUrl.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,});?/); return m ? m[1] : null; } catch(e){return null;} })()}/maxresdefault.jpg`
      : blog.mediaUrl || "/asset/img/home_profile.webp";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: "VishalTechZone",
        images: image ? [{ url: image, alt: title }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : [],
      },
      alternates: {
        canonical: url,
      },
      authors: blog.author ? [{ name: blog.author }] : [{ name: "Vishal Tech" }],
    } as Metadata;
  } catch (err) {
    console.error("generateMetadata error:", err);
    return {};
  }
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
