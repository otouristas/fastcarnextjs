import type { Locale } from "@/lib/site";

export type LocalizedString = Record<Locale, string>;

const ls = (en: string, el?: string, it?: string, fr?: string, de?: string): LocalizedString => ({
  en,
  el: el ?? en,
  it: it ?? en,
  fr: fr ?? en,
  de: de ?? en,
});

export interface TermClause {
  number: number;
  title: LocalizedString;
  body: LocalizedString;
}

// ─── Rental Terms & Conditions (the 14 clauses, customer-provided) ───────────
export const TERMS: TermClause[] = [
  {
    number: 1,
    title: ls(
      "Age of drivers",
      "Ηλικία οδηγών",
      "Età dei conducenti",
      "Âge des conducteurs",
      "Alter der Fahrer",
    ),
    body: ls(
      "Drivers must be over 23 years old.",
      "Οι οδηγοί πρέπει να είναι άνω των 23 ετών.",
      "I conducenti devono avere più di 23 anni.",
      "Les conducteurs doivent avoir plus de 23 ans.",
      "Fahrer müssen über 23 Jahre alt sein.",
    ),
  },
  {
    number: 2,
    title: ls(
      "Driver's licence",
      "Άδεια οδήγησης",
      "Patente di guida",
      "Permis de conduire",
      "Führerschein",
    ),
    body: ls(
      "The driver's licence must be valid for at least one year. For some countries which are not members of the European Union, the International Driving Permit (IDP) is mandatory.",
      "Η άδεια οδήγησης πρέπει να είναι σε ισχύ για τουλάχιστον ένα έτος. Για ορισμένες χώρες εκτός Ευρωπαϊκής Ένωσης απαιτείται υποχρεωτικά Διεθνής Άδεια Οδήγησης (IDP).",
      "La patente di guida deve essere valida da almeno un anno. Per alcuni paesi non membri dell'Unione Europea è obbligatoria la patente internazionale (IDP).",
      "Le permis doit être valide depuis au moins un an. Pour certains pays hors UE, le permis international (IDP) est obligatoire.",
      "Der Führerschein muss seit mindestens einem Jahr gültig sein. Für einige Länder außerhalb der EU ist der internationale Führerschein (IDP) Pflicht.",
    ),
  },
  {
    number: 3,
    title: ls(
      "Guarantee",
      "Εγγύηση",
      "Garanzia",
      "Caution",
      "Kaution",
    ),
    body: ls(
      "A credit card is mandatory for car rental (it is not charged). We accept Visa or Mastercard.",
      "Η πιστωτική κάρτα είναι υποχρεωτική για την ενοικίαση οχήματος (δεν χρεώνεται). Δεχόμαστε Visa ή Mastercard.",
      "La carta di credito è obbligatoria per il noleggio (non viene addebitata). Accettiamo Visa o Mastercard.",
      "Une carte de crédit est obligatoire pour la location (non débitée). Visa ou Mastercard acceptées.",
      "Eine Kreditkarte ist für die Anmietung erforderlich (wird nicht belastet). Wir akzeptieren Visa oder Mastercard.",
    ),
  },
  {
    number: 4,
    title: ls(
      "Payment",
      "Πληρωμή",
      "Pagamento",
      "Paiement",
      "Zahlung",
    ),
    body: ls(
      "Payment is possible by card or cash upon receipt of the vehicle.",
      "Η πληρωμή πραγματοποιείται με κάρτα ή μετρητά κατά την παραλαβή του οχήματος.",
      "Pagamento possibile con carta o in contanti al ritiro.",
      "Paiement possible par carte ou en espèces à la prise du véhicule.",
      "Zahlung per Karte oder bar bei Übergabe möglich.",
    ),
  },
  {
    number: 5,
    title: ls(
      "Extra insurance options",
      "Επιπλέον ασφαλιστικές επιλογές",
      "Opzioni assicurative aggiuntive",
      "Options d'assurance supplémentaires",
      "Zusätzliche Versicherungsoptionen",
    ),
    body: ls(
      "Extra CDW and LDW coverage is offered at an additional cost. All vehicles are insured for third parties.",
      "Διατίθεται επιπλέον κάλυψη CDW και LDW με πρόσθετη χρέωση. Όλα τα οχήματα ασφαλίζονται έναντι τρίτων.",
      "CDW e LDW aggiuntive disponibili con sovrapprezzo. Tutti i veicoli sono assicurati verso terzi.",
      "CDW et LDW supplémentaires disponibles en option payante. Tous les véhicules sont assurés au tiers.",
      "Zusätzliche CDW- und LDW-Deckung gegen Aufpreis erhältlich. Alle Fahrzeuge sind haftpflichtversichert.",
    ),
  },
  {
    number: 6,
    title: ls(
      "Insurance exceptions",
      "Εξαιρέσεις ασφάλισης",
      "Esclusioni assicurative",
      "Exclusions d'assurance",
      "Versicherungsausschlüsse",
    ),
    body: ls(
      "Insurance does not apply if the driver is under the influence of alcohol or drugs, if the driver violates the rules of the Highway Code (K.O.K.), or if the driver leads the vehicle into unsafe, inaccessible or dangerous terrain (swampy areas, rocky tracks, sandy beaches, etc.).",
      "Η ασφάλιση δεν ισχύει εάν ο οδηγός βρίσκεται υπό την επήρεια αλκοόλ ή ουσιών, παραβιάζει τον Κ.Ο.Κ., ή οδηγεί το όχημα σε μη ασφαλές, απρόσιτο ή επικίνδυνο έδαφος (έλη, βραχώδη μονοπάτια, αμμώδεις παραλίες κ.λπ.).",
      "L'assicurazione decade se il conducente è sotto l'effetto di alcol o droghe, viola il codice della strada, o porta il veicolo in terreni non sicuri, inaccessibili o pericolosi (paludi, sentieri rocciosi, spiagge sabbiose, ecc.).",
      "L'assurance ne s'applique pas si le conducteur est sous l'influence d'alcool ou de drogues, enfreint le code de la route, ou conduit le véhicule sur un terrain dangereux ou inaccessible (zones marécageuses, pistes rocheuses, plages de sable, etc.).",
      "Die Versicherung greift nicht, wenn der Fahrer unter Alkohol- oder Drogeneinfluss steht, gegen die Straßenverkehrsordnung verstößt oder das Fahrzeug in unsicheres, unzugängliches oder gefährliches Gelände führt (Sumpf, Felspisten, Sandstrände usw.).",
    ),
  },
  {
    number: 7,
    title: ls(
      "Accident or problem",
      "Ατύχημα ή άλλο πρόβλημα",
      "Incidente o problema",
      "Accident ou incident",
      "Unfall oder Problem",
    ),
    body: ls(
      "In case of an accident or any other problem, call our office immediately.",
      "Σε περίπτωση ατυχήματος ή άλλου προβλήματος, καλέστε άμεσα το γραφείο μας.",
      "In caso di incidente o di qualsiasi altro problema, chiama immediatamente il nostro ufficio.",
      "En cas d'accident ou de tout autre problème, appelez immédiatement notre bureau.",
      "Bei einem Unfall oder anderen Problemen rufen Sie unverzüglich unser Büro an.",
    ),
  },
  {
    number: 8,
    title: ls(
      "Traffic fines",
      "Κλήσεις τροχαίας",
      "Multe",
      "Amendes",
      "Verkehrsstrafen",
    ),
    body: ls(
      "All tickets are paid by the renter responsible for each vehicle.",
      "Όλες οι κλήσεις βαρύνουν τον υπεύθυνο ενοικιαστή του εκάστοτε οχήματος.",
      "Tutte le multe sono a carico del noleggiatore responsabile del veicolo.",
      "Toutes les amendes sont à la charge du locataire responsable du véhicule.",
      "Alle Bußgelder zahlt der jeweils verantwortliche Mieter des Fahrzeugs.",
    ),
  },
  {
    number: 9,
    title: ls(
      "Parking",
      "Στάθμευση",
      "Parcheggio",
      "Stationnement",
      "Parken",
    ),
    body: ls(
      "Parking is allowed only in designated parking areas.",
      "Η στάθμευση επιτρέπεται μόνο σε ειδικά διαμορφωμένους χώρους.",
      "Il parcheggio è consentito solo nelle aree di sosta autorizzate.",
      "Le stationnement n'est autorisé que dans les zones prévues.",
      "Parken ist nur auf ausgewiesenen Flächen erlaubt.",
    ),
  },
  {
    number: 10,
    title: ls(
      "Vehicle drop-off",
      "Επιστροφή οχήματος",
      "Riconsegna del veicolo",
      "Restitution du véhicule",
      "Fahrzeugrückgabe",
    ),
    body: ls(
      "The tenant is obliged to return the vehicle on the agreed day, time and place stated in the contract. The car must be returned in the same condition inside and out as at delivery. A delay of up to 30 minutes from the agreed delivery time is tolerated. Beyond that, an extra charge applies depending on the length of the delay.",
      "Ο ενοικιαστής υποχρεούται να επιστρέψει το όχημα την ημέρα, ώρα και τόπο που αναφέρονται στο συμβόλαιο. Το αυτοκίνητο πρέπει να επιστραφεί στην ίδια κατάσταση εσωτερικά και εξωτερικά όπως κατά την παράδοση. Επιτρέπεται καθυστέρηση έως 30 λεπτά από τη συμφωνημένη ώρα παράδοσης. Πέραν αυτής, ισχύει επιπλέον χρέωση ανάλογα με τη διάρκεια της καθυστέρησης.",
      "Il noleggiatore deve restituire il veicolo nel giorno, ora e luogo indicati nel contratto. Il veicolo deve essere riconsegnato nelle stesse condizioni interne ed esterne della consegna. È tollerato un ritardo fino a 30 minuti dall'orario concordato. Oltre, viene applicato un sovrapprezzo in base alla durata del ritardo.",
      "Le locataire doit restituer le véhicule au jour, heure et lieu indiqués au contrat, dans le même état intérieur et extérieur. Un retard de 30 minutes est toléré au-delà de l'heure convenue. Au-delà, des frais supplémentaires s'appliquent selon la durée du retard.",
      "Der Mieter muss das Fahrzeug am vereinbarten Tag, zur vereinbarten Zeit und am vereinbarten Ort gemäß Vertrag zurückgeben — in gleichem Zustand innen und außen wie bei Übergabe. Eine Verspätung bis 30 Minuten ist tolerierbar. Darüber hinaus fällt je nach Dauer ein Aufpreis an.",
    ),
  },
  {
    number: 11,
    title: ls(
      "Fuel",
      "Καύσιμο",
      "Carburante",
      "Carburant",
      "Kraftstoff",
    ),
    body: ls(
      "The vehicle must be returned with the same quantity of fuel as at delivery. There is no compensation for fuel that was not consumed.",
      "Το όχημα επιστρέφεται με την ίδια ποσότητα καυσίμου που παραλήφθηκε. Δεν προβλέπεται αποζημίωση για καύσιμο που δεν καταναλώθηκε.",
      "Il veicolo va restituito con la stessa quantità di carburante della consegna. Non è previsto alcun rimborso per il carburante non consumato.",
      "Le véhicule doit être restitué avec la même quantité de carburant qu'à la livraison. Aucun remboursement pour le carburant non consommé.",
      "Das Fahrzeug ist mit derselben Kraftstoffmenge wie bei Übergabe zurückzugeben. Eine Erstattung für nicht verbrauchten Kraftstoff erfolgt nicht.",
    ),
  },
  {
    number: 12,
    title: ls(
      "Renting outside the island",
      "Ενοικίαση εκτός του νησιού",
      "Noleggio fuori dall'isola",
      "Location hors de l'île",
      "Vermietung außerhalb der Insel",
    ),
    body: ls(
      "Taking the vehicle outside Naxos is allowed only with the written consent of our office.",
      "Η μεταφορά του οχήματος εκτός Νάξου επιτρέπεται μόνο με γραπτή συναίνεση του γραφείου μας.",
      "Portare il veicolo fuori da Naxos è consentito solo con autorizzazione scritta del nostro ufficio.",
      "Sortir le véhicule hors de Naxos n'est autorisé qu'avec l'accord écrit de notre bureau.",
      "Das Mitnehmen des Fahrzeugs außerhalb von Naxos ist nur mit schriftlicher Genehmigung unseres Büros gestattet.",
    ),
  },
  {
    number: 13,
    title: ls(
      "Cancellation policy",
      "Πολιτική ακύρωσης",
      "Politica di cancellazione",
      "Politique d'annulation",
      "Stornierungsrichtlinie",
    ),
    body: ls(
      "Free cancellation if you inform us at least 21 days before your arrival date. If the vehicle is returned before the agreed end time/date as written on the contract, there is no refund.",
      "Δωρεάν ακύρωση εφόσον μας ενημερώσετε τουλάχιστον 21 ημέρες πριν την ημερομηνία άφιξης. Σε περίπτωση πρόωρης επιστροφής του οχήματος πριν από τη συμφωνημένη ημερομηνία/ώρα του συμβολαίου, δεν προβλέπεται επιστροφή χρημάτων.",
      "Cancellazione gratuita se ci avvisi almeno 21 giorni prima della data di arrivo. In caso di restituzione anticipata del veicolo rispetto a quanto previsto dal contratto, non è previsto alcun rimborso.",
      "Annulation gratuite si vous nous informez au moins 21 jours avant la date d'arrivée. En cas de restitution anticipée du véhicule par rapport à la date/heure du contrat, aucun remboursement n'est dû.",
      "Kostenlose Stornierung bei Mitteilung mindestens 21 Tage vor Anreisedatum. Bei vorzeitiger Rückgabe vor dem im Vertrag vereinbarten Datum/Zeitpunkt erfolgt keine Erstattung.",
    ),
  },
  {
    number: 14,
    title: ls(
      "Pets",
      "Κατοικίδια",
      "Animali domestici",
      "Animaux",
      "Haustiere",
    ),
    body: ls(
      "Pets are allowed by prior agreement with our agency.",
      "Τα κατοικίδια επιτρέπονται κατόπιν συνεννόησης με το γραφείο μας.",
      "Gli animali domestici sono ammessi previo accordo con la nostra agenzia.",
      "Les animaux sont admis sur accord préalable avec notre agence.",
      "Haustiere sind nach vorheriger Absprache mit unserem Büro erlaubt.",
    ),
  },
];

