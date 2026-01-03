import React from "react";
import { keyAchievements } from "../lib/keyAchievements";

export default function AchievementsGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Key{" "}
          <span className="text-orange-600 dark:text-orange-400">
            Achievements
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
          {keyAchievements.map((a, i) => (
            <article
              key={a.title}
              className="
                fade-up relative rounded-lg overflow-hidden
                border border-gray-200 dark:border-gray-800
                bg-white dark:bg-gray-900
                p-4 md:p-6
                transform transition-all duration-500
                hover:scale-[1.02]
              "
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* YEAR – Mobile only (bottom-right) */}
              <span
                className="
                  md:hidden
                  absolute bottom-4 right-4
                  text-xs text-gray-600 dark:text-gray-300
                  bg-gray-100 dark:bg-gray-800
                  px-2 py-1 rounded-full
                "
              >
                {a.year}
              </span>

              <div className="flex items-start gap-4">
                {/* Image – larger on mobile */}
                <div
                  className="
                    flex-shrink-0 rounded-xl overflow-hidden
                    bg-gray-100 dark:bg-gray-800
                    flex items-center justify-center
                    w-24 h-24        /* mobile */
                    sm:w-24 sm:h-24
                    md:w-28 md:h-28
                    lg:w-48 lg:h-48
                  "
                >
                  <img
                    src={a.imagePath}
                    alt={a.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Title + YEAR (desktop only) */}
                  <div className="hidden md:flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {a.title}
                      </h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {a.subtitle}
                      </div>
                    </div>

                    <span className="
                      text-xs text-gray-600 dark:text-gray-300
                      bg-gray-100 dark:bg-gray-800
                      px-2 py-1 rounded-full
                    ">
                      {a.year}
                    </span>
                  </div>

                  {/* Mobile title */}
                  <div className="md:hidden">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {a.title}
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {a.subtitle}
                    </div>
                  </div>

                  {/* Description – desktop only */}
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                    {a.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3 flex-wrap">
                    {/* Category – desktop only */}
                    {a.category && (
                      <span className="
                        hidden md:inline-block
                        text-xs text-orange-600 dark:text-orange-400
                        font-medium px-3 py-1 rounded-full
                        bg-orange-50 dark:bg-orange-900/20
                      ">
                        {a.category}
                      </span>
                    )}

                    {/* Highlight – desktop only */}
                    {a.highlight && (
                      <span className="hidden md:inline text-sm text-gray-500 dark:text-gray-400">
                        • {a.highlight}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
