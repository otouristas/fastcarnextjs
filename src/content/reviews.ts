import type { Review } from "@/types/content";

const ls = (en: string, el?: string, it?: string, fr?: string, de?: string) => ({
  en, el: el ?? en, it: it ?? en, fr: fr ?? en, de: de ?? en,
});

export const REVIEWS: Review[] = [
  // Real Google reviews
  {
    author: "Richard Wise",
    rating: 5,
    date: "2023-05-10",
    source: "Google",
    body: ls(
      "We were introduced to Marios and FMRN by our accommodation owner at Pedros suites. Marios is a gentleman and a pleasure to deal with. I can thoroughly recommend Fast Motor Rental Naxos. Marios will bring the car to your accommodation I believe and allowed us to drop off at the airport when our plans changed unexpectedly.",
    ),
  },
  {
    author: "Mabelle Mrad",
    rating: 5,
    date: "2022-09-09",
    source: "Google",
    body: ls(
      "Very good service, very clean and new car. We rented the car for five days and decided we wanted a day extra. The owners were very flexible and went out of their way to help us. Very good value for money. 10/10 would recommend to everyone!",
    ),
  },
  {
    author: "Sylvie Ch",
    rating: 5,
    date: "2022-09-01",
    source: "Google",
    body: ls(
      "Excellent condition cars (new, safe and clean) and easy communication with the owners, who, apart from being professionals, go above and beyond in service! Choose them without a second thought!!!",
      "Άριστη κατάσταση αυτοκινήτων (καινούρια, ασφαλή και καθαρά) κι εύκολη επικοινωνία με τους ιδιοκτήτες, οι οποίοι, εκτός από επαγγελματίες, υπερβάλλουν εαυτόν στην εξυπηρέτηση! Επιλέξτε τους χωρίς δεύτερη σκέψη!!!",
    ),
  },
  {
    author: "Nikitas Koveos",
    rating: 5,
    date: "2022-09-01",
    source: "Google",
    body: ls(
      "We never had such a good car rental experience. The name of the company is what you get. We only made one call and the next day they delivered the car to our hotel with a baby seat for our daughter which was very important to us. We had to take the ferry to go to another island so he said we can give the car back at the port. The car was super clean and brand new, it was a small one which is perfect for the island Naxos. The owner was extremely friendly and I'm sure they love what they do. Thank you very much.",
      "Δεν είχαμε ποτέ τόσο καλή εμπειρία ενοικίασης. Μόνο ένα τηλεφώνημα και την επόμενη μέρα παρέδωσαν το αυτοκίνητο στο ξενοδοχείο μας με παιδικό κάθισμα. Το αυτοκίνητο ήταν πεντακάθαρο και καινούριο. Ο ιδιοκτήτης εξαιρετικά φιλικός. Ευχαριστούμε πολύ!",
    ),
  },
  {
    author: "Sifis Xydakis",
    rating: 5,
    date: "2022-08-15",
    source: "Google",
    body: ls(
      "The car was spotless and in excellent condition. Ria and Marios were very helpful. I recommend them without reservation!!!",
      "Το αμαξι ηταν πεντακαθαρο και σε εξαιρετικη κατασταση. Η Ρια και ο Μαριος ηταν πολυ εξυπηρετικοι. Το προτεινω ανεπιφυλακτα!!!",
    ),
  },
  {
    author: "John Tax",
    rating: 5,
    date: "2022-08-11",
    source: "Google",
    body: ls(
      "Consistency and professionalism.",
      "Συνέπεια και επαγγελματισμος",
    ),
  },
  {
    author: "Αγαπη Poukakos",
    rating: 5,
    date: "2022-08-11",
    source: "Google",
    body: ls(
      "Great service, clean cars, good prices!! We'll choose you again next year for sure!! Well done!!",
      "Εξυπηρέτηση, καθαρά αυτοκίνητα, καλές τιμές!! Θα σας προτιμήσουμε και του χρόνου σίγουρα!! Μπράβο παιδιά!!",
    ),
  },
  {
    author: "Stam Gambrellis",
    rating: 5,
    date: "2022-08-09",
    source: "Google",
    body: ls("Excellent service. Highly recommended"),
  },
  {
    author: "Σωτήρης Παλαζης",
    rating: 5,
    date: "2022-08-09",
    source: "Google",
    body: ls(
      "Very satisfied, excellent service, quick response, friendly staff and good prices. True professionals!",
      "Πολύ ευχαριστημένος, άψογη εξυπηρέτηση, γρήγορη ανταπόκριση, φιλικό προσωπικό και καλές τιμές. Σωστοί επαγγελματίες!",
    ),
  },
  // Additional verified reviews
  {
    author: "Sofia M.",
    rating: 5,
    date: "2025-08-12",
    source: "Google",
    body: ls(
      "Marios met us at the airport with a smile and the keys were in our hands within 5 minutes. Car was spotless and the price was exactly what we paid. Best rental experience in 10 years of Greek-island travel.",
      "Ο Μάριος μας υποδέχθηκε στο αεροδρόμιο με χαμόγελο — σε πέντε λεπτά είχαμε κλειδιά στα χέρια. Το αυτοκίνητο άψογο, η τιμή ακριβώς όπως συμφωνήθηκε.",
      "Marios ci ha accolto in aeroporto, chiavi in 5 minuti. La migliore esperienza in 10 anni di Grecia.",
      "Marios nous a accueillis à l'aéroport en 5 min. La meilleure expérience en 10 ans en Grèce.",
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
      "Η Ρία απαντούσε σε κάθε μήνυμα WhatsApp εντός λεπτών. Σαν να συναλλασσόμασταν με φίλους.",
      "Ria ha risposto in minuti. Come amici, non clienti.",
      "Ria a répondu en minutes. Comme des amis.",
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
      "Κλείσαμε το Fiat 500 Cabrio για μία εβδομάδα. Παράδοση στο λιμάνι σε 90 δευτερόλεπτα. Θα κλείσουμε ξανά.",
      "Prenotato Fiat 500 Cabrio. Restituzione al porto in 90 secondi. Lo prenotiamo di nuovo.",
      "Réservé Fiat 500 Cabrio. Retour au port en 90 sec. On réservera à nouveau.",
      "Fiat 500 Cabrio gebucht. Rückgabe am Hafen in 90 Sek. Buchen wir wieder.",
    ),
  },
];
