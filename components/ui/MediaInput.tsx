"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Video,
  Link as LinkIcon,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type MediaType = "IMAGE" | "IMAGE_URL" | "YOUTUBE" | null;

interface MediaInputProps {
  mediaType: MediaType;
  mediaUrl: string | null;
  onChange: (type: MediaType, url: string | null) => void;
  className?: string;
  disabled?: boolean;
}

export function MediaInput({
  mediaType,
  mediaUrl,
  onChange,
  className,
  disabled = false,
}: MediaInputProps) {
  const [localMediaType, setLocalMediaType] = useState<MediaType>(mediaType);
  const [localMediaUrl, setLocalMediaUrl] = useState<string>(mediaUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with props when they change
  React.useEffect(() => {
    setLocalMediaType(mediaType);
    setLocalMediaUrl(mediaUrl || "");
  }, [mediaType, mediaUrl]);

  const handleTypeChange = (type: MediaType) => {
    setLocalMediaType(type);
    setLocalMediaUrl("");
    onChange(type, null);
  };

  const handleUrlChange = (url: string) => {
    setLocalMediaUrl(url);
    onChange(localMediaType, url || null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert(`File size exceeds 5MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB. Please choose a smaller image.`);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // For now, we'll convert to data URL
    // In production, you'd upload to a cloud storage service
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setLocalMediaUrl(dataUrl);
      onChange("IMAGE", dataUrl);
    };
    reader.onerror = () => {
      alert("Error reading file. Please try again.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setLocalMediaType(null);
    setLocalMediaUrl("");
    onChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  };

  const validateImageUrl = (url: string): boolean => {
    const imageRegex = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
    return imageRegex.test(url) || url.startsWith("data:image/");
  };

  const getUrlValidationError = (): string | null => {
    if (!localMediaUrl) return null;
    
    if (localMediaType === "YOUTUBE" && !validateYouTubeUrl(localMediaUrl)) {
      return "Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)";
    }

    return null;
  };

  const validationError = getUrlValidationError();

  return (
    <div className={cn("space-y-4", className)}>
      {/* Media Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          Media Type
        </label>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => handleTypeChange("IMAGE")}
            disabled={disabled}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
              localMediaType === "IMAGE"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <Upload className="h-4 w-4" />
            Upload Image
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("IMAGE_URL")}
            disabled={disabled}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
              localMediaType === "IMAGE_URL"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <LinkIcon className="h-4 w-4" />
            Image URL
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("YOUTUBE")}
            disabled={disabled}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
              localMediaType === "YOUTUBE"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <Video className="h-4 w-4" />
            YouTube Video
          </button>
          {localMediaType && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <X className="h-4 w-4" />
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Media Input */}
      {localMediaType && (
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            {localMediaType === "IMAGE"
              ? "Upload Image"
              : localMediaType === "IMAGE_URL"
              ? "Image URL"
              : "YouTube Video URL"}
          </label>

          {localMediaType === "IMAGE" ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={disabled}
                className="hidden"
              />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className={cn(
                  "text-sm text-orange-600 dark:text-orange-400 hover:underline",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                Click to upload or drag and drop
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                PNG, JPG, GIF up to 5MB
              </p>
              {localMediaUrl && (
                <div className="mt-4 relative inline-block">
                  <img
                    src={localMediaUrl}
                    alt="Preview"
                    className="max-h-40 rounded-lg"
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              <input
                type="url"
                value={localMediaUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder={
                  localMediaType === "IMAGE_URL"
                    ? "https://example.com/image.jpg"
                    : "https://www.youtube.com/watch?v=VIDEO_ID"
                }
                disabled={disabled}
                className={cn(
                  "w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
                  "border-gray-300 dark:border-gray-700",
                  "focus:outline-none focus:ring-2 focus:ring-orange-500",
                  validationError && "border-red-500",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              />
              {validationError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationError}
                </p>
              )}
              {localMediaUrl && !validationError && localMediaType === "IMAGE_URL" && (
                <div className="mt-4">
                  <img
                    src={localMediaUrl}
                    alt="Preview"
                    className="max-h-40 rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

