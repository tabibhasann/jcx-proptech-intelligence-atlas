"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  formatPrice,
  propertyAreas,
  type PropertyQuery,
} from "@/content/propty-demo";
import { Icon } from "./Icon";
import {
  MoreFilters,
  type ExtendedPropertyQuery,
  type Transaction,
} from "./MoreFilters";
import styles from "./MoreFilters.module.css";

export function SearchHero({
  text,
  onText,
  query,
  onQuery,
  onSearch,
  busy,
  onTransactionChange,
}: {
  text: string;
  onText: (value: string) => void;
  query: PropertyQuery;
  onQuery: (value: PropertyQuery) => void;
  onSearch: (text: string, reset?: boolean) => void;
  busy: boolean;
  onTransactionChange?: (transaction: Transaction) => void;
}) {
  const scene = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const transaction: Transaction = query.transaction ?? "buy";
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const extendedQuery = query as ExtendedPropertyQuery;
  const budgetOptions = transaction === "rent"
    ? [30000, 50000, 80000, 120000]
    : [15000000, 18000000, 25000000, 40000000];
  const activeFilters = useMemo(() => {
    const chips: { key: keyof ExtendedPropertyQuery; label: string }[] = [];
    if (extendedQuery.minSqft !== undefined) chips.push({ key: "minSqft", label: `${extendedQuery.minSqft.toLocaleString()}+ sq ft` });
    if (extendedQuery.maxSqft !== undefined) chips.push({ key: "maxSqft", label: `Up to ${extendedQuery.maxSqft.toLocaleString()} sq ft` });
    if (extendedQuery.bathrooms !== undefined) chips.push({ key: "bathrooms", label: `${extendedQuery.bathrooms}+ baths` });
    (extendedQuery.amenities ?? []).forEach((amenity) => chips.push({ key: "amenities", label: amenity }));
    if (extendedQuery.furnishing) chips.push({ key: "furnishing", label: extendedQuery.furnishing });
    if (transaction === "rent" && extendedQuery.availableNow) chips.push({ key: "availableNow", label: "Available now" });
    if (transaction === "buy" && extendedQuery.readyOnly) chips.push({ key: "readyOnly", label: "Ready to move" });
    if (transaction === "buy" && extendedQuery.newProjectsOnly) chips.push({ key: "newProjectsOnly", label: "New projects" });
    return chips;
  }, [extendedQuery, transaction]);
  const setTransactionMode = (next: Transaction) => {
    if (onTransactionChange) onTransactionChange(next);
    else onQuery({ ...query, transaction: next } as PropertyQuery);
  };
  const removeFilter = (key: keyof ExtendedPropertyQuery, label: string) => {
    const next = { ...extendedQuery };
    if (key === "amenities") next.amenities = (next.amenities ?? []).filter((amenity) => amenity !== label);
    else delete next[key];
    onQuery(next as PropertyQuery);
  };
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
          className={`pt-search-box ${styles.searchBox}`}
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
                <small>{transaction === "rent" ? "Maximum monthly rent" : "Maximum price"}</small>
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
                  {query.budget !== undefined && !budgetOptions.includes(query.budget) && (
                      <option value={query.budget}>
                        {transaction === "rent" ? `${formatPrice(query.budget)} / month` : formatPrice(query.budget)}
                      </option>
                    )}
                  {budgetOptions.map((price) => (
                    <option key={price} value={price}>
                      {transaction === "rent" ? `${formatPrice(price)} / month` : formatPrice(price)}
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
          <div className={styles.filterBar}>
            <div className={styles.tabs} role="group" aria-label="Search for a home to buy or rent">
              {(["buy", "rent"] as const).map((mode) => (
                <button
                  className={`${styles.tab} ${transaction === mode ? styles.tabActive : ""}`}
                  key={mode}
                  type="button"
                  aria-pressed={transaction === mode}
                  onClick={() => setTransactionMode(mode)}
                >
                  {mode === "buy" ? "Buy" : "Rent"}
                </button>
              ))}
            </div>
            <button
              className={styles.moreButton}
              type="button"
              onClick={() => setMoreFiltersOpen(true)}
              aria-haspopup="dialog"
            >
              Amenities &amp; more
              {activeFilters.length > 0 && <span className={styles.filterCount}>{activeFilters.length}</span>}
              <Icon name="chevron" size={15} />
            </button>
            {activeFilters.length > 0 && (
              <div className={styles.chips} aria-label="Active filters">
                {activeFilters.map((filter, index) => (
                  <span className={styles.chip} key={`${filter.key}-${filter.label}-${index}`}>
                    {filter.label}
                    <button type="button" aria-label={`Remove ${filter.label} filter`} onClick={() => removeFilter(filter.key, filter.label)}>
                      <Icon name="close" size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
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
          {(transaction === "rent"
            ? ["Gulshan under BDT 80,000 / month", "Move-in ready with parking"]
            : ["Bashundhara under 1.8 crore", "Ready homes with parking"]
          ).map(
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
      <MoreFilters
        open={moreFiltersOpen}
        onClose={() => setMoreFiltersOpen(false)}
        query={extendedQuery}
        transaction={transaction}
        onApply={(next) => onQuery(next as PropertyQuery)}
      />
    </section>
  );
}
