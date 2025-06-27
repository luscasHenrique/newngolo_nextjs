// src/app/(public)/professor/[id]/page.tsx
// Este é um Server Component por padrão.

import { notFound } from "next/navigation";
import Image from "next/image"; // Mantido, pois a imagem do professor é usada
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { Professor } from "../../professors/types/Professor";
import {
  allClasses,
  allProfessors,
} from "../../professors/data/mockProfessors";
import { ClassInfo } from "../../professors/types/Class";

interface ProfessorPageProps {
  params: {
    id: string; // O ID do professor virá da URL (ex: /professor/prof_anderson)
  };
}

/**
 * Função para buscar um professor específico pelo ID.
 * Busca no array 'allProfessors'.
 */
async function getProfessorDetails(id: string): Promise<Professor | undefined> {
  const professor = allProfessors.find((p) => p.id === id); // Usa allProfessors
  return Promise.resolve(professor);
}

/**
 * Função para buscar as aulas/unidades de ensino associadas a um professor.
 * Busca no array 'allClasses'.
 */
async function getClassesForProfessor(
  professorId: string
): Promise<ClassInfo[]> {
  const classes = allClasses.filter(
    (classItem) => classItem.professor.id === professorId
  ); // Usa allClasses
  return Promise.resolve(classes);
}

// generateStaticParams para pré-renderizar páginas estáticas no build (SSG)
export async function generateStaticParams() {
  // Gera IDs baseados nos IDs dos Professores
  return allProfessors.map((professor) => ({
    id: professor.id,
  }));
}

export default async function ProfessorPage({ params }: ProfessorPageProps) {
  const { id } = await Promise.resolve(params); // Corrige o warning do Next.js

  const professorDetails = await getProfessorDetails(id);
  const professorClasses = await getClassesForProfessor(id);

  if (!professorDetails) return notFound();

  // Lógica para renderizar estrelas
  const renderStars = (rating: number) => {
    const stars = [];
    const ratingOutOf5 = rating / 2;
    const fullStars5 = Math.floor(ratingOutOf5);
    const hasHalfStar5 = ratingOutOf5 - fullStars5 >= 0.5;

    for (let i = 0; i < fullStars5; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }
    if (hasHalfStar5) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    return stars;
  };

  // Mapa de cores para cordas
  const cordColorClasses: { [key: string]: { bg: string; text: string } } = {
    AZUL: { bg: "bg-blue-100", text: "text-blue-800" },
    MARROM: { bg: "bg-amber-100", text: "text-amber-800" },
    VERDE: { bg: "bg-green-100", text: "text-green-800" },
    AMARELA: { bg: "bg-yellow-100", text: "text-yellow-800" },
    ROXA: { bg: "bg-purple-100", text: "text-purple-800" },
    VERMELHA: { bg: "bg-red-100", text: "text-red-800" },
    BRANCA: { bg: "bg-gray-200", text: "text-gray-800" }, // Ajustado para cinza 200 no fundo
  };
  const currentCordColors = cordColorClasses[
    professorDetails.corda.toUpperCase()
  ] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Imagem do Professor */}
        {professorDetails.imageUrl ? (
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-gray-200 shadow-md">
            <Image
              src={professorDetails.imageUrl}
              alt={`Foto de ${professorDetails.name}`}
              fill
              sizes="(max-width: 768px) 128px, 160px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-3xl font-bold flex-shrink-0">
            {professorDetails.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        )}

        {/* Detalhes do Professor */}
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            {professorDetails.name}
          </h1>

          {/* Bio Curta */}
          <p className="text-gray-700 text-lg mb-4">
            {professorDetails.bioShort}
          </p>

          {/* Corda e Categoria */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1 text-base mb-4">
            <span
              className={`px-3 py-1 ${currentCordColors.bg} ${currentCordColors.text} rounded-full font-semibold`}
            >
              Corda: {professorDetails.corda}
            </span>
            <span
              className={`px-3 py-1 ${currentCordColors.bg} ${currentCordColors.text} rounded-full font-semibold`}
            >
              {professorDetails.categoria}
            </span>
          </div>

          {/* Avaliação */}
          <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
            <div className="flex text-2xl">
              {" "}
              {renderStars(professorDetails.avaliacao)}
            </div>
            <span className="text-gray-800 font-semibold text-2xl">
              {professorDetails.avaliacao.toFixed(1)}
            </span>
            {professorDetails.totalReviews && (
              <span className="text-gray-500 text-lg">
                ({professorDetails.totalReviews} avaliações)
              </span>
            )}
          </div>

          {/* Seção de Aulas e Unidades (se existirem) */}
          {professorClasses.length > 0 && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Aulas e Unidades
              </h2>
              <ul className="list-none space-y-4">
                {professorClasses.map((classItem) => (
                  <li
                    key={classItem.id}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <p className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-1">
                      <FaMapMarkerAlt className="text-gray-500" />
                      {classItem.unit.name.toUpperCase()},{" "}
                      {classItem.unit.address}
                    </p>
                    <ul className="space-y-0.5 text-gray-700 text-base pl-6">
                      {classItem.unit.schedule.map((s, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-500 text-sm" />
                          <strong>{s.day}</strong>: {s.time}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-600 text-sm mt-2 flex items-center gap-2">
                      <FaPhoneAlt className="text-gray-500" />
                      Contato da Unidade: {professorDetails.phone}{" "}
                      {/* Usar o telefone do professorDetails, não do classItem.professor */}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Adicione outras informações de currículo aqui (ex: Biografia Longa, Especializações) */}
          {/* Exemplo:
          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sobre o Professor</h2>
            <p className="text-gray-700 leading-relaxed">
              Aqui entraria uma biografia mais detalhada, conquistas, filosofia de ensino, etc.
            </p>
          </div>
          */}
        </div>
      </div>
    </main>
  );
}
