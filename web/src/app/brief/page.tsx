import type { Metadata } from "next";
import { ResearchPresentation } from "@/components/presentation/ResearchPresentation";

export const metadata: Metadata = {
  title: "The five minute findings",
  description: "A concise JCX reading of property technology models, country transfer and the evidence boundary for Bangladesh.",
};

export default function BriefPage() {
  return <ResearchPresentation variant="brief" />;
}
