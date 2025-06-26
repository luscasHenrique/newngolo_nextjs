// src/app/(public)/professor/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image"; // Não está sendo usado diretamente, pode ser removido se não for usar a imagem
import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { mockClasses } from "../../(home)/data/mockClasses";
import { ClassInfo } from "../../(home)/_components/classCard/types/Class";

// Adaptei o tipo para ser ProfessorInfo ou ClassInfo para a página do professor
// Como você está buscando por classInfo.id e o mockClasses é ClassInfo[], mantemos ClassInfo.
// Se você tiver um mockClasses que contém Professor e você quer buscar por Professor.id,
// então você precisaria de um array de Professor ou um mockClasses mais complexo.

// Funções para buscar dados (exemplo de Server Component)
async function getProfessorInfo(id: string): Promise<ClassInfo | undefined> {
  // Para resolver o warning, podemos usar Promise.resolve aqui para o mock
  // Em um cenário real, você faria um fetch(api/professors/${id})
  // ou buscaria diretamente do DB
  const professorClassInfo = mockClasses.find((c) => c.id === id);
  return professorClassInfo;
}

// generateStaticParams para pré-renderizar páginas estáticas no build (SSG)
export async function generateStaticParams() {
  return mockClasses.map((classItem) => ({
    id: classItem.id, // O ID que será usado na URL (/professor/class1)
  }));
}

export default async function ProfessorPage({
  params,
}: {
  params: { id: string };
}) {
  // CORREÇÃO AQUI: Use 'await' para desestruturar 'params' explicitamente
  // ou para resolver o objeto 'params' antes de usá-lo.
  const { id } = await Promise.resolve(params); // Next.js recomenda isso para calar o warning

  // Agora, 'id' é uma string garantida, não uma Promise-like
  const professor = await getProfessorInfo(id);

  if (!professor) return notFound();

  // É possível que você queira uma página de perfil mais rica
  // Se você tiver mais dados do professor em outro lugar, use-os aqui.
  // Por enquanto, usamos os dados da ClassInfo associados a esse ID.

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Exemplo de Layout para a página do Professor */}
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Imagem do Professor */}
        {professor.professor.imageUrl ? (
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-gray-200 shadow-md">
            <Image
              src={professor.professor.imageUrl}
              alt={`Foto de ${professor.professor.name}`}
              fill
              sizes="(max-width: 768px) 128px, 160px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-3xl font-bold flex-shrink-0">
            {professor.professor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        )}

        {/* Detalhes do Professor */}
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            {professor.professor.name}
          </h1>
          <p className="text-gray-600 text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
            <FaPhoneAlt className="text-gray-500" />
            {professor.professor.phone}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
            Unidade de Ensino
          </h2>
          <p className="text-gray-700 text-lg mb-2 flex items-center justify-center md:justify-start gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            {professor.unit.name}, {professor.unit.address}
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Horários das Aulas
          </h3>
          <ul className="list-none space-y-2 text-gray-700">
            {professor.unit.schedule.map((s, i) => (
              <li
                key={i}
                className="bg-gray-100 px-4 py-2 rounded flex items-center justify-center md:justify-start gap-2"
              >
                <FaCalendarAlt className="text-gray-500" />
                <strong>{s.day}</strong>: {s.time}
              </li>
            ))}
          </ul>

          {/* Adicione mais informações aqui, se o tipo Professor tiver: */}
          {/* <p className="mt-4 text-gray-800">Sobre: Lorem ipsum dolor sit amet...</p> */}
          {/* <div className="mt-4">
            <Button>Entrar em Contato</Button>
          </div> */}
        </div>
      </div>
    </main>
  );
}

// Lembre-se de instalar react-icons se ainda não tiver:
// npm install react-icons
