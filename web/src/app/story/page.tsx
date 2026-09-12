import type { Metadata } from "next";
import { ResearchPresentation } from "@/components/presentation/ResearchPresentation";

export const metadata: Metadata = {
  title: "The full research journey",
  description: "The JCX research argument in order: business model, operating proof, country transfer, the proposed venture and the internal capability ladder.",
};

export default function StoryPage() {
  return <ResearchPresentation variant="story" />;
}
