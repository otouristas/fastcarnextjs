// Naxos-adapted knowledge base for the Touristas chat engine.

import { SITE } from "./site";
import { whatsappUrl } from "./whatsapp";

export interface VehicleSuggestion {
  name: string;
  category: string;
  priceRange: string;
  features: string[];
  link: string;
}

export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  title: string;
  response: string;
  vehicles?: VehicleSuggestion[];
  quickReplies?: string[];
}

export const FLEET_SUGGESTIONS: VehicleSuggestion[] = [
  {
    name: "Hyundai i10 / Toyota Aygo",
    category: "Economy",
    priceRange: "€30–55/day",
    features: ["5 Seats", "Automatic", "A/C", "Chora parking champion"],
    link: "/fleet/cars",
  },
  {
    name: "Fiat Panda / Suzuki Celerio",
    category: "Compact",
    priceRange: "€32–55/day",
    features: ["5 Seats", "Manual/Auto", "A/C", "Great fuel economy"],
    link: "/fleet/cars",
  },
  {
    name: "Seat Arona / MG ZS",
    category: "SUV",
    priceRange: "€50–85/day",
    features: ["5 Seats", "Automatic", "A/C", "Family-friendly"],
    link: "/fleet/cars",
  },
  {
    name: "Suzuki Jimny / Jeep Renegade",
    category: "4×4",
    priceRange: "€55–95/day",
    features: ["4–5 Seats", "Manual/Auto", "A/C", "Off-road ready"],
    link: "/fleet/cars",
  },
  {
    name: "Piaggio Liberty / SYM Symphony",
    category: "Scooter",
    priceRange: "€18–38/day",
    features: ["Helmet included", "Easy parking", "Fuel-efficient"],
    link: "/fleet/scooters",
  },
  {
    name: "CF Moto ATV / Polaris Buggy",
    category: "ATV & Buggy",
    priceRange: "€35–150/day",
    features: ["2–4 Seats", "Automatic", "Open-air adventure"],
    link: "/fleet/atv-quad",
  },
];

const WA_URL = whatsappUrl("Hi! I'd like to get a rental quote for Naxos.");

export const WELCOME_MESSAGE = {
  response: `Hi! I'm Touristas AI, your Naxos travel companion from Fast Motor Rental Naxos 🏝️\n\nI can help you choose the right vehicle, plan beach routes, answer questions about licences, insurance, and more.\n\nWhat would you like to know?`,
  quickReplies: ["Which car for Filoti?", "Best vehicle for beaches?", "Do I need a 4×4?", "Prices"],
};

export const GREETING_RESPONSE = {
  response: `Hey there! 👋 Welcome to Fast Motor Rental Naxos.\n\nI'm Touristas AI — here to help you pick the perfect vehicle for your Naxos adventure. Whether you're heading to hidden beaches, mountain villages or just exploring Chora, I've got you covered!`,
  quickReplies: ["See all vehicles", "Prices", "Airport pickup", "Ask about Naxos"],
};

export const THANK_YOU_RESPONSE = {
  response: `You're very welcome! 😊 Enjoy every moment on Naxos — it's truly one of the most beautiful islands in Greece.\n\nIf you think of anything else, I'm here. Or you can always reach our team directly on WhatsApp!`,
  quickReplies: ["Book now", "See fleet", "WhatsApp us"],
};

