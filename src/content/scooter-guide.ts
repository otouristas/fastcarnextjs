import type { LocalizedString } from "@/types/content";

/**
 * Content for /{locale}/fleet/scooters.
 *
 * This URL is the highest-traffic page on the site — 100 clicks and 2,800
 * impressions in the audited quarter, roughly 40% of all organic clicks — and
 * it returned 404 when the fleet went cars-only. "Scooters & motorbikes" plus
 * "ATV, quad & buggy" are also the two largest clusters in the keyword universe
 * (76 of 290 keywords), and the Greek head terms sit at position 1.
 *
 * The business rents cars only, so the page earns that demand by answering the
 * question honestly rather than by listing inventory that does not exist. Every
 * claim here is about licensing, weather and roads — none of it implies we rent
 * two-wheelers. `scripts/validate-content.mjs` enforces that.
 *
 * GREEK: drafted in-repo and pending native review, per
 * content/editorial/README.md. It replaces the previous state, where /el served
 * this page's English body under lang="el" while claiming hreflang="el".
 */
const ls = (en: string, el?: string, it?: string, fr?: string, de?: string): LocalizedString => ({
  en,
  el: el ?? en,
  it: it ?? en,
  fr: fr ?? en,
  de: de ?? en,
});

export interface ScooterSection {
  heading: LocalizedString;
  body: LocalizedString;
}

