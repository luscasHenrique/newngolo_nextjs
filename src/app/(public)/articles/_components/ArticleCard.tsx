// src/app/(public)/articles/_components/ArticleCard.tsx
import Link from "next/link";

interface ArticleCardProps {
  title: string;
  description: string;
  author?: string;
  publishDate: string;
  fileSize: string;
  fileType: string;
  downloadLink: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  author,
  publishDate,
  fileSize,
  fileType,
  downloadLink,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
      </div>
      <div className="text-gray-500 text-xs mb-4">
        {author && <p>Por: {author}</p>}
        <p>Publicado em: {publishDate}</p>
        <p>
          {fileType} - {fileSize}
        </p>
      </div>
      <a
        href={downloadLink}
        download
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-9.707a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM9 5a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Download
      </a>
    </div>
  );
};

export default ArticleCard;
