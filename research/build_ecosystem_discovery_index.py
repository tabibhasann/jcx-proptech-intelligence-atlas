#!/usr/bin/env python3
"""Build a reproducible, official-source discovery index for built-environment ecosystems.

This intentionally creates a discovery layer, not an evidence-qualified recommendation
set. Portfolio membership is recorded as a source fact and is never treated as validation.
"""

from __future__ import annotations

import csv
import re
from collections import Counter, defaultdict
from datetime import date
from html import unescape
from pathlib import Path
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "research" / "built_environment_ecosystem_discovery_index.csv"
MD = ROOT / "research" / "built_environment_ecosystem_discovery_index.md"
TODAY = str(date.today())
HEADERS = {"User-Agent": "Mozilla/5.0 (JCX research; official-source discovery index)"}

FIELDS = [
    "ecosystem", "ecosystem_type", "company_name", "company_url",
    "official_source_url", "source_page_type", "source_capture_date",
    "status", "status_note", "region", "category", "official_description",
    "discovery_only", "name_source",
]

rows: list[dict[str, str]] = []


def get(url: str) -> BeautifulSoup:
    r = requests.get(url, headers=HEADERS, timeout=40)
    r.raise_for_status()
    # Parse response bytes so BeautifulSoup can honor the page's declared
    # encoding; relying on requests' ISO-8859 fallback corrupts symbols such as
    # CO₂ and degree marks on some Framer/Webflow pages.
    return BeautifulSoup(r.content, "html.parser")


def clean(text: str | None) -> str:
    value = unescape(text or "")
    for invisible in ("\u200b", "\u200c", "\u200d", "\ufeff"):
        value = value.replace(invisible, "")
    return " ".join(value.split())


def add(**kwargs: str) -> None:
    row = {f: "" for f in FIELDS}
    row.update(kwargs)
    row["source_capture_date"] = row.get("source_capture_date") or TODAY
    row["discovery_only"] = "true"
    rows.append(row)


def domain_name(url: str) -> str:
    """Conservative display-name fallback when the official tile is logo-only."""
    url_overrides = {
        "https://construction.autodesk.com/products/buildingconnected/": "BuildingConnected",
        "https://construction.autodesk.com/products/buildingconnected": "BuildingConnected",
    }
    if url in url_overrides:
        return url_overrides[url]
    p = urlparse(url)
    host = p.netloc.lower().removeprefix("www.")
    overrides = {
        "get100.com": "100", "actuate.ai": "Actuate", "adaptis.ai": "Adaptis",
        "advocate.app": "Advocate", "afterlifeag.com": "AfterLife Ag",
        "airworks.io": "Airworks", "aldoa.com": "Aldoa", "appraisify.com": "Appraisify",
        "alphaa.io": "Alphaa", "asuene.com": "Asuene", "atease.io": "At Ease",
        "atcresearch.co": "ATC Research", "attentive.com": "Attentive", "avail.com": "Avail",
        "multivista.com": "Multivista", "nearmap.com": "Betterview", "billyforinsurance.com": "Billy",
        "bizly.com": "Bizly", "bp.com": "Blueprint Power", "snapdocs.com": "Snapdocs",
        "squarefoot.com": "SquareFoot", "ai.realestate": "AIRE", "associationonline.com": "AssociationOnline",
        "brokerbot.ai": "BrokerBot", "lotroll.com": "LotRoll", "maxhome.ai": "MaxHome",
        "stackwrap.com": "StackWrap", "omnimls.com": "OmniMLS", "gohaus.ai": "GoHaus",
        "flowspace.co": "FlowSpace", "rypeoffice.com": "Rype", "hyscore.co": "HyScore",
        "senze.co.uk": "Senze", "healthyhomeschecklist.co.uk": "Healthy Homes Checklist",
        "tapihq.com": "Tapi", "taskher.co.uk": "TaskHer", "credivera.com": "Credivera",
        "getcedar.com": "Cedar", "repliers.com": "Repliers", "neobanc.com": "NeoBanc",
        "arosoftware.com": "Aro", "parkbooker.com": "ParkBooker", "crayonscrm.com.au": "Crayons CRM",
        "zapiio.io": "Zapiio", "recruitre.com.au": "RecruitRE", "visoft-eng.com": "ViSoft",
        "getladder.ai": "Ladder AI", "getplexai.com": "Plex AI", "xrei.co": "XREI",
        "oasix.energy": "Oasix Energy", "beamware.ai": "Beamware", "homepay.co.il": "HomePay",
        "centercheck.com": "CenterCheck", "embue.com": "Embue", "hellopackage.com": "HelloPackage",
        "parkquility.com": "Parkquility", "rentflow.com": "RentFlow", "shortlyst.us": "Shortlyst",
        "sklut.io": "SKLÜT", "snaprefund.io": "SnapRefund",
    }
    if host in overrides:
        return overrides[host]
    bits = [b for b in re.split(r"[^A-Za-z0-9]+", host.split(".")[0]) if b]
    return " ".join(b[:1].upper() + b[1:] for b in bits) or host


