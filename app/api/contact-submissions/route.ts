import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const SUPABASE_URL =
  process.env.SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

const getSupabase = (token?: string) => {
  if (!SUPABASE_URL || !(SERVICE_ROLE_KEY || ANON_KEY)) {
    throw new Error("Supabase env is missing");
  }

  if (SERVICE_ROLE_KEY) {
    return createClient<Database>(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
  }

  return createClient<Database>(SUPABASE_URL, ANON_KEY, {
    auth: { persistSession: false },
    global: token ? { headers: { Authorization: `Bearer ${token}` } } : {},
  });
};

const validateAuth = async (token?: string) => {
  if (!token) return false;
  const supabase = getSupabase(token);
  const { data, error } = await supabase.auth.getUser(token);
  return Boolean(data?.user) && !error;
};

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : undefined;

    const isAuthorized = await validateAuth(token);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const supabase = getSupabase(token);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Failed to load submissions" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load submissions";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
