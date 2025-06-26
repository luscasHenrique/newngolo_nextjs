// src/app/(public)/_components/classCard/ClassCard.tsx
"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

import type { ClassInfo } from "./types/Class";

interface ClassCardProps {
  classInfo: ClassInfo;
}

const ClassCard: React.FC<ClassCardProps> = ({ classInfo }) => {
  return (
    <Card className="w-full max-w-[380px] min-h-[180px] border-none shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col relative overflow-hidden">
      {/* Adicionado relative e overflow-hidden para a imagem flutuante */}
      {/* Imagem do Professor no Canto Superior Direito */}
      {classInfo.professor.imageUrl ? (
        <div className="absolute top-4 right-4 w-16 h-16 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm flex-shrink-0 z-10">
          {/* z-10 para garantir que fique por cima */}
          <Image
            src={classInfo.professor.imageUrl}
            alt={`Imagem do Professor ${classInfo.professor.name}`}
            fill
            sizes="64px" // Tamanho ajustado da imagem para 64x64px
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      ) : (
        <div className="absolute top-4 right-4 w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs text-center p-1 flex-shrink-0 border border-gray-300 z-10">
          Imagem do Professor
        </div>
      )}
      <CardHeader>
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-gray-500 text-lg" />
          <CardTitle className="text-lg font-bold text-gray-800">
            Aulas
          </CardTitle>
        </div>
        <h3 className="text-lg font-bold text-gray-900 leading-tight  uppercase pr-20">
          {classInfo.professor.name}
        </h3>
        <p className="text-gray-600 text-sm flex items-center gap-2">
          <FaPhoneAlt className="text-gray-400 text-sm" />
          {classInfo.professor.phone}
        </p>
      </CardHeader>
      <div className="border-b border-gray-200 "></div>
      <CardContent className="  flex flex-col space-y-1">
        <CardTitle className="text-lg font-bold text-gray-800  flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-500 text-base" />
          {classInfo.unit.name.toUpperCase()}
        </CardTitle>
        <CardDescription className="text-gray-700 text-sm ">
          {classInfo.unit.address}
        </CardDescription>
        <div className="">
          {classInfo.unit.schedule.map((schedule, index) => (
            <p key={index} className="text-gray-700 text-sm">
              {schedule.day} - {schedule.time}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
