// src/app/history/page.tsx
// Este é um Server Component por padrão.

import Timeline from "./_components/Timeline";
import { historyMilestones } from "./data/milestones";
import type { HistoryMilestone } from "./types/History";
import { SectionTitle } from "@/components/ui/SectionTitle";

async function getHistoryMilestones(): Promise<HistoryMilestone[]> {
  return Promise.resolve(historyMilestones);
}

export default async function HistoryPage() {
  const milestones = await getHistoryMilestones();

  return (
    <>
      {/* Hero Section */}
      <section className="text-center">
        <SectionTitle title="Nossa História" animate={true} />
        <p className="text-xl font-light max-w-2xl mx-auto mt-4">
          Conheça a trajetória do Centro Cultural Arte Luta N'golo Capoeira.
        </p>
      </section>

      {/* Componente da Linha do Tempo */}
      <Timeline milestones={milestones} />
    </>
  );
}
