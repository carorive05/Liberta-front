import { useState } from "react";
import React from "react";
import { Star, ChevronDown } from "lucide-react";

export interface Review {
  id: number | string;
  name: string;
  badge?: string;
  avatarColor?: string;
  rating: number;
  timeAgo?: string;
  body: string;
}

export interface RatingDistribution {
  stars: number;
  percentage: number;
}

interface StarRatingProps {
  value: number;
  max?: number;
  size?: number;
}

interface RatingsReviewsProps {
  averageRating: number;
  totalLabel?: string;
  distribution: RatingDistribution[];
  reviews: Review[];
  onViewAll?: () => void;
  viewAllLabel?: string;
}

export function StarRating({ value, max = 5, size = 16 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(value);
        const partial = !filled && i < value;
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="text-gray-200" fill="currentColor" strokeWidth={0} />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: partial ? `${(value % 1) * 100}%` : "100%" }}
              >
                <Star size={size} className="text-amber-500" fill="currentColor" strokeWidth={0} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export function RatingBar({ stars, percentage }: RatingDistribution) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 w-5 text-right">{stars}</span>
      <Star size={13} className="text-amber-500" fill="currentColor" strokeWidth={0} />
      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-500 w-8 text-right">{percentage}%</span>
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
            style={{ backgroundColor: review.avatarColor ?? "#6b7280" }}
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 leading-tight">{review.name}</p>
            {review.badge && (
              <p className="text-xs text-[#6B6B68] mt-0.5">{review.badge}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <StarRating value={review.rating} size={13} />
          {review.timeAgo && (
            <span className="text-xs text-[#6B6B68] whitespace-nowrap">{review.timeAgo}</span>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{review.body}</p>
    </div>
  );
}

export default function RatingsReviews({
  averageRating = 0,
  totalLabel = "Basado en reseñas",
  distribution = [],
  reviews = [],
  onViewAll,
  viewAllLabel = "Ver todas las reseñas",
}: RatingsReviewsProps) {
  return (
    <section className="font-sans">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Calificación y reseñas</h2>

      <div className="flex gap-8 items-start mb-6">
        <div className="flex flex-col items-center gap-1 min-w-[72px]">
          <span className="text-5xl font-bold text-gray-900 leading-none tracking-tight">
            {averageRating.toFixed(1)}
          </span>
          <StarRating value={averageRating} size={18} />
          <span className="text-xs text-[#6B6B68] text-center mt-0.5">{totalLabel}</span>
        </div>

        <div className="flex-1 flex flex-col gap-2 pt-1">
          {[...distribution].sort((a, b) => b.stars - a.stars).map((row) => (
            <RatingBar key={row.stars} stars={row.stars} percentage={row.percentage} />
          ))}
        </div>
      </div>

      {reviews.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Reseñas de la comunidad</h3>
          <div className="flex flex-col gap-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </>
      )}

      {onViewAll && (
        <div className="mt-5 flex justify-center">
          <button
            onClick={onViewAll}
            className="flex items-center gap-2 px-6 py-2.5 border border-teal-600 text-teal-700 text-sm font-medium rounded-full hover:bg-teal-50 transition-colors duration-150"
          >
            {viewAllLabel}
            <ChevronDown size={15} />
          </button>
        </div>
      )}
    </section>
  );
}
