import type { Locale } from "@/lib/site";

export interface SeoCopy { title: string; description: string; keywords?: string[] }
export type LocaleSeoCopy = Record<Locale, SeoCopy>;

export const SEO_COPY: Record<string, LocaleSeoCopy> = {
  home: {
    en: {
      title: "Rent a Car Naxos | Best Car Rental & Free Delivery",
      description: "Rent a car in Naxos with free airport, port, and hotel delivery. Best rates, unlimited km, automatic & manual cars. Family-run since 2018.",
      keywords: ["naxos car rental", "rent a car naxos", "best car rental naxos", "car hire naxos", "naxos airport car rental", "automatic car rental naxos"],
    },
    el: {
      title: "Ενοικίαση Αυτοκινήτου Νάξος | Rent a Car Naxos",
      description: "Ενοικίαση αυτοκινήτου στη Νάξο με δωρεάν παράδοση σε αεροδρόμιο, λιμάνι & ξενοδοχείο. Απεριόριστα χιλιόμετρα, αυτόματα & χειροκίνητα αυτοκίνητα.",
      keywords: ["ενοικίαση αυτοκινήτου Νάξος", "rent a car Naxos", "ενοικιάσεις αυτοκινήτων Νάξος", "αυτοκίνητα Νάξος"],
    },
    it: {
      title: "Noleggio Auto Naxos | Rent a Car Naxos",
      description: "Noleggio auto a Naxos con consegna gratuita in aeroporto, porto e hotel. Tariffe convenienti, km illimitati, cambi automatici e manuali.",
      keywords: ["noleggio auto Naxos", "rent a car Naxos", "noleggio auto aeroporto Naxos"],
    },
    fr: {
      title: "Location Voiture Naxos | Rent a Car Naxos",
      description: "Location de voiture à Naxos avec livraison gratuite à l'aéroport, au port et aux hôtels. Km illimités, boîte automatique et manuelle.",
      keywords: ["location voiture Naxos", "rent a car Naxos", "louer voiture Naxos"],
    },
    de: {
      title: "Autovermietung Naxos | Mietwagen Naxos",
      description: "Mietwagen auf Naxos mit kostenloser Lieferung zu Flughafen, Hafen und Hotel. Günstige Preise, unbegrenzte Kilometer, Automatik & Manuell.",
      keywords: ["Autovermietung Naxos", "Mietwagen Naxos", "Auto mieten Naxos"],
    },
  },
  fleet: {
    en: { title: "Naxos Car Rental Fleet - SUVs, Automatics & Compacts", description: "Browse our Naxos car rental fleet: compact hatchbacks, automatics, family SUVs, and 7-seater vans. Free airport, port, and hotel delivery." },
    el: { title: "Στόλος Ενοικιάσεων Αυτοκινήτων στη Νάξο | FMR Naxos", description: "Δείτε τον στόλο αυτοκινήτων μας στη Νάξο: μικρά, αυτόματα, SUV και 7-θέσια van. Δωρεάν παράδοση σε αεροδρόμιο, λιμάνι και ξενοδοχεία." },
    it: { title: "Flotta Noleggio Auto Naxos - FMR Car Rental", description: "La nostra flotta auto a Naxos: city car, automatiche, berline, SUV e van a 7 posti. Consegna gratuita ad aeroporto, porto e hotel." },
    fr: { title: "Flotte de Location Voiture Naxos - FMR Naxos", description: "Découvrez notre flotte de voitures à Naxos : citadines, automatiques, SUV et monospaces 7 places. Livraison gratuite sur toute l'île." },
    de: { title: "Mietwagenflotte Naxos - FMR Autovermietung", description: "Entdecken Sie unsere Mietwagenflotte auf Naxos: Kleinwagen, Automatikautos, SUVs und 7-Sitzer Familienvans. Kostenlose Lieferung." },
  },
  "fleet/cars": {
    en: { title: "Rent a Car Naxos - Automatic, SUV, Family & Compact", description: "Rent automatic, family, compact, and SUV cars on Naxos. Free delivery to airport, port & hotels, unlimited km, CDW insurance included.", keywords: ["naxos car rental", "automatic car rental naxos", "family car rental naxos", "suv rental naxos"] },
    el: { title: "Ενοικίαση Αυτοκινήτου Νάξος - Αυτόματα, SUV & Van", description: "Ενοικίαση αυτοκινήτου στη Νάξο: αυτόματα, οικογενειακά, μικρά και SUV. Δωρεάν παράδοση, απεριόριστα χιλιόμετρα και βασική ασφάλεια." },
    it: { title: "Noleggio Auto a Naxos - Automatiche, SUV e Compatte", description: "Noleggio auto a Naxos: automatiche, familiari, citadine e SUV. Consegna gratuita, chilometri illimitati e CDW base inclusa." },
    fr: { title: "Location Voiture Naxos - Automatiques, SUV & Vans", description: "Location de voitures à Naxos : automatiques, familiales, citadines et SUV. Livraison gratuite, kilométrage illimité, CDW de base incluse." },
    de: { title: "Autovermietung Naxos - Automatik, SUV & Kleinwagen", description: "Autovermietung auf Naxos: Automatik, Familien, Kleinwagen und SUVs. Kostenlose Lieferung, unbegrenzte Kilometer, Basis-CDW inklusive." },
  },
  pricing: {
    en: { title: "Naxos Car Rental Prices - Transparent & All-Inclusive", description: "Live 2026 Naxos car rental prices for economy, compact, SUVs, and automatic cars. Unlimited km, basic CDW, taxes, and second driver included." },
    el: { title: "Τιμές Ενοικίασης Αυτοκινήτων στη Νάξο - Διαφανείς & All-Inclusive", description: "Ενημερωμένες τιμές 2026 για ενοικίαση αυτοκινήτου στη Νάξο. Απεριόριστα χιλιόμετρα, CDW, φόροι, παιδικό κάθισμα και 2ος οδηγός." },
    it: { title: "Prezzi Noleggio Auto Naxos - Trasparenti e All-Inclusive", description: "Prezzi aggiornati 2026 per noleggio auto a Naxos. Chilometri illimitati, CDW base, tasse, seggiolino e secondo guidatore inclusi." },
    fr: { title: "Tarifs Location Voiture Naxos - Transparents & Tout Inclus", description: "Tarifs de location de voiture Naxos 2026. Kilométrage illimité, CDW de base, taxes, siège bébé et second conducteur inclus." },
    de: { title: "Mietwagen Preise Naxos - Transparent & All-Inclusive", description: "Aktuelle Preise 2026 für Mietwagen auf Naxos. Unbegrenzte Kilometer, Basis-CDW, Steuern, Kindersitz und Zweitfahrer inklusive." },
  },
  insurance: {
    en: { title: "Naxos Car Rental Insurance - Basic, Full & Zero Excess CDW", description: "Compare Naxos car rental insurance options: Basic CDW (included), Full CDW (€150 excess) and Zero Excess CDW. Learn what's covered, deposits, and coverages." },
    el: { title: "Ασφάλεια Ενοικίασης Αυτοκινήτου Νάξος - Βασική, Πλήρης & Μηδενική", description: "Συγκρίνετε τα επίπεδα ασφάλειας ενοικίασης αυτοκινήτου στη Νάξο: Βασική CDW, Πλήρης CDW (€150) και Μηδενική Απαλλαγή." },
    it: { title: "Assicurazione Noleggio Auto Naxos - Base, Full e Zero Franchigia", description: "Confronta i livelli di assicurazione per noleggio auto a Naxos: CDW base, CDW Full (€150) e Zero Franchigia. Coperture e depositi." },
    fr: { title: "Assurance Location Voiture Naxos - Basique, Full & Sans Franchise", description: "Comparez les assurances auto à Naxos : CDW basique, CDW Full (€150) et Sans Franchise. Couvertures, exclusions et cautions." },
    de: { title: "Mietwagen Versicherung Naxos - Basis, Voll & Selbstbeteiligung Null", description: "Vergleichen Sie Versicherungsstufen für Mietwagen auf Naxos: Basis-CDW, Voll-CDW und Null-Selbstbeteiligung." },
  },
  faq: {
    en: { title: "Naxos Car Rental FAQ - 30+ Honest Answers (2026)", description: "30+ honest answers for renting a car on Naxos in 2026: driver licences, IDP, minimum age, insurance, deposits, automatic cars availability, and ferry rules." },
    el: { title: "Συχνές Ερωτήσεις Ενοικίασης Αυτοκινήτου στη Νάξο (2026)", description: "30+ ειλικρινείς απαντήσεις για ενοικίαση αυτοκινήτου στη Νάξο το 2026: διπλώματα, ηλικίες, ασφάλεια, εγγυήσεις, αυτόματα, πλοία." },
    it: { title: "FAQ Noleggio Auto Naxos - Risposte Sincere (2026)", description: "Risposte sincere per noleggiare un'auto a Naxos nel 2026: patenti, età, assicurazione, depositi, cambio automatico e traghetto." },
    fr: { title: "FAQ Location Voiture Naxos - Réponses Honnêtes (2026)", description: "Réponses honnêtes pour la location de voiture à Naxos en 2026 : permis, âges, assurance, cautions, boîte automatique, ferry, etc." },
    de: { title: "Naxos Mietwagen FAQ - 30+ Ehrliche Antworten (2026)", description: "Ehrliche Antworten zur Anmietung eines Autos auf Naxos 2026: Führerscheine, Alter, Versicherung, Kaution, Automatik, Fähre." },
  },
  guides: {
    en: { title: "Naxos Driving Guides - Road Trips, Routes & Local Tips", description: "Naxos car driving guides updated for 2026: best scenic road trips, mountain villages, beach route guides, parking in Chora, and traffic rules." },
    el: { title: "Οδηγοί Οδήγησης στη Νάξο - Road Trip, Διαδρομές & Συμβουλές", description: "Οδηγοί οδήγησης αυτοκινήτου στη Νάξο: road trip, ορεινά χωριά, παραλίες, παρκάρισμα, κανόνες." },
    it: { title: "Guide di Guida Naxos - Itinerari Auto, Strade e Consigli", description: "Guide di guida a Naxos in auto: itinerari, villaggi di montagna, spiagge, parcheggi a Chora, regole stradali." },
    fr: { title: "Guides de Conduite Naxos - Itinéraires, Routes & Astuces", description: "Guides de conduite voiture à Naxos : road trips, villages, plages, stationnement à Chora et règles de circulation." },
    de: { title: "Naxos Fahrtipps - Routen, Roadtrips & Lokale Hinweise", description: "Naxos-Mietwagen Fahrtipps: Roadtrips, Bergdörfer, Strandfahrten, Parken in Chora und Verkehrsregeln." },
  },
  locations: {
    en: { title: "Naxos Car Rental Pickup Locations - Airport, Port, Hotels & Villages", description: "Where we deliver rental cars on Naxos: JNX airport, Naxos port, Chora, Agios Prokopios, Agia Anna, Plaka, Mikri Vigla, Filoti, Chalki, Stelida, and your hotel." },
    el: { title: "Σημεία Παράδοσης Αυτοκινήτων στη Νάξο - Αεροδρόμιο, Λιμάνι, Ξενοδοχεία", description: "Παραδίδουμε αυτοκίνητα στη Νάξο: αεροδρόμιο JNX, λιμάνι, Χώρα, Άγιος Προκόπιος, Αγία Άννα, Πλάκα, Μικρή Βίγλα, ξενοδοχεία." },
    it: { title: "Punti di Consegna Auto Naxos - Aeroporto, Porto, Hotel e Villaggi", description: "Consegna auto a Naxos: aeroporto JNX, porto, Chora, Agios Prokopios, Agia Anna, Plaka, Mikri Vigla, hotel." },
    fr: { title: "Lieux de Livraison Voiture Naxos - Aéroport, Port, Hôtels", description: "Où nous livrons votre voiture de location à Naxos : aéroport JNX, port, Chora, Agios Prokopios, Plaka, hôtels." },
    de: { title: "Naxos Mietwagen Abholpunkte - Flughafen, Hafen, Hotels & Dörfer", description: "Lieferung von Mietwagen auf Naxos: Flughafen JNX, Hafen, Chora, Agios Prokopios, Plaka, Hotels." },
  },
  about: {
    en: { title: "About Fast Motor Rental Naxos - Family Car Rental since 2018", description: "Meet Marios and Ria. Family-run Naxos car rental since 2018 with office in Chora, transparent all-inclusive prices, and 4.9★ Google rating." },
    el: { title: "Σχετικά με τη Fast Motor Rental Naxos - Από το 2018", description: "Γνωρίστε τον Μάριο και τη Ρία. Οικογενειακή ενοικίαση αυτοκινήτων στη Νάξο από το 2018, με γραφείο στη Χώρα και βαθμολογία 4.9★." },
    it: { title: "Chi Siamo - Fast Motor Rental Naxos dal 2018", description: "Marios e Ria gestiscono direttamente il noleggio auto a Naxos dal 2018. Ufficio a Chora, prezzi trasparenti, 4.9★ su Google." },
    fr: { title: "À Propos - Fast Motor Rental Naxos depuis 2018", description: "Marios et Ria gèrent eux-mêmes la location de voiture à Naxos depuis 2018. Bureau à Chora, prix transparents, 4.9★ sur Google." },
    de: { title: "Über uns - Fast Motor Rental Naxos seit 2018", description: "Marios und Ria führen die Naxos-Autovermietung selbst seit 2018. Büro in Chora, transparente Preise, 4.9★ bei Google." },
  },
  contact: {
    en: { title: "Contact Fast Motor Rental Naxos - Rent a Car Support", description: "Talk to Marios and Ria about your Naxos car rental: WhatsApp in minutes, phone support, email, or visit our office in Chora. Open 08:00–22:00 daily." },
    el: { title: "Επικοινωνία Fast Motor Rental Naxos - Υποστήριξη Ενοικίασης", description: "Επικοινωνήστε άμεσα για το αυτοκίνητό σας: WhatsApp σε λεπτά, τηλέφωνο, email ή στο γραφείο μας στη Χώρα." },
    it: { title: "Contatti Fast Motor Rental Naxos - Supporto Noleggio Auto", description: "Parla con noi per il tuo noleggio auto a Naxos: WhatsApp in pochi minuti, telefono, email o in ufficio." },
    fr: { title: "Contact Fast Motor Rental Naxos - Support Location Voiture", description: "Parlez à un humain pour votre location de voiture à Naxos : WhatsApp, téléphone, email ou venez à notre bureau." },
    de: { title: "Kontakt Fast Motor Rental Naxos - Mietwagen Kundenservice", description: "Sprechen Sie mit uns über Ihren Mietwagen auf Naxos: WhatsApp in Minuten, Telefon, E-Mail oder Büro." },
  },
  terms: {
    en: { title: "Terms & Conditions - Fast Motor Rental Naxos", description: "Car rental terms and conditions: driver requirements, driving licenses, cancellation policy, unpaved off-road rules, ferry transport, and damage protocols." },
    el: { title: "Όροι & Προϋποθέσεις - Fast Motor Rental Naxos", description: "Όροι και προϋποθέσεις ενοικίασης αυτοκινήτου: απαιτήσεις οδηγού, ασφάλεια, ακύρωση, χωματόδρομοι, πλοία." },
    it: { title: "Termini e Condizioni - Fast Motor Rental Naxos", description: "Termini di noleggio auto: requisiti conducente, patente, cancellazione, sterrato, trasporto su traghetto, protocollo danni." },
    fr: { title: "Conditions Générales - Fast Motor Rental Naxos", description: "Conditions de location de voiture : exigences conducteur, permis, annulation, pistes non asphaltées, ferry, protocole de dommages." },
    de: { title: "Mietbedingungen - Fast Motor Rental Naxos", description: "Mietwagenbedingungen: Fahreranforderungen, Führerschein, Stornierung, unbefestigte Straßen, Fährentransport." },
  },
  book: {
    en: { title: "Book Your Car in Naxos - Secure Online Booking Engine", description: "Book your Naxos rental car on our secure online booking engine, or get a personal quote from Marios and Ria via WhatsApp." },
    el: { title: "Κράτηση Αυτοκινήτου στη Νάξο - Ασφαλές Online Σύστημα", description: "Κάντε κράτηση για αυτοκίνητο στη Νάξο στο ασφαλές σύστημα ή ζητήστε προσφορά στο WhatsApp." },
    it: { title: "Prenota Auto a Naxos - Prenotazione Sicura Online", description: "Prenota il tuo veicolo a Naxos sul nostro motore sicuro o chiedi un preventivo personalizzato su WhatsApp." },
    fr: { title: "Réserver Voiture à Naxos - Réservation Sécurisée en Ligne", description: "Réservez votre voiture de location à Naxos sur notre moteur de réservation sécurisé ou sur WhatsApp." },
    de: { title: "Mietwagen Buchen Naxos - Sichere Online-Buchung", description: "Buchen Sie Ihr Auto auf Naxos über unsere sichere Buchungsmaschine oder fragen Sie ein Angebot via WhatsApp an." },
  },
};
