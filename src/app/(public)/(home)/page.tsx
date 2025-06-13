// import Link from "next/link";

import { CardLink } from "./_components/cardLink/CardLink";
import { cardLinks } from "./_components/cardLink/data/cardLinks";
import { VideoBanner } from "./_components/videoBanner/VideoBanner";
import { videoBanner } from "./_components/videoBanner/data/videoBanner";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto px-4 py-8">
        {cardLinks.map((card, index) => (
          <CardLink
            key={index}
            title={card.title}
            href={card.href}
            imageUrl={card.imageUrl}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <VideoBanner
          title={videoBanner.title}
          buttonText={videoBanner.buttonText}
          buttonHref={videoBanner.buttonHref}
          videoSrc={videoBanner.videoSrc}
        />
      </div>
    </>
  );
}
