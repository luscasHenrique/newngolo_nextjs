"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import type { ClassInfo } from "./types/Class";
import Link from "next/link";

interface ClassCardProps {
  classInfo: ClassInfo;
}

const ClassCard: React.FC<ClassCardProps> = ({ classInfo }) => {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-white bg-opacity-60 w-full shadow-lg overflow-hidden break-words"
    >
      {/* Avatar */}
      <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto sm:mx-0 rounded-full border-[5px] border-white shadow-md overflow-hidden shrink-0">
        <Avatar className="w-full h-full border-none">
          {classInfo.professor.imageUrl ? (
            <AvatarImage
              src={classInfo.professor.imageUrl}
              alt={classInfo.professor.name}
              className="object-cover w-full h-full"
            />
          ) : null}
          <AvatarFallback className="bg-gray-300 text-gray-700 text-xl font-semibold flex items-center justify-center">
            {getInitials(classInfo.professor.name)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Conteúdo */}
      <div className="flex-grow flex flex-col w-full overflow-hidden">
        {/* Nome e título */}
        <div className="mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight break-words">
            {classInfo.professor.name}
          </h2>
          <h4 className="text-sm text-gray-700 mt-1 flex items-center gap-1">
            <FaCalendarAlt className="text-gray-500" />
            Aulas
          </h4>
        </div>

        {/* Contato e local */}
        <div className="text-sm text-gray-700 mb-3 space-y-1">
          <div className="flex items-center gap-1">
            <FaPhoneAlt className="text-gray-500" />
            {classInfo.professor.phone}
          </div>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-gray-500" />
            <span className="break-words block">
              {classInfo.unit.name.toUpperCase()}, {classInfo.unit.address}
            </span>
          </div>
        </div>

        {/* Horários */}
        <ul className="mb-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {classInfo.unit.schedule.map((schedule, index) => (
            <li key={index} className="min-w-[5rem]">
              <h3 className="font-semibold text-gray-800">{schedule.day}</h3>
              <h4 className="text-xs text-gray-600">{schedule.time}</h4>
            </li>
          ))}
        </ul>

        {/* Botões */}
        <div className="flex gap-4 mt-auto w-full">
          <Link href={`/professor/${classInfo.id}`} className="flex-1">
            <Button
              className="w-full sm:w-auto flex-1 transition-all"
              variant="outline"
            >
              Ver Perfil
            </Button>
          </Link>
          <Button
            variant={"ghost"}
            className="w-full sm:w-auto flex-1  transition-all"
          >
            Contatar
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ClassCard;
