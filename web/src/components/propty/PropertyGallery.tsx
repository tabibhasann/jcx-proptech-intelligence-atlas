"use client";

import Image from "next/image";
import { useState } from "react";
import type { Property } from "@/content/propty-demo";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import styles from "./PropertyGallery.module.css";

export function PropertyGallery({ property }: { property: Property }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const images = property.images;
  const multiple = images.length > 1;
  const previewImages = images.slice(0, 3);
  const openPhoto = (index: number) => {
    setActive(index);
    setOpen(true);
  };
  const move = (direction: number) =>
    setActive((index) => (index + direction + images.length) % images.length);
  return (
    <>
      <section
        className={`pt-property-gallery ${styles.gallery}`}
        data-count={previewImages.length}
        aria-label={`${property.title} photo gallery`}
      >
        {previewImages.map((src, index) => (
          <button
            key={src}
            type="button"
            className={styles.tile}
            aria-label={`Open photo ${index + 1} of ${images.length}`}
            onClick={() => openPhoto(index)}
          >
            <Image
              src={src}
              fill
              sizes={index === 0
                ? multiple ? "(max-width: 600px) 100vw, (max-width: 1400px) 62vw, 850px" : "(max-width: 1400px) 95vw, 1300px"
                : "(max-width: 600px) 50vw, (max-width: 1400px) 32vw, 450px"}
              alt={`Interior inspiration for ${property.title}, photo ${index + 1}`}
              priority={index === 0}
            />
          </button>
        ))}
        <button
          type="button"
          className={styles.viewAll}
          onClick={() => openPhoto(0)}
        >
          <Icon name="expand" size={16} />
          {multiple ? `View ${images.length} photos` : "View photo"}
        </button>
      </section>
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