export const FALLBACK_RESPONSE = {
  response: `I'm not sure I caught that — but I'm happy to help! 🤔\n\nYou can ask me about:\n• Vehicle types and prices\n• Naxos beaches and villages\n• Driving tips and licence requirements\n• Delivery to airport, port or hotel\n\nOr chat with our team directly on WhatsApp for instant answers!`,
  quickReplies: ["See all vehicles", "Prices", "WhatsApp us"],
};

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // ── Fleet overview ──
  {
    id: "fleet_overview",
    keywords: ["car", "cars", "vehicle", "vehicles", "fleet", "rent", "rental", "what do you have", "options", "available", "motorbike", "scooter"],
    title: "Our Fleet",
    response: "We have everything you need for Naxos! 🚗 From tiny Hyundai i10s perfect for Chora's alleyways to rugged Jimny 4×4s for mountain tracks and open-air buggies for the coastal dunes. Here's a quick overview:",
    vehicles: FLEET_SUGGESTIONS,
    quickReplies: ["Best for beaches?", "Best for villages?", "Prices", "Book now"],
  },
  // ── Economy / small cars ──
  {
    id: "fleet_economy",
    keywords: ["economy", "cheap car", "small car", "budget", "aygo", "panda", "i10", "affordable", "smallest", "cheapest"],
    title: "Economy Cars",
    response: "Our most popular choice on Naxos! 🚗 The Hyundai i10 and Toyota Aygo are perfectly sized for Chora's narrow lanes, easy to park anywhere, and ideal for couples at the beach. Starting from €30/day.",
    vehicles: [FLEET_SUGGESTIONS[0]],
    quickReplies: ["Book now", "Automatic cars", "Prices"],
  },
  // ── 4×4 / Jimny ──
  {
    id: "fleet_4x4",
    keywords: ["4x4", "4×4", "jimny", "jeep", "renegade", "off-road", "offroad", "adventure", "dirt road", "mountain road", "filoti", "apeiranthos", "apollonas"],
    title: "4×4 & Jeeps",
    response: "For the mountain villages and off-road tracks! 🏔️ The Suzuki Jimny is the legendary choice for the Filoti–Apeiranthos road and Naxos's inland tracks. The Jeep Renegade gives you more comfort for longer family trips. From €55/day.",
    vehicles: [FLEET_SUGGESTIONS[3]],
    quickReplies: ["Book now", "Do I need a 4×4?", "Prices"],
  },
  // ── Scooters ──
  {
    id: "fleet_scooter",
    keywords: ["scooter", "moped", "piaggio", "motorbike", "bike", "two-wheel", "sym", "125cc", "50cc"],
    title: "Scooters",
    response: "The classic Cycladic experience! 🛵 Our Piaggio and SYM scooters are nimble, easy to park, and perfect for beach-hopping between Agios Prokopios, Agia Anna and Plaka. Helmets always included. From €18/day!",
    vehicles: [FLEET_SUGGESTIONS[4]],
    quickReplies: ["Book now", "ATVs & Buggies", "Licence info"],
  },
  // ── ATV / Buggy ──
  {
    id: "fleet_atv",
    keywords: ["atv", "quad", "buggy", "buggies", "four-wheeler", "open-air", "alyko", "mikri vigla", "dunes", "cf moto"],
    title: "ATVs & Buggies",
    response: "The most memorable Naxos experience! 🏎️ Our CF Moto quads and Polaris-style buggies are perfect for Alyko beach, Kastraki and the coastal dunes. Book early for July & August — they sell out fast! From €35/day.",
    vehicles: [FLEET_SUGGESTIONS[5]],
    quickReplies: ["Book now", "Scooters", "Licence info"],
  },
  // ── Prices ──
  {
    id: "pricing",
    keywords: ["price", "prices", "cost", "how much", "rate", "rates", "expensive", "cheap", "per day", "daily", "€", "euro", "shoulder", "high season"],
    title: "Our Prices",
    response: "Here are our starting rates (shoulder / high season):\n\n🚗 Economy cars: from €30/€55 per day\n🚙 Compact cars: from €32/€55 per day\n🚐 Family/SUV: from €50/€85 per day\n🏔️ 4×4/Jeep: from €55/€95 per day\n🛵 Scooters: from €18/€38 per day\n🏎️ ATVs/Buggies: from €35/€150 per day\n\nAll prices include unlimited km, basic CDW & free delivery. For an exact quote, WhatsApp us — fastest reply!",
    quickReplies: ["WhatsApp us", "Book now", "See fleet"],
  },
  // ── Airport pickup ──
  {
    id: "location_airport",
    keywords: ["airport", "fly", "flight", "arrival", "JNX", "land", "landing", "pick up airport", "jnx"],
    title: "Airport Delivery",
    response: "Free meet-and-greet at Naxos Airport (JNX)! ✈️ We track your flight, wait at arrivals with a sign, and hand you the keys in under 5 minutes — no desk, no queue. The airport is just 4 km from Chora.",
    quickReplies: ["Port pickup", "Book airport pickup", "Prices"],
  },
  // ── Port pickup ──
  {
    id: "location_port",
    keywords: ["port", "ferry", "boat", "ship", "dock", "arrive by sea", "paros ferry", "piraeus"],
    title: "Port Delivery",
    response: "Arriving by ferry? 🚢 We deliver right to Naxos Port — 2-minute walk from the ferry gate. Share your arrival time and we'll be there with your vehicle. Always free!",
    quickReplies: ["Airport pickup", "Book port pickup", "Prices"],
  },
  // ── General delivery ──
  {
    id: "location_delivery",
    keywords: ["delivery", "deliver", "pick up", "pickup", "drop off", "hotel", "villa", "where", "free delivery"],
    title: "Free Delivery",
    response: "Delivery is always FREE anywhere on Naxos! 🎉 We deliver to:\n\n📍 Naxos Airport (JNX)\n📍 Naxos Port\n📍 Naxos Town (Chora)\n📍 Agios Prokopios, Agia Anna, Plaka\n📍 Filoti, Apeiranthos, Apollonas\n📍 Your hotel or villa — anywhere on the island!\n\nJust tell us your address.",
    quickReplies: ["Book now", "WhatsApp us", "Prices"],
  },
  // ── Do I need a 4×4? ──
  {
    id: "4x4_needed",
    keywords: ["do i need", "4x4 needed", "need jeep", "need 4x4", "need jimny", "paved", "dirt track"],
    title: "Do I need a 4×4?",
    response: "Honestly? Most visitors don't! 🤔 All major beaches (Agios Prokopios, Agia Anna, Plaka) and villages (Filoti, Apeiranthos, Apollonas) are reachable on tarmac roads with a regular car.\n\nYou DO want a Jimny or quad if you're heading to:\n• Alyko beach dunes\n• The unmaintained track to Kastraki\n• Mikri Vigla windsurf area via the sandy access road\n\nIn doubt? Ask us — we'll tell you honestly.",
    quickReplies: ["Jeeps & 4×4s", "Best for beaches?", "WhatsApp us"],
  },
  // ── Best for beaches ──
  {
    id: "beach_vehicles",
    keywords: ["beach", "beaches", "swim", "sea", "agios prokopios", "agia anna", "plaka", "stelida", "mikri vigla", "kolymbithres"],
    title: "Best Vehicles for Beaches",
    response: "For beach-hopping, any of our compact cars work perfectly! 🏖️ The most popular combo:\n\n🚗 **Hyundai i10 / Toyota Aygo** — fits any parking spot near Agios Prokopios or Agia Anna\n🛵 **Scooter 125cc** — fastest way to hop between beaches\n🏎️ **ATV 300** — if you want open-air and a bit of adventure\n\nAll our beach-area car parks have free access.",
    vehicles: [FLEET_SUGGESTIONS[0], FLEET_SUGGESTIONS[4], FLEET_SUGGESTIONS[5]],
    quickReplies: ["Book now", "Prices", "ATV & Buggy"],
  },
  // ── Best for mountain villages ──
  {
    id: "village_vehicles",
    keywords: ["filoti", "apeiranthos", "apollonas", "chalki", "mountain village", "village", "inland", "mountain", "zas"],
    title: "Best for Mountain Villages",
    response: "The mountain villages are Naxos's best-kept secret! 🏔️ Our recommendations:\n\n🏔️ **Suzuki Jimny** — king of the Filoti–Apeiranthos road (some stretches are steep and narrow)\n🚗 **Hyundai i10 automatic** — surprisingly agile and easy to maneuver in tight village streets\n🛵 **Scooter 125cc** — great for solo exploration, lighter through the switchbacks\n\nAll roads are paved — a regular car is perfectly fine!",
    vehicles: [FLEET_SUGGESTIONS[3], FLEET_SUGGESTIONS[0], FLEET_SUGGESTIONS[4]],
    quickReplies: ["Book now", "Do I need a 4×4?", "Prices"],
  },
  // ── Minimum age ──
  {
    id: "faq_age",
    keywords: ["age", "how old", "minimum age", "young", "21", "25", "years old"],
    title: "Minimum Age",
    response: "Minimum age to rent is **21 years** (1+ year driving experience). Some premium vehicles and buggies require 25+. No maximum age! 😊\n\nScooters and ATVs have additional licence requirements — ask us if unsure.",
    quickReplies: ["Licence info", "Book now", "Prices"],
  },
  // ── Licence ──
  {
    id: "faq_license",
    keywords: ["license", "licence", "driving permit", "IDP", "international", "permit", "document", "documents", "category", "cat b", "cat a", "motorbike licence"],
    title: "Licence Requirements",
    response: "📋 **Cars (Cat. B)**: EU, UK, US, CA, AU, NZ licence is accepted as-is. Other nationalities need an IDP alongside your national licence.\n\n🛵 **Scooters 50cc**: any valid car licence (Cat. B) is fine.\n🛵 **Scooters 125cc+**: motorbike licence (Cat. A or A2) required.\n🏎️ **ATVs & Buggies**: car licence (Cat. B) is sufficient.\n\nWe'll guide you before arrival — no surprises!",
    quickReplies: ["Minimum age", "Book now", "See fleet"],
  },
  // ── Insurance ──
  {
    id: "faq_insurance",
    keywords: ["insurance", "insured", "cover", "coverage", "damage", "accident", "protection", "CDW", "cdw"],
    title: "Insurance",
    response: "All vehicles include **basic CDW insurance** — third-party liability + collision damage waiver. No extra cost! 🛡️\n\nYou can upgrade to zero-excess full coverage for extra peace of mind. A credit/debit card deposit is held (not charged) during the rental and fully released on return.",
    quickReplies: ["Deposit info", "Book now", "Prices"],
  },
  // ── Cancellation ──
  {
    id: "faq_cancel",
    keywords: ["cancel", "cancellation", "refund", "change", "modify", "reschedule", "policy"],
    title: "Cancellation Policy",
    response: "Flexible policy:\n\n✅ **21+ days before arrival** — full refund\n⚠️ **7–20 days** — partial refund (see full terms)\n❌ **Under 7 days / no-show** — 30% deposit retained\n\n30% deposit is collected at booking and deducted from the final amount. No surprises!\n\nCheck full terms at [rental terms](/en/terms) or ask us on WhatsApp.",
    quickReplies: ["Book now", "WhatsApp us", "Rental terms"],
  },
  // ── Fuel ──
  {
    id: "faq_fuel",
    keywords: ["fuel", "gas", "petrol", "diesel", "fill up", "refuel", "tank"],
    title: "Fuel Policy",
    response: "We use a fair **Same-to-Same** fuel policy ⛽ — you receive the car at a set level and return it the same way. No forced full-tank purchase. Nearest petrol station to the port: 500 m. Nearest to Agios Prokopios: 2 km.",
    quickReplies: ["Prices", "Book now", "Insurance info"],
  },
  // ── Naxos travel tips ──
  {
    id: "naxos_tips",
    keywords: ["tip", "tips", "driving", "roads", "parking", "speed", "traffic", "safe", "naxos roads"],
    title: "Driving Tips for Naxos",
    response: "Naxos driving tips from us! 🚗\n\n🐐 **Watch for goats** on mountain roads — especially at dusk on the Filoti road\n🅿️ **Chora parking**: use the free car park at the seafront (5 min walk to old town)\n⚡ **Speed limits**: 50 km/h in villages, 90 km/h on open roads\n🌬️ **Meltemi wind**: strong from July–August — watch out on exposed coastal roads\n⛽ **Fuel up**: few stations inland — fill up in Chora or Agios Prokopios",
    quickReplies: ["See fleet", "Book now", "WhatsApp us"],
  },
  // ── Book / booking ──
  {
    id: "book",
    keywords: ["book", "booking", "reserve", "reservation", "how to book", "want to rent"],
    title: "How to Book",
    response: `The fastest way to book is via our online booking system or WhatsApp:\n\n📲 **WhatsApp** — [message us](${WA_URL}) for an instant reply\n🌐 **Online** — [Book at cosmicbooker](${SITE.bookingUrl})\n📞 **Phone** — ${SITE.phones[0]}\n\nTell us: dates, number of people, and where we're delivering. We'll confirm within minutes!`,
    quickReplies: ["WhatsApp us", "Airport pickup", "Prices"],
  },
  // ── Contact / WhatsApp ──
  {
    id: "contact",
    keywords: ["contact", "call", "phone", "email", "reach", "talk", "speak", "human"],
    title: "Contact Us",
    response: `Reach us anytime! 📱\n\n💬 **WhatsApp** (fastest): [${SITE.phones[0]}](${WA_URL})\n📞 **Phone**: ${SITE.phones[0]}\n📧 **Email**: ${SITE.email}\n⏰ **Hours**: ${SITE.hours.open}–${SITE.hours.close}, every day`,
    quickReplies: ["Book now", "Prices", "See fleet"],
  },
];
