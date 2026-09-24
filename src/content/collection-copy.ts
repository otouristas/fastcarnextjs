import type { Locale } from "@/lib/site";
import type { VehicleCollectionSlug } from "@/types/editorial";

const copy: Record<
  Locale,
  Record<
    VehicleCollectionSlug,
    { title: string; intro: string; heading: string; advice: string }
  >
> = {
  en: {
    automatic: {
      title: "Automatic car rental in Naxos",
      intro:
        "Compare automatic rental cars for your Naxos trip. Check the transmission, seats and luggage capacity on each vehicle before checking availability for your dates.",
      heading: "Choose the automatic that fits your trip",
      advice:
        "A compact is practical for smaller parking spaces. For family trips, compare luggage capacity as well as seats. An automatic gearbox does not mean that a vehicle is an SUV or four-wheel drive. Confirm the vehicle group and pickup point in your booking.",
    },
    "family-7-seater": {
      title: "Family and 7-seater car rental in Naxos",
      intro:
        "Travelling together? Compare seven-seat vehicles and their luggage details. Check availability early and tell us how many adults, children and bags will be travelling.",
      heading: "Plan for people and luggage",
      advice:
        "Seven seats do not guarantee space for seven large suitcases. Luggage room changes when every seat is occupied. Confirm the seating arrangement and any child-seat requirements before booking. If the right size is unavailable, contact us to discuss suitable alternatives.",
    },
    "suv-4x4": {
      title: "SUV and 4×4 rental in Naxos",
      intro:
        "Explore our SUV and four-wheel-drive collection. Compare the actual specifications of each model: an SUV body style does not automatically mean four-wheel drive.",
      heading: "Choose for the route you intend to drive",
      advice:
        "Many Naxos beach and village trips use paved roads. Choose space, comfort and transmission to suit your group. Four-wheel drive is not permission to use restricted roads or drive off-road. Read the rental and insurance terms and confirm your intended route with our team.",
    },
  },
  el: {
    automatic: {
      title: "Ενοικίαση αυτόματου αυτοκινήτου στη Νάξο",
      intro:
        "Σύγκρινε αυτόματα αυτοκίνητα για το ταξίδι σου στη Νάξο. Έλεγξε κιβώτιο, θέσεις και χώρο αποσκευών πριν δεις διαθεσιμότητα για τις ημερομηνίες σου.",
      heading: "Διάλεξε το αυτόματο που σου ταιριάζει",
      advice:
        "Ένα μικρό αυτοκίνητο είναι πρακτικό στις μικρότερες θέσεις στάθμευσης. Για οικογενειακές διαδρομές, σύγκρινε και τον χώρο αποσκευών. Το αυτόματο κιβώτιο δεν σημαίνει SUV ή τετρακίνηση. Επιβεβαίωσε κατηγορία και σημείο παραλαβής στην κράτησή σου.",
    },
    "family-7-seater": {
      title: "Ενοικίαση οικογενειακού και 7θέσιου στη Νάξο",
      intro:
        "Ταξιδεύετε όλοι μαζί; Σύγκρινε επταθέσια οχήματα και χώρο αποσκευών. Έλεγξε έγκαιρα διαθεσιμότητα και πες μας πόσοι ενήλικες, παιδιά και βαλίτσες θα ταξιδέψουν.",
      heading: "Χώρος για ανθρώπους και αποσκευές",
      advice:
        "Επτά θέσεις δεν σημαίνει χώρος για επτά μεγάλες βαλίτσες. Ο χώρος αποσκευών αλλάζει όταν χρησιμοποιούνται όλα τα καθίσματα. Επιβεβαίωσε τη διάταξη θέσεων και τις ανάγκες για παιδικά καθίσματα πριν την κράτηση. Αν δεν υπάρχει κατάλληλο όχημα, επικοινώνησε μαζί μας για εναλλακτικές.",
    },
    "suv-4x4": {
      title: "Ενοικίαση SUV και 4×4 στη Νάξο",
      intro:
        "Δες τα SUV και τα τετρακίνητα οχήματά μας. Σύγκρινε τα πραγματικά χαρακτηριστικά κάθε μοντέλου: δεν είναι όλα τα SUV τετρακίνητα.",
      heading: "Διάλεξε με βάση τη διαδρομή σου",
      advice:
        "Πολλές παραλίες και χωριά της Νάξου συνδέονται με ασφαλτοστρωμένους δρόμους. Διάλεξε χώρο, άνεση και κιβώτιο ανάλογα με την παρέα σου. Η τετρακίνηση δεν αποτελεί άδεια για εκτός δρόμου χρήση. Διάβασε τους όρους ενοικίασης και ασφάλισης και επιβεβαίωσε τη διαδρομή με την ομάδα μας.",
    },
  },
  it: {
    automatic: {
      title: "Noleggio auto automatiche a Naxos",
      intro:
        "Confronta le auto automatiche per il tuo viaggio a Naxos. Controlla cambio, posti e bagagliaio prima di verificare la disponibilità per le tue date.",
      heading: "Scegli l’automatica adatta al tuo viaggio",
      advice:
        "Una compatta è pratica nei parcheggi piccoli. Per una famiglia, confronta anche lo spazio per i bagagli. Il cambio automatico non implica un SUV o la trazione integrale. Conferma la categoria e il punto di ritiro nella prenotazione.",
    },
    "family-7-seater": {
      title: "Noleggio auto familiari e 7 posti a Naxos",
      intro:
        "Viaggiate insieme? Confronta i veicoli a sette posti e il bagagliaio. Verifica presto la disponibilità e comunicaci il numero di adulti, bambini e valigie.",
      heading: "Spazio per persone e bagagli",
      advice:
        "Sette posti non garantiscono spazio per sette valigie grandi. Il bagagliaio cambia quando tutti i sedili sono occupati. Conferma la disposizione dei posti e i seggiolini necessari prima di prenotare. Contattaci per valutare alternative se il veicolo adatto non è disponibile.",
    },
    "suv-4x4": {
      title: "Noleggio SUV e 4×4 a Naxos",
      intro:
        "Scopri la nostra selezione di SUV e fuoristrada. Confronta le specifiche di ogni modello: un SUV non ha necessariamente la trazione integrale.",
      heading: "Scegli in base al tuo itinerario",
      advice:
        "Molte spiagge e molti borghi di Naxos si raggiungono su strade asfaltate. Scegli spazio, comfort e cambio adatti al gruppo. La trazione integrale non autorizza la guida fuoristrada o su strade vietate. Leggi le condizioni di noleggio e assicurazione e verifica l’itinerario con noi.",
    },
  },
  fr: {
    automatic: {
      title: "Location de voiture automatique à Naxos",
      intro:
        "Comparez les voitures automatiques pour votre séjour à Naxos. Vérifiez la transmission, les places et le coffre avant de consulter les disponibilités.",
      heading: "Choisissez l’automatique adaptée à votre séjour",
      advice:
        "Une compacte facilite le stationnement dans les petits espaces. En famille, comparez aussi le coffre. Une boîte automatique ne signifie ni SUV ni quatre roues motrices. Confirmez la catégorie et le point de retrait lors de la réservation.",
    },
    "family-7-seater": {
      title: "Location de voiture familiale et 7 places à Naxos",
      intro:
        "Vous voyagez ensemble ? Comparez les véhicules à sept places et leur coffre. Consultez les disponibilités tôt et précisez le nombre d’adultes, d’enfants et de bagages.",
      heading: "De la place pour chacun et ses bagages",
      advice:
        "Sept places ne garantissent pas de la place pour sept grandes valises. Le coffre varie lorsque tous les sièges sont occupés. Confirmez la configuration et les sièges enfants avant de réserver. Contactez-nous pour étudier les alternatives si le véhicule adapté n’est pas disponible.",
    },
    "suv-4x4": {
      title: "Location de SUV et 4×4 à Naxos",
      intro:
        "Découvrez notre sélection de SUV et de véhicules à quatre roues motrices. Comparez les caractéristiques : tous les SUV ne sont pas des 4×4.",
      heading: "Choisissez selon votre itinéraire",
      advice:
        "De nombreuses plages et villages de Naxos sont accessibles par des routes goudronnées. Choisissez l’espace, le confort et la transmission qui conviennent à votre groupe. Un 4×4 n’autorise pas la conduite hors route ou sur des voies interdites. Consultez les conditions de location et d’assurance et vérifiez votre parcours avec nous.",
    },
  },
  de: {
    automatic: {
      title: "Automatik-Mietwagen auf Naxos",
      intro:
        "Vergleiche Automatikautos für deine Naxos-Reise. Prüfe Getriebe, Sitzplätze und Kofferraum, bevor du die Verfügbarkeit für deine Reisedaten aufrufst.",
      heading: "Die passende Automatik für deine Reise",
      advice:
        "Ein Kleinwagen ist praktisch für kleinere Parkplätze. Vergleiche bei Familienreisen auch den Gepäckraum. Automatik bedeutet weder SUV noch Allradantrieb. Bestätige Fahrzeuggruppe und Abholort bei der Buchung.",
    },
    "family-7-seater": {
      title: "Familienauto und 7-Sitzer auf Naxos mieten",
      intro:
        "Gemeinsam unterwegs? Vergleiche Siebensitzer und ihren Gepäckraum. Prüfe die Verfügbarkeit früh und teile uns die Anzahl der Erwachsenen, Kinder und Koffer mit.",
      heading: "Platz für Menschen und Gepäck",
      advice:
        "Sieben Sitze garantieren keinen Platz für sieben große Koffer. Bei voller Sitzbelegung kann der Gepäckraum kleiner sein. Bestätige Sitzanordnung und Kindersitze vor der Buchung. Falls das passende Fahrzeug nicht verfügbar ist, besprechen wir gerne Alternativen.",
    },
    "suv-4x4": {
      title: "SUV und 4×4 auf Naxos mieten",
      intro:
        "Entdecke unsere SUV- und Allradfahrzeuge. Vergleiche die technischen Angaben jedes Modells: Nicht jeder SUV hat Allradantrieb.",
      heading: "Wähle passend zu deiner Route",
      advice:
        "Viele Strände und Dörfer auf Naxos erreichst du über asphaltierte Straßen. Wähle Platz, Komfort und Getriebe passend zu deiner Gruppe. Allradantrieb erlaubt keine Fahrten abseits der Straßen oder auf gesperrten Wegen. Lies die Miet- und Versicherungsbedingungen und stimme deine Route mit uns ab.",
    },
  },
};
export const collectionCopy = (locale: Locale, slug: VehicleCollectionSlug) =>
  copy[locale][slug];
