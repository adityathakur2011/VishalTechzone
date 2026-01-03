import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const file = path.join(process.cwd(), "data", "blogPosts.json");
    const raw = fs.readFileSync(file, "utf8");
    const posts = JSON.parse(raw);

    // find the newest post that has a youtubeUrl
    const post = (posts || []).find((p: any) => p.youtubeUrl);
    if (!post) return NextResponse.json(null, { status: 204 });

    return NextResponse.json(post);
  } catch (err) {
    console.error("/api/latest-youtube error", err);
    return NextResponse.json(null, { status: 500 });
  }
}