def add_pi() -> None:
    source = "https://pilabs.vc/portfolio"
    s = get(source)
    seen = set()
    for card in s.select(".summary-content"):
        a = card.select_one(".summary-title-link[href]")
        if not a:
            continue
        name = clean(a.get_text())
        key = name.lower()
        if key in seen:
            continue
        seen.add(key)
        ext = a.get("href", "")
        excerpt = clean(card.select_one(".summary-excerpt").get_text(" ", strip=True) if card.select_one(".summary-excerpt") else "")
        status = "Exited" if re.search(r"\bexited\b", excerpt, re.I) else "Active/portfolio"
        add(ecosystem="Pi Labs", ecosystem_type="built-world accelerator/investor",
            company_name=name, company_url=ext, official_source_url=source,
            source_page_type="official portfolio page", status=status,
            status_note="Status is shown only when the Pi Labs card says Exited; otherwise portfolio membership is recorded without an operating-status assertion.",
            official_description=excerpt, name_source="official portfolio card text")


def add_metaprop() -> None:
    source = "https://www.metaprop.com/portfolio"
    s = get(source)
    seen = set()
    for block in s.select("#portfolios-div a.absolute-link[href]"):
        href = block.get("href", "").strip()
        if not href:
            continue
        parent = block.parent
        name = domain_name(href)
        # The page is logo-only. A numeric logo asset has no safe textual label.
        key = (name.lower(), href.lower())
        if key in seen:
            continue
        seen.add(key)
        exited = "exited-logo" in (parent.parent.get("class", []) if parent and parent.parent else [])
        add(ecosystem="MetaProp", ecosystem_type="built-world venture investor",
            company_name=name, company_url=href, official_source_url=source,
            source_page_type="official portfolio page (logo-only tile)",
            status="Exited/marked exited" if exited else "Active/portfolio",
            status_note="Company name is inferred from MetaProp's official outbound URL because the current portfolio renders logo-only tiles; exited status comes from the tile's exited marker.",
            name_source="official linked domain; inferred because tile has no text label")


def add_fifthwall() -> None:
    base = "https://www.fifthwall.com/portfolio"
    seen = set()
    for page in [base] + [f"{base}?2bddaefa_page={i}" for i in range(2, 5)]:
        s = get(page)
        for h in s.select("h2.heading-style-h2.hide"):
            name = clean(h.get_text())
            if not name or name.lower() in seen:
                continue
            seen.add(name.lower())
            modal = h.find_parent("div", class_="right_modal")
            if not modal:
                continue
            website = next((a.get("href", "").split("#")[0] for a in modal.find_all("a", href=True) if a.get("href", "").startswith(("http://", "https://"))), "")
            desc = clean(modal.select_one(".text-rich-text").get_text(" ", strip=True) if modal.select_one(".text-rich-text") else "")
            status = "Active/portfolio"
            status_note = "Fifth Wall portfolio page does not label this card as exited."
            if re.search(r"\bexited\b|acquired", name, re.I):
                status = "Exited/acquired (as displayed)"
                status_note = "Exit/acquisition status is transcribed from Fifth Wall's displayed card title."
            add(ecosystem="Fifth Wall", ecosystem_type="built-world venture investor",
                company_name=name, company_url=website, official_source_url=page,
                source_page_type="official portfolio page", status=status,
                status_note=status_note, official_description=desc,
                name_source="official portfolio card text")


