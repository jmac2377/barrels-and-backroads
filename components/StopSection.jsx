"use client";

import React from "react";

/**
 * StopSection skeleton component
 *
 * Baseline idea: re-usable section for blog stops (road trips, playlists, notes).
 * - Accepts props: title, description, image (optional), children (for custom content).
 * - Layout: headline, paragraph, media slot, flexible content area.
 *
 * To flesh out later: styling, conditional layouts, media embedding, etc.
 */
export default function StopSection({ title, description, image, children }) {
  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-base md:text-lg mb-6 text-gray-200">
            {description}
          </p>
        )}
        {image && (
          <div className="mb-6">
            <img
              src={image}
              alt={title || "Stop image"}
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </section>
  );
}
