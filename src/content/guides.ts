import type { Guide } from "@/types/content";

const ls = (en: string, el?: string, it?: string, fr?: string, de?: string) => ({
  en, el: el ?? en, it: it ?? en, fr: fr ?? en, de: de ?? en,
});

const HERO = (q: string) =>
  `https://images.unsplash.com/photo-${q}?w=1600&auto=format&fit=crop`;

export const GUIDES: Guide[] = [
  {
    slug: "do-you-need-a-car-in-naxos",
    title: ls(
      "Do you need a car in Naxos? An honest 2026 answer",
      "Χρειάζεσαι αυτοκίνητο στη Νάξο; Μια ειλικρινής απάντηση",
      "Serve l'auto a Naxos? Una risposta onesta",
      "Faut-il une voiture à Naxos ? Une réponse honnête",
      "Brauche ich auf Naxos ein Auto? Eine ehrliche Antwort",
    ),
    excerpt: ls(
      "Buses cover the obvious. Renting a car (or scooter, or ATV) covers everything else — and Naxos has a lot of everything else.",
      "Τα λεωφορεία καλύπτουν τα προφανή. Η ενοικίαση καλύπτει όλα τα υπόλοιπα.",
      "Gli autobus coprono l'ovvio. Il noleggio copre tutto il resto.",
      "Les bus couvrent l'essentiel. La location couvre tout le reste.",
      "Busse decken das Offensichtliche. Mietwagen den Rest.",
    ),
    hero: HERO("1611348586804-61bf6c080437"),
    publishedAt: "2026-01-15",
    updatedAt: "2026-04-22",
    readingTime: 8,
    related: ["driving-in-naxos", "naxos-road-trip-itinerary", "naxos-airport-jnx-guide"],
    faqRefs: ["do-i-need-car-naxos", "automatic-availability", "best-time-to-rent"],
    sections: [
      {
        heading: ls("The short answer", "Σύντομη απάντηση", "Risposta breve", "Réponse courte", "Kurze Antwort"),
        body: ls(
          "If you're staying in Chora and you're happy spending most of your time at the closest beaches (Agios Georgios, Agios Prokopios, Agia Anna), you can absolutely do it without a car. Public buses are reliable, taxis are reasonable, and the old town itself is car-free. Once you start asking questions like 'how do we get to Apeiranthos for lunch?' or 'can we drive to Alyko for sunset?' the answer changes. Without a vehicle the bus schedule controls your day; with one, the island opens up to a 5- to 10-fold increase in what you can see.",
          "Αν μένετε στη Χώρα και αρκείστε στις κοντινές παραλίες, μπορείτε χωρίς αυτοκίνητο. Για εσωτερικά χωριά και απομακρυσμένες παραλίες, η ενοικίαση είναι απαραίτητη.",
          "Se resti a Chora e ti bastano le spiagge vicine, puoi fare a meno dell'auto. Per villaggi interni e spiagge lontane è essenziale.",
          "Si tu restes à Chora et que les plages proches te suffisent, pas besoin de voiture. Sinon, c'est essentiel.",
          "Wenn Sie in Chora bleiben und mit den nahen Stränden zufrieden sind, geht es ohne Auto. Für Bergdörfer und entlegene Strände ist es unverzichtbar.",
        ),
      },
      {
        heading: ls("What buses can and can't do", "Τι μπορούν και τι όχι τα λεωφορεία", "Cosa fanno e non fanno gli autobus", "Ce que font et ne font pas les bus", "Was Busse können und nicht"),
        body: ls(
          "KTEL Naxos runs hourly buses from Chora to Agios Prokopios, Agia Anna and Plaka in summer; less frequent service to Apollonas, Apeiranthos and Filoti (3–4 times a day). Last bus back from the inland villages is typically late afternoon. Buses don't go anywhere near Mikri Vigla, Alyko, Pyrgaki or any of the small chapels. Schedules are reduced sharply outside July–August.",
          "Το ΚΤΕΛ Νάξου εκτελεί τακτικά δρομολόγια προς τις κύριες παραλίες, λιγότερα προς εσωτερικά χωριά. Δεν εξυπηρετεί απομακρυσμένες παραλίες όπως η Μικρή Βίγλα και το Αλυκό.",
          "KTEL Naxos copre le spiagge principali e i villaggi interni con frequenza ridotta. Mikri Vigla e Alyko non sono raggiunti.",
          "KTEL Naxos dessert les plages principales et l'intérieur en fréquence réduite. Mikri Vigla et Alyko non desservis.",
          "KTEL Naxos fährt zu den Hauptstränden und Bergdörfern in reduzierter Frequenz. Mikri Vigla und Alyko nicht.",
        ),
      },
      {
        heading: ls("When a scooter beats a car", "Πότε το μηχανάκι κερδίζει το αυτοκίνητο", "Quando lo scooter batte l'auto", "Quand le scooter bat la voiture", "Wann der Roller das Auto schlägt"),
        body: ls(
          "Two adults, no luggage, one base for the whole trip — a 50cc or 125cc scooter beats a car for cost, parking and freedom. You'll spend €30–40/day instead of €60+, and you'll never circle Chora looking for a spot. The trade-offs: weather (pouring rain isn't fun), wind (Naxos is famously breezy), and distance (Apollonas on a 50cc is a long, slow ride).",
          "Δύο ενήλικες, μία βάση, χωρίς αποσκευές — μηχανάκι κερδίζει σε κόστος και ευελιξία.",
          "Due adulti, una base, niente bagagli — lo scooter batte l'auto per costi e libertà.",
          "Deux adultes, une base, sans bagage — le scooter bat la voiture en coût et liberté.",
          "Zwei Erwachsene, eine Basis, ohne Gepäck — Roller schlägt das Auto in Kosten und Freiheit.",
        ),
      },
      {
        heading: ls("ATVs, buggies and the adventure factor", "ATV, buggies και ο παράγοντας περιπέτεια", "ATV, buggy e il fattore avventura", "ATV, buggys et le côté aventure", "ATV, Buggys und der Abenteuerfaktor"),
        body: ls(
          "If your trip has an 'experience day' where Alyko, Mikri Vigla or Pyrgaki appear in the plan, an ATV or a Polaris buggy turns those days into the highlight of the holiday. They're slower, louder, and absolutely worth the extra €30/day if you've got the right itinerary.",
          "Αν το πρόγραμμά σας περιλαμβάνει Αλυκό, Μικρή Βίγλα ή Πυργάκι, ένα ATV ή buggy κάνει την ημέρα αξέχαστη.",
          "Se l'itinerario tocca Alyko, Mikri Vigla o Pyrgaki, ATV o buggy rendono la giornata indimenticabile.",
          "Si Alyko, Mikri Vigla ou Pyrgaki sont prévus, ATV ou buggy rendent la journée mémorable.",
          "Wenn Alyko, Mikri Vigla oder Pyrgaki im Plan stehen, machen ATV oder Buggy den Tag unvergesslich.",
        ),
      },
      {
        heading: ls("Our honest recommendation", "Η ειλικρινής σύστασή μας", "Il nostro consiglio onesto", "Notre recommandation honnête", "Unsere ehrliche Empfehlung"),
        body: ls(
          "For most visitors staying 4+ nights: rent something for the entire stay (car if you have luggage and kids, scooter if you're a couple travelling light). For shorter stays: rent for 2–3 days within the trip, do all the inland exploration in those days, and leave the beach days for buses or walking. We hold the same rate whether you book 2 days or 7 — there is no penalty for short rentals.",
          "Για επισκέπτες 4+ ημερών: ενοικίαση για όλη την παραμονή. Για 2–3 μέρες: επικεντρωθείτε στις εσωτερικές διαδρομές.",
          "Per soggiorni di 4+ notti: noleggia per tutto il tempo. Per 2–3 giorni: concentrati sull'entroterra.",
          "Pour 4 nuits + : louez pour tout le séjour. Pour 2-3 jours : concentrez-vous sur l'arrière-pays.",
          "Bei 4+ Übernachtungen: Mietwagen für die ganze Dauer. Bei 2–3 Tagen: aufs Inland konzentrieren.",
        ),
      },
    ],
  },
  {
    slug: "driving-in-naxos",
    title: ls(
      "Driving in Naxos: roads, rules and the new 2026 traffic code",
      "Οδήγηση στη Νάξο: δρόμοι, κανόνες και ο νέος ΚΟΚ 2026",
      "Guidare a Naxos: strade, regole e il nuovo Codice 2026",
      "Conduire à Naxos : routes, règles et nouveau Code 2026",
      "Auto fahren auf Naxos: Straßen, Regeln und neue StVO 2026",
    ),
    excerpt: ls(
      "Most travel blogs still quote pre-2026 limits. Here's what actually applies on Naxos roads in 2026.",
      "Τα περισσότερα blogs ακόμα γράφουν παλιά όρια. Εδώ είναι τι ισχύει το 2026.",
      "Molti blog citano ancora i limiti vecchi. Ecco cosa vale nel 2026.",
      "La plupart des blogs citent les anciennes limites. Voici 2026.",
      "Viele Blogs nennen noch alte Limits. Hier ist 2026.",
    ),
    hero: HERO("1568772585407-9361f9bf3a87"),
    publishedAt: "2026-02-04",
    updatedAt: "2026-04-22",
    readingTime: 9,
    related: ["new-greek-traffic-code-2026", "idp-greece-rules", "parking-in-naxos"],
    faqRefs: ["driving-difficulty", "speed-limits-2026", "alcohol-limit", "child-seats"],
    sections: [
      {
        heading: ls("New 2026 speed limits", "Νέα όρια ταχύτητας 2026", "Nuovi limiti 2026", "Nouvelles limites 2026", "Neue Tempolimits 2026"),
        body: ls(
          "Effective 1 January 2026 the Greek Road Traffic Code (voted 13 June 2025) reduced urban speed limits from 50 km/h to 30 km/h island-wide, and adjusted the rest: 90 km/h on rural roads, 110 on expressways, 130 on motorways. Greece is now the second EU country (after Spain) to adopt the 30 km/h urban limit. On Naxos this practically means: every Chora street is 30, every village is 30, the only places you'll hit 70+ are the main coastal road and the climb to Apollonas.",
          "Από 1/1/2026: 30 εντός πόλης, 90 αγροτικά, 110 ταχείας, 130 αυτοκινητοδρόμου.",
          "Dall'1/1/2026: 30 città, 90 extraurbane, 110 superstrade, 130 autostrade.",
          "Au 1/1/2026 : 30 ville, 90 hors agglo, 110 voie rapide, 130 autoroute.",
          "Ab 1.1.2026: 30 in Städten, 90 Landstraße, 110 Schnellstraße, 130 Autobahn.",
        ),
      },
      {
        heading: ls("Roads on Naxos — the practical map", "Οι δρόμοι της Νάξου — πρακτικός χάρτης", "Strade di Naxos — la mappa pratica", "Routes à Naxos — la carte pratique", "Naxos Straßen — die praktische Karte"),
        body: ls(
          "The west-coast road (Chora → Agios Prokopios → Plaka → Mikri Vigla → Pyrgaki) is paved, fast and well-marked. The Filoti–Apeiranthos mountain road is paved with switchbacks; expect 25–30 km/h average. The road to Apollonas via Koronos is paved, narrow in places, and a one-hour drive end-to-end. Unpaved tracks exist around Alyko, the dunes south of Mikri Vigla, and approaching the small chapels — these are off-limits for non-4×4 cars under our contract.",
          "Ο δυτικός δρόμος είναι ασφαλτοστρωμένος. Το βουνό Φιλώτι–Απείρανθος έχει στροφές. Ο Απόλλωνας μέσω Κορώνου είναι μια ώρα.",
          "La strada costiera ovest è asfaltata. Filoti–Apeiranthos ha tornanti. Apollonas via Koronos un'ora.",
          "La côte ouest est asphaltée. Filoti–Apeiranthos en lacets. Apollonas via Koronos en une heure.",
          "Westküste asphaltiert. Filoti–Apeiranthos Serpentinen. Apollonas via Koronos eine Stunde.",
        ),
      },
      {
        heading: ls("Drink-driving and seatbelts", "Αλκοόλ και ζώνες", "Alcol e cinture", "Alcool et ceintures", "Alkohol und Gurte"),
        body: ls(
          "Greek alcohol limit is 0.05% blood alcohol for normal drivers, 0.02% for drivers under 2 years experience and motorcyclists. Police checks happen often on Naxos in summer. Seatbelts are mandatory for every occupant. Children under 12 (or shorter than 1.35 m) cannot sit in the front seat.",
          "0.05% αλκοόλ, 0.02% για νέους και μοτοσικλετιστές. Ζώνες υποχρεωτικές. Παιδιά κάτω 12 ετών όχι στη θέση συνοδηγού.",
          "0,05% alcol, 0,02% neopatentati e motociclisti.",
          "0,05% alcool, 0,02% jeunes conducteurs et motards.",
          "0,05% Alkohol, 0,02% Fahranfänger und Motorradfahrer.",
        ),
      },
      {
        heading: ls("Driving at night — the local warning", "Νυχτερινή οδήγηση — η ντόπια προειδοποίηση", "Guida notturna — l'avviso locale", "Conduite de nuit — l'alerte locale", "Nachtfahren — der lokale Hinweis"),
        body: ls(
          "Most rural roads on Naxos have no street lighting. Goats, scooters without lights, and unmarked junctions are common after sunset. Avoid driving the inland roads at night during your first day on the island. If you must, double the gap you'd normally keep.",
          "Οι αγροτικοί δρόμοι δεν έχουν φωτισμό. Αποφύγετε νυχτερινή οδήγηση την πρώτη μέρα.",
          "Strade rurali senza illuminazione. Evita di guidare la prima notte.",
          "Routes rurales non éclairées. Évite la conduite la première nuit.",
          "Landstraßen ohne Beleuchtung. Erste Nacht meiden.",
        ),
      },
      {
        heading: ls("Common mistakes tourists make", "Συνήθη λάθη των τουριστών", "Errori frequenti dei turisti", "Erreurs courantes des touristes", "Häufige Touristenfehler"),
        body: ls(
          "Driving into pedestrian zones in Chora (don't, they're enforced and the Old Town is car-free), trying to take a non-4×4 onto the Alyko track (you will get stuck), and parking on the harbour pavement (towed regularly). Stick to marked spots and you'll never have a problem.",
          "Είσοδος σε πεζόδρομους, off-road με μη 4×4, παρκάρισμα σε πεζοδρόμια — αποφύγετε.",
          "Zone pedonali, off-road senza 4×4, sosta sui marciapiedi — da evitare.",
          "Zones piétonnes, hors-piste sans 4×4, stationnement sur trottoirs — à éviter.",
          "Fußgängerzonen, Off-Road ohne 4×4, Gehsteig parken — vermeiden.",
        ),
      },
    ],
  },
  {
    slug: "naxos-road-trip-itinerary",
    title: ls(
      "The 5-day Naxos road trip itinerary",
      "Πρόγραμμα 5 ημερών οδικά στη Νάξο",
      "Itinerario di 5 giorni in auto a Naxos",
      "Itinéraire road trip Naxos en 5 jours",
      "Naxos Roadtrip in 5 Tagen",
    ),
    excerpt: ls(
      "Beach days, mountain villages, sunset drives — five days that make a Naxos rental pay for itself.",
      "Παραλίες, ορεινά χωριά, διαδρομές ηλιοβασιλέματος.",
      "Spiagge, villaggi montani, tramonti.",
      "Plages, villages, couchers de soleil.",
      "Strände, Bergdörfer, Sonnenuntergänge.",
    ),
    hero: HERO("1611348586804-61bf6c080437"),
    publishedAt: "2026-02-12",
    updatedAt: "2026-04-22",
    readingTime: 11,
    related: ["naxos-mountain-villages-by-car", "best-beaches-by-car-naxos", "do-you-need-a-car-in-naxos"],
    sections: [
      {
        heading: ls("Day 1 — Chora, port, west-coast beaches", "Ημέρα 1 — Χώρα, λιμάνι, δυτική ακτή", "Giorno 1 — Chora, porto, costa ovest", "Jour 1 — Chora, port, côte ouest", "Tag 1 — Chora, Hafen, Westküste"),
        body: ls(
          "Pick up the car at the port. Drive 5 km to Agios Prokopios, swim, eat at one of the beachfront tavernas. Continue 3 km south to Plaka — the long, less developed beach. Sunset back at Chora's Portara on foot.",
          "Παραλαβή στο λιμάνι, Άγιος Προκόπιος, Πλάκα, ηλιοβασίλεμα στην Πορτάρα.",
          "Ritiro al porto, Agios Prokopios, Plaka, tramonto alla Portara.",
          "Retrait au port, Agios Prokopios, Plaka, coucher de soleil à Portara.",
          "Abholung am Hafen, Agios Prokopios, Plaka, Sonnenuntergang Portara.",
        ),
      },
      {
        heading: ls("Day 2 — The Tragea loop (Chalki–Filoti–Apeiranthos)", "Ημέρα 2 — Η Τραγαία (Χαλκί–Φιλώτι–Απείρανθος)", "Giorno 2 — Il giro di Tragea", "Jour 2 — La boucle de Tragea", "Tag 2 — Die Tragea-Schleife"),
        body: ls(
          "The marquee Naxos drive. Chalki for kitron tasting at Vallindras, Filoti for souvlaki under the plane trees, Apeiranthos for marble streets and the museum. Allow 7+ hours including stops.",
          "Η εμβληματική διαδρομή — Χαλκί, Φιλώτι, Απείρανθος. 7+ ώρες με στάσεις.",
          "Il giro iconico — Chalki, Filoti, Apeiranthos. 7+ ore con soste.",
          "La boucle iconique — Chalki, Filoti, Apeiranthos. 7+ h avec arrêts.",
          "Die ikonische Tour — Chalki, Filoti, Apeiranthos. 7+ Std mit Stopps.",
        ),
      },
      {
        heading: ls("Day 3 — Mikri Vigla & Alyko adventure day", "Ημέρα 3 — Μικρή Βίγλα & Αλυκό", "Giorno 3 — Mikri Vigla e Alyko", "Jour 3 — Mikri Vigla et Alyko", "Tag 3 — Mikri Vigla & Alyko"),
        body: ls(
          "Switch to a buggy for the day if you can. Mikri Vigla for windsurfing or just the wind, then push south to Alyko's cedar forest and the painted abandoned hotel. Sunset at Pyrgaki.",
          "Αλλάξτε σε buggy. Μικρή Βίγλα, Αλυκό, ηλιοβασίλεμα στο Πυργάκι.",
          "Passa al buggy. Mikri Vigla, Alyko, tramonto a Pyrgaki.",
          "Passe au buggy. Mikri Vigla, Alyko, coucher de soleil à Pyrgaki.",
          "Auf Buggy wechseln. Mikri Vigla, Alyko, Sonnenuntergang Pyrgaki.",
        ),
      },
      {
        heading: ls("Day 4 — Apollonas and the Kouros", "Ημέρα 4 — Απόλλωνας και Κούρος", "Giorno 4 — Apollonas e il Kouros", "Jour 4 — Apollonas et le Kouros", "Tag 4 — Apollonas und der Kouros"),
        body: ls(
          "An hour's drive over the mountains to Apollonas, the unfinished giant Kouros statue, and a slow seafood lunch at the harbour. Return via Lionas if you want to add a quiet beach swim.",
          "Διαδρομή μιας ώρας. Κούρος, μεσημεριανό, επιστροφή μέσω Λιώνα.",
          "Un'ora di guida. Kouros, pranzo, ritorno via Lionas.",
          "Une heure de route. Kouros, déjeuner, retour par Lionas.",
          "Eine Stunde Fahrt. Kouros, Mittagessen, Rückweg via Lionas.",
        ),
      },
      {
        heading: ls("Day 5 — slow morning, return", "Ημέρα 5 — αργό πρωινό, επιστροφή", "Giorno 5 — mattina lenta, restituzione", "Jour 5 — matin tranquille, retour", "Tag 5 — gemächlicher Morgen, Rückgabe"),
        body: ls(
          "Last swim at Agia Anna or Agios Prokopios, drop the car at the port (or airport — same price), board the ferry. We'll meet you wherever and whenever.",
          "Τελευταίο μπάνιο, παράδοση οχήματος σε λιμάνι ή αεροδρόμιο.",
          "Ultimo bagno, restituzione al porto o aeroporto.",
          "Dernière baignade, restitution au port ou aéroport.",
          "Letztes Bad, Rückgabe am Hafen oder Flughafen.",
        ),
      },
    ],
  },
  {
    slug: "naxos-mountain-villages-by-car",
    title: ls(
      "Naxos mountain villages by car: Chalki, Filoti, Apeiranthos",
      "Τα ορεινά χωριά της Νάξου με αυτοκίνητο",
      "I villaggi montani di Naxos in auto",
      "Les villages de montagne de Naxos en voiture",
      "Naxos Bergdörfer mit dem Auto",
    ),
    excerpt: ls(
      "The single most photogenic loop on Naxos — and you can do it in a day with any small car.",
      "Η πιο φωτογενής διαδρομή της Νάξου σε μια μέρα.",
      "Il giro più fotogenico di Naxos in un giorno.",
      "La boucle la plus photogénique en une journée.",
      "Die fotogenste Schleife in einem Tag.",
    ),
    hero: HERO("1611348586804-61bf6c080437"),
    publishedAt: "2026-02-20",
    updatedAt: "2026-04-22",
    readingTime: 7,
    related: ["naxos-road-trip-itinerary", "driving-in-naxos", "best-beaches-by-car-naxos"],
    sections: [
      {
        heading: ls("Chalki — the Tragea capital", "Χαλκί — η πρωτεύουσα της Τραγαίας", "Chalki — la capitale di Tragea", "Chalki — la capitale de Tragea", "Chalki — die Tragea-Hauptstadt"),
        body: ls(
          "16 km from Chora on a smooth paved road. Park in the square, walk the neoclassical streets, and stop at Vallindras Distillery for a free kitron tasting (Naxos's citrus liqueur, made here since 1896).",
          "16 χλμ από τη Χώρα. Παρκάρετε στην πλατεία, δοκιμάστε κίτρο στο Βαλληνδρά.",
          "16 km da Chora. Parcheggio in piazza, degustazione di kitron a Vallindras.",
          "16 km de Chora. Parking sur la place, dégustation de kitron à Vallindras.",
          "16 km von Chora. Parkplatz am Platz, Kitron-Verkostung bei Vallindras.",
        ),
      },
      {
        heading: ls("Filoti — souvlaki under plane trees", "Φιλώτι — σουβλάκι κάτω από πλάτανους", "Filoti — souvlaki sotto i platani", "Filoti — souvlaki sous les platanes", "Filoti — Souvlaki unter Platanen"),
        body: ls(
          "Filoti is the trailhead for Mount Zas (1004 m, the highest in the Cyclades) and the Cave of Zeus. Even if you skip the hike, the village square and the church of Panagia Filotitissa are worth the stop.",
          "Το Φιλώτι είναι η αφετηρία για τον Ζα. Πλατεία και εκκλησία αξίζουν.",
          "Filoti è la base per il Monte Zas. Piazza e chiesa meritano.",
          "Filoti est le départ pour le mont Zas. Place et église valent l'arrêt.",
          "Filoti ist der Ausgangspunkt für Zas. Platz und Kirche lohnen sich.",
        ),
      },
      {
        heading: ls("Apeiranthos — marble streets at 600 m", "Απείρανθος — μαρμάρινα στενά στα 600 μ.", "Apeiranthos — vie di marmo a 600 m", "Apeiranthos — rues en marbre à 600 m", "Apeiranthos — Marmorgassen auf 600 m"),
        body: ls(
          "Visually the most stunning village on Naxos. Whitewashed houses, marble paving, Venetian towers, balcony tavernas with sweeping views over the eastern coast. Five small museums.",
          "Το πιο όμορφο χωριό της Νάξου. Λευκά σπίτια, μάρμαρο, βενετσιάνικοι πύργοι.",
          "Il villaggio più bello. Case bianche, marmo, torri veneziane.",
          "Le plus beau village. Maisons blanches, marbre, tours vénitiennes.",
          "Das schönste Dorf. Weiße Häuser, Marmor, venezianische Türme.",
        ),
      },
    ],
  },
  {
    slug: "best-beaches-by-car-naxos",
    title: ls(
      "Naxos beaches by car: a beach hopper's guide",
      "Παραλίες Νάξου με αυτοκίνητο: οδηγός",
      "Spiagge di Naxos in auto: guida",
      "Plages de Naxos en voiture : guide",
      "Naxos Strände mit dem Auto: Guide",
    ),
    excerpt: ls(
      "From the family-friendly classics to the wild south — driving makes Naxos's 30 km of west coast yours.",
      "Από οικογενειακές μέχρι άγριες παραλίες — με αυτοκίνητο όλη η δυτική ακτή είναι δική σας.",
      "Dalle classiche per famiglie alla costa sud selvaggia.",
      "Des classiques familiales à la côte sud sauvage.",
      "Von Familien-Klassikern bis zur wilden Südküste.",
    ),
    hero: HERO("1611348586804-61bf6c080437"),
    publishedAt: "2026-02-25",
    updatedAt: "2026-04-22",
    readingTime: 8,
    related: ["naxos-road-trip-itinerary", "atv-vs-buggy-vs-car", "do-you-need-a-car-in-naxos"],
    sections: [
      {
        heading: ls("Agios Prokopios", "Άγιος Προκόπιος", "Agios Prokopios", "Agios Prokopios", "Agios Prokopios"),
        body: ls(
          "5 km south of Chora. Wide white sand, organised loungers, family-friendly. Buses run frequently here too — but parking is plentiful.",
          "5 χλμ νότια. Λευκή άμμος, ξαπλώστρες, οικογενειακή.",
          "5 km a sud. Sabbia bianca, lettini, in famiglia.",
          "5 km au sud. Sable blanc, transats, en famille.",
          "5 km südlich. Weißer Sand, Liegen, familientauglich.",
        ),
      },
      {
        heading: ls("Plaka", "Πλάκα", "Plaka", "Plaka", "Plaka"),
        body: ls(
          "8 km south. Long, less developed than Prokopios. Naturist friendly at the southern end. Ample free parking.",
          "8 χλμ νότια. Λιγότερο αναπτυγμένη.",
          "8 km a sud. Meno sviluppata.",
          "8 km au sud. Moins développée.",
          "8 km südlich. Weniger erschlossen.",
        ),
      },
      {
        heading: ls("Mikri Vigla", "Μικρή Βίγλα", "Mikri Vigla", "Mikri Vigla", "Mikri Vigla"),
        body: ls(
          "17 km south. Wind-blasted, kitesurf central. Two beaches separated by a rocky headland. ATVs and buggies welcome on the access tracks.",
          "17 χλμ. Kitesurf παράδεισος. ATV και buggies καλοδεχούμενα.",
          "17 km. Paradiso kitesurf. ATV e buggy benvenuti.",
          "17 km. Paradis du kitesurf. ATV et buggys bienvenus.",
          "17 km. Kitesurf-Paradies. ATVs und Buggys willkommen.",
        ),
      },
      {
        heading: ls("Alyko & Pyrgaki", "Αλυκό & Πυργάκι", "Alyko e Pyrgaki", "Alyko et Pyrgaki", "Alyko & Pyrgaki"),
        body: ls(
          "23 km south, the wildest west-coast string. Cedar forests, the famous painted abandoned hotel, no facilities. The unpaved tracks here are why we offer the Suzuki Jimny and the Polaris buggy.",
          "23 χλμ νότια. Κέδροι, το εγκαταλελειμμένο ξενοδοχείο, χωμάτινοι δρόμοι.",
          "23 km a sud. Cedri, l'hotel abbandonato dipinto, sterrati.",
          "23 km au sud. Cèdres, l'hôtel abandonné peint, pistes.",
          "23 km südlich. Zedern, verlassenes Hotel, Schotter.",
        ),
      },
    ],
  },
  {
    slug: "idp-greece-rules",
    title: ls(
      "International Driving Permit (IDP) in Greece: 2026 rules",
      "International Driving Permit στην Ελλάδα: κανόνες 2026",
      "Patente internazionale in Grecia: regole 2026",
      "Permis international en Grèce : règles 2026",
      "Internationaler Führerschein in Griechenland 2026",
    ),
    excerpt: ls(
      "Most travel sites still tell you you need an IDP. Greek Law 4850/2021 disagrees.",
      "Τα περισσότερα blogs ζητούν IDP. Ο Νόμος 4850/2021 λέει διαφορετικά.",
      "I siti dicono ancora di servire l'IDP. La legge 4850/2021 dice il contrario.",
      "Les blogs disent IDP obligatoire. La loi 4850/2021 dit non.",
      "Blogs sagen IDP nötig. Gesetz 4850/2021 sagt nein.",
    ),
    hero: HERO("1568772585407-9361f9bf3a87"),
    publishedAt: "2026-03-01",
    updatedAt: "2026-04-22",
    readingTime: 5,
    related: ["new-greek-traffic-code-2026", "driving-in-naxos"],
    faqRefs: ["idp-greece", "documents-needed"],
    sections: [
      {
        heading: ls("The 2021 law that changed everything", "Ο νόμος του 2021 που τα άλλαξε όλα", "La legge del 2021 che ha cambiato tutto", "La loi 2021 qui a tout changé", "Das Gesetz 2021 das alles änderte"),
        body: ls(
          "Greek Law 4850/2021 (Government Gazette 208/Α, 5 November 2021), Article 25.3.η, removed the IDP requirement for licence holders from EU/EEA, the United Kingdom, the United States, Canada, Australia, and Gibraltar for tourist stays under 6 months. Switzerland, Iceland, Liechtenstein and Norway are also covered. If you hold a licence from one of these jurisdictions, your home licence is enough — no IDP needed.",
          "Ο Νόμος 4850/2021 κατάργησε την υποχρέωση IDP για ΕΕ/ΗΠΑ/Καναδά/ΗΒ/Αυστραλίας/Γιβραλτάρ για τουριστική διαμονή κάτω των 6 μηνών.",
          "La legge 4850/2021 ha eliminato l'IDP per UE/USA/Canada/UK/Australia/Gibilterra fino a 6 mesi.",
          "La loi 4850/2021 a supprimé l'IDP pour UE/USA/Canada/UK/Australie/Gibraltar jusqu'à 6 mois.",
          "Gesetz 4850/2021 schaffte die IDP-Pflicht für EU/USA/Kanada/UK/Australien/Gibraltar bis 6 Monate ab.",
        ),
      },
      {
        heading: ls("When you do still need an IDP", "Πότε χρειάζεστε ακόμη IDP", "Quando serve ancora l'IDP", "Quand l'IDP reste obligatoire", "Wann der IDP noch nötig ist"),
        body: ls(
          "If your licence is from outside the listed jurisdictions (e.g. China, India, Brazil, most Asian and Latin American countries) you still need a 1949 or 1968 IDP. If your licence is in non-Latin script (Cyrillic, Chinese, Arabic, etc.) bring an IDP regardless — it makes the contract easier to write.",
          "Από χώρες εκτός ΕΕ/ΗΠΑ/κλπ ή με μη λατινικό αλφάβητο: ναι.",
          "Da paesi fuori UE/USA/etc o alfabeto non latino: sì.",
          "Pays hors UE/USA/etc ou alphabet non latin : oui.",
          "Aus Ländern außer EU/USA/etc oder nichtlateinischer Schrift: ja.",
        ),
      },
    ],
  },
  {
    slug: "new-greek-traffic-code-2026",
    title: ls(
      "New Greek Traffic Code 2026: every change explained",
      "Νέος ΚΟΚ 2026: όλες οι αλλαγές",
      "Nuovo Codice della Strada greco 2026",
      "Nouveau Code de la route grec 2026",
      "Neue griechische StVO 2026",
    ),
    excerpt: ls(
      "Voted June 2025, in force January 2026. Lower urban limits, harsher penalties, new rules for e-scooters.",
      "Ψηφίστηκε Ιούνιο 2025, ισχύει Ιανουάριο 2026.",
      "Votato giugno 2025, in vigore gennaio 2026.",
      "Voté juin 2025, en vigueur janvier 2026.",
      "Beschlossen Juni 2025, gültig Januar 2026.",
    ),
    hero: HERO("1568772585407-9361f9bf3a87"),
    publishedAt: "2026-01-08",
    updatedAt: "2026-04-22",
    readingTime: 7,
    related: ["driving-in-naxos", "idp-greece-rules"],
    faqRefs: ["speed-limits-2026", "alcohol-limit"],
    sections: [
      {
        heading: ls("The 30 km/h urban limit", "Όριο 30 km/h εντός πόλης", "Limite urbano 30 km/h", "Limite urbain 30 km/h", "Innerorts 30 km/h"),
        body: ls(
          "Greece is the second EU country (after Spain) to drop the urban speed limit to 30 km/h. Every street inside a town or village now defaults to 30. This applies to every village on Naxos — Chora, Chalki, Filoti, Apeiranthos, Apollonas, all of them.",
          "Η Ελλάδα είναι η 2η χώρα ΕΕ μετά την Ισπανία με 30 km/h εντός πόλης.",
          "La Grecia è il 2° paese UE dopo la Spagna con 30 km/h.",
          "La Grèce est le 2e pays UE après l'Espagne à 30 km/h en ville.",
          "Griechenland ist nach Spanien das 2. EU-Land mit 30 km/h innerorts.",
        ),
      },
      {
        heading: ls("Other limits and penalties", "Άλλα όρια και κυρώσεις", "Altri limiti e sanzioni", "Autres limites et sanctions", "Andere Limits und Strafen"),
        body: ls(
          "Outside built-up areas: 90 km/h. Expressways: 110 km/h. Motorways: 130 km/h. Penalties for speeding doubled in some bands. Phone-while-driving fines tripled. Helmet enforcement on scooters and ATVs is now strict — riding without a helmet costs €350 and the suspension of your driving rights for 30 days.",
          "Εκτός πόλης 90, ταχείας 110, αυτοκινητοδρόμου 130. Πρόστιμα διπλά. Κινητό 3πλάσιο. Χωρίς κράνος €350 + 30 ημέρες αφαίρεση.",
          "Fuori città 90, superstrade 110, autostrade 130. Sanzioni raddoppiate.",
          "Hors agglo 90, voies rapides 110, autoroutes 130. Amendes doublées.",
          "Außerorts 90, Schnellstr. 110, Autobahn 130. Strafen verdoppelt.",
        ),
      },
    ],
  },
  {
    slug: "naxos-airport-jnx-guide",
    title: ls(
      "Naxos Airport (JNX): everything you need to know",
      "Αεροδρόμιο Νάξου (JNX): όλα όσα πρέπει να ξέρετε",
      "Aeroporto di Naxos (JNX): guida completa",
      "Aéroport de Naxos (JNX) : guide complet",
      "Flughafen Naxos (JNX): kompletter Guide",
    ),
    excerpt: ls(
      "A small regional airport <4 km from Chora. No permanent rental desks — only meet-and-greet. Here's how it works.",
      "Μικρό περιφερειακό αεροδρόμιο, λιγότερο από 4 χλμ από τη Χώρα. Μόνο meet-and-greet.",
      "Piccolo scalo regionale a meno di 4 km da Chora. Solo meet-and-greet.",
      "Petit aéroport régional à moins de 4 km de Chora. Meet-and-greet uniquement.",
      "Kleiner Regionalflughafen unter 4 km von Chora. Nur Meet-and-Greet.",
    ),
    hero: HERO("1556388275-3a5b48dc6b48"),
    publishedAt: "2026-03-05",
    updatedAt: "2026-04-22",
    readingTime: 6,
    related: ["do-you-need-a-car-in-naxos", "driving-in-naxos"],
    faqRefs: ["airport-vs-port-pickup", "delivery-zones"],
    sections: [
      {
        heading: ls("The basics", "Τα βασικά", "Le basi", "Les bases", "Die Basics"),
        body: ls(
          "IATA: JNX. ICAO: LGNX. One runway, one terminal, no jet bridges. Located 3.6 km southwest of Chora. Domestic flights to Athens via Olympic Air, plus the occasional charter from Western Europe in summer.",
          "IATA: JNX. Ένας διάδρομος, ένα τερματικό, 3.6 χλμ από τη Χώρα.",
          "IATA: JNX. Una pista, un terminal, 3,6 km da Chora.",
          "IATA : JNX. Une piste, un terminal, 3,6 km de Chora.",
          "IATA: JNX. Eine Bahn, ein Terminal, 3,6 km von Chora.",
        ),
      },
      {
        heading: ls("Why there are no rental desks", "Γιατί δεν υπάρχουν γκισέ ενοικίασης", "Perché non ci sono banchi di noleggio", "Pourquoi pas de comptoirs", "Warum keine Mietschalter"),
        body: ls(
          "JNX has irregular hours. Avis, Budget, Enterprise and Europcar all schedule meet-and-greets only when a customer's flight lands. Hertz hours are inconsistently reported across booking platforms (Rentalcars.com lists 24/7; AtlasChoice and EconomyBookings list 09:00–21:00). Sixt has no JNX presence. We do exactly the same — and we don't charge for it.",
          "Το JNX έχει ακανόνιστες ώρες. Όλες οι μάρκες κάνουν meet-and-greet. Εμείς δωρεάν.",
          "JNX ha orari irregolari. Tutti i marchi fanno meet-and-greet. Noi gratis.",
          "JNX a des horaires irréguliers. Toutes les marques font du meet-and-greet. Nous gratuitement.",
          "JNX hat unregelmäßige Zeiten. Alle Marken machen Meet-and-Greet. Wir kostenlos.",
        ),
      },
      {
        heading: ls("How our meet-and-greet works", "Πώς λειτουργεί το δικό μας meet-and-greet", "Come funziona il nostro meet-and-greet", "Comment fonctionne notre accueil", "Wie unser Meet-and-Greet funktioniert"),
        body: ls(
          "Send us your flight number on WhatsApp the day before. We track the flight. We're standing at arrivals with your name on a sign. Five minutes for paperwork and photos, the keys are yours, you drive away. No queue, no upsell, no cost for the service.",
          "Στείλτε αριθμό πτήσης στο WhatsApp. Σας περιμένουμε στις αφίξεις. Πέντε λεπτά και τα κλειδιά είναι δικά σας.",
          "Mandaci il volo su WhatsApp. Ti aspettiamo agli arrivi. Cinque minuti e via.",
          "Envoie ton vol sur WhatsApp. On t'attend aux arrivées. Cinq minutes et c'est bon.",
          "Sende uns die Flugnummer per WhatsApp. Wir warten am Ankunftsbereich. Fünf Minuten und fertig.",
        ),
      },
    ],
  },
  {
    slug: "parking-in-naxos",
    title: ls(
      "Parking in Naxos: where, when, and how to avoid the towing zone",
      "Παρκάρισμα στη Νάξο: πού και πώς",
      "Parcheggio a Naxos: dove e come",
      "Stationnement à Naxos : où et comment",
      "Parken auf Naxos: wo und wie",
    ),
    excerpt: ls(
      "Chora is car-free in the old town. Here's where you actually park.",
      "Η παλιά πόλη είναι πεζόδρομος. Δείτε πού παρκάρετε.",
      "Il centro storico è pedonale. Ecco dove si parcheggia.",
      "Le centre est piéton. Voici où se garer.",
      "Die Altstadt ist Fußgängerzone. Hier parken Sie.",
    ),
    hero: HERO("1611348586804-61bf6c080437"),
    publishedAt: "2026-03-10",
    updatedAt: "2026-04-22",
    readingTime: 4,
    related: ["driving-in-naxos", "do-you-need-a-car-in-naxos"],
    faqRefs: ["chora-parking"],
    sections: [
      {
        heading: ls("The port car park (free, fills fast)", "Παρκινγκ λιμανιού (δωρεάν)", "Parcheggio del porto (gratis)", "Parking du port (gratuit)", "Hafenparkplatz (kostenlos)"),
        body: ls(
          "Largest free lot in Chora. Open-air, no time limit. Full by 11:00 most July–August days. Get there early, walk into town in 5 minutes.",
          "Μεγαλύτερο δωρεάν παρκινγκ. Γεμίζει μέχρι 11:00 το καλοκαίρι.",
          "Il più grande gratis. Pieno entro le 11 in estate.",
          "Le plus grand gratuit. Plein vers 11h en été.",
          "Größter kostenloser. Bis 11 Uhr voll im Sommer.",
        ),
      },
      {
        heading: ls("Pay-and-display in the centre", "Παρκάρισμα με κάρτα στο κέντρο", "Sosta a pagamento in centro", "Stationnement payant au centre", "Bezahlparken im Zentrum"),
        body: ls(
          "Marked blue spots in central Chora cost €1/hour from a kiosk or app. Don't park on white-line spots reserved for residents — they're enforced.",
          "Μπλε σημάδια €1/ώρα. Λευκά μόνο για κατοίκους.",
          "Strisce blu €1/ora. Bianche solo residenti.",
          "Bandes bleues €1/h. Blanches résidents seulement.",
          "Blaue Streifen €1/Std. Weiße nur Anwohner.",
        ),
      },
    ],
  },
  {
    slug: "atv-vs-buggy-vs-car",
    title: ls(
      "ATV vs Buggy vs Car on Naxos: which to rent",
      "ATV ή buggy ή αυτοκίνητο στη Νάξο;",
      "ATV, buggy o auto a Naxos: cosa scegliere",
      "ATV, buggy ou voiture à Naxos : quoi choisir ?",
      "ATV, Buggy oder Auto auf Naxos: was mieten?",
    ),
    excerpt: ls(
      "A frank decision tree based on travellers, days, weather and the kinds of beaches you want to reach.",
      "Πρακτικός οδηγός επιλογής με βάση το πρόγραμμά σας.",
      "Guida pratica per la scelta in base al viaggio.",
      "Guide pratique pour choisir selon ton voyage.",
      "Praktischer Entscheidungsbaum nach Reise.",
    ),
    hero: HERO("1604147495798-57beb5d6af73"),
    publishedAt: "2026-03-15",
    updatedAt: "2026-04-22",
    readingTime: 6,
    related: ["best-beaches-by-car-naxos", "do-you-need-a-car-in-naxos", "naxos-road-trip-itinerary"],
    sections: [
      {
        heading: ls("Pick a car if…", "Επιλέξτε αυτοκίνητο αν…", "Scegli l'auto se…", "Choisis la voiture si…", "Wähle das Auto, wenn…"),
        body: ls(
          "You have luggage, kids, or you'll be driving in the rain. You want air-con on the Apeiranthos drive. You want one vehicle for the whole trip.",
          "Έχετε αποσκευές, παιδιά ή κακοκαιρία.",
          "Hai bagagli, bambini, o pioggia in vista.",
          "Tu as des bagages, des enfants, ou de la pluie.",
          "Sie haben Gepäck, Kinder oder Regen.",
        ),
      },
      {
        heading: ls("Pick a scooter if…", "Επιλέξτε μηχανάκι αν…", "Scegli lo scooter se…", "Choisis le scooter si…", "Wähle den Roller, wenn…"),
        body: ls(
          "Two adults, light luggage, sunny week. Cheaper, faster, more fun on the coastal roads.",
          "Δύο ενήλικες, λίγες αποσκευές, ήλιος.",
          "Due adulti, poco bagaglio, sole.",
          "Deux adultes, peu de bagages, du soleil.",
          "Zwei Erwachsene, leichtes Gepäck, Sonne.",
        ),
      },
      {
        heading: ls("Pick a buggy if…", "Επιλέξτε buggy αν…", "Scegli il buggy se…", "Choisis le buggy si…", "Wähle den Buggy, wenn…"),
        body: ls(
          "You're spending serious time at Alyko, Mikri Vigla or Pyrgaki. The buggy is the only legal way to drive those tracks for a non-4×4-licensed vehicle, and it's the most fun.",
          "Αν θα είστε σε Αλυκό, Μικρή Βίγλα, Πυργάκι.",
          "Per Alyko, Mikri Vigla, Pyrgaki.",
          "Pour Alyko, Mikri Vigla, Pyrgaki.",
          "Für Alyko, Mikri Vigla, Pyrgaki.",
        ),
      },
      {
        heading: ls("The hybrid plan most travellers love", "Το υβριδικό πρόγραμμα που αγαπάμε", "Il piano ibrido che piace", "Le plan hybride apprécié", "Der beliebte Hybrid-Plan"),
        body: ls(
          "A small car for the whole trip + one day of buggy or ATV. Costs about the same as a buggy alone for a week, gives you everything.",
          "Μικρό αυτοκίνητο όλη τη βδομάδα + μία μέρα buggy ή ATV.",
          "Auto piccola per la settimana + un giorno di buggy/ATV.",
          "Petite auto la semaine + un jour de buggy/ATV.",
          "Kleinwagen die Woche + ein Tag Buggy/ATV.",
        ),
      },
    ],
  },
];

export const GUIDES_BY_SLUG = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
