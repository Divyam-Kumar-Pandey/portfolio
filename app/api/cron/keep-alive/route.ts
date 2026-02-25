import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!SUPABASE_URL || !SUPABASE_KEY) {
            throw new Error("Supabase env is missing");
        }

        const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
            auth: { persistSession: false },
        });

        // Query a table just to keep the database active
        const { error } = await supabase.from("contact_submissions").select("id").limit(1);

        if (error) {
            console.error("Cron job error keeping Supabase active:", error);
            return NextResponse.json(
                { error: "Failed to query database" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: "Database keep-alive successful" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to run cron job";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