def add_brickmortar() -> None:
    source = "https://brickmortar.vc/portfolio"
    s = get(source)
    seen: dict[str, set[str]] = defaultdict(set)
    for heading in s.find_all("h1"):
        section = clean(heading.get_text()).lower()
        if section not in {"active investments", "exits"}:
            continue
        x = heading
        while (x := x.find_next()):
            if x.name == "h1":
                break
            if x.name != "a" or not x.get("aria-label"):
                continue
            name = clean(x.get("aria-label"))
            href = x.get("href", "")
            if name.lower() in seen and section in seen[name.lower()]:
                continue
            seen[name.lower()].add(section)
            status = "Active investment" if section == "active investments" else "Exit"
            note = "Official page places the company under ACTIVE INVESTMENTS."
            if section == "exits":
                note = "Official page places the company under EXITS."
            if name.lower() == "boom & bucket" and len(seen[name.lower()]) > 1:
                status = "Ambiguous: appears in active investments and exits"
                note = "The current official page places Boom & Bucket in both sections; preserve the conflict for follow-up rather than resolving it by inference."
            add(ecosystem="Brick & Mortar Ventures", ecosystem_type="AEC/construction venture investor",
                company_name=name, company_url=href, official_source_url=source,
                source_page_type="official portfolio page", status=status,
                status_note=note, name_source="official portfolio image aria-label")


def add_jllspark() -> None:
    source = "https://spark.jllt.com/portfolio/"
    s = get(source)
    for card in s.select(".team-template-box"):
        img = card.select_one("img[alt]")
        name = clean(img.get("alt") if img else "")
        if not name:
            continue
        website = next((a.get("href", "").split("#")[0] for a in card.find_all("a", href=True) if a.get("href", "").startswith(("http://", "https://"))), "")
        text = clean(card.get_text(" ", strip=True))
        status = "Exited" if re.search(r"\bExited to\b", text, re.I) else "Active/portfolio"
        note = "JLL Spark official portfolio card."
        if status == "Exited":
            note = re.search(r"Exited to [^ ]+", text, re.I).group(0) if re.search(r"Exited to [^ ]+", text, re.I) else "Exited as displayed by JLL Spark."
        add(ecosystem="JLL Spark", ecosystem_type="corporate venture arm",
            company_name=name, company_url=website, official_source_url=source,
            source_page_type="official portfolio page", status=status,
            status_note=note, official_description=text, name_source="official portfolio image alt text")


def add_taronga() -> None:
    source = "https://tarongagroup.com/wp-content/uploads/2025/07/RealTechX-Asset-Impact-Booklet-2025-1.pdf"
    # The official booklet presents the alumni as logo tiles rather than linked text.
    names = """Allume|alvéole|MPD Energy|Autocase|Bardee|bindi maps|Calumino|CarbonCure|Cerclos|cognian technologies|CONQA|DARBBASE|entelligent|EODev|EVERTY|Globechain|Groundfloor|Hubble|HydroLeap|Inspace|Intengle Climate Risk Solutions|Kabam Robotics|Liftango|Local Measure|mastt|measurabl|NAAVA|neighbourlytics|omnyfy|one concern|OpenSpace|Portt|Powerstack|propella.ai|Qflow|que|scaler|SiteHive|Skenario Labs|SmartClean|Social Value Portal|SpaceCube|Switch Automation|tcpinpoint|Trendspek|uHoo|VOOX|Voyage Control|VRCollab|Wint Water Intelligence|WiredScore|Work Club|Ynomia""".split("|")
    for name in names:
        add(ecosystem="Taronga RealTechX / Asset Impact", ecosystem_type="real-asset innovation program",
            company_name=name, official_source_url=source,
            source_page_type="official 2025 Asset Impact booklet alumni logo grid",
            status="Alumni/support history displayed", status_note="Name transcribed from official booklet logo grid; no current operating status inferred.",
            name_source="official PDF alumni logo tile; transcribed")


