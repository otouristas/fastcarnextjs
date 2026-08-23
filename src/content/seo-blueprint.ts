// GENERATED FILE — do not edit by hand.
// Source: naxos_carrentals_complete_seo_blueprint_2026-08-22.xlsx
//         (sheets "Exact Content EN" / "Exact Content EL")
// Regenerate: python3 scripts/extract-blueprint.py && node scripts/generate-blueprint-copy.mjs
//
// Titles, descriptions and H1s in the workbook are finished, character-counted
// copy meant to ship verbatim. The workbook's "Publishable body copy" column is
// NOT included here: for guides, locations and vehicles it is an H2 skeleton
// plus editorial instructions, not prose. Read it from docs/seo/blueprint/.
import type { Locale } from "@/lib/site";

/** Partial by design — only locales the workbook actually audited (en, el). */
export type BlueprintText = Partial<Record<Locale, string>>;

export interface BlueprintCopy {
  title?: BlueprintText;
  description?: BlueprintText;
  h1?: BlueprintText;
}

/** Keyed by locale-less path; the homepage is "". */
export const BLUEPRINT_COPY: Record<string, BlueprintCopy> = {
  "": {
    title: { en: "Car Rental Naxos | Local Cars, Easy Online Booking", el: "Ενοικίαση Αυτοκινήτου Νάξος | Εύκολη Online Κράτηση" },
    description: { en: "Rent a car in Naxos with a local team. Compare compact, automatic, family and 4×4 options, then confirm live availability securely online.", el: "Ενοικιάστε αυτοκίνητο στη Νάξο από τοπική ομάδα. Δείτε μικρά, αυτόματα, οικογενειακά και 4×4 και επιβεβαιώστε online διαθεσιμότητα." },
    h1: { en: "Car rental in Naxos, made simple", el: "Ενοικίαση αυτοκινήτου στη Νάξο, χωρίς περιττή ταλαιπωρία" },
  },
  "about": {
    title: { en: "About Fast Motor Rental Naxos | Local Team & Contact Details", el: "Fast Motor Rental Naxos | Τοπική Ομάδα & Στοιχεία Επικοινωνίας" },
    description: { en: "Meet Fast Motor Rental Naxos, see verified company and contact details, understand how bookings are handled and find the official support channels.", el: "Γνωρίστε τη Fast Motor Rental Naxos, δείτε επιβεβαιωμένα εταιρικά στοιχεία, πώς γίνεται η κράτηση και τα επίσημα κανάλια υποστήριξης." },
    h1: { en: "A local Naxos rental team, clearly identified", el: "Τοπική ομάδα ενοικιάσεων στη Νάξο, με σαφή στοιχεία" },
  },
  "book": {
    title: { en: "Book a Car in Naxos | Check Live Availability", el: "Κράτηση Αυτοκινήτου Νάξος | Ζωντανή Διαθεσιμότητα" },
    description: { en: "Enter dates, pickup and driver details to check live Naxos rental-car availability, review the total and continue to secure booking.", el: "Εισαγάγετε ημερομηνίες, παραλαβή και στοιχεία οδηγού για ζωντανή διαθεσιμότητα, τελικό ποσό και ασφαλή κράτηση στη Νάξο." },
    h1: { en: "Check cars for your Naxos dates", el: "Δείτε διαθέσιμα αυτοκίνητα για τις ημερομηνίες σας" },
  },
  "contact": {
    title: { en: "Contact Fast Motor Rental Naxos | Phone, WhatsApp & Email", el: "Επικοινωνία Fast Motor Rental Naxos | Τηλέφωνο, WhatsApp & Email" },
    description: { en: "Contact Fast Motor Rental Naxos by phone or WhatsApp at +306948820568, or email info@fmrnaxos.gr. Use the booking engine for live vehicle availability.", el: "Επικοινωνήστε με Fast Motor Rental Naxos στο +306948820568 ή στο info@fmrnaxos.gr. Για ζωντανή διαθεσιμότητα χρησιμοποιήστε το σύστημα κρατήσεων." },
    h1: { en: "Contact Fast Motor Rental Naxos", el: "Επικοινωνία με Fast Motor Rental Naxos" },
  },
  "faq": {
    title: { en: "Naxos Car Rental FAQ | Licence, Insurance, Pickup & Booking", el: "Ενοικίαση Αυτοκινήτου Νάξος FAQ | Δίπλωμα, Ασφάλεια & Παραλαβή" },
    description: { en: "Clear answers about licences, age, insurance, deposits, pickup, fuel, ferries, cancellation and booking a rental car in Naxos.", el: "Σαφείς απαντήσεις για δίπλωμα, ηλικία, ασφάλεια, εγγύηση, παραλαβή, καύσιμα, πλοία, ακύρωση και κράτηση αυτοκινήτου στη Νάξο." },
    h1: { en: "Naxos car rental questions, answered", el: "Ερωτήσεις για ενοικίαση αυτοκινήτου στη Νάξο" },
  },
  "fleet": {
    title: { en: "Naxos Car Rental Fleet | Compact, Automatic, SUV & Family", el: "Στόλος Αυτοκινήτων Νάξος | Μικρά, Αυτόματα, SUV & 7θέσια" },
    description: { en: "Explore the Naxos rental fleet by size, transmission and trip type. Check live availability for compact, automatic, family and SUV vehicles.", el: "Δείτε τον στόλο ενοικιαζόμενων στη Νάξο ανά μέγεθος, κιβώτιο και τύπο ταξιδιού. Ελέγξτε διαθεσιμότητα για μικρά, αυτόματα, οικογενειακά και SUV." },
    h1: { en: "Choose your Naxos rental car", el: "Επιλέξτε το αυτοκίνητό σας στη Νάξο" },
  },
  "fleet/cars": {
    title: { en: "Rent a Car Naxos | Compare Compact, Automatic & SUV Cars", el: "Ενοικιαζόμενα Αυτοκίνητα Νάξος | Μικρά, Αυτόματα & SUV" },
    description: { en: "Compare rental cars in Naxos by seats, luggage, transmission and trip type. Open each vehicle for details and confirm availability for your dates.", el: "Συγκρίνετε ενοικιαζόμενα αυτοκίνητα στη Νάξο ανά θέσεις, αποσκευές, κιβώτιο και χρήση. Δείτε λεπτομέρειες και διαθεσιμότητα για τις ημερομηνίες σας." },
    h1: { en: "Rental cars in Naxos", el: "Ενοικιαζόμενα αυτοκίνητα στη Νάξο" },
  },
  "fleet/cars/citroen-berlingo-7": {
    title: { en: "Citroën Berlingo 7-seater Rental Naxos | Specs & Live Availability", el: "Citroën Berlingo 7-seater Ενοικίαση Νάξος | Χαρακτηριστικά & Διαθεσιμότητα" },
    description: { en: "See Citroën Berlingo 7-seater rental details for Naxos: 7 seats, {{verify}} transmission, {{verify}} and {{VERIFY}} doors. Check live availability.", el: "Δείτε Citroën Berlingo 7-seater για ενοικίαση στη Νάξο: 7 θέσεις, {{verify}}, {{verify}} και {{VERIFY}} πόρτες. Ελέγξτε διαθεσιμότητα." },
    h1: { en: "Citroën Berlingo 7-seater rental in Naxos", el: "Citroën Berlingo 7-seater για ενοικίαση στη Νάξο" },
  },
  "fleet/cars/citroen-c3": {
    title: { en: "Citroën C3 Rental Naxos | Specs & Live Availability", el: "Citroën C3 Ενοικίαση Νάξος | Χαρακτηριστικά & Διαθεσιμότητα" },
    description: { en: "See Citroën C3 rental details for Naxos: 5 seats, automatic transmission, petrol and 5 doors. Check live availability.", el: "Δείτε Citroën C3 για ενοικίαση στη Νάξο: 5 θέσεις, αυτόματο, βενζίνη και 5 πόρτες. Ελέγξτε διαθεσιμότητα." },
    h1: { en: "Citroën C3 rental in Naxos", el: "Citroën C3 για ενοικίαση στη Νάξο" },
  },
  "fleet/cars/dacia-duster": {
    title: { en: "Dacia Duster Rental Naxos | Specs & Live Availability", el: "Dacia Duster Ενοικίαση Νάξος | Χαρακτηριστικά & Διαθεσιμότητα" },
    description: { en: "See Dacia Duster rental details for Naxos: {{VERIFY}} seats, {{verify}} transmission, {{verify}} and {{VERIFY}} doors. Check live availability.", el: "Δείτε Dacia Duster για ενοικίαση στη Νάξο: {{VERIFY}} θέσεις, {{verify}}, {{verify}} και {{VERIFY}} πόρτες. Ελέγξτε διαθεσιμότητα." },
    h1: { en: "Dacia Duster rental in Naxos", el: "Dacia Duster για ενοικίαση στη Νάξο" },
  },
  "fleet/cars/fiat-500-cabrio": {
    title: { en: "Fiat 500 Cabrio Rental Naxos | Specs & Live Availability", el: "Fiat 500 Cabrio Ενοικίαση Νάξος | Χαρακτηριστικά & Διαθεσιμότητα" },
    description: { en: "See Fiat 500 Cabrio rental details for Naxos: 4 seats, manual transmission, petrol and 3 doors. Check live availability.", el: "Δείτε Fiat 500 Cabrio για ενοικίαση στη Νάξο: 4 θέσεις, χειροκίνητο, βενζίνη και 3 πόρτες. Ελέγξτε διαθεσιμότητα." },
    h1: { en: "Fiat 500 Cabrio rental in Naxos", el: "Fiat 500 Cabrio για ενοικίαση στη Νάξο" },
  },
  "fleet/cars/fiat-panda": {
    title: { en: "Fiat Panda Rental Naxos | Specs & Live Availability", el: "Fiat Panda Ενοικίαση Νάξος | Χαρακτηριστικά & Διαθεσιμότητα" },
    description: { en: "See Fiat Panda rental details for Naxos: 5 seats, manual transmission, petrol and 5 doors. Check live availability.", el: "Δείτε Fiat Panda για ενοικίαση στη Νάξο: 5 θέσεις, χειροκίνητο, βενζίνη και 5 πόρτες. Ελέγξτε διαθεσιμότητα." },
    h1: { en: "Fiat Panda rental in Naxos", el: "Fiat Panda για ενοικίαση στη Νάξο" },
  },
  "fleet/cars/hyundai-i10": {
    title: { en: "Hyundai i10 Rental Naxos | Specs & Live Availability", el: "Hyundai i10 Ενοικίαση Νάξος | Χαρακτηριστικά & Διαθεσιμότητα" },
    description: { en: "See Hyundai i10 rental details for Naxos: 5 seats, automatic transmission, petrol and 5 doors. Check live availability.", el: "Δείτε Hyundai i10 για ενοικίαση στη Νάξο: 5 θέσεις, αυτόματο, βενζίνη και 5 πόρτες. Ελέγξτε διαθεσιμότητα." },
    h1: { en: "Hyundai i10 rental in Naxos", el: "Hyundai i10 για ενοικίαση στη Νάξο" },
  },
  "fleet/cars/kia-picanto": {
    title: { en: "Kia Picanto Rental Naxos | Specs & Live Availability", el: "Kia Picanto Ενοικίαση Νάξος | Χαρακτηριστικά & Διαθεσιμότητα" },
    description: { en: "See Kia Picanto rental details for Naxos: 5 seats, automatic transmission, petrol and 5 doors. Check live availability.", el: "Δείτε Kia Picanto για ενοικίαση στη Νάξο: 5 θέσεις, αυτόματο, βενζίνη και 5 πόρτες. Ελέγξτε διαθεσιμότητα." },
    h1: { en: "Kia Picanto rental in Naxos", el: "Kia Picanto για ενοικίαση στη Νάξο" },
  },
  "fleet/cars/kia-sportage": {
    title: { en: "Kia Sportage Rental Naxos | Specs & Live Availability", el: "Kia Sportage Ενοικίαση Νάξος | Χαρακτηριστικά & Διαθεσιμότητα" },
    description: { en: "See Kia Sportage rental details for Naxos: {{VERIFY}} seats, {{verify}} transmission, {{verify}} and {{VERIFY}} doors. Check live availability.", el: "Δείτε Kia Sportage για ενοικίαση στη Νάξο: {{VERIFY}} θέσεις, {{verify}}, {{verify}} και {{VERIFY}} πόρτες. Ελέγξτε διαθεσιμότητα." },
    h1: { en: "Kia Sportage rental in Naxos", el: "Kia Sportage για ενοικίαση στη Νάξο" },
  },
  "fleet/cars/peugeot-208": {
    title: { en: "Peugeot 208 Rental Naxos | Specs & Live Availability", el: "Peugeot 208 Ενοικίαση Νάξος | Χαρακτηριστικά & Διαθεσιμότητα" },
    description: { en: "See Peugeot 208 rental details for Naxos: 5 seats, automatic transmission, petrol and 5 doors. Check live availability.", el: "Δείτε Peugeot 208 για ενοικίαση στη Νάξο: 5 θέσεις, αυτόματο, βενζίνη και 5 πόρτες. Ελέγξτε διαθεσιμότητα." },
    h1: { en: "Peugeot 208 rental in Naxos", el: "Peugeot 208 για ενοικίαση στη Νάξο" },
  },
  "fleet/cars/suzuki-jimny": {
    title: { en: "Suzuki Jimny 4×4 Rental Naxos | Specs & Live Availability", el: "Suzuki Jimny 4×4 Ενοικίαση Νάξος | Χαρακτηριστικά & Διαθεσιμότητα" },
    description: { en: "See Suzuki Jimny 4×4 rental details for Naxos: 4 seats, manual transmission, petrol and 3 doors. Check live availability.", el: "Δείτε Suzuki Jimny 4×4 για ενοικίαση στη Νάξο: 4 θέσεις, χειροκίνητο, βενζίνη και 3 πόρτες. Ελέγξτε διαθεσιμότητα." },
    h1: { en: "Suzuki Jimny 4×4 rental in Naxos", el: "Suzuki Jimny 4×4 για ενοικίαση στη Νάξο" },
  },
  "fleet/cars/toyota-aygo": {
    title: { en: "Toyota Aygo X Rental Naxos | Specs & Live Availability", el: "Toyota Aygo X Ενοικίαση Νάξος | Χαρακτηριστικά & Διαθεσιμότητα" },
    description: { en: "See Toyota Aygo X rental details for Naxos: 5 seats, manual transmission, petrol and 5 doors. Check live availability.", el: "Δείτε Toyota Aygo X για ενοικίαση στη Νάξο: 5 θέσεις, χειροκίνητο, βενζίνη και 5 πόρτες. Ελέγξτε διαθεσιμότητα." },
    h1: { en: "Toyota Aygo X rental in Naxos", el: "Toyota Aygo X για ενοικίαση στη Νάξο" },
  },
  "fleet/cars/toyota-rav4": {
    title: { en: "Toyota RAV4 Hybrid Rental Naxos | Specs & Live Availability", el: "Toyota RAV4 Hybrid Ενοικίαση Νάξος | Χαρακτηριστικά & Διαθεσιμότητα" },
    description: { en: "See Toyota RAV4 Hybrid rental details for Naxos: {{VERIFY}} seats, {{verify}} transmission, hybrid and {{VERIFY}} doors. Check live availability.", el: "Δείτε Toyota RAV4 Hybrid για ενοικίαση στη Νάξο: {{VERIFY}} θέσεις, {{verify}}, υβριδικό και {{VERIFY}} πόρτες. Ελέγξτε διαθεσιμότητα." },
    h1: { en: "Toyota RAV4 Hybrid rental in Naxos", el: "Toyota RAV4 Hybrid για ενοικίαση στη Νάξο" },
  },
  "fleet/collections/automatic": {
    title: { en: "Automatic Car Rental in Naxos | Compare Live Availability", el: "Αυτόματο Αυτοκίνητο στη Νάξο | Ζωντανή Διαθεσιμότητα" },
    description: { en: "Automatic Car Rental in Naxos: compare seats, luggage, transmission and current availability. Review exact terms and continue to secure booking.", el: "Αυτόματο Αυτοκίνητο στη Νάξο: συγκρίνετε θέσεις, αποσκευές, κιβώτιο και διαθεσιμότητα. Ελέγξτε ακριβείς όρους και συνεχίστε σε ασφαλή κράτηση." },
    h1: { en: "Automatic Car Rental in Naxos", el: "Αυτόματο Αυτοκίνητο στη Νάξο" },
  },
  "fleet/collections/family-7-seater": {
    title: { en: "7-Seater & Family Car Rental in Naxos | Compare Live Availability", el: "7θέσια & Οικογενειακά Αυτοκίνητα στη Νάξο | Ζωντανή Διαθεσιμότητα" },
    description: { en: "7-Seater & Family Car Rental in Naxos: compare seats, luggage, transmission and current availability. Review exact terms and continue to secure booking.", el: "7θέσια & Οικογενειακά Αυτοκίνητα στη Νάξο: συγκρίνετε θέσεις, αποσκευές, κιβώτιο και διαθεσιμότητα. Ελέγξτε ακριβείς όρους και συνεχίστε σε ασφαλή κράτηση." },
    h1: { en: "7-Seater & Family Car Rental in Naxos", el: "7θέσια & Οικογενειακά Αυτοκίνητα στη Νάξο" },
  },
  "fleet/collections/suv-4x4": {
    title: { en: "SUV & 4×4 Rental in Naxos | Compare Live Availability", el: "SUV & 4×4 Ενοικίαση στη Νάξο | Ζωντανή Διαθεσιμότητα" },
    description: { en: "SUV & 4×4 Rental in Naxos: compare seats, luggage, transmission and current availability. Review exact terms and continue to secure booking.", el: "SUV & 4×4 Ενοικίαση στη Νάξο: συγκρίνετε θέσεις, αποσκευές, κιβώτιο και διαθεσιμότητα. Ελέγξτε ακριβείς όρους και συνεχίστε σε ασφαλή κράτηση." },
    h1: { en: "SUV & 4×4 Rental in Naxos", el: "SUV & 4×4 Ενοικίαση στη Νάξο" },
  },
  "guides": {
    title: { en: "Naxos Driving Guides | Routes, Parking, Beaches & Villages", el: "Οδηγοί Οδήγησης Νάξος | Διαδρομές, Parking & Παραλίες" },
    description: { en: "Use local Naxos driving guides for port and airport pickup, parking, beaches, villages, road trips, licences, insurance and rental decisions.", el: "Τοπικοί οδηγοί για παραλαβή σε λιμάνι/αεροδρόμιο, parking, παραλίες, χωριά, road trips, δίπλωμα, ασφάλεια και επιλογή οχήματος." },
    h1: { en: "Naxos driving and car rental guides", el: "Οδηγοί οδήγησης και ενοικίασης αυτοκινήτου στη Νάξο" },
  },
  "guides/best-beaches-by-car-naxos": {
    title: { en: "Best Naxos Beaches by Car: Routes, Parking & Stops", el: "Καλύτερες Παραλίες Νάξου με Αυτοκίνητο: Διαδρομές & Parking" },
    description: { en: "Best Naxos Beaches by Car: Routes, Parking & Stops. Get a direct answer, verified decision points, practical Naxos context and links to the relevant fleet, te", el: "Καλύτερες Παραλίες Νάξου με Αυτοκίνητο: Διαδρομές & Parking. Άμεση απάντηση, επιβεβαιωμένα κριτήρια, πρακτικό πλαίσιο για τη Νάξο και σύνδεση με στόλο, όρους" },
    h1: { en: "Best Naxos Beaches by Car: Routes, Parking & Stops", el: "Καλύτερες Παραλίες Νάξου με Αυτοκίνητο: Διαδρομές & Parking" },
  },
  "guides/best-car-rental-naxos-reviews-comparison": {
    title: { en: "Best Car Rental in Naxos: A 12-Point Comparison", el: "Καλύτερη Ενοικίαση Αυτοκινήτου στη Νάξο: 12 Κριτήρια" },
    description: { en: "Best Car Rental in Naxos: A 12-Point Comparison. Get a direct answer, verified decision points, practical Naxos context and links to the relevant fleet, terms", el: "Καλύτερη Ενοικίαση Αυτοκινήτου στη Νάξο: 12 Κριτήρια. Άμεση απάντηση, επιβεβαιωμένα κριτήρια, πρακτικό πλαίσιο για τη Νάξο και σύνδεση με στόλο, όρους και κρά" },
    h1: { en: "Best Car Rental in Naxos: A 12-Point Comparison", el: "Καλύτερη Ενοικίαση Αυτοκινήτου στη Νάξο: 12 Κριτήρια" },
  },
  "guides/do-you-need-a-car-in-naxos": {
    title: { en: "Do You Need a Car in Naxos? Honest Guide by Trip Type", el: "Χρειάζεται Αυτοκίνητο στη Νάξο; Ειλικρινής Οδηγός" },
    description: { en: "Do You Need a Car in Naxos? Honest Guide by Trip Type. Get a direct answer, verified decision points, practical Naxos context and links to the relevant fleet,", el: "Χρειάζεται Αυτοκίνητο στη Νάξο; Ειλικρινής Οδηγός. Άμεση απάντηση, επιβεβαιωμένα κριτήρια, πρακτικό πλαίσιο για τη Νάξο και σύνδεση με στόλο, όρους και κράτησ" },
    h1: { en: "Do You Need a Car in Naxos? Honest Guide by Trip Type", el: "Χρειάζεται Αυτοκίνητο στη Νάξο; Ειλικρινής Οδηγός" },
  },
  "guides/driving-in-naxos": {
    title: { en: "Driving in Naxos: Roads, Rules, Fuel & Local Advice", el: "Οδήγηση στη Νάξο: Δρόμοι, Κανόνες, Καύσιμα & Tips" },
    description: { en: "Driving in Naxos: Roads, Rules, Fuel & Local Advice. Get a direct answer, verified decision points, practical Naxos context and links to the relevant fleet, t", el: "Οδήγηση στη Νάξο: Δρόμοι, Κανόνες, Καύσιμα & Tips. Άμεση απάντηση, επιβεβαιωμένα κριτήρια, πρακτικό πλαίσιο για τη Νάξο και σύνδεση με στόλο, όρους και κράτησ" },
    h1: { en: "Driving in Naxos: Roads, Rules, Fuel & Local Advice", el: "Οδήγηση στη Νάξο: Δρόμοι, Κανόνες, Καύσιμα & Tips" },
  },
  "guides/idp-greece-rules": {
    title: { en: "International Driving Permit for Greece: Rental Rules", el: "Διεθνές Δίπλωμα Οδήγησης στην Ελλάδα: Κανόνες Ενοικίασης" },
    description: { en: "International Driving Permit for Greece: Rental Rules. Get a direct answer, verified decision points, practical Naxos context and links to the relevant fleet,", el: "Διεθνές Δίπλωμα Οδήγησης στην Ελλάδα: Κανόνες Ενοικίασης. Άμεση απάντηση, επιβεβαιωμένα κριτήρια, πρακτικό πλαίσιο για τη Νάξο και σύνδεση με στόλο, όρους και" },
    h1: { en: "International Driving Permit for Greece: Rental Rules", el: "Διεθνές Δίπλωμα Οδήγησης στην Ελλάδα: Κανόνες Ενοικίασης" },
  },
  "guides/naxos-car-rental-without-credit-card-insurance": {
    title: { en: "Naxos Car Rental Without a Credit Card: What to Check", el: "Ενοικίαση Αυτοκινήτου Νάξος Χωρίς Πιστωτική: Τι να Ελέγξετε" },
    description: { en: "Naxos Car Rental Without a Credit Card: What to Check. Get a direct answer, verified decision points, practical Naxos context and links to the relevant fleet,", el: "Ενοικίαση Αυτοκινήτου Νάξος Χωρίς Πιστωτική: Τι να Ελέγξετε. Άμεση απάντηση, επιβεβαιωμένα κριτήρια, πρακτικό πλαίσιο για τη Νάξο και σύνδεση με στόλο, όρους" },
    h1: { en: "Naxos Car Rental Without a Credit Card: What to Check", el: "Ενοικίαση Αυτοκινήτου Νάξος Χωρίς Πιστωτική: Τι να Ελέγξετε" },
  },
  "guides/naxos-mountain-villages-by-car": {
    title: { en: "Naxos Mountain Villages by Car: Chalki, Filoti & Apeiranthos", el: "Ορεινά Χωριά Νάξου με Αυτοκίνητο: Χαλκί, Φιλώτι & Απείρανθος" },
    description: { en: "Naxos Mountain Villages by Car: Chalki, Filoti & Apeiranthos. Get a direct answer, verified decision points, practical Naxos context and links to the relevant", el: "Ορεινά Χωριά Νάξου με Αυτοκίνητο: Χαλκί, Φιλώτι & Απείρανθος. Άμεση απάντηση, επιβεβαιωμένα κριτήρια, πρακτικό πλαίσιο για τη Νάξο και σύνδεση με στόλο, όρους" },
    h1: { en: "Naxos Mountain Villages by Car: Chalki, Filoti & Apeiranthos", el: "Ορεινά Χωριά Νάξου με Αυτοκίνητο: Χαλκί, Φιλώτι & Απείρανθος" },
  },
  "guides/naxos-rent-a-car-prices-cost-breakdown": {
    title: { en: "Naxos Car Rental Prices: Complete Cost Breakdown", el: "Τιμές Ενοικίασης Αυτοκινήτου Νάξος: Πλήρης Ανάλυση" },
    description: { en: "Naxos Car Rental Prices: Complete Cost Breakdown. Get a direct answer, verified decision points, practical Naxos context and links to the relevant fleet, term", el: "Τιμές Ενοικίασης Αυτοκινήτου Νάξος: Πλήρης Ανάλυση. Άμεση απάντηση, επιβεβαιωμένα κριτήρια, πρακτικό πλαίσιο για τη Νάξο και σύνδεση με στόλο, όρους και κράτη" },
    h1: { en: "Naxos Car Rental Prices: Complete Cost Breakdown", el: "Τιμές Ενοικίασης Αυτοκινήτου Νάξος: Πλήρης Ανάλυση" },
  },
  "guides/naxos-road-trip-itinerary": {
    title: { en: "Naxos Road Trip Itinerary: 1, 3 and 5-Day Plans", el: "Road Trip Νάξος: Πρόγραμμα 1, 3 και 5 Ημερών" },
    description: { en: "Naxos Road Trip Itinerary: 1, 3 and 5-Day Plans. Get a direct answer, verified decision points, practical Naxos context and links to the relevant fleet, terms", el: "Road Trip Νάξος: Πρόγραμμα 1, 3 και 5 Ημερών. Άμεση απάντηση, επιβεβαιωμένα κριτήρια, πρακτικό πλαίσιο για τη Νάξο και σύνδεση με στόλο, όρους και κράτηση." },
    h1: { en: "Naxos Road Trip Itinerary: 1, 3 and 5-Day Plans", el: "Road Trip Νάξος: Πρόγραμμα 1, 3 και 5 Ημερών" },
  },
  "guides/new-greek-traffic-code-2026": {
    title: { en: "Greek Traffic Code 2026: What Drivers in Naxos Need", el: "Νέος ΚΟΚ 2026: Τι Πρέπει να Ξέρουν οι Οδηγοί στη Νάξο" },
    description: { en: "Greek Traffic Code 2026: What Drivers in Naxos Need. Get a direct answer, verified decision points, practical Naxos context and links to the relevant fleet, t", el: "Νέος ΚΟΚ 2026: Τι Πρέπει να Ξέρουν οι Οδηγοί στη Νάξο. Άμεση απάντηση, επιβεβαιωμένα κριτήρια, πρακτικό πλαίσιο για τη Νάξο και σύνδεση με στόλο, όρους και κρ" },
    h1: { en: "Greek Traffic Code 2026: What Drivers in Naxos Need", el: "Νέος ΚΟΚ 2026: Τι Πρέπει να Ξέρουν οι Οδηγοί στη Νάξο" },
  },
  "guides/parking-in-naxos": {
    title: { en: "Parking in Naxos: Chora, Beaches & Practical Rules", el: "Parking στη Νάξο: Χώρα, Παραλίες & Πρακτικοί Κανόνες" },
    description: { en: "Parking in Naxos: Chora, Beaches & Practical Rules. Get a direct answer, verified decision points, practical Naxos context and links to the relevant fleet, te", el: "Parking στη Νάξο: Χώρα, Παραλίες & Πρακτικοί Κανόνες. Άμεση απάντηση, επιβεβαιωμένα κριτήρια, πρακτικό πλαίσιο για τη Νάξο και σύνδεση με στόλο, όρους και κρά" },
    h1: { en: "Parking in Naxos: Chora, Beaches & Practical Rules", el: "Parking στη Νάξο: Χώρα, Παραλίες & Πρακτικοί Κανόνες" },
  },
  "guides/rent-a-car-naxos-port-vs-airport-pickup-guide": {
    title: { en: "Naxos Port vs Airport Car Rental Pickup", el: "Παραλαβή Αυτοκινήτου Νάξος: Λιμάνι ή Αεροδρόμιο" },
    description: { en: "Naxos Port vs Airport Car Rental Pickup. Get a direct answer, verified decision points, practical Naxos context and links to the relevant fleet, terms and boo", el: "Παραλαβή Αυτοκινήτου Νάξος: Λιμάνι ή Αεροδρόμιο. Άμεση απάντηση, επιβεβαιωμένα κριτήρια, πρακτικό πλαίσιο για τη Νάξο και σύνδεση με στόλο, όρους και κράτηση." },
    h1: { en: "Naxos Port vs Airport Car Rental Pickup", el: "Παραλαβή Αυτοκινήτου Νάξος: Λιμάνι ή Αεροδρόμιο" },
  },
  "insurance": {
    title: { en: "Naxos Car Rental Insurance | Cover, Excess & Exclusions", el: "Ασφάλεια Ενοικιαζόμενου Νάξος | Κάλυψη, Απαλλαγή & Εξαιρέσεις" },
    description: { en: "Read the verified cover, excess, exclusions and driver responsibilities for your Naxos rental. Match the page wording exactly to the booking terms.", el: "Διαβάστε την επιβεβαιωμένη κάλυψη, απαλλαγή, εξαιρέσεις και ευθύνες οδηγού. Το περιεχόμενο πρέπει να συμφωνεί ακριβώς με τους όρους κράτησης." },
    h1: { en: "Car rental insurance in Naxos", el: "Ασφάλεια ενοικιαζόμενου αυτοκινήτου στη Νάξο" },
  },
  "locations": {
    title: { en: "Naxos Car Rental Locations | Port, Airport, Chora & Beaches", el: "Παραλαβή Αυτοκινήτου Νάξος | Λιμάνι, Αεροδρόμιο & Παραλίες" },
    description: { en: "Plan car pickup in Naxos at the port, airport, Chora or supported beach areas. Confirm the exact meeting point and availability for your booking.", el: "Οργανώστε παραλαβή αυτοκινήτου σε λιμάνι, αεροδρόμιο, Χώρα ή διαθέσιμες παραλιακές περιοχές. Επιβεβαιώστε ακριβές σημείο και διαθεσιμότητα." },
    h1: { en: "Car rental pickup locations in Naxos", el: "Σημεία παραλαβής αυτοκινήτου στη Νάξο" },
  },
  "locations/agia-anna": {
    title: { en: "Car Rental Agia Anna | Pickup Guide & Live Availability", el: "Ενοικίαση Αυτοκινήτου Αγία Άννα | Παραλαβή & Διαθεσιμότητα" },
    description: { en: "Plan car rental at Agia Anna with practical pickup, parking and route guidance. Confirm the exact meeting point and live availability for your dates.", el: "Οργανώστε ενοικίαση αυτοκινήτου σε Αγία Άννα με πρακτικές πληροφορίες παραλαβής, parking και διαδρομών. Επιβεβαιώστε σημείο και διαθεσιμότητα." },
    h1: { en: "Car rental at Agia Anna", el: "Ενοικίαση αυτοκινήτου: Αγία Άννα" },
  },
  "locations/agios-prokopios": {
    title: { en: "Car Rental Agios Prokopios | Pickup Guide & Live Availability", el: "Ενοικίαση Αυτοκινήτου Άγιος Προκόπιος | Παραλαβή & Διαθεσιμότητα" },
    description: { en: "Plan car rental at Agios Prokopios with practical pickup, parking and route guidance. Confirm the exact meeting point and live availability for your dates.", el: "Οργανώστε ενοικίαση αυτοκινήτου σε Άγιος Προκόπιος με πρακτικές πληροφορίες παραλαβής, parking και διαδρομών. Επιβεβαιώστε σημείο και διαθεσιμότητα." },
    h1: { en: "Car rental at Agios Prokopios", el: "Ενοικίαση αυτοκινήτου: Άγιος Προκόπιος" },
  },
  "locations/airport-pickup": {
    title: { en: "Car Rental Naxos Airport (JNX) | Pickup Guide & Live Availability", el: "Ενοικίαση Αυτοκινήτου Αεροδρόμιο Νάξου (JNX) | Παραλαβή & Διαθεσιμότητα" },
    description: { en: "Plan car rental at Naxos Airport (JNX) with practical pickup, parking and route guidance. Confirm the exact meeting point and live availability for your dates", el: "Οργανώστε ενοικίαση αυτοκινήτου σε Αεροδρόμιο Νάξου (JNX) με πρακτικές πληροφορίες παραλαβής, parking και διαδρομών. Επιβεβαιώστε σημείο και διαθεσιμότητα." },
    h1: { en: "Car rental at Naxos Airport (JNX)", el: "Ενοικίαση αυτοκινήτου: Αεροδρόμιο Νάξου (JNX)" },
  },
  "locations/apeiranthos": {
    title: { en: "Car Rental Apeiranthos | Pickup Guide & Live Availability", el: "Ενοικίαση Αυτοκινήτου Απείρανθος | Παραλαβή & Διαθεσιμότητα" },
    description: { en: "Plan car rental at Apeiranthos with practical pickup, parking and route guidance. Confirm the exact meeting point and live availability for your dates.", el: "Οργανώστε ενοικίαση αυτοκινήτου σε Απείρανθος με πρακτικές πληροφορίες παραλαβής, parking και διαδρομών. Επιβεβαιώστε σημείο και διαθεσιμότητα." },
    h1: { en: "Car rental at Apeiranthos", el: "Ενοικίαση αυτοκινήτου: Απείρανθος" },
  },
  "locations/filoti": {
    title: { en: "Car Rental Filoti | Pickup Guide & Live Availability", el: "Ενοικίαση Αυτοκινήτου Φιλώτι | Παραλαβή & Διαθεσιμότητα" },
    description: { en: "Plan car rental at Filoti with practical pickup, parking and route guidance. Confirm the exact meeting point and live availability for your dates.", el: "Οργανώστε ενοικίαση αυτοκινήτου σε Φιλώτι με πρακτικές πληροφορίες παραλαβής, parking και διαδρομών. Επιβεβαιώστε σημείο και διαθεσιμότητα." },
    h1: { en: "Car rental at Filoti", el: "Ενοικίαση αυτοκινήτου: Φιλώτι" },
  },
  "locations/mikri-vigla": {
    title: { en: "Car Rental Mikri Vigla | Pickup Guide & Live Availability", el: "Ενοικίαση Αυτοκινήτου Μικρή Βίγλα | Παραλαβή & Διαθεσιμότητα" },
    description: { en: "Plan car rental at Mikri Vigla with practical pickup, parking and route guidance. Confirm the exact meeting point and live availability for your dates.", el: "Οργανώστε ενοικίαση αυτοκινήτου σε Μικρή Βίγλα με πρακτικές πληροφορίες παραλαβής, parking και διαδρομών. Επιβεβαιώστε σημείο και διαθεσιμότητα." },
    h1: { en: "Car rental at Mikri Vigla", el: "Ενοικίαση αυτοκινήτου: Μικρή Βίγλα" },
  },
  "locations/naxos-town": {
    title: { en: "Car Rental Naxos Town (Chora) | Pickup Guide & Live Availability", el: "Ενοικίαση Αυτοκινήτου Χώρα Νάξου | Παραλαβή & Διαθεσιμότητα" },
    description: { en: "Plan car rental at Naxos Town (Chora) with practical pickup, parking and route guidance. Confirm the exact meeting point and live availability for your dates.", el: "Οργανώστε ενοικίαση αυτοκινήτου σε Χώρα Νάξου με πρακτικές πληροφορίες παραλαβής, parking και διαδρομών. Επιβεβαιώστε σημείο και διαθεσιμότητα." },
    h1: { en: "Car rental at Naxos Town (Chora)", el: "Ενοικίαση αυτοκινήτου: Χώρα Νάξου" },
  },
  "locations/plaka": {
    title: { en: "Car Rental Plaka | Pickup Guide & Live Availability", el: "Ενοικίαση Αυτοκινήτου Πλάκα | Παραλαβή & Διαθεσιμότητα" },
    description: { en: "Plan car rental at Plaka with practical pickup, parking and route guidance. Confirm the exact meeting point and live availability for your dates.", el: "Οργανώστε ενοικίαση αυτοκινήτου σε Πλάκα με πρακτικές πληροφορίες παραλαβής, parking και διαδρομών. Επιβεβαιώστε σημείο και διαθεσιμότητα." },
    h1: { en: "Car rental at Plaka", el: "Ενοικίαση αυτοκινήτου: Πλάκα" },
  },
  "locations/port-pickup": {
    title: { en: "Car Rental Naxos Port | Pickup Guide & Live Availability", el: "Ενοικίαση Αυτοκινήτου Λιμάνι Νάξου | Παραλαβή & Διαθεσιμότητα" },
    description: { en: "Plan car rental at Naxos Port with practical pickup, parking and route guidance. Confirm the exact meeting point and live availability for your dates.", el: "Οργανώστε ενοικίαση αυτοκινήτου σε Λιμάνι Νάξου με πρακτικές πληροφορίες παραλαβής, parking και διαδρομών. Επιβεβαιώστε σημείο και διαθεσιμότητα." },
    h1: { en: "Car rental at Naxos Port", el: "Ενοικίαση αυτοκινήτου: Λιμάνι Νάξου" },
  },
  "naxos": {
    title: { en: "Naxos Guide 2026 | Beaches, Villages, Routes & Local Tips", el: "Οδηγός Νάξου 2026 | Παραλίες, Χωριά, Διαδρομές & Tips" },
    description: { en: "Plan Naxos with a practical local guide to beaches, mountain villages, Chora, food, hiking, transport, driving routes and the best trip length.", el: "Οργανώστε τη Νάξο με πρακτικό οδηγό για παραλίες, ορεινά χωριά, Χώρα, φαγητό, πεζοπορία, μετακινήσεις, διαδρομές και ιδανική διάρκεια." },
    h1: { en: "Naxos travel guide: the island by coast, village and road", el: "Οδηγός Νάξου: ακτές, χωριά και διαδρομές" },
  },
  "naxos/beaches": {
    title: { en: "Best Beaches in Naxos | Map, Parking & Car Guide", el: "Καλύτερες Παραλίες Νάξου | Χάρτης, Parking & Αυτοκίνητο" },
    description: { en: "Compare Naxos beaches by sand, wind, family fit, facilities, parking and drive time from Chora—from Agios Prokopios to Alyko and beyond.", el: "Συγκρίνετε παραλίες Νάξου ανά άμμο, αέρα, οικογένειες, παροχές, parking και χρόνο από Χώρα—από Άγιο Προκόπιο έως Αλυκό." },
    h1: { en: "Naxos beaches: choose by wind, access and the day you want", el: "Παραλίες Νάξου: επιλέξτε με βάση αέρα, πρόσβαση και εμπειρία" },
  },
  "pricing": {
    title: { en: "Naxos Car Rental Prices | What Changes the Total Cost", el: "Τιμές Ενοικίασης Αυτοκινήτου Νάξος | Τι Επηρεάζει το Κόστος" },
    description: { en: "Understand what changes Naxos car rental prices: dates, vehicle category, cover, pickup, extras and cancellation. Check the live total for your trip.", el: "Δείτε τι επηρεάζει την τιμή ενοικίασης στη Νάξο: ημερομηνίες, κατηγορία, κάλυψη, παραλαβή, extras και ακύρωση. Ελέγξτε το τελικό ποσό online." },
    h1: { en: "Naxos car rental prices, explained", el: "Τιμές ενοικίασης αυτοκινήτου στη Νάξο, ξεκάθαρα" },
  },
};

/** Normalises leading/trailing slashes so callers can pass either form. */
export function blueprintCopy(path: string): BlueprintCopy | undefined {
  return BLUEPRINT_COPY[path.replace(/^\/+|\/+$/g, "")];
}

/** The workbook title for this path and locale, or undefined to fall back. */
export function blueprintTitle(path: string, locale: Locale): string | undefined {
  return blueprintCopy(path)?.title?.[locale];
}

export function blueprintDescription(path: string, locale: Locale): string | undefined {
  return blueprintCopy(path)?.description?.[locale];
}

export function blueprintH1(path: string, locale: Locale): string | undefined {
  return blueprintCopy(path)?.h1?.[locale];
}
