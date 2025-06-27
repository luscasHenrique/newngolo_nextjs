// src/app/(public)/graduation/_data/gradesData.ts

import type {
  MainGrade,
  HierarchyTableRow,
  SpecialGrade,
  KnotInfo,
} from "../types/Graduation";

export const mainGrades: MainGrade[] = [
  {
    id: "azul",
    cordColor: "AZUL",
    category: "ALUNO",
    phaseSocialNegro:
      "Fase Social do Negro - Fase do Negro Cativo. Representa o período compreendido entre o aprisionamento do negro na África, o seu transporte pelo mar e sua venda em terras brasileiras.",
    orixa: {
      name: "Iemanjá",
      domain: "o mar e nas areias, onde reina augusta e soberana.",
      representativeColor: "Azul",
    },
    metaPhysicalRelation:
      "As viagens dos cativos eram verdadeiros martírios em alto-mar, o mar e suas areias constituem domínios de Iemanjá, assim os negros cativos estavam sob a proteção esotérica da soberana rainha do mar.",
    headerColorClass: "bg-blue-600", // Cor forte para o cabeçalho
  },
  {
    id: "marrom",
    cordColor: "MARROM",
    category: "ALUNO",
    phaseSocialNegro:
      "Fase Social do Negro: Fase do negro escravo - Representa a fase em que o negro é patrimônio de um senhor, submetido ao trabalho escravo, perdendo toda esperança de liberdade para o corpo e para a alma.",
    orixa: {
      name: "Xangô",
      domain:
        "o trovão, nos raios e no fogo. Grande guerreiro, guardião do céu e da terra.",
      representativeColor: "Marrom",
    },
    metaPhysicalRelation:
      "Desarraigar o negro de sua terra natal África, significou a perda total de liberdade, estando ele fora do âmbito da terra e do céu da África, Xangô não o aconselharia.",
    headerColorClass: "bg-amber-700", // Cor para o marrom (laranja mais escuro)
  },
  {
    id: "verde",
    cordColor: "VERDE",
    category: "ALUNO",
    phaseSocialNegro:
      "Fase Social do Negro Fase do Negro Quilombola: Representa a alternativa de rebeldia preferida pelos negros escravos para conquistarem a liberdade. Construindo quilombos que eram comunidades independentes, cada qual com sua importância e com as suas peculiaridades.",
    orixa: {
      name: "Oxossi",
      domain:
        "as matas, é um príncipe caçador e guardião das matas, onde a maioria das vezes refugiavam-se os negros.",
      representativeColor: "Verde",
    },
    metaPhysicalRelation:
      "Os quilombos eram comunidades muito dinâmicas, de grande riqueza sócio-cultural. Cada quilombo tinha suas matas.",
    headerColorClass: "bg-green-600",
  },
  {
    id: "amarela",
    cordColor: "AMARELA",
    category: "MONITOR",
    phaseSocialNegro:
      "Fase Social do Negro Fase do Negro Capitão de Areia: Representa a fase decorrente da promulgação da Lei do Ventre Livre em 1871, em que os filhos das negras escravas nasciam livres como as águas doces e caíam na delinqüência como as águas de cachoeira, por não terem condições de se manterem plenamente livres.",
    orixa: {
      name: "Oxum",
      domain:
        "as cachoeiras, nos rios e nas águas doces. Filha mimada de Oxalá e detentora de grande beleza e encanto.",
      representativeColor: "Amarela",
    },
    metaPhysicalRelation:
      "A Lei do Ventre Livre representa um aspecto dúbio, em que a criança nascia livre como as águas doces das nascentes, mas caía na delinqüência e na marginalidade como as águas em queda numa cachoeira.",
    headerColorClass: "bg-yellow-500", // Amarelo
  },
  {
    id: "roxa",
    cordColor: "ROXA",
    category: "CONTRAMESTRE",
    phaseSocialNegro:
      "Fase Social do Negro Fase do Negro Sexagenário: Representa a fase advinda com a vigência da Lei dos Sexagenários que, à primeira vista apresentava como uma generosa concessão, no entanto faltava ao escravo sexagenário condições de vida para exercer uma atividade lucrativa capaz de promover a sua manutenção. Conheceu a liberdade como a dos ventos e também o desafio de sobrevivência como que uma tempestade.",
    orixa: {
      name: "Iansã",
      domain: "as tempestades, ventanias e coriscos.",
      representativeColor: "Roxa",
    },
    metaPhysicalRelation:
      "A Lei dos Sexagenários representou um grande desafio para os sexagenários, pois foi um grande confronto, liberdade semelhante à dos ventos das tempestades, domínios de Iansã.",
    headerColorClass: "bg-purple-600",
  },
  {
    id: "vermelha",
    cordColor: "VERMELHA",
    category: "MESTRE EDIFICADOR",
    phaseSocialNegro:
      "Fase Social do Negro Fase do Negro Liberto: Representa a fase advinda com a vigência da Lei Áurea de 13 de maio de 1888. A sociedade da época via o negro liberto como ignorante, preguiçoso e desordeiro, de ânimo viciado e moral degenerada e o marginalizava. Este por sua vez, na busca pela sobrevivência notabilizou-se como guerreiro, participando de maltas e de empreitadas como capanga.",
    orixa: {
      name: "Ogum",
      domain: "o ferro, nos desastres, nas guerras e nas demandas espirituais.",
      representativeColor: "Vermelha",
    },
    metaPhysicalRelation:
      "A rivalidade entre as maltas de capoeiristas eram seriíssimas e os confrontos eram sempre sangrentos, porém o agravo com a polícia era geral e bem maior. A atitude guerreira do negro liberto se ajusta ao domínio de irradiação de Ogum, ele simboliza a energia ativa.",
    headerColorClass: "bg-red-600",
  },
  {
    id: "branca",
    cordColor: "BRANCA",
    category: "MESTRE DIGNIFICADOR",
    phaseSocialNegro:
      "Fase Social do Negro Fase do Negro Cidadão: Representa a fase em que o negro embora ainda em condição de inferioridade, de minguamento das oportunidades, consegue reconhecer-se criticamente a partir de sua inserção na sociedade e terá de conquistar seus direitos universais de cidadania.",
    orixa: {
      name: "Oxalá",
      domain:
        "a abóboda celeste, ligado ao princípio de tudo, da criação, da pureza e da paz. É o chefe supremo e pai de quase todas as divindades.",
      representativeColor: "Branca",
    },
    metaPhysicalRelation:
      "Com a veiculação secular de imagens estereotipadas do negro, formou-se um racismo dissimulado em que o seu combate exige o envolvimento consciente de todos os segmentos sociais na busca de uma cidadania plena para todos. O exercício da cidadania plena está associada à universalidade de irradiações de Oxalá.",
    headerColorClass: "bg-gray-400", // Um cinza claro para a corda branca
  },
];

