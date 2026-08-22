import type { Guide } from "@/types/content";

const ls = (en: string, el?: string, it?: string, fr?: string, de?: string) => ({
  en, el: el ?? en, it: it ?? en, fr: fr ?? en, de: de ?? en,
});

const ALL_GUIDES: Guide[] = [
  {
    slug: "do-you-need-a-car-in-naxos",
    title: ls(
      "Do you need a car in Naxos? An honest 2026 guide",
      "Χρειάζεσαι αυτοκίνητο στη Νάξο; Μια ειλικρινής απάντηση",
      "Serve l'auto a Naxos? Una risposta onesta",
      "Faut-il une voiture à Naxos ? Une réponse honnête",
      "Brauche ich auf Naxos ein Auto? Eine ehrliche Antwort",
    ),
    excerpt: ls(
      "Buses cover the obvious beaches. A rental car opens up everything else  -  and Naxos has a lot of everything else.",
      "Τα λεωφορεία καλύπτουν τα προφανή. Η ενοικίαση καλύπτει όλα τα υπόλοιπα.",
      "Gli autobus coprono l'ovvio. Il noleggio copre tutto il resto.",
      "Les bus couvrent l'essentiel. La location couvre tout le reste.",
      "Busse decken das Offensichtliche. Mietwagen den Rest.",
    ),
    hero: "/images/naxos/landscape.jpg",
    publishedAt: "2026-01-15",
    updatedAt: "2026-05-10",
    readingTime: 8,
    related: ["driving-in-naxos", "naxos-road-trip-itinerary", "naxos-airport-jnx-guide"],
    faqRefs: ["do-i-need-car-naxos", "automatic-availability", "best-time-to-rent"],
    sections: [
      {
        heading: ls("The short answer", "Σύντομη απάντηση", "Risposta breve", "Réponse courte", "Kurze Antwort"),
        body: ls(
          "If you're staying in Chora and you're genuinely happy spending your whole trip at Agios Georgios, Agios Prokopios and Agia Anna, you can survive without a vehicle. The old town is car-free, buses run hourly to the nearest beaches in summer, and taxis are easy to find at the port. The moment you ask a question like 'how do we get to Apeiranthos for lunch?' or 'can we drive down to Alyko for sunset?' the calculus flips completely. Without a vehicle the bus timetable runs your holiday; with one, Naxos opens up roughly five-fold  -  30 km of coastline, marble-paved mountain villages, a Venetian castle, cedar forests and the tallest peak in the Cyclades are all within 90 minutes of Chora on roads you can drive in a standard hire car.",
          "Αν μένετε στη Χώρα και αρκείστε στις κοντινές παραλίες, μπορείτε χωρίς αυτοκίνητο. Για εσωτερικά χωριά και απομακρυσμένες παραλίες, η ενοικίαση είναι απαραίτητη.",
          "Se resti a Chora e ti bastano le spiagge vicine, puoi fare a meno dell'auto. Per villaggi interni e spiagge lontane è essenziale.",
          "Si tu restes à Chora et que les plages proches te suffisent, pas besoin de voiture. Sinon, c'est essentiel.",
          "Wenn Sie in Chora bleiben und mit den nahen Stränden zufrieden sind, geht es ohne Auto. Für Bergdörfer und entlegene Strände ist es unverzichtbar.",
        ),
      },
      {
        heading: ls("What the bus network can and can't do", "Τι μπορούν και τι όχι τα λεωφορεία", "Cosa fanno e non fanno gli autobus", "Ce que font et ne font pas les bus", "Was Busse können und nicht"),
        body: ls(
          "KTEL Naxos runs reliable hourly buses from Chora's port to Agios Prokopios, Agia Anna and Plaka throughout July and August. There are 3–4 daily services to Apollonas, Apeiranthos and Filoti, with the last bus back from inland villages typically leaving at 4–5 pm. Buses do not reach Mikri Vigla, Alyko, Pyrgaki, Kastraki, Glyfada, or the dozens of small chapels and coves that make Naxos special. Off-season (May–June, September–October) services thin dramatically  -  some routes drop to twice daily. If any of those places are on your list, a rental is not a luxury; it's simply how you get there.",
          "Το ΚΤΕΛ Νάξου εκτελεί τακτικά δρομολόγια προς τις κύριες παραλίες, λιγότερα προς εσωτερικά χωριά. Δεν εξυπηρετεί απομακρυσμένες παραλίες όπως η Μικρή Βίγλα και το Αλυκό.",
          "KTEL Naxos copre le spiagge principali e i villaggi interni con frequenza ridotta. Mikri Vigla e Alyko non sono raggiunti.",
          "KTEL Naxos dessert les plages principales et l'intérieur en fréquence réduite. Mikri Vigla et Alyko non desservis.",
          "KTEL Naxos fährt zu den Hauptstränden und Bergdörfern in reduzierter Frequenz. Mikri Vigla und Alyko nicht.",
        ),
      },
      {
        heading: ls("Why a car is the safest all-round choice", "Γιατί το αυτοκίνητο είναι η πιο ασφαλής επιλογή", "Perché l'auto è la scelta più sicura", "Pourquoi la voiture est le choix le plus sûr", "Warum das Auto die sicherste Wahl ist"),
        body: ls(
          "Naxos is famously windy, mountain roads are long, and conditions can change quickly. A compact rental car gives couples and solo travellers air conditioning, luggage space, wet-weather grip and a much more comfortable trip to Apollonas or Apeiranthos. It is also the practical choice for arrivals after dark. We can advise over WhatsApp on the right car size for your exact itinerary before you book.",
          "Η Νάξος έχει δυνατό αέρα και μεγάλες ορεινές διαδρομές. Ένα μικρό αυτοκίνητο προσφέρει άνεση, χώρο αποσκευών και ασφάλεια σε κάθε καιρό.",
          "Naxos è ventosa e le strade di montagna sono lunghe. Un'auto compatta offre comfort, spazio e sicurezza con qualsiasi tempo.",
          "Naxos est venteuse et les routes de montagne sont longues. Une voiture compacte offre confort, espace et sécurité par tous les temps.",
          "Naxos ist windig und die Bergstrecken sind lang. Ein Kleinwagen bietet Komfort, Platz und Sicherheit bei jedem Wetter.",
        ),
      },
      {
        heading: ls("Where a standard rental car can go", "Πού μπορεί να πάει ένα απλό ενοικιαζόμενο αυτοκίνητο", "Dove può arrivare un'auto a noleggio", "Où peut aller une voiture de location", "Wohin ein normaler Mietwagen fahren kann"),
        body: ls(
          "A standard rental car reaches the signed parking areas for Alyko, Mikri Vigla and Pyrgaki on paved roads. Stop at the official parking areas and continue on foot: soft-sand tracks and unpaved coastal paths are excluded from normal rental agreements and can damage the vehicle. Ask us for the safest paved approach before setting off.",
          "Ένα απλό αυτοκίνητο φτάνει στα επίσημα πάρκινγκ Αλυκού, Μικρής Βίγλας και Πυργακίου. Αποφύγετε χωματόδρομους και άμμο.",
          "Un'auto normale raggiunge i parcheggi ufficiali di Alyko, Mikri Vigla e Pyrgaki. Evita sterrato e sabbia.",
          "Une voiture normale rejoint les parkings officiels d'Alyko, Mikri Vigla et Pyrgaki. Évitez les pistes et le sable.",
          "Ein normaler Mietwagen erreicht die offiziellen Parkplätze von Alyko, Mikri Vigla und Pyrgaki. Schotter und Sand meiden.",
        ),
      },
      {
        heading: ls("Our honest recommendation by trip type", "Η ειλικρινής σύστασή μας", "Il nostro consiglio onesto", "Notre recommandation honnête", "Unsere ehrliche Empfehlung"),
        body: ls(
          "Couple travelling light, 4–7 nights: a compact car for the whole stay. Family with kids and luggage: a 5-seat car such as a Suzuki Baleno, Seat Arona or Peugeot 208 from day one. Short stay (2–3 nights): rent for the middle 2 days and use taxis for arrivals and departures. Check our current fleet and prices, then WhatsApp us with your dates and we'll confirm availability.",
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
      "Driving in Naxos: roads, rules and the 2026 traffic code",
      "Οδήγηση στη Νάξο: δρόμοι, κανόνες και ο νέος ΚΟΚ 2026",
      "Guidare a Naxos: strade, regole e il nuovo Codice 2026",
      "Conduire à Naxos : routes, règles et nouveau Code 2026",
      "Auto fahren auf Naxos: Straßen, Regeln und neue StVO 2026",
    ),
    excerpt: ls(
      "Most travel blogs still quote pre-2026 speed limits. Here's what actually applies on Naxos roads today  -  and what catches tourists off guard.",
      "Τα περισσότερα blogs ακόμα γράφουν παλιά όρια. Εδώ είναι τι ισχύει το 2026.",
      "Molti blog citano ancora i limiti vecchi. Ecco cosa vale nel 2026.",
      "La plupart des blogs citent les anciennes limites. Voici 2026.",
      "Viele Blogs nennen noch alte Limits. Hier ist 2026.",
    ),
    hero: "/images/naxos/chora.jpg",
    publishedAt: "2026-02-04",
    updatedAt: "2026-05-10",
    readingTime: 9,
    related: ["new-greek-traffic-code-2026", "idp-greece-rules", "parking-in-naxos"],
    faqRefs: ["driving-difficulty", "speed-limits-2026", "alcohol-limit", "child-seats"],
    sections: [
      {
        heading: ls("New 2026 speed limits  -  what changed", "Νέα όρια ταχύτητας 2026", "Nuovi limiti 2026", "Nouvelles limites 2026", "Neue Tempolimits 2026"),
        body: ls(
          "Greece's new Road Traffic Code (voted 13 June 2025, in force 1 January 2026) dropped the urban speed limit from 50 km/h to 30 km/h across all islands, including Naxos  -  making Greece the second EU member state after Spain to adopt the 30 km/h urban standard. In practice this means every street in Chora, every village square, every approach to Chalki or Filoti is a 30 zone. Outside built-up areas the limits are: 90 km/h on rural roads, 110 km/h on expressways, 130 km/h on motorways (none on Naxos). The only stretches on Naxos where you'll reach 70+ km/h are the main coastal road from Agios Prokopios south toward Pyrgaki, and the long straight north to Apollonas after the first set of bends above Engares.",
          "Από 1/1/2026: 30 εντός πόλης, 90 αγροτικά, 110 ταχείας, 130 αυτοκινητοδρόμου.",
          "Dall'1/1/2026: 30 città, 90 extraurbane, 110 superstrade, 130 autostrade.",
          "Au 1/1/2026 : 30 ville, 90 hors agglo, 110 voie rapide, 130 autoroute.",
          "Ab 1.1.2026: 30 in Städten, 90 Landstraße, 110 Schnellstraße, 130 Autobahn.",
        ),
      },
      {
        heading: ls("Roads on Naxos  -  a practical map", "Οι δρόμοι της Νάξου  -  πρακτικός χάρτης", "Strade di Naxos  -  la mappa pratica", "Routes à Naxos  -  la carte pratique", "Naxos Straßen  -  die praktische Karte"),
        body: ls(
          "The west-coast road (Chora → Agios Prokopios → Agia Anna → Plaka → Mikri Vigla → Pyrgaki) is fully paved, well-signed and fast  -  fine in any small car. The Tragea mountain road (Galanado → Chalki → Filoti → Apeiranthos) is also paved but narrow, with switchbacks averaging 25–30 km/h; allow 45 minutes one-way. The climb to Apollonas via Koronos is paved, single-lane in places, and takes the better part of an hour each way  -  beautiful, but not for the first day on the island. The tracks around Alyko, south of Mikri Vigla and approaching the small coastal chapels are unpaved soft-sand routes. These are off-limits for non-4×4 vehicles under our rental contract, and for good reason  -  we pull out guests on these tracks every summer.",
          "Ο δυτικός δρόμος είναι ασφαλτοστρωμένος. Το βουνό Φιλώτι–Απείρανθος έχει στροφές. Ο Απόλλωνας μέσω Κορώνου είναι μια ώρα.",
          "La strada costiera ovest è asfaltata. Filoti–Apeiranthos ha tornanti. Apollonas via Koronos un'ora.",
          "La côte ouest est asphaltée. Filoti–Apeiranthos en lacets. Apollonas via Koronos en une heure.",
          "Westküste asphaltiert. Filoti–Apeiranthos Serpentinen. Apollonas via Koronos eine Stunde.",
        ),
      },
      {
        heading: ls("Alcohol limits and seatbelts", "Αλκοόλ και ζώνες", "Alcol e cinture", "Alcool et ceintures", "Alkohol und Gurte"),
        body: ls(
          "Greece sets the blood alcohol limit at 0.05% for most drivers  -  lower than the UK and the same as most of mainland Europe. Drivers with fewer than two years of experience and all motorcyclists face a stricter limit of 0.02%. Police checkpoints are common on Naxos on summer evenings, particularly on the road between Chora and Agios Prokopios. Seatbelts are mandatory for every occupant, front and rear. Children under 12 years old, or shorter than 1.35 m, may not sit in the front seat regardless of whether a booster seat is fitted.",
          "0.05% αλκοόλ, 0.02% για νέους και μοτοσικλετιστές. Ζώνες υποχρεωτικές. Παιδιά κάτω 12 ετών όχι στη θέση συνοδηγού.",
          "0,05% alcol, 0,02% neopatentati e motociclisti.",
          "0,05% alcool, 0,02% jeunes conducteurs et motards.",
          "0,05% Alkohol, 0,02% Fahranfänger und Motorradfahrer.",
        ),
      },
      {
        heading: ls("Night driving  -  the local warning", "Νυχτερινή οδήγηση  -  η ντόπια προειδοποίηση", "Guida notturna  -  l'avviso locale", "Conduite de nuit  -  l'alerte locale", "Nachtfahren  -  der lokale Hinweis"),
        body: ls(
          "Rural roads on Naxos have no street lighting at all. Goats, cats, scooters without working lights, and unmarked T-junctions are common hazards after dark. The risk is highest on the Chalki–Filoti–Apeiranthos road and on any route north of Engares. Our firm recommendation: do not attempt inland driving on your first night on the island. If you must drive after dark, double the following distance you'd normally keep and keep your high beams on between villages.",
          "Οι αγροτικοί δρόμοι δεν έχουν φωτισμό. Αποφύγετε νυχτερινή οδήγηση την πρώτη μέρα.",
          "Strade rurali senza illuminazione. Evita di guidare la prima notte.",
          "Routes rurales non éclairées. Évite la conduite la première nuit.",
          "Landstraßen ohne Beleuchtung. Erste Nacht meiden.",
        ),
      },
      {
        heading: ls("The five mistakes tourists make every summer", "Συνήθη λάθη των τουριστών", "Errori frequenti dei turisti", "Erreurs courantes des touristes", "Häufige Touristenfehler"),
        body: ls(
          "1. Driving into Chora's pedestrian zone  -  the old town is fully car-free and actively enforced; fines are issued daily in peak season. 2. Taking a standard car onto the Alyko soft-sand track  -  high centre of gravity and rear-wheel spin get guests stuck every week. 3. Parking on the harbour quayside  -  vehicles are towed regularly, typically within 20 minutes. 4. Assuming Google Maps knows about road closures  -  the app routes you through villages where the road is actually blocked by a festival or market. 5. Underestimating the wind  -  a 50cc scooter at 90 km/h into a full August meltemi is not safe. Our team is available by WhatsApp or phone every day to answer any route questions before you set off.",
          "Είσοδος σε πεζόδρομους, off-road με μη 4×4, παρκάρισμα σε πεζοδρόμια  -  αποφύγετε.",
          "Zone pedonali, off-road senza 4×4, sosta sui marciapiedi  -  da evitare.",
          "Zones piétonnes, hors-piste sans 4×4, stationnement sur trottoirs  -  à éviter.",
          "Fußgängerzonen, Off-Road ohne 4×4, Gehsteig parken  -  vermeiden.",
        ),
      },
    ],
  },
  {
    slug: "naxos-road-trip-itinerary",
    title: ls(
      "The ultimate 5-day Naxos road trip itinerary (2026)",
      "Πρόγραμμα 5 ημερών οδικά στη Νάξο",
      "Itinerario di 5 giorni in auto a Naxos",
      "Itinéraire road trip Naxos en 5 jours",
      "Naxos Roadtrip in 5 Tagen",
    ),
    excerpt: ls(
      "Five days that make a Naxos rental pay for itself many times over: beach days, marble mountain villages, a Kouros statue, cedar forests, and the best sunset on the Aegean.",
      "Παραλίες, ορεινά χωριά, διαδρομές ηλιοβασιλέματος.",
      "Spiagge, villaggi montani, tramonti.",
      "Plages, villages, couchers de soleil.",
      "Strände, Bergdörfer, Sonnenuntergänge.",
    ),
    hero: "/images/naxos/gallery/naxos-aerial.jpg",
    publishedAt: "2026-02-12",
    updatedAt: "2026-05-10",
    readingTime: 11,
    related: ["naxos-mountain-villages-by-car", "best-beaches-by-car-naxos", "do-you-need-a-car-in-naxos"],
    sections: [
      {
        heading: ls("Day 1  -  Chora, the Portara and the west-coast beaches", "Ημέρα 1  -  Χώρα, λιμάνι, δυτική ακτή", "Giorno 1  -  Chora, porto, costa ovest", "Jour 1  -  Chora, port, côte ouest", "Tag 1  -  Chora, Hafen, Westküste"),
        body: ls(
          "Pick up the car at the port  -  we'll be waiting with your name on a sign, paperwork takes five minutes. Drive 5 km south on the main road to Agios Prokopios: wide white sand, organised beach bars, shallow entry ideal for kids. Lunch at one of the beachfront tavernas (Kavouri is a local favourite). Continue 3 km further south to Plaka  -  longer, less developed, peaceful naturist section at the south end. Return to Chora by late afternoon, park at the port car park (free, 5-minute walk to the old town) and watch the sun drop behind the Portara  -  the unfinished temple of Apollo, 2,500 years old, facing due west. It is the best free sunset on the Aegean.",
          "Παραλαβή στο λιμάνι, Άγιος Προκόπιος, Πλάκα, ηλιοβασίλεμα στην Πορτάρα.",
          "Ritiro al porto, Agios Prokopios, Plaka, tramonto alla Portara.",
          "Retrait au port, Agios Prokopios, Plaka, coucher de soleil à Portara.",
          "Abholung am Hafen, Agios Prokopios, Plaka, Sonnenuntergang Portara.",
        ),
      },
      {
        heading: ls("Day 2  -  The Tragea loop: Chalki, Filoti, Apeiranthos", "Ημέρα 2  -  Η Τραγαία (Χαλκί–Φιλώτι–Απείρανθος)", "Giorno 2  -  Il giro di Tragea", "Jour 2  -  La boucle de Tragea", "Tag 2  -  Die Tragea-Schleife"),
        body: ls(
          "The marquee Naxos drive  -  allow the full day. Leave Chora by 9:30 am and drive 16 km to Chalki through the Tragea olive plain, the largest in the Cyclades. Stop at Vallindras Distillery for a free kitron tasting  -  the Naxos citrus liqueur has been made here since 1896. Continue 9 km to Filoti, the largest mountain village: lunch under the plane trees in the main square (try the souvlaki at Babis, prices honest and portions huge). After lunch, 5 km further to Apeiranthos at 600 m altitude  -  marble-paved streets, Venetian towers, five small museums, and balcony tavernas with sweeping views over the eastern coast. Allow at least 2 hours here. Return via the same road or loop through Moni for a slightly different descent.",
          "Η εμβληματική διαδρομή  -  Χαλκί, Φιλώτι, Απείρανθος. 7+ ώρες με στάσεις.",
          "Il giro iconico  -  Chalki, Filoti, Apeiranthos. 7+ ore con soste.",
          "La boucle iconique  -  Chalki, Filoti, Apeiranthos. 7+ h avec arrêts.",
          "Die ikonische Tour  -  Chalki, Filoti, Apeiranthos. 7+ Std mit Stopps.",
        ),
      },
      {
        heading: ls("Day 4  -  Apollonas and the Kouros of the north", "Ημέρα 4  -  Απόλλωνας και Κούρος", "Giorno 4  -  Apollonas e il Kouros", "Jour 4  -  Apollonas et le Kouros", "Tag 4  -  Apollonas und der Kouros"),
        body: ls(
          "The most ambitious drive on the island  -  roughly an hour from Chora via Engares and Koronos, through villages so small the road narrows to the width of the car. The payoff: the Kouros of Apollonas, a 10.5-metre unfinished marble giant carved in the 7th century BC, lying in an ancient quarry above the village. It takes 10 minutes to visit and is one of the most quietly magnificent things in the Cyclades. Afterwards, seafood lunch at the small harbour of Apollonas  -  grilled octopus and fried squid, tables at the waterline. Return via Lionas if you want a quick, private swim on the east coast before heading back.",
          "Διαδρομή μιας ώρας. Κούρος, μεσημεριανό, επιστροφή μέσω Λιώνα.",
          "Un'ora di guida. Kouros, pranzo, ritorno via Lionas.",
          "Une heure de route. Kouros, déjeuner, retour par Lionas.",
          "Eine Stunde Fahrt. Kouros, Mittagessen, Rückweg via Lionas.",
        ),
      },
      {
        heading: ls("Day 5  -  slow morning, return the car", "Ημέρα 5  -  αργό πρωινό, επιστροφή", "Giorno 5  -  mattina lenta, restituzione", "Jour 5  -  matin tranquille, retour", "Tag 5  -  gemächlicher Morgen, Rückgabe"),
        body: ls(
          "One last swim at Agia Anna or Agios Prokopios. If you're catching an afternoon ferry, drop the car at the port  -  we'll take it from you dockside in under five minutes, so you can go straight to the departure hall. Flying out of JNX? Same service at the airport, no extra charge. We track your boat or flight and schedule the handover around your departure, not around our office hours. Send us your ferry or flight number on WhatsApp the evening before.",
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
      "Naxos mountain villages by car: Chalki, Filoti, Apeiranthos guide",
      "Τα ορεινά χωριά της Νάξου με αυτοκίνητο",
      "I villaggi montani di Naxos in auto",
      "Les villages de montagne de Naxos en voiture",
      "Naxos Bergdörfer mit dem Auto",
    ),
    excerpt: ls(
      "The Tragea loop is the most photogenic drive in the Cyclades  -  marble streets, kitron distilleries, Venetian towers and souvlaki under 800-year-old plane trees.",
      "Η πιο φωτογενής διαδρομή της Νάξου σε μια μέρα.",
      "Il giro più fotogenico di Naxos in un giorno.",
      "La boucle la plus photogénique en une journée.",
      "Die fotogenste Schleife in einem Tag.",
    ),
    hero: "/images/naxos/apiranthos.jpg",
    publishedAt: "2026-02-20",
    updatedAt: "2026-05-10",
    readingTime: 7,
    related: ["naxos-road-trip-itinerary", "driving-in-naxos", "best-beaches-by-car-naxos"],
    sections: [
      {
        heading: ls("Chalki  -  kitron and neoclassical streets", "Χαλκί  -  η πρωτεύουσα της Τραγαίας", "Chalki  -  la capitale di Tragea", "Chalki  -  la capitale de Tragea", "Chalki  -  die Tragea-Hauptstadt"),
        body: ls(
          "16 km from Chora on a smooth, well-signed paved road through the Tragea olive plain. Park in the small square and walk the neoclassical streets  -  Chalki served as the Byzantine capital of Naxos and its elegant houses reflect that history. The unmissable stop is Vallindras Distillery, a family-run operation since 1896 producing Naxos kitron: a liqueur distilled from the leaves of the citron fruit, which grows only on Naxos. The tasting (free) includes three grades of kitron  -  dry, medium and sweet  -  plus the opportunity to buy directly from the producer at cellar-door prices. The distillery has original copper stills and old photographs on the walls; the tour takes about 20 minutes.",
          "16 χλμ από τη Χώρα. Παρκάρετε στην πλατεία, δοκιμάστε κίτρο στο Βαλληνδρά.",
          "16 km da Chora. Parcheggio in piazza, degustazione di kitron a Vallindras.",
          "16 km de Chora. Parking sur la place, dégustation de kitron à Vallindras.",
          "16 km von Chora. Parkplatz am Platz, Kitron-Verkostung bei Vallindras.",
        ),
      },
      {
        heading: ls("Filoti  -  the village at the foot of Mount Zas", "Φιλώτι  -  σουβλάκι κάτω από πλάτανους", "Filoti  -  souvlaki sotto i platani", "Filoti  -  souvlaki sous les platanes", "Filoti  -  Souvlaki unter Platanen"),
        body: ls(
          "9 km east of Chalki, Filoti is the largest village in the Naxos interior  -  a lived-in working town, not a tourist village, which is exactly what makes it excellent. The main square is shaded by enormous plane trees beside the church of Panagia Filotitissa; lunch here costs half of what you'll pay in Chora. Filoti is also the trailhead for Mount Zas (1,004 m), the highest peak in the Cyclades and the legendary birthplace of Zeus. The summit hike takes 3–4 hours return and requires solid footwear  -  leave the sandals in the car. If you skip the hike, even a 20-minute walk up the signed path toward the Cave of Zeus gives you a remarkable view back over the Tragea valley.",
          "Το Φιλώτι είναι η αφετηρία για τον Ζα. Πλατεία και εκκλησία αξίζουν.",
          "Filoti è la base per il Monte Zas. Piazza e chiesa meritano.",
          "Filoti est le départ pour le mont Zas. Place et église valent l'arrêt.",
          "Filoti ist der Ausgangspunkt für Zas. Platz und Kirche lohnen sich.",
        ),
      },
      {
        heading: ls("Apeiranthos  -  marble streets at 600 metres", "Απείρανθος  -  μαρμάρινα στενά στα 600 μ.", "Apeiranthos  -  vie di marmo a 600 m", "Apeiranthos  -  rues en marbre à 600 m", "Apeiranthos  -  Marmorgassen auf 600 m"),
        body: ls(
          "Visually the most stunning village on Naxos and arguably in the entire Cyclades. The streets  -  every single one  -  are paved in marble quarried from the surrounding mountains. Whitewashed houses with blue shutters line lanes so narrow you brush the walls as you walk. Venetian towers recall the island's Frankish history; five small museums (geological, archaeological, natural history and two more) punish any temptation to rush. The balcony taverna at the top of the village serves the best view on the island with your coffee: the entire eastern coast of Naxos stretching south toward Koufonisia. Budget at least two hours here  -  most guests wish they'd allowed more.",
          "Το πιο όμορφο χωριό της Νάξου. Λευκά σπίτια, μάρμαρο, βενετσιάνικοι πύργοι.",
          "Il villaggio più bello. Case bianche, marmo, torri veneziane.",
          "Le plus beau village. Maisons blanches, marbre, tours vénitiennes.",
          "Das schönste Dorf. Weiße Häuser, Marmor, venezianische Türme.",
        ),
      },
      {
        heading: ls("Practical tips for the Tragea loop", "Πρακτικές συμβουλές", "Consigli pratici", "Conseils pratiques", "Praktische Tipps"),
        body: ls(
          "Any small car handles the Tragea loop  -  the road is paved throughout, though narrow in places between Chalki and Filoti. Leave Chora no later than 10 am to get the distillery open and village squares uncrowded. Parking at all three villages is free and informal  -  pull up at the edge of the square. Fuel up in Chora before you go; there's one petrol station in Filoti. The full loop (Chora → Chalki → Filoti → Apeiranthos → Chora) is about 60 km and takes the full day with a proper lunch stop. Book your rental car online and WhatsApp us the morning of  -  we'll have the tank full and the AC pre-cooled.",
          "Κάθε μικρό αυτοκίνητο τα καταφέρνει. Ξεκινήστε από τη Χώρα πριν τις 10.",
          "Ogni piccola auto va bene. Partire da Chora prima delle 10.",
          "N'importe quelle petite voiture convient. Partir de Chora avant 10h.",
          "Jedes Kleinauto reicht. Vor 10 Uhr von Chora losfahren.",
        ),
      },
    ],
  },
  {
    slug: "best-beaches-by-car-naxos",
    title: ls(
      "Naxos beaches by car: the complete beach-hopper's guide 2026",
      "Παραλίες Νάξου με αυτοκίνητο: οδηγός",
      "Spiagge di Naxos in auto: guida",
      "Plages de Naxos en voiture : guide",
      "Naxos Strände mit dem Auto: Guide",
    ),
    excerpt: ls(
      "From the family-friendly classics at Prokopios to the wild south at Alyko  -  driving Naxos's 30 km of west coast puts every beach within reach.",
      "Από οικογενειακές μέχρι άγριες παραλίες  -  με αυτοκίνητο όλη η δυτική ακτή είναι δική σας.",
      "Dalle classiche per famiglie alla costa sud selvaggia.",
      "Des classiques familiales à la côte sud sauvage.",
      "Von Familien-Klassikern bis zur wilden Südküste.",
    ),
    hero: "/images/naxos/plaka-beach.jpg",
    publishedAt: "2026-02-25",
    updatedAt: "2026-05-10",
    readingTime: 8,
    related: ["naxos-road-trip-itinerary", "driving-in-naxos", "do-you-need-a-car-in-naxos"],
    sections: [
      {
        heading: ls("Agios Prokopios  -  the best organised beach", "Άγιος Προκόπιος", "Agios Prokopios", "Agios Prokopios", "Agios Prokopios"),
        body: ls(
          "5 km south of Chora on the main coast road  -  a 10-minute drive, never more. Fine white sand, calm translucent water, and a full line of sunbed operators and beachfront tavernas. Buses reach Agios Prokopios frequently in summer so the beach gets busy by 11 am; drive here, park (free and plentiful at the south end), and claim your spot early. The water is shallow for 50 metres  -  ideal for children and weak swimmers. Voted consistently among the top ten beaches in Greece by TripAdvisor users; the accolade is deserved.",
          "5 χλμ νότια. Λευκή άμμος, ξαπλώστρες, οικογενειακή.",
          "5 km a sud. Sabbia bianca, lettini, in famiglia.",
          "5 km au sud. Sable blanc, transats, en famille.",
          "5 km südlich. Weißer Sand, Liegen, familientauglich.",
        ),
      },
      {
        heading: ls("Agia Anna  -  compact, charming, with tavernas", "Αγία Άννα", "Agia Anna", "Agia Anna", "Agia Anna"),
        body: ls(
          "7 km south and practically a continuation of Prokopios, separated by a small headland and the village of Agia Anna itself. Narrower strip of beach, denser concentration of fish tavernas and small hotels directly on the sand, and a tiny fishing harbour at the north end that you can walk to. The village road has several parking spots; arrive before 10 am in August or expect a walk. Good base if you're renting accommodation in the area  -  everything is within a five-minute stroll.",
          "7 χλμ νότια. Μικρό λιμανάκι, παραλιακές ταβέρνες.",
          "7 km a sud. Porticciolo, taverne sul mare.",
          "7 km au sud. Petit port, tavernes sur la plage.",
          "7 km südlich. Kleiner Hafen, Strandtavernas.",
        ),
      },
      {
        heading: ls("Plaka  -  long, uncrowded, beautiful", "Πλάκα", "Plaka", "Plaka", "Plaka"),
        body: ls(
          "8 km south of Chora, Plaka is simply a longer, quieter, less-developed version of Prokopios  -  and better for it. The beach stretches for almost 4 km without interruption: broad enough to absorb a full August crowd and still feel uncrowded in the middle. The southern half is naturist-friendly by local convention. Bus frequency varies by season, so check the current timetable before travelling; a car is the practical option for a flexible visit. Parking is available along the access road. Several low-key beach bars and a campsite sit at the north end. If you have children and want to split the day between swimming and exploring, Plaka and Prokopios are an easy back-to-back.",
          "8 χλμ νότια. Λιγότερο αναπτυγμένη.",
          "8 km a sud. Meno sviluppata.",
          "8 km au sud. Moins développée.",
          "8 km südlich. Weniger erschlossen.",
        ),
      },
      {
        heading: ls("Mikri Vigla  -  windsurf and kitesurf capital", "Μικρή Βίγλα", "Mikri Vigla", "Mikri Vigla", "Mikri Vigla"),
        body: ls(
          "17 km south of Chora, Mikri Vigla is two beaches in one: the north face of the headland is a calm, crystal-clear cove for swimming; the south face catches the Aegean meltemi and is a well-known kitesurfing location. The access road is paved to the signed car park; standard rental cars should stop there and visitors should continue on foot rather than use the track farther south. Check local wind and access conditions before setting out.",
          "17 χλμ. νότια της Χώρας. Ο ασφαλτοστρωμένος δρόμος φτάνει έως το σημείο στάθμευσης· συνεχίστε με τα πόδια προς την παραλία.",
          "17 km a sud di Chora. La strada asfaltata arriva al parcheggio; prosegui a piedi verso la spiaggia.",
          "À 17 km au sud de Chora. La route goudronnée mène au parking ; continuez à pied vers la plage.",
          "17 km südlich von Chora. Die asphaltierte Straße führt zum Parkplatz; von dort geht es zu Fuß weiter.",
        ),
      },
      {
        heading: ls("Alyko and Pyrgaki  -  the wild south", "Αλυκό & Πυργάκι", "Alyko e Pyrgaki", "Alyko et Pyrgaki", "Alyko & Pyrgaki"),
        body: ls(
          "23 km south of Chora, Alyko is Naxos at its most raw. A protected cedar forest (the cedars are actually junipers, but Naxians call them cedar) runs down to three wild beaches with no facilities, no sunbeds, and sometimes no other visitors at all. The famous painted abandoned hotel sits in the middle of the forest  -  a grid of derelict rooms covered floor to ceiling in street art, one of the most photographed locations on the island. The access tracks here are unpaved soft sand and are excluded from standard rental agreements, including for 4x4 cars. Park at the signed area and continue on foot. Pyrgaki, 3 km further, is a smaller wild beach facing due west  -  the ideal last stop for a south-coast sunset.",
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
      "International Driving Permit in Greece: 2026 rules (most tourists don't need one)",
      "International Driving Permit στην Ελλάδα: κανόνες 2026",
      "Patente internazionale in Grecia: regole 2026",
      "Permis international en Grèce : règles 2026",
      "Internationaler Führerschein in Griechenland 2026",
    ),
    excerpt: ls(
      "Most travel sites still tell you to get an IDP for Greece. Greek Law 4850/2021 removed that requirement for most nationalities. Here's exactly who needs one and who doesn't.",
      "Τα περισσότερα blogs ζητούν IDP. Ο Νόμος 4850/2021 λέει διαφορετικά.",
      "I siti dicono ancora di servire l'IDP. La legge 4850/2021 dice il contrario.",
      "Les blogs disent IDP obligatoire. La loi 4850/2021 dit non.",
      "Blogs sagen IDP nötig. Gesetz 4850/2021 sagt nein.",
    ),
    hero: "/images/naxos/portara-detail.jpg",
    publishedAt: "2026-03-01",
    updatedAt: "2026-05-10",
    readingTime: 5,
    related: ["new-greek-traffic-code-2026", "driving-in-naxos"],
    faqRefs: ["idp-greece", "documents-needed"],
    sections: [
      {
        heading: ls("The 2021 law that ended the IDP requirement for most tourists", "Ο νόμος του 2021 που τα άλλαξε όλα", "La legge del 2021 che ha cambiato tutto", "La loi 2021 qui a tout changé", "Das Gesetz 2021 das alles änderte"),
        body: ls(
          "Greek Law 4850/2021 (Government Gazette 208/Α, published 5 November 2021), Article 25.3.η, removed the IDP requirement for driving licence holders from the following jurisdictions for tourist stays under six months: all EU and EEA countries, the United Kingdom, the United States, Canada, Australia, Gibraltar, Switzerland, Iceland, Liechtenstein and Norway. If your licence was issued by any of these countries, your home licence is the only document you need to rent and drive legally in Greece  -  no IDP required. This applies at the rental counter, during police checks and in the event of an accident. Despite this, many booking platforms (and car hire staff at larger airports) still ask for an IDP as a matter of corporate habit rather than Greek law. At Fast Motor Rental Naxos we follow the law as written. Your EU, UK, US, Canadian or Australian licence is sufficient.",
          "Ο Νόμος 4850/2021 κατάργησε την υποχρέωση IDP για ΕΕ/ΗΠΑ/Καναδά/ΗΒ/Αυστραλίας/Γιβραλτάρ για τουριστική διαμονή κάτω των 6 μηνών.",
          "La legge 4850/2021 ha eliminato l'IDP per UE/USA/Canada/UK/Australia/Gibilterra fino a 6 mesi.",
          "La loi 4850/2021 a supprimé l'IDP pour UE/USA/Canada/UK/Australie/Gibraltar jusqu'à 6 mois.",
          "Gesetz 4850/2021 schaffte die IDP-Pflicht für EU/USA/Kanada/UK/Australien/Gibraltar bis 6 Monate ab.",
        ),
      },
      {
        heading: ls("When you do still need an IDP", "Πότε χρειάζεστε ακόμη IDP", "Quando serve ancora l'IDP", "Quand l'IDP reste obligatoire", "Wann der IDP noch nötig ist"),
        body: ls(
          "If your driving licence was issued by a country not on the list above  -  China, India, Brazil, Russia, most Asian and Latin American countries  -  you are still legally required to carry a 1949 or 1968 International Driving Permit alongside your national licence. Additionally: if your licence is printed in a non-Latin script (Cyrillic, Arabic, Chinese, Korean, etc.), even if the issuing country is technically exempt, we strongly recommend carrying an IDP  -  it makes the rental paperwork faster, police interaction smoother and accident procedures cleaner. An IDP from an AA, AAA or equivalent motoring association costs around €20–25 and takes 15 minutes to obtain at the office with your passport and licence photos. Get it before you fly.",
          "Από χώρες εκτός ΕΕ/ΗΠΑ/κλπ ή με μη λατινικό αλφάβητο: ναι.",
          "Da paesi fuori UE/USA/etc o alfabeto non latino: sì.",
          "Pays hors UE/USA/etc ou alphabet non latin : oui.",
          "Aus Ländern außer EU/USA/etc oder nichtlateinischer Schrift: ja.",
        ),
      },
      {
        heading: ls("What documents you actually need to rent with us", "Τι έγγραφα χρειάζεστε για ενοικίαση", "Documenti necessari per il noleggio", "Documents requis pour la location", "Welche Dokumente für die Miete"),
        body: ls(
          "For EU, UK, US, Canadian, Australian and most Western licence holders: your national driving licence and your passport or national ID. No IDP, international licence translation or notarised copy is normally required. For licences outside those jurisdictions, bring the IDP in addition. Still not sure? WhatsApp us a photo of your licence before you book and we'll confirm.",
          "Εθνική άδεια και ταυτότητα ή διαβατήριο. Για εξωτερικές άδειες: επιπλέον IDP.",
          "Patente nazionale e passaporto/carta d'identità. Licenze estere: aggiungi IDP.",
          "Permis national et passeport/ID. Permis hors liste : ajoutez IDP.",
          "Nationaler Führerschein und Reisepass/Ausweis. Nicht-EU: IDP dazu.",
        ),
      },
    ],
  },
  {
    slug: "new-greek-traffic-code-2026",
    title: ls(
      "New Greek Traffic Code 2026: every change explained for tourists",
      "Νέος ΚΟΚ 2026: όλες οι αλλαγές",
      "Nuovo Codice della Strada greco 2026",
      "Nouveau Code de la route grec 2026",
      "Neue griechische StVO 2026",
    ),
    excerpt: ls(
      "Voted June 2025, in force January 2026. Lower urban speed limits, doubled fines, new e-scooter rules  -  and what it all means if you're renting on Naxos.",
      "Ψηφίστηκε Ιούνιο 2025, ισχύει Ιανουάριο 2026.",
      "Votato giugno 2025, in vigore gennaio 2026.",
      "Voté juin 2025, en vigueur janvier 2026.",
      "Beschlossen Juni 2025, gültig Januar 2026.",
    ),
    hero: "/images/naxos/gallery/naxos-chora.jpg",
    publishedAt: "2026-01-08",
    updatedAt: "2026-05-10",
    readingTime: 7,
    related: ["driving-in-naxos", "idp-greece-rules"],
    faqRefs: ["speed-limits-2026", "alcohol-limit"],
    sections: [
      {
        heading: ls("The 30 km/h urban limit  -  what it means in practice", "Όριο 30 km/h εντός πόλης", "Limite urbano 30 km/h", "Limite urbain 30 km/h", "Innerorts 30 km/h"),
        body: ls(
          "Greece became the second EU member state after Spain to drop the urban speed limit to 30 km/h, effective 1 January 2026. The rule applies inside every built-up area with a village or town sign  -  which on Naxos means Chora, Chalki, Filoti, Apeiranthos, Apollonas, Koronos, Engares, Vivlos and all other settlements. Roads between villages remain at 90 km/h unless signed otherwise. There are no 30 km/h zones on major Naxos roads where no settlement exists. Speed cameras are not yet widespread on the island, but police patrols enforce the limit actively in Chora, particularly in the harbour area where cruise-ship visitors often drive quickly thinking it's an open road.",
          "Η Ελλάδα είναι η 2η χώρα ΕΕ μετά την Ισπανία με 30 km/h εντός πόλης.",
          "La Grecia è il 2° paese UE dopo la Spagna con 30 km/h.",
          "La Grèce est le 2e pays UE après l'Espagne à 30 km/h en ville.",
          "Griechenland ist nach Spanien das 2. EU-Land mit 30 km/h innerorts.",
        ),
      },
      {
        heading: ls("Other speed limits and penalties", "Άλλα όρια και κυρώσεις", "Altri limiti e sanzioni", "Autres limites et sanctions", "Andere Limits und Strafen"),
        body: ls(
          "Outside built-up areas: 90 km/h. Expressways: 110 km/h. Motorways: 130 km/h (there are none on Naxos). Penalties for speeding have been doubled across most bands  -  exceeding the limit by 20–30 km/h now costs €350. Using a mobile phone while driving costs €450 (up from €150). Helmet enforcement for riders is also active, with fines and possible suspension for non-compliance.",
          "Εκτός πόλης 90, ταχείας 110, αυτοκινητοδρόμου 130. Πρόστιμα διπλά. Κινητό 3πλάσιο. Χωρίς κράνος €350 + 30 ημέρες αφαίρεση.",
          "Fuori città 90, superstrade 110, autostrade 130. Sanzioni raddoppiate.",
          "Hors agglo 90, voies rapides 110, autoroutes 130. Amendes doublées.",
          "Außerorts 90, Schnellstr. 110, Autobahn 130. Strafen verdoppelt.",
        ),
      },
      {
        heading: ls("New rules for e-scooters and micro-mobility", "Νέοι κανόνες για e-scooters", "Nuove regole per i monopattini", "Nouvelles règles pour les trottinettes", "Neue Regeln für E-Scooter"),
        body: ls(
          "Electric scooters and micro-mobility devices are now regulated under the new code: maximum 25 km/h on shared paths, prohibited on pavements, mandatory reflective vest at night, minimum age 15. Helmets are strongly recommended. Chora's old marble-paved lanes are pedestrian areas and are not suitable for e-scooters.",
          "Ηλεκτρικά πατίνια: μέγιστο 25 km/h, απαγορεύονται σε πεζοδρόμια, ελάχιστη ηλικία 15 ετών.",
          "Monopattini elettrici: max 25 km/h, vietati sui marciapiedi, età minima 15 anni.",
          "Trottinettes: max 25 km/h, interdites sur les trottoirs, âge minimum 15 ans.",
          "E-Scooter: max 25 km/h, Bürgersteige verboten, Mindestalter 15 Jahre.",
        ),
      },
    ],
  },
  {
    slug: "naxos-airport-jnx-guide",
    title: ls(
      "Naxos Airport (JNX) guide: car rental, transfers and what to expect",
      "Αεροδρόμιο Νάξου (JNX): όλα όσα πρέπει να ξέρετε",
      "Aeroporto di Naxos (JNX): guida completa",
      "Aéroport de Naxos (JNX) : guide complet",
      "Flughafen Naxos (JNX): kompletter Guide",
    ),
    excerpt: ls(
      "JNX is a small regional airport under 4 km from Chora's port. No permanent rental desks  -  here's exactly how meet-and-greet car rental works and what to do on arrival.",
      "Μικρό περιφερειακό αεροδρόμιο, λιγότερο από 4 χλμ από τη Χώρα. Μόνο meet-and-greet.",
      "Piccolo scalo regionale a meno di 4 km da Chora. Solo meet-and-greet.",
      "Petit aéroport régional à moins de 4 km de Chora. Meet-and-greet uniquement.",
      "Kleiner Regionalflughafen unter 4 km von Chora. Nur Meet-and-Greet.",
    ),
    hero: "/images/naxos/gallery/naxos-aerial.jpg",
    publishedAt: "2026-03-05",
    updatedAt: "2026-05-10",
    readingTime: 6,
    related: ["do-you-need-a-car-in-naxos", "driving-in-naxos"],
    faqRefs: ["airport-vs-port-pickup", "delivery-zones"],
    sections: [
      {
        heading: ls("JNX basics  -  one runway, one terminal", "Τα βασικά", "Le basi", "Les bases", "Die Basics"),
        body: ls(
          "IATA code: JNX. ICAO: LGNX. One runway (2,365 m), one terminal building with a single arrivals hall, no jet bridges, no airbridges, no escalators  -  you walk across the apron from the plane stairs. Located 3.6 km southwest of Chora's old town, roughly a €10 taxi ride or a 15-minute walk if you're travelling light. Domestic routes: Olympic Air connects JNX to Athens (ATH) multiple times daily in summer; Sky Express operates seasonal services. International charters from Northern Europe (Germany, UK, Netherlands) operate June–September on a weekly or twice-weekly basis. The terminal has a café, a newsagent and one car hire desk that operates irregularly. There is no ATM in the terminal  -  use Chora for cash.",
          "IATA: JNX. Ένας διάδρομος, ένα τερματικό, 3.6 χλμ από τη Χώρα.",
          "IATA: JNX. Una pista, un terminal, 3,6 km da Chora.",
          "IATA : JNX. Une piste, un terminal, 3,6 km de Chora.",
          "IATA: JNX. Eine Bahn, ein Terminal, 3,6 km von Chora.",
        ),
      },
      {
        heading: ls("Why there are no permanent rental desks at JNX", "Γιατί δεν υπάρχουν γκισέ ενοικίασης", "Perché non ci sono banchi di noleggio", "Pourquoi pas de comptoirs", "Warum keine Mietschalter"),
        body: ls(
          "JNX operates on irregular schedules  -  some days see three flights, other days none. Staffing a full-time rental desk is economically unviable for any company. Avis, Budget, Enterprise and Europcar all operate JNX on a meet-and-greet basis only, meaning they arrange for an agent to be present when a specific customer's flight lands. Hertz is listed with inconsistent hours across booking platforms  -  Rentalcars.com lists 24/7; AtlasChoice shows 09:00–21:00; EconomyBookings shows contact-required. Sixt has no JNX presence at all. We operate exactly the same meet-and-greet model, with the same result: your car is there when you land. The difference is we don't charge for the service and we track your flight from our side.",
          "Το JNX έχει ακανόνιστες ώρες. Όλες οι μάρκες κάνουν meet-and-greet. Εμείς δωρεάν.",
          "JNX ha orari irregolari. Tutti i marchi fanno meet-and-greet. Noi gratis.",
          "JNX a des horaires irréguliers. Toutes les marques font du meet-and-greet. Nous gratuitement.",
          "JNX hat unregelmäßige Zeiten. Alle Marken machen Meet-and-Greet. Wir kostenlos.",
        ),
      },
      {
        heading: ls("How our airport meet-and-greet works", "Πώς λειτουργεί το δικό μας meet-and-greet", "Come funziona il nostro meet-and-greet", "Comment fonctionne notre accueil", "Wie unser Meet-and-Greet funktioniert"),
        body: ls(
          "Send us your flight number on WhatsApp the evening before your arrival. We monitor the flight from our end  -  delays, gate changes, early arrivals. When you walk into the arrivals hall you'll see us holding a sign with your name. We hand over the keys in the car park: 5 minutes for paperwork, photos of the vehicle condition and your signature, then the car is yours and you drive away. No queue, no upsell desk, no hidden 'airport surcharge'. Return works the same way  -  send your departure flight or ferry time, we meet you at the terminal or port at the agreed time and take the car from you there. You go straight to check-in with zero hassle.",
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
      "Parking in Naxos 2026: where to park in Chora and beyond",
      "Παρκάρισμα στη Νάξο: πού και πώς",
      "Parcheggio a Naxos: dove e come",
      "Stationnement à Naxos : où et comment",
      "Parken auf Naxos: wo und wie",
    ),
    excerpt: ls(
      "Chora's old town is car-free. The port car park fills by 11 am in August. Here's where you actually park  -  and the mistakes that get tourists towed every day.",
      "Η παλιά πόλη είναι πεζόδρομος. Δείτε πού παρκάρετε.",
      "Il centro storico è pedonale. Ecco dove si parcheggia.",
      "Le centre est piéton. Voici où se garer.",
      "Die Altstadt ist Fußgängerzone. Hier parken Sie.",
    ),
    hero: "/images/naxos/chora.jpg",
    publishedAt: "2026-03-10",
    updatedAt: "2026-05-10",
    readingTime: 4,
    related: ["driving-in-naxos", "do-you-need-a-car-in-naxos"],
    faqRefs: ["chora-parking"],
    sections: [
      {
        heading: ls("The port car park  -  free but fills fast", "Παρκινγκ λιμανιού (δωρεάν)", "Parcheggio del porto (gratis)", "Parking du port (gratuit)", "Hafenparkplatz (kostenlos)"),
        body: ls(
          "The largest free parking area in Chora is the open-air lot adjacent to the ferry terminal. No time limit, no cost, no machine. Walk from the lot to the old town's central square takes 5–8 minutes. In July and August the lot is typically full by 10:30–11:00 am  -  locals and visitors alike know it and arrive early. The lot has no shade, so a car left there all day in August gets very hot; consider leaving windows cracked. We always point guests toward this lot when they collect their vehicle from the port  -  it's the most convenient drop-off and pick-up point.",
          "Μεγαλύτερο δωρεάν παρκινγκ. Γεμίζει μέχρι 11:00 το καλοκαίρι.",
          "Il più grande gratis. Pieno entro le 11 in estate.",
          "Le plus grand gratuit. Plein vers 11h en été.",
          "Größter kostenloser. Bis 11 Uhr voll im Sommer.",
        ),
      },
      {
        heading: ls("Pay-and-display in central Chora", "Παρκάρισμα με κάρτα στο κέντρο", "Sosta a pagamento in centro", "Stationnement payant au centre", "Bezahlparken im Zentrum"),
        body: ls(
          "Blue-marked parking spaces in central Chora cost €1 per hour, payable at a roadside kiosk or via a parking app available in Greek app stores. Hours are typically 08:00–20:00 in summer; free after 20:00. White-line parking spaces are reserved for registered island residents and are enforced  -  tourist vehicles left in white spaces receive tickets and, if left overnight, are towed. The tow yard is inconveniently located and the release fee is around €150 plus the fine. When in doubt: if it's not blue-lined or a signed public lot, don't park there.",
          "Μπλε σημάδια €1/ώρα. Λευκά μόνο για κατοίκους.",
          "Strisce blu €1/ora. Bianche solo residenti.",
          "Bandes bleues €1/h. Blanches résidents seulement.",
          "Blaue Streifen €1/Std. Weiße nur Anwohner.",
        ),
      },
      {
        heading: ls("Parking at villages and beaches", "Παρκάρισμα στα χωριά και παραλίες", "Parcheggio a villaggi e spiagge", "Stationnement aux villages et plages", "Parken an Dörfern und Stränden"),
        body: ls(
          "Good news: outside Chora, parking on Naxos is almost entirely free and informal. Village squares have unpainted spots around the perimeter  -  pull up, check you're not blocking a doorway or fire hydrant, and leave it. Beach parking areas (Prokopios, Plaka, Mikri Vigla) are unpaved lots next to the beach access path with no charge and no time limit. The exception is the main beach road at Agios Prokopios in August, where a private operator occasionally charges €2–3 for a marked spot closest to the sand. Drive 200 m further and park free. Mountain villages like Apeiranthos have very limited space  -  there's a small lot at the entry to the village and parking on the main road outside. Never drive or park inside the marble-paved lanes; they're pedestrian-only.",
          "Εκτός Χώρας, παρκάρισμα συνήθως δωρεάν. Ελέγξτε να μην μπλοκάρετε εισόδους.",
          "Fuori Chora, parcheggio quasi sempre gratis. Controlla di non bloccare ingressi.",
          "Hors Chora, stationnement presque toujours gratuit. Vérifier de ne pas bloquer les entrées.",
          "Außerhalb von Chora fast überall kostenlos. Einfahrten nicht blockieren.",
        ),
      },
    ],
  },
  {
    slug: "naxos-rent-a-car-prices-cost-breakdown",
    title: ls(
      "Naxos Rent a Car Prices (2026): Average Costs & Avoid Hidden Fees",
      "Τιμές Ενοικίασης Αυτοκινήτου στη Νάξο (2026): Κόστος & Κρυφές Χρεώσεις",
      "Prezzi Noleggio Auto Naxos (2026): Costi Medi ed Evitare Costι Nascosti",
      "Prix de Location de Voiture à Naxos (2026) : Coûts et Frais Cachés",
      "Mietwagenpreise auf Naxos (2026): Kosten & Versteckte Gebühren",
    ),
    excerpt: ls(
      "Complete 2026 price guide for car rental in Naxos. Daily rates by season, manual vs automatic price differences, fuel costs, and how to avoid hidden fee traps.",
      "Πλήρης οδηγός τιμών για ενοικίαση αυτοκινήτου στη Νάξο το 2026.",
      "Guida completa ai prezzi per il noleggιο auto a Naxos nel 2026.",
      "Guide complet des prix de location de voiture à Naxos en 2026.",
      "Vollständiger Preisleitfaden für Mietwagen auf Naxos 2026.",
    ),
    hero: "/images/naxos/landscape.jpg",
    publishedAt: "2026-06-01",
    updatedAt: "2026-07-10",
    readingTime: 7,
    related: ["do-you-need-a-car-in-naxos", "naxos-car-rental-without-credit-card-insurance"],
    faqRefs: ["naxos-car-rental-prices-per-day", "best-car-rental-company-naxos", "no-credit-card-rental-naxos"],
    sections: [
      {
        heading: ls("Overview of Naxos Daily Car Rental Rates", "Σύνοψη Ημερήσιων Τιμών Ενοικίασης", "Panoramica delle Tariffe Giornaliere", "Aperçu des Tarifs Journaliers", "Überblick über Tagesmietpreise"),
        body: ls(
          "Car rental prices in Naxos vary significantly depending on the season. Low/Shoulder season (May, June, September, October) ranges from €25 to €45 per day for compact hatchbacks like the Hyundai i10 or Fiat Panda. During peak summer season (July and August), prices range between €55 and €95 per day. Automatic vehicles carry a slight €10–€15/day premium due to high demand among international visitors.",
          "Οι τιμές κυμαίνονται από 25€–45€/ημέρα στη χαμηλή σεζόν και 55€–95€/ημέρα τον Ιούλιο/Αύγουστο.",
          "I prezzi variano da 25€–45€/giorno in bassa stagione a 55€–95€/giorno in alta stagione.",
          "Les prix varient de 25€–45€/jour en basse saison à 55€–95€/jour en haute saison.",
          "Preise liegen zwischen 25€–45€/Tag in der Nebensaison und 55€–95€/Tag in der Hauptsaison.",
        ),
      },
      {
        heading: ls("How to Avoid Common Hidden Fees on Aggregators", "Πώς να Αποφύγετε Κρυφές Χρεώσεις", "Come Evitare Costi Nascosti", "Comment Éviter les Frais Cachés", "Versteckte Gebühren vermeiden"),
        body: ls(
          "Third-party booking sites often display low headline rates but add mandatory surcharges at counter pickup for location fees, secondary drivers, baby seats, or mandatory insurance upgrades. Booking directly with local operators like Fast Motor Rental Naxos guarantees transparent pricing with zero airport/port pickup surcharge, free secondary driver, and included child seats.",
          "Αποφύγετε τις κρυφές χρεώσεις των τρίτων σελίδων κάνοντας απευθείας κράτηση με ντόπιους παρόχους.",
          "Evita costi nascosti prenotando direttamente con operatorι locali.",
          "Évitez les frais cachés en réservant directement auprès d'opérateurs locaux.",
          "Vermeiden Sie versteckte Gebühren durch Direktbuchung bei lokalen Anbietern.",
        ),
      },
    ],
  },
  {
    slug: "naxos-car-rental-without-credit-card-insurance",
    title: ls(
      "Naxos Car Rental Without Credit Card & Insurance Options Explained",
      "Ενοικίαση Αυτοκινήτου στη Νάξο Χωρίς Πιστωτική & Ασφάλειες",
      "Noleggio Auto Naxos Senza Carta di Credito e Opzioni Assicurative",
      "Location de Voiture à Naxos Sans Carte de Crédit et Assurances",
      "Mietwagen Naxos ohne Kreditkarte & Versicherung erklärt",
    ),
    excerpt: ls(
      "Everything about credit card deposit holds, debit card acceptance, cash options, and Zero Excess insurance coverage on Naxos island.",
      "Όλα για τις εγγυήσεις, χρεωστικές κάρτες, μετρητά και κάλυψη Zero Excess στη Νάξο.",
      "Tutto su depositi di garanzia, carte di debito e copertura Zero Excess a Naxos.",
      "Tout sur les cautions, cartes de débit et couverture Zero Excess à Naxos.",
      "Alles über Kautionen, Debitkarten und Zero Excess Versicherung auf Naxos.",
    ),
    hero: "/images/naxos/chora.jpg",
    publishedAt: "2026-06-05",
    updatedAt: "2026-07-10",
    readingTime: 6,
    related: ["naxos-rent-a-car-prices-cost-breakdown", "driving-in-naxos"],
    faqRefs: ["no-credit-card-rental-naxos", "insurance-ferry-day"],
    sections: [
      {
        heading: ls("Can You Rent a Car in Naxos Without a Credit Card?", "Ενοικίαση Χωρίς Πιστωτική Κάρτα", "Noleggio Senza Carta di Credito", "Location Sans Carte de Crédit", "Mieten Ohne Kreditkarte"),
        body: ls(
          "Many corporate chains require a major credit card with a €1,000+ credit freeze for deposit holds. At Fast Motor Rental Naxos, we accommodate debit card payments and low security deposits when opting for Full CDW or Zero Excess protection package, allowing tourists to travel without frozen funds on their cards.",
          "Στη Fast Motor Rental Naxos δεχόμαστε χρεωστικές κάρτες και μετρητά με κάλυψη Full CDW ή Zero Excess.",
          "Accettiamo carte di debito e contanti con copertura Full CDW o Zero Excess.",
          "Nous acceptons les cartes de débit et espèces avec assurance Full CDW ou Zero Excess.",
          "Wir akzeptieren Debitkarten und Bargeld bei Wahl von Full CDW oder Zero Excess.",
        ),
      },
    ],
  },
  {
    slug: "rent-a-car-naxos-port-vs-airport-pickup-guide",
    title: ls(
      "Rent a Car Naxos Port vs Airport (JNX) Pickup: Delivery Guide",
      "Ενοικίαση Αυτοκινήτου: Λιμάνι Νάξου vs Αεροδρόμιο (JNX) Παράδοση",
      "Noleggio Auto Naxos: Consegna Porto vs Aeroporto (JNX)",
      "Location de Voiture à Naxos : Port vs Aéroport (JNX)",
      "Mietwagen Naxos: Hafen vs Flughafen (JNX) Übergabe",
    ),
    excerpt: ls(
      "Compare ferry port and airport meet-and-greet delivery in Naxos. Learn how free airport and port delivery works without delays.",
      "Σύγκριση παραλαβής στο λιμάνι και στο αεροδρόμιο JNX στη Νάξο.",
      "Confronto tra ritiro al porto e all'aeroporto JNX a Naxos.",
      "Comparaison entre livraison au port et à l'aéroport JNX à Naxos.",
      "Vergleich zwischen Abholung am Hafen und am Flughafen JNX auf Naxos.",
    ),
    hero: "/images/naxos/landscape.jpg",
    publishedAt: "2026-06-10",
    updatedAt: "2026-07-10",
    readingTime: 5,
    related: ["naxos-airport-jnx-guide", "do-you-need-a-car-in-naxos"],
    faqRefs: ["airport-vs-port-pickup", "port-to-airport-car-dropoff"],
    sections: [
      {
        heading: ls("Free Delivery at Naxos Ferry Port & Airport", "Δωρεάν Παράδοση σε Λιμάνι & Αεροδρόμιο", "Consegna Gratuita in Porto e Aeroporto", "Livraison Gratuite au Port et à l'Aéroport", "Kostenlose Lieferung an Hafen & Flughafen"),
        body: ls(
          "Whether arriving via Seajets/Blue Star ferries at Naxos Port or flying into Naxos National Airport (JNX), Fast Motor Rental Naxos offers personalized free delivery. Our team tracks live vessel and flight schedules to greet you directly upon arrival with key handoff in under 5 minutes.",
          "Παρακολουθούμε ζωντανά τις πτήσεις και τα πλοία για άμεση παράδοση χωρίς αναμονή.",
          "Monitoriamo i voli e i traghetti per una consegna immediata al tuo arrivo.",
          "Nous suivons les vols et ferries pour une remise des clés immédiate sans attente.",
          "Wir verfolgen Flüge und Fähren für eine sofortige Schlüsselübergabe ohne Wartezeit.",
        ),
      },
    ],
  },
  {
    slug: "best-car-rental-naxos-reviews-comparison",
    title: ls(
      "Best car rental in Naxos 2026: local agencies vs the big chains",
      "Καλύτερη ενοικίαση αυτοκινήτου στη Νάξο 2026: τοπικά γραφεία ή αλυσίδες;",
      "Miglior noleggio auto a Naxos 2026: agenzie locali o grandi catene?",
      "Meilleure location de voiture à Naxos 2026 : agences locales ou grandes chaînes ?",
      "Beste Autovermietung auf Naxos 2026: lokale Anbieter oder große Ketten?",
    ),
    excerpt: ls(
      "An honest comparison of how car rental actually works on Naxos  -  what the international chains do well, what the local family agencies do better, and the five questions that decide which one suits your trip.",
      "Ειλικρινής σύγκριση: τι κάνουν καλά οι διεθνείς αλυσίδες, τι κάνουν καλύτερα τα τοπικά γραφεία και πώς επιλέγετε.",
      "Confronto onesto: cosa fanno bene le catene internazionali, cosa fanno meglio le agenzie locali e come scegliere.",
      "Comparatif honnête : ce que font bien les grandes chaînes, ce que font mieux les agences locales, et comment choisir.",
      "Ehrlicher Vergleich: Was internationale Ketten gut können, was lokale Anbieter besser machen und wie Sie wählen.",
    ),
    hero: "/images/naxos/chora.jpg",
    publishedAt: "2026-06-15",
    updatedAt: "2026-08-22",
    readingTime: 9,
    related: [
      "naxos-rent-a-car-prices-cost-breakdown",
      "naxos-car-rental-without-credit-card-insurance",
      "do-you-need-a-car-in-naxos",
    ],
    faqRefs: [
      "best-car-rental-company-naxos",
      "is-it-worth-renting-a-car-naxos",
      "advance-vs-walkin",
      "credit-card-required",
      "delivery-zones",
      "what-if-damage",
    ],
    sections: [
      {
        heading: ls(
          "Who actually rents cars on Naxos",
          "Ποιοι νοικιάζουν πραγματικά αυτοκίνητα στη Νάξο",
          "Chi noleggia davvero auto a Naxos",
          "Qui loue réellement des voitures à Naxos",
          "Wer auf Naxos wirklich Autos vermietet",
        ),
        body: ls(
          "Naxos has roughly two dozen rental operators and they fall into three groups. The international brands  -  Hertz, Avis, Sixt, Enterprise  -  operate here through local franchise partners rather than company-owned branches, which matters more than most travellers realise: you book with a global brand and its terms, but the counter, the fleet and the person handing you the keys are a Naxian business. The broker platforms  -  Discover Cars, Rentalcars, Auto Europe  -  do not own vehicles at all; they resell inventory from those same local suppliers and add their own insurance product on top. And then there are the independent family agencies, Fast Motor Rental Naxos among them, which own their fleet, set their own terms and answer their own phones. Understanding which of the three you are actually dealing with explains almost every difference in price, deposit and service that follows.",
          "Στη Νάξο δραστηριοποιούνται περίπου είκοσι γραφεία σε τρεις κατηγορίες: διεθνείς αλυσίδες μέσω τοπικών franchise, πλατφόρμες-μεσίτες που μεταπωλούν στόλους τρίτων, και ανεξάρτητα οικογενειακά γραφεία που έχουν δικά τους αυτοκίνητα. Η κατηγορία εξηγεί σχεδόν κάθε διαφορά σε τιμή, εγγύηση και εξυπηρέτηση.",
          "A Naxos operano circa venti agenzie in tre categorie: catene internazionali tramite franchising locali, piattaforme broker che rivendono flotte altrui, e agenzie familiari indipendenti con flotta propria. La categoria spiega quasi ogni differenza di prezzo, cauzione e servizio.",
          "Naxos compte une vingtaine de loueurs en trois catégories : chaînes internationales via des franchises locales, plateformes courtiers qui revendent des flottes tierces, et agences familiales indépendantes propriétaires de leur flotte. La catégorie explique presque toutes les différences de prix, de caution et de service.",
          "Auf Naxos gibt es rund zwanzig Anbieter in drei Kategorien: internationale Ketten über lokale Franchisenehmer, Broker-Plattformen, die fremde Flotten weiterverkaufen, und unabhängige Familienbetriebe mit eigener Flotte. Die Kategorie erklärt fast jeden Unterschied bei Preis, Kaution und Service.",
        ),
      },
      {
        heading: ls(
          "What the international chains genuinely do better",
          "Σε τι υπερέχουν πραγματικά οι διεθνείς αλυσίδες",
          "In cosa le grandi catene sono davvero migliori",
          "Ce que les grandes chaînes font vraiment mieux",
          "Worin internationale Ketten wirklich besser sind",
        ),
        body: ls(
          "Three things, and they are real. First, one-way rentals: if you want to collect on Naxos and drop off on another island or on the mainland, a chain with a network can do it and an independent almost certainly cannot. Second, corporate billing and loyalty schemes  -  if your employer books through a global account, that account works here. Third, standardised recourse: a dispute with a chain escalates through a documented corporate process, which some travellers value even though it is slower. If any of those three describe your trip, book the chain and do not overthink it.",
          "Τρία πράγματα, και είναι υπαρκτά: μονόδρομες ενοικιάσεις μεταξύ νησιών ή προς την ηπειρωτική Ελλάδα, εταιρική τιμολόγηση και προγράμματα πιστότητας, και τυποποιημένη διαδικασία παραπόνων. Αν κάτι από αυτά ισχύει για το ταξίδι σας, επιλέξτε αλυσίδα.",
          "Tre cose, e sono reali: noleggi a senso unico tra isole o verso il continente, fatturazione aziendale e programmi fedeltà, e una procedura di reclamo standardizzata. Se una di queste descrive il tuo viaggio, scegli la catena.",
          "Trois choses, bien réelles : locations en aller simple entre îles ou vers le continent, facturation entreprise et programmes de fidélité, et une procédure de réclamation standardisée. Si l'un de ces cas correspond à votre voyage, choisissez la chaîne.",
          "Drei Dinge, und sie sind real: Einwegmieten zwischen Inseln oder aufs Festland, Firmenabrechnung und Vielmieterprogramme sowie ein standardisiertes Beschwerdeverfahren. Trifft eines davon auf Ihre Reise zu, buchen Sie die Kette.",
        ),
      },
      {
        heading: ls(
          "Where the local family agencies win",
          "Πού κερδίζουν τα τοπικά οικογενειακά γραφεία",
          "Dove vincono le agenzie familiari locali",
          "Où les agences familiales locales l'emportent",
          "Wo lokale Familienbetriebe gewinnen",
        ),
        body: ls(
          "Delivery is the big one. A chain counter has opening hours and a fixed location; an independent meets your ferry at the port or your flight at JNX and hands over the keys where you land, at no surcharge. That difference is worth more than it sounds when the 23:15 ferry from Piraeus arrives and every counter on the island is shut. Deposits are the second: independents typically hold a far smaller amount and many accept debit cards, where chains commonly require a credit card in the main driver's name with a four-figure hold. Third, you get the exact car you booked rather than 'or similar', because the fleet is small enough that the owner knows every vehicle in it. Fourth, support is a WhatsApp message to a person on the island, not a call centre in another country. The honest trade-off: no one-way rentals, no loyalty points, and a smaller fleet that sells out earlier in August.",
          "Η παράδοση είναι το μεγάλο πλεονέκτημα: ραντεβού στο λιμάνι ή στο αεροδρόμιο χωρίς επιβάρυνση, ακόμη και σε αργοπορημένες αφίξεις. Ακολουθούν οι μικρότερες εγγυήσεις με αποδοχή χρεωστικής κάρτας, το συγκεκριμένο μοντέλο αντί για «ή παρόμοιο», και η άμεση υποστήριξη μέσω WhatsApp. Το αντάλλαγμα: χωρίς μονόδρομες ενοικιάσεις και με μικρότερο στόλο που εξαντλείται νωρίτερα τον Αύγουστο.",
          "La consegna è il vantaggio principale: appuntamento al porto o all'aeroporto senza supplemento, anche per arrivi in tarda serata. Seguono cauzioni più basse con carta di debito accettata, il modello esatto invece di «o similare», e assistenza diretta via WhatsApp. Il compromesso: niente noleggi a senso unico e una flotta più piccola che si esaurisce prima ad agosto.",
          "La livraison est l'avantage principal : rendez-vous au port ou à l'aéroport sans supplément, même pour les arrivées tardives. Viennent ensuite des cautions plus faibles avec carte de débit acceptée, le modèle exact au lieu de « ou similaire », et une assistance directe par WhatsApp. La contrepartie : pas de location en aller simple et une flotte plus petite qui part plus tôt en août.",
          "Die Lieferung ist der große Vorteil: Übergabe am Hafen oder Flughafen ohne Aufpreis, auch bei später Ankunft. Dazu kommen niedrigere Kautionen mit akzeptierter Debitkarte, das exakte Modell statt „oder ähnlich“ und direkte Unterstützung per WhatsApp. Der Kompromiss: keine Einwegmieten und eine kleinere Flotte, die im August früher ausgebucht ist.",
        ),
      },
      {
        heading: ls(
          "The broker platforms  -  read the insurance twice",
          "Οι πλατφόρμες-μεσίτες  -  διαβάστε δύο φορές την ασφάλεια",
          "Le piattaforme broker  -  leggi due volte l'assicurazione",
          "Les plateformes courtiers  -  relisez l'assurance",
          "Die Broker-Plattformen  -  lesen Sie die Versicherung zweimal",
        ),
        body: ls(
          "Broker sites show the lowest headline price on Naxos almost every time, and the reason is structural: the daily rate excludes the supplier's own excess reduction, and the broker sells you its own cover instead. That cover is usually a reimbursement product  -  if the car is damaged, the local supplier still charges your card the full excess, and you then claim it back from the broker afterwards with paperwork. It often works out fine. It is simply not the same thing as arriving at zero excess, and travellers who assume it is get an unpleasant surprise at handover. If you book through a broker, budget for the supplier's full deposit to be held regardless of what you paid the platform.",
          "Οι πλατφόρμες εμφανίζουν σχεδόν πάντα τη χαμηλότερη τιμή, επειδή η ημερήσια χρέωση δεν περιλαμβάνει τη μείωση απαλλαγής του προμηθευτή. Η ασφάλεια της πλατφόρμας είναι συνήθως προϊόν αποζημίωσης: ο τοπικός προμηθευτής χρεώνει κανονικά την απαλλαγή και εσείς τη διεκδικείτε αργότερα. Υπολογίστε ότι θα δεσμευτεί ολόκληρη η εγγύηση του προμηθευτή.",
          "Le piattaforme mostrano quasi sempre il prezzo più basso perché la tariffa giornaliera esclude la riduzione della franchigia del fornitore. La copertura del broker è di solito un prodotto di rimborso: il fornitore locale addebita comunque la franchigia e tu la richiedi dopo. Metti in conto che l'intera cauzione del fornitore venga bloccata.",
          "Les plateformes affichent presque toujours le prix le plus bas car le tarif journalier exclut la réduction de franchise du fournisseur. La couverture du courtier est généralement un produit de remboursement : le fournisseur local débite quand même la franchise et vous la réclamez ensuite. Prévoyez que la caution complète du fournisseur soit bloquée.",
          "Broker-Seiten zeigen fast immer den niedrigsten Preis, weil der Tagessatz die Selbstbeteiligungsreduzierung des Anbieters ausschließt. Die Broker-Deckung ist meist ein Erstattungsprodukt: Der lokale Anbieter belastet die Selbstbeteiligung trotzdem, und Sie fordern sie danach zurück. Kalkulieren Sie damit, dass die volle Kaution des Anbieters blockiert wird.",
        ),
      },
      {
        heading: ls(
          "Five questions that decide it",
          "Πέντε ερωτήσεις που κρίνουν την επιλογή",
          "Cinque domande che decidono",
          "Cinq questions qui tranchent",
          "Fünf Fragen, die entscheiden",
        ),
        body: ls(
          "1. Are you arriving by ferry after 21:00 or flying into JNX? Free meet-and-greet delivery matters far more than a €3/day price gap. 2. Do you have a credit card in the main driver's name with €1,000+ of headroom? If not, filter for agencies that accept debit cards and hold a small deposit. 3. Do you need a specific car  -  automatic transmission, seven seats, a genuine 4×4 for the Apeiranthos road? Ask for the model in writing rather than accepting a category. 4. Are you dropping off somewhere other than Naxos? That single answer sends you to a chain. 5. Are you travelling in the last three weeks of July or the first three of August? Then availability, not price, is your constraint  -  book six to eight weeks out and stop comparing. Whatever you decide, get the answer in writing before you pay: any agency worth renting from will put its deposit, excess and delivery terms in a message you can keep.",
          "1. Φτάνετε με πλοίο μετά τις 21:00 ή με πτήση στο JNX; Η δωρεάν παράδοση μετράει περισσότερο από μια μικρή διαφορά τιμής. 2. Έχετε πιστωτική κάρτα στο όνομα του οδηγού με επαρκές όριο; Αν όχι, αναζητήστε γραφεία που δέχονται χρεωστική. 3. Χρειάζεστε συγκεκριμένο μοντέλο  -  αυτόματο, επτά θέσεις, πραγματικό 4×4; Ζητήστε το γραπτώς. 4. Θα παραδώσετε αλλού εκτός Νάξου; Τότε επιλέξτε αλυσίδα. 5. Ταξιδεύετε τέλη Ιουλίου ή Αύγουστο; Τότε το ζητούμενο είναι η διαθεσιμότητα  -  κλείστε έξι με οκτώ εβδομάδες νωρίτερα.",
          "1. Arrivi in traghetto dopo le 21:00 o in volo a JNX? La consegna gratuita conta più di una piccola differenza di prezzo. 2. Hai una carta di credito intestata al conducente con margine sufficiente? Altrimenti cerca agenzie che accettano il bancomat. 3. Ti serve un modello preciso  -  automatico, sette posti, un vero 4×4? Chiedilo per iscritto. 4. Riconsegni fuori da Naxos? Allora scegli una catena. 5. Viaggi tra fine luglio e agosto? Allora conta la disponibilità  -  prenota con sei-otto settimane di anticipo.",
          "1. Arrivez-vous en ferry après 21h ou en vol à JNX ? La livraison gratuite compte plus qu'un petit écart de prix. 2. Avez-vous une carte de crédit au nom du conducteur avec une marge suffisante ? Sinon, cherchez les agences acceptant la carte de débit. 3. Vous faut-il un modèle précis  -  automatique, sept places, un vrai 4×4 ? Demandez-le par écrit. 4. Restituez-vous ailleurs qu'à Naxos ? Alors choisissez une chaîne. 5. Voyagez-vous fin juillet ou en août ? C'est la disponibilité qui compte  -  réservez six à huit semaines à l'avance.",
          "1. Kommen Sie nach 21:00 Uhr mit der Fähre oder per Flug in JNX an? Kostenlose Lieferung zählt mehr als ein kleiner Preisunterschied. 2. Haben Sie eine Kreditkarte auf den Namen des Fahrers mit ausreichendem Rahmen? Sonst suchen Sie Anbieter, die Debitkarten akzeptieren. 3. Brauchen Sie ein bestimmtes Modell  -  Automatik, sieben Sitze, einen echten 4×4? Lassen Sie es sich schriftlich geben. 4. Geben Sie außerhalb von Naxos zurück? Dann wählen Sie eine Kette. 5. Reisen Sie Ende Juli oder im August? Dann zählt die Verfügbarkeit  -  buchen Sie sechs bis acht Wochen im Voraus.",
        ),
      },
    ],
  },
  {
    slug: "atv-vs-buggy-vs-car",
    title: ls(
      "ATV, buggy, scooter or car on Naxos? An honest 2026 decision guide",
      "ATV, buggy, μηχανάκι ή αυτοκίνητο στη Νάξο; Ειλικρινής οδηγός 2026",
      "ATV, buggy, scooter o auto a Naxos? Guida onesta 2026",
      "ATV, buggy, scooter ou voiture à Naxos ? Guide honnête 2026",
      "ATV, Buggy, Roller oder Auto auf Naxos? Ehrlicher Ratgeber 2026",
    ),
    excerpt: ls(
      "What each vehicle type can and cannot do on Naxos roads, what the licence rules actually say, and why almost every visitor ends up in a car. We rent cars  -  so here is the case against them too.",
      "Τι μπορεί και τι δεν μπορεί κάθε τύπος οχήματος στους δρόμους της Νάξου, τι ισχύει πραγματικά για τα διπλώματα και γιατί οι περισσότεροι καταλήγουν σε αυτοκίνητο.",
      "Cosa può e non può fare ogni tipo di veicolo sulle strade di Naxos, cosa dicono davvero le regole sulle patenti e perché quasi tutti finiscono in auto.",
      "Ce que chaque type de véhicule peut ou non faire sur les routes de Naxos, ce que disent vraiment les règles de permis, et pourquoi presque tous finissent en voiture.",
      "Was jeder Fahrzeugtyp auf Naxos' Straßen kann und nicht kann, was die Führerscheinregeln wirklich sagen und warum fast alle im Auto landen.",
    ),
    hero: "/images/naxos/mikri-vigla.jpg",
    publishedAt: "2026-03-15",
    updatedAt: "2026-08-22",
    readingTime: 8,
    related: [
      "do-you-need-a-car-in-naxos",
      "driving-in-naxos",
      "best-beaches-by-car-naxos",
    ],
    faqRefs: [
      "do-i-need-car-naxos",
      "driving-difficulty",
      "4x4-needed",
      "idp-greece",
      "minimum-age",
      "automatic-availability",
    ],
    sections: [
      {
        heading: ls(
          "First, what we rent  -  and what we don't",
          "Πρώτα, τι νοικιάζουμε  -  και τι όχι",
          "Prima di tutto, cosa noleggiamo  -  e cosa no",
          "D'abord, ce que nous louons  -  et ce que nous ne louons pas",
          "Zuerst: Was wir vermieten  -  und was nicht",
        ),
        body: ls(
          "Fast Motor Rental Naxos rents cars only. We used to run scooters, ATVs and buggies and we made a deliberate decision to stop, for a reason worth stating plainly: on an island this windy, with mountain roads this long and unlit, the injury rate on two and four-wheel open vehicles was not something we wanted our name attached to. That does mean this page recommends the product we happen to sell, so read it with that in mind  -  and read the case against a car below, which is genuine. If you finish this and decide a scooter is right for your trip, rent one from a specialist operator who maintains them properly, and wear the helmet.",
          "Η Fast Motor Rental Naxos νοικιάζει μόνο αυτοκίνητα. Παλαιότερα διαθέταμε μηχανάκια, ATV και buggy και σταματήσαμε συνειδητά: σε ένα νησί με τόσο δυνατό αέρα και μακριές, ασφώτιστες ορεινές διαδρομές, τα ποσοστά τραυματισμών σε ανοιχτά οχήματα δεν ήταν κάτι που θέλαμε να συνδέεται με το όνομά μας. Αν παρ' όλα αυτά επιλέξετε μηχανάκι, νοικιάστε από εξειδικευμένο γραφείο και φορέστε κράνος.",
          "Fast Motor Rental Naxos noleggia solo auto. In passato avevamo scooter, ATV e buggy e abbiamo scelto di smettere: su un'isola così ventosa, con strade di montagna lunghe e senza illuminazione, il tasso di infortuni sui veicoli aperti non era qualcosa a cui volevamo legare il nostro nome. Se scegli comunque lo scooter, noleggialo da un operatore specializzato e indossa il casco.",
          "Fast Motor Rental Naxos ne loue que des voitures. Nous proposions auparavant scooters, ATV et buggys et avons choisi d'arrêter : sur une île aussi ventée, avec des routes de montagne longues et non éclairées, le taux de blessures sur les véhicules ouverts n'était pas quelque chose que nous voulions associer à notre nom. Si vous choisissez malgré tout un scooter, louez-le chez un spécialiste et portez le casque.",
          "Fast Motor Rental Naxos vermietet ausschließlich Autos. Früher hatten wir Roller, ATVs und Buggys und haben bewusst aufgehört: Auf einer so windigen Insel mit langen, unbeleuchteten Bergstraßen war die Verletzungsrate bei offenen Fahrzeugen nichts, womit wir unseren Namen verbinden wollten. Wenn Sie sich dennoch für einen Roller entscheiden, mieten Sie ihn bei einem Spezialisten und tragen Sie den Helm.",
        ),
      },
      {
        heading: ls(
          "What the licence rules actually require",
          "Τι απαιτούν πραγματικά οι κανόνες αδειών",
          "Cosa richiedono davvero le regole sulle patenti",
          "Ce que les règles de permis exigent réellement",
          "Was die Führerscheinregeln wirklich verlangen",
        ),
        body: ls(
          "This is where most of the misinformation online sits. In Greece a 50cc scooter requires at least an AM category entitlement; a full car licence issued in an EU country from 2013 onwards normally carries AM automatically, but older licences and many non-EU licences do not. Anything above 50cc  -  which includes every 125cc scooter you will actually want on Naxos hills  -  requires category A1 or higher. A quad or ATV registered as a road vehicle needs B1 or B; a buggy is usually B. Renting on the wrong category is not a technicality: it voids the insurance completely, so a single-vehicle slide on gravel becomes a bill you pay in full. Non-EU licence holders should also carry an International Driving Permit alongside the home licence  -  see our IDP guide for the exact rules by country.",
          "Εδώ βρίσκεται η περισσότερη παραπληροφόρηση. Στην Ελλάδα το μηχανάκι 50cc απαιτεί τουλάχιστον κατηγορία AM  -  τα ευρωπαϊκά διπλώματα αυτοκινήτου από το 2013 συνήθως την περιλαμβάνουν, τα παλαιότερα και πολλά εκτός ΕΕ όχι. Πάνω από 50cc χρειάζεται A1 ή ανώτερη. Το quad θέλει B1 ή B, το buggy συνήθως B. Η ενοικίαση με λάθος κατηγορία ακυρώνει πλήρως την ασφάλεια.",
          "Qui si concentra la maggior parte della disinformazione. In Grecia uno scooter 50cc richiede almeno la categoria AM  -  le patenti auto UE dal 2013 di solito la includono, quelle più vecchie e molte extra-UE no. Sopra i 50cc serve A1 o superiore. Il quad richiede B1 o B, il buggy di solito B. Noleggiare con la categoria sbagliata annulla completamente l'assicurazione.",
          "C'est là que se concentre la désinformation. En Grèce, un scooter 50cc exige au moins la catégorie AM  -  les permis auto de l'UE depuis 2013 l'incluent généralement, les plus anciens et beaucoup hors UE non. Au-dessus de 50cc, il faut A1 ou plus. Le quad exige B1 ou B, le buggy généralement B. Louer avec la mauvaise catégorie annule entièrement l'assurance.",
          "Hier sitzt die meiste Fehlinformation. In Griechenland verlangt ein 50-ccm-Roller mindestens Klasse AM  -  EU-Autoführerscheine ab 2013 enthalten sie meist, ältere und viele Nicht-EU-Führerscheine nicht. Über 50 ccm ist A1 oder höher nötig. Ein Quad verlangt B1 oder B, ein Buggy meist B. Mieten in der falschen Klasse hebt den Versicherungsschutz vollständig auf.",
        ),
      },
      {
        heading: ls(
          "The meltemi problem nobody warns you about",
          "Το πρόβλημα του μελτεμιού που κανείς δεν σας λέει",
          "Il problema del meltemi di cui nessuno ti avverte",
          "Le problème du meltemi dont personne ne vous parle",
          "Das Meltemi-Problem, vor dem niemand warnt",
        ),
        body: ls(
          "Naxos sits in the windiest corridor of the Cyclades. Between mid-July and late August the meltemi routinely blows 6–7 Beaufort for days at a time, and the exposed west-coast road from Agios Prokopios south to Pyrgaki is the worst of it  -  the same wind that makes Mikri Vigla a world-class kitesurf spot. On a 125cc scooter carrying two people and a beach bag, a sustained crosswind of that strength is genuinely frightening and objectively dangerous, particularly on the open stretches where gusts arrive without warning from between the dunes. A car simply does not care. If your trip falls in that window and your itinerary includes the west coast, this single factor should probably decide it for you.",
          "Η Νάξος βρίσκεται στον πιο ανεμώδη διάδρομο των Κυκλάδων. Από τα μέσα Ιουλίου έως τα τέλη Αυγούστου το μελτέμι φυσά τακτικά 6–7 μποφόρ για μέρες, και ο εκτεθειμένος δυτικός δρόμος προς το Πυργάκι είναι το χειρότερο σημείο. Με μηχανάκι 125cc και δύο επιβάτες, ο πλευρικός άνεμος αυτής της έντασης είναι αντικειμενικά επικίνδυνος. Το αυτοκίνητο απλώς δεν επηρεάζεται.",
          "Naxos si trova nel corridoio più ventoso delle Cicladi. Da metà luglio a fine agosto il meltemi soffia regolarmente a 6–7 Beaufort per giorni, e la strada costiera occidentale esposta verso Pyrgaki è il tratto peggiore. Su uno scooter 125cc con due persone, un vento laterale di quella forza è oggettivamente pericoloso. All'auto non importa.",
          "Naxos se situe dans le couloir le plus venté des Cyclades. De mi-juillet à fin août, le meltemi souffle régulièrement à 6–7 Beaufort pendant des jours, et la route côtière ouest exposée vers Pyrgaki est le pire tronçon. Sur un scooter 125cc à deux, un vent latéral de cette force est objectivement dangereux. La voiture s'en moque.",
          "Naxos liegt im windigsten Korridor der Kykladen. Von Mitte Juli bis Ende August weht der Meltemi regelmäßig tagelang mit 6–7 Beaufort, und die exponierte Westküstenstraße Richtung Pyrgaki ist der schlimmste Abschnitt. Auf einem 125-ccm-Roller zu zweit ist Seitenwind dieser Stärke objektiv gefährlich. Dem Auto ist es egal.",
        ),
      },
      {
        heading: ls(
          "The honest case against renting a car",
          "Τα πραγματικά μειονεκτήματα του αυτοκινήτου",
          "Gli svantaggi reali dell'auto",
          "Les vrais inconvénients de la voiture",
          "Die echten Nachteile des Autos",
        ),
        body: ls(
          "Three of them, and they are fair. Parking in Chora in August is genuinely difficult  -  the old town is car-free and the surrounding streets fill by mid-morning, whereas a scooter always finds a gap. A car costs more per day than a 125cc scooter, roughly double in peak season. And if your entire plan is Agios Georgios in the morning and a taverna in the evening, a car spends most of the week parked while you pay for it. If all three of those describe your trip, the honest answer is that you may not need any vehicle at all: rent for the two or three days you actually want to explore the interior, and use the KTEL bus and taxis for the rest. We would rather tell you that than sell you seven days you will not use.",
          "Τρία, και είναι δίκαια. Το παρκάρισμα στη Χώρα τον Αύγουστο είναι πραγματικά δύσκολο, ενώ το μηχανάκι πάντα βρίσκει χώρο. Το αυτοκίνητο κοστίζει περίπου διπλάσια από ένα 125άρι στην υψηλή περίοδο. Και αν το πρόγραμμά σας είναι παραλία και ταβέρνα, το αυτοκίνητο μένει παρκαρισμένο. Σε αυτή την περίπτωση νοικιάστε για δύο-τρεις ημέρες εξερεύνησης και χρησιμοποιήστε ΚΤΕΛ και ταξί για τα υπόλοιπα.",
          "Tre, e sono onesti. Parcheggiare a Chora ad agosto è davvero difficile, mentre lo scooter trova sempre uno spazio. L'auto costa circa il doppio di un 125 in alta stagione. E se il tuo programma è spiaggia e taverna, l'auto resta parcheggiata. In tal caso noleggia per i due o tre giorni in cui vuoi esplorare e usa il bus KTEL e i taxi per il resto.",
          "Trois, et ils sont justes. Se garer à Chora en août est vraiment difficile, alors qu'un scooter trouve toujours une place. La voiture coûte environ le double d'un 125 en haute saison. Et si votre programme se résume à la plage et à la taverne, la voiture reste garée. Dans ce cas, louez pour les deux ou trois jours d'exploration et utilisez le bus KTEL et les taxis pour le reste.",
          "Drei, und sie sind fair. Parken in Chora ist im August wirklich schwierig, während ein Roller immer eine Lücke findet. Das Auto kostet in der Hochsaison etwa doppelt so viel wie ein 125er. Und wenn Ihr Plan aus Strand und Taverne besteht, steht das Auto meist geparkt. Dann mieten Sie für die zwei oder drei Tage, an denen Sie erkunden wollen, und nutzen sonst KTEL-Bus und Taxi.",
        ),
      },
      {
        heading: ls(
          "Where none of them can legally go",
          "Πού δεν επιτρέπεται να πάει κανένα από αυτά",
          "Dove nessuno di essi può legalmente andare",
          "Où aucun d'eux ne peut légalement aller",
          "Wohin keines von ihnen legal fahren darf",
        ),
        body: ls(
          "The soft-sand tracks around Alyko, the coastal path south of Mikri Vigla and the unpaved approaches to the small chapels are excluded from every standard rental agreement on Naxos, including ATV and buggy contracts from the operators who rent them. Marketing photographs suggest otherwise; the contracts do not. Drive to the signed parking area on the paved road, leave the vehicle there and walk the last stretch  -  it is five to fifteen minutes in every case, the walk through the Alyko cedar forest is one of the nicest on the island, and it is the difference between a good day and an uninsured recovery bill. If you want a genuine 4×4 for the unpaved-but-legal mountain tracks around Apeiranthos, our Suzuki Jimny and Dacia Duster are built for exactly that.",
          "Οι αμμώδεις χωματόδρομοι γύρω από το Αλυκό, το παραλιακό μονοπάτι νότια της Μικρής Βίγλας και οι μη ασφαλτοστρωμένες προσβάσεις στα εκκλησάκια εξαιρούνται από κάθε συμβόλαιο ενοικίασης στη Νάξο  -  και για τα ATV και τα buggy. Σταματήστε στο σηματοδοτημένο πάρκινγκ και συνεχίστε με τα πόδια. Για τις νόμιμες ορεινές διαδρομές γύρω από την Απείρανθο, το Suzuki Jimny και το Dacia Duster είναι η σωστή επιλογή.",
          "Le piste sabbiose intorno ad Alyko, il sentiero costiero a sud di Mikri Vigla e gli accessi sterrati alle cappelle sono esclusi da ogni contratto di noleggio a Naxos  -  anche per ATV e buggy. Fermati al parcheggio segnalato e prosegui a piedi. Per le piste di montagna legali intorno ad Apeiranthos, Suzuki Jimny e Dacia Duster sono la scelta giusta.",
          "Les pistes sableuses autour d'Alyko, le sentier côtier au sud de Mikri Vigla et les accès non goudronnés aux chapelles sont exclus de tous les contrats de location à Naxos  -  y compris ATV et buggy. Arrêtez-vous au parking signalé et continuez à pied. Pour les pistes de montagne autorisées autour d'Apeiranthos, le Suzuki Jimny et le Dacia Duster sont le bon choix.",
          "Die Sandpisten rund um Alyko, der Küstenpfad südlich von Mikri Vigla und die unbefestigten Zufahrten zu den Kapellen sind von jedem Mietvertrag auf Naxos ausgeschlossen  -  auch bei ATV und Buggy. Halten Sie am ausgeschilderten Parkplatz und gehen Sie zu Fuß weiter. Für die legalen Bergpisten um Apeiranthos sind Suzuki Jimny und Dacia Duster die richtige Wahl.",
        ),
      },
    ],
  },
];

export const GUIDES = ALL_GUIDES;
export const GUIDES_BY_SLUG = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));

/**
 * Every guide is indexable. This used to be `GUIDES` minus a review set that was
 * seeded with the *same* slugs `GUIDES` was filtered to, so it always evaluated to
 * `[]` — which silently emptied the sitemap of all editorial content. Keep the two
 * exports distinct only if a genuine draft state is ever needed, and assert the
 * result is non-empty if so.
 */
export const INDEXABLE_GUIDES = GUIDES;
export const INDEXABLE_GUIDES_BY_SLUG = GUIDES_BY_SLUG;
