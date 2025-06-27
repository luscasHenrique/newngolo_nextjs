// src/app/(public)/graduation/page.tsx
// Este é um Server Component por padrão.

import { SectionTitle } from "@/components/ui/SectionTitle";
import GradeSection from "./_components/GradeSection";
import HierarchyTable from "./_components/HierarchyTable";
import SpecialGradesInfo from "./_components/SpecialGradesInfo";
import {
  HierarchyTableRow,
  KnotInfo,
  MainGrade,
  SpecialGrade,
} from "./types/Graduation";
import {
  hierarchyTableData,
  knotInfo,
  mainGrades,
  specialGradesInfo,
} from "./data/gradesData";

async function getGraduationData(): Promise<{
  mainGrades: MainGrade[];
  hierarchyTableData: HierarchyTableRow[]; // Ajustado nome da prop
  specialGrades: SpecialGrade[];
  knotInfo: KnotInfo; // Passa knotInfo
}> {
  return Promise.resolve({
    mainGrades,
    hierarchyTableData,
    specialGrades: specialGradesInfo,
    knotInfo,
  });
}

export default async function GraduationPage() {
  // CORREÇÃO 1: Ajustar os nomes na desestruturação para corresponderem aos nomes das propriedades retornadas pela função.
  // Usamos renomeação de propriedade na desestruturação: 'nomeDaPropriedadeOriginal: novoNomeDaVariavel'
  const {
    mainGrades: fetchedMainGrades, // Renomeia 'mainGrades' para 'fetchedMainGrades'
    hierarchyTableData: fetchedHierarchyTableData, // Renomeia
    specialGrades: fetchedSpecialGrades, // Renomeia
    knotInfo: fetchedKnotInfo, // Renomeia
  } = await getGraduationData();

  return (
    <>
      {/* Hero Section */}
      <section className="text-center space-y-1.5">
        <SectionTitle
          title="Sistema de Graduação N'golo Capoeira"
          animate={true}
        />
        <p className="text-xl font-light ">
          Nosso sistema de graduação segue aspectos vivenciais e esotéricos do
          legado sócio-histórico-cultural do negro no Brasil, com uma conotação
          metafísica e filosófica desvinculada de práticas religiosas.
        </p>
        <p className="italic">
          (Ver Idiopráxis de Capoeira - Mestre Zulu, 1995, p. 77).
        </p>
      </section>

      {/* Seção de Graduações Principais */}
      <section>
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Graduações por Cor e Significado
        </h2>
        <div className="grid grid-cols-1 gap-8">
          {/* CORREÇÃO 2: Explicitamente tipar o parâmetro 'grade' */}
          {fetchedMainGrades.map((grade: MainGrade) => (
            <GradeSection key={grade.id} grade={grade} />
          ))}
        </div>
      </section>

      {/* Seção de Hierarquia das Cordas */}
      <section>
        <HierarchyTable data={fetchedHierarchyTableData} />{" "}
      </section>

      {/* Seção de Adendos e Graduações Especiais */}
      <section>
        <SpecialGradesInfo
          specialGrades={fetchedSpecialGrades}
          knotInfo={fetchedKnotInfo}
        />
      </section>
    </>
  );
}
