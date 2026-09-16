"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  DEMO_NOTICE,
  filterProperties,
  formatPrice,
  properties,
  propertyAreas,
  type Property,
  type PropertyQuery,
} from "@/content/propty-demo";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import { Advisor } from "./Advisor";

type View = "explore" | "saved" | "visits" | "team";
type Visit = {
  id: string;
  propertyId: string;
  date: string;
  time: string;
  status: "Requested" | "Reviewed" | "Cancelled";
};
type Dialog = "advisor" | "compare" | "booking" | "reset" | null;
const STORAGE = "propty-product-demo-v1";
const validId = (id: unknown): id is string =>
  typeof id === "string" && properties.some((p) => p.id === id);
const getProperty = (id: string) => properties.find((p) => p.id === id)!;
function localDate(days = 0) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function prettyDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function HomeCard({
  property: p,
  saved,
  compared,
  onOpen,
  onSave,
  onCompare,
}: {
  property: Property;
  saved: boolean;
  compared: boolean;
  onOpen: () => void;
  onSave: () => void;
  onCompare: () => void;
}) {
  return (
    <article className="pt-card">
      <div className="pt-card-image">
        <button
          className="pt-image-link"
          onClick={onOpen}
          aria-label={`View ${p.title}`}
        >
          <Image
            src={p.images[0]}
            alt={`Illustrative interior for ${p.title}`}
            fill
            sizes="(max-width: 640px) 94vw, (max-width: 1000px) 46vw, 31vw"
          />
        </button>
        <span className="pt-image-tag">{p.status}</span>
        <button
          className={`pt-save ${saved ? "is-saved" : ""}`}
          aria-label={`${saved ? "Unsave" : "Save"} ${p.title}`}
          aria-pressed={saved}
          onClick={onSave}
        >
          <Icon name="heart" size={19} />
        </button>
        <span className="pt-photo-note">Illustrative photo</span>
      </div>
      <div className="pt-card-content">
        <div className="pt-card-top">
          <span>{p.area}, Dhaka</span>
          <span>Sample home</span>
        </div>
        <button className="pt-card-title" onClick={onOpen}>
          {p.title}
        </button>
        <div className="pt-facts">
          <span>
            <Icon name="bed" size={17} />
            {p.bedrooms} beds
          </span>
          <span>{p.bathrooms} baths</span>
          <span>{p.sqft.toLocaleString()} sq ft</span>
        </div>
        <div className="pt-card-bottom">
          <strong>{formatPrice(p.price)}</strong>
          <button
            className={compared ? "is-selected" : ""}
            aria-pressed={compared}
            aria-label={`Compare ${p.title}`}
            onClick={onCompare}
          >
            <Icon name={compared ? "check" : "compare"} size={16} />
            <span>{compared ? "Added" : "Compare"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProptyApp() {
  const [view, setView] = useState<View>("explore");
  const [home, setHome] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [compared, setCompared] = useState<string[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [large, setLarge] = useState(false);
  const [query, setQuery] = useState<PropertyQuery>({});
  const [sort, setSort] = useState("featured");
  const [dialog, setDialog] = useState<Dialog>(null);
  const [bookingHome, setBookingHome] = useState<string>(properties[0].id);
  const [editing, setEditing] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("11:00 AM");
  const [toast, setToast] = useState("");
  const [brief, setBrief] = useState<PropertyQuery | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const selected = home ? properties.find((p) => p.id === home) : null;
  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(location.search);
      const id = params.get("home");
      setHome(validId(id) ? id : null);
      const next = params.get("view");
      setView(
        next === "saved" || next === "visits" || next === "team"
          ? next
          : "explore",
      );
    };
    sync();
    window.addEventListener("popstate", sync);
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE) || "null");
      if (raw?.version === 1) {
        if (Array.isArray(raw.saved))
          setSaved([...new Set<string>(raw.saved.filter(validId))]);
        if (Array.isArray(raw.visits))
          setVisits(
            raw.visits.filter(
              (v: Visit) =>
                v &&
                typeof v.id === "string" &&
                validId(v.propertyId) &&
                /^\d{4}-\d{2}-\d{2}$/.test(v.date) &&
                ["11:00 AM", "2:00 PM", "4:00 PM"].includes(v.time) &&
                ["Requested", "Reviewed", "Cancelled"].includes(v.status),
            ),
          );
        setLarge(raw.large === true);
      }
    } catch {
      /* Invalid demo storage starts fresh. */
    }
    setLoaded(true);
    return () => {
      window.removeEventListener("popstate", sync);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(
          STORAGE,
          JSON.stringify({ version: 1, saved, visits, large }),
        );
      } catch {
        /* Demo remains usable when storage is unavailable. */
      }
    }
  }, [loaded, saved, visits, large]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("pt-reveal-pending");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.06 },
    );
    document
      .querySelectorAll(".pt-card,.pt-assist-section,.pt-section-heading")
      .forEach((element) => {
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add("pt-reveal-pending");
          observer.observe(element);
        }
      });
    return () => {
      observer.disconnect();
      document
        .querySelectorAll(".pt-reveal-pending")
        .forEach((element) => element.classList.remove("pt-reveal-pending"));
    };
  }, [home, view, query]);
  const notify = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 4500);
  };
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "instant" });
  const navigate = (next: View) => {
    setView(next);
    setHome(null);
    history.pushState(
      null,
      "",
      next === "explore" ? "/prototype" : `/prototype?view=${next}`,
    );
    scrollTop();
  };
  const openHome = (id: string) => {
    setDialog(null);
    setHome(id);
    history.pushState(
      null,
      "",
      `/prototype?home=${id}${view !== "explore" ? `&view=${view}` : ""}`,
    );
    scrollTop();
  };
  const toggleSave = (id: string) => {
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    notify(
      saved.includes(id)
        ? "Removed from saved homes"
        : "Added to your saved homes",
    );
  };
  const toggleCompare = (id: string) => {
    if (compared.includes(id)) setCompared((c) => c.filter((x) => x !== id));
    else if (compared.length < 3) setCompared((c) => [...c, id]);
    else notify("Compare up to three homes. Remove one to add another.");
  };
  const book = (id: string, visit?: Visit) => {
    setBookingHome(id);
    setEditing(visit?.id || null);
    setDate(visit?.date || localDate(1));
    setTime(visit?.time || "11:00 AM");
    setDialog("booking");
  };
  const matched = filterProperties(query);
  const listing =
    view === "saved"
      ? properties.filter((p) => saved.includes(p.id))
      : [...matched].sort((a, b) =>
          sort === "low"
            ? a.price - b.price
            : sort === "high"
              ? b.price - a.price
              : sort === "space"
                ? b.sqft - a.sqft
                : 0,
        );
  const activeVisits = visits.filter((v) => v.status !== "Cancelled");
  const showResults = () =>
    resultsRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  return (
    <div className={`pt-app ${large ? "pt-large" : ""}`}>
      <div className="pt-demo-bar">
        <span>Meet your next home.</span>
        <span>
          Interactive prototype <i /> Sample homes, no live bookings
        </span>
      </div>
      <header className="pt-header">
        <button
          className="pt-brand"
          onClick={() => navigate("explore")}
          aria-label="Propty home"
        >
          <span className="pt-logo-crop">
            <Image
              src="/propty/logo-wordmark-original.jpg"
              width={160}
              height={113}
              alt="Propty"
              priority
            />
          </span>
          <span className="pt-backed">Backed by JCX</span>
        </button>
        <nav aria-label="Propty navigation">
          <button
            aria-current={view === "explore" && !home ? "page" : undefined}
            onClick={() => navigate("explore")}
          >
            Explore homes
          </button>
          <button
            aria-current={view === "saved" && !home ? "page" : undefined}
            onClick={() => navigate("saved")}
          >
            Saved
            {saved.length > 0 && (
              <span className="pt-count">{saved.length}</span>
            )}
          </button>
          <button
            aria-current={view === "visits" && !home ? "page" : undefined}
            onClick={() => navigate("visits")}
          >
            My visits
            {activeVisits.length > 0 && (
              <span className="pt-count">{activeVisits.length}</span>
            )}
          </button>
        </nav>
        <div className="pt-header-actions">
          <button
            className="reading-toggle"
            aria-label="Larger text"
            aria-pressed={large}
            onClick={() => setLarge((l) => !l)}
          >
            Aa
          </button>
          <button
            className="pt-advisor-button"
            onClick={() => setDialog("advisor")}
          >
            <Icon name="spark" size={17} />
            <span>Find my home</span>
          </button>
        </div>
      </header>
      <main id="main">
        {selected ? (
          <div className="pt-detail pt-container">
            <button
              className="pt-back"
              onClick={() => navigate(view === "saved" ? "saved" : "explore")}
            >
              <Icon name="back" size={17} /> Back to homes
            </button>
            <div className="pt-detail-heading">
              <div>
                <p className="pt-eyebrow">
                  {selected.area.toUpperCase()} · DHAKA
                </p>
                <h1>{selected.title}</h1>
                <p>{selected.tagline}</p>
              </div>
              <div className="pt-detail-actions">
                <button
                  className="pt-outline"
                  aria-pressed={saved.includes(selected.id)}
                  onClick={() => toggleSave(selected.id)}
                >
                  <Icon name="heart" />
                  {saved.includes(selected.id) ? "Saved" : "Save home"}
                </button>
                <button
                  className="pt-outline"
                  aria-pressed={compared.includes(selected.id)}
                  onClick={() => toggleCompare(selected.id)}
                >
                  <Icon name="compare" />
                  {compared.includes(selected.id)
                    ? "Added to comparison"
                    : "Compare"}
                </button>
              </div>
            </div>
            <div className="pt-detail-photo">
              <Image
                src={selected.images[0]}
                fill
                sizes="(max-width: 800px) 100vw, 90vw"
                alt={`Illustrative interior for ${selected.title}, not a photograph of a real listed home`}
                priority
              />
              <span>Illustrative interior · fictional sample home</span>
            </div>
            <div className="pt-detail-grid">
              <div>
                <div className="pt-detail-facts">
                  <span>
                    <strong>{selected.bedrooms}</strong> bedrooms
                  </span>
                  <span>
                    <strong>{selected.bathrooms}</strong> bathrooms
                  </span>
                  <span>
                    <strong>{selected.sqft.toLocaleString()}</strong> sq ft
                  </span>
                  <span>
                    <strong>
                      {selected.status === "Ready" ? "Ready" : "In progress"}
                    </strong>{" "}
                    sample status
                  </span>
                </div>
                <section className="pt-detail-section">
                  <h2>A little more about this home.</h2>
                  <p>{selected.description}</p>
                  <div className="pt-feature-list">
                    {selected.features.map((f) => (
                      <span key={f}>
                        <Icon name="check" size={16} />
                        {f}
                      </span>
                    ))}
                  </div>
                </section>
                <section className="pt-tradeoff">
                  <p className="pt-eyebrow">WORTH CONSIDERING</p>
                  <p>{selected.tradeoff}</p>
                </section>
                <section className="pt-detail-section">
                  <h2>Clarity before commitment.</h2>
                  <p className="pt-muted">
                    A real listing should tell you what has been checked and
                    what still needs review. Here is how that could look.
                  </p>
                  {selected.checks.map((c) => (
                    <div className="pt-check-row" key={c.label}>
                      <Icon name="shield" />
                      <div>
                        <h3>{c.label}</h3>
                        <p>{c.detail}</p>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
              <aside className="pt-booking-card">
                <p className="pt-eyebrow">SAMPLE ASKING PRICE</p>
                <h2>{formatPrice(selected.price)}</h2>
                <p>
                  Additional charges and payment terms are not established in
                  this demo.
                </p>
                <button
                  className="pt-primary pt-full"
                  onClick={() => book(selected.id)}
                >
                  Request a viewing <Icon name="arrow" />
                </button>
                <button
                  className="pt-outline pt-full"
                  onClick={() => setDialog("advisor")}
                >
                  <Icon name="spark" />
                  Help me compare my options
                </button>
                <div className="pt-booking-note">
                  <Icon name="calendar" size={18} />
                  <span>
                    Choose a preferred time. Follow your request in My visits.
                  </span>
                </div>
                <small>
                  Demo only. No agent is contacted and no real appointment is
                  booked.
                </small>
              </aside>
            </div>
          </div>
        ) : (
          <>
            {view === "explore" && (
              <>
                <section className="pt-hero pt-container">
                  <div className="pt-hero-heading">
                    <div>
                      <p className="pt-eyebrow">
                        <span className="pt-dot" /> A NEW WAY HOME, IN DHAKA
                      </p>
                      <h1>
                        A place to call
                        <br />
                        <span>your own.</span>
                      </h1>
                    </div>
                    <div className="pt-hero-intro">
                      <p>
                        Finding a home is personal. <br />
                        Let’s make it feel that way.
                      </p>
                      <button
                        className="pt-text-button"
                        onClick={() => setDialog("advisor")}
                      >
                        Not sure where to start? <Icon name="arrow" size={18} />
                      </button>
                    </div>
                  </div>
                  <form
                    className="pt-search"
                    onSubmit={(e) => {
                      e.preventDefault();
                      showResults();
                    }}
                  >
                    <label>
                      <span>Where</span>
                      <select
                        aria-label="Location"
                        value={query.area || "All"}
                        onChange={(e) =>
                          setQuery((q) => ({ ...q, area: e.target.value }))
                        }
                      >
                        <option value="All">Anywhere in Dhaka</option>
                        {propertyAreas.map((a) => (
                          <option key={a}>{a}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>Your budget</span>
                      <select
                        aria-label="Maximum budget"
                        value={query.budget || ""}
                        onChange={(e) =>
                          setQuery((q) => ({
                            ...q,
                            budget: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                          }))
                        }
                      >
                        <option value="">Any asking price</option>
                        {[15000000, 18000000, 25000000, 40000000].map((b) => (
                          <option key={b} value={b}>
                            Up to {formatPrice(b)}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>Room for you</span>
                      <select
                        aria-label="Minimum bedrooms"
                        value={query.bedrooms || ""}
                        onChange={(e) =>
                          setQuery((q) => ({
                            ...q,
                            bedrooms: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                          }))
                        }
                      >
                        <option value="">Any bedrooms</option>
                        {[2, 3, 4].map((b) => (
                          <option key={b} value={b}>
                            {b}+ bedrooms
                          </option>
                        ))}
                      </select>
                    </label>
                    <button className="pt-search-submit" type="submit">
                      <Icon name="search" />
                      <span>Find a home</span>
                    </button>
                  </form>
                  <div className="pt-hero-image">
                    <Image
                      src="/propty/hero.jpg"
                      alt="An airy contemporary living room opening onto a green courtyard, an illustrative home interior"
                      fill
                      sizes="100vw"
                      priority
                    />
                    <div className="pt-hero-overlay">
                      <span>HERE AND NOW.</span>
                      <p>
                        Room for your
                        <br />
                        next chapter.
                      </p>
                    </div>
                    <span className="pt-hero-caption">
                      A little inspiration. An illustrative interior.
                    </span>
                  </div>
                  <div className="pt-hero-foot">
                    <p>A clearer way to find, compare and choose.</p>
                    <span>
                      01 / EXPLORE WHAT’S POSSIBLE{" "}
                      <Icon name="arrow" size={16} />
                    </span>
                  </div>
                </section>
              </>
            )}
            {(view === "explore" || view === "saved") && (
              <section
                className="pt-listings pt-container"
                id="homes"
                ref={resultsRef}
              >
                <div className="pt-section-heading">
                  <div>
                    <p className="pt-eyebrow">
                      {view === "saved"
                        ? "YOUR PERSONAL SHORTLIST"
                        : "FIND YOUR KIND OF PLACE"}
                    </p>
                    {view === "saved" ? (
                      <h1>Worth coming back to.</h1>
                    ) : (
                      <h2>
                        Different homes.
                        <br className="pt-mobile-only" /> Different
                        possibilities.
                      </h2>
                    )}
                    <p className="pt-muted">
                      {view === "saved"
                        ? "The homes you like, all in one place. Saved on this device."
                        : "Six sample homes. A first look at a more thoughtful search."}
                    </p>
                  </div>
                  {view === "explore" && (
                    <label className="pt-sort">
                      <span>Sort by</span>
                      <select
                        aria-label="Sort homes"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                      >
                        <option value="featured">Featured</option>
                        <option value="low">Price: low to high</option>
                        <option value="high">Price: high to low</option>
                        <option value="space">Most space</option>
                      </select>
                    </label>
                  )}
                </div>
                {view === "explore" && (
                  <div className="pt-filters">
                    <div className="pt-area-chips">
                      {["All", ...propertyAreas].map((a) => (
                        <button
                          key={a}
                          aria-pressed={(query.area || "All") === a}
                          onClick={() => setQuery((q) => ({ ...q, area: a }))}
                        >
                          {a === "All" ? "All areas" : a}
                        </button>
                      ))}
                    </div>
                    <label className="pt-ready">
                      <input
                        type="checkbox"
                        checked={!!query.readyOnly}
                        onChange={(e) =>
                          setQuery((q) => ({
                            ...q,
                            readyOnly: e.target.checked,
                          }))
                        }
                      />
                      Ready homes only
                    </label>
                  </div>
                )}
                <div className="pt-result-meta">
                  <span>
                    {listing.length} {listing.length === 1 ? "home" : "homes"}
                    {query.budget && view === "explore"
                      ? ` · up to ${formatPrice(query.budget)}`
                      : ""}
                    {query.bedrooms && view === "explore"
                      ? ` · ${query.bedrooms}+ bedrooms`
                      : ""}
                  </span>
                  {view === "explore" && Object.values(query).some(Boolean) && (
                    <button onClick={() => setQuery({})}>Clear filters</button>
                  )}
                </div>
                {listing.length ? (
                  <div className="pt-card-grid">
                    {listing.map((p) => (
                      <HomeCard
                        key={p.id}
                        property={p}
                        saved={saved.includes(p.id)}
                        compared={compared.includes(p.id)}
                        onOpen={() => openHome(p.id)}
                        onSave={() => toggleSave(p.id)}
                        onCompare={() => toggleCompare(p.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="pt-empty">
                    <Icon
                      name={view === "saved" ? "heart" : "search"}
                      size={34}
                    />
                    <h3>
                      {view === "saved"
                        ? "Your next home could be here."
                        : "A little room to rethink."}
                    </h3>
                    <p>
                      {view === "saved"
                        ? "Tap the heart on a home to keep it here."
                        : "No sample homes match these filters. Try another area or a more flexible budget."}
                    </p>
                    <button
                      className="pt-primary"
                      onClick={() => {
                        setQuery({});
                        navigate("explore");
                      }}
                    >
                      Explore all homes <Icon name="arrow" />
                    </button>
                  </div>
                )}
              </section>
            )}
            {view === "explore" && (
              <section className="pt-assist-section pt-container">
                <div className="pt-assist-image">
                  <Image
                    src="/propty/home-3.jpg"
                    fill
                    sizes="(max-width: 700px) 100vw, 45vw"
                    alt="Illustrative calm, naturally lit apartment interior"
                  />
                  <span>More than a list of places.</span>
                </div>
                <div className="pt-assist-copy">
                  <div className="pt-ai-mark">
                    <Icon name="spark" size={26} />
                  </div>
                  <p className="pt-eyebrow">
                    A LITTLE GUIDANCE GOES A LONG WAY
                  </p>
                  <h2>
                    You know your life.
                    <br />
                    Let’s find the home.
                  </h2>
                  <p>
                    Tell us what matters. We’ll help you narrow the options and
                    see the trade-offs, one clear step at a time.
                  </p>
                  <button
                    className="pt-primary"
                    onClick={() => setDialog("advisor")}
                  >
                    Build my shortlist <Icon name="arrow" />
                  </button>
                  <small>Try our guided AI preview. No sign-up needed.</small>
                </div>
              </section>
            )}
            {(view === "visits" || view === "team") && (
              <section className="pt-visits pt-container">
                <p className="pt-eyebrow">
                  {view === "team"
                    ? "BEHIND THE EXPERIENCE · TEAM DEMO"
                    : "THE NEXT STEP, AT YOUR PACE"}
                </p>
                <h1>
                  {view === "team"
                    ? "A clear handoff."
                    : "Make yourself at home."}
                </h1>
                <p className="pt-muted">
                  {view === "team"
                    ? "The same requests, organised for a sample service team. No external agent receives them."
                    : "Your preferred viewing times, together in one place. Requests here stay inside this demo."}
                </p>
                {view === "team" && (
                  <div className="pt-team-summary">
                    <div>
                      <strong>{activeVisits.length}</strong>
                      <span>Active requests</span>
                    </div>
                    <div>
                      <strong>
                        {visits.filter((v) => v.status === "Requested").length}
                      </strong>
                      <span>Awaiting review</span>
                    </div>
                    <div>
                      <strong>{saved.length}</strong>
                      <span>Saved homes</span>
                    </div>
                  </div>
                )}
                {view === "team" && brief && (
                  <div className="pt-brief">
                    <strong>Latest buyer brief</strong>
                    <span>
                      {brief.area === "All" ? "Any area" : brief.area}
                    </span>
                    <span>Up to {formatPrice(brief.budget || 0)}</span>
                    <span>{brief.bedrooms}+ bedrooms</span>
                  </div>
                )}
                {visits.length ? (
                  <div className="pt-visit-list">
                    {[...visits].reverse().map((v) => {
                      const p = getProperty(v.propertyId);
                      return (
                        <article className="pt-visit" key={v.id}>
                          <button
                            className="pt-visit-photo"
                            onClick={() => openHome(p.id)}
                            aria-label={`View ${p.title}`}
                          >
                            <Image
                              src={p.images[0]}
                              fill
                              sizes="180px"
                              alt={`Illustrative interior for ${p.title}`}
                            />
                          </button>
                          <div className="pt-visit-info">
                            <span
                              className={`pt-status ${v.status === "Cancelled" ? "pt-status-cancelled" : ""}`}
                            >
                              {v.status} · demo
                            </span>
                            <h2>{p.title}</h2>
                            <p>
                              {p.area} · {prettyDate(v.date)} · {v.time}
                            </p>
                            <small>
                              {v.status === "Cancelled"
                                ? "This demo request is cancelled."
                                : "Preferred time only. This is not a confirmed appointment."}
                            </small>
                          </div>
                          <div className="pt-visit-actions">
                            {v.status !== "Cancelled" && (
                              <>
                                {view === "team" &&
                                  v.status === "Requested" && (
                                    <button
                                      className="pt-primary"
                                      onClick={() => {
                                        setVisits((all) =>
                                          all.map((x) =>
                                            x.id === v.id
                                              ? { ...x, status: "Reviewed" }
                                              : x,
                                          ),
                                        );
                                        notify(
                                          "Marked as reviewed in the demo. No appointment is confirmed.",
                                        );
                                      }}
                                    >
                                      Mark reviewed
                                    </button>
                                  )}
                                <button
                                  className="pt-outline"
                                  onClick={() => book(p.id, v)}
                                >
                                  Change time
                                </button>
                                <button
                                  className="pt-text-button"
                                  onClick={() => {
                                    setVisits((all) =>
                                      all.map((x) =>
                                        x.id === v.id
                                          ? { ...x, status: "Cancelled" }
                                          : x,
                                      ),
                                    );
                                    notify("Demo viewing request cancelled");
                                  }}
                                >
                                  Cancel request
                                </button>
                              </>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="pt-empty">
                    <Icon name="calendar" size={38} />
                    <h2>It starts with a home you like.</h2>
                    <p>
                      Open any home and choose “Request a viewing” to try the
                      full journey.
                    </p>
                    <button
                      className="pt-primary"
                      onClick={() => navigate("explore")}
                    >
                      Find a home <Icon name="arrow" />
                    </button>
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </main>
      <footer className="pt-footer pt-container">
        <div className="pt-footer-top">
          <div>
            <span className="pt-logo-crop">
              <Image
                src="/propty/logo-wordmark-original.jpg"
                width={160}
                height={113}
                alt="Propty"
              />
            </span>
            <p>
              Here and now.
              <br />
              <span>Backed by JCX.</span>
            </p>
          </div>
          <div>
            <p>
              A little closer to
              <br />
              somewhere you belong.
            </p>
            <button
              className="pt-text-button"
              onClick={() => {
                navigate("explore");
              }}
            >
              Explore homes <Icon name="arrow" />
            </button>
          </div>
        </div>
        <div className="pt-footer-bottom">
          <p>{DEMO_NOTICE}</p>
          <div>
            <button onClick={() => navigate("team")}>Team demo</button>
            <a href="/">Research atlas</a>
            <a href="/propty/ASSET_SOURCES.md" target="_blank" rel="noreferrer">
              Photo credits
            </a>
            <button onClick={() => setDialog("reset")}>Reset demo</button>
          </div>
        </div>
      </footer>
      {compared.length > 0 && (
        <div className="pt-compare-tray">
          <div className="pt-compare-thumbs">
            {compared.map((id) => (
              <button
                key={id}
                aria-label={`Remove ${getProperty(id).title} from comparison`}
                onClick={() => toggleCompare(id)}
              >
                <Image
                  src={getProperty(id).images[0]}
                  width={44}
                  height={44}
                  alt=""
                />
                <span>×</span>
              </button>
            ))}
          </div>
          <span>{compared.length} of 3 homes</span>
          <button
            className="pt-primary"
            disabled={compared.length < 2}
            onClick={() => setDialog("compare")}
          >
            Compare <Icon name="arrow" size={16} />
          </button>
          <button
            className="pt-icon-button"
            aria-label="Clear comparison"
            onClick={() => setCompared([])}
          >
            <Icon name="close" size={17} />
          </button>
        </div>
      )}
      <div
        className={`pt-toast ${toast ? "pt-toast-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <Icon name="check" size={17} />
            {toast}
          </>
        )}
      </div>
      {dialog === "advisor" && (
        <Modal
          title="A home that feels like you."
          onClose={() => setDialog(null)}
        >
          <Advisor
            onOpen={openHome}
            onApply={(q) => {
              setBrief(q);
              setQuery(q);
              setView("explore");
              setHome(null);
              history.pushState(null, "", "/prototype");
              setDialog(null);
              requestAnimationFrame(() =>
                resultsRef.current?.scrollIntoView({ behavior: "instant" }),
              );
              notify("Your shortlist is ready");
            }}
          />
        </Modal>
      )}
      {dialog === "compare" && (
        <Modal
          title="A little perspective helps."
          wide
          onClose={() => setDialog(null)}
        >
          <p className="pt-muted">
            Compare the things that matter. All figures below are sample data.
          </p>
          <p className="pt-comparison-hint">
            Swipe sideways to compare every home.
          </p>
          <div
            className="pt-comparison-scroll"
            tabIndex={0}
            role="region"
            aria-label="Scrollable home comparison"
          >
            <table className="pt-comparison">
              <caption className="pt-sr-only">
                Comparison of selected sample homes
              </caption>
              <thead>
                <tr>
                  <th scope="col">Your shortlist</th>
                  {compared.map((id) => (
                    <th scope="col" key={id}>
                      <Image
                        src={getProperty(id).images[0]}
                        width={240}
                        height={150}
                        alt={`Illustrative interior for ${getProperty(id).title}`}
                      />
                      <button onClick={() => openHome(id)}>
                        {getProperty(id).title}
                        <Icon name="arrow" size={15} />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Asking price", (p: Property) => formatPrice(p.price)],
                  ["Neighbourhood", (p: Property) => p.area],
                  [
                    "Bedrooms / bathrooms",
                    (p: Property) =>
                      `${p.bedrooms} beds · ${p.bathrooms} baths`,
                  ],
                  [
                    "Floor space",
                    (p: Property) => `${p.sqft.toLocaleString()} sq ft`,
                  ],
                  ["Sample status", (p: Property) => p.status],
                  [
                    "Included features",
                    (p: Property) => p.features.join(" · "),
                  ],
                  ["Worth considering", (p: Property) => p.tradeoff],
                ].map(([label, value]) => (
                  <tr key={label as string}>
                    <th scope="row">{label as string}</th>
                    {compared.map((id) => (
                      <td key={id}>
                        {(value as (p: Property) => string)(getProperty(id))}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row">Document review</th>
                  {compared.map((id) => (
                    <td key={id}>Not performed. Sample listing only.</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      )}
      {dialog === "booking" && (
        <Modal
          title={editing ? "Find a better time." : "Come a little closer."}
          onClose={() => setDialog(null)}
        >
          <div className="pt-booking-preview">
            <Image
              src={getProperty(bookingHome).images[0]}
              width={90}
              height={76}
              alt="Illustrative home interior"
            />
            <div>
              <strong>{getProperty(bookingHome).title}</strong>
              <p>{getProperty(bookingHome).area}, Dhaka</p>
            </div>
          </div>
          <p className="pt-muted">
            Choose a preferred viewing time. This saves a request inside the
            demo, without contacting anyone.
          </p>
          <form
            className="pt-booking-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!date || date < localDate(1)) {
                notify("Please choose tomorrow or a later date.");
                return;
              }
              if (editing)
                setVisits((vs) =>
                  vs.map((v) =>
                    v.id === editing
                      ? { ...v, date, time, status: "Requested" }
                      : v,
                  ),
                );
              else
                setVisits((vs) => [
                  ...vs,
                  {
                    id: crypto.randomUUID(),
                    propertyId: bookingHome,
                    date,
                    time,
                    status: "Requested",
                  },
                ]);
              setDialog(null);
              navigate("visits");
              notify(
                editing
                  ? "Your demo request has been updated"
                  : "Viewing request saved. No real appointment has been booked.",
              );
            }}
          >
            <label>
              Preferred date
              <input
                type="date"
                required
                min={localDate(1)}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label>
              Preferred time
              <select value={time} onChange={(e) => setTime(e.target.value)}>
                {["11:00 AM", "2:00 PM", "4:00 PM"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <div className="pt-brief">
              <Icon name="shield" size={20} />
              <span>Demo buyer · no personal details required</span>
            </div>
            <button className="pt-primary pt-full" type="submit">
              {editing ? "Update demo request" : "Save viewing request"}
              <Icon name="arrow" />
            </button>
            <small>
              These times are preferences, not verified appointment slots.
            </small>
          </form>
        </Modal>
      )}
      {dialog === "reset" && (
        <Modal
          title="Start with a clean slate?"
          onClose={() => setDialog(null)}
        >
          <p>
            Your saved homes and viewing requests on this device will be
            cleared. The research website will not be affected.
          </p>
          <button
            className="pt-primary pt-full"
            onClick={() => {
              setSaved([]);
              setVisits([]);
              setCompared([]);
              setBrief(null);
              setQuery({});
              setDialog(null);
              navigate("explore");
              notify("Demo reset. Ready for a fresh start.");
            }}
          >
            Reset this demo
          </button>
        </Modal>
      )}
    </div>
  );
}
