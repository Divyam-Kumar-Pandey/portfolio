"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getSupabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Mail, User, Calendar, MessageSquare } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const AdminPage = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let supabase;
    try {
      supabase = getSupabase();
    } catch (error: any) {
      toast.error(error.message || "Supabase is not configured");
      setLoading(false);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/auth");
      } else {
        fetchSubmissions();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const fetchSubmissions = async () => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    router.push("/auth");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-border bg-secondary/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Contact Submissions</h1>
            <p className="text-sm text-muted-foreground">
              View messages from your portfolio contact form
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Portfolio
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading submissions...
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-lg text-muted-foreground">
              No submissions yet
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Messages from your contact form will appear here
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-secondary border-2 border-border p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User size={16} className="text-muted-foreground" />
                    <span className="font-bold">{submission.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-muted-foreground" />
                    <a
                      href={`mailto:${submission.email}`}
                      className="text-muted-foreground hover:text-foreground transition-colors underline"
                    >
                      {submission.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    <span>{formatDate(submission.created_at)}</span>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-foreground whitespace-pre-wrap">
                    {submission.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;

