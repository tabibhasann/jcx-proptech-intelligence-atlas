"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ReadingPath } from "./ReadingPath";

export function ResearchFrame({ children }: { children: React.ReactNode }) {
  const prototype = usePathname().startsWith("/prototype");
  useEffect(() => {
    if (!prototype) return;
    const prior = document.documentElement.dataset.reading;
    delete document.documentElement.dataset.reading;
    return () => {
      if (prior) document.documentElement.dataset.reading = prior;
    };
  }, [prototype]);
  if (prototype) return children;
  return (
    <>
      <SiteHeader />
      <main id="main">
        <ReadingPath />
        {children}
        <ReadingPath position="bottom" />
      </main>
      <SiteFooter />
    </>
  );
}