def add_reach_gallery(slug: str, ecosystem: str, region: str) -> None:
    source = f"https://www.nar-reach.com/{slug}"
    s = get(source)
    seen = set()
    for card in s.select(".photoGalleryThumbs"):
        a = card.select_one("a.has-link[href]")
        if not a or "linkedin.com" in a.get("href", "").lower():
            continue
        href = a.get("href", "").strip()
        name = domain_name(href)
        if name.lower() in seen:
            continue
        seen.add(name.lower())
        cap = clean(card.select_one(".caption-text").get_text(" ", strip=True) if card.select_one(".caption-text") else "")
        add(ecosystem=ecosystem, ecosystem_type="NAR REACH regional accelerator",
            company_name=name, company_url=href, official_source_url=source,
            source_page_type="official regional cohort gallery", status="2026 cohort (or current page cohort)",
            status_note="Current regional cohort/gallery status as displayed on the official REACH page.",
            region=region, official_description=cap,
            name_source="official linked cohort gallery domain; display-name normalized")


def add_reach_middle_east_news() -> None:
    source = "https://www.nar-reach.com/dubai-land-department-second-century-ventures-celebrate-start-of-reach-middle-east"
    descriptions = {
        "Asano": "Real estate development intelligence platform unifying financial, development and spatial data for capital planning.",
        "Coraly": "AI-powered growth platform for real estate agencies.",
        "Fixit": "AI employee solution for real estate sales.",
        "HoloX": "Digital twins for off-plan real estate sales.",
        "Rewa": "Digital rental payments and rewards for tenants, landlords and property managers.",
        "Takeem": "Digital rental platform with tenant pre-qualification and rental-income protection.",
        "Watad": "AI-powered building-materials procurement platform with embedded finance.",
    }
    for name, desc in descriptions.items():
        add(ecosystem="NAR REACH Middle East", ecosystem_type="NAR REACH regional accelerator",
            company_name=name, official_source_url=source,
            source_page_type="official 2026 cohort announcement", status="2026 cohort",
            status_note="Name and description transcribed from official REACH Middle East launch announcement; company URL was not linked in the announcement.",
            region="Middle East", official_description=desc,
            name_source="official cohort announcement text")


def add_nar_showcase() -> None:
    source = "https://www.nar-reach.com/"
    names = ["DocuSign", "Proof (formerly Notarize)", "Curbio", "Rental Beast", "Stake", "Occupier", "Knock", "ActivePipe"]
    for name in names:
        add(ecosystem="NAR REACH / Second Century Ventures", ecosystem_type="global real-estate accelerator/fund",
            company_name=name, official_source_url=source,
            source_page_type="official portfolio showcase", status="Portfolio example",
            status_note="Featured portfolio example on official REACH homepage; not a statement of current operating status.",
            name_source="official homepage portfolio showcase text")


