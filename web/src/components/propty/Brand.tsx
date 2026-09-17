import Image from "next/image";
import styles from "./Brand.module.css";

/** User-supplied artwork; only surrounding white canvas is masked. */
export function ProptyBrand() {
  return (
    <span className={styles.propty}>
      <Image
        src="/brand/propty.jpg"
        width={1080}
        height={1080}
        alt="Propty"
        priority
      />
    </span>
  );
}
export function JcxBrand() {
  return (
    <span className={styles.endorsement}>
      <span>Powered by</span>
      <Image
        src="/brand/jcx.png"
        width={374}
        height={135}
        alt="JCX, beyond bonding"
      />
    </span>
  );
}
