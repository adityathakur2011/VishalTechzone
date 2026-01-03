import EditBlogClient from "./EditBlogClient";

// For static export (output: 'export') Next requires generateStaticParams for dynamic routes.
export async function generateStaticParams() {
  // We don't want to pre-render any admin edit pages during static export.
  // Returning an empty array prevents Next from attempting to export dynamic routes here.
  return [];
}

export default function EditBlogPage() {
  return <EditBlogClient />;
}

