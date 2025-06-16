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
      "https://plus.unsplash.com/premium_photo-1661265933107-85a5dbd815af?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWNhZGVtaWF8ZW58MHx8MHx8fDA%3D",
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
      "https://ciadocorpo.bio.br/wp-content/uploads/2024/06/sobre-2.jpg",
  },
];
