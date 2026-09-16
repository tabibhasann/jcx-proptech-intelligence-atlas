import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ProptyApp } from "@/components/propty/ProptyApp";
import "./prototype.css";
import "./refinement.css";
import "./polish.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--pt-font",
  display: "swap",
});
export const metadata: Metadata = {
  title: { absolute: "Propty · Here and now" },
  description:
    "Explore the Propty product concept. A guided apartment discovery demo, backed by JCX.",
  robots: { index: false, follow: false },
};
export default function PrototypePage() {
  return (
    <div className={inter.variable}>
      <ProptyApp />
    </div>
  );
}
