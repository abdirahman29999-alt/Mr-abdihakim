// Configuration centrale de la marque.
// Pour renommer le produit, il suffit de changer ces valeurs.
export const site = {
  name: "Replio",
  tagline: "L'agent IA qui répond à vos clients sur WhatsApp, 24h/24.",
  description:
    "Replio automatise votre support client WhatsApp avec un agent IA qui répond instantanément, puise dans votre base de connaissances et se connecte à votre CRM.",
  trialDays: 14,
  contactEmail: "businessabdi2025@gmail.com",
  whatsapp: "+253 77 00 00 00",
  locations: ["Djibouti", "International"],
};

export const plans = [
  {
    id: "starter",
    name: "Starter",
    priceUsd: 29,
    priceDjf: "5 000",
    tagline: "Pour les indépendants et petites boutiques",
    highlight: false,
    features: [
      "1 numéro WhatsApp connecté",
      "500 conversations IA / mois",
      "Base de connaissances (liens + documents)",
      "Réponses automatiques 24h/24",
      "Support par email",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceUsd: 79,
    priceDjf: "14 000",
    tagline: "Pour les PME et professionnels qui veulent convertir",
    highlight: true,
    features: [
      "3 numéros WhatsApp connectés",
      "3 000 conversations IA / mois",
      "Connexion CRM (recherche client)",
      "Réponses personnalisées par client",
      "Transfert vers un agent humain",
      "Support prioritaire",
    ],
  },
  {
    id: "business",
    name: "Business",
    priceUsd: 199,
    priceDjf: "35 000",
    tagline: "Pour les entreprises à fort volume",
    highlight: false,
    features: [
      "Numéros WhatsApp illimités",
      "Conversations IA illimitées",
      "CRM + intégrations sur mesure",
      "Analytique avancée",
      "Accompagnement dédié",
      "SLA & support 7j/7",
    ],
  },
];
