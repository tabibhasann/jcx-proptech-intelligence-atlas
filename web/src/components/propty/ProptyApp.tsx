"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  DEMO_NOTICE,
  filterProperties,
  formatPrice,
  formatPropertyPrice,
  getTransaction,
  properties,
  propertyAreas,
  type Property,
  type PropertyQuery,
} from "@/content/propty-demo";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import { Advisor } from "./Advisor";
import { CompareHomes } from "./CompareHomes";
import { SearchHero } from "./SearchHero";
import { PropertyGallery } from "./PropertyGallery";
import { ProptyBrand, JcxBrand } from "./Brand";
import { ProductHeader, type ProductDestination } from "./ProductHeader";
import { parseHomeSearch, matchesHomeText } from "@/content/propty-search";
import { getCloseMatches } from "@/content/propty-matches";

type View = "explore" | "saved" | "visits" | "team" | "compare";
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
  matchNotes,
}: {
  property: Property;
  saved: boolean;
  compared: boolean;
  onOpen: () => void;
  onSave: () => void;
  onCompare: () => void;
  matchNotes?: { matched: string[]; differences: string[] };
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
        <span className="pt-image-tag">{getTransaction(p) === "rent" ? "For rent" : p.status}</span>
        <button
          className={`pt-save ${saved ? "is-saved" : ""}`}
          aria-label={`${saved ? "Unsave" : "Save"} ${p.title}`}
          aria-pressed={saved}
          onClick={onSave}
        >
          <Icon name="heart" size={19} />
        </button>
      </div>
      <div className="pt-card-content">
        {matchNotes && (
          <div className="pt-match-note">
            <p>{matchNotes.differences.join(" · ")}</p>
            {matchNotes.matched.length > 0 && <small>{matchNotes.matched.join(" · ")}</small>}
          </div>
        )}
        <div className="pt-card-top">
          <span>{p.area}, Dhaka</span>
        </div>
        <button className="pt-card-title" onClick={onOpen}>
          {p.title}
        </button>
        <div className="pt-facts">
          <span>
            <Icon name="bed" size={17} />
            {p.bedrooms} beds
          </span>
          <span>
            {p.bathrooms} {p.bathrooms === 1 ? "bath" : "baths"}
          </span>
          <span>{p.sqft.toLocaleString()} sq ft</span>
        </div>
        <div className="pt-card-bottom">
          <strong>{formatPropertyPrice(p)}</strong>
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
  const [query, setQuery] = useState<PropertyQuery>({transaction:"buy"});
  const [sort, setSort] = useState("featured");
  const [collectionPage, setCollectionPage] = useState({ key: "", count: 9 });
  const [searchText, setSearchText] = useState("");
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [submittedText, setSubmittedText] = useState("");
  const [searchBusy, setSearchBusy] = useState(false);
  const [searchNote, setSearchNote] = useState("");
  const [unsupported, setUnsupported] = useState<string[]>([]);
  const searchRequest = useRef<AbortController | null>(null);
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
        next === "saved" || next === "visits" || next === "team" || next === "compare"
          ? next
          : "explore",
      );
      setQuery({transaction:params.get("mode")==="rent"?"rent":"buy",newProjectsOnly:params.get("projects")==="1"});
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
      }
    } catch {
      /* Invalid demo storage starts fresh. */
    }
    setLoaded(true);
    return () => {
      window.removeEventListener("popstate", sync);
      searchRequest.current?.abort();
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(
          STORAGE,
          JSON.stringify({ version: 1, saved, visits }),
        );
      } catch {
        /* Demo remains usable when storage is unavailable. */
      }
    }
  }, [loaded, saved, visits]);
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
    searchRequest.current?.abort();
    setSearchBusy(false);
    setView(next);
    setHome(null);
    history.pushState(
      null,
      "",
      `/prototype?mode=${query.transaction || "buy"}${next !== "explore" ? `&view=${next}` : query.newProjectsOnly ? "&projects=1" : ""}`,
    );
    scrollTop();
  };
  const openHome = (id: string) => {
    searchRequest.current?.abort();
    setSearchBusy(false);
    setDialog(null);
    setHome(id);
    history.pushState(
      null,
      "",
      `/prototype?home=${id}&mode=${getTransaction(getProperty(id))}${view !== "explore" ? `&view=${view}` : query.newProjectsOnly ? "&projects=1" : ""}`,
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
    if (compared.length && getTransaction(getProperty(compared[0])) !== getTransaction(getProperty(id))) {
      notify("Compare buying and renting separately. Clear your comparison to switch.");
      return;
    }
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
  const matched = unsupported.length
    ? []
    : filterProperties(query).filter((p) => matchesHomeText(p, searchTerms));
  const listing =
    view === "saved"
      ? properties.filter((p) => saved.includes(p.id))
      : view === "compare" ? filterProperties({transaction:query.transaction || "buy"})
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
  const closeMatches = view === "explore" && matched.length < 3 ? getCloseMatches(query, searchTerms, unsupported) : [];
  const collectionKey = JSON.stringify([
    view,
    query,
    sort,
    searchTerms,
    unsupported,
  ]);
  const visibleCount =
    collectionPage.key === collectionKey ? collectionPage.count : 9;
  const showResults = () =>
    resultsRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  const runSearch = async (text: string, reset = false) => {
    searchRequest.current?.abort();
    const controller = new AbortController();
    searchRequest.current = controller;
    let parsed = { ...parseHomeSearch(text), unsupported: [] as string[] };
    setSearchBusy(!!text.trim());
    setSearchNote("");
    let note = "";
    if (text.trim()) {
      try {
        const response = await fetch("/api/propty/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, transaction: query.transaction || "buy" }),
          signal: AbortSignal.any([
            controller.signal,
            AbortSignal.timeout(16000),
          ]),
        });
        if (!response.ok) throw new Error("Search unavailable");
        const result = await response.json();
        if (
          !result.query ||
          !Array.isArray(result.terms) ||
          !Array.isArray(result.unsupported)
        )
          throw new Error("Invalid response");
        parsed = result;
      } catch {
        if (controller.signal.aborted) return;
        note =
          "Smart search is unavailable. Showing standard keyword and filter matches.";
      }
    }
    if (controller.signal.aborted) return;
    const nextTransaction = parsed.query.transaction || query.transaction || "buy";
    if (nextTransaction !== (query.transaction || "buy")) {
      note = `Switched to ${nextTransaction === "rent" ? "Rent" : "Buy"} to match your request.`;
      setCompared([]);
    }
    setQuery((q) => ({ ...(reset || nextTransaction !== (q.transaction || "buy") ? {} : q), ...parsed.query, transaction:nextTransaction }));
    history.replaceState(null,"",`/prototype?mode=${nextTransaction}`);
    setSearchTerms(parsed.terms);
    setUnsupported(parsed.unsupported);
    setSubmittedText(text.trim());
    setSearchNote(note);
    setSearchBusy(false);
    requestAnimationFrame(showResults);
  };
  const clearSearch = () => {
    searchRequest.current?.abort();
    setSearchBusy(false);
    setQuery({transaction:query.transaction || "buy"});
    setSearchText("");
    setSearchTerms([]);
    setSubmittedText("");
    setUnsupported([]);
    setSearchNote("");
  };
  const switchTransaction = (transaction:"buy"|"rent", projects=false) => {
    clearSearch();
    setQuery({transaction,newProjectsOnly:projects});
    setCompared([]);
    setBrief(null);
    setHome(null);
    setView("explore");
    history.pushState(null,"",`/prototype?mode=${transaction}${projects?"&projects=1":""}`);
    scrollTop();
    if(projects) requestAnimationFrame(showResults);
  };
  const navActive:ProductDestination|undefined = home ? undefined : view==="explore" ? query.newProjectsOnly?"projects":query.transaction||"buy" : view==="team"?undefined:view;
  return (
    <div className="pt-app">
      <ProductHeader active={navActive} savedCount={saved.length} onHelp={()=>setDialog("advisor")} onNavigate={(destination)=>{
        if(destination==="buy"||destination==="rent") switchTransaction(destination);
        else if(destination==="projects") switchTransaction("buy",true);
        else navigate(destination);
      }}/>
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
                <h1>{selected.title}</h1>
                <p>
                  <Icon name="pin" size={16} />
                  {selected.area}, Dhaka{" "}
                  <span className="pt-detail-separator">·</span>{" "}
                  {selected.sqft.toLocaleString()} sq ft{" "}
                  <span className="pt-detail-separator">·</span>{" "}
                  {selected.bedrooms} bedrooms
                </p>
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
            <div className="pt-detail-lead">
              <PropertyGallery key={selected.id} property={selected} />
            </div>
            <div className="pt-detail-grid">
              <div className="pt-detail-body">
                <div className="pt-detail-facts">
                  <span>
                    <strong>{selected.bedrooms}</strong>bedrooms
                  </span>
                  <span>
                    <strong>{selected.bathrooms}</strong>
                    {selected.bathrooms === 1 ? "bathroom" : "bathrooms"}
                  </span>
                  <span>
                    <strong>{selected.sqft.toLocaleString()}</strong>sq ft
                  </span>
                  <span>
                    <strong>
                      {selected.status === "Under construction"
                        ? "In progress"
                        : selected.status}
                    </strong>
                    {getTransaction(selected)==="rent"?"building status":"completion"}
                  </span>
                </div>
                <section className="pt-detail-section">
                  <h2>About this home</h2>
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
                {selected.rental && <section className="pt-detail-section">
                  <h2>Rental details</h2>
                  <dl className="pt-rental-details">
                    <div><dt>Furnishing</dt><dd>{selected.rental.furnishing}</dd></div>
                    <div><dt>Available from</dt><dd>{prettyDate(selected.rental.availableFrom)}</dd></div>
                    <div><dt>Monthly service charge</dt><dd>{selected.rental.serviceCharge===null?"Not specified":`BDT ${selected.rental.serviceCharge.toLocaleString()}`}</dd></div>
                    <div><dt>Security deposit</dt><dd>{selected.rental.deposit===null?"Not specified":`BDT ${selected.rental.deposit.toLocaleString()}`}</dd></div>
                  </dl>
                </section>}
                <section className="pt-tradeoff">
                  <p className="pt-eyebrow">WORTH CONSIDERING</p>
                  <p>{selected.tradeoff}</p>
                </section>
                <section className="pt-detail-section">
                  <h2>What has been checked?</h2>
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
              <aside className="pt-detail-summary">
                <p className="pt-eyebrow">{getTransaction(selected)==="rent"?"MONTHLY RENT":"ASKING PRICE"}</p>
                <h2>{formatPropertyPrice(selected)}</h2>
                <p className="pt-unit-price">
                  BDT{" "}
                  {Math.round(selected.price / selected.sqft).toLocaleString()}{" "}
                  / sq ft{getTransaction(selected)==="rent"?" / month":""}
                </p>
                <p className="pt-summary-description">{selected.tagline}</p>
                <button
                  className="pt-primary pt-full"
                  onClick={() => book(selected.id)}
                >
                  Request a viewing <Icon name="arrow" size={17} />
                </button>
                <small className="pt-summary-disclosure">
                  Demo request only. No real appointment is booked. {selected.rental?"Rent excludes any separately stated service charge. Unspecified costs need confirmation.":"Additional charges are not established."}
                </small>
              </aside>
            </div>
          </div>
        ) : (
          <>
            {view === "explore" && (
              <SearchHero
                text={searchText}
                onText={(text) => {
                  searchRequest.current?.abort();
                  setSearchBusy(false);
                  setSearchText(text);
                }}
                query={query}
                onTransactionChange={switchTransaction}
                onQuery={(q) => {
                  searchRequest.current?.abort();
                  setSearchBusy(false);
                  setQuery(q);
                }}
                busy={searchBusy}
                onSearch={runSearch}
              />
            )}
            {(view === "explore" || view === "saved" || view === "compare") && (
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
                        : "THE COLLECTION"}
                    </p>
                    {view === "compare" ? <h1>See the differences.</h1> : view === "saved" ? (
                      <h1>Your saved homes</h1>
                    ) : (
                      <h2>
                        {query.newProjectsOnly ? "New projects" : submittedText
                          ? "Homes for your search"
                          : query.transaction==="rent" ? "Find your next rental" : "Find a home that feels right"}
                      </h2>
                    )}
                    <p className="pt-muted">
                      {view === "compare" ? "Choose two or three homes of the same type. Compare the space, price and details that matter." : view === "saved"
                        ? "The homes you like, all in one place. Saved on this device."
                        : query.newProjectsOnly ? "Under-construction homes in our sample collection. Handover dates and developer details require confirmation." : "Find your next home in Dhaka’s neighbourhoods."}
                    </p>
                  </div>
                </div>
                {view==="compare" && <div className="pt-compare-workspace">
                  <div className="pt-compare-type"><button aria-pressed={query.transaction!=="rent"} onClick={()=>{setQuery({transaction:"buy"});setCompared([]);}}>Buy</button><button aria-pressed={query.transaction==="rent"} onClick={()=>{setQuery({transaction:"rent"});setCompared([]);}}>Rent</button>{compared.length>0&&<button onClick={()=>setCompared([])}>Clear selection</button>}</div>
                  {compared.length>=2 && <CompareHomes homes={compared.map(getProperty)} onOpen={openHome}/>}
                  <p className="pt-muted">{compared.length} of 3 selected. Use Compare on the homes below.</p>
                </div>}
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
                    <div className="pt-filter-tools">
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
                        {query.transaction==="rent"?"Ready buildings only":"Ready homes only"}
                      </label>
                      <label className="pt-sort">
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
                    </div>
                  </div>
                )}
                {view === "explore" && submittedText && (
                  <div className="pt-search-receipt">
                    <Icon name="search" size={18} />
                    <span>“{submittedText}”</span>
                    {searchNote && <small>{searchNote}</small>}
                  </div>
                )}
                <div className="pt-result-meta" aria-live="polite">
                  <span>
                    {listing.length} {listing.length === 1 ? "home" : "homes"}
                    {query.budget && view === "explore"
                      ? ` · up to ${query.transaction==="rent"?`BDT ${query.budget.toLocaleString()}/month`:formatPrice(query.budget)}`
                      : ""}
                    {query.bedrooms && view === "explore"
                      ? ` · ${query.bedrooms}+ bedrooms`
                      : ""}
                  </span>
                  {view === "explore" &&
                    (Object.entries(query).some(([key, value]) => key !== "transaction" && (Array.isArray(value) ? value.length > 0 : Boolean(value))) || submittedText) && (
                      <button onClick={clearSearch}>Clear search</button>
                    )}
                </div>
                {listing.length ? (
                  <div className="pt-card-grid">
                    {listing.slice(0, visibleCount).map((p) => (
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
                        ? "Keep the homes you like"
                        : "No homes match this search"}
                    </h3>
                    <p>
                      {view === "saved"
                        ? "Tap the heart on a home to keep it here."
                        : unsupported.length
                          ? `We cannot check these requirements in this collection: ${unsupported.join(", ")}. Try a search using area, price, bedrooms or listed features.`
                          : "Try a different area, adjust the budget or remove a keyword."}
                    </p>
                    <button
                      className="pt-primary"
                      onClick={() => {
                        clearSearch();
                        navigate("explore");
                      }}
                    >
                      Explore all homes <Icon name="arrow" />
                    </button>
                  </div>
                )}
                {listing.length > visibleCount && (
                  <div className="pt-collection-more">
                    <p>
                      Showing {visibleCount} of {listing.length} homes
                    </p>
                    <button
                      className="pt-outline"
                      onClick={() =>
                        setCollectionPage({
                          key: collectionKey,
                          count: visibleCount + 9,
                        })
                      }
                    >
                      Show more homes
                    </button>
                  </div>
                )}
                {closeMatches.length > 0 && (
                  <section className="pt-close-matches" aria-labelledby="close-matches-title">
                    <h3 id="close-matches-title">Close matches, with one difference</h3>
                    <p>Your search stays unchanged. These alternatives are worth a look if you can be flexible.</p>
                    <div className="pt-card-grid">
                      {closeMatches.map(({property: p, matched, differences}) => (
                        <HomeCard key={p.id} property={p} saved={saved.includes(p.id)} compared={compared.includes(p.id)} onOpen={() => openHome(p.id)} onSave={() => toggleSave(p.id)} onCompare={() => toggleCompare(p.id)} matchNotes={{matched, differences}} />
                      ))}
                    </div>
                  </section>
                )}
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
                    ? "Viewing requests"
                    : "Your viewing requests"}
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
                    <strong>Latest home brief</strong>
                    <span>
                      {brief.area === "All" ? "Any area" : brief.area}
                    </span>
                    <span>{brief.budget ? `Up to ${brief.transaction === "rent" ? `BDT ${brief.budget.toLocaleString()} / month` : formatPrice(brief.budget)}` : "Flexible budget"}</span>
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
        {!selected && view === "explore" && (
          <section
            className="pt-shortlist-story pt-container"
            aria-labelledby="shortlist-title"
          >
            <div className="pt-shortlist-image">
              <Image
                src="/propty/home-3.jpg"
                alt="A welcoming living room with a light sofa and teal cushions"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
              />
            </div>
            <div className="pt-shortlist-copy">
              <p className="pt-eyebrow">A LITTLE GUIDANCE GOES A LONG WAY</p>
              <h2 id="shortlist-title">
                You know your life.
                <br />
                Let’s find the home.
              </h2>
              <p>
                Tell us what matters. We’ll help you narrow the options, one
                clear step at a time.
              </p>
              <button
                className="pt-primary"
                onClick={() => setDialog("advisor")}
              >
                Build my shortlist
              </button>
            </div>
          </section>
        )}
      </main>
      <footer className="pt-footer pt-container">
        <div className="pt-footer-top">
          <div>
            <ProptyBrand />
            <p>
              Here and now.
              <br />
              <span>A home for your next chapter in Dhaka.</span>
            </p>
          </div>
          <div>
            <JcxBrand />
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
        <Modal title="Let’s narrow it down" onClose={() => setDialog(null)}>
          <Advisor
            transaction={query.transaction || "buy"}
            onOpen={openHome}
            onApply={(q) => {
              clearSearch();
              setBrief(q);
              setQuery(q);
              setSearchText("");
              setSearchTerms([]);
              setSubmittedText("");
              setView("explore");
              setHome(null);
              history.pushState(null, "", `/prototype?mode=${q.transaction || "buy"}`);
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
          title="Your homes, side by side"
          wide
          variant="compare"
          onClose={() => setDialog(null)}
        >
          <CompareHomes homes={compared.map(getProperty)} onOpen={openHome} />
        </Modal>
      )}
      {dialog === "booking" && (
        <Modal
          title={editing ? "Change your preferred time" : "Request a viewing"}
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
              clearSearch();
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