export const hierarchyTableData: HierarchyTableRow[] = [
  {
    id: "h1",
    systemGrade: "1",
    traditional: "Azul",
    age2_5Years: "Crua - 1 ponteira-Azul",
    age6_12Years: "Azul - 1 ponteira-Marrom",
    special: "", // Deixando vazio se não houver correspondência direta
  },
  {
    id: "h2",
    systemGrade: "2",
    traditional: "Azul-Marrom",
    age2_5Years: "",
    age6_12Years: "Azul - 2 ponteiras-Marrom",
    special: "Azul/Crua - uma ponteira-Marrom",
  },
  {
    id: "h3",
    systemGrade: "3",
    traditional: "Marrom",
    age2_5Years: "Crua - 1 ponteira-Marrom",
    age6_12Years: "Azul - 1 ponteira-Verde",
    special: "",
  },
  {
    id: "h4",
    systemGrade: "4",
    traditional: "Marrom-Verde",
    age2_5Years: "",
    age6_12Years: "Azul - 2 ponteiras-Verde",
    special: "Marrom/Crua - uma ponteira-Verde",
  },
  {
    id: "h5",
    systemGrade: "5",
    traditional: "Verde",
    age2_5Years: "Crua - 1 ponteira-Verde",
    age6_12Years: "Azul - 1 ponteira-Amarela",
    special: "",
  },
  {
    id: "h6",
    systemGrade: "6",
    traditional: "Verde-Amarela",
    age2_5Years: "",
    age6_12Years: "Azul - 2 ponteiras-Amarela",
    special: "Verde/Crua - uma ponteira-Amarela",
  },
  {
    id: "h7",
    systemGrade: "7",
    traditional: "Amarela",
    age2_5Years: "Crua - 1 ponteira-Amarela",
    age6_12Years: "Amarela", // A imagem mostra apenas "Amarela" aqui
    special: "",
  },
  {
    id: "h8",
    systemGrade: "8",
    traditional: "Amarela-Roxa",
    age2_5Years: "",
    age6_12Years: "", // A imagem não mostra nada aqui
    special: "Amarela/Crua - uma ponteira-Roxa",
  },
  {
    id: "h9",
    systemGrade: "9",
    traditional: "Roxa",
    age2_5Years: "",
    age6_12Years: "", // A imagem não mostra nada aqui
    special: "",
  },
  {
    id: "h10",
    systemGrade: "10",
    traditional: "Vermelha",
    age2_5Years: "",
    age6_12Years: "", // A imagem não mostra nada aqui
    special: "Roxa/Crua - uma ponteira-Vermelha",
  },
  {
    id: "h11",
    systemGrade: "11",
    traditional: "Branca",
    age2_5Years: "",
    age6_12Years: "", // A imagem não mostra nada aqui
    special: "Vermelha - com falha a cada 5cm antes da Boneca",
  },
];

export const specialGradesInfo: SpecialGrade[] = [
  {
    id: "sg1",
    title: "Corda Crua",
    description: "Graduação - para crianças de 02 a 05 anos.",
    category: "FILIADO",
  },
  {
    id: "sg2",
    title:
      "Corda Crua c/ a ponteira colorida na cor correspondente à sua graduação",
    description: "Reciclagem",
    category: "RECICLAGEM",
  },
  {
    id: "sg3",
    title: "Graduação Especial",
    description: "Terceira idade e PCD.",
    category: "ESPECIAL",
  },
];

export const knotInfo: KnotInfo = {
  description:
    "O nó da corda deve ser feito buscando-se o símbolo do infinito (oito deitado).",
  genderRuleMale: "Se for do sexo masculino deve usar o nó é do lado direito",
  genderRuleFemale: "e se for do sexo feminino o nó fica do lado esquerdo.",
};
