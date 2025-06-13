// src/data/cardLinks.ts
export interface CardData {
  title: string;
  href: string;
  imageUrl: string;
}

export const cardLinks: CardData[] = [
  {
    title: "Academy",
    href: "/academy",
    imageUrl:
      "https://play-lh.googleusercontent.com/sBF5-1ZnOT8ZOY8kf09fSfAu_U6z3GRBJeiXksFX7qStp0frrxCMMOFvp8kw6d9HDQ=w526-h296-rw",
  },
  {
    title: "Instructors",
    href: "/instructors",
    imageUrl:
      "https://cdn.gazetasp.com.br/img/c/1200/675/dn_arquivo/2024/08/mulher-academia-dragonimages.jpg",
  },
  {
    title: "Programs",
    href: "/programs",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxILC7r31g1rCQifxQRmCd4W0mOSHek5S2yg&s",
  },
];
