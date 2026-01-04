import WrappedEditBlogClient from "./EditBlogClient";

// Prevent static export from attempting to pre-render admin edit dynamic pages.
export async function generateStaticParams() {
  return [];
}

export default function EditBlogPage() {
  return <WrappedEditBlogClient />;
}
