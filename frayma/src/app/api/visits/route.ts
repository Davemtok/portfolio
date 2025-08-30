// src/app/api/visits/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";        // 👈 ensure Node runtime (not Edge)
export const dynamic = "force-dynamic"; // 👈 no static optimization
export const revalidate = 0;            // 👈 no caching

const NAMESPACE = "davemtok-portfolio"; // change if you want
const KEY = "total";

export async function GET() {
  try {
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

    // If both endpoints fail or return unexpected shape:
    return NextResponse.json({ value: 1, error: "COUNTAPI_BAD_RESPONSE" }, { status: 200 });
  } catch (err: any) {
    // surface error text to help debug if needed
    return NextResponse.json(
      { value: 1, error: "COUNTAPI_FETCH_FAILED", message: String(err?.message || err) },
      { status: 200 }
    );
  }
}