def add_cemex_top50_2026() -> None:
    """Capture the complete current CEMEX Ventures 2026 Top 50 list.

    The cards link to CEMEX-hosted profiles rather than consistently exposing a
    company-owned URL.  We therefore keep the list page as the official source
    and do not mislabel the CEMEX profile as the candidate's canonical domain.
    """
    source = "https://www.cemexventures.com/top-50/"
    s = get(source)
    seen = set()
    for a in s.select('a[href*="/top-50-startups/"]'):
        name = clean(a.get_text(" ", strip=True))
        if not name or name.lower() in seen:
            continue
        seen.add(name.lower())
        card = a.find_parent("div", class_="e-loop-item") or a.parent
        card_text = clean(card.get_text(" ", strip=True))
        category = clean(card_text[len(name):]) if card_text.lower().startswith(name.lower()) else ""
        add(
            ecosystem="CEMEX Ventures Top 50 ConTech 2026",
            ecosystem_type="construction corporate venture / annual expert screen",
            company_name=name,
            official_source_url=source,
            source_page_type="official 2026 Top 50 ConTech list",
            status="Selected for 2026 Top 50",
            status_note="CEMEX Ventures selection is an expert-screen discovery signal, not an operating-status, customer-validation, investment, or outcome assertion.",
            category=category,
            official_description=category,
            name_source="official 2026 Top 50 card text",
        )


def add_ret_ventures() -> None:
    """Capture every company card currently rendered on RET's official page."""
    source = "https://www.ret.vc/portfolio/"
    s = get(source)
    seen = set()
    accelerator_names = {"leasingai", "brightplace"}
    for card in s.select(".portfolio_detail_content"):
        h = card.select_one("h4")
        name = clean(h.get_text(" ", strip=True) if h else "")
        if not name or name.lower() in seen:
            continue
        seen.add(name.lower())
        website = next(
            (
                a.get("href", "").strip()
                for a in card.select("a[href]")
                if a.get("href", "").startswith(("http://", "https://"))
            ),
            "",
        )
        text = clean(card.get_text(" ", strip=True))
        is_accelerator = name.lower() in accelerator_names
        add(
            ecosystem="RET Ventures AI Accelerator" if is_accelerator else "RET Ventures Portfolio",
            ecosystem_type="rental-housing AI accelerator" if is_accelerator else "real-estate technology venture investor",
            company_name=name.rstrip("."),
            company_url=website,
            official_source_url=source,
            source_page_type="official AI accelerator company card" if is_accelerator else "official portfolio company card",
            status="AI accelerator company" if is_accelerator else "Portfolio company displayed",
            status_note="This records how the current official RET page presents the company; it does not independently establish operating, ownership, investment-exit, or customer status.",
            official_description=text,
            name_source="official company card text",
        )


def add_moderne_ventures() -> None:
    """Capture the complete paginated portfolio/Passport listing.

    Exit is retained only when the current card does not hide its exit marker;
    a non-exit card is still only a listing signal, not proof of operations.
    """
    base = "https://www.moderneventures.com/portfolio"
    seen = set()
    page = 1
    while page <= 12:
        source = base if page == 1 else f"{base}?a1f7e260_page={page}"
        s = get(source)
        cards = s.select(".portfolio-item")
        if not cards:
            break
        for card in cards:
            internal = card.select_one('a[href^="/portfolio/"]')
            if not internal:
                continue
            slug = internal.get("href", "").rstrip("/").split("/")[-1]
            detail_url = f"https://www.moderneventures.com/portfolio/{slug}"
            external = next(
                (
                    a.get("href", "").strip()
                    for a in card.select("a[href]")
                    if a.get("href", "").startswith(("http://", "https://"))
                ),
                "",
            )
            name_node = card.select_one(".text-block-27")
            name = clean(name_node.get_text(" ", strip=True) if name_node else "")
            if not name:
                name = " ".join(part.capitalize() for part in slug.split("-"))
            if not name or name.lower() in seen:
                continue
            seen.add(name.lower())
            proposition = clean(card.select_one(".text-block-29").get_text(" ", strip=True) if card.select_one(".text-block-29") else "")
            detail = clean(card.select_one(".portoflio-description").get_text(" ", strip=True) if card.select_one(".portoflio-description") else "")
            program_type = clean(card.select_one(".portfolio-card-type").get_text(" ", strip=True) if card.select_one(".portfolio-card-type") else "")
            text = " — ".join(value for value in (proposition, detail, program_type) if value)
            exited = bool(card.select_one(".portfolio-tag:not(.w-condition-invisible)"))
            add(
                ecosystem="Moderne Ventures / Passport",
                ecosystem_type="real-estate and adjacent-industry venture investor / market-access program",
                company_name=name,
                company_url=external,
                official_source_url=detail_url,
                source_page_type="official paginated portfolio or Passport card",
                status="Exited (displayed)" if exited else "Portfolio/Passport listing displayed",
                status_note="Exit is recorded only when the official card's exit marker is visible; otherwise the listing is not treated as proof of active operating or investment status.",
                official_description=text,
                category=program_type,
                name_source="official portfolio card text",
            )
        if not s.select_one(".w-pagination-next"):
            break
        page += 1


