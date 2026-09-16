"use client";
import Image from "next/image";
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
  onGuide,
}: {
  text: string;
  onText: (value: string) => void;
  query: PropertyQuery;
  onQuery: (value: PropertyQuery) => void;
  onSearch: (text: string, reset?: boolean) => void;
  onGuide: () => void;
}) {
  return (
    <section className="pt-search-hero" aria-label="Find an apartment in Dhaka">
      <div className="pt-search-scene">
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
            <button className="pt-primary" type="submit">
              Search homes <Icon name="arrow" size={18} />
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
                  value={query.budget || ""}
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
                  value={query.bedrooms || ""}
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
        <button className="pt-hero-help" onClick={onGuide}>
          Prefer a little guidance?{" "}
          <span>
            Help me choose <Icon name="arrow" size={16} />
          </span>
        </button>
      </div>
      <div className="pt-scene-caption">
        <span>Room to imagine your everyday.</span>
        <span>Illustrative interior · demo inventory</span>
      </div>
    </section>
  );
}
