export interface Dict {
  nav: {
    home: string; fleet: string; cars: string; scooters: string; atvQuad: string;
    buggy: string; motorbike: string; locations: string; pricing: string;
    insurance: string; faq: string; guides: string; about: string; contact: string;
    book: string; bookNow: string; whatsapp: string; call: string; menu: string;
  };
  common: {
    perDay: string; from: string; week: string; days: string; seats: string;
    doors: string; transmission: string; fuel: string; automatic: string;
    manual: string; gasoline: string; diesel: string; hybrid: string;
    electric: string; seeDetails: string; viewAll: string; backToFleet: string;
    available: string; free: string; yes: string; no: string; readMore: string;
    readArticle: string; relatedArticles: string; relatedVehicles: string;
    breadcrumb: string;
  };
  hero: {
    eyebrow: string; title: string; subtitle: string; ctaPrimary: string;
    ctaSecondary: string; badge1: string; badge2: string; badge3: string; badge4: string;
  };
  why: { title: string; subtitle: string; items: { title: string; body: string }[] };
  fleetTeaser: { title: string; cars: string; scooters: string; atvQuad: string; buggy: string };
  delivery: { title: string; subtitle: string; points: string[] };
  reviews: { title: string; subtitle: string; google: string };
  faqTeaser: { title: string; subtitle: string; cta: string };
  footer: {
    rights: string; description: string; fleet: string; company: string;
    legal: string; languages: string; contact: string; explore: string;
  };
  fleetHub: {
    title: string; subtitle: string; categoryCars: string; categoryScooters: string;
    categoryAtv: string; categoryBuggy: string; categoryMoto: string;
  };
  pricing: {
    title: string; subtitle: string; shoulder: string; high: string; weekly: string; note: string;
  };
  insurance: {
    title: string; subtitle: string; levelsTitle: string;
    levels: { name: string; excess: string; body: string }[];
    includedTitle: string; included: string[];
    notCoveredTitle: string; notCovered: string[];
  };
  faqHub: { title: string; subtitle: string };
  guidesHub: { title: string; subtitle: string };
  locationsHub: { title: string; subtitle: string };
  about: { title: string; subtitle: string; body: string };
  contact: {
    title: string; subtitle: string; phoneLabel: string; emailLabel: string;
    whatsappLabel: string; addressLabel: string; hoursLabel: string;
  };
  book: { title: string; subtitle: string; continue: string; talkToHuman: string };
  whatsAppFab: { label: string; message: string };
  toc: string;
  cta: { bookCar: string; whatsappQuote: string; callNow: string; seeFleet: string };
  theme: { light: string; dark: string; system: string; toggleLabel: string };
  a11y: { skipToContent: string; openMenu: string; closeMenu: string };
  trust: { delivery: string; unlimited: string; transparent: string; owner: string };
}
