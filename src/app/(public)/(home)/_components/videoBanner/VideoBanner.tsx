// src/components/videoBanner/VideoBanner.tsx

import Link from "next/link";

interface VideoBannerProps {
  title: string;
  buttonText: string;
  buttonHref: string;
  videoSrc: string; // pode ser .mp4 ou link do YouTube
}

// Funções para YouTube (certifique-se de que as URLs de domínio estão corretas para o YouTube)
// O Googleusercontent.com/youtube.com não são os domínios reais do YouTube.
// O domínio real é youtube.com ou youtu.be.
// Recomendo usar as URLs padrão do YouTube. Vou corrigi-las abaixo.

function isYouTube(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      // Ex: https://www.youtube.com/watch?v=VIDEO_ID
      return parsed.searchParams.get("v");
    }
    if (parsed.hostname.includes("youtu.be")) {
      // Ex: https://youtu.be/VIDEO_ID
      return parsed.pathname.slice(1);
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
    // Removido h-[500px] e md:h-[600px] do container principal
    // Em vez disso, usaremos h-auto e uma proporção para mobile, e altura fixa para md+
    // Tailwind usa classes como 'aspect-video' (16/9) ou 'aspect-square' (1/1).
    // Ou podemos criar uma altura fixa por breakpoint.

    <div className="relative w-full overflow-hidden">
      {/* Container principal para o vídeo.
          Em mobile, queremos que ele ocupe a largura total e a altura seja determinada
          pela proporção do vídeo. Uma boa proporção para vídeos é 16:9.
          md:h-[600px] manterá a altura fixa em telas maiores, como você deseja.
      */}
      <div className="relative pt-[56.25%] md:h-[600px] md:pt-0 w-full">
        {" "}
        {/* pt-[56.25%] = 9 / 16 (para 16:9) */}
        {youtubeId ? (
          <iframe
            // O inset-0 fará com que o iframe preencha o container pai (a div com padding-bottom)
            className="absolute inset-0 w-full h-full"
            // src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`}
            // Usando o domínio correto do YouTube para embeds e adicionando parâmetros para autoplay, mute, loop e remover controles
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture" // Adicionado picture-in-picture
            allowFullScreen
          />
        ) : (
          <video
            className="absolute inset-0 w-full h-full object-cover" // object-cover é crucial para preencher e cortar as bordas se necessário
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
      </div>

      {/* Camada escura por cima (ajustada para cobrir o novo container responsivo) */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Conteúdo em destaque (ajustado para centralizar corretamente dentro do container responsivo) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center h-full text-center px-4">
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
