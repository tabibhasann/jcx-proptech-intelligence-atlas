import Link from "next/link";

const routes = [
  {
    number: "01",
    name: "Improve the transaction journey",
    verdict: "Best place to learn first",
    promise: "Turn existing demand into a more dependable, measurable service.",
    payer: "Buyer, seller or developer through a completed transaction",
    needs: "Reliable inventory, fast response, viewing coordination and a clear owner for every next step",
    risk: "Better software may only record sales that would have happened anyway",
  },
  {
    number: "02",
    name: "Build a broader marketplace",
    verdict: "Potential second act",
    promise: "Bring more developers, agents and customers into one discovery layer.",
    payer: "Advertisers, agents or developers through listings, leads or subscriptions",
    needs: "Repeat supply, sustained demand, listing quality and a reason to choose Propty over existing channels",
    risk: "A larger catalogue can still produce weak trust and low transaction completion",
  },
  {
    number: "03",
    name: "Sell verification and data",
    verdict: "Explore after the records exist",
    promise: "Help institutions make better property decisions with structured evidence.",
    payer: "Banks, developers or professional users",
    needs: "Permissioned data, consistent definitions, legal review and a paying institutional problem",
    risk: "A useful dataset does not automatically create willingness to pay",
  },
] as const;

const capabilities = [
  ["Accurate listings", "Is it available, accurately described and authorised to market?", "Start"],
  ["Assigned follow-up", "Who responds, follows up and takes the next action?", "Start"],
  ["Buyer fit + visits", "Can the team shortlist well and coordinate a useful visit?", "Start"],
  ["Transaction progress", "Can every party see what is blocked and who owns it?", "Start"],
  ["Marketplace reach", "Can Propty repeatedly attract supply and demand beyond JCX?", "Prove next"],
  ["Price and bank data", "Is the record consistent, permissioned and valuable to a payer?", "Earn later"],
] as const;

const phases = [
  {
    range: "Weeks 0–2",
    title: "Measure where we are today",
    copy: "Map the current customer journey, systems, handoffs and costs. Define how leads, visits, offers, closings and collected revenue are recorded today.",
    decision: "Can we create a credible baseline from real operating records?",
  },
  {
    range: "Weeks 3–6",
    title: "Run one narrow pilot",
    copy: "Choose one property segment and improve inventory quality, enquiry assignment, follow-up and viewing coordination using the simplest workable tools.",
    decision: "Did customers and staff experience a meaningful improvement?",
  },
  {
    range: "Weeks 7–12",
    title: "Test commercial value",
    copy: "Compare like with like. Review collected revenue after relevant delivery costs, conversion movement, cycle time, customer quality and operational burden.",
    decision: "Scale, revise or stop based on evidence agreed with management.",
  },
] as const;

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="xp-label">
      <span>{index}</span>
      {children}
    </p>
  );
}

