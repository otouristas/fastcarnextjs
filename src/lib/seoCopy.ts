import type { Locale } from "@/lib/site";

export interface SeoCopy { title: string; description: string; keywords?: string[] }
export type LocaleSeoCopy = Record<Locale, SeoCopy>;

export const SEO_COPY: Record<string, LocaleSeoCopy> = {
  home: {
    en: {
      title: "Naxos Car, Scooter, ATV & Buggy Rental | Free Airport Delivery",
      description: "Rent a car, scooter, ATV or buggy on Naxos with free delivery to the airport, port and your hotel. Transparent prices, unlimited km, owner-operated since 2018.",
      keywords: ["naxos car rental", "rent a car naxos", "scooter rental naxos", "atv rental naxos", "buggy rental naxos", "naxos airport pickup"],
    },
    el: {
      title: "Ενοικίαση Αυτοκινήτου, Μηχανής, ATV & Buggy στη Νάξο | Δωρεάν Παράδοση",
      description: "Νοικιάστε αυτοκίνητο, μηχανάκι, ATV ή buggy στη Νάξο με δωρεάν παράδοση σε αεροδρόμιο, λιμάνι και ξενοδοχείο. Διαφανείς τιμές, απεριόριστα χιλιόμετρα.",
      keywords: ["ενοικίαση αυτοκινήτου Νάξος", "rent a car Naxos", "ενοικίαση μηχανής Νάξος", "ATV Νάξος", "buggy Νάξος"],
    },
    it: {
      title: "Noleggio Auto, Scooter, ATV e Buggy a Naxos | Consegna Gratuita",
      description: "Noleggia auto, scooter, ATV o buggy a Naxos con consegna gratuita all'aeroporto, al porto e in hotel. Prezzi trasparenti, chilometri illimitati.",
      keywords: ["noleggio auto Naxos", "rent a car Naxos", "noleggio scooter Naxos", "noleggio ATV Naxos", "buggy Naxos"],
    },
    fr: {
      title: "Location Voiture, Scooter, ATV et Buggy à Naxos | Livraison Gratuite",
      description: "Louez voiture, scooter, ATV ou buggy à Naxos avec livraison gratuite à l'aéroport, au port et à l'hôtel. Prix transparents, kilométrage illimité.",
      keywords: ["location voiture Naxos", "rent a car Naxos", "location scooter Naxos", "location ATV Naxos", "buggy Naxos"],
    },
    de: {
      title: "Auto-, Roller-, ATV- & Buggy-Vermietung auf Naxos | Gratis Lieferung",
      description: "Mieten Sie Auto, Roller, ATV oder Buggy auf Naxos mit kostenloser Lieferung zu Flughafen, Hafen und Hotel. Transparente Preise, unbegrenzte Kilometer.",
      keywords: ["Autovermietung Naxos", "Mietwagen Naxos", "Rollervermietung Naxos", "ATV Naxos", "Buggy Naxos"],
    },
  },
  fleet: {
    en: { title: "Naxos Rental Fleet — Cars, Scooters, ATVs, Buggies", description: "Browse our full Naxos rental fleet: compact and family cars, automatics, scooters from 50cc, ATVs, Polaris buggies and motorbikes. Free delivery island-wide." },
    el: { title: "Στόλος Ενοικιάσεων Νάξου — Αυτοκίνητα, Μηχανές, ATV, Buggy", description: "Δείτε όλο τον στόλο μας στη Νάξο: μικρά και οικογενειακά αυτοκίνητα, αυτόματα, μηχανάκια από 50cc, ATV, Polaris buggy και μοτοσικλέτες. Δωρεάν παράδοση." },
    it: { title: "Flotta a Naxos — Auto, Scooter, ATV, Buggy", description: "Esplora la nostra flotta a Naxos: city car, automatiche, familiari, scooter da 50cc, ATV, buggy Polaris e moto. Consegna gratuita ovunque sull'isola." },
    fr: { title: "Flotte de Location Naxos — Voitures, Scooters, ATV, Buggies", description: "Découvrez toute notre flotte à Naxos : citadines, familiales, automatiques, scooters dès 50cc, ATV, buggys Polaris et motos. Livraison gratuite sur l'île." },
    de: { title: "Naxos Mietflotte — Autos, Roller, ATVs, Buggys", description: "Entdecken Sie unsere Naxos-Flotte: Kleinwagen, Familienautos, Automatik, Roller ab 50cc, ATVs, Polaris-Buggys und Motorräder. Inselweit kostenlose Lieferung." },
  },
  "fleet/cars": {
    en: { title: "Naxos Car Rental — Automatic, SUV, Family & Compact", description: "Rent automatic, family, compact and SUV cars on Naxos. Free airport, port and hotel delivery, unlimited km, basic CDW and second driver included.", keywords: ["naxos car rental", "automatic car rental naxos", "family car rental naxos", "suv rental naxos"] },
    el: { title: "Ενοικίαση Αυτοκινήτου Νάξος — Αυτόματα, SUV, Οικογενειακά", description: "Ενοικίαση αυτοκινήτου στη Νάξο: αυτόματα, οικογενειακά, μικρά και SUV. Δωρεάν παράδοση, απεριόριστα χιλιόμετρα και βασική ασφάλεια." },
    it: { title: "Noleggio Auto a Naxos — Automatiche, SUV, Familiari", description: "Noleggio auto a Naxos: automatiche, familiari, citadine e SUV. Consegna gratuita, chilometri illimitati e CDW base inclusa." },
    fr: { title: "Location Voiture Naxos — Automatique, SUV, Familiale", description: "Location de voitures à Naxos : automatiques, familiales, citadines et SUV. Livraison gratuite, kilométrage illimité, CDW de base incluse." },
    de: { title: "Autovermietung Naxos — Automatik, SUV, Familie & Kleinwagen", description: "Autovermietung auf Naxos: Automatik, Familien, Kleinwagen und SUVs. Kostenlose Lieferung, unbegrenzte Kilometer, Basis-CDW inklusive." },
  },
  "fleet/scooters": {
    en: { title: "Naxos Scooter Rental — 50cc to 200cc & Vespa", description: "Easy scooter rental on Naxos from 50cc to 200cc and classic Vespas. Free delivery to Chora, JNX airport, port and all beaches.", keywords: ["scooter rental naxos", "vespa naxos", "50cc naxos"] },
    el: { title: "Ενοικίαση Μηχανής Νάξος — 50cc έως 200cc & Vespa", description: "Εύκολη ενοικίαση μηχανής στη Νάξο από 50cc έως 200cc και κλασικές Vespa. Δωρεάν παράδοση σε Χώρα, αεροδρόμιο, λιμάνι και παραλίες." },
    it: { title: "Noleggio Scooter a Naxos — 50cc fino a 200cc e Vespa", description: "Noleggio scooter facile a Naxos da 50cc a 200cc e Vespa classiche. Consegna gratuita a Chora, aeroporto, porto e spiagge." },
    fr: { title: "Location Scooter Naxos — 50cc à 200cc & Vespa", description: "Location de scooter à Naxos de 50cc à 200cc et Vespa classiques. Livraison gratuite à Chora, aéroport, port et plages." },
    de: { title: "Rollervermietung Naxos — 50cc bis 200cc & Vespa", description: "Einfache Rollervermietung auf Naxos von 50cc bis 200cc und klassische Vespas. Kostenlose Lieferung nach Chora, Flughafen, Hafen und Strände." },
  },
  "fleet/atv-quad": {
    en: { title: "Naxos ATV & Quad Rental — 150cc to 800cc", description: "ATV and quad rental on Naxos from 150cc to 800cc. Stable, fun and great for beach roads. Free delivery and full safety briefing.", keywords: ["atv rental naxos", "quad rental naxos"] },
    el: { title: "Ενοικίαση ATV & Γουρούνας Νάξος — 150cc έως 800cc", description: "Ενοικίαση ATV και γουρούνας στη Νάξο από 150cc έως 800cc. Σταθερό, διασκεδαστικό, ιδανικό για παραλιακούς δρόμους." },
    it: { title: "Noleggio ATV e Quad a Naxos — 150cc fino a 800cc", description: "Noleggio ATV e quad a Naxos da 150cc a 800cc. Stabili, divertenti e perfetti per le strade verso le spiagge." },
    fr: { title: "Location ATV & Quad Naxos — 150cc à 800cc", description: "Location d'ATV et de quad à Naxos de 150cc à 800cc. Stables, fun et parfaits pour les routes de plage." },
    de: { title: "ATV & Quad Vermietung Naxos — 150cc bis 800cc", description: "ATV- und Quadvermietung auf Naxos von 150cc bis 800cc. Stabil, spaßig und ideal für Strandstraßen." },
  },
  "fleet/buggy": {
    en: { title: "Naxos Buggy Rental — Polaris 2 & 4 Seater", description: "Premium Polaris-style buggy rental on Naxos for the most memorable island drives: Alyko, Kastraki, Mikri Vigla and sunsets." },
    el: { title: "Ενοικίαση Buggy Νάξος — Polaris 2 & 4 θέσεων", description: "Premium ενοικίαση buggy Polaris στη Νάξο για αξέχαστες διαδρομές: Αλυκό, Καστράκι, Μικρή Βίγλα και ηλιοβασιλέματα." },
    it: { title: "Noleggio Buggy Naxos — Polaris 2 e 4 Posti", description: "Noleggio buggy Polaris a Naxos per le strade più memorabili dell'isola: Alyko, Kastraki, Mikri Vigla e tramonti." },
    fr: { title: "Location Buggy Naxos — Polaris 2 & 4 Places", description: "Location de buggy Polaris à Naxos pour des routes inoubliables : Alyko, Kastraki, Mikri Vigla et couchers de soleil." },
    de: { title: "Buggy-Vermietung Naxos — Polaris 2 & 4 Sitzer", description: "Premium Polaris-Buggy-Vermietung auf Naxos für unvergessliche Inselfahrten: Alyko, Kastraki, Mikri Vigla und Sonnenuntergänge." },
  },
  "fleet/motorbike": {
    en: { title: "Naxos Motorbike Rental — Touring & Adventure", description: "Motorbike rental on Naxos for confident riders. Touring and adventure options with local route tips and safety briefing." },
    el: { title: "Ενοικίαση Μοτοσικλέτας Νάξος — Touring & Adventure", description: "Ενοικίαση μοτοσικλέτας στη Νάξο για έμπειρους οδηγούς. Touring και adventure μοντέλα με τοπικές συμβουλές διαδρομής." },
    it: { title: "Noleggio Moto a Naxos — Touring e Adventure", description: "Noleggio moto a Naxos per motociclisti esperti. Opzioni touring e adventure con consigli sulle migliori strade." },
    fr: { title: "Location Moto Naxos — Touring & Adventure", description: "Location de moto à Naxos pour motards confirmés. Modèles touring et adventure avec conseils d'itinéraires locaux." },
    de: { title: "Motorradvermietung Naxos — Touring & Adventure", description: "Motorradvermietung auf Naxos für erfahrene Fahrer. Touring- und Adventure-Modelle mit lokalen Routen-Tipps." },
  },
  pricing: {
    en: { title: "Naxos Rental Prices — Transparent & All-Inclusive", description: "Live 2026 Naxos rental prices for cars, scooters, ATVs and buggies. Unlimited km, basic CDW, taxes, baby seat and second driver included." },
    el: { title: "Τιμές Ενοικίασης στη Νάξο — Διαφανείς & All-Inclusive", description: "Ενημερωμένες τιμές 2026 για αυτοκίνητα, μηχανές, ATV και buggy στη Νάξο. Απεριόριστα χιλιόμετρα, CDW, φόροι, παιδικό κάθισμα και 2ος οδηγός." },
    it: { title: "Prezzi Noleggio a Naxos — Trasparenti e All-Inclusive", description: "Prezzi aggiornati 2026 per auto, scooter, ATV e buggy a Naxos. Chilometri illimitati, CDW base, tasse, seggiolino e secondo guidatore inclusi." },
    fr: { title: "Tarifs Location Naxos — Transparents & Tout Inclus", description: "Tarifs Naxos 2026 pour voitures, scooters, ATV et buggys. Kilométrage illimité, CDW de base, taxes, siège bébé et second conducteur inclus." },
    de: { title: "Naxos Mietpreise — Transparent & All-Inclusive", description: "Aktuelle Preise 2026 für Autos, Roller, ATVs und Buggys auf Naxos. Unbegrenzte Kilometer, Basis-CDW, Steuern, Kindersitz und Zweitfahrer inklusive." },
  },
  insurance: {
    en: { title: "Naxos Rental Insurance — Basic, Full & Zero Excess CDW", description: "Compare Naxos rental insurance: Basic CDW (included), Full CDW (€150 excess) and Zero Excess CDW. What's covered, what's not, deposits explained." },
    el: { title: "Ασφάλεια Ενοικίασης Νάξος — Βασική, Πλήρης & Μηδενική Απαλλαγή", description: "Συγκρίνετε τα επίπεδα ασφάλειας στη Νάξο: Βασική CDW, Πλήρης CDW (€150) και Μηδενική Απαλλαγή. Τι καλύπτεται, τι όχι, εγγυήσεις." },
    it: { title: "Assicurazione Noleggio Naxos — Base, Full e Zero Franchigia", description: "Confronta i livelli di assicurazione a Naxos: CDW base, CDW Full (€150) e Zero Franchigia. Coperture, esclusioni e depositi." },
    fr: { title: "Assurance Location Naxos — Basique, Full & Sans Franchise", description: "Comparez les assurances à Naxos : CDW basique, CDW Full (€150) et Sans Franchise. Couvertures, exclusions et cautions expliquées." },
    de: { title: "Naxos Mietversicherung — Basis, Voll & Selbstbeteiligung Null", description: "Vergleichen Sie Versicherungsstufen auf Naxos: Basis-CDW, Voll-CDW (€150) und Null-Selbstbeteiligung. Inhalte, Ausschlüsse und Kautionen erklärt." },
  },
  faq: {
    en: { title: "Naxos Car Rental FAQ — 30+ Honest Answers (2026)", description: "30+ honest answers for renting on Naxos in 2026: licences, IDP, ages, insurance, deposits, automatic availability, ferry rules and more." },
    el: { title: "Συχνές Ερωτήσεις Ενοικίασης Νάξου — 30+ Ειλικρινείς Απαντήσεις (2026)", description: "30+ ειλικρινείς απαντήσεις για ενοικίαση στη Νάξο το 2026: διπλώματα, IDP, ηλικίες, ασφάλεια, εγγυήσεις, αυτόματα, κανόνες πλοίου." },
    it: { title: "FAQ Noleggio Naxos — 30+ Risposte Sincere (2026)", description: "30+ risposte sincere per noleggio a Naxos nel 2026: patenti, IDP, età, assicurazione, depositi, automatiche, traghetto e altro." },
    fr: { title: "FAQ Location Naxos — 30+ Réponses Honnêtes (2026)", description: "30+ réponses honnêtes pour la location à Naxos en 2026 : permis, IDP, âges, assurance, cautions, automatiques, ferry, etc." },
    de: { title: "Naxos Mietwagen FAQ — 30+ Ehrliche Antworten (2026)", description: "30+ ehrliche Antworten zur Anmietung auf Naxos 2026: Führerscheine, IDP, Alter, Versicherung, Kaution, Automatik, Fähre und mehr." },
  },
  guides: {
    en: { title: "Naxos Driving Guides — Road Trips, Routes & Local Tips", description: "Naxos driving guides updated for the 2026 traffic code: best road trips, mountain villages, beach drives, parking in Chora, ferry rules and safety tips." },
    el: { title: "Οδηγοί Οδήγησης Νάξου — Road Trip, Διαδρομές & Συμβουλές", description: "Οδηγοί οδήγησης Νάξου ενημερωμένοι για τον ΚΟΚ 2026: road trip, ορεινά χωριά, παραλίες, παρκάρισμα, κανόνες πλοίου." },
    it: { title: "Guide di Guida Naxos — Itinerari, Strade e Consigli", description: "Guide di guida Naxos aggiornate al codice della strada 2026: itinerari, villaggi di montagna, spiagge, parcheggi a Chora, traghetto." },
    fr: { title: "Guides de Conduite Naxos — Itinéraires, Routes & Astuces", description: "Guides de conduite Naxos mis à jour pour le code 2026 : road trips, villages, plages, stationnement à Chora et règles ferry." },
    de: { title: "Naxos Fahrtipps — Routen, Roadtrips & Lokale Hinweise", description: "Naxos-Fahrtipps aktualisiert für die Verkehrsregeln 2026: Roadtrips, Bergdörfer, Strandfahrten, Parken in Chora, Fährenregeln." },
  },
  locations: {
    en: { title: "Naxos Pickup Locations — Airport, Port, Beaches & Villages", description: "Where we deliver on Naxos: JNX airport, Naxos port, Chora, Agios Prokopios, Agia Anna, Plaka, Mikri Vigla, Apollonas, Filoti, Apeiranthos, Chalki, Stelida." },
    el: { title: "Σημεία Παράδοσης στη Νάξο — Αεροδρόμιο, Λιμάνι, Παραλίες, Χωριά", description: "Παραδίδουμε στη Νάξο: αεροδρόμιο JNX, λιμάνι, Χώρα, Άγιος Προκόπιος, Αγία Άννα, Πλάκα, Μικρή Βίγλα, Απόλλωνας, Φιλώτι, Απείρανθος, Χαλκί, Στελίδα." },
    it: { title: "Punti di Consegna a Naxos — Aeroporto, Porto, Spiagge e Villaggi", description: "Consegna a Naxos: aeroporto JNX, porto, Chora, Agios Prokopios, Agia Anna, Plaka, Mikri Vigla, Apollonas, Filoti, Apeiranthos, Chalki, Stelida." },
    fr: { title: "Lieux de Livraison à Naxos — Aéroport, Port, Plages et Villages", description: "Livraison à Naxos : aéroport JNX, port, Chora, Agios Prokopios, Agia Anna, Plaka, Mikri Vigla, Apollonas, Filoti, Apeiranthos, Chalki, Stelida." },
    de: { title: "Naxos Abholpunkte — Flughafen, Hafen, Strände & Dörfer", description: "Lieferung auf Naxos: Flughafen JNX, Hafen, Chora, Agios Prokopios, Agia Anna, Plaka, Mikri Vigla, Apollonas, Filoti, Apeiranthos, Chalki, Stelida." },
  },
  about: {
    en: { title: "About Fast Motor Rental Naxos — Owner-Operated since 2018", description: "Meet Marios and Ria. Family-run Naxos rental since 2018 with one office in Chora, transparent prices and 4.9★ Google rating." },
    el: { title: "Σχετικά με τη Fast Motor Rental Naxos — Από το 2018", description: "Γνωρίστε τον Μάριο και τη Ρία. Οικογενειακή ενοικίαση στη Νάξο από το 2018, με γραφείο στη Χώρα και βαθμολογία 4.9★." },
    it: { title: "Chi Siamo — Fast Motor Rental Naxos dal 2018", description: "Marios e Ria gestiscono direttamente il noleggio a Naxos dal 2018. Un ufficio a Chora, prezzi trasparenti, 4.9★ su Google." },
    fr: { title: "À Propos — Fast Motor Rental Naxos depuis 2018", description: "Marios et Ria gèrent eux-mêmes la location à Naxos depuis 2018. Un bureau à Chora, prix transparents, 4.9★ sur Google." },
    de: { title: "Über uns — Fast Motor Rental Naxos seit 2018", description: "Marios und Ria führen die Naxos-Vermietung selbst seit 2018. Ein Büro in Chora, transparente Preise, 4.9★ bei Google." },
  },
  contact: {
    en: { title: "Contact Fast Motor Rental Naxos — WhatsApp, Phone & Email", description: "Talk to a real human about your Naxos rental: WhatsApp in minutes, phone, email or visit our office in Chora. Open 08:00–22:00 daily." },
    el: { title: "Επικοινωνία Fast Motor Rental Naxos — WhatsApp, Τηλέφωνο, Email", description: "Επικοινωνήστε άμεσα: WhatsApp σε λεπτά, τηλέφωνο, email ή στο γραφείο μας στη Χώρα. Ανοιχτά 08:00–22:00 κάθε μέρα." },
    it: { title: "Contatti Fast Motor Rental Naxos — WhatsApp, Telefono, Email", description: "Parla con una persona vera: WhatsApp in pochi minuti, telefono, email o visita il nostro ufficio a Chora. Aperti 08:00–22:00." },
    fr: { title: "Contact Fast Motor Rental Naxos — WhatsApp, Téléphone, Email", description: "Parlez à un humain : WhatsApp en quelques minutes, téléphone, email ou venez à notre bureau à Chora. Ouvert 08h–22h." },
    de: { title: "Kontakt Fast Motor Rental Naxos — WhatsApp, Telefon, E-Mail", description: "Sprechen Sie mit einem Menschen: WhatsApp in Minuten, Telefon, E-Mail oder Büro in Chora. Geöffnet 08:00–22:00 täglich." },
  },
  terms: {
    en: { title: "Terms & Conditions — Fast Motor Rental Naxos", description: "Rental terms and conditions for Fast Motor Rental Naxos: driver requirements, insurance, cancellation, off-road, ferry, damage protocol." },
    el: { title: "Όροι & Προϋποθέσεις — Fast Motor Rental Naxos", description: "Όροι και προϋποθέσεις ενοικίασης: απαιτήσεις οδηγού, ασφάλεια, ακύρωση, εκτός δρόμου, πλοίο, πρωτόκολλο ζημιών." },
    it: { title: "Termini e Condizioni — Fast Motor Rental Naxos", description: "Termini di noleggio Fast Motor Rental Naxos: requisiti del conducente, assicurazione, cancellazione, off-road, traghetto, danni." },
    fr: { title: "Conditions Générales — Fast Motor Rental Naxos", description: "Conditions de location Fast Motor Rental Naxos : exigences conducteur, assurance, annulation, hors-route, ferry, protocole de dommages." },
    de: { title: "AGB — Fast Motor Rental Naxos", description: "Mietbedingungen Fast Motor Rental Naxos: Fahreranforderungen, Versicherung, Stornierung, Off-Road, Fähre, Schadenprotokoll." },
  },
  book: {
    en: { title: "Book Your Naxos Rental — Secure Online Booking", description: "Book your Naxos rental car, scooter, ATV or buggy on our secure engine, or ask Marios and Ria for a personal quote on WhatsApp." },
    el: { title: "Κράτηση στη Νάξο — Ασφαλές Online Σύστημα", description: "Κάντε κράτηση για αυτοκίνητο, μηχανάκι, ATV ή buggy στη Νάξο στο ασφαλές σύστημα ή ζητήστε προσφορά στο WhatsApp." },
    it: { title: "Prenota a Naxos — Prenotazione Sicura Online", description: "Prenota auto, scooter, ATV o buggy a Naxos sul nostro sistema sicuro o chiedi un preventivo personale su WhatsApp." },
    fr: { title: "Réserver à Naxos — Réservation Sécurisée en Ligne", description: "Réservez voiture, scooter, ATV ou buggy à Naxos sur notre moteur sécurisé ou demandez un devis personnalisé sur WhatsApp." },
    de: { title: "Buchen auf Naxos — Sichere Online-Buchung", description: "Buchen Sie Auto, Roller, ATV oder Buggy auf Naxos im sicheren System oder fragen Sie auf WhatsApp ein persönliches Angebot." },
  },
};
