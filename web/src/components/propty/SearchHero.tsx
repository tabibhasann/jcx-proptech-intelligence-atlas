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
    const update = () => {
      frame = 0;
      if (!hero.current || !scene.current) return;
      const rect = hero.current.getBoundingClientRect();
      const progress = media.matches
        ? 0
        : Math.max(0, Math.min(1, -rect.top / rect.height));
      scene.current.style.transform = `translate3d(0, ${progress * 75}px, 0) scale(${1.035 + progress * 0.055})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", schedule, { passive: true });
    media.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
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
              Search homes
            </label>
            <input
              id="home-search"
              type="search"
              value={text}
              onChange={(e) => onText(e.target.value)}
              placeholder="Area, home name, or what you have in mind"
              autoComplete="off"
              maxLength={180}
            />
            <button
              className="pt-primary"
              type="submit"
              disabled={busy}
              aria-busy={busy}
            >
              {busy ? "Finding homes…" : "Search homes"}{" "}
              {!busy && <Icon name="arrow" size={18} />}
            </button>
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
        </form>
        <div className="pt-search-suggestions">
          <span>Try a search</span>
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
        <p className="pt-search-privacy">
          Gemini helps interpret your search. Please leave out personal details.
        </p>
        <a className="pt-scroll-cue" href="#homes">
          <span>Explore the collection</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="pt-scene-caption">
        <span>Room to imagine your everyday.</span>
        <span>Illustrative interior · demo inventory</span>
      </div>
    </section>
  );
}
