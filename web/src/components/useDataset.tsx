"use client";

import { useEffect, useState } from "react";

export type DatasetState<T> =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: T };

const cache = new Map<string, Promise<unknown>>();

function load<T>(url: string): Promise<T> {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url).then((r) => {
        if (!r.ok) throw new Error(`fetch failed: ${r.status}`);
        return r.json() as Promise<T>;
      }),
    );
  }
  return cache.get(url) as Promise<T>;
}

/** Lazy-fetch a generated static dataset with explicit loading/error states. */
export function useDataset<T>(file: string): DatasetState<T> {
  const [state, setState] = useState<DatasetState<T>>({ status: "loading" });
  useEffect(() => {
    let alive = true;
    setState({ status: "loading" });
    load<T>(`/data/${file}`)
      .then((data) => alive && setState({ status: "ready", data }))
      .catch(() => alive && setState({ status: "error" }));
    return () => {
      alive = false;
    };
  }, [file]);
  return state;
}

export function DatasetLoading({ label }: { label: string }) {
  return (
    <div role="status" className="border border-line bg-paper-raised p-8 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
        Loading {label}…
      </p>
      <p className="mt-2 text-xs text-ink-soft">Fetching the generated dataset from /data.</p>
    </div>
  );
}

export function DatasetError({ label }: { label: string }) {
  return (
    <div role="alert" className="border border-mark/60 bg-paper-raised p-8 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mark-deep">
        {label} could not be loaded
      </p>
      <p className="mt-2 text-xs text-ink-soft">
        The dataset failed to load. The record remains intact: try reloading the page.
      </p>
    </div>
  );
}

export function DatasetEmpty({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="border border-dashed border-line-strong bg-paper-raised p-8 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">{label}</p>
      {hint ? <p className="mt-2 text-xs text-ink-soft">{hint}</p> : null}
    </div>
  );
}
