// src/components/videoBanner/VideoBanner.tsx

import Link from "next/link";

interface VideoBannerProps {
  title: string;
  buttonText: string;
  buttonHref: string;
  videoSrc: string; // pode ser .mp4 ou link do YouTube
}

function isYouTube(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
}

export function VideoBanner({
  title,
  buttonText,
  buttonHref,
  videoSrc,
}: VideoBannerProps) {
  const isYT = isYouTube(videoSrc);
  const youtubeId = isYT ? extractYouTubeId(videoSrc) : null;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {youtubeId ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Camada escura por cima */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Conteúdo em destaque */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-white text-2xl md:text-4xl font-extrabold mb-4">
          {title}
        </h2>
        <Link
          href={buttonHref}
          className="bg-white text-black px-5 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
