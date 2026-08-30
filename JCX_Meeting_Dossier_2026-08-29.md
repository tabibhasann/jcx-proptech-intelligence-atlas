# JCX Developments: First-Meeting Intelligence and PropTech Transformation Dossier

**Prepared for:** First discovery meeting with JCX Developments Ltd.  
**Research date:** 29 August 2026  
**Primary public site:** [jcxbd.com](https://jcxbd.com/)  
**Purpose:** Help the meeting team demonstrate preparation, diagnose the real business need, and earn the right to a structured next step.

> **Working thesis:** JCX does not simply need a new website. It needs a reliable digital front door connected to its ERP, sales, project, finance, construction, and customer-service workflows. The website should be the first visible part of a staged digital operating model—not a separate design exercise.

---

## 1. The answer in one page

### What public evidence suggests

JCX is a young but already substantial Bangladeshi developer with a broad Dhaka project portfolio, a Japanese collaboration narrative through Creed Group, active project launches and handovers, and a growing set of housing-finance partnerships. It publicly emphasizes trust, customer happiness, quality, integrity, individuality, timely handover, and green living.

The most important discovery is not visual. A recent JCX IT/MIS recruitment notice says the company is implementing ERP across the organization and seeks capability in ERP integration, data migration, BI/MIS, cybersecurity, backup and disaster recovery, training, and adoption across functions including HR, finance, sales, SCM, customer service, CRM, and construction. A 2024 public LinkedIn post also refers to a meeting with an Odoo ERP development team. Odoo is therefore a strong public clue, **not a confirmed current system**.

At the same time, the current website has a polished premium appearance and good raw material, but several confirmed public-facing issues reveal a larger data and workflow problem:

1. The **Buyer** enquiry form currently asks for landowner information such as land size and “phone number (Landowner).” Two phone inputs also share the same field name in the public HTML. This can confuse buyers and degrade CRM data.
2. The public **Construction Status** page did not provide usable type or location choices during testing. A feature intended to create confidence therefore appears unable to answer the customer’s question.
3. Project facts differ across public components—for example, some apartment-size values vary between cards and detail text, and public sources use different portfolio counts. This suggests the need for one governed project-data source.
4. A controlled Lighthouse lab run showed a strong desktop experience but a materially slower simulated mobile experience: mobile performance 59, 6.4-second FCP and 11.4-second LCP, versus desktop performance 85 and 1.9-second LCP. The homepage transferred roughly 4.3 MB in the lab, dominated by imagery.
5. Current server responses exposed PHP 7.4.33, a branch that reached end of life in November 2022, and did not include several common security headers in the sampled responses. This is a hosting-baseline question to validate, **not evidence that JCX has been breached**.
6. GA4 and Meta Pixel are present, but public inspection cannot establish whether form, phone, WhatsApp, site-visit, qualified-lead, booking, and revenue events are measured end to end.

### The recommendation to take into the room

Use the working idea **“JCX Digital Spine”**:

- **Digital front door:** a fast bilingual website with governed project data, strong search and comparison, audience-specific journeys, clear calls to action, finance paths, and trustworthy status information.
- **Commercial spine:** every enquiry enters CRM with project, campaign, intent, source, consent, assigned owner, response SLA, and lifecycle status.
- **Operational spine:** CRM, website, ERP, procurement, project controls, BIM/CDE, finance, collections, customer service, and document systems exchange controlled data rather than duplicate it.
- **Customer spine:** buyer and landowner portals for progress, documents, payments, appointments, handover, defects, and service.
- **Intelligence spine:** a governed data layer for leadership dashboards and carefully controlled AI assistance.
- **Smart-asset layer:** only after the data and operational foundations work, run one measured smart-building or energy pilot and scale what produces realized value.

### What success in the first meeting looks like

Do not try to “win the website” in the first hour. Win agreement on these five facts:

1. The business outcome that matters most now.
2. The highest-friction customer or staff journey.
3. The authoritative source for project, inventory, price, customer, and status data.
4. The ERP/CRM implementation stage, accountable owner, and integration constraints.
5. A bounded diagnostic or pilot with named stakeholders, inputs, outputs, timing, and decision criteria.

---

## 2. How to behave in the room

Your advantage is not pretending to know JCX better than JCX. It is demonstrating that you did serious work, can connect details to business outcomes, and know exactly which conclusions still require internal evidence.

### The posture

- Be respectful of the institution, leadership, internal team, current vendors, and work already done.
- Speak in hypotheses: “I observed…,” “This may create…,” “I could not verify…,” and “How does it work internally?”
- Praise specifics, not generically. The site has premium visual direction, rich project media, active news, a large portfolio, clear Japanese-collaboration positioning, HTTPS, discoverable SEO metadata, and audience sections for buyers and landowners.
- Share only three or four selected observations before returning to discovery.
- Connect technology to a measurable operating outcome every time.
- Separate company-reported outcomes, external evidence, your inference, and what remains unknown.
- Aim to listen approximately twice as much as you speak.

### The opening to use nearly verbatim

> “Thank you for making the time. I spent some time reviewing JCX’s public portfolio, recent handovers, financing partnerships, and the ERP and IT/MIS direction. I can see that the website sits inside a much broader operating model involving sales, project status, financing, landowners, construction, and customer trust. I have a few initial observations, but I would prefer to validate them with your team before suggesting any solution. Could we begin with what prompted this initiative now and what leadership most wants to change?”

### Your 30-second positioning

> “We help connect digital initiatives to measurable business outcomes—better-qualified demand, faster response, more reliable project and customer information, clearer reporting, and less operational friction. A new website may be part of that, but we would design it around the journeys, data, ownership, and integrations that make it valuable.”

### A strong sentence if they call the site “old”

> “The visual foundation is stronger than I expected. My impression is that the business and portfolio have outgrown a catalogue-style digital experience. The opportunity is to make the website operationally useful, measurable, and connected—not merely newer-looking.”

### The closing to use nearly verbatim

> “My current understanding is that the highest-value opportunity may be connecting project and customer information more reliably across the website, sales, financing, construction, service, and ERP—not simply changing the visual design. Before recommending a solution, I would like to confirm the source of truth, accountable owner, priority journey, and success measures. A short diagnostic or one-project pilot could give leadership an evidence-based roadmap without committing to a large transformation prematurely.”

---

## 3. JCX company intelligence

### 3.1 Facts worth knowing before the meeting

| Public finding | Confidence and caveat | Why it matters in the meeting |
|---|---|---|
| JCX describes itself as a Bangladesh developer of residential, commercial, and condominium projects with Japanese collaboration through Creed Group. | High for public positioning. | Ask how the partnership changes quality, governance, technology, or evidence available to customers. |
| Creed Group says it was founded in 1996, operates across Asian markets, and has gross development value above USD 800 million. | Partner/company-reported, not independently audited here. | There may be reusable standards, know-how, content, design control, or technology from the partnership. |
| TBS reported JCX was incorporated in 2018 and began operations in 2019. | Medium-high; published interview. | JCX has scaled quickly, which often creates fragmented tools and definitions. |
| In the same interview, JCX said it had handed over 12 projects and had roughly 60 projects: 28 ongoing, 22 upcoming, and 10 future. | Date-sensitive and company-reported. | Ask for the current taxonomy and system of record. |
| The public properties page exposed 64 project cards during research, including an “Unnamed Project”; another public report referred to 65 ongoing projects. | High for what was observed; definitions may differ. | Do not accuse. Ask whether the figures refer to different lifecycle stages or counting rules. |
| The portfolio is concentrated in Bashundhara R/A and Jalshiri/Jolshiri Abashon, with projects in Gulshan, Niketan, and other Dhaka locations. | High from public catalogue. | A location-first project finder, map, and segmentation model could be commercially important. |
| TBS reported that JCX historically focused on premium 4,000–9,000 sq. ft. apartments and was moving toward smaller units and 5–6 katha plots. | Management statement, date-sensitive. | Premium and more affordable segments may need different messaging, qualification, finance, and sales journeys. |
| JCX has public housing-finance relationships with banks and non-bank financial institutions including Prime Bank, United Finance, City Bank, and EBL; its archive mentions others. | High for the existence of announcements. | Financing should become an operational journey, not just a press item: offers, eligibility, consent, referral, and conversion attribution. |
| JCX’s news archive is active, with recent handovers, groundbreakings, events, and partnerships. | High. | A structured content workflow could turn this activity into project-level trust and sales evidence. |
| Current public leadership includes MD Md. Iqbal Hossain Chowdhury, CEO Mohummod Tareq Hosen Mozumder, COO Col. Engr. ABM Mizanur Rahman, and directors/executives covering operations, construction, SCM, administration, and other functions. | High at research date; roles can change. | A transformation steering group should be cross-functional, with one executive sponsor and one operational owner. |
| LinkedIn describes JCX as privately held, based in Dhaka, with 51–200 employees. | Self-reported and approximate. | Change management, training, role clarity, and departmental product owners will matter. |
| A recent IT/MIS job post explicitly says JCX is implementing ERP and needs integration, migration, BI, cybersecurity, DR, training, and adoption across the organization. | High; strongest public digital-transformation signal. | Ask how this initiative, its vendor, data model, and governance relate to the website and CRM. |
| A 2024 LinkedIn post mentions a meeting with an Odoo ERP development team. | Public clue only; not proof of current selection or production use. | Say “I saw a public Odoo-related signal; is Odoo still the intended platform?” |
| JCX publicly emphasizes customer happiness, trust, closeness, uniqueness, integrity, green living, and timely handover. | High for stated position. | Translate values into operational KPIs: information accuracy, response time, progress transparency, service resolution, and satisfaction. |

### 3.2 Business context and likely pressures

Public interviews with JCX leadership describe a difficult sector environment: weaker demand for large luxury units, slower customer instalments, increasing material costs, higher home-loan rates, longer approval cycles, unsold inventory, and cash-flow pressure. These are management comments and sector context—not audited JCX financial results.

They make the digital priorities more concrete:

- Qualify demand rather than celebrate raw enquiry volume.
- Match customers to appropriate unit sizes, locations, price bands, and finance options.
- Reduce lead-response delay and missed follow-up.
- Know which campaigns, partnerships, content, and salespeople generate site visits and bookings.
- Keep inventory and project status accurate across sales, website, finance, and ERP.
- Reduce manual reconciliation, reporting, and approval work.
- Increase confidence during long approval, construction, payment, and handover cycles.
- Give leadership earlier visibility into sales, collections, cost, schedule, risk, and service.

### 3.3 A careful strategic inference

The likely challenge is not lack of ambition. It is **scaling institutional control** while the portfolio, systems, products, stakeholders, and customer expectations become more complex.

That means the client may be simultaneously dealing with:

- a website/redesign conversation;
- an ERP implementation;
- inconsistent master data;
- multiple lead channels and sales practices;
- departmental spreadsheets and messaging groups;
- project reporting and approval friction;
- pressure for leadership dashboards;
- interest in AI and automation before the underlying data is ready.

This is why the most mature answer is a sequence, not a shopping list of technologies.

### 3.4 Important uncertainties to verify

- Current portfolio count and lifecycle definitions.
- Current executive sponsor, decision authority, working team, and procurement route.
- Exact ERP platform, modules, implementation partner, phase, and go-live status.
- Whether a CRM exists separately or within ERP.
- Authoritative sources for project status, inventory, price, approvals, customer, finance, and construction data.
- Current website vendor or redesign contract.
- Lead-routing process and response SLA.
- Which financing relationships have an active referral workflow.
- Data residency, privacy, consent, retention, and security requirements.
- Which Japanese quality, sustainability, LEED, delivery, or inspection claims have publishable evidence.
- Budget, deadline, and whether the initiative is board-, executive-, department-, or event-driven.

---

## 4. Current website: balanced executive assessment

### 4.1 What is already strong

Do not begin by calling the site old, poor, or broken. That would be inaccurate and unnecessarily disrespectful.

The current site already has useful foundations:

- Premium, image-led art direction aligned with high-end real estate.
- A sizable public project catalogue with individual project pages.
- Separate buyer and landowner entry points.
- Recent news, handovers, launches, partnerships, CSR, and educational content.
- Visible phone, email, WhatsApp, and social channels.
- HTTPS, canonical links, metadata, OpenGraph, structured SEO output, robots.txt, and XML sitemap.
- Strong desktop lab performance relative to the media weight.
- A custom WordPress theme and current WordPress/plugin versions indicating active maintenance.
- Rich project photography and content that can be reused in a better information architecture.

The right compliment is:

> “JCX already has the content, portfolio, visual ambition, and market activity needed for a strong experience. The next step is turning those assets into a governed and measurable customer journey.”

### 4.2 Priority findings

The following are public observations as of 29 August 2026. They do not substitute for authenticated security testing, analytics access, backend review, user research, or internal process mapping.

| Priority | Observation and evidence | Possible business effect | Respectful meeting phrasing | Validation question |
|---|---|---|---|---|
| **P0** | The [Buyer page](https://jcxbd.com/buyer/) enquiry form asks for “phone number (Landowner),” “Size of the land,” and another phone field. Public HTML assigns the same field name to two phone inputs. | Buyer confusion, abandonment, incorrect field mapping, duplicate/overwritten CRM data, poor qualification. | “The buyer journey appears to reuse fields intended for landowners. That may be a simple template issue, but it could also affect the data your team receives.” | “Where do these submissions land, and can we trace the exact field mapping through CRM or email?” |
| **P0** | The [Construction Status page](https://jcxbd.com/construction-status/) exposed only a default type option and a disabled location choice during live testing. | A high-trust feature cannot answer customer questions; more calls and manual updates; lower confidence during construction. | “The status feature is strategically valuable, but it did not return usable selections in my public test.” | “What source is intended to power it, and who owns update frequency and approval?” |
| **P0** | Public project facts are not consistently governed. Examples observed include different apartment-size values between card headings and details, `Front Road: 0ft` on one listing, `171 / 19722 sq. ft.` on Business Tower, and Jalshiri/Jolshiri spelling variation. | Sales/customer conflict, manual correction, reputational risk, unreliable integration, analytics fragmentation. | “The portfolio scale seems to have outgrown manual duplication of project facts.” | “Which system is authoritative, and should the website consume approved project records through an API?” |
| **P0/P1** | Server responses sampled during the audit exposed `PHP/7.4.33`; PHP 7.4 reached end of life in 2022. Several common response headers—HSTS, CSP, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy—were not present in the sampled baseline. | Unsupported runtime risk, harder security assurance, unnecessary exposure. This is not proof of compromise. | “The public response appears to expose an end-of-life PHP branch. I would ask the hosting team to validate the actual runtime, dependencies, upgrade path, and security-header policy.” | “Who owns hosting, patching, backups, DR tests, WAF, monitoring, and vulnerability management?” |
| **P1** | Lighthouse mobile lab: performance **59**, FCP **6.4 s**, LCP **11.4 s**, TTI **11.5 s**, TBT **30 ms**, CLS **0**. Desktop: performance **85**, FCP **1.1 s**, LCP **1.9 s**, TTI **1.9 s**, CLS **0.001**. Homepage transfer was roughly **4.3 MB**, including about **3.08 MB of images**. | Slower first impression on mobile or weaker networks; reduced conversion from ads/social; higher data cost. Lab data is directional, not field analytics. | “Desktop is visually strong and loads well in the lab. The simulated mobile path is the larger opportunity, especially for Bangladesh’s mobile-first traffic.” | “What do GA4 and Search Console show by device, network, source, and conversion outcome?” |
| **P1** | The homepage DOM contained about 206 images, 143 links, and 263 KB of HTML in the live audit; the entire portfolio appears heavily represented on the homepage. | Large payload, difficult content maintenance, cognitive overload, SEO/internal-link noise. | “The homepage currently carries much of the catalogue. A progressive search-and-discovery model could preserve richness while reducing load and clutter.” | “Which three customer actions should the homepage optimize?” |
| **P1** | GA4 and Meta Pixel fire, but public inspection cannot verify business events such as click-to-call, WhatsApp, form success, project interest, finance referral, appointment, qualified lead, booking, or revenue. | Marketing reports activity instead of commercial outcomes; weak attribution and optimization. | “The analytics foundation exists. The next question is whether it follows a customer from source to qualified opportunity and booking.” | “Which events and CRM stages are currently joined to campaign/source data?” |
| **P1** | Accessibility/SEO lab scores were 92, but testing found non-crawlable `javascript:void` links, links without discernible names, heading-order issues—many associated with hidden map popups—and no `<main>` landmark. | Navigation and assistive-technology friction; maintainability and search-quality issues. | “The automated accessibility baseline is reasonably strong, with a few semantic and interaction issues worth correcting.” | “Is WCAG 2.2 AA or another accessibility standard part of the acceptance criteria?” |
| **P1** | The privacy policy is generic and does not clearly state an effective date, specific retention logic, rights/request process, or data-flow detail. Tracking tags fired without a visible consent banner during the test. | Consent and transparency uncertainty; governance risk. Legal interpretation requires local counsel. | “The policy may not yet reflect the actual analytics, CRM, marketing, and portal data flows you are building.” | “Can legal and IT define the approved notice, consent, retention, vendor, and rights-handling model?” |
| **P1/P2** | Project pages contain enquiry forms, but public inspection could not confirm that project context, source, campaign, or page intent is passed reliably into downstream systems. | Sales receives a generic lead and must ask again; attribution and response quality suffer. | “The form appears visually available, but the important question is the payload and workflow behind it.” | “Does every submission carry project ID, source, UTM, language, intent, consent, and assigned owner?” |
| **P2** | Confirmed copy/data-quality examples include “state-of-the-earth” instead of “state-of-the-art,” “Specious Car Parking,” a vague “principal things we transgress,” and residential “dream home” language on commercial-project pages. | Small trust erosion, weaker premium positioning, inconsistent segmentation. | “A structured editorial QA and approval workflow would protect the premium brand as content volume grows.” | “Who writes, verifies, approves, publishes, and periodically revalidates each field?” |
| **P2** | Awards appear predominantly as images without enough explanatory context, and some trust claims lack linked evidence. | Valuable proof is underused; inaccessible image-only information; hard for a buyer to evaluate. | “JCX has stronger trust material than the current pages make usable.” | “Which awards, inspections, certificates, handovers, and partner evidence can be organized into a verified trust library?” |
| **P2** | A preload request for `Montserrat-Regular.woff2` returned 404; browser console also reported a GSAP target warning and a Facebook cookie-domain warning. | Avoidable request error, debugging noise, potential tracking inconsistency. | “There are a few straightforward frontend housekeeping items the current team can resolve quickly.” | “Is there a release checklist for network errors, console errors, tags, and browser/device QA?” |

### 4.3 What not to claim

- Do not say a Lighthouse score proves lost revenue.
- Do not say the missing headers or PHP version prove a breach.
- Do not say the status module is always broken; say it did not provide choices during your dated test.
- Do not say Odoo is confirmed; ask whether the public signal is still accurate.
- Do not assume that form submissions fail; the confirmed issue is misleading fields and uncertain downstream mapping.
- Do not infer customer dissatisfaction from public interface defects.
- Do not describe the current team or vendor as incapable.

### 4.4 How to present the findings in three minutes

> “I saw four things worth validating. First, the site already has a premium visual foundation and substantial content. Second, the buyer form appears to reuse landowner fields, which may affect both conversion and lead data. Third, the construction-status experience did not provide usable choices in my test, even though status transparency could be one of JCX’s strongest trust features. Fourth, several project facts appear in multiple forms, which suggests the site needs a governed project-data source. The lab performance also shows a desktop-mobile gap. None of this tells me the internal cause; that is what I would want to map with sales, marketing, IT, ERP, construction, and customer service before proposing a rebuild.”

---

## 5. The target customer experience

### 5.1 Design the experience around audiences, not departments

| Audience | Primary questions | High-value digital journey |
|---|---|---|
| Prospective buyer/investor | What fits my location, size, budget, status, and timeline? Can I trust it? Can I finance it? | Discover → filter/compare → verify project/status → explore finance → speak to the right adviser → schedule visit → receive relevant follow-up. |
| Landowner | Can I trust JCX with my land? What is the proposal and process? What documents and milestones matter? | Learn model → submit structured land profile → qualify → secure document exchange → proposal/approval tracking → milestone visibility. |
| Existing customer | What is the current status, balance, next payment, appointment, handover, or service issue? | Authenticate → see unit/project → view approved progress/documents/balance → pay or request service → track resolution. |
| Broker/channel partner | Which inventory can I represent, under what policy, and how is attribution protected? | Authenticate → approved catalogue/material → register lead → track stage/commission policy. |
| Bank/finance partner | Which projects and customers are eligible, and how is consented referral handled? | Offer/eligibility information → consent → referral → status feedback → attributed outcome. |
| Prospective employee/vendor | What is JCX’s credibility and how do I engage? | Employer/vendor information → verified opening/onboarding → controlled submission. |
| Internal team | Which content, data, lead, status, and action is mine? | Role-based work queue → review/approve → publish/sync → audit → report. |

### 5.2 Recommended public information architecture

1. **Home** — value proposition, priority journeys, featured projects, verified trust, project finder, current milestones, clear CTAs.
2. **Find a property** — location, type, size, lifecycle status, possession/handover window, price-display policy, financing, amenities, comparison and map.
3. **Project detail** — one governed template for status, approval disclosure, location, unit range, amenities, plans, progress, team/partners, finance, evidence, updated date, and relevant enquiry.
4. **Locations** — Bashundhara, Jalshiri and other area pages combining portfolio, access, amenities, content, and maps.
5. **Construction and handover** — approved milestones, dated updates, photos/videos, status definitions, completed projects, and customer login.
6. **For buyers** — process, qualification, finance, legal/document guides, site visit, FAQ, support.
7. **For landowners** — partnership model, evidence, process, documents, secure submission, case studies.
8. **Financing** — current partners, eligible projects/terms disclaimers, calculator if approved, consented referral.
9. **Trust centre** — company, Creed/Japan collaboration, leadership, awards, certifications, inspection/quality process, sustainability evidence, policies.
10. **News and knowledge** — handovers, groundbreakings, partnerships, guides, with structured links back to relevant projects and journeys.
11. **Contact/support** — purpose-specific paths, response expectations, office/map, accessible alternatives.
12. **Customer portal** — secure progress, documents, payments, appointments, handover, defects, and service.

### 5.3 The governed project record

Every public project should be rendered from an approved record with, at minimum:

- stable project ID and official name;
- canonical location and geospatial coordinates;
- property type and customer segment;
- lifecycle stage with defined vocabulary;
- approval/disclosure status and allowed public language;
- unit-size range, configuration, parking, frontage, plot area, number of units/floors;
- inventory/availability display policy—not necessarily live quantity;
- pricing display policy and effective date if published;
- expected/actual construction and handover milestones;
- amenities, specifications, architects/consultants/contractors if approved;
- financing partners and applicable conditions;
- approved media, plans, brochures, certificates, news, and progress evidence;
- content owner, data owner, approver, last verified date, and review date;
- CRM campaign/project mapping and ERP/BIM/CDE identifiers.

The website CMS can own editorial presentation. It should not independently own inventory, receivables, customer contracts, or project-control facts.

### 5.4 The minimum lead payload

Do not overcollect personal information. Collect only what the business will use and can protect. A high-quality lead record should normally include:

- project/location/intent context;
- name and verified contact method;
- preferred language and channel;
- buyer, investor, landowner, broker, or existing-customer journey;
- approximate size/budget/timeframe only when justified;
- source, campaign, UTM parameters, landing page, referring partner;
- consent purpose, notice version, timestamp, and preferences;
- duplicate-match result;
- assigned team/owner and response deadline;
- appointment/site-visit and qualification outcome;
- later booking/contract/revenue outcome where authorized.

### 5.5 Website MVP acceptance criteria

- Mobile-first performance budget and image/media pipeline.
- WCAG 2.2 AA-oriented accessible components and content QA.
- Bangla/English content model if JCX confirms bilingual need.
- Governed project data and lifecycle vocabulary.
- Correct audience-specific forms with tested field mapping.
- CRM integration, deduplication, routing, SLA timer, and failure alerts.
- Event taxonomy joined to CRM stages.
- Privacy notice, consent, retention, and preference controls approved by counsel.
- Role-based CMS workflow, preview, audit log, and scheduled review.
- Security baseline: supported runtime, MFA, least privilege, backups/restore test, WAF/API controls, patch ownership, monitoring, and incident path.
- Release checklist across device, browser, accessibility, content, analytics, network, SEO, and forms.
- No dependency on uncontrolled spreadsheets for public inventory or price.

---

## 6. JCX Digital Spine: operating-model and architecture blueprint

### 6.1 The principle

Digitization copies an existing task into software. Transformation redesigns who owns the task, what data is authoritative, how exceptions are handled, what evidence is retained, and which outcome improves.

The technology should follow this chain:

```text
Customers / landowners / partners / employees
                    │
      Website · portal · CRM · field apps
                    │
  API/integration layer · identity · workflow · events
                    │
ERP · project controls · procurement · BIM/CDE · CMMS
                    │
 Canonical master data · warehouse/lakehouse · metrics
                    │
 Leadership dashboards · governed AI · audit/monitoring
```

Cross-cutting controls: privacy, cybersecurity, role-based access, approvals, audit logs, data quality, backup/DR, vendor risk, change management, and measured benefits.

### 6.2 What each system should own

| Capability | Likely system of record | Important integration |
|---|---|---|
| Public editorial content | CMS | Approved project master, CRM forms, analytics, media/CDN. |
| Leads, opportunities, activities, broker/source | CRM, possibly an ERP CRM module | Website, call/WhatsApp/email, inventory, finance, ERP. |
| Unit/project commercial inventory | Controlled project/inventory module | CRM, website approved view, ERP booking/contracts. |
| General ledger, AP/AR, budgets, contracts/commitments | ERP | Procurement, CRM/booking, project controls, banks, portal. |
| Design documents/models and approvals | CDE/BIM environment | Project controls, procurement, handover/asset register. |
| Schedule, progress, cost forecast, RFI/change | Project-controls/field platform | ERP cost, BIM/CDE, procurement, leadership BI. |
| Supplier and procurement transaction | ERP/e-procurement/CLM | Budget, project controls, receiving, AP. |
| Customer documents, progress, tickets | Portal backed by CRM/ERP/CDE/service platform | Identity, payment, notifications, CMMS. |
| Assets and work orders after handover | CMMS/EAM | BIM handover, BMS/IoT, vendors, finance, portal. |
| Enterprise reporting | Governed warehouse/lakehouse and semantic metrics layer | Read from domain systems; do not become an uncontrolled transaction store. |

If Odoo is the selected ERP, do not create a parallel mini-ERP inside the website. Define module ownership, APIs, IDs, synchronization, error handling, and auditability before development.

### 6.3 Value-chain opportunity map

| Domain | First practical automation | Later capability | Core KPI |
|---|---|---|---|
| Land and development | Opportunity register, due-diligence checklist, document workflow, GIS pilot. | Portfolio scenarios and monitored approval/market signals. | Intake-to-decision time; complete due-diligence rate. |
| Feasibility | Controlled model, versioning, assumption owners, approval workflow. | Portfolio scenario planning and forecast monitoring. | Feasibility turnaround; forecast-vs-actual variance. |
| Design/BIM | Common data environment, naming/version rules, issue workflow. | BIM-linked cost/procurement and BIM-to-asset handover. | Design issues, RFIs, information delivered on time. |
| Permits/compliance | Register, submission checklist, condition/expiry alerts, evidence repository. | Rules-assisted checking and authorized external-system integration. | Approval cycle; resubmission rate; overdue conditions. |
| Procurement | Vendor master, digital requisition, quotation comparison, approval matrix. | Contracts, variations, supplier scorecards, delivery-risk analytics. | Requisition-to-PO; invoice exceptions; on-time delivery. |
| Construction | Mobile daily log, photo evidence, RFI/issue/NCR register. | Integrated schedule/cost/change; selected reality capture. | Report timeliness; RFI closure; schedule/cost variance; rework. |
| Finance | Chart/project-code cleanup, bank reconciliation, approval workflow. | Integrated project cash forecast and controlled finance copilots. | Close duration; reconciliation exceptions; cash forecast accuracy. |
| Sales/CRM | Unified lead capture, dedupe, routing, SLA, project/source attribution. | Inventory/booking/finance integration and assisted selling. | Response time; qualified rate; site visit; booking conversion. |
| Marketing/site | Governed CMS, search, correct forms, event taxonomy. | Personalization and experimentation with consent. | Qualified conversion; attribution; publish cycle; performance. |
| Collections | Clean contract/installment data, reminders, reconciliation queue. | Portal payments, escalations, early-warning decision support. | On-time rate; unmatched payments; delinquency ageing. |
| Handover/service | Document checklist, defect taxonomy, ticketing pilot. | Customer portal, digital handover, warranty analytics. | Handover cycle; defect closure; repeat contact; satisfaction. |
| Facilities | Asset hierarchy and preventive work orders. | BMS/IoT energy/fault monitoring and condition-based maintenance. | PM completion; downtime; response/repair; energy/water intensity. |
| People/change | Process owner network, training, adoption dashboard. | Role-based digital academy and continuous-improvement pipeline. | Active use, task completion, error/rework, training proficiency. |

### 6.4 AI: valuable, bounded, and governed

Good early uses:

- search across approved policies, project records, contracts, manuals, and meeting notes;
- meeting/action extraction with human confirmation;
- classification and routing of enquiries, invoices, documents, service requests, and defects;
- duplicate detection and data-quality suggestions;
- draft status reports, responses, and summaries from approved data;
- FAQ assistant that cites current approved project and policy sources and escalates sensitive cases;
- anomaly flags for missing documents, late activities, unusual cost or collection patterns.

Do not initially allow AI to autonomously:

- approve payments, purchase orders, contracts, variations, refunds, or write-offs;
- make binding pricing, eligibility, financing, legal, title, compliance, or safety decisions;
- publish project status or availability without accountable approval;
- contact customers without consent, frequency limits, and human escalation;
- train on confidential company/customer data without approved controls.

Use the NIST AI Risk Management Framework as a governance reference: map the use case, measure risk and quality, manage controls, and govern ownership continuously.

### 6.5 Security and resilience baseline

- SSO/MFA for staff and administrators.
- Role-based least privilege and periodic access review.
- Separate production, test, and development environments.
- Secrets management; no credentials in code or shared chat.
- Supported runtimes and patch/dependency ownership.
- WAF, rate limits, bot/abuse protection, and secure API design.
- Encryption in transit and at rest where appropriate.
- Central logging, alerting, and incident ownership.
- Tested backups, restore objectives, disaster-recovery runbook, and exercises.
- Vendor security/privacy assessment and contract obligations.
- Data classification, retention, deletion, export, and lawful disclosure procedures.
- Secure development and release checks aligned with OWASP risks.
- Portal/customer access isolation so one customer cannot see another unit or document.

---

## 7. Phased transformation roadmap

### Phase 0 — Align and baseline (approximately 2–4 weeks)

**Purpose:** avoid automating contradictory processes or building around uncertain data.

Activities:

- Executive sponsor and cross-functional working team.
- Interviews and journey mapping across sales, marketing, IT/MIS, ERP, finance, construction, customer relations, land, procurement, and legal/compliance.
- System, integration, spreadsheet, document, and vendor inventory.
- Current-state maps for 5–8 priority journeys.
- Project/customer/unit/vendor master-data assessment.
- Analytics and funnel baseline.
- Security/privacy/hosting baseline.
- KPI dictionary and benefits register.
- Confirm Odoo/ERP reality and implementation constraints.
- Rank opportunities by value, feasibility, risk, dependency, and adoption readiness.

Outputs:

- current-state architecture and data map;
- top friction/evidence register;
- target operating model and ownership/RACI;
- prioritized roadmap and pilot recommendation;
- measurement plan, business case, and risk register;
- website/product requirements sufficient for reliable scoping.

### Phase 1 — Digital front door and lead spine (0–90 days after alignment)

**Primary outcomes:** trusted project information, faster qualified response, and end-to-end lead measurement.

- Fix urgent form, construction-status, data, copy, runtime, and QA issues.
- Define project lifecycle vocabulary and governed project schema.
- Deliver a mobile-first CMS/project explorer or progressively modernize the current site.
- Connect every web, call, WhatsApp, campaign, and partner enquiry to CRM/ERP intake.
- Deduplicate, route, assign SLA, and alert on failed integrations.
- Track project/source → contact → qualification → site visit → booking.
- Establish consent, privacy, access, backup, monitoring, and release controls.
- Pilot on one project or location cluster if full migration is too large.

### Phase 2 — Commercial and project workflows (3–6 months)

**Primary outcomes:** reduce cross-department friction and establish reliable operating data.

- CRM ↔ controlled inventory ↔ booking ↔ ERP receivables.
- Financing referral and status workflow with approved partners.
- Procurement requisitions, quotations, approvals, PO, receiving, invoice matching.
- Contract, variation, and claim registers.
- Mobile construction reports, issues, RFIs, inspections, and evidence.
- Common data environment/BIM governance on a pilot project.
- Leadership dashboards from governed definitions.
- Collections reminders and reconciliation exception queues.
- Customer-service taxonomy and ticketing.

### Phase 3 — Customer and landowner self-service (6–12 months)

**Primary outcomes:** transparency, reduced repeat contact, and stronger lifecycle trust.

- Customer portal v1: approved progress, documents, balance, receipts, appointments, service requests.
- Handover readiness, snagging, defects, warranties, and case status.
- Landowner secure documents, proposal/approval milestones, and communication history.
- Project-to-asset data handover for selected developments.
- Governed enterprise knowledge assistant for staff and approved customer FAQs.

### Phase 4 — Smart assets and advanced intelligence (9–18 months)

**Primary outcomes:** measured building efficiency and portfolio insight.

- Select one operational asset with clear ownership, baseline meters, accessible data, and repeatable use case.
- Pilot smart metering/BMS analytics for energy, water, HVAC, lift or equipment alerts.
- Link every alert or insight to a work order and responsible person.
- Measure realized savings and operational improvement against baseline.
- Scale only after the pilot meets predefined evidence and payback criteria.
- Introduce carefully governed forecasting and copilots only where data quality is sufficient.

### Pilot selection criteria

Select a pilot that has:

- an executive sponsor and daily process owner;
- measurable current pain and available baseline data;
- manageable integration scope;
- enough transaction volume to reveal value;
- representative users willing to participate;
- low legal/safety downside;
- visible benefit within one business quarter;
- a credible path to portfolio reuse.

The website-to-CRM lead journey is likely the safest first commercial pilot. A large completed or operational building may be suitable for a later energy/maintenance pilot.

---

## 8. Global PropTech and real-estate technology benchmarks

### How to use these examples

Do not perform a parade of famous names. Use one example only when it illuminates the client’s stated problem. Be precise about whether an outcome is realized, modeled, a target, or company-reported.

| Organization | What it is doing | Publicly reported outcome | Evidence quality/caveat | Transferable JCX lesson |
|---|---|---|---|---|
| **Emaar Development** | Emaar One customer platform for payments, service, and property interactions. | 2023 report: 56,000+ users, 39% active-user growth, AED 2bn+ payments, 92.6% CSAT. 2024 report: 74,000 app users, 99.54% service-request closure and 93.4% CSAT. | Company integrated reports. Definitions should be checked before comparison. | A buyer app/portal becomes valuable when it handles real payments, services, documents, and lifecycle tasks—not when it is merely promotional. |
| **Aldar** | “Digital Spine,” Live Aldar experience, digital sales signatures, enterprise procurement/system consolidation. | 2024 report: 16,000 customers, over 50% adoption, 92% digital sales signatures, 65% increase in digital efficiencies. 2025 reporting says 10+ procurement systems were unified and some processes fell from 40+ hours to minutes. | Company-reported; exact metric definitions vary. | Website, CRM, sales, procurement, and data transformation should share a platform/operating model. |
| **CapitaLand** | Structured sustainability-innovation challenge and controlled building pilots. | Raffles City Shenzhen AI cooling optimization: 8.6% cooling-cost reduction. Automated sprinkler test: 59m23s to 34s, 3–4 people to 1, 100% water savings. CapitaGreen cooling-tower technology: 99.8% blowdown-water reduction and 17-month ROI. | Official case-study reporting; site- and use-case-specific. | Run bounded pilots with baseline, owner, measurement, and scale criteria. |
| **Swire Properties** | Cloud smart-energy platform, HVAC/lighting optimization, portfolio rollout. | Citygate measures reported a 17.7% energy reduction from 2021–2024; smart-lighting example reported 100,000 kWh annual savings. | Company sustainability reporting; multiple interventions may contribute. | In an Asian property context, operational AI can begin with practical energy and equipment decisions. |
| **Mapletree** | AI energy analytics linked to implementation work orders across European assets. | Reported 317,340 kWh/~£88k identified and 235,045 kWh/~£65k realized; gas measures also reported. | Official case; distinguishes identified from realized. | An insight has no value until it becomes an owned, completed action. Track both opportunity and realized outcome. |
| **Prologis** | Bundles energy, automation, procurement, financing, and vendor coordination as a customer solution. | One lighting program reported 536,000 kWh realized savings without customer capex. A robotics case reported modeled/expected net savings—not yet realized in the same sense. | Company case; distinguish actual from forecast. | Sell business outcomes and implementation accountability, not devices or buzzwords. |
| **Digital Realty** | Portfolio energy management and data-center efficiency. | ENERGY STAR profile reports 11.3 GWh of energy savings from Jan 2022 to Jun 2023. | External ENERGY STAR profile based on reported program data. | Establish portfolio energy baselines and normalize before claiming efficiency. |
| **Hines** | Digital tenant ecosystem and portfolio testbed across buildings/cities; global venture investing. | Public material emphasizes rollout across eight buildings/five cities but offers fewer comparable ROI figures. | Useful model, limited public quantified outcome. | A consistent customer/data layer can span properties while individual sites remain different. |
| **Lendlease** | BIM, digital twins, drones/reality capture, design for manufacture and assembly. | Public material is stronger on intended productivity and delivery outcomes than on independently verified ROI. | Treat as capability example, not proof of a particular return. | Construction digitization requires information standards and delivery-process change, not just a 3D model. |
| **Majid Al Futtaim** | Portfolio energy management, smart meters, and sustainability operations. | 2024 report cites roughly 123 million kWh/8% year-on-year energy reduction overall and over 5.4 million kWh annual savings from Qatar smart meters. | Company report; multiple factors may drive portfolio change. | Shared measurement and service models can make sustainability operational and financeable. |
| **Mitsui Fudosan** | Unified customer/urban platforms, digital twin and robotics proofs of concept. | Public DX material includes operational capacity such as 100+ delivery robots, but not a directly comparable ROI. | Capability/scale evidence, not financial-return proof. | A common identity and data model should precede ambitious city-scale automation. |
| **Prestige Group / SAP** | South Asian developer connecting S/4HANA, Service Cloud and workflow automation. | SAP case material reports business growth and process benefits, but growth cannot be attributed solely to technology. | Vendor case study; causal claims require caution. | The closest practical analogy is connected CRM, ERP and workflow—not immediately a robot or full digital twin. |

### Five stories that work verbally

1. **Mapletree and the last mile:** “Their analytics identified about £88,000 in opportunity, but the better number is roughly £65,000 already realized through completed actions. We should track ideas and realized benefit separately.”
2. **Aldar and the digital spine:** “Aldar did not treat the customer app and procurement transformation as isolated projects. It built a digital spine, and reports some workflows falling from more than 40 hours to minutes after consolidation.”
3. **Emaar and lifecycle value:** “Emaar One has tens of thousands of users because it supports payments and service, not just browsing properties. A JCX portal should earn adoption through real tasks.”
4. **CapitaLand and disciplined experimentation:** “CapitaLand’s strongest examples are tightly scoped: one building system, a baseline, an owner, and a measured result. That is how JCX can become a credible PropTech leader without betting everything at once.”
5. **Prestige as the nearer analogy:** “In South Asia, Prestige’s CRM-plus-ERP-plus-workflow journey is a more relevant starting pattern than jumping directly to a city-scale digital twin.”

### The benchmark conclusion

The leaders do not win because they own the most software. They repeatedly do five things:

1. choose a valuable operating problem;
2. create reliable data and ownership;
3. connect the customer and internal workflows;
4. pilot with a baseline and named accountability;
5. distinguish promised, identified, and realized value.

For JCX, the mature sequence is: **connected website and CRM → ERP-aligned workflows and customer portal → one measured building-operations pilot → scaled portfolio intelligence.**

---

## 9. The first-meeting plan

### Recommended 60-minute agenda

| Time | Objective | What to do |
|---:|---|---|
| 0–7 min | Establish respect and desired outcome | Introductions, opening, confirm attendees and what would make the hour useful. |
| 7–17 min | Understand strategy and “why now” | Ask about mission, business pressure, deadline, leadership expectation, and what has already been decided. |
| 17–40 min | Diagnose priority journeys and systems | Explore customer, landowner, sales, ERP, data, construction, service, reporting, ownership, risk, and adoption. |
| 40–48 min | Share selected evidence | Present three or four observations using observation → possible effect → uncertainty → question. Mention one relevant global benchmark. |
| 48–55 min | Establish scope reality | Stakeholders, incumbent vendors, data/access, budget range, procurement, timeline, approval path, pilot. |
| 55–60 min | Summarize and secure next step | Reflect understanding, state unknowns, agree actions/owners/dates and next diagnostic/pilot decision. |

### The twelve questions to prioritize

1. **Why now?** “What happened—or what opportunity appeared—that made this a priority now?”
2. **Outcome:** “If this succeeds in 12 months, what will leadership see changing in the business?”
3. **Priority journey:** “Which journey creates the most friction today: buyer lead-to-booking, project reporting, finance/collections, procurement, construction, landowner, handover, or service?”
4. **Customer reality:** “What do buyers and landowners ask repeatedly, complain about, or wait for?”
5. **Source of truth:** “Which system owns project status, inventory, price, approvals, customer identity, payments, and handover dates?”
6. **ERP/Odoo:** “I saw public evidence of an organization-wide ERP program and an earlier Odoo discussion. What platform and modules are now selected, and at what stage?”
7. **Lead process:** “When a website, phone, WhatsApp, social, broker, or bank lead arrives, who receives it, what is the response target, and how is the outcome recorded?”
8. **Project data:** “How are facts approved once and kept consistent across website, brochure, sales, finance, and ERP?”
9. **Measurement:** “Which metrics are reviewed weekly by management, and which reports still require manual collection?”
10. **Constraints:** “Which security, privacy, legal, approval, hosting, integration, or vendor constraints are already fixed?”
11. **Ownership:** “Who is the executive sponsor, daily product owner, technical owner, and final approver?”
12. **First proof:** “Which one project or process could demonstrate measurable value within a quarter?”

### Function-specific question bank

#### Strategy and leadership

- What does “becoming a PropTech leader” mean for JCX: revenue, speed, transparency, customer experience, cost, data, or smart buildings?
- Which outcomes matter this year versus over three years?
- What initiatives are already funded or committed?
- What would make leadership stop or expand a pilot?
- Is the main concern growth, margin, cash conversion, risk, service, or institutional readiness?

#### Sales and marketing

- What proportion of enquiries is valid, qualified, contacted, visited, booked, and cancelled?
- What are median and 90th-percentile first-response times?
- Which channels generate bookings, not just leads?
- How are duplicates, broker attribution, and existing customers handled?
- Can sales see current unit availability, price policy, financing, and content from one place?
- What happens when an assigned salesperson is unavailable?
- How are campaign cost, project, site visit, booking, and revenue connected?

#### Website and content

- Who owns each page and project field?
- What is the publishing and approval workflow?
- Which content is duplicated in brochures, PDFs, social posts, and spreadsheets?
- What must be bilingual?
- What are the top three user actions?
- Is price or availability permitted publicly, conditionally, or not at all?
- How often should construction progress be updated, by whom, and with whose approval?

#### ERP, IT/MIS, data and security

- Exact platform, modules, implementation partner, contract, environments, and go-live sequence?
- What data is being migrated, from where, and who signs off quality?
- Is CRM inside or outside the ERP?
- Are stable project, unit, customer, vendor, contract, and chart-of-account IDs defined?
- What integrations exist today? Are there APIs, files, manual imports, or RPA?
- Who owns identity, MFA, role design, logging, backup, restore tests, DR, monitoring, and incident response?
- Where are systems and data hosted, and what constraints apply?
- How is user adoption measured after training?

#### Construction, design and projects

- How do teams capture daily progress, quantities, photos, issues, RFIs, NCRs, inspections, and variations?
- Is there a common work breakdown, cost code, location breakdown, and project status vocabulary?
- Where are drawings/models/documents stored, reviewed, and versioned?
- Which reports are manually assembled for leadership?
- What causes the greatest delay or rework?
- What information can safely be published to customers?
- Is BIM used for authoring only, coordination, quantities, handover, or facilities?

#### Finance, procurement and collections

- How are budgets, commitments, purchase orders, receipts, invoices, and payments linked to project/cost codes?
- How long do requisition-to-PO, invoice approval, bank reconciliation, and month-end close take?
- How are vendor records verified and duplicated?
- How are customer instalments, unmatched payments, reminders, disputes, and escalations handled?
- What cash, sales, inventory, and collection forecasts can leadership trust today?

#### Customer service and handover

- What are the top five enquiry/service categories?
- What are response and resolution SLAs?
- Can the customer see approved progress, balance, receipt, document, appointment, defect, and warranty status?
- How are handover packs assembled and verified?
- What is the defect/snagging workflow and average closure time?
- Which information triggers repeated calls that self-service could safely answer?

### How to share a difficult observation

Use this five-part pattern:

1. **Observation:** “On the buyer page, I saw landowner-oriented fields.”
2. **Possible effect:** “That may confuse a buyer and make downstream data less reliable.”
3. **Uncertainty:** “I cannot see the internal routing or whether the current team already knows.”
4. **Question:** “Where does the submission go and how are the fields mapped?”
5. **Optional next step:** “A short end-to-end form and lead-flow test would establish the real impact.”

---

## 10. Objection and situation handling

### “We only need a website.”

> “We can keep the delivery tightly scoped to the website. I would still map project data, lead routing, analytics, content ownership, consent, and ERP/CRM touchpoints so the new site does not become another isolated system.”

### “We already have an agency/vendor.”

> “That can be an advantage. We can support the current team with an independent diagnostic, requirements, data/integration design, measurement framework, or a bounded workstream. The objective is not to displace good work.”

### “Just send us a proposal.”

> “I can send a useful proposal once I confirm the primary outcome, accountable owner, current systems, scope boundary, target timing, and commercial range. Without those, the document would be a guess. I can first send a concise discovery proposal with clear outputs and a fixed decision point.”

### “Can you automate everything?”

> “We can automate many repeatable steps, but the right sequence is to standardize the process, assign the data owner, and automate the stable path while retaining controlled human approval for financial, legal, safety, compliance, and exception decisions.”

### “Can AI solve this?”

> “AI can make search, classification, reporting, and assistance much faster. It cannot repair missing ownership or unreliable source data. We should choose use cases where approved information exists, risk is bounded, and quality can be measured.”

### “How much will it cost and how long?”

> “That depends primarily on content/data readiness, ERP and CRM integration, migration, approval workflow, portal/security requirements, and how much of the current stack is retained. I can give a responsible range after a short diagnostic, or separate a fixed-scope phase-one pilot from later options.”

### “You are young / why should we trust your team?”

> “That is a fair concern. We would earn confidence through careful discovery, explicit assumptions, transparent architecture, bounded milestones, measurable acceptance criteria, documentation, and a pilot that limits risk. You should judge us by the quality of the diagnosis and execution evidence.”

### “We want to be like Emaar/Aldar.”

> “That is a useful direction, but their advantage came from connected operating systems and years of adoption—not an app alone. We can borrow the discipline: one customer identity, governed property data, measurable service journeys, strong integration, and staged pilots appropriate to JCX.”

---

## 11. Measurement and business case

### 11.1 Baseline before target

Never fabricate an ROI percentage. For every proposed improvement record:

| Field | Definition |
|---|---|
| Process/journey | Exact start and end event. |
| Baseline period | A representative period, with seasonality noted. |
| Volume | Leads, invoices, requests, units, projects, work orders, etc. |
| Baseline performance | Time, conversion, error, cost, delay, satisfaction, or risk. |
| Intervention | What changes in process, ownership, data, and technology. |
| Expected mechanism | Why the intervention could move the metric. |
| Target | Agreed improvement and time horizon. |
| Evidence type | Realized, estimated, modeled, or target. |
| Owner | Person accountable for adoption and result. |
| Data source | System/query and metric definition. |
| Cost | Build, license, integration, migration, training, support, change, risk. |
| Confidence | High/medium/low and assumptions. |

### 11.2 Website and commercial KPIs

- Valid form-submission rate and form-completion rate.
- Percentage of leads carrying project, source, campaign, consent, and intent context.
- Duplicate and invalid-lead rate.
- Median and 90th-percentile first-response time.
- Contact, qualification, appointment, site-visit, booking, and cancellation rates.
- Cost per qualified lead, site visit, and booking—not only cost per lead.
- Source and partner attribution accuracy.
- Project-data defect rate and freshness/last-verified compliance.
- Mobile Core Web Vitals from field data and conversion by device/network.
- Content publishing and approval cycle time.
- Form/integration delivery failure rate.

### 11.3 Operational KPIs

- Project report submitted on time.
- Schedule/cost forecast accuracy and change cycle time.
- RFI, NCR, defect, and variation closure time.
- Requisition-to-PO and invoice-processing time.
- Purchase-order compliance and invoice exception rate.
- Bank reconciliation and month-end close duration.
- On-time customer instalment rate and unmatched-payment rate.
- Portal adoption, self-service completion, repeat-contact rate.
- Handover readiness, handover cycle, defect closure, service SLA.
- Preventive-maintenance completion, downtime, response/repair time.
- Energy/water intensity and realized savings for smart-asset pilots.
- ERP active use, process completion in system, spreadsheet/manual-work reduction, and data-quality exceptions.

### 11.4 Simple value formulas

Use formulas with JCX’s numbers:

- **Recovered sales capacity** = monthly qualified leads × current missed/late-response rate × expected recoverable rate × contribution per converted booking.
- **Staff time released** = monthly cases × minutes removed per case ÷ 60 × fully loaded hourly cost.
- **Working-capital effect** = receivables affected × expected days improved × annual financing rate ÷ 365.
- **Avoided rework** = incidents reduced × average direct and delay cost per incident.
- **Energy value realized** = normalized baseline consumption − verified post-intervention consumption, adjusted for occupancy/weather × tariff.
- **Net benefit** = realized financial benefit + defensible risk/capacity value − implementation, license, integration, training, support, and change cost.

Do not count staff time as cash saving unless cost is actually avoided or capacity is deliberately redeployed and measured.

---

## 12. A sensible first engagement

Offer choices, not an oversized transformation proposal.

### Option A — Digital front-door diagnostic

Best when the website is urgent.

Illustrative scope:

- stakeholder interviews;
- website/customer-journey audit;
- analytics and lead-flow instrumentation review;
- project-content and data model;
- CRM/ERP integration map;
- accessibility, performance, security/privacy baseline;
- prioritized product backlog, acceptance criteria, architecture, roadmap, and estimate basis.

### Option B — Enterprise digital-transformation diagnostic

Best when leadership truly wants organization-wide automation.

Adds:

- value-chain process inventory;
- systems/spreadsheets/data landscape;
- ERP program alignment and migration/integration risks;
- departmental maturity and adoption analysis;
- opportunity portfolio and benefits register;
- target operating model, governance, security, AI guardrails, and phased roadmap.

### Option C — One-project commercial pilot

Best when they want proof quickly.

Example:

- one project or Bashundhara cluster;
- governed project data and landing/detail journey;
- corrected structured enquiry;
- CRM routing and SLA;
- source/UTM/project attribution;
- site-visit workflow;
- dashboard to qualification and booking;
- baseline and post-pilot comparison;
- scale/no-scale decision.

### Definition of a good next step

Before leaving the meeting, agree:

- the problem statement;
- the executive sponsor and working owner;
- people to interview;
- systems/data/documents to review;
- current vendor involvement;
- commercial/procurement route;
- exact deliverables;
- timing and meeting cadence;
- confidentiality/access arrangement;
- decision date and scale criteria.

---

## 13. Meeting discipline: do and do not

### Do

- Address people by preferred title and role.
- Ask permission before presenting findings.
- Use evidence and dates.
- Make uncertainty explicit.
- Relate each idea to JCX’s stated values and actual pressure.
- Invite the internal team to correct your public-view assumptions.
- Ask about existing investments before proposing replacements.
- Capture decisions, owners, dependencies, and dates.
- Leave room for them to describe what is not visible publicly.
- Follow up within 24 hours with a short, accurate recap.

### Do not

- Say “your website is bad/old-school.”
- Use “traditional” as a criticism of people or culture.
- overwhelm them with every defect or global company.
- claim Odoo is confirmed or that ERP must be replaced.
- promise that AI will automate everything.
- claim exact ROI without a baseline.
- present a lab score as proof of lost sales.
- criticize an incumbent vendor in front of the client.
- turn the meeting into a technical architecture lecture.
- give away a complete implementation design before scope, access, and commercial alignment.
- leave with “we will send something” and no owner/date.

---

## 14. Immediate follow-up template

**Subject:** JCX digital initiative — meeting recap and proposed next step

> Dear [Name],
>
> Thank you for the discussion today. My understanding is that JCX wants to achieve [business outcome], with the most immediate friction in [journey/process]. The current landscape includes [ERP/CRM/site/vendor facts], while the main points still to validate are [unknowns].
>
> We agreed that the first useful step is [diagnostic/pilot], sponsored by [name/role] and coordinated by [name/role]. JCX will share [inputs] by [date], and we will provide [outputs] by [date]. Success will be evaluated using [metrics/decision criteria].
>
> The core principle we took from the meeting is that the website should operate as a connected digital front door, aligned with JCX’s source data, sales follow-up, customer trust, and ERP roadmap.
>
> Please correct anything I have misunderstood. I will incorporate those corrections before finalizing the scope.
>
> Regards,  
> [Name]

---

## 15. Public sources and evidence

### JCX and Bangladesh context

- [JCX homepage](https://jcxbd.com/)
- [JCX About](https://jcxbd.com/about/)
- [JCX Properties](https://jcxbd.com/properties/)
- [JCX Buyer](https://jcxbd.com/buyer/)
- [JCX Landowner](https://jcxbd.com/landowner/)
- [JCX Construction Status](https://jcxbd.com/construction-status/)
- [JCX Contact](https://jcxbd.com/contact/)
- [JCX News & Events](https://jcxbd.com/news-events/)
- [JCX Management Team](https://jcxbd.com/management-team/)
- [JCX LinkedIn](https://bd.linkedin.com/company/jcx-developments-limited)
- [Creed Group partner page](https://www.creed-group.com/partner)
- [Creed Group — JCX Business Tower](https://www.creed-group.com/jcxbusinesstower)
- [The Business Standard interview with JCX leadership](https://www.tbsnews.net/interviews/real-estate-sector-struggling-survival-now-priority-1174326)
- [Bangladesh Pratidin 2026 interview](https://en.bd-pratidin.com/economy/2026/05/17/62826)
- [JCX IT/MIS ERP job listing](https://bd.linkedin.com/jobs/view/manager-sr-manager-it-mis-for-jcx-developments-ltd-job-id-1514814-at-bdjobs-com-4444528147)
- [Public Odoo-related JCX LinkedIn post](https://www.linkedin.com/posts/md-sohel-rana-aca-acca-fifc_at-jcx-developments-limited-with-odoo-erp-activity-7244684507776217089-nj-2)
- [Prime Bank housing partnership](https://www.thedailystar.net/business/banking/news/jcx-developments-offers-premium-housing-solutions-prime-bank-clients-3980406)
- [RAJUK Electronic Construction Permitting System](https://rajuk.ecps.gov.bd/)
- [Bangladesh National Building Code page](https://hbri.portal.gov.bd/site/page/a5c13d7e-212d-4a16-bbf9-3e1ad937ba56/BANGLADESH-NATIONAL-BUILDING-CODE)

### Platform, security and information-management references

- [PHP supported versions and end-of-life dates](https://www.php.net/eol.php)
- [WordPress recommended requirements](https://en-gb.wordpress.org/about/requirements/)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [buildingSMART Industry Foundation Classes/openBIM](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/?lang=en)
- [ISO 55000 asset-management overview](https://www.iso.org/standard/83053.html)

### Global benchmark sources

- [Emaar Development 2023 Integrated Report](https://properties.emaar.com/wp-content/uploads/2024/03/EMAAR_Integrated-Report_2023-English.pdf)
- [Emaar Development 2024 Integrated Report](https://properties.emaar.com/wp-content/uploads/2025/03/Emaar-Development_Integrated-Report-for-the-Year-2024_EN.pdf)
- [Aldar 2024 Integrated Annual and Sustainability Report](https://cdn.aldar.com/-/media/project/aldar-tenant/aldar2/investors-documents/aldar-integrated-annual-and-sustainability-report-2024.pdf)
- [Aldar 2025 reporting](https://apigateway.adx.ae/adx/cdn/1.0/content/download/4778749)
- [CapitaLand Sustainability X Challenge innovations](https://www.capitaland.com/en/our-impact/sustainability/sustainabilityxchallenge/innovations.html)
- [Swire Properties energy performance](https://sd.swireproperties.com/2025/performance-environment/energy)
- [Mapletree energy-efficiency case](https://www.mapletree.com.sg/newsroom/advancing-energy-efficiency-across-mapletrees-europe-portfolio/)
- [Prologis turnkey warehouse solution](https://www.prologis.com/insights-news/success-stories/turnkey-warehouse-solution-transforms-3pl-warehouse-operation)
- [Digital Realty ENERGY STAR profile](https://www.energystar.gov/about/digital-realty-trust)
- [Hines digital workplace ecosystem](https://www.hines.com/news/hines-invests-in-digital-ecosystem-to-enhance-workplace-experience-connectivity)
- [Hines Global Ventures](https://www.hines.com/globalventures)
- [Lendlease digital construction and productivity](https://www.lendlease.com/media-centre/media-releases/20180327-lendlease-accelerates-productivity-through-innovation/)
- [Majid Al Futtaim sustainability report](https://www.majidalfuttaim.com/docs/default-source/reports/maf-sus-pages-full_final.pdf?sfvrsn=7c1de58c_2)
- [Mitsui Fudosan DX strategy](https://www.mitsuifudosan.co.jp/english/corporate/ir/library/integratedreport/ir2025/dx/)
- [Prestige Group SAP case](https://www.sap.com/india/asset/dynamic/2023/05/ae97b67f-737e-0010-bca6-c68f7e60039b.html)

### Local audit artifacts

- `output/playwright/jcx-lighthouse-mobile.json` — Lighthouse mobile lab output.
- `output/playwright/jcx-lighthouse-desktop.json` — Lighthouse desktop lab output.
- `.playwright-cli/page-2026-08-29T13-46-52-405Z.png` — desktop homepage capture.
- `.playwright-cli/page-2026-08-29T13-47-10-380Z.png` — mobile homepage capture.
- `.playwright-cli/page-2026-08-29T13-47-22-657Z.png` — mobile-menu capture.

---

## 16. Evidence and risk note

This dossier is a public-source preparation brief, not an authenticated technical audit, legal opinion, penetration test, financial due diligence report, customer-research study, or replacement for internal data. Website observations were made on a dated live session and may change. Lighthouse results are laboratory simulations and should be supplemented with GA4, Search Console, real-user Core Web Vitals, CRM, infrastructure, and conversion data. Company and vendor case-study metrics are identified as such; they should inspire questions and pilot design, not become guaranteed JCX forecasts.

The safest and most impressive stance is: **prepared enough to see the system, disciplined enough to ask before prescribing, and commercially mature enough to measure realized value.**
