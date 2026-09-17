"use client";

import { useEffect, useMemo, useState } from "react";
import type { PropertyQuery } from "@/content/propty-demo";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import styles from "./MoreFilters.module.css";

export type Transaction = "buy" | "rent";
export type ExtendedPropertyQuery = PropertyQuery & {
  transaction?: Transaction;
  minSqft?: number;
  maxSqft?: number;
  bathrooms?: number;
  amenities?: string[];
  furnishing?: string;
  availableNow?: boolean;
  newProjectsOnly?: boolean;
};

const AMENITIES = ["Parking", "Lift", "Balcony"] as const;
const EMPTY: ExtendedPropertyQuery = {};

function asNumber(value: string) {
  const number = Number(value);
  return value && Number.isFinite(number) && number > 0 ? number : undefined;
}

export function MoreFilters({
  open,
  onClose,
  query,
  transaction,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  query: ExtendedPropertyQuery;
  transaction: Transaction;
  onApply: (query: ExtendedPropertyQuery) => void;
}) {
  const [draft, setDraft] = useState<ExtendedPropertyQuery>(() => ({ ...EMPTY, ...query }));
  useEffect(() => {
    if (open) setDraft({ ...EMPTY, ...query });
  }, [open, query]);

  const amenities = draft.amenities ?? [];
  const title = transaction === "rent" ? "More rental filters" : "More buying filters";
  const furnishing = draft.furnishing ?? "";
  const clear = () => setDraft({ transaction });
  const toggleAmenity = (name: string) =>
    setDraft((current) => ({
      ...current,
      amenities: amenities.includes(name)
        ? amenities.filter((item) => item !== name)
        : [...amenities, name],
    }));
  const readiness = useMemo(() => draft.newProjectsOnly === true, [draft.newProjectsOnly]);

  if (!open) return null;
  return (
    <Modal title={title} onClose={onClose} wide>
      <div className={styles.panel}>
        <p className={styles.intro}>
          Keep the essentials above and use these filters when you already know what matters.
        </p>

        <section className={styles.section} aria-labelledby="more-size-label">
          <h3 className={styles.sectionTitle} id="more-size-label">Home size</h3>
          <div className={styles.range}>
            <label className={styles.field}>
              Minimum sq ft
              <input
                type="number"
                min="0"
                step="50"
                inputMode="numeric"
                value={draft.minSqft ?? ""}
                onChange={(event) => setDraft({ ...draft, minSqft: asNumber(event.target.value) })}
              />
            </label>
            <label className={styles.field}>
              Maximum sq ft
              <input
                type="number"
                min="0"
                step="50"
                inputMode="numeric"
                value={draft.maxSqft ?? ""}
                onChange={(event) => setDraft({ ...draft, maxSqft: asNumber(event.target.value) })}
              />
            </label>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="more-home-label">
          <h3 className={styles.sectionTitle} id="more-home-label">Home details</h3>
          <div className={styles.selectRow}>
            <label className={styles.field}>
              Bathrooms
              <select
                aria-label="Minimum bathrooms"
                value={draft.bathrooms ?? ""}
                onChange={(event) => setDraft({ ...draft, bathrooms: asNumber(event.target.value) })}
              >
                <option value="">Any number</option>
                {[1, 2, 3, 4].map((number) => <option key={number} value={number}>{number}+ bathrooms</option>)}
              </select>
            </label>
            <label className={styles.field}>
              Furnishing
              <select
                aria-label="Furnishing"
                value={furnishing}
                onChange={(event) => setDraft({ ...draft, furnishing: event.target.value || undefined })}
              >
                <option value="">Any furnishing</option>
                <option value="Furnished">Furnished</option>
                <option value="Semi-furnished">Semi-furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </label>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="more-amenities-label">
          <h3 className={styles.sectionTitle} id="more-amenities-label">Amenities</h3>
          <div className={styles.toggleGrid}>
            {AMENITIES.map((name) => (
              <label className={styles.toggle} key={name}>
                <input type="checkbox" checked={amenities.includes(name)} onChange={() => toggleAmenity(name)} />
                {name}
              </label>
            ))}
          </div>
        </section>

        {transaction === "rent" ? (
          <label className={styles.checkRow}>
            <input
              type="checkbox"
              checked={draft.availableNow === true}
              onChange={(event) => setDraft({ ...draft, availableNow: event.target.checked || undefined })}
            />
            Available to move in now
          </label>
        ) : (
          <div className={styles.checkStack}>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={draft.readyOnly === true}
                onChange={(event) => setDraft({ ...draft, readyOnly: event.target.checked || undefined })}
              />
              Ready to move in
            </label>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={readiness}
                onChange={(event) => setDraft({ ...draft, newProjectsOnly: event.target.checked || undefined })}
              />
              New projects only
            </label>
          </div>
        )}

        <div className={styles.actions}>
          <button className="pt-outline" type="button" onClick={clear}>Clear</button>
          <button className="pt-primary" type="button" onClick={() => { onApply({ ...draft, transaction }); onClose(); }}>
            Apply filters <Icon name="arrow" size={17} />
          </button>
        </div>
      </div>
    </Modal>
  );
}