def add_2150() -> None:
    """Capture 2150's complete current physical-world investment listing."""
    source = "https://www.2150.vc/investments"
    s = get(source)
    seen = set()
    for card in s.select('a[href*="./investments/"]'):
        href = card.get("href", "").strip()
        if not href:
            continue
        name_node = card.select_one('[data-framer-name="Client"]')
        name = clean(name_node.get_text(" ", strip=True) if name_node else "")
        if not name or name.lower() in seen:
            continue
        seen.add(name.lower())
        detail_url = "https://www.2150.vc/" + href.removeprefix("./")
        description_node = card.select_one('[data-framer-name="Services"]')
        description = clean(description_node.get_text(" ", strip=True) if description_node else "")
        location_node = card.select_one('[data-framer-name="Location"]')
        region = clean(location_node.get_text(" ", strip=True) if location_node else "")
        exited_node = next((node.parent for node in card.find_all(string=lambda value: value and value.strip() == "Exited")), None)
        exited_visible = bool(exited_node and "opacity:1" in clean(exited_node.find_parent(style=True).get("style", "") if exited_node.find_parent(style=True) else ""))
        add(
            ecosystem="2150",
            ecosystem_type="physical-world and built-environment venture investor",
            company_name=name,
            official_source_url=detail_url,
            source_page_type="official investment card",
            status="Exited (displayed)" if exited_visible else "Investment displayed; current status not inferred",
            status_note="Exit is recorded only when the official card visibly marks it; otherwise listing is not treated as proof of current operating status.",
            region=region,
            official_description=description,
            name_source="official investment card text",
        )


def dedup() -> None:
    # Exact company–ecosystem pairs are deduplicated, while the same company may remain
    # once per ecosystem. Conflicting official status notes are merged rather than hidden.
    grouped: dict[tuple[str, str], list[dict[str, str]]] = defaultdict(list)
    for r in rows:
        grouped[(r["ecosystem"].lower(), r["company_name"].strip().lower())].append(r)
    result = []
    for key, group in grouped.items():
        first = dict(group[0])
        statuses = list(dict.fromkeys(g["status"] for g in group if g["status"]))
        notes = list(dict.fromkeys(g["status_note"] for g in group if g["status_note"]))
        urls = list(dict.fromkeys(g["company_url"] for g in group if g["company_url"]))
        if len(statuses) > 1:
            first["status"] = " / ".join(statuses)
            first["status_note"] = " | ".join(notes)
        if urls:
            first["company_url"] = urls[0]
        result.append(first)
    rows[:] = sorted(result, key=lambda r: (r["ecosystem"].lower(), r["company_name"].lower()))


