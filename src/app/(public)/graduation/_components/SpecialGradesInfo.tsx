// src/app/(public)/graduation/_components/SpecialGradesInfo.tsx
import React from "react";
import type { SpecialGrade, KnotInfo } from "../types/Graduation"; // Importa KnotInfo
import { FaInfoCircle } from "react-icons/fa"; // Ícone

interface SpecialGradesInfoProps {
  specialGrades: SpecialGrade[];
  knotInfo: KnotInfo; // Dados sobre o nó
}

const SpecialGradesInfo: React.FC<SpecialGradesInfoProps> = ({
  specialGrades,
  knotInfo,
}) => {
  return (
    <section className=" p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {" "}
      {/* Contêiner simples */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaInfoCircle className="text-blue-500" /> Adendos e Graduações
        Especiais
      </h2>
      <p className="text-gray-700 text-base leading-relaxed mb-6">
        Inclusão definida no Encontro Pedagógico N'golo Capoeira de 2015 e (não
        consta no livro Idiopráxis de Capoeira - Mestre Zulu)
      </p>
      {/* Seção de Graduações Especiais Detalhadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {specialGrades.map((grade) => (
          <div
            key={grade.id}
            className="p-4 bg-gray-50 rounded-md border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {grade.title}
            </h3>
            {grade.ageRange && (
              <p className="text-sm text-gray-600 mb-1">
                Faixa Etária: {grade.ageRange}
              </p>
            )}
            {grade.category && (
              <p className="text-sm text-gray-600 mb-1">
                Categoria: {grade.category}
              </p>
            )}
            <p className="text-gray-700 text-base leading-relaxed">
              {grade.description}
            </p>
          </div>
        ))}
      </div>
      {/* Informações sobre o Nó da Corda */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Simbologia do Nó da Corda
      </h2>
      <p className="text-gray-700 text-base leading-relaxed mb-2">
        {knotInfo.description}
      </p>
      <p className="text-gray-700 text-base leading-relaxed mb-2">
        <span className="font-bold">{knotInfo.genderRuleMale}</span>
      </p>
      <p className="text-gray-700 text-base leading-relaxed">
        <span className="font-bold">{knotInfo.genderRuleFemale}</span>.
      </p>
    </section>
  );
};

export default SpecialGradesInfo;
