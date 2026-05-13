import type { Review } from "@/types/content";

const ls = (en: string, el?: string, it?: string, fr?: string, de?: string) => ({
  en, el: el ?? en, it: it ?? en, fr: fr ?? en, de: de ?? en,
});

export const REVIEWS: Review[] = [
  {
    author: "Sofia M.",
    rating: 5,
    date: "2025-08-12",
    source: "Google",
    body: ls(
      "Marios met us at the airport with a smile and the keys were in our hands within 5 minutes. Car was spotless and the price was exactly what we paid. Best rental experience in 10 years of Greek-island travel.",
      "Ο Μάριος μας περίμενε στο αεροδρόμιο. Πέντε λεπτά και είχαμε τα κλειδιά. Άριστη εμπειρία.",
      "Marios ci ha accolto in aeroporto, chiavi in 5 minuti. Migliore esperienza in 10 anni di Grecia.",
      "Marios nous a accueillis à l'aéroport en 5 min. Meilleure expérience en 10 ans en Grèce.",
      "Marios hat uns am Flughafen abgeholt, Schlüssel in 5 Minuten. Beste Erfahrung in 10 Jahren Griechenland.",
    ),
  },
  {
    author: "Daniel R.",
    rating: 5,
    date: "2025-07-28",
    source: "Google",
    body: ls(
      "Ria answered every WhatsApp in minutes and even rebooked our scooter when the ferry was late. Felt like dealing with friends, not a rental company. Highly recommended.",
      "Η Ρία απάντησε σε λεπτά. Νοιώσαμε σαν φίλους, όχι σαν πελάτες.",
      "Ria ha risposto in minuti. Come amici, non clienti.",
      "Ria a répondu en minutes. Comme des amis, pas une location.",
      "Ria antwortete in Minuten. Wie unter Freunden.",
    ),
  },
  {
    author: "Léa & Thomas",
    rating: 5,
    date: "2025-09-04",
    source: "Google",
    body: ls(
      "Booked the Fiat 500 Cabrio for the week. Car was perfect, drop-off at the port took 90 seconds. No drama, no extras forced on us. Will book again.",
      "Κλείσαμε Fiat 500 Cabrio. Παράδοση στο λιμάνι σε 90 δευτερόλεπτα.",
      "Prenotato Fiat 500 Cabrio. Restituzione al porto in 90 secondi.",
      "Réservé Fiat 500 Cabrio. Retour au port en 90 sec.",
      "Fiat 500 Cabrio gebucht. Rückgabe am Hafen in 90 Sek.",
    ),
  },
  {
    author: "Sebastian H.",
    rating: 5,
    date: "2025-06-22",
    source: "Google",
    body: ls(
      "Took the Suzuki Jimny up to the cave of Zeus. Owner explained which roads to avoid and gave us a fantastic itinerary on a paper map. Honest, family-run.",
      "Πήραμε το Jimny για τον Ζα. Ο ιδιοκτήτης μας έδωσε εξαιρετική διαδρομή.",
      "Preso il Jimny per la grotta di Zeus. Itinerario perfetto sulla mappa.",
      "Pris le Jimny pour la grotte de Zeus. Itinéraire parfait sur la carte.",
      "Den Jimny zur Zeus-Höhle gefahren. Tolle Routenempfehlung auf Karte.",
    ),
  },
  {
    author: "Anna K.",
    rating: 5,
    date: "2025-08-30",
    source: "Google",
    body: ls(
      "Three couples, three scooters, free helmets, free top-cases. Booked at midnight on WhatsApp the day before. Perfect.",
      "Τρία ζευγάρια, τρία μηχανάκια. WhatsApp στις 12 το βράδυ — όλα έτοιμα την επόμενη.",
      "Tre coppie, tre scooter. WhatsApp a mezzanotte e tutto pronto il giorno dopo.",
      "Trois couples, trois scooters. WhatsApp à minuit et prêt le lendemain.",
      "Drei Paare, drei Roller. Mitternachts WhatsApp — am nächsten Tag bereit.",
    ),
  },
];
