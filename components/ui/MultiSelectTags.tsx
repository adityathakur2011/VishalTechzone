"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface MultiSelectTagsProps {
  tags: Tag[];
  selectedTagIds: string[];
  onChange: (tagIds: string[]) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelectTags({
  tags,
  selectedTagIds,
  onChange,
  className,
  placeholder = "Select tags...",
  disabled = false,
}: MultiSelectTagsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTag = (tagId: string) => {
    if (disabled) return;
    
    if (selectedTagIds.includes(tagId)) {
      onChange(selectedTagIds.filter((id) => id !== tagId));
    } else {
      onChange([...selectedTagIds, tagId]);
    }
  };

  const removeTag = (tagId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onChange(selectedTagIds.filter((id) => id !== tagId));
  };

  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.id));

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "min-h-[42px] w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer",
          "border-gray-300 dark:border-gray-700",
          "focus:outline-none focus:ring-2 focus:ring-orange-500",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="flex flex-wrap gap-2 items-center">
          {selectedTags.length === 0 ? (
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {placeholder}
            </span>
          ) : (
            selectedTags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm"
              >
                {tag.name}
                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => removeTag(tag.id, e)}
                    className="hover:bg-orange-200 dark:hover:bg-orange-900/50 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))
          )}
          {!disabled && (
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400 ml-auto transition-transform",
                isOpen && "transform rotate-180"
              )}
            />
          )}
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
          {tags.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
              No tags available
            </div>
          ) : (
            tags.map((tag) => {
              const isSelected = selectedTagIds.includes(tag.id);
              return (
                <div
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={cn(
                    "px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between",
                    isSelected && "bg-orange-50 dark:bg-orange-900/20"
                  )}
                >
                  <span className="text-sm text-gray-900 dark:text-white">
                    {tag.name}
                  </span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

