import type { Metadata } from "next";
import { ComparativeChapter } from "@/components/presentation/ComparativeChapter";

export const metadata: Metadata = {
  title: "Comparative mechanisms",
  description: "A public-safe comparison of property technology mechanisms, operating burdens, country conditions and transfer tests.",
};

export default function ComparisonPage() {
  return (
    <div className="jcx-site jcx-variant-comparison">
      <ComparativeChapter standalone />
    </div>
  );
}
