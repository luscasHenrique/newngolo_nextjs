"use client";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "../products/_components/productCard/ProductCard";
import { productsMock } from "../products/_components/productCard/mock";
import { CardLink } from "./_components/cardLink/CardLink";
import { cardLinks } from "./_components/cardLink/data/cardLinks";
import { VideoBanner } from "./_components/videoBanner/VideoBanner";
import { videoBanner } from "./_components/videoBanner/data/videoBanner";
import { useClassesData } from "./_hooks/useClassesData"; // Importa o hook
import ClassCard from "./_components/classCard/ClassCard";
export default function Home() {
  const { classes, loading, error } = useClassesData();
  return (
    <>
      <div className="grid grid-cols-3 gap-4   ">
        {cardLinks.map((card, index) => (
          <CardLink
            key={index}
            title={card.title}
            href={card.href}
            imageUrl={card.imageUrl}
          />
        ))}
      </div>

      <div className="  ">
        <VideoBanner
          title={videoBanner.title}
          buttonText={videoBanner.buttonText}
          buttonHref={videoBanner.buttonHref}
          videoSrc={videoBanner.videoSrc}
        />
      </div>
      {/* Seção das Aulas */}
      <section className="mb-12">
        <SectionTitle title="Nossas Unidades de Ensino" animate={true} />
        <p className="text-xl font-light mb-6">
          Encontre a aula e o professor ideal para você.
        </p>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-stretch">
          {loading && <p>Carregando aulas...</p>}
          {error && (
            <p className="text-red-500">Erro ao carregar aulas: {error}</p>
          )}
          {!loading && !error && classes.length === 0 && (
            <p>Nenhuma aula encontrada.</p>
          )}
          {!loading &&
            !error &&
            classes.length > 0 &&
            classes.map((classItem) => (
              <ClassCard key={classItem.id} classInfo={classItem} />
            ))}
        </div>
      </section>
      <section>
        <SectionTitle title="Nossos Produtos em Destaque" animate={true} />
        <p className="mt-4">Conteúdo da seção de produtos...</p>
      </section>
      {/* Grade de Produtos */}
      <div className="  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
    </>
  );
}
