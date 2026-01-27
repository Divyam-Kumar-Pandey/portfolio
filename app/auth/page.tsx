"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getSupabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let supabase;
    try {
      supabase = getSupabase();
    } catch (error: any) {
      toast.error(error.message || "Supabase is not configured");
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          router.push("/admin");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = getSupabase();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success("Logged in successfully!");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <div className="bg-secondary border-2 border-border p-8 shadow-md">
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to view contact submissions
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-4 py-3 border-2 border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground transition-all duration-300"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all"
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

