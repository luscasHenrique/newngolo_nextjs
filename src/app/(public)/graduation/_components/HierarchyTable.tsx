// src/app/(public)/graduation/_components/HierarchyTable.tsx
import React from "react";
import type { HierarchyTableRow } from "../types/Graduation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface HierarchyTableProps {
  data: HierarchyTableRow[]; // Renomeado 'cords' para 'data' para ser mais genérico
}

const HierarchyTable: React.FC<HierarchyTableProps> = ({ data }) => {
  return (
    <section className="space-y-4">
      {/* Remover Card externo para ser mais fiel */}
      <h2 className="text-4xl font-bold text-gray-800 text-center ">
        Sistema de Graduação Completo
      </h2>{" "}
      {/* Título da seção */}
      <p className="text-lg text-gray-700 text-center ">
        A ordem crescente na hierarquia das cores é:{" "}
        <span className="text-blue-500 font-bold">AZUL</span> ,
        <span className="text-amber-900 font-bold">MARROM</span> ,
        <span className="text-green-500 font-bold">VERDE</span> ,
        <span className="text-yellow-500 font-bold">AMARELA</span>,
        <span className="text-purple-500 font-bold">ROXA</span> ,
        <span className="text-red-500 font-bold">VERMELHA</span> e{" "}
        <span className="text-white bg-black p-1 rounded-xl font-bold">
          BRANCA
        </span>
        .
      </p>
      <p className="text-lg text-gray-700  ">
        As cores são sete, contudo, o número de cordas de graduações são onze,
        isto porque na categoria de alunos é usada a corda de transição mediando
        a passagem de uma graduação de cor pura anterior para outra de cor pura
        posterior – nas graduações de contramestres e mestres são usadas somente
        cores puras (roxa, vermelha, branca). A ordem crescente na hierarquia
        das cordas de graduações é:
      </p>
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        {" "}
        {/* Container para scroll horizontal em telas pequenas */}
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Sistema de Graduação
              </TableHead>
              <TableHead className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Tradicional
              </TableHead>
              <TableHead className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                02 a 05 anos
              </TableHead>
              <TableHead className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                06 a 12 anos
              </TableHead>
              <TableHead className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Especial
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.systemGrade}
                </TableCell>
                <TableCell className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                  {row.traditional}
                </TableCell>
                <TableCell className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                  {row.age2_5Years || "-"}
                </TableCell>
                <TableCell className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                  {row.age6_12Years || "-"}
                </TableCell>
                <TableCell className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                  {row.special || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default HierarchyTable;
