import type { NaxosGuideArticle } from "@/types/content";
import { ls } from "./_shared";

/**
 * "Eat & stay" cluster. English-only pending the translation pass; `ls()` falls
 * el/it/fr/de back to English rather than shipping machine translation.
 */
export const EAT_STAY_ARTICLES: NaxosGuideArticle[] = [
  {
    slug: "where-to-stay-in-naxos",
    cluster: "eat-stay",
    title: ls("Where to stay in Naxos: every area compared, and who each one suits"),
    excerpt: ls(
      "Chora, Agios Prokopios, Agia Anna, Plaka, Stelida, Mikri Vigla and the mountain villages  -  honest pros and cons, and which need a car.",
    ),
    answer: ls(
      "Stay in Chora for your first visit: the port, the old town, restaurants and a beach are all walkable and every road on the island starts there. Choose Agios Prokopios or Agia Anna if you want the beach at your door, Plaka for quiet and space, Stelida for sunsets and newer hotels, and the mountain villages only if you genuinely want to be away from the sea.",
    ),
    hero: "/images/naxos/gallery/naxos-chora.jpg",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    readingTime: 9,
    keywords: [
      "where to stay in naxos",
      "naxos accommodation",
      "best area to stay naxos",
      "naxos hotels",
      "chora naxos",
    ],
    related: ["naxos-travel-guide", "best-beaches-in-naxos", "naxos-itinerary", "naxos-with-kids"],
    vehiclePicks: ["hyundai-i10", "peugeot-208", "citroen-berlingo-7"],
    locationPicks: ["naxos-town", "agios-prokopios", "agia-anna", "stelida"],
    table: {
      caption: ls("Naxos areas compared"),
      columns: [ls("Area"), ls("From Chora"), ls("Beach"), ls("Car needed?"), ls("Best for")],
      rows: [
        [ls("Chora (Naxos Town)"), ls("—"), ls("Agios Georgios, walkable"), ls("Useful, not essential"), ls("First visits, no-car trips, nightlife")],
        [ls("Agios Prokopios"), ls("6 km"), ls("Excellent, on the doorstep"), ls("Useful"), ls("Beach-first trips, all-rounders")],
        [ls("Agia Anna"), ls("7 km"), ls("Excellent, tavernas on sand"), ls("Useful"), ls("Families with young children")],
        [ls("Plaka"), ls("8 km"), ls("Long and quiet"), ls("Yes"), ls("Space, seclusion, longer stays")],
        [ls("Stelida"), ls("5 km"), ls("10 min drive"), ls("Yes"), ls("Sunset views, newer hotels")],
        [ls("Mikri Vigla"), ls("17 km"), ls("Kitesurf beach"), ls("Yes"), ls("Watersports only")],
        [ls("Mountain villages"), ls("20–30 km"), ls("30–45 min away"), ls("Yes"), ls("Hiking, authenticity, repeat visitors")],
      ],
    },
    sections: [
      {
        heading: ls("Chora (Naxos Town) — the default, and usually right"),
        body: ls(
          "Chora is where the ferry docks, where the restaurants are, where the old town is, and where every road on the island begins. Agios Georgios beach is a ten-minute walk from most of it. For a first visit, or for anyone who does not want to drive every evening to find dinner, this is the correct choice and the question does not need more thought than that. The trade-offs are real but small: the waterfront is busy in August, some rooms in the old town are up stepped lanes with no vehicle access, and Agios Georgios, while perfectly good, is not the best beach on the island. Stay in the upper town or towards Grotta for quiet, and on the waterfront if you want to be in the middle of it.",
        ),
      },
      {
        heading: ls("Agios Prokopios and Agia Anna — beach first"),
        body: ls(
          "These two run into each other along one road six to seven kilometres south of Chora, and between them they hold most of the island's beach accommodation. Agios Prokopios is the larger and better equipped, with a proper little village behind the sand. Agia Anna is smaller, quieter, and has tavernas directly on the beach, which is the single best argument for it if you are travelling with small children  -  lunch, shade and a toilet are twenty steps from your towel. Both have hourly buses into Chora in summer, so you can stay here without a car and still get into town for dinner. Both are far enough from the nightlife to sleep well.",
        ),
      },
      {
        heading: ls("Plaka, Stelida and the alternatives"),
        body: ls(
          "Plaka is four kilometres of beach with low-rise studios and a campsite scattered behind it, and staying here means space, dark skies and very little else within walking distance  -  excellent for a week with a car, frustrating for three nights without one. Stelida is the hill between Chora and the beaches, where most of the newer design hotels have been built; the views west over the sea are the best on the island and you will drive everywhere. Mikri Vigla is for people who came to kitesurf and should not be chosen for any other reason. And the mountain villages  -  Chalki, Filoti, Apeiranthos  -  are wonderful places to stay on a second or third visit, when you have already done the beaches and want to be somewhere that is simply a Greek village at night.",
        ),
      },
      {
        heading: ls("Booking timing and what it costs"),
        body: ls(
          "Naxos accommodation in the last three weeks of July and the first three of August sells out, and the good value goes months before the availability does. Book by February or March for those dates. Shoulder season  -  late May, June, September  -  you can book six to eight weeks out and still choose well. Expect €60–110 a night for a good double in shoulder season and roughly double that in peak August, with Chora and Stelida at the upper end and Plaka and the villages at the lower. If your dates are fixed and your budget is not, September is where the same room costs 40% less than August and the sea is warmer.",
        ),
      },
    ],
    faq: [
      {
        q: ls("What is the best area to stay in Naxos?"),
        a: ls(
          "Chora for a first visit, because everything is walkable and every road starts there. Agios Prokopios or Agia Anna if the beach matters more than the town. Both have hourly buses to Chora in summer, so neither strictly requires a car.",
        ),
      },
      {
        q: ls("Is it better to stay in Naxos Town or on the beach?"),
        a: ls(
          "Naxos Town if you want restaurants, atmosphere and the option of not driving. The beach villages if you want to swim before breakfast and eat at the same three tavernas all week. Town suits shorter stays; the beach suits longer ones.",
        ),
      },
      {
        q: ls("Do you need a car if you stay in Naxos Town?"),
        a: ls(
          "Not to survive, but yes to see the island. Chora, Agios Georgios and the bus network cover perhaps a fifth of Naxos. The mountain villages, the Kouroi, the Temple of Demeter and the southern beaches need a car.",
        ),
      },
      {
        q: ls("When should I book accommodation in Naxos?"),
        a: ls(
          "By February or March for late July and August  -  those dates genuinely sell out. Six to eight weeks ahead is enough for June, September and October.",
        ),
      },
    ],
  },
  {
    slug: "naxos-food-and-tavernas",
    cluster: "eat-stay",
    title: ls("Naxos food guide: graviera, kitron, potatoes and where to actually eat"),
    excerpt: ls(
      "The island grows and raises most of what it serves, which makes it the best place to eat in the Cyclades. What to order, what is genuinely local, and how to spot a real taverna.",
    ),
    answer: ls(
      "Naxos has real agriculture, so its food is the best in the Cyclades. Order graviera Naxou (a PDO hard cheese), the island's protected potatoes, arseniko cheese, local beef or goat, and finish with kitron, a citron-leaf liqueur made only here. Eat inland where possible  -  Chalki, Filoti, Apeiranthos and Moutsouna are all better value than the Chora waterfront.",
    ),
    hero: "/images/naxos/taverna.jpg",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    readingTime: 8,
    keywords: [
      "naxos food",
      "naxos restaurants",
      "graviera naxos",
      "kitron naxos",
      "naxos tavernas",
      "what to eat in naxos",
    ],
    related: ["naxos-villages", "naxos-travel-guide", "things-to-do-in-naxos", "where-to-stay-in-naxos"],
    vehiclePicks: ["hyundai-i10", "peugeot-208", "dacia-duster"],
    locationPicks: ["chalki", "filoti", "apeiranthos", "naxos-town"],
    sections: [
      {
        heading: ls("Why the food here is different"),
        body: ls(
          "Most Cycladic islands import nearly everything. Naxos does not: it has the largest area of arable land in the archipelago, green hillsides that support actual cattle, a working dairy cooperative, potato fields, olive groves and citrus. The result is that a taverna in Filoti is cooking with ingredients from within a few kilometres, at prices set for a local clientele who eat there year-round. This is the single biggest and least-advertised reason to choose Naxos over its neighbours, and it is why the food is noticeably better and cheaper than on Mykonos or Santorini.",
        ),
      },
      {
        heading: ls("What to order"),
        body: ls(
          "Graviera Naxou is the island's PDO hard cheese, made from cow's milk with some sheep and goat, nutty and slightly sweet  -  ask for it saganaki-fried or just with bread. Arseniko is the harder, sharper aged cheese; xinotyro the sour one. Naxos potatoes have protected status and taste it, so anything described as patates from the island is worth having. Naxian beef appears on menus as a rarity in Greece, and the goat  -  slow-cooked, usually with tomato  -  is what to order in the mountain villages. For dessert, look for kaltsounia (sweet cheese pastries) or the local thyme honey. And finish with kitron, distilled from citron leaves, which comes in green, yellow and clear at ascending strengths.",
        ),
      },
      {
        heading: ls("Where to eat, by area"),
        body: ls(
          "The Chora waterfront is convenient and perfectly decent, but it is the most expensive food on the island and the least local  -  walk two streets up into the old town and quality rises as prices fall. In the villages, Chalki's square has two excellent cafés and Filoti has several tavernas that cook for residents rather than visitors, which is exactly what you want. Apeiranthos is where to have lunch on a mountain-drive day. On the east coast, Moutsouna's harbour tavernas do fish straight off the boats and are worth the fifty-five-minute drive on a windy day when the west coast is unpleasant. On the beaches, Agia Anna has the best cluster of places actually on the sand.",
        ),
      },
      {
        heading: ls("How to spot the right taverna"),
        body: ls(
          "Three signals, all reliable. First, look at who is eating there at 21:00  -  if the tables are mostly Greek, and mostly not on holiday, you have found it. Second, a short handwritten or seasonal menu beats a long laminated one with photographs; a kitchen doing eight things well is a better bet than one doing sixty. Third, if someone stands outside actively soliciting passers-by, walk on. The tavernas worth eating at on Naxos do not need to. One more piece of local practice: ordering several small plates for the table rather than a main each is both cheaper and how the food is meant to be eaten.",
        ),
      },
    ],
    faq: [
      {
        q: ls("What food is Naxos famous for?"),
        a: ls(
          "Graviera Naxou, a PDO hard cheese; the island's protected-status potatoes; arseniko and xinotyro cheeses; locally raised beef and goat; thyme honey; and kitron, a liqueur distilled from citron leaves that is made nowhere else.",
        ),
      },
      {
        q: ls("What is kitron and where can you try it?"),
        a: ls(
          "Kitron is a liqueur distilled from the leaves of the citron tree, unique to Naxos and holding a protected designation. The Vallindras distillery in Chalki has been making it in the same copper stills since 1896 and offers free tastings. It comes in green, yellow and clear at increasing strengths.",
        ),
      },
      {
        q: ls("Is food expensive in Naxos?"),
        a: ls(
          "No  -  it is among the better value in the Cyclades. Expect €12–20 per person for a taverna dinner with wine, considerably less than Mykonos or Santorini. The Chora waterfront is the priciest spot on the island; the villages are the cheapest.",
        ),
      },
      {
        q: ls("Where is the best place to eat in Naxos?"),
        a: ls(
          "For value and authenticity, the mountain villages  -  Filoti and Apeiranthos in particular. For fish, Moutsouna on the east coast. For a beach lunch, Agia Anna. For variety, the upper streets of Chora's old town rather than the waterfront.",
        ),
      },
    ],
  },
];
