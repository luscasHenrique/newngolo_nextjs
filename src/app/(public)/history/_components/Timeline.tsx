// src/app/history/_components/Timeline.tsx
"use client"; // Marcado como Client Component

import React from "react";
import TimelineItem from "./TimelineItem";
import type { HistoryMilestone } from "../types/History"; // Caminho ajustado

interface TimelineProps {
  milestones: HistoryMilestone[];
}

const Timeline: React.FC<TimelineProps> = ({ milestones }) => {
  const sortedMilestones = [...milestones].sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    if (a.date && b.date) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

  return (
    <div className="relative wrap overflow-hidden p-6 md:p-10 h-full">
      {/* Linha central vertical para desktop */}
      <div className="border-2-2 absolute border-opacity-20 border-gray-300 h-full border left-1/2 transform -translate-x-1/2 hidden md:block"></div>

      {sortedMilestones.map((milestone, index) => (
        <TimelineItem
          key={milestone.id}
          milestone={milestone}
          isLeft={index % 2 === 0} // Alterna a posição para um layout de zig-zag
        />
      ))}
    </div>
  );
};

export default Timeline;
