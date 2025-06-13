import Link from "next/link";

interface CardLinkProps {
  title: string;
  href: string;
  imageUrl: string;
}

export function CardLink({ title, href, imageUrl }: CardLinkProps) {
  return (
    <Link
      href={href}
      className="group relative aspect-[9/16] w-full overflow-hidden  shadow-md transition-all "
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:sm:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <span className="text-white text-lg sm:text-4xl font-bold uppercase text-center px-4">
          {title}
        </span>
      </div>
    </Link>
  );
}
