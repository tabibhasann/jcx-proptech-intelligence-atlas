"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  formatPrice,
  propertyAreas,
  type PropertyQuery,
} from "@/content/propty-demo";
import { Icon } from "./Icon";

export function SearchHero({
  text,
  onText,
  query,
  onQuery,
  onSearch,
  busy,
}: {
  text: string;
  onText: (value: string) => void;
  query: PropertyQuery;
  onQuery: (value: PropertyQuery) => void;
  onSearch: (text: string, reset?: boolean) => void;
  busy: boolean;
}) {
  const scene = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let current = 0;
    let previousTime = 0;
    const update = (time: number) => {
      frame = 0;
      if (!hero.current || !scene.current) return;
      const target = media.matches
        ? 0
        : Math.max(0, Math.min(1, window.scrollY / hero.current.offsetHeight));
      const delta = previousTime ? Math.min(time - previousTime, 64) : 16;
      previousTime = time;
      current = media.matches
        ? 0
        : current + (target - current) * (1 - Math.exp(-delta / 70));
      if (Math.abs(target - current) < 0.0005) current = target;
      const progress = current;
      const narrow = window.innerWidth <= 600;
      hero.current.style.setProperty("--hero-inset", `${progress * (narrow ? 6 : 28)}px`);
      hero.current.style.setProperty(
        "--hero-radius",
        `${24 + progress * 18}px`,
      );
      scene.current.style.transform = `translate3d(0, ${progress * (narrow ? 28 : 70)}px, 0) scale(${1.04 + progress * 0.04})`;
      if (current !== target) frame = requestAnimationFrame(update);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);
  return (
    <section
      ref={hero}
      className="pt-search-hero"
      aria-label="Find an apartment in Dhaka"
    >
      <div ref={scene} className="pt-search-scene">
        <Image
          src="/propty/hero.jpg"
          fill
          sizes="100vw"
          priority
          alt="Illustrative sunlit living room with a view of trees"
        />
      </div>
      <div className="pt-search-hero-content">
        <p className="pt-hero-kicker">HERE AND NOW · DHAKA</p>
        <h1>
          Find your place.
          <br />
          <span>Feel at home.</span>
        </h1>
        <p className="pt-search-subtitle">
          A home for the life you have in mind.
        </p>
        <form
          className="pt-search-box"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(text);
          }}
          role="search"
        >
          <div className="pt-search-input-row">
            <Icon name="search" size={24} />
            <label className="pt-sr-only" htmlFor="home-search">
              Describe your ideal home
            </label>
            <textarea
              id="home-search"
              role="searchbox"
              rows={1}
              value={text}
              onChange={(e) => onText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  if (!busy) e.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="Describe your ideal home…"
              enterKeyHint="search"
              autoComplete="off"
              maxLength={180}
            />
          </div>
          <div className="pt-search-options">
            <label>
              <Icon name="pin" size={18} />
              <span>
                <small>Neighbourhood</small>
                <select
                  aria-label="Location"
                  value={query.area || "All"}
                  onChange={(e) => onQuery({ ...query, area: e.target.value })}
                >
                  <option value="All">Anywhere in Dhaka</option>
                  {propertyAreas.map((area) => (
                    <option key={area}>{area}</option>
                  ))}
                </select>
              </span>
            </label>
            <label>
              <span className="pt-taka">৳</span>
              <span>
                <small>Maximum price</small>
                <select
                  aria-label="Maximum budget"
                  value={query.budget ?? ""}
                  onChange={(e) =>
                    onQuery({
                      ...query,
                      budget: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                >
                  <option value="">Any budget</option>
                  {query.budget !== undefined &&
                    ![15000000, 18000000, 25000000, 40000000].includes(
                      query.budget,
                    ) && (
                      <option value={query.budget}>
                        {formatPrice(query.budget)}
                      </option>
                    )}
                  {[15000000, 18000000, 25000000, 40000000].map((price) => (
                    <option key={price} value={price}>
                      {formatPrice(price)}
                    </option>
                  ))}
                </select>
              </span>
            </label>
            <label>
              <Icon name="bed" size={19} />
              <span>
                <small>Bedrooms</small>
                <select
                  aria-label="Minimum bedrooms"
                  value={query.bedrooms ?? ""}
                  onChange={(e) =>
                    onQuery({
                      ...query,
                      bedrooms: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                >
                  <option value="">Any number</option>
                  {query.bedrooms !== undefined &&
                    ![2, 3, 4].includes(query.bedrooms) && (
                      <option value={query.bedrooms}>
                        {query.bedrooms}+ bedrooms
                      </option>
                    )}
                  {[2, 3, 4].map((beds) => (
                    <option key={beds} value={beds}>
                      {beds}+ bedrooms
                    </option>
                  ))}
                </select>
              </span>
            </label>
          </div>
          <button
            className="pt-primary pt-search-submit-action"
            type="submit"
            disabled={busy}
            aria-busy={busy}
          >
            {busy ? "Finding homes…" : "Search with AI"}{" "}
            {!busy && <Icon name="arrow" size={18} />}
          </button>
        </form>
        <div className="pt-search-suggestions">
          <span>Try AI search</span>
          {["Bashundhara under 1.8 crore", "Ready homes with parking"].map(
            (example) => (
              <button
                key={example}
                onClick={() => {
                  onText(example);
                  onSearch(example, true);
                }}
              >
                {example}
                <Icon name="arrow" size={14} />
              </button>
            ),
          )}
        </div>
        <a className="pt-scroll-cue" href="#homes">
          <span>Explore the collection</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
