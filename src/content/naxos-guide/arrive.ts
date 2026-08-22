import type { NaxosGuideArticle } from "@/types/content";
import { ls } from "./_shared";

/**
 * "Arrive" cluster — port, airport and ferry intent. Lower volume than the plan
 * cluster but far higher commercial value: these readers are days from needing a
 * car, so every article routes into the pickup location pages.
 *
 * English-only for now; `ls()` falls the other four locales back to English until
 * the translation pass lands. Do not machine-translate these in place.
 */
export const ARRIVE_ARTICLES: NaxosGuideArticle[] = [
  {
    slug: "how-to-get-to-naxos",
    cluster: "arrive",
    title: ls("How to get to Naxos in 2026: ferries, flights and what to book first"),
    excerpt: ls(
      "Every route to the island with real journey times and fares  -  Piraeus, Rafina, Athens by air, and the inter-island hops from Paros, Mykonos, Santorini and Ios.",
    ),
    answer: ls(
      "Most visitors reach Naxos by ferry from Piraeus: 3h15 on a high-speed vessel or about 5 hours on a conventional ferry, with fares roughly €40–75 and €30–40 respectively. Naxos Island National Airport (JNX) takes 45-minute domestic flights from Athens, but the runway only handles small turboprops so seats are limited and sell out early.",
    ),
    hero: "/images/naxos/gallery/naxos-aerial.jpg",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    readingTime: 9,
    keywords: [
      "how to get to naxos",
      "athens to naxos",
      "piraeus to naxos ferry",
      "naxos ferry",
      "flights to naxos",
    ],
    related: ["naxos-port-guide", "naxos-airport-jnx", "naxos-travel-guide", "naxos-vs-paros"],
    vehiclePicks: ["hyundai-i10", "peugeot-208", "citroen-berlingo-7"],
    locationPicks: ["port-pickup", "airport-pickup-jnx", "naxos-town"],
    table: {
      caption: ls("Routes to Naxos compared"),
      columns: [ls("From"), ls("Mode"), ls("Time"), ls("Typical fare"), ls("Frequency")],
      rows: [
        [ls("Piraeus (Athens)"), ls("High-speed ferry"), ls("3 h 15"), ls("€45–75"), ls("2–4 daily in season")],
        [ls("Piraeus (Athens)"), ls("Conventional ferry"), ls("4 h 45 – 5 h 30"), ls("€30–40"), ls("1–2 daily")],
        [ls("Rafina"), ls("High-speed ferry"), ls("3 h 30 – 4 h"), ls("€50–75"), ls("1–2 daily in season")],
        [ls("Athens (ATH)"), ls("Flight to JNX"), ls("45 min"), ls("€60–150"), ls("1–3 daily")],
        [ls("Paros"), ls("Ferry"), ls("30–45 min"), ls("€10–20"), ls("Several daily")],
        [ls("Mykonos"), ls("Ferry"), ls("45 min – 1 h 15"), ls("€25–45"), ls("Several daily")],
        [ls("Santorini"), ls("Ferry"), ls("1 h 45 – 3 h"), ls("€35–70"), ls("2–3 daily in season")],
        [ls("Ios"), ls("Ferry"), ls("1 h – 1 h 30"), ls("€20–40"), ls("Daily in season")],
      ],
    },
    sections: [
      {
        heading: ls("Ferry from Piraeus: the default route"),
        body: ls(
          "Piraeus is the main port of Athens and the departure point for most Naxos sailings. You have two genuinely different products. High-speed catamarans (SeaJets, Golden Star) do the crossing in about 3h15 for €45–75, run two to four times daily in July and August, and are enclosed with airline-style seating  -  fast, but they cancel in strong meltemi and the ride can be rough. Conventional ferries (Blue Star) take 4h45 to 5h30 for €30–40, have open decks, a proper café, cabins on some sailings and cope with weather far better. Our honest advice: take the Blue Star. The extra ninety minutes buys you a vastly more pleasant crossing, a lower fare, and a much smaller chance of a cancellation wrecking your first day. Book ahead in August; deck-class rarely sells out, but the fast boats do.",
        ),
      },
      {
        heading: ls("Flying to Naxos (JNX)"),
        body: ls(
          "Naxos Island National Airport sits 3 km south of Chora and handles domestic flights from Athens in about 45 minutes. The runway is short, so operations are limited to small turboprops (typically ATR 42s and Dash 8s), which means few seats per flight, restrictive baggage allowances and prices that climb steeply as the aircraft fills. There are no direct international flights. In practice, flying makes sense if you are short on time, arriving late from a long-haul connection, or travelling in shoulder season when fares are reasonable. In August it is often both more expensive and less reliable than the ferry, because weather diversions on a short island runway are common. If you do fly, we meet you at the terminal  -  it is a single small building, so finding each other is trivial.",
        ),
      },
      {
        heading: ls("Island-hopping into Naxos"),
        body: ls(
          "Naxos is well connected to its neighbours, which is what makes it such a good hub for a multi-island trip. Paros is 30–45 minutes and runs several times a day  -  the easiest hop in the Cyclades. Mykonos is 45 minutes to 1h15, which makes Mykonos airport a genuinely practical arrival option: fly into JMK, take an afternoon ferry, and be on Naxos for dinner. Santorini is 1h45 to 3 hours depending on the vessel, Ios about an hour, and the Small Cyclades (Koufonisia, Iraklia, Schinoussa, Donousa) are served by the local Express Skopelitis, which is slow, charming and not for anyone prone to seasickness.",
        ),
      },
      {
        heading: ls("What to book first, and how far ahead"),
        body: ls(
          "In order: accommodation, then the ferry, then the car, then everything else. Accommodation on Naxos in the last three weeks of July and the first three of August genuinely sells out, and the good value disappears months before the availability does. Ferries can be booked from around six months out and should be locked in by May for August travel  -  particularly the Paros and Santorini legs, which fill fastest. Cars are the one thing you can leave slightly later, but not much: our fleet is small enough that August books six to eight weeks ahead. If you are arriving on a late ferry, tell us the vessel name rather than the scheduled time  -  we track arrivals and meet the boat, and that is far more reliable than a clock.",
        ),
      },
    ],
    faq: [
      {
        q: ls("How long is the ferry from Athens to Naxos?"),
        a: ls(
          "About 3 hours 15 minutes on a high-speed catamaran from Piraeus, or 4 hours 45 minutes to 5 hours 30 on a conventional Blue Star ferry. The conventional service is cheaper, more comfortable and much less likely to be cancelled in strong wind.",
        ),
      },
      {
        q: ls("Is there an airport in Naxos?"),
        a: ls(
          "Yes  -  Naxos Island National Airport (IATA: JNX), 3 km south of Chora. It handles domestic flights from Athens only, in about 45 minutes, using small turboprop aircraft. There are no international flights and seat availability is limited.",
        ),
      },
      {
        q: ls("Which ferry company is best for Naxos?"),
        a: ls(
          "Blue Star Ferries for reliability, comfort and price on the Piraeus route; SeaJets and Golden Star if speed matters more than everything else. In strong meltemi the high-speed vessels cancel first, so if your schedule has no slack, the conventional ferry is the safer booking.",
        ),
      },
      {
        q: ls("Can you get to Naxos from Mykonos?"),
        a: ls(
          "Yes, in 45 minutes to 1 hour 15 depending on the vessel, with several sailings a day in season. Flying into Mykonos and taking a ferry across is often cheaper and more reliable than flying into Naxos directly.",
        ),
      },
      {
        q: ls("Do I need to book Greek ferries in advance?"),
        a: ls(
          "In July and August, yes  -  especially the fast boats and the Santorini and Paros legs. In May, June, September and October you can usually buy a day or two ahead. Booking early also gets you the better fares, which rise as sailings fill.",
        ),
      },
    ],
  },
  {
    slug: "naxos-port-guide",
    cluster: "arrive",
    title: ls("Naxos port guide: arrival, parking, car pickup and getting into town"),
    excerpt: ls(
      "What actually happens when your ferry docks at Naxos, where the car handover takes place, and how to avoid the twenty minutes of confusion most arrivals go through.",
    ),
    answer: ls(
      "Naxos port sits in the middle of Chora's waterfront, a five-minute walk from the old town. Ferries dock stern-first and unload vehicles and foot passengers through the same ramp. There is no rental desk inside a terminal building  -  local agencies meet you on the quay. We track your vessel and hand over the car directly at the port, at no extra charge, whatever time it arrives.",
    ),
    hero: "/images/naxos/chora.jpg",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    readingTime: 7,
    keywords: [
      "naxos port",
      "naxos ferry port",
      "jnx port",
      "car rental naxos port",
      "naxos port car pickup",
    ],
    related: ["how-to-get-to-naxos", "naxos-airport-jnx", "naxos-travel-guide", "where-to-stay-in-naxos"],
    vehiclePicks: ["hyundai-i10", "peugeot-208", "citroen-berlingo-7"],
    locationPicks: ["port-pickup", "naxos-town", "agios-prokopios"],
    sections: [
      {
        heading: ls("Where the port actually is"),
        body: ls(
          "Naxos has one commercial port and it is right in the middle of Chora, on the waterfront directly below the old town, with the Portara visible on its islet to the north. This is unusually convenient: you step off the ferry into the town rather than into an industrial zone twenty minutes away, as at Santorini's Athinios or Paros's Parikia extension. The Kastro is a five-minute walk uphill, the bus station is on the quay itself, and Agios Georgios beach is ten minutes on foot.",
        ),
      },
      {
        heading: ls("What disembarkation is like"),
        body: ls(
          "Greek ferries dock stern-first and drop a single ramp that vehicles and foot passengers share. It is loud, fast and looks chaotic; it is not. Stay to the side of the ramp, let the cars and lorries go, and walk off with the crowd. In peak August a large Blue Star can put 1,500 people onto the quay in about twelve minutes, so the waterfront is briefly very busy and then empty again. If you are meeting someone  -  us included  -  agree a landmark rather than 'at the port': the whole quay is the port.",
        ),
      },
      {
        heading: ls("Picking up a rental car at the port"),
        body: ls(
          "There is no terminal building with rental desks at Naxos port. Every local agency operates on a meet-and-greet basis: someone stands on the quay with the car and the paperwork. We track your vessel's actual arrival rather than its scheduled time, so a two-hour delay out of Piraeus is our problem and not yours, and we deliver at no surcharge regardless of the hour. Bring the driving licence, an International Driving Permit if your licence was issued outside the EU, and a card in the main driver's name. The handover takes about ten minutes including the walkaround.",
        ),
      },
      {
        heading: ls("Parking, and the mistake that gets cars towed"),
        body: ls(
          "Do not park on the quayside itself. The waterfront strip immediately in front of the ferry berth is an operational area and vehicles left there are towed routinely, often within twenty minutes, and the recovery process eats an afternoon. There is free parking in the large lot north of the port near the Portara causeway, and paid parking south along the waterfront. Chora's old town is entirely car-free  -  do not attempt to drive into the Kastro lanes, which are stepped and barely wider than a person in places. Park at the edge and walk in.",
        ),
      },
    ],
    faq: [
      {
        q: ls("Can you rent a car at Naxos port?"),
        a: ls(
          "Yes. There is no rental desk in a terminal, but local agencies meet arriving ferries on the quay and hand over the car there. We do this free of charge, tracking the vessel's actual arrival so late sailings are covered.",
        ),
      },
      {
        q: ls("How far is Naxos port from the town centre?"),
        a: ls(
          "It is in the town centre. The port sits on Chora's waterfront; the old town starts immediately behind it and the Kastro is a five-minute walk uphill.",
        ),
      },
      {
        q: ls("Is there parking at Naxos port?"),
        a: ls(
          "Yes  -  free parking in the lot north of the port towards the Portara, and paid spaces along the waterfront to the south. Never leave a car on the quayside in front of the ferry berth; it is an operational area and cars are towed quickly.",
        ),
      },
      {
        q: ls("What happens if my ferry to Naxos arrives late at night?"),
        a: ls(
          "Nothing changes for us  -  we meet late sailings as a matter of course, which is the main practical advantage of a local agency over a chain counter with opening hours. Send us your vessel name and we track the arrival.",
        ),
      },
    ],
  },
  {
    slug: "naxos-airport-jnx",
    cluster: "arrive",
    title: ls("Naxos airport (JNX): flights, arrivals, car hire and transfers"),
    excerpt: ls(
      "A small airport with one terminal, short runway and no rental desks. Here is exactly what to expect and how the car handover works.",
    ),
    answer: ls(
      "Naxos Island National Airport (IATA: JNX, ICAO: LGNX) is 3 km south of Chora, handles domestic flights from Athens only in about 45 minutes, and has a single small terminal. The runway is short so only turboprops operate. There are no car rental desks inside  -  agencies meet arrivals at the terminal door, which we do free of charge.",
    ),
    hero: "/images/naxos/landscape.jpg",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    readingTime: 6,
    keywords: [
      "naxos airport",
      "jnx airport",
      "naxos airport car rental",
      "flights to naxos",
      "naxos airport transfer",
    ],
    related: ["how-to-get-to-naxos", "naxos-port-guide", "naxos-travel-guide", "naxos-itinerary"],
    vehiclePicks: ["hyundai-i10", "toyota-aygo", "peugeot-208"],
    locationPicks: ["airport-pickup-jnx", "agios-prokopios", "naxos-town"],
    sections: [
      {
        heading: ls("What kind of airport this is"),
        body: ls(
          "JNX is a single-storey building with one gate, one baggage belt and a café. Arrivals to car park is roughly ninety seconds. The runway is 900 m, which is short by any standard and rules out jets entirely  -  services are flown by ATR 42 and Dash 8 turboprops from Athens, typically one to three times a day depending on season. Baggage allowances on these aircraft are tighter than on a jet, and the aircraft are weight-sensitive, so on hot days with a full load bags occasionally travel on a later flight. Pack accordingly if you are connecting from an international arrival.",
        ),
      },
      {
        heading: ls("Getting from the airport to your accommodation"),
        body: ls(
          "The airport is 3 km from Chora, which is a five-minute drive, and about the same to Agios Prokopios. There is no airport bus. Taxis meet flights but there are few of them island-wide and they can be gone within minutes of a full arrival. Hotels in Chora, Agios Prokopios and Agia Anna will usually arrange a transfer if you ask in advance. Or take the car at the terminal: we meet the flight, hand over the keys outside arrivals at no extra charge, and you drive straight to your hotel  -  which for most people is the simplest option on an island where you will want a car anyway.",
        ),
      },
      {
        heading: ls("Should you fly or take the ferry?"),
        body: ls(
          "Fly if you are time-poor, arriving from a long-haul connection into Athens, or travelling in May, June, September or October when fares are sane. Take the ferry if you are travelling in peak summer, want flexibility on baggage, or care about cost  -  a Blue Star deck ticket is a fraction of an August airfare and far less likely to be disrupted. There is one genuine argument for the ferry that people underrate: arriving into Naxos by sea, with the Portara on your right and the Kastro rising behind the harbour, is one of the better arrivals in the Aegean.",
        ),
      },
    ],
    faq: [
      {
        q: ls("Does Naxos have an airport?"),
        a: ls(
          "Yes  -  Naxos Island National Airport, code JNX, 3 km south of Chora. It handles domestic flights from Athens only, using small turboprop aircraft, in about 45 minutes.",
        ),
      },
      {
        q: ls("Are there international flights to Naxos?"),
        a: ls(
          "No. The runway is too short for jets, so all services are domestic turboprops from Athens. International visitors connect via Athens, or fly to Mykonos or Santorini and take a ferry across.",
        ),
      },
      {
        q: ls("Can you rent a car at Naxos airport?"),
        a: ls(
          "Yes, though not from a desk  -  the terminal has no rental counters. Local agencies meet arriving flights outside the building. We deliver to the airport free of charge and track the flight, so a delay costs you nothing.",
        ),
      },
      {
        q: ls("How far is Naxos airport from Naxos Town?"),
        a: ls(
          "Three kilometres, about a five-minute drive. Agios Prokopios and Agia Anna are a similar distance in the other direction.",
        ),
      },
    ],
  },
];
