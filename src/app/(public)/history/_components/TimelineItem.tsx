// src/app/history/_components/TimelineItem.tsx
"use client"; // Precisa ser Client Component para usar hooks de estado e framer-motion

import Image from "next/image";
import type { HistoryMilestone } from "../types/History"; // Caminho ajustado
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion"; // Importa framer-motion
import { useInView } from "react-intersection-observer"; // Importa useInView

interface TimelineItemProps {
  milestone: HistoryMilestone;
  isLeft?: boolean; // Para alternar a posição na linha do tempo (opcional)
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  milestone,
  isLeft = false,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // A animação só acontece uma vez quando o elemento entra na view
    threshold: 0.2, // A animação dispara quando 20% do elemento está visível
  });

  const variants = {
    hidden: { opacity: 0, x: isLeft ? -100 : 100 }, // Começa escondido, movido para esquerda ou direita
    visible: { opacity: 1, x: 0 }, // Fica visível, posição original
  };

  return (
    <motion.div // Envolve o item da linha do tempo com motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.6, ease: "easeOut" }} // Duração e tipo de transição
      className={`flex items-center w-full my-8 ${
        isLeft ? "flex-row-reverse" : ""
      }`} // Aumentei o my-4 para my-8 para mais espaçamento
    >
      <div className="w-1/2 p-4 hidden md:block">
        {/* Conteúdo vazio para alinhar a linha */}
      </div>

      {/* Círculo central da linha do tempo */}
      <div className="hidden md:flex flex-col items-center mx-4">
        <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-lg z-10"></div>
        <div className="w-0.5 h-full bg-gray-300"></div> {/* Linha vertical */}
      </div>

      <div className="w-full md:w-1/2 p-4">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-green-600 text-2xl">●</span>{" "}
              {milestone.year}: {milestone.title}
            </CardTitle>
            {milestone.date && (
              <CardDescription className="text-sm text-gray-500 mt-1">
                {new Date(milestone.date).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-3">{milestone.description}</p>
            {milestone.imageUrl && (
              <div className="mt-3">
                <Image
                  src={milestone.imageUrl}
                  alt={milestone.title}
                  width={400}
                  height={250}
                  // layout="responsive" // `layout` é obsoleto no Next.js 13+, use fill/sizes ou remova.
                  // Se não quiser `fill`, remova `layout` e `objectFit` e use apenas `width` e `height`.
                  // Se precisar de responsividade, use `fill` com `sizes` e o contêiner com `relative` e `h-full`.
                  objectFit="cover" // Apenas objectFit não funciona sem layout="fill" ou css de container.
                  className="rounded-md shadow-sm w-full h-auto" // Adicione w-full h-auto para responsividade básica
                />
              </div>
            )}
            {milestone.videoUrl && (
              <div className="mt-3 aspect-video">
                <iframe
                  src={milestone.videoUrl}
                  title={milestone.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-md shadow-sm"
                ></iframe>
              </div>
            )}
            {milestone.category && (
              <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                {milestone.category}
              </span>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
