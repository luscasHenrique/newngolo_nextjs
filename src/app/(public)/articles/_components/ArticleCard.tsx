// src/app/articles/_components/ArticleCard.tsx
// Este componente pode ser um Server Component (não precisa de "use client")

import type { Article } from "../_types/Article"; // Ajustado o caminho

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col justify-between h-full bg-white transition-all duration-300 hover:shadow-lg hover:border-blue-300">
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {article.description}
        </p>
      </div>
      <div className="text-gray-500 text-xs mb-4 flex flex-wrap gap-2">
        {article.author && (
          <span className="p-1 px-2 bg-gray-100 rounded-full text-gray-600">
            Por: {article.author}
          </span>
        )}
        <span className="p-1 px-2 bg-gray-100 rounded-full text-gray-600">
          Publicado em: {article.publishDate}
        </span>
        <span className="p-1 px-2 bg-blue-100 text-blue-800 rounded-full">
          {article.fileType} - {article.fileSize}
        </span>
        <span className="p-1 px-2 bg-green-100 text-green-800 rounded-full">
          Categoria: {article.category}
        </span>
      </div>
      <a
        href={article.downloadLink}
        download
        className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 text-center flex items-center justify-center gap-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-9.707a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM9 5a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Download {article.fileType}
      </a>
    </div>
  );
};

export default ArticleCard;
