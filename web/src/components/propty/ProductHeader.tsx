"use client";
import { useState } from "react";
import { ProptyBrand, JcxBrand } from "./Brand";
import { Modal } from "./Modal";
import styles from "./ProductHeader.module.css";

export type ProductDestination = "buy" | "rent" | "projects" | "compare" | "saved" | "visits";
export function ProductHeader({active, savedCount, onNavigate, onHelp}: {
  active?:ProductDestination; savedCount:number;
  onNavigate:(destination:ProductDestination)=>void; onHelp:()=>void;
}) {
  const [open,setOpen] = useState(false);
  const items: [ProductDestination,string][] = [["buy","Buy"],["rent","Rent"],["projects","New Projects"],["compare","Compare homes"],["saved","Saved"]];
  const go = (destination:ProductDestination) => { setOpen(false); onNavigate(destination); };
  return <>
    <header className={styles.header}>
      <button className={styles.brand} aria-label="Propty home" onClick={()=>go("buy")}><ProptyBrand /></button>
      <nav className={styles.navigation} aria-label="Propty navigation">
        {items.map(([id,label])=><button key={id} aria-current={active===id?"page":undefined} onClick={()=>go(id)}>{label}{id==="saved"&&savedCount>0&&<span className={styles.count}>{savedCount}</span>}</button>)}
      </nav>
      <div className={styles.utilities}>
        <button className={styles.menu} onClick={()=>setOpen(true)} aria-label="Open navigation menu" aria-haspopup="dialog">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>
          <span>Menu</span>
        </button>
        <JcxBrand />
      </div>
    </header>
    {open&&<Modal title="Explore Propty" onClose={()=>setOpen(false)}>
      <nav className={styles.mobileNavigation} aria-label="All Propty pages">
        {items.map(([id,label])=><button key={id} aria-current={active===id?"page":undefined} onClick={()=>go(id)}>{label}<span aria-hidden="true">↗</span></button>)}
        <button onClick={()=>go("visits")}>My visits<span aria-hidden="true">↗</span></button>
        <button onClick={()=>{setOpen(false);onHelp();}}>Help me choose<span aria-hidden="true">↗</span></button>
      </nav>
    </Modal>}
  </>;
}
