import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic"; // always run on server per request

export async function GET() {
  // single global key; change if you want multiple counters
  const next = await kv.incr("visits-total");
  return NextResponse.json({ value: next });
}
