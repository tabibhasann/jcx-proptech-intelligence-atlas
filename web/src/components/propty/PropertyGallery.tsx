"use client";

import Image from "next/image";
import { useState } from "react";
import type { Property } from "@/content/propty-demo";
import { Icon } from "./Icon";
import { Modal } from "./Modal";

export function PropertyGallery({ property }: { property: Property }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const images = property.images;
  const multiple = images.length > 1;
  const move = (direction: number) =>
    setActive((index) => (index + direction + images.length) % images.length);
  return (
    <>
      <div className="pt-property-gallery">
        <div className="pt-detail-photo">
          <Image
            key={images[active]}
            src={images[active]}
            fill
            sizes="(max-width: 800px) 100vw, 90vw"
            alt={`Interior inspiration for ${property.title}, photo ${active + 1}`}
            priority
          />
          <button className="pt-photo-expand" onClick={() => setOpen(true)}>
            <Icon name="expand" size={18} />
            {multiple ? `View ${images.length} photos` : "View photo"}
          </button>
        </div>
        {multiple && (
          <div className="pt-gallery-thumbnails" aria-label="Interior inspiration photos">
            {images.map((src, index) => (
              <button
                key={src}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <Image src={src} alt="" width={144} height={96} />
              </button>
            ))}
            <span className="pt-gallery-position" aria-live="polite">
              Interior inspiration · {active + 1} / {images.length}
            </span>
          </div>
        )}
      </div>
      {open && (
        <Modal
          title={`${property.title}: interior inspiration`}
          wide
          variant="photo"
          onClose={() => setOpen(false)}
          onKeyDown={(event) => {
            if (!multiple) return;
            if (event.key === "ArrowRight") {
              event.preventDefault();
              move(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              move(-1);
            }
          }}
        >
          <div className="pt-lightbox">
            <Image
              key={images[active]}
              src={images[active]}
              alt={`Interior inspiration for ${property.title}, photo ${active + 1}`}
              width={1400}
              height={1000}
            />
          </div>
          {multiple && (
            <>
              <button
                className="pt-gallery-arrow pt-gallery-prev"
                aria-label="Previous photo"
                onClick={() => move(-1)}
              >
                <Icon name="back" size={20} />
              </button>
              <button
                className="pt-gallery-arrow pt-gallery-next"
                aria-label="Next photo"
                onClick={() => move(1)}
              >
                <Icon name="arrow" size={20} />
              </button>
              <span className="pt-gallery-counter" aria-live="polite">
                {active + 1} / {images.length}
              </span>
            </>
          )}
        </Modal>
      )}
    </>
  );
}
