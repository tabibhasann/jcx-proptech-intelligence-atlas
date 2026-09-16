"use client";
import { useState } from "react";
import Image from "next/image";
import {
  filterProperties,
  formatPrice,
  propertyAreas,
  type PropertyQuery,
} from "@/content/propty-demo";
import { Icon } from "./Icon";

export function Advisor({
  onOpen,
  onApply,
}: {
  onOpen: (id: string) => void;
  onApply: (query: PropertyQuery) => void;
}) {
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState<PropertyQuery>({});
  const choose = (part: PropertyQuery) => {
    setQuery((current) => ({ ...current, ...part }));
    setStep((current) => current + 1);
  };
  const matches = filterProperties(query).sort((a, b) => a.price - b.price);
  const questions = [
    "Where would you like to live?",
    "What asking price feels comfortable?",
    "How many bedrooms do you need?",
  ];
  return (
    <div className="pt-advisor">
      <div className="pt-ai-label">
        <Icon name="spark" /> AI preview <span>Guided demo · no live AI</span>
      </div>
      <p className="pt-muted">
        A few thoughtful questions. A clearer shortlist.
      </p>
      {step > 0 && (
        <div className="pt-brief">
          <span>{query.area === "All" ? "Open to any area" : query.area}</span>
          {step > 1 && (
            <span>
              {query.budget
                ? `Up to ${formatPrice(query.budget)}`
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
          <div className="pt-choice-grid">
            {step === 0 &&
              [...propertyAreas, "All"].map((area) => (
                <button key={area} onClick={() => choose({ area })}>
                  {area === "All" ? "I’m open to suggestions" : area}
                  <Icon name="arrow" size={17} />
                </button>
              ))}
            {step === 1 &&
              [15000000, 18000000, 25000000, 40000000].map((budget) => (
                <button key={budget} onClick={() => choose({ budget })}>
                  Up to {formatPrice(budget)}
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
              : "None of our six demo homes matches all three preferences. We haven’t silently changed your requirements."}
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
                  {formatPrice(p.price)} · {p.bedrooms} beds
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
              setQuery({});
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
