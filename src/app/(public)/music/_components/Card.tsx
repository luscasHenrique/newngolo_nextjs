"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { mediaColorMap, mediaIconMap, MediaLink } from "../types/mediaLink";

interface CardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  links: MediaLink[];
}

export const Card: FC<CardProps> = ({ imageSrc, title, subtitle, links }) => {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setAspectRatio(naturalWidth / naturalHeight);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm w-full">
      <div
        className="w-full"
        style={{
          aspectRatio: aspectRatio ? `${aspectRatio}` : "auto",
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          width={200}
          height={200}
          onLoad={handleImageLoad}
          className="w-full h-auto object-contain rounded-t-xl bg-[#f3edea]"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
        <p className="text-sm text-gray-500">
          Em breve em todas as plataformas digitais
        </p>

        <div className="flex space-x-4 pt-2">
          {links.map(({ type, url }) => {
            const Icon = mediaIconMap[type];
            const colors = mediaColorMap[type];
            return (
              <a
                key={type}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300"
                style={{ color: colors.base }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.base;
                }}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
