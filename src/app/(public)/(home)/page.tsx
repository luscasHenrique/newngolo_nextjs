"use client";

import { ProductCard } from "../_components/productCard/ProductCard";
import { productsMock } from "../_components/productCard/mock";
import { CardLink } from "./_components/cardLink/CardLink";
import { cardLinks } from "./_components/cardLink/data/cardLinks";
import { VideoBanner } from "./_components/videoBanner/VideoBanner";
import { videoBanner } from "./_components/videoBanner/data/videoBanner";

export default function Home() {
  return (
    <div className="space-y-10 my-10">
      <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto px-4 ">
        {cardLinks.map((card, index) => (
          <CardLink
            key={index}
            title={card.title}
            href={card.href}
            imageUrl={card.imageUrl}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 ">
        <VideoBanner
          title={videoBanner.title}
          buttonText={videoBanner.buttonText}
          buttonHref={videoBanner.buttonHref}
          videoSrc={videoBanner.videoSrc}
        />
      </div>

      {/* Grade de Produtos */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Aqui fazemos o loop (map) no nosso array de produtos do mock.
            Para cada 'product' no array, um componente <ProductCard> é renderizado.
          */}
        {productsMock.map((product) => (
          <ProductCard
            key={product.id} // A 'key' é essencial para o React otimizar a renderização de listas
            product={product} // Passamos o objeto inteiro do produto para o componente
          />
        ))}
      </div>
    </div>
  );
}