export const SCOOTER_GUIDE = {
  /** Kept under 65 chars so it is never clamped; the H1 carries the long form. */
  title: ls(
    "Scooter Rental Naxos: Licence, Cost & When a Car Wins",
    "Ενοικίαση Σκούτερ Νάξος: Δίπλωμα, Κόστος & Ασφάλεια",
  ),
  h1: ls(
    "Scooter rental in Naxos 2026: licence rules, costs and when a car wins",
    "Ενοικίαση σκούτερ στη Νάξο 2026: δίπλωμα, κόστος και πότε συμφέρει το αυτοκίνητο",
  ),
  description: ls(
    "Licence categories, meltemi wind risk, real prices and mountain roads. An honest guide from a Naxos rental company that rents cars, not scooters.",
    "Κατηγορίες διπλώματος, μελτέμι, πραγματικές τιμές και ορεινοί δρόμοι. Ένας ειλικρινής οδηγός από εταιρεία της Νάξου που νοικιάζει αυτοκίνητα, όχι σκούτερ.",
  ),
  breadcrumb: ls("Scooter rental", "Ενοικίαση σκούτερ"),

  /** Rendered in the answer block, above everything else on the page. */
  disclosureLead: ls(
    "Fast Motor Rental Naxos rents cars only.",
    "Η Fast Motor Rental Naxos νοικιάζει μόνο αυτοκίνητα.",
  ),
  disclosureBody: ls(
    "We ran scooters, ATVs and buggies for years and stopped deliberately. This page is not a product listing — it is what we tell guests who ask us about scooters, and it is honest about when one is the right call.",
    "Για χρόνια νοικιάζαμε σκούτερ, ATV και buggy και σταματήσαμε συνειδητά. Αυτή η σελίδα δεν είναι κατάλογος προϊόντων — είναι όσα λέμε στους επισκέπτες που μας ρωτούν για σκούτερ, και είναι ειλικρινής για το πότε αξίζει.",
  ),

  windTipTitle: ls(
    "Check the wind before you book anything",
    "Δείτε τον άνεμο πριν κλείσετε οτιδήποτε",
  ),
  windTipBody: ls(
    "If your dates fall between 15 July and 25 August, look at a wind forecast for Naxos before deciding. Under 5 Beaufort, a scooter on the coastal road is pleasant. Over 6, it is not, and there is nowhere on the west coast to escape it.",
    "Αν οι ημερομηνίες σας πέφτουν μεταξύ 15 Ιουλίου και 25 Αυγούστου, ελέγξτε πρόγνωση ανέμου για τη Νάξο πριν αποφασίσετε. Κάτω από 5 μποφόρ, το σκούτερ στον παραλιακό δρόμο είναι ευχάριστο. Πάνω από 6 δεν είναι, και στη δυτική ακτή δεν υπάρχει πουθενά να προφυλαχθείτε.",
  ),

  sections: [
    {
      heading: ls(
        "Why we stopped renting two-wheelers",
        "Γιατί σταματήσαμε τα δίκυκλα",
      ),
      body: ls(
        "Naxos sits in the windiest corridor of the Cyclades. Between mid-July and late August the meltemi routinely blows 6–7 Beaufort for days at a time, and the exposed west-coast road from Agios Prokopios down to Pyrgaki — the road every visitor uses to reach the beaches — is the worst of it. On a 125cc carrying two people and a beach bag, a sustained crosswind of that strength is frightening and objectively dangerous. Add unlit mountain roads, goats, and riders on holiday who have not been on two wheels since last summer, and the pattern became clear enough that we took the decision. We would rather lose the booking.",
        "Η Νάξος βρίσκεται στον πιο ανεμώδη διάδρομο των Κυκλάδων. Από τα μέσα Ιουλίου ως τα τέλη Αυγούστου το μελτέμι φυσά τακτικά 6–7 μποφόρ για μέρες, και ο εκτεθειμένος δυτικός παραλιακός δρόμος από τον Άγιο Προκόπιο ως το Πυργάκι — ο δρόμος που χρησιμοποιεί κάθε επισκέπτης για τις παραλίες — είναι το χειρότερο σημείο. Πάνω σε ένα 125άρι με δύο άτομα και μια τσάντα θαλάσσης, ένας σταθερός πλευρικός άνεμος αυτής της έντασης είναι τρομακτικός και αντικειμενικά επικίνδυνος. Προσθέστε ανηλιαγούς ορεινούς δρόμους, κατσίκια και αναβάτες σε διακοπές που δεν έχουν ανέβει σε δίκυκλο από πέρσι, και η εικόνα έγινε αρκετά ξεκάθαρη ώστε να πάρουμε την απόφαση. Προτιμούμε να χάσουμε την κράτηση.",
      ),
    },
    {
      heading: ls("The licence rules, accurately", "Οι κανόνες διπλώματος, με ακρίβεια"),
      body: ls(
        "This is where most of the misinformation online sits. In Greece a 50cc scooter requires at least an AM category entitlement. A full car licence issued in an EU country from 2013 onwards normally carries AM automatically, but older licences and many non-EU licences do not. Anything above 50cc — which includes every 125cc you would actually want for the hills here — requires category A1 or higher. Renting on the wrong category is not a technicality: it voids the insurance completely, so a single slide on gravel becomes a bill you pay in full. Non-EU licence holders also need an International Driving Permit alongside the home licence.",
        "Εδώ βρίσκεται η περισσότερη παραπληροφόρηση στο διαδίκτυο. Στην Ελλάδα ένα σκούτερ 50cc απαιτεί τουλάχιστον κατηγορία ΑΜ. Ένα δίπλωμα αυτοκινήτου που εκδόθηκε σε χώρα της ΕΕ από το 2013 και μετά συνήθως περιλαμβάνει αυτόματα την ΑΜ, όμως παλαιότερα διπλώματα και πολλά διπλώματα εκτός ΕΕ δεν την περιλαμβάνουν. Οτιδήποτε πάνω από 50cc — δηλαδή κάθε 125άρι που πραγματικά θα θέλατε για τους λόφους εδώ — απαιτεί κατηγορία Α1 ή ανώτερη. Η ενοικίαση με λάθος κατηγορία δεν είναι τυπική λεπτομέρεια: ακυρώνει πλήρως την ασφάλεια, οπότε ένα απλό γλίστρημα στο χαλίκι γίνεται λογαριασμός που πληρώνετε εξ ολοκλήρου. Οι κάτοχοι διπλωμάτων εκτός ΕΕ χρειάζονται επιπλέον Διεθνή Άδεια Οδήγησης μαζί με το εθνικό τους δίπλωμα.",
      ),
    },
    {
      heading: ls(
        "Where a scooter genuinely makes sense",
        "Πού το σκούτερ πραγματικά συμφέρει",
      ),
      body: ls(
        "Two people travelling with a daypack each, staying in or near Chora, with a coastal itinerary — Agios Prokopios, Agia Anna, Plaka — in June or September when the wind has eased. Parking in Chora in August is genuinely difficult for a car and trivial for a scooter, which is a real advantage we are not going to pretend away. If that describes your trip and you hold the right licence, rent from a specialist operator who services their fleet properly, and wear the helmet.",
        "Δύο άτομα με από ένα μικρό σακίδιο, διαμονή στη Χώρα ή κοντά της, και παραλιακό πρόγραμμα — Άγιος Προκόπιος, Αγία Άννα, Πλάκα — τον Ιούνιο ή τον Σεπτέμβριο που ο άνεμος έχει κοπάσει. Το παρκάρισμα στη Χώρα τον Αύγουστο είναι πραγματικά δύσκολο με αυτοκίνητο και ασήμαντο με σκούτερ, και αυτό είναι ένα υπαρκτό πλεονέκτημα που δεν θα το κρύψουμε. Αν αυτό περιγράφει το ταξίδι σας και έχετε τη σωστή κατηγορία διπλώματος, νοικιάστε από εξειδικευμένη εταιρεία που συντηρεί σωστά τον στόλο της, και φορέστε το κράνος.",
      ),
    },
    {
      heading: ls("Where it does not", "Πού δεν συμφέρει"),
      body: ls(
        "Apeiranthos, Apollonas and the Tragea. The climb to Apeiranthos is 25 minutes of continuous switchbacks; Apollonas is an hour each way on a road that is single-lane in places with no lighting and no barrier. A 50cc will not hold a reasonable speed on those gradients, and a 125cc with a pillion is working hard. Add luggage, children, a forecast with any weather in it, or an arrival after dark, and the answer is a car. That is also, not coincidentally, half of what makes Naxos worth visiting.",
        "Απείρανθος, Απόλλωνας και η Τραγαία. Η ανάβαση στην Απείρανθο είναι 25 λεπτά συνεχόμενες στροφές· ο Απόλλωνας απέχει μία ώρα προς κάθε κατεύθυνση σε δρόμο που κατά τόπους είναι μονής λωρίδας, χωρίς φωτισμό και χωρίς στηθαίο. Ένα 50άρι δεν κρατά λογική ταχύτητα σε αυτές τις κλίσεις, και ένα 125άρι με συνεπιβάτη ζορίζεται. Προσθέστε αποσκευές, παιδιά, μια πρόγνωση με οποιονδήποτε καιρό, ή άφιξη μετά το σκοτάδι, και η απάντηση είναι αυτοκίνητο. Και αυτό, όχι τυχαία, είναι οι μισοί λόγοι που αξίζει να επισκεφθείτε τη Νάξο.",
      ),
    },
    {
      heading: ls(
        "ATVs, quads and buggies: the same answer, more emphatically",
        "ATV, γουρούνες και buggy: η ίδια απάντηση, πιο κατηγορηματικά",
      ),
      body: ls(
        "We are asked about these as often as scooters, so: we do not rent them either, and we stopped for the same reasons plus one more. A quad feels stable to a first-time rider in a way a scooter does not, which is precisely the problem — it invites speed on gravel, where it is the least forgiving vehicle on the island. In Greece a quad or buggy needs a category B car licence at minimum, and above 50cc it needs the same A1 you would need for the equivalent motorcycle; the rule is about engine size, not wheel count. They are also excluded from every soft-sand track on Naxos by the rental agreement, so they cannot legally take you anywhere a car cannot. Alyko, Hawaii, Pyrgaki and Kastraki all end at the same signed parking regardless of what you drove there. If the appeal is open-air, a convertible does it at half the risk.",
        "Μας ρωτούν γι' αυτά το ίδιο συχνά όσο και για τα σκούτερ, οπότε: ούτε αυτά νοικιάζουμε, και σταματήσαμε για τους ίδιους λόγους συν έναν ακόμη. Μια γουρούνα δίνει σε έναν αρχάριο αίσθηση σταθερότητας που δεν δίνει το σκούτερ — και ακριβώς αυτό είναι το πρόβλημα, γιατί προσκαλεί ταχύτητα στο χαλίκι, όπου είναι το λιγότερο συγχωρητικό όχημα του νησιού. Στην Ελλάδα μια γουρούνα ή ένα buggy απαιτεί τουλάχιστον δίπλωμα κατηγορίας Β, και πάνω από 50cc απαιτεί την ίδια Α1 που θα χρειαζόσασταν για αντίστοιχη μοτοσυκλέτα· ο κανόνας αφορά τον κυβισμό, όχι τον αριθμό των τροχών. Επιπλέον, το συμφωνητικό ενοικίασης τα αποκλείει από κάθε χωματόδρομο με βαθιά άμμο στη Νάξο, οπότε νομικά δεν σας πάνε πουθενά που δεν πάει ένα αυτοκίνητο. Αλυκό, Χαβάη, Πυργάκι και Καστράκι καταλήγουν όλα στο ίδιο σηματοδοτημένο πάρκινγκ, ανεξάρτητα από το τι οδηγήσατε ως εκεί. Αν σας ελκύει το ανοιχτό αμάξωμα, ένα κάμπριο το κάνει με τον μισό κίνδυνο.",
      ),
    },
  ] satisfies ScooterSection[],

  comparison: {
    caption: ls(
      "Scooter, quad and small car on Naxos, compared on the things that actually change the decision",
      "Σκούτερ, γουρούνα και μικρό αυτοκίνητο στη Νάξο: σύγκριση στα σημεία που όντως αλλάζουν την απόφαση",
    ),
    columns: [
      ls("", ""),
      ls("50–125cc scooter", "Σκούτερ 50–125cc"),
      ls("Quad / buggy", "Γουρούνα / buggy"),
      ls("Small car", "Μικρό αυτοκίνητο"),
    ],
    rows: [
      [
        ls("Licence needed", "Απαιτούμενο δίπλωμα"),
        ls("AM up to 50cc, A1 above", "ΑΜ έως 50cc, Α1 πάνω από αυτό"),
        ls("B minimum, A1 above 50cc", "Β κατ' ελάχιστον, Α1 πάνω από 50cc"),
        ls("B", "Β"),
      ],
      [
        ls("Meltemi at 6–7 Beaufort", "Μελτέμι 6–7 μποφόρ"),
        ls("Dangerous on the west coast", "Επικίνδυνο στη δυτική ακτή"),
        ls("Unstable and very exposed", "Ασταθές και πολύ εκτεθειμένο"),
        ls("Unaffected", "Δεν επηρεάζεται"),
      ],
      [
        ls("Mountain villages", "Ορεινά χωριά"),
        ls("Slow and tiring two-up", "Αργό και κουραστικό με δύο"),
        ls("Slow, loud, hot", "Αργό, θορυβώδες, ζεστό"),
        ls("Comfortable", "Άνετο"),
      ],
      [
        ls("Luggage or children", "Αποσκευές ή παιδιά"),
        ls("No", "Όχι"),
        ls("No", "Όχι"),
        ls("Yes", "Ναι"),
      ],
      [
        ls("Beach access beyond the car park", "Πρόσβαση πέρα από το πάρκινγκ"),
        ls("None — excluded by contract", "Καμία — αποκλείεται συμβατικά"),
        ls("None — excluded by contract", "Καμία — αποκλείεται συμβατικά"),
        ls("None — same signed parking", "Καμία — ίδιο σηματοδοτημένο πάρκινγκ"),
      ],
      [
        ls("Parking in Chora in August", "Πάρκινγκ στη Χώρα τον Αύγουστο"),
        ls("Easy", "Εύκολο"),
        ls("Awkward", "Δύσκολο"),
        ls("Hard — park outside and walk", "Δύσκολο — παρκάρετε έξω και περπατήστε"),
      ],
      [
        ls("Night driving", "Νυχτερινή οδήγηση"),
        ls("Poor on unlit roads", "Κακή σε ανηλιαγούς δρόμους"),
        ls("Poor on unlit roads", "Κακή σε ανηλιαγούς δρόμους"),
        ls("Fine", "Καλή"),
      ],
    ],
  },

  faq: [
    {
      q: ls(
        "Does Fast Motor Rental Naxos rent scooters?",
        "Νοικιάζει σκούτερ η Fast Motor Rental Naxos;",
      ),
      a: ls(
        "No. We rent cars only. We used to run scooters, ATVs and buggies and stopped deliberately — on an island this windy, with long unlit mountain roads, the injury rate on open vehicles was not something we wanted to be part of. If you want a scooter, rent from a specialist operator who maintains them properly.",
        "Όχι. Νοικιάζουμε μόνο αυτοκίνητα. Παλαιότερα είχαμε σκούτερ, ATV και buggy και σταματήσαμε συνειδητά — σε ένα τόσο ανεμώδες νησί, με μεγάλους ανηλιαγούς ορεινούς δρόμους, το ποσοστό τραυματισμών στα ανοιχτά οχήματα δεν ήταν κάτι στο οποίο θέλαμε να συμμετέχουμε. Αν θέλετε σκούτερ, νοικιάστε από εξειδικευμένη εταιρεία που τα συντηρεί σωστά.",
      ),
    },
    {
      q: ls(
        "What licence do you need for a scooter in Naxos?",
        "Τι δίπλωμα χρειάζεται για σκούτερ στη Νάξο;",
      ),
      a: ls(
        "A 50cc scooter needs at least category AM. EU car licences issued from 2013 onwards normally carry AM automatically, but older licences and many non-EU licences do not. Anything above 50cc — including every 125cc you would actually want on Naxos hills — requires category A1 or higher. Renting on the wrong category voids the insurance completely.",
        "Ένα σκούτερ 50cc απαιτεί τουλάχιστον κατηγορία ΑΜ. Τα διπλώματα αυτοκινήτου της ΕΕ από το 2013 και μετά συνήθως περιλαμβάνουν αυτόματα την ΑΜ, όμως παλαιότερα διπλώματα και πολλά εκτός ΕΕ δεν την περιλαμβάνουν. Οτιδήποτε πάνω από 50cc — και κάθε 125άρι που θα θέλατε στους λόφους της Νάξου — απαιτεί κατηγορία Α1 ή ανώτερη. Η ενοικίαση με λάθος κατηγορία ακυρώνει πλήρως την ασφάλεια.",
      ),
    },
    {
      q: ls(
        "How much does scooter rental cost in Naxos?",
        "Πόσο κοστίζει η ενοικίαση σκούτερ στη Νάξο;",
      ),
      a: ls(
        "Indicatively €20–30 a day for a 50cc and €30–45 for a 125cc in shoulder season, rising in July and August. A small car is roughly €30–45 shoulder and €45–70 peak, so the gap is smaller than most people assume once two people are travelling.",
        "Ενδεικτικά 20–30 € την ημέρα για ένα 50άρι και 30–45 € για ένα 125άρι εκτός αιχμής, με αύξηση τον Ιούλιο και τον Αύγουστο. Ένα μικρό αυτοκίνητο κοστίζει περίπου 30–45 € εκτός αιχμής και 45–70 € στην αιχμή, οπότε η διαφορά είναι μικρότερη απ' όσο υποθέτουν οι περισσότεροι όταν ταξιδεύουν δύο άτομα.",
      ),
    },
    {
      q: ls(
        "Is it safe to ride a scooter in Naxos?",
        "Είναι ασφαλές να οδηγήσετε σκούτερ στη Νάξο;",
      ),
      a: ls(
        "It depends heavily on when and where. The paved west-coast road in June is fine for an experienced rider. The same road in August with 6–7 Beaufort of meltemi is genuinely dangerous, and the mountain route to Apeiranthos and Apollonas is long, unlit and full of switchbacks. Naxos sits in the windiest corridor of the Cyclades, which is the factor visitors most consistently underestimate.",
        "Εξαρτάται πολύ από το πότε και το πού. Ο ασφαλτοστρωμένος δυτικός παραλιακός δρόμος τον Ιούνιο είναι μια χαρά για έμπειρο αναβάτη. Ο ίδιος δρόμος τον Αύγουστο με 6–7 μποφόρ μελτέμι είναι πραγματικά επικίνδυνος, και η ορεινή διαδρομή προς Απείρανθο και Απόλλωνα είναι μεγάλη, ανηλιαγή και γεμάτη στροφές. Η Νάξος βρίσκεται στον πιο ανεμώδη διάδρομο των Κυκλάδων, και αυτόν ακριβώς τον παράγοντα υποτιμούν σταθερά οι επισκέπτες.",
      ),
    },
    {
      q: ls(
        "Do you rent ATVs, quads or buggies in Naxos?",
        "Νοικιάζετε ATV, γουρούνες ή buggy στη Νάξο;",
      ),
      a: ls(
        "No, and we stopped for the same reasons as the scooters. A quad also needs a category B licence at minimum, and A1 above 50cc — the rule follows engine size, not wheel count. They are excluded from every soft-sand track on the island by the rental agreement, so they reach exactly the same beach car parks a small car reaches.",
        "Όχι, και σταματήσαμε για τους ίδιους λόγους όπως και με τα σκούτερ. Μια γουρούνα απαιτεί επίσης δίπλωμα κατηγορίας Β κατ' ελάχιστον, και Α1 πάνω από 50cc — ο κανόνας ακολουθεί τον κυβισμό, όχι τον αριθμό των τροχών. Το συμφωνητικό ενοικίασης τα αποκλείει από κάθε χωματόδρομο με βαθιά άμμο στο νησί, οπότε φτάνουν ακριβώς στα ίδια παραλιακά πάρκινγκ που φτάνει ένα μικρό αυτοκίνητο.",
      ),
    },
    {
      q: ls(
        "Can a scooter reach all the Naxos beaches?",
        "Φτάνει ένα σκούτερ σε όλες τις παραλίες της Νάξου;",
      ),
      a: ls(
        "It reaches the same paved car parks a car does — Agios Prokopios, Agia Anna, Plaka, Mikri Vigla, Alyko. The soft-sand tracks beyond those car parks are excluded from every rental agreement on Naxos, for scooters, ATVs and cars alike. Nothing legally goes further than the signed parking.",
        "Φτάνει στα ίδια ασφαλτοστρωμένα πάρκινγκ με ένα αυτοκίνητο — Άγιος Προκόπιος, Αγία Άννα, Πλάκα, Μικρή Βίγλα, Αλυκό. Οι χωματόδρομοι με βαθιά άμμο πέρα από αυτά τα πάρκινγκ αποκλείονται από κάθε συμφωνητικό ενοικίασης στη Νάξο, τόσο για σκούτερ όσο και για ATV και αυτοκίνητα. Τίποτα δεν πηγαίνει νόμιμα πιο πέρα από το σηματοδοτημένο πάρκινγκ.",
      ),
    },
    {
      q: ls("Scooter or car in Naxos?", "Σκούτερ ή αυτοκίνητο στη Νάξο;"),
      a: ls(
        "A scooter suits two people travelling light, on a coastal itinerary, in calm weather, with the right licence. A car suits everyone else — luggage, children, mountain villages, air conditioning, night driving and any day the meltemi is up. Most visitors staying four nights or more end up wanting the car.",
        "Το σκούτερ ταιριάζει σε δύο άτομα που ταξιδεύουν ελαφριά, με παραλιακό πρόγραμμα, με ήπιο καιρό και με τη σωστή κατηγορία διπλώματος. Το αυτοκίνητο ταιριάζει σε όλους τους υπόλοιπους — αποσκευές, παιδιά, ορεινά χωριά, κλιματισμός, νυχτερινή οδήγηση και κάθε μέρα που φυσά μελτέμι. Οι περισσότεροι επισκέπτες που μένουν τέσσερις νύχτες ή παραπάνω καταλήγουν να θέλουν το αυτοκίνητο.",
      ),
    },
  ],

  headings: {
    faq: ls("Common questions", "Συχνές ερωτήσεις"),
    whatWeRent: ls("What we do rent", "Τι νοικιάζουμε"),
    comparison: ls("Scooter, quad or car?", "Σκούτερ, γουρούνα ή αυτοκίνητο;"),
  },

  idpLinkLabel: ls(
    "Read the full IDP rules by country",
    "Δείτε τους πλήρεις κανόνες Διεθνούς Άδειας ανά χώρα",
  ),
  whatWeRentLead: ls(
    "Small, easy-to-park cars with free delivery to the port, the airport or your hotel.",
    "Μικρά αυτοκίνητα που παρκάρουν εύκολα, με δωρεάν παράδοση στο λιμάνι, στο αεροδρόμιο ή στο κατάλυμά σας.",
  ),
} as const;

export const SCOOTER_KEYWORDS = [
  "naxos scooter rental",
  "scooter rental naxos",
  "rent scooter naxos",
  "naxos moped rental",
  "scooter hire naxos",
  "naxos scooter rental prices",
  "naxos atv rental",
  "quad rental naxos",
  "buggy rental naxos",
  "ενοικίαση σκούτερ Νάξος",
  "ενοικίαση μηχανάκι Νάξος",
  "γουρούνες Νάξος",
];
