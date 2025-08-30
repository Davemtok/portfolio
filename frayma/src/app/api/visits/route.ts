import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // run on every request
export const revalidate = 0;            // don't cache

const NAMESPACE = "davemtok-portfolio"; // change if you like
const KEY = "total";

export async function GET() {
  try {
    // prefer explicit +1; fallback to hit if update fails
    const urls = [
      `https://api.countapi.xyz/update/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(KEY)}?amount=1`,
      `https://api.countapi.xyz/hit/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(KEY)}`
    ];

    for (const url of urls) {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) continue;
      const data = await res.json();
      if (typeof data?.value === "number") {
        return NextResponse.json({ value: data.value });
      }
    }

    // If CountAPI is down, at least return a stable structure
    return NextResponse.json({ value: 1 }, { status: 200 });
  } catch {
    return NextResponse.json({ value: 1 }, { status: 200 });
  }
}
