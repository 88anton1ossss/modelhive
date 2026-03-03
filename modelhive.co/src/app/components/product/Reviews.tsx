import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";
import { motion } from "motion/react";

interface ReviewsProps {
  productId: string;
}

export function Reviews({ productId }: ReviewsProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const mockReviews = [
    {
      id: "1",
      author: "Alex Turner",
      rating: 5,
      text: "Absolutely amazing LoRA! The quality is outstanding and it works perfectly with my workflow. Highly recommended!",
      date: "2 days ago",
    },
    {
      id: "2",
      author: "Jessica Park",
      rating: 4,
      text: "Great model, very versatile. Had some minor issues with lighting consistency but overall very happy with the purchase.",
      date: "1 week ago",
    },
    {
      id: "3",
      author: "Anonymous",
      rating: 5,
      text: "Worth every penny. The results are consistently high quality.",
      date: "2 weeks ago",
    },
  ];

  const handleSubmit = () => {
    console.log("Submit review:", { rating, reviewText });
    setRating(0);
    setReviewText("");
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold">Reviews ({mockReviews.length})</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Review Form */}
        <div className="p-4 rounded-lg bg-accent/50 space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Your Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Your Review
            </label>
            <Textarea
              placeholder="Share your experience with this model..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || !reviewText.trim()}
            className="w-full"
          >
            Submit Review
          </Button>
        </div>

        {/* Existing Reviews */}
        <div className="space-y-4">
          {mockReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg border border-border hover:border-violet-500/50 transition"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600" />
                  <div>
                    <p className="font-medium">{review.author}</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= review.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {review.date}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
