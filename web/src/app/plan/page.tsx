import type { Metadata } from "next";
import { ExecutivePlan } from "@/components/presentation/ExecutivePlan";
import "@/components/presentation/executive-plan.css";

export const metadata: Metadata = {
  title: "The Propty decision",
  description:
    "A decision-oriented view of the proposed Propty venture, the routes available in Bangladesh and the evidence needed before scaling.",
};

export default function PlanPage() {
  return <ExecutivePlan />;
}