def write() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        w.writeheader(); w.writerows(rows)
    by = Counter(r["ecosystem"] for r in rows)
    overlap = defaultdict(list)
    for r in rows:
        overlap[r["company_name"].lower()].append(r["ecosystem"])
    overlap_rows = sorted((name, sorted(set(es))) for name, es in overlap.items() if len(set(es)) > 1)
    lines = [
        "# Built-environment ecosystem discovery index",
        "",
        f"Captured {TODAY} from official portfolio, cohort, showcase, or alumni pages. This is a **discovery layer**: every row has `discovery_only=true`; portfolio or cohort membership is not validation, recommendation, customer proof, or a current operating-status conclusion.",
        "",
        "## Scope and coverage",
        "",
        f"The CSV contains **{len(rows)} deduplicated company–ecosystem pairs** across **{len(by)} ecosystem pages**. The same company intentionally appears once per ecosystem so overlap and sourcing relationships remain visible.",
        "",
        "| Ecosystem | Rows | Official source | Extraction note |",
        "|---|---:|---|---|",
        f"| Pi Labs | {by.get('Pi Labs', 0)} | [portfolio](https://pilabs.vc/portfolio) | Current visible portfolio cards; page claims a larger historical portfolio than the cards currently rendered. |",
        f"| MetaProp | {by.get('MetaProp', 0)} | [portfolio](https://www.metaprop.com/portfolio) | Logo-only tiles; names are conservatively inferred from linked domains. |",
        f"| Fifth Wall | {by.get('Fifth Wall', 0)} | [portfolio](https://www.fifthwall.com/portfolio) | Four official pagination pages; displayed exit/acquisition labels retained. |",
        f"| Brick & Mortar Ventures | {by.get('Brick & Mortar Ventures', 0)} | [portfolio](https://brickmortar.vc/portfolio) | ACTIVE INVESTMENTS and EXITS sections retained; Boom & Bucket conflict preserved. |",
        f"| JLL Spark | {by.get('JLL Spark', 0)} | [portfolio](https://spark.jllt.com/portfolio/) | Current official cards, including cards marked Exited to an acquirer. |",
        f"| Taronga RealTechX / Asset Impact | {by.get('Taronga RealTechX / Asset Impact', 0)} | [2025 booklet](https://tarongagroup.com/wp-content/uploads/2025/07/RealTechX-Asset-Impact-Booklet-2025-1.pdf) | Alumni logo grid; names transcribed, no URLs/status invented. |",
        f"| NAR REACH regional programs | {sum(v for k,v in by.items() if k.startswith('NAR REACH'))} | [regional programs](https://www.nar-reach.com/) | Current cohort galleries plus official Middle East launch announcement. |",
        f"| CEMEX Ventures Top 50 ConTech 2026 | {by.get('CEMEX Ventures Top 50 ConTech 2026', 0)} | [2026 Top 50](https://www.cemexventures.com/top-50/) | Complete current annual expert-screen list; category retained, no company-domain guess. |",
        f"| RET Ventures | {by.get('RET Ventures Portfolio', 0) + by.get('RET Ventures AI Accelerator', 0)} | [portfolio and AI accelerator](https://www.ret.vc/portfolio/) | Every current rendered company card; portfolio and accelerator memberships separated. |",
        f"| Moderne Ventures / Passport | {by.get('Moderne Ventures / Passport', 0)} | [portfolio](https://www.moderneventures.com/portfolio) | Complete current pagination; only visible exit markers are retained. |",
        f"| 2150 | {by.get('2150', 0)} | [investments](https://www.2150.vc/investments) | Complete current physical-world/built-environment investment listing. |",
        "",
        "## Interpretation rules",
        "",
        "- `Active/portfolio`, `Portfolio example`, and similar labels describe how the source presents the record; they do not guarantee that a company is operating, funded, solvent, or a good fit for JCX.",
        "- Exit/acquisition labels are included only when the official page explicitly displays them.",
        "- Logo-only sources are not silently treated as text-perfect: `name_source` tells the reader whether the name was inferred from a linked domain or transcribed from a logo tile.",
        "- Category, region, product, customer, revenue, funding, and outcome fields are left blank unless the official source itself presents them. The evidence-qualified atlas must separately validate those claims.",
        "",
        "## Overlap signals",
        "",
    ]
    if overlap_rows:
        lines += ["| Company | Ecosystems in this index |", "|---|---|"]
        for name, ecosystems in overlap_rows:
            lines.append(f"| {name.title()} | {', '.join(ecosystems)} |")
    else:
        lines.append("No cross-ecosystem overlaps were detected under normalized display names; URL-level matching should be run in the master data layer.")
    lines += [
        "",
        "## Recommended follow-up",
        "",
        "1. Resolve logo-only MetaProp names against a human-reviewed company-name map and preserve the original linked domain.",
        "2. Run conservative name-first identity resolution against the current evidence-qualified master; use domains only as corroboration and do not promote discovery rows automatically.",
        "3. For JCX-relevant candidates, add independent operating-status, local-market availability, integration, security, pricing, and quantified-outcome claims from primary sources.",
        "4. Re-capture this index periodically: portfolios change, cohort pages are edited, and some official sites show only a partial or featured list.",
        "",
        "## Source pages",
        "",
        "- [Pi Labs portfolio](https://pilabs.vc/portfolio)",
        "- [MetaProp portfolio](https://www.metaprop.com/portfolio)",
        "- [Fifth Wall portfolio](https://www.fifthwall.com/portfolio)",
        "- [Brick & Mortar Ventures portfolio](https://brickmortar.vc/portfolio)",
        "- [JLL Spark portfolio](https://spark.jllt.com/portfolio/)",
        "- [Taronga RealTechX Asset Impact booklet](https://tarongagroup.com/wp-content/uploads/2025/07/RealTechX-Asset-Impact-Booklet-2025-1.pdf)",
        "- [NAR REACH](https://www.nar-reach.com/), [US Commercial](https://www.nar-reach.com/us-commercial), [US Residential](https://www.nar-reach.com/us-residential), [UK](https://www.nar-reach.com/uk), [Latin America](https://www.nar-reach.com/latam), [Canada](https://www.nar-reach.com/canada), [Australia & New Zealand](https://www.nar-reach.com/australia-and-newzealand), [Israel](https://www.nar-reach.com/israel), and [Middle East announcement](https://www.nar-reach.com/dubai-land-department-second-century-ventures-celebrate-start-of-reach-middle-east)",
        "- [CEMEX Ventures Top 50 ConTech 2026](https://www.cemexventures.com/top-50/)",
        "- [RET Ventures portfolio and AI accelerator](https://www.ret.vc/portfolio/)",
        "- [Moderne Ventures portfolio and Passport](https://www.moderneventures.com/portfolio)",
        "- [2150 investments](https://www.2150.vc/investments)",
        "",
        "Generated by `research/build_ecosystem_discovery_index.py`. The CSV is the source of truth for row-level extraction; this markdown is the human-readable coverage and limitations note.",
    ]
    MD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    add_pi(); add_metaprop(); add_fifthwall(); add_brickmortar(); add_jllspark(); add_taronga()
    add_reach_gallery("us-commercial", "NAR REACH US Commercial", "United States")
    add_reach_gallery("us-residential", "NAR REACH US Residential", "United States")
    add_reach_gallery("uk", "NAR REACH UK", "United Kingdom")
    add_reach_gallery("latam", "NAR REACH Latin America", "Latin America")
    add_reach_gallery("canada", "NAR REACH Canada", "Canada")
    add_reach_gallery("australia-and-newzealand", "NAR REACH Australia & New Zealand", "Australia/New Zealand")
    add_reach_gallery("israel", "NAR REACH Israel", "Israel")
    add_reach_middle_east_news(); add_nar_showcase()
    add_cemex_top50_2026(); add_ret_ventures(); add_moderne_ventures(); add_2150()
    dedup(); write()
    print(f"wrote {len(rows)} rows to {OUT}")


if __name__ == "__main__":
    main()