export function ExecutivePlan() {
  return (
    <article className="xp-page">
      <header className="xp-hero">
        <div className="xp-frame xp-hero-grid">
          <div className="xp-hero-copy">
            <p className="xp-overline">Propty / decision brief / public-safe edition</p>
            <h1>
              A focused start.
              <span>A practical test.</span>
              Room to grow.
            </h1>
            <p className="xp-lede">
              Propty could help people find, check and complete a property transaction, then add services where demand is proven. Start with one customer group, measure the improvement and decide what deserves a larger investment.
            </p>
            <div className="xp-hero-actions">
              <a href="#routes">See the three routes <span aria-hidden="true">↓</span></a>
              <Link href="/comparison?lens=managed-distribution#jcx-comparative">Inspect the company comparisons <span aria-hidden="true">↗</span></Link>
            </div>
          </div>

          <aside className="xp-thesis" aria-label="Working thesis">
            <div className="xp-thesis-top">
              <span>Working thesis</span>
              <span>Judgment / requires testing</span>
            </div>
            <strong>Service → records → network</strong>
            <div className="xp-thesis-path" aria-hidden="true">
              <i>01</i><b /><i>02</i><b /><i>03</i>
            </div>
            <ol>
              <li><span>01</span> Make one transaction journey dependable.</li>
              <li><span>02</span> Record the time, cost and outcome.</li>
              <li><span>03</span> Expand where customers show demand.</li>
            </ol>
            <p>If an existing sales operation can supply a pilot, it offers a practical learning environment. Its baseline and incremental impact still need to be established.</p>
          </aside>
        </div>
        <div className="xp-frame xp-hero-foot" aria-hidden="true">
          <span>One venture</span><span>Three possible engines</span><span>One evidence sequence</span>
        </div>
      </header>

      <nav className="xp-jump" aria-label="Roadmap sections"><a href="#routes">Business options</a><a href="#xp-capabilities-title">First features</a><a href="#xp-transfer-title">Global lessons</a><a href="#xp-roadmap-title">12-week pilot</a><a href="#xp-guardrails-title">Risks</a><a href="#xp-jcx-title">JCX internal tools</a></nav>

      <section className="xp-synthesis" aria-labelledby="xp-synthesis-title">
        <div className="xp-frame">
          <SectionLabel index="01">The venture in one view</SectionLabel>
          <div className="xp-section-head">
            <h2 id="xp-synthesis-title">The idea is bigger than a property website.</h2>
            <p>Propty brings these ideas into one venture: customer service, transaction operations, marketplace distribution and future property intelligence. It does not need to launch all four at once.</p>
          </div>
          <div className="xp-system-map" role="img" aria-label="The proposed venture connects customers, an assisted transaction service, operating records and possible future products">
            <div className="xp-node xp-node-small"><span>Demand</span><strong>Buyers<br />and tenants</strong></div>
            <div className="xp-arrow"><span>needs + intent</span><i aria-hidden="true">→</i></div>
            <div className="xp-node xp-node-primary"><span>Start here</span><strong>Assisted<br />transaction</strong><small>information · response · visits · progress</small></div>
            <div className="xp-arrow"><span>structured events</span><i aria-hidden="true">→</i></div>
            <div className="xp-node"><span>Compounding asset</span><strong>Operating<br />record</strong></div>
            <div className="xp-branch">
              <div><span>Reach</span><strong>Marketplace</strong></div>
              <div><span>Intelligence</span><strong>Data products</strong></div>
            </div>
          </div>
          <p className="xp-caption"><b>The strategic sequence:</b> serve a real transaction, record what happens, then test which adjacent business has genuine demand.</p>
        </div>
      </section>

      <section className="xp-routes" id="routes" aria-labelledby="xp-routes-title">
        <div className="xp-frame">
          <SectionLabel index="02">The opportunity choice</SectionLabel>
          <div className="xp-section-head xp-section-head-light">
            <h2 id="xp-routes-title">Three business options. Who would pay?</h2>
            <p>They can live inside one long-term venture. Each still has to earn its place through its own customer, operating requirements and economics.</p>
          </div>
          <div className="xp-route-table">
            {routes.map((route, index) => (
              <article className={index === 0 ? "is-priority" : ""} key={route.number}>
                <div className="xp-route-title">
                  <span>{route.number}</span>
                  <div><h3>{route.name}</h3><mark>{route.verdict}</mark></div>
                </div>
                <p className="xp-route-promise">{route.promise}</p>
                <dl>
                  <div><dt>Possible payer</dt><dd>{route.payer}</dd></div>
                  <div><dt>Must be true</dt><dd>{route.needs}</dd></div>
                  <div><dt>Main risk</dt><dd>{route.risk}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <div className="xp-judgment">
            <span>Current judgment</span>
            <p>Our starting recommendation is to test one transaction journey, if the existing operation can provide customers and usable records. This is a proposal to investigate, not proof that it is the best business. Rental management and other service models remain alternatives in the wider comparison.</p>
          </div>
        </div>
      </section>

      <section className="xp-capabilities" aria-labelledby="xp-capabilities-title">
        <div className="xp-frame">
          <SectionLabel index="03">What the first service must prove</SectionLabel>
          <div className="xp-section-head">
            <h2 id="xp-capabilities-title">Make the next step easier for the customer.</h2>
            <p>The useful unit is a customer job with a responsible owner and a measurable result. AI, automation and interfaces support that job; they are not the job.</p>
          </div>
          <div className="xp-capability-wrap">
            <div className="xp-capability-table" role="table" aria-label="Proposed capability sequence">
              <div className="xp-capability-row xp-capability-head" role="row">
                <span role="columnheader">Capability</span><span role="columnheader">Question it must answer</span><span role="columnheader">Sequence</span>
              </div>
              {capabilities.map(([name, question, stage]) => (
                <div className="xp-capability-row" role="row" key={name}>
                  <strong role="cell">{name}</strong><span role="cell">{question}</span><em role="cell" data-stage={stage}>{stage}</em>
                </div>
              ))}
            </div>
            <aside className="xp-measure-panel">
              <span>Measure the journey</span>
              <div className="xp-funnel" aria-label="Example measurement journey from enquiry to collected revenue">
                <b style={{ "--w": "100%" } as React.CSSProperties}>Enquiry</b>
                <b style={{ "--w": "84%" } as React.CSSProperties}>Qualified need</b>
                <b style={{ "--w": "68%" } as React.CSSProperties}>Useful visit</b>
                <b style={{ "--w": "52%" } as React.CSSProperties}>Accepted offer</b>
                <b style={{ "--w": "38%" } as React.CSSProperties}>Collected revenue</b>
              </div>
              <p>Illustrative stages only. Set definitions and targets from actual operating data.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="xp-transfer" aria-labelledby="xp-transfer-title">
        <div className="xp-frame">
          <SectionLabel index="04">The Bangladesh transfer test</SectionLabel>
          <div className="xp-section-head xp-section-head-light">
            <h2 id="xp-transfer-title">Copy the mechanism. Re-test the conditions.</h2>
            <p>Global examples can reveal useful operating patterns. Bangladesh still determines whether the information exists, customers trust the process, participants cooperate and somebody pays.</p>
          </div>
          <div className="xp-transfer-groups">
            <section className="xp-transfer-group" aria-labelledby="transfer-adapt">
              <header><span>01 / Practical starting point</span><h3 id="transfer-adapt">Adapt now</h3></header>
              <article><h4>Human-assisted digital journey</h4><p>Technology can organise response and follow-up while people handle judgment, negotiation and exceptions.</p></article>
              <article><h4>Clear role ownership</h4><p>Make it clear who responds, who arranges the visit, who follows up and how fees are shared.</p></article>
            </section>
            <section className="xp-transfer-group" aria-labelledby="transfer-validate">
              <header><span>02 / Evidence we still need</span><h3 id="transfer-validate">Validate locally</h3></header>
              <article><h4>Inventory and document checks</h4><p>Define exactly what is checked, by whom, with what authority and what the result does not guarantee.</p></article>
              <article><h4>Willingness to pay</h4><p>Test who would pay for assisted service, listings or institutional data, and what each service costs to deliver.</p></article>
            </section>
            <section className="xp-transfer-group" aria-labelledby="transfer-later">
              <header><span>03 / Only when the foundations hold</span><h3 id="transfer-later">Consider later</h3></header>
              <article><h4>Automated price guidance</h4><p>Requires enough comparable, consistent transaction records that we have permission to use. Asking prices alone are not completed sale prices.</p></article>
              <article><h4>Super-app expansion</h4><p>Add more services when customers return, acquisition is repeatable and the core service can be delivered sustainably.</p></article>
            </section>
          </div>
        </div>
      </section>

      <section className="xp-roadmap" aria-labelledby="xp-roadmap-title">
        <div className="xp-frame">
          <SectionLabel index="05">Illustrative evidence plan</SectionLabel>
          <div className="xp-section-head">
            <h2 id="xp-roadmap-title">Twelve weeks to make a better decision.</h2>
            <p>This is a proposed learning sequence, not a committed launch timeline. Management should set scope, owners and thresholds after the baseline is understood.</p>
          </div>
          <ol className="xp-timeline">
            {phases.map((phase, index) => (
              <li key={phase.range}>
                <div className="xp-time-index"><span>0{index + 1}</span><i aria-hidden="true" /></div>
                <div className="xp-time-main"><em>{phase.range}</em><h3>{phase.title}</h3><p>{phase.copy}</p></div>
                <div className="xp-time-decision"><span>Decision gate</span><p>{phase.decision}</p></div>
              </li>
            ))}
          </ol>
          <div className="xp-gates">
            <div><span>Advance when</span><p>The customer value, operating repeatability and commercial signal are credible together.</p></div>
            <div><span>Change course when</span><p>The service helps but cannot be delivered at a viable burden, or another route shows stronger pull.</p></div>
            <div><span>Stop when</span><p>The evidence does not support an important problem, payer or measurable improvement.</p></div>
          </div>
        </div>
      </section>

      <section className="xp-guardrails" aria-labelledby="xp-guardrails-title">
        <div className="xp-frame xp-guardrail-grid">
          <div>
            <SectionLabel index="06">Technology discipline</SectionLabel>
            <h2 id="xp-guardrails-title">Automate after the responsibility is clear.</h2>
            <p className="xp-guardrail-lede">Begin with an assessment of the current CRM, records and workflows. Buy or configure proven tools where they fit. Build only where the workflow or data creates a real advantage.</p>
          </div>
          <div className="xp-rules">
            <article><span>01</span><h3>Human accountability</h3><p>A named person remains responsible for important recommendations, documents, exceptions and customer outcomes.</p></article>
            <article><span>02</span><h3>Consent and control</h3><p>Customer outreach needs appropriate disclosure, consent, opt-out and a route to a person.</p></article>
            <article><span>03</span><h3>Bounded claims</h3><p>Document or listing checks state their scope. They do not promise ownership, legality or fraud elimination.</p></article>
            <article><span>04</span><h3>Observable value</h3><p>Track the outcome, delivery cost and operational burden. Do not count activity as impact.</p></article>
          </div>
        </div>
      </section>

      <section className="xp-jcx" aria-labelledby="xp-jcx-title">
        <div className="xp-frame xp-jcx-grid">
          <div>
            <SectionLabel index="07">A connected but separate track</SectionLabel>
            <h2 id="xp-jcx-title">JCX can modernise internally without making every tool a Propty product.</h2>
          </div>
          <ul>
            <li><b>Customer record</b><span>One accountable history of enquiries, conversations and next actions.</span></li>
            <li><b>Inventory record</b><span>Available units, status, information quality and ownership of updates.</span></li>
            <li><b>Sales operations</b><span>Assignment, follow-up, visits, offers and reasons deals progress or stall.</span></li>
            <li><b>Management view</b><span>Comparable operating and commercial outcomes, with agreed definitions.</span></li>
          </ul>
          <p className="xp-jcx-note">Shared infrastructure may support Propty. Productisation should follow external customer demand, not internal usefulness alone.</p>
        </div>
      </section>

      <footer className="xp-next">
        <div className="xp-frame">
          <SectionLabel index="08">The next management decision</SectionLabel>
          <h2>Choose the first journey.<br />Name the payer.<br />Agree what would count as proof.</h2>
          <div className="xp-next-links">
            <Link href="/comparison?lens=managed-distribution#jcx-comparative">Read the comparable operating cases <span aria-hidden="true">↗</span></Link>
            <Link href="/evidence">Inspect the evidence and its limits <span aria-hidden="true">↗</span></Link>
            <Link href="/">Return to the executive overview <span aria-hidden="true">↗</span></Link>
          </div>
          <p>This page presents a provisional strategic interpretation for discussion. It does not establish audited operations, legal conclusions, commercial commitments or proven recommendations.</p>
        </div>
      </footer>
    </article>
  );
}
