"use client"

import React, { useEffect, useState } from "react";

interface Props {
  images: string[];
  altPrefix?: string;
}

export default function ProjectGalleryClient({ images, altPrefix = "Image" }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reset index if images change
    if (index >= images.length) setIndex(0);
  }, [images, index]);

  if (!images || images.length === 0) return null;

  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="cyrus-card cyrus-gallery-card" aria-hidden={false}>
      <div
        className="cyrus-gallery-main-wrap"
        role="button"
        tabIndex={0}
        onClick={next}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") next();
        }}
      >
        <img
          src={images[index]}
          alt={`${altPrefix} ${index + 1}`}
          className="cyrus-gallery-main"
          loading="lazy"
        />
      </div>

      <div className="cyrus-gallery-thumbs" role="tablist" aria-label="Gallery thumbnails">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            className={`cyrus-gallery-thumb ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-pressed={i === index}
            aria-label={`Show image ${i + 1}`}
          >
            <img src={src} alt={`${altPrefix} thumb ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
