// src/app/articles/page.tsx
// Este é um Server Component por padrão.

import { SectionTitle } from "@/components/ui/SectionTitle";
import ArticleListDisplay from "./_components/ArticleListDisplay";
import type { Article } from "./_types/Article"; // Importa o tipo
import { mockArticles } from "./data/mockArticles";

// Função para buscar os artigos (executada no servidor)
// Por enquanto, usa os dados mockados diretamente.
// Se quiser usar uma API Route, pode chamar `fetch('/api/articles')` ou similar.
async function getArticles(): Promise<Article[]> {
  // Em um projeto real, aqui você faria uma chamada a uma API externa,
  // um CMS, ou consultaria um banco de dados.
  // Por exemplo:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, { next: { revalidate: 3600 } });
  // if (!res.ok) throw new Error('Failed to fetch articles');
  // return res.json();

  // Usando dados mockados:
  return Promise.resolve(mockArticles);
}

export default async function ArticlesPage() {
  const articles = await getArticles(); // Busca os dados no servidor

  // Extrai as categorias únicas para o filtro, incluindo 'all' para a opção de filtro.
  const uniqueCategories = Array.from(
    new Set(articles.map((article) => article.category))
  );
  // availableCategories não precisa do 'all' aqui, pois o ArticleFilters adiciona como opção padrão.

  return (
    <>
      {/* Hero Section */}

      <section className="text-center">
        <SectionTitle title="Nossa Biblioteca de Artigos" animate={true} />
        <p className="mt-4">
          Explore e faça o download de nossos artigos técnicos e guias completos
          sobre diversos tópicos relevantes. Aprofunde seus conhecimentos e
          mantenha-se atualizado.
        </p>
      </section>

      {/* ArticleListDisplay é o Client Component que gerencia a exibição e a lógica de filtro */}
      <ArticleListDisplay
        initialArticles={articles}
        availableCategories={uniqueCategories}
      />
    </>
  );
}
