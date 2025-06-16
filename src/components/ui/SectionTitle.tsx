// components/ui/SectionTitle.tsx
"use client";

import { TypeAnimation } from "react-type-animation";

interface SectionTitleProps {
  title: string;
  color?: string;
  animate?: boolean;
}

export function SectionTitle({
  title,
  color = "inherit",
  animate = false,
}: SectionTitleProps) {
  const titleStyle = { color };
  const titleClassName = "text-3xl md:text-4xl font-bold tracking-tight";

  return (
    <>
      {animate ? (
        <TypeAnimation
          sequence={[title, 2000]}
          wrapper="h2"
          speed={50}
          style={titleStyle}
          className={titleClassName}
          cursor={false}
        />
      ) : (
        <h2 style={titleStyle} className={titleClassName}>
          {title}
        </h2>
      )}
    </>
  );
}
