import Image from "next/image";

/** The entire lockup from slide 1. Only the surrounding empty canvas is masked. */
export function ProptyBrand() {
  return (
    <span className="pt-original-brand">
      <Image
        src="/propty/propty-deck.png"
        width={1000}
        height={1000}
        alt="Propty, powered by JCX"
        priority
      />
    </span>
  );
}
export function JcxBrand() {
  return (
    <span className="pt-jcx-brand">
      <span>Backed by</span>
      <Image
        src="/propty/jcx-deck.png"
        width={374}
        height={135}
        alt="JCX, beyond bonding"
      />
    </span>
  );
}
