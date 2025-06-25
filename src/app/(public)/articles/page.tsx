// src/app/articles/page.tsx

import { useState, useEffect } from "react";
import ArticleFilters from "./_components/ArticleFilters";
import ArticleCard from "./_components/ArticleCard";

// Suponha que seus dados de artigos venham de uma API ou de um arquivo local
interface Article {
  id: string;
  title: string;
  description: string;
  author?: string;
  publishDate: string;
  fileSize: string;
  fileType: string;
  downloadLink: string;
  category: string;
}

const allArticles: Article[] = [
  {
    id: "1",
    title: "O Futuro da Inteligência Artificial",
    description:
      "Explore as últimas tendências e previsões para o campo da IA.",
    author: "Maria Silva",
    publishDate: "2023-05-10",
    fileSize: "3.1 MB",
    fileType: "PDF",
    downloadLink: "/downloads/ia-futuro.pdf",
    category: "Tecnologia",
  },
  {
    id: "2",
    title: "Guia Completo de Marketing Digital",
    description:
      "Um guia abrangente para estratégias de marketing digital eficazes.",
    author: "João Oliveira",
    publishDate: "2023-04-22",
    fileSize: "4.8 MB",
    fileType: "PDF",
    downloadLink: "/downloads/marketing-digital.pdf",
    category: "Marketing",
  },
  {
    id: "3",
    title: "Tendências de Negócios para 2024",
    description:
      "Descubra as principais tendências que moldarão o cenário empresarial.",
    author: "Ana Paula",
    publishDate: "2024-01-15",
    fileSize: "2.0 MB",
    fileType: "DOCX",
    downloadLink: "/downloads/negocios-2024.docx",
    category: "Negócios",
  },
  {
    id: "4",
    title: "Introdução à Programação Front-end",
    description:
      "Conceitos básicos para quem quer começar a desenvolver interfaces web.",
    author: "Carlos Eduardo",
    publishDate: "2023-11-01",
    fileSize: "1.5 MB",
    fileType: "PDF",
    downloadLink: "/downloads/frontend-intro.pdf",
    category: "Tecnologia",
  },
];

export async function getStaticProps() {
  // Em um projeto real, você buscaria isso de um CMS, banco de dados, etc.
  // Por simplicidade, estamos usando os dados mockados acima.
  const categories = Array.from(
    new Set(allArticles.map((article) => article.category))
  );
  return {
    props: {
      articles: allArticles,
      categories: ["all", ...categories], // 'all' para todas as categorias
    },
  };
}

interface ArticlesPageProps {
  articles: Article[];
  categories: string[];
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({
  articles,
  categories,
}) => {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let currentFiltered = articles;

    // Filtrar por categoria
    if (selectedCategory !== "all") {
      currentFiltered = currentFiltered.filter(
        (article) => article.category === selectedCategory
      );
    }

    // Filtrar por termo de pesquisa
    if (searchTerm) {
      currentFiltered = currentFiltered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (article.author &&
            article.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredArticles(currentFiltered);
  }, [searchTerm, selectedCategory, articles]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Nossos Artigos para Download
      </h1>

      <ArticleFilters
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        categories={categories.filter((cat) => cat !== "all")} // Não passa 'all' para o componente de filtro, pois ele já tem
      />

      {filteredArticles.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">
          Nenhum artigo encontrado com os filtros selecionados.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              description={article.description}
              author={article.author}
              publishDate={article.publishDate}
              fileSize={article.fileSize}
              fileType={article.fileType}
              downloadLink={article.downloadLink}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
