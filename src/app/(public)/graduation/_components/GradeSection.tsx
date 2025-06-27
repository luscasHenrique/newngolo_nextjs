// src/app/(public)/graduation/_components/GradeSection.tsx
"use client"; // Precisa ser Client Component

import React from "react";
import type { MainGrade } from "../types/Graduation";
// IMPORTAÇÃO DINÂMICA PARA FRAMER-MOTION
import dynamic from "next/dynamic"; // Importa o dynamic do Next.js

// O componente motion é carregado dinamicamente APENAS no lado do cliente
const MotionSection = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.section),
  {
    ssr: false, // ISSO É CRUCIAL: Garante que não seja processado no lado do servidor
  }
);

interface GradeSectionProps {
  grade: MainGrade;
}

const GradeSection: React.FC<GradeSectionProps> = ({ grade }) => {
  //   const headerTextColorClass =
  //     grade.cordColor === "AMARELA" ||
  //     grade.cordColor === "BRANCA" ||
  //     grade.cordColor === "VERDE"
  //       ? "text-gray-900"
  //       : "text-white";

  const headerTextColorClass = "text-white";
  const contentTextColorClass = "text-gray-800";

  return (
    <MotionSection // Use MotionSection aqui
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className=" rounded-lg overflow-hidden shadow-sm border border-gray-200"
    >
      <div
        className={`p-4 ${grade.headerColorClass} ${headerTextColorClass} flex items-center gap-4`}
      >
        <div
          className={`w-6 h-6 rounded-full border-2 border-white shadow-sm flex-shrink-0`}
          style={{ backgroundColor: grade.headerColorClass.replace("bg-", "") }}
        ></div>
        <h3 className="text-xl font-bold uppercase">
          {grade.cordColor} - {grade.category}
        </h3>
      </div>

      <div className="p-6 bg-white space-y-4">
        <p className={`text-base leading-relaxed ${contentTextColorClass} `}>
          <span className="font-bold">Fase Social do Negro:</span>
          {grade.phaseSocialNegro}
        </p>

        <p className={`text-base leading-relaxed ${contentTextColorClass} `}>
          <span className="font-bold">Domínio de Irradiação do Orixá:</span>
          {grade.orixa.name}, que está em {grade.orixa.domain}. Cor
          representativa de {grade.orixa.name} -
          {grade.orixa.representativeColor}.
        </p>

        <p className={`text-base leading-relaxed ${contentTextColorClass}`}>
          <span className="font-bold">Relação Metafísica:</span>
          {grade.metaPhysicalRelation}
        </p>
      </div>
    </MotionSection>
  );
};

export default GradeSection;
