"use client";

import Link from "next/link";

/**
 * Baseline 1: CTA placeholder
 * - Simple centered button under Hero headline
 * - Clean Tailwind only, no effects yet
 */
export default function CTA() {
  return (
    <div className="mt-6 flex justify-center">
      <Link
        href="/blog"
        className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-500 transition-colors"
      >
        Explore the Blog
      </Link>
    </div>
  );
}