// ─── Cancellation Policy details ────────────────────────────────────────────
export const CANCELLATION = {
  deposit: ls(
    "The guest must pay a deposit of 30% at the time of booking.",
    "Ο πελάτης καταβάλλει προκαταβολή 30% κατά την κράτηση.",
    "Il cliente versa un acconto del 30% al momento della prenotazione.",
    "Le client verse un acompte de 30 % au moment de la réservation.",
    "Der Gast leistet bei der Buchung eine Anzahlung von 30 %.",
  ),
  charge: ls(
    "The deposit is charged if the reservation is cancelled inside the free-cancellation window.",
    "Η προκαταβολή παρακρατείται σε περίπτωση ακύρωσης εντός της περιόδου χρέωσης.",
    "L'acconto viene addebitato in caso di cancellazione entro il periodo di addebito.",
    "L'acompte est encaissé en cas d'annulation dans la fenêtre payante.",
    "Die Anzahlung wird einbehalten, wenn innerhalb des kostenpflichtigen Zeitraums storniert wird.",
  ),
  tiers: [
    {
      window: ls(
        "21+ days before arrival",
        "21+ ημέρες πριν την άφιξη",
        "21+ giorni prima dell'arrivo",
        "21+ jours avant l'arrivée",
        "21+ Tage vor Anreise",
      ),
      outcome: ls(
        "Free cancellation. Full deposit refunded.",
        "Δωρεάν ακύρωση. Επιστροφή πλήρους προκαταβολής.",
        "Cancellazione gratuita. Acconto rimborsato per intero.",
        "Annulation gratuite. Acompte intégralement remboursé.",
        "Kostenlose Stornierung. Anzahlung wird vollständig erstattet.",
      ),
    },
    {
      window: ls(
        "Less than 21 days before arrival",
        "Λιγότερες από 21 ημέρες πριν την άφιξη",
        "Meno di 21 giorni prima dell'arrivo",
        "Moins de 21 jours avant l'arrivée",
        "Weniger als 21 Tage vor Anreise",
      ),
      outcome: ls(
        "30% deposit is charged. The rest of the rental is not billed.",
        "Παρακρατείται η προκαταβολή 30%. Το υπόλοιπο της ενοικίασης δεν χρεώνεται.",
        "L'acconto del 30% viene addebitato. Il resto del noleggio non viene fatturato.",
        "L'acompte de 30 % est encaissé. Le reste de la location n'est pas facturé.",
        "Die 30%-Anzahlung wird einbehalten. Der restliche Mietpreis wird nicht in Rechnung gestellt.",
      ),
    },
    {
      window: ls(
        "No-show or early return",
        "Μη εμφάνιση ή πρόωρη επιστροφή",
        "Mancata presentazione o restituzione anticipata",
        "Non-présentation ou restitution anticipée",
        "Nichterscheinen oder vorzeitige Rückgabe",
      ),
      outcome: ls(
        "No refund for early return or no-show.",
        "Δεν προβλέπεται επιστροφή χρημάτων για πρόωρη επιστροφή ή μη εμφάνιση.",
        "Nessun rimborso per restituzione anticipata o mancata presentazione.",
        "Aucun remboursement pour restitution anticipée ou absence.",
        "Keine Erstattung bei vorzeitiger Rückgabe oder Nichterscheinen.",
      ),
    },
  ],
};

export const LAST_UPDATED = "2026-05-14";
