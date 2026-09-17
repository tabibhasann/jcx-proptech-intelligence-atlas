"use client";
import { useState } from "react";
import Image from "next/image";
import {
  filterProperties,
  formatPrice,
  formatPropertyPrice,
  propertyAreas,
  type PropertyQuery,
} from "@/content/propty-demo";
import { Icon } from "./Icon";

export function Advisor({
  onOpen,
  onApply,
  transaction = "buy",
}: {
  transaction?: "buy" | "rent";
  onOpen: (id: string) => void;
  onApply: (query: PropertyQuery) => void;
}) {
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState<PropertyQuery>({ transaction });
  const budgetLabel = (value: number) => transaction === "rent" ? `BDT ${value.toLocaleString()} / month` : formatPrice(value);
  const choose = (part: PropertyQuery) => {
    setQuery((current) => ({ ...current, ...part }));
    setStep((current) => current + 1);
  };
  const matches = filterProperties(query).sort((a, b) => a.price - b.price);
  const questions = [
    "Where would you like to live?",
    transaction === "rent" ? "What monthly rent feels comfortable?" : "What asking price feels comfortable?",
    "How many bedrooms do you need?",
  ];
  return (
    <div className="pt-advisor">
      <div className="pt-ai-label">
        Home finder <span>Step-by-step filters</span>
      </div>
      <p className="pt-muted">
        Choose what you need. We’ll show the homes that match.
      </p>
      {step > 0 && (
        <div className="pt-brief">
          <span>{query.area === "All" ? "Open to any area" : query.area}</span>
          {step > 1 && (
            <span>
              {query.budget
                ? `Up to ${budgetLabel(query.budget)}`
                : "Flexible budget"}
            </span>
          )}
          {step > 2 && <span>{query.bedrooms}+ bedrooms</span>}
        </div>
      )}
      {step < 3 ? (
        <div className="pt-question" key={step}>
          <p className="pt-eyebrow">QUESTION {step + 1} OF 3</p>
          <h3>{questions[step]}</h3>
          {step === 0 && (
            <div className="pt-advisor-area">
              <label htmlFor="advisor-area">Neighbourhood</label>
              <select id="advisor-area" value={query.area ?? ""} onChange={(event) => setQuery((current) => ({ ...current, area: event.target.value }))}>
                <option value="" disabled>Choose an area</option>
                <option value="All">I’m open to suggestions</option>
                {propertyAreas.map((area) => <option key={area}>{area}</option>)}
              </select>
              <button className="pt-primary pt-full" disabled={!query.area} onClick={() => setStep(1)}>Continue <Icon name="arrow" size={18} /></button>
            </div>
          )}
          <div className="pt-choice-grid">
            {step === 1 &&
              (transaction === "rent" ? [25000, 40000, 60000, 100000] : [15000000, 18000000, 25000000, 40000000]).map((budget) => (
                <button key={budget} onClick={() => choose({ budget })}>
                  Up to {budgetLabel(budget)}
                  <Icon name="arrow" size={17} />
                </button>
              ))}
            {step === 2 &&
              [2, 3, 4].map((bedrooms) => (
                <button key={bedrooms} onClick={() => choose({ bedrooms })}>
                  {bedrooms}+ bedrooms
                  <Icon name="arrow" size={17} />
                </button>
              ))}
          </div>
          {step > 0 && (
            <button
              className="pt-text-button"
              onClick={() => setStep((s) => s - 1)}
            >
              Back to previous question
            </button>
          )}
        </div>
      ) : (
        <div className="pt-ai-results">
          <h3>
            {matches.length
              ? `${matches.length} ${matches.length === 1 ? "home fits" : "homes fit"} your brief.`
              : "Let’s adjust your brief."}
          </h3>
          <p className="pt-muted">
            {matches.length
              ? "These sample homes match your area, maximum price and minimum bedroom count. The choice is yours."
              : "No home in this collection matches all three preferences. Try adjusting your brief."}
          </p>
          {matches.slice(0, 3).map((p) => (
            <button
              className="pt-ai-result"
              key={p.id}
              onClick={() => onOpen(p.id)}
            >
              <Image
                src={p.images[0]}
                width={100}
                height={90}
                alt={`Illustrative interior for ${p.title}`}
              />
              <span>
                <strong>{p.title}</strong>
                <small>
                  {formatPropertyPrice(p)} · {p.bedrooms} beds
                </small>
                <small>
                  {p.sqft.toLocaleString()} sq ft · {p.area}
                </small>
              </span>
              <Icon name="arrow" />
            </button>
          ))}
          {matches.length > 0 && (
            <button
              className="pt-primary pt-full"
              onClick={() => onApply(query)}
            >
              Explore these matches <Icon name="arrow" />
            </button>
          )}
          <button
            className="pt-text-button"
            onClick={() => {
              setStep(0);
              setQuery({ transaction });
            }}
          >
            Start a new brief
          </button>
        </div>
      )}
      <p className="pt-fine">
        This preview matches sample inventory using fixed rules. It does not
        assess legal status, investment returns or live availability.
      </p>
    </div>
  );
}
