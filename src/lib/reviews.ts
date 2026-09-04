import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Review = Database["public"]["Tables"]["reviews"]["Row"];

/** Public list of approved reviews, newest first. */
export function useApprovedReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });
    setReviews(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
    const channel = supabase
      .channel("public-reviews")
      .on("postgres_changes", { event: "*", schema: "public", table: "reviews" }, () => {
        void load();
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [load]);

  return { reviews, loading, reload: load };
}

/** The signed-in user's own review (if any) plus submit/delete helpers. */
export function useMyReview(userId?: string) {
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setReview(data ?? null);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  const submit = useCallback(
    async (input: { displayName: string; roleLabel: string; rating: number; comment: string }) => {
      if (!userId) throw new Error("Not signed in");
      const payload = {
        user_id: userId,
        display_name: input.displayName,
        role_label: input.roleLabel,
        rating: input.rating,
        comment: input.comment,
      };
      const { error } = review
        ? await supabase.from("reviews").update(payload).eq("id", review.id)
        : await supabase.from("reviews").insert(payload);
      if (error) throw error;
      await load();
    },
    [userId, review, load],
  );

  const remove = useCallback(async () => {
    if (!review) return;
    const { error } = await supabase.from("reviews").delete().eq("id", review.id);
    if (error) throw error;
    setReview(null);
  }, [review]);

  return { review, loading, submit, remove, reload: load };
}
