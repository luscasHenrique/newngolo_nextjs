// src/app/articles/_types/Article.ts

export interface Article {
  id: string;
  title: string;
  description: string;
  author?: string;
  publishDate: string;
  fileSize: string;
  fileType: "PDF" | "DOCX";
  downloadLink: string; // Caminho para o arquivo no diretório public
  category: string;
}

// Este tipo agora representa apenas os parâmetros de filtro que o hook de lógica manipula
export interface ArticleFiltersState {
  searchTerm: string;
  category: string;
}
