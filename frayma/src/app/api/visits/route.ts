// src/app/api/visits/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";        // ensure Node (not Edge)
export const dynamic = "force-dynamic"; // never pre-render
export const revalidate = 0;            // no ISR caching

// Keep these CONSTANT across all deployments/environments
const NAMESPACE = "davemtok-portfolio"; // <- change if you want, but keep it stable
const KEY = "total";

async function tryCountApi(url: string) {
  // Add a timeout so we don't hang silently
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 4500);
  try {
    const res = await fetch(url, {
      cache: "no-store",
      redirect: "follow",
      headers: { "User-Agent": "davemtok-portfolio/1.0" },
      signal: ctrl.signal,
    });
    const text = await res.text();
    let json: any = null;
    try { json = JSON.parse(text); } catch {}
    return { ok: res.ok, status: res.status, json, text };
  } finally {
    clearTimeout(to);
  }
}

export async function GET() {
  const urls = [
    `https://api.countapi.xyz/update/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(KEY)}?amount=1`,
    `https://api.countapi.xyz/hit/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(KEY)}`,
  ];

  for (const url of urls) {
    try {
      const r = await tryCountApi(url);
      if (r.ok && typeof r.json?.value === "number") {
        // success
        return NextResponse.json({
          value: r.json.value,
          upstream: { url, status: r.status },
        }, { headers: { "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate" } });
      }
      // fall through and try next endpoint, but include debug info
    } catch (e: any) {
      // continue to next attempt
    }
  }

  // If both failed, return a debug payload so we can see what's going on in the browser
  return NextResponse.json(
    {
      value: 1,
      error: "COUNTAPI_FAILED_OR_BLOCKED",
      hint: "Open /api/visits in a new tab to see this payload. If 'error' is present, upstream failed/blocked.",
    },
    { status: 200, headers: { "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate" } }
  );
}
