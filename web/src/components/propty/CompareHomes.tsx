"use client";
import { useState } from "react";
import Image from "next/image";
import { formatPrice, formatPropertyPrice, getTransaction, type Property } from "@/content/propty-demo";
import { Icon } from "./Icon";

export function CompareHomes({
  homes,
  onOpen,
}: {
  homes: Property[];
  onOpen: (id: string) => void;
}) {
  const [differences, setDifferences] = useState(false);
  const isRent = homes.length > 0 && getTransaction(homes[0]) === "rent";
  const rows: [string, (p: Property) => string][] = [
    [isRent ? "Monthly rent" : "Asking price", formatPropertyPrice],
    ["Area", (p) => p.area],
    ["Bedrooms", (p) => String(p.bedrooms)],
    ["Bathrooms", (p) => String(p.bathrooms)],
    ["Floor space", (p) => `${p.sqft.toLocaleString()} sq ft`],
    [
      isRent ? "Monthly rent / sq ft" : "Price / sq ft",
      (p) => `BDT ${Math.round(p.price / p.sqft).toLocaleString()}`,
    ],
    ["Sample status", (p) => p.status],
    ["Features", (p) => p.features.join(" · ")],
    ["Trade-off", (p) => p.tradeoff],
    ["Document review", () => "Not performed. Sample home only."],
  ];
  if (isRent) rows.splice(6, 0,
    ["Furnishing", p => p.rental?.furnishing ?? "Not specified"],
    ["Available from", p => p.rental?.availableFrom ?? "Not specified"],
    ["Monthly service charge", p => p.rental?.serviceCharge == null ? "Not specified" : `BDT ${p.rental.serviceCharge.toLocaleString()}`],
    ["Deposit", p => p.rental?.deposit == null ? "Not specified" : `BDT ${p.rental.deposit.toLocaleString()}`],
  );
  const priceGap =
    Math.max(...homes.map((p) => p.price)) -
    Math.min(...homes.map((p) => p.price));
  const spaceGap =
    Math.max(...homes.map((p) => p.sqft)) -
    Math.min(...homes.map((p) => p.sqft));
  return (
    <>
      <p className="pt-muted">
        A clearer view of what you gain, and what you give up.
      </p>
      <div
        className="pt-compare-picks"
        style={{ "--compare-count": homes.length } as React.CSSProperties}
      >
        {homes.map((p) => (
          <button
            key={p.id}
            className="pt-compare-pick"
            onClick={() => onOpen(p.id)}
          >
            <Image
              src={p.images[0]}
              width={360}
              height={210}
              alt={`Illustrative interior for ${p.title}`}
            />
            <span className="pt-pick-copy">
              <small>{p.area}</small>
              <strong>{p.title}</strong>
              <span>
                {formatPropertyPrice(p)} <Icon name="arrow" size={16} />
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="pt-compare-insight">
        <p>
          <strong>{isRent ? `BDT ${priceGap.toLocaleString()} / month` : formatPrice(priceGap)}</strong>
          <span>{isRent ? "monthly rent difference" : "sample price difference"}</span>
        </p>
        <p>
          <strong>{spaceGap.toLocaleString()} sq ft</strong>
          <span>difference in floor space</span>
        </p>
        <small>
          Ranges across your selection, not measures of value or investment
          return.
        </small>
      </div>
      <div className="pt-comparison-controls">
        <span>The details that matter</span>
        <label>
          <input
            type="checkbox"
            checked={differences}
            onChange={(e) => setDifferences(e.target.checked)}
          />{" "}
          Differences only
        </label>
      </div>
      <p className="pt-comparison-hint">
        Swipe sideways to compare every home.
      </p>
      <div
        className="pt-comparison-scroll"
        role="region"
        aria-label="Scrollable home comparison"
        tabIndex={0}
      >
        <table className="pt-comparison pt-comparison-refined">
          <caption className="pt-sr-only">
            Comparison of selected sample homes
          </caption>
          <thead>
            <tr>
              <th scope="col">Your shortlist</th>
              {homes.map((p) => (
                <th scope="col" key={p.id}>
                  {p.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows
              .filter(
                ([, get]) => !differences || new Set(homes.map(get)).size > 1,
              )
              .map(([label, get]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {homes.map((p) => (
                    <td key={p.id}>{get(p)}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <p className="pt-fine">
        All homes and figures are fictional. Photos are illustrative. No
        documents have been checked.
      </p>
    </>
  );
}
