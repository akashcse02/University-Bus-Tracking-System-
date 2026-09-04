import { useEffect, useState } from "react";
import { Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useMyReview } from "@/lib/reviews";
import { useLanguage } from "@/lib/i18n";

export function ReviewForm({
  userId,
  displayName,
  roleLabel = "Student",
}: {
  userId: string;
  displayName: string;
  roleLabel?: string;
}) {
  const { t } = useLanguage();
  const { review, submit, remove } = useMyReview(userId);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [review]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSaving(true);
    try {
      await submit({ displayName, roleLabel, rating, comment: comment.trim() });
      toast.success(t("review.success"));
    } catch {
      toast.error(t("review.error"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="rounded-[2rem]">
      <CardHeader>
        <CardTitle className="text-lg">{review ? t("review.yours") : t("review.title")}</CardTitle>
        <p className="text-sm text-ink/60">{t("review.subtitle")}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-bold text-ink/70">{t("review.rating")}</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} star`}
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-7 w-7 ${
                      n <= (hover || rating) ? "fill-accent text-accent" : "text-ink/20"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("review.placeholder")}
            required
            rows={4}
            className="rounded-2xl"
          />

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={saving}
              className="btn-hover-premium rounded-full bg-primary px-6 font-display font-bold"
            >
              {saving ? t("review.posting") : t("review.submit")}
            </Button>
            {review && (
              <Button
                type="button"
                variant="ghost"
                onClick={async () => {
                  await remove();
                  setComment("");
                  setRating(5);
                }}
                className="rounded-full text-red-500 hover:bg-red-50"
              >
                <Trash2 className="mr-1 h-4 w-4" />
                {t("review.delete")}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
