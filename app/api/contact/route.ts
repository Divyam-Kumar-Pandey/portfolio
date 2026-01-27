import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const SUPABASE_URL =
  process.env.SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "";

const getSupabase = () => {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase env is missing");
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  });
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const name = String(payload?.name ?? "").trim();
    const email = String(payload?.email ?? "").trim();
    const message = String(payload?.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      message,
    });

    if (error) {
      console.error("Error submitting message:", error);
      return NextResponse.json(
        { error: "Failed to submit message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit message";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
