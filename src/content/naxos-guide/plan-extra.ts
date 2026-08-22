import type { NaxosGuideArticle } from "@/types/content";
import { ls } from "./_shared";

/**
 * Remaining "plan" cluster articles. English-only pending the translation pass.
 */
export const PLAN_EXTRA_ARTICLES: NaxosGuideArticle[] = [
  {
    slug: "best-time-to-visit-naxos",
    cluster: "plan",
    title: ls("Best time to visit Naxos: month by month, with wind and sea temperatures"),
    excerpt: ls(
      "September wins and it is not close. Here is what every month actually feels like  -  heat, meltemi, sea temperature, crowds and what is open.",
    ),
    answer: ls(
      "September is the best month to visit Naxos: the sea is at its warmest after a summer of heating, the meltemi wind has eased, the crowds have gone and prices drop back to shoulder rates. June is the strong second choice. Avoid the last week of July and the first two of August unless the crowds and the wind are acceptable to you.",
    ),
    hero: "/images/naxos/gallery/naxos-beach.jpg",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    readingTime: 8,
    keywords: [
      "best time to visit naxos",
      "naxos weather",
      "naxos in september",
      "naxos in may",
      "meltemi naxos",
    ],
    related: ["naxos-travel-guide", "best-beaches-in-naxos", "naxos-itinerary", "naxos-with-kids"],
    vehiclePicks: ["hyundai-i10", "fiat-500-cabrio", "dacia-duster"],
    locationPicks: ["agios-prokopios", "plaka", "naxos-town"],
    table: {
      caption: ls("Naxos month by month"),
      columns: [ls("Month"), ls("Air (avg high)"), ls("Sea"), ls("Meltemi"), ls("Crowds"), ls("Verdict")],
      rows: [
        [ls("April"), ls("19 °C"), ls("17 °C"), ls("Low"), ls("Very low"), ls("Green and empty; too cold to swim")],
        [ls("May"), ls("23 °C"), ls("19 °C"), ls("Low"), ls("Low"), ls("Excellent for hiking and villages")],
        [ls("June"), ls("27 °C"), ls("22 °C"), ls("Building"), ls("Moderate"), ls("Superb  -  everything open, heat manageable")],
        [ls("July"), ls("30 °C"), ls("24 °C"), ls("Strong"), ls("High"), ls("Hot and windy; book far ahead")],
        [ls("August"), ls("30 °C"), ls("25 °C"), ls("Strongest"), ls("Peak"), ls("Busiest and priciest; still fine if planned")],
        [ls("September"), ls("27 °C"), ls("25 °C"), ls("Easing"), ls("Falling"), ls("The best month, by a clear margin")],
        [ls("October"), ls("23 °C"), ls("23 °C"), ls("Low"), ls("Low"), ls("Warm sea, quiet; some closures late")],
        [ls("Nov–Mar"), ls("15–18 °C"), ls("16–18 °C"), ls("Variable"), ls("None"), ls("Local life only; most tourism closed")],
      ],
    },
    sections: [
      {
        heading: ls("Why September is the answer"),
        body: ls(
          "The Aegean takes all summer to warm up and holds that heat into autumn, so the sea in September is at 25°C  -  warmer than it is in July. At the same time the meltemi, which peaks in late July and August, drops away; European school holidays end and the crowds leave with them; and accommodation falls back to shoulder pricing, often 40% below August for the same room. Everything is still open through at least the third week. The combination of warm water, manageable heat, low wind, space and price is not matched by any other month, and if your dates are flexible this is the single most valuable piece of planning advice on this page.",
        ),
      },
      {
        heading: ls("The meltemi, and why it matters more than temperature"),
        body: ls(
          "The meltemi is a dry north-northeasterly that blows across the Aegean through summer, and Naxos sits in the windiest corridor of the Cyclades. At 4–5 Beaufort it is pleasant  -  it is the reason a 30°C island feels bearable. At 6–7, which happens routinely in late July and August, sand blows along the west-coast beaches, umbrellas become unusable and the fast ferries start cancelling. It does not make a trip bad; it makes a plan necessary. The whole east coast sits in the lee of the mountains, so on a strong day you drive to Moutsouna or Panormos and find flat water and nobody. Check a wind forecast each morning and let it choose your beach.",
        ),
      },
      {
        heading: ls("Shoulder season: what is actually open"),
        body: ls(
          "May and October are genuinely viable, with caveats. In May the island is at its greenest, wildflowers are out, hiking is at its best and prices are low  -  but the sea is around 19°C, which is bracing, and a few beach bars have not opened. In October the sea is still 23°C into mid-month and the light is beautiful, but from around the third week places begin closing for winter and ferry frequency thins. Both months are excellent for the mountain villages, the churches and Mount Zas, and poor choices if the trip is fundamentally a beach holiday. April and November are for people who want an island to themselves and do not intend to swim.",
        ),
      },
      {
        heading: ls("Travelling in peak August"),
        body: ls(
          "It is entirely doable, and most visitors have a great time; it simply requires decisions made earlier. Book accommodation by February or March, ferries by May and the car six to eight weeks out. Start beach days before 10:00 and mountain drives before 09:30, because both fill and heat up quickly. Use the east coast on windy days. Eat inland. And do not schedule anything tight around ferry departures  -  the port is congested and the roads into Chora slow to a crawl in the hour before a big sailing. The 15 August festivals, particularly at Filoti, are one genuine reason to choose these dates deliberately.",
        ),
      },
    ],
    faq: [
      {
        q: ls("What is the best month to visit Naxos?"),
        a: ls(
          "September. The sea is at its warmest, the meltemi has eased, the crowds have gone and prices drop to shoulder rates while everything is still open. June is the next best.",
        ),
      },
      {
        q: ls("Is Naxos windy?"),
        a: ls(
          "Yes  -  it sits in the windiest part of the Cyclades. The meltemi blows from the north-northeast through summer and peaks in late July and August, sometimes at 6–7 Beaufort for days. The east coast is sheltered, so a windy day means driving to Moutsouna rather than cancelling the beach.",
        ),
      },
      {
        q: ls("Is Naxos worth visiting in May?"),
        a: ls(
          "For hiking, villages and photography, very much so  -  the island is green, empty and cheap. For swimming, less so: the sea is around 19°C in early May and only becomes comfortable towards the end of the month.",
        ),
      },
      {
        q: ls("How warm is the sea in Naxos in October?"),
        a: ls(
          "Around 23°C into mid-October, which is warmer than most of the Mediterranean in June. Swimming remains comfortable well into the month, though some beach facilities begin closing from around the third week.",
        ),
      },
      {
        q: ls("Is Naxos crowded in August?"),
        a: ls(
          "The Chora waterfront and the three main west-coast beaches are busy; the island as a whole is not, because it is large enough to absorb the numbers. Drive twenty minutes in any direction and August feels like a normal day.",
        ),
      },
    ],
  },
  {
    slug: "naxos-with-kids",
    cluster: "plan",
    title: ls("Naxos with kids: the Cyclades island that actually works with children"),
    excerpt: ls(
      "Shallow beaches, a car-free old town, short drives and cheap simple food. What to plan, what to skip and which car you actually need.",
    ),
    answer: ls(
      "Naxos is the best Cyclades island for young children. Agios Prokopios and Agia Anna have shallow, gently shelving sand with tavernas at the water's edge, Chora's old town is car-free, drives are short, and food is simple and inexpensive. Bring or request a child seat  -  they are legally required for under-12s and we provide them free.",
    ),
    hero: "/images/naxos/agia-anna.jpg",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    readingTime: 8,
    keywords: [
      "naxos with kids",
      "naxos family holiday",
      "naxos with toddlers",
      "family beaches naxos",
      "naxos for families",
    ],
    related: ["best-beaches-in-naxos", "where-to-stay-in-naxos", "naxos-itinerary", "best-time-to-visit-naxos"],
    vehiclePicks: ["citroen-berlingo-7", "peugeot-208", "dacia-duster"],
    locationPicks: ["agia-anna", "agios-prokopios", "naxos-town"],
    sections: [
      {
        heading: ls("Why this island and not another"),
        body: ls(
          "Three structural reasons. The west-coast beaches shelve so gently that a four-year-old can walk fifty metres out and still be waist-deep, which is rare in the Cyclades and the single biggest factor for anyone with small children. Chora's old town is entirely car-free, so a toddler can be put down without a second thought. And Naxos is agricultural, so food is unfussy, fast and cheap  -  a plate of chips, grilled cheese and tomatoes appears in five minutes and costs almost nothing, which matters more at 19:30 with a tired child than any restaurant guide.",
        ),
      },
      {
        heading: ls("The best beaches for children"),
        body: ls(
          "Agia Anna first: shallow, sheltered by its small harbour, and with tavernas literally on the sand so lunch, shade and a toilet are twenty steps from your towel. Agios Prokopios second: bigger, better organised, with sunbeds and beach bars, and still very shallow. Agios Georgios in Chora is the practical choice if you are staying in town  -  walkable, calm and ideal for a late-afternoon swim without a drive. Avoid the south side of Mikri Vigla entirely: it is a kitesurf beach with strong wind and boards moving fast. On strong meltemi days, drive to Moutsouna on the east coast where the water is flat.",
        ),
      },
      {
        heading: ls("Planning days that work"),
        body: ls(
          "Keep drives under 30 minutes on any day that also includes a beach, which in practice means the west coast and Chora. Save the mountain loop for one dedicated day and break it at Chalki, where there is a flat square with shade, cafés and space to run around. Apeiranthos is beautiful but is stepped marble lanes  -  fine for walking children, hard with a pushchair. The Flerio kouroi walk near Melanes is fifteen easy minutes through olive groves to two giant fallen statues, has a stream and a tiny taverna, and is the single best family outing on the island. Mount Zas is not a children's hike; the Zeus cave from the Aria spring is.",
        ),
      },
      {
        heading: ls("Practicalities: seats, pushchairs, supplies"),
        body: ls(
          "Greek law requires an appropriate child restraint for under-12s or anyone under 1.35 m, and children under 12 may not travel in the front seat. We provide baby seats and boosters free with any rental  -  tell us ages and heights when you book so the right one is fitted before we hand the car over. Chora's old town is stepped in places, so a compact folding buggy beats a large pushchair, and a carrier is better again for the Kastro. Pharmacies and supermarkets in Chora stock formula, nappies and everything else, so there is no need to fly with a month's supply. For families of five or more, the Citroën Berlingo seven-seater is the only vehicle in our fleet that takes the whole group plus luggage.",
        ),
      },
    ],
    faq: [
      {
        q: ls("Is Naxos good for families with young children?"),
        a: ls(
          "It is the best Cyclades island for them. The west-coast beaches are shallow and sandy, the old town is car-free, drives are short and food is simple and cheap. Agia Anna in particular is close to ideal for toddlers.",
        ),
      },
      {
        q: ls("Which Naxos beach is best for toddlers?"),
        a: ls(
          "Agia Anna. It is shallow a long way out, sheltered by the small harbour, and the tavernas are on the sand so shade and food are a few steps away. Agios Georgios in Chora is the best walkable option if you are staying in town.",
        ),
      },
      {
        q: ls("Do you need child seats in a rental car in Greece?"),
        a: ls(
          "Yes. Greek law requires an appropriate restraint for children under 12 or under 1.35 m, and they may not sit in the front seat. We supply baby seats and boosters free of charge  -  send ages and heights when booking so the correct seat is fitted in advance.",
        ),
      },
      {
        q: ls("Is Naxos suitable for a pushchair?"),
        a: ls(
          "In Chora's flat waterfront and new town, yes. In the Kastro and the mountain villages, no  -  those are stepped marble lanes where a carrier works far better. A compact folding buggy is the right compromise.",
        ),
      },
      {
        q: ls("What is the best time to visit Naxos with kids?"),
        a: ls(
          "June or September. Both have warm sea and manageable heat without August's peak crowds, prices or wind. September has the warmest water of the year, which matters when children want to be in it all day.",
        ),
      },
    ],
  },
];
