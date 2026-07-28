import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLocale, localePath, SITE, type Locale } from "@/lib/site";
import { getDict } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { LOCATIONS } from "@/content/locations";
import { VEHICLES } from "@/content/fleet";
import { recommendForLocation } from "@/lib/vehicleRecommender";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArrowRight, MapPin, Mountain, Droplets, Wheat, Info, ExternalLink } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({
    locale,
    path: "naxos",
    title: "Discover Naxos  -  History, Beaches, Villages & Travel Guide",
    description: "Everything you need to know about Naxos: history, geography, beaches, mountain villages, local culture and the best vehicle for each destination.",
    keywords: ["Naxos guide", "Naxos island", "Naxos beaches", "Naxos villages", "Naxos history", "visiting Naxos"],
  });
}

const QUICK_FACTS: { label: { en: string; el: string; it: string; fr: string; de: string }; value: string }[] = [
  { label: { en: "Area", el: "Έκταση", it: "Superficie", fr: "Superficie", de: "Fläche" }, value: "430 km²" },
  { label: { en: "Highest point", el: "Υψηλότερο σημείο", it: "Punto più alto", fr: "Point culminant", de: "Höchster Punkt" }, value: "Mt Zas  -  1 004 m" },
  { label: { en: "Population (2021)", el: "Πληθυσμός (2021)", it: "Popolazione (2021)", fr: "Population (2021)", de: "Bevölkerung (2021)" }, value: "20 578" },
  { label: { en: "Capital", el: "Πρωτεύουσα", it: "Capitale", fr: "Capitale", de: "Hauptort" }, value: "Naxos Town (Chora)" },
  { label: { en: "Archipelago", el: "Αρχιπέλαγος", it: "Arcipelago", fr: "Archipel", de: "Archipel" }, value: "Cyclades" },
  { label: { en: "Time zone", el: "Ζώνη ώρας", it: "Fuso orario", fr: "Fuseau horaire", de: "Zeitzone" }, value: "EET/EEST (UTC+2/+3)" },
];

type HistoryItem = {
  title: Record<Locale, string>;
  body: Record<Locale, string>;
};

const HISTORY: HistoryItem[] = [
  {
    title: { en: "Mythic Naxos", el: "Μυθολογική Νάξος", it: "Naxos Mitica", fr: "Naxos Mythique", de: "Mythisches Naxos" },
    body: {
      en: "Greek mythology credits Naxos as the island where Zeus himself was raised in a cave on Mount Zas (the name echoes Zeus). It was here that Ariadne was abandoned by Theseus after helping him escape the Labyrinth  -  and where Dionysus, god of wine, found her and made her his bride. The island's association with Dionysus explains the ancient prosperity of its vineyards.",
      el: "Η ελληνική μυθολογία τοποθετεί στη Νάξο την ανατροφή του Δία σε σπηλιά του Ζα (το τοπωνύμιο παραπέμπει στο «Ζεύς»). Εδώ εγκατέλειψε ο Θησέας την Αριάδνη μετά τη διαφυγή του από τον Λαβύρινθο  -  και εδώ ο Διόνυσος, θεός του κρασιού, τη βρήκε και την έκανε σύζυγό του.",
      it: "La mitologia greca vuole che Zeus sia stato allevato in una grotta sul Monte Zas (il nome riecheggia Zeus). È qui che Teseo abbandonò Arianna dopo la fuga dal Labirinto, e qui Dioniso, dio del vino, la trovò e la fece sua sposa.",
      fr: "La mythologie grecque dit que Zeus lui-même a grandi dans une grotte du mont Zas (le nom évoque Zeus). C'est ici que Thésée abandonna Ariane après sa fuite du Labyrinthe  -  et ici que Dionysos, dieu du vin, la trouva et en fit son épouse.",
      de: "Die griechische Mythologie verortet die Kindheit des Zeus in einer Höhle des Mount Zas (der Name klingt wie Zeus). Hier verließ Theseus Ariadne nach seiner Flucht aus dem Labyrinth  -  und hier fand Dionysos, der Weingott, sie und machte sie zu seiner Braut.",
    },
  },
  {
    title: { en: "Cycladic Civilisation", el: "Κυκλαδικός Πολιτισμός", it: "Civiltà Cicladica", fr: "Civilisation Cycladique", de: "Kykladische Zivilisation" },
    body: {
      en: "Naxos was the most powerful island of the Early Cycladic period (3300–2000 BC), famed for its white marble and emery quarries. Cycladic figurines  -  the stark, minimalist white marble statuettes now iconic in modern art  -  were carved here using Naxian emery to shape them. The island supplied marble to projects across the Aegean world.",
      el: "Η Νάξος ήταν το ισχυρότερο νησί της Πρωτοκυκλαδικής περιόδου (3300–2000 π.Χ.), γνωστό για το λευκό μάρμαρό της και τα ορυχεία σμύριδας. Κυκλαδικά ειδώλια  -  τα λευκά μαρμάρινα αγαλματίδια που είναι σήμερα εικόνες  -  σμιλεύτηκαν εδώ. Το νησί προμήθευσε μάρμαρο σε έργα σε όλο το Αιγαίο.",
      it: "Naxos era la più potente isola del periodo cicladico antico (3300–2000 a.C.), famosa per il suo marmo bianco e le cave di smeriglio. I caratteristici idoli cicladici furono scolpiti qui usando lo smeriglio di Naxos.",
      fr: "Naxos était l'île la plus puissante de la période cycladique ancienne (3300–2000 av. J.-C.), célèbre pour son marbre blanc et ses carrières d'émeri. Les figurines cycladiques emblématiques y ont été sculptées à l'aide de l'émeri de Naxos.",
      de: "Naxos war die mächtigste Insel der frühen Kykladenzeit (3300–2000 v. Chr.), berühmt für seinen weißen Marmor und Schmirgelvorkommen. Die charakteristischen kykladischen Figurinen wurden hier aus Naxos-Schmirgel gehauen.",
    },
  },
  {
    title: { en: "Classical & Byzantine", el: "Κλασική & Βυζαντινή Εποχή", it: "Epoca Classica e Bizantina", fr: "Époque Classique et Byzantine", de: "Klassische & Byzantinische Zeit" },
    body: {
      en: "In the 6th century BC Naxos was among the wealthiest cities in Greece, building the massive Portara (the marble gateway still standing on the islet of Palatia) as the entrance of a never-completed temple to Apollo. The island later fell to the Persians, joined the Delian League, and entered Byzantine rule in 395 AD, which brought the construction of its remarkable hilltop Kastro and dozens of tower houses.",
      el: "Τον 6ο αιώνα π.Χ. η Νάξος ήταν από τις πλουσιότερες πόλεις της Ελλάδας, χτίζοντας την Πορτάρα  -  τη μαρμάρινη πύλη που στέκεται ακόμα στο νησάκι Παλάτια  -  ως είσοδο ενός ημιτελούς ναού του Απόλλωνα. Αργότερα έπεσε στους Πέρσες, εντάχθηκε στη Δηλιακή Συμμαχία και πέρασε στη βυζαντινή κυριαρχία το 395 μ.Χ.",
      it: "Nel VI secolo a.C. Naxos era tra le città più ricche della Grecia, costruendo la Portara  -  il portale in marmo ancora in piedi sull'isolotto di Palatia  -  come ingresso di un tempio incompiuto ad Apollo.",
      fr: "Au VIe siècle av. J.-C., Naxos était parmi les villes les plus riches de Grèce, construisant la Portara  -  le portail en marbre encore debout sur l'îlot de Palatia  -  comme entrée d'un temple inachevé dédié à Apollon.",
      de: "Im 6. Jahrhundert v. Chr. war Naxos eine der reichsten Städte Griechenlands und errichtete die Portara  -  das noch heute auf dem Inselchen Palatia stehende Marmortor  -  als Eingang eines nie vollendeten Apollo-Tempels.",
    },
  },
  {
    title: { en: "Venetian Duchy & Ottoman Rule", el: "Βενετοκρατία & Οθωμανική Εποχή", it: "Ducato Veneziano e Dominio Ottomano", fr: "Duché Vénitien et Domination Ottomane", de: "Venezianisches Herzogtum & Osmanische Zeit" },
    body: {
      en: "After the Fourth Crusade (1204), Naxos became the capital of the Duchy of the Archipelago under Marco Sanudo  -  a Venetian state that shaped the island's Catholic tower-house architecture, still visible in the Kastro quarter of Chora. The Ottomans took formal control in 1566 but allowed a degree of local autonomy. The legacy of Venetian rule is why Naxos has an unusual number of Catholic families and a Latin bishopric alongside the Orthodox Church.",
      el: "Μετά την Τέταρτη Σταυροφορία (1204), η Νάξος έγινε πρωτεύουσα του Δουκάτου του Αρχιπελάγους υπό τον Μάρκο Σανούδο  -  ένα βενετικό κράτος που διαμόρφωσε την αρχιτεκτονική των πύργων, ορατή σήμερα στο Κάστρο της Χώρας. Οι Οθωμανοί ανέλαβαν επίσημα τον έλεγχο το 1566.",
      it: "Dopo la Quarta Crociata (1204), Naxos divenne capitale del Ducato dell'Arcipelago sotto Marco Sanudo  -  uno stato veneziano che plasmò l'architettura delle case-torre, ancora visibile nel quartiere del Kastro di Chora.",
      fr: "Après la Quatrième Croisade (1204), Naxos devint la capitale du Duché de l'Archipel sous Marco Sanudo  -  un État vénitien qui façonna l'architecture des maisons-tours, encore visible dans le quartier du Kastro de Chora.",
      de: "Nach dem Vierten Kreuzzug (1204) wurde Naxos unter Marco Sanudo Hauptstadt des Herzogtums des Archipels  -  ein venezianischer Staat, der die Turmhausarchitektur prägte, die noch heute im Kastro-Viertel von Chora sichtbar ist.",
    },
  },
];

const BEACHES = [
  { slug: "agios-prokopios", image: "/images/naxos/agios-prokopios.jpg", name: "Agios Prokopios" },
  { slug: "agia-anna", image: "/images/naxos/agia-anna.jpg", name: "Agia Anna" },
  { slug: "plaka", image: "/images/naxos/plaka-beach.jpg", name: "Plaka" },
  { slug: "mikri-vigla", image: "/images/naxos/mikri-vigla.jpg", name: "Mikri Vigla" },
];

const VILLAGES = [
  { slug: "filoti", image: "/images/naxos/filoti.jpg", name: "Filoti" },
  { slug: "apeiranthos", image: "/images/naxos/apiranthos.jpg", name: "Apeiranthos" },
  { slug: "apollonas", image: "/images/naxos/apollonas.jpg", name: "Apollonas" },
  { slug: "chalki", image: "/images/naxos/halki.jpg", name: "Chalki" },
];

const GALLERY = [
  { src: "/images/naxos/gallery/naxos-portara.jpg", caption: { en: "The Portara at sunset", el: "Η Πορτάρα στο ηλιοβασίλεμα", it: "La Portara al tramonto", fr: "La Portara au coucher du soleil", de: "Die Portara bei Sonnenuntergang" } },
  { src: "/images/naxos/gallery/naxos-aerial.jpg", caption: { en: "Aerial view of Naxos coastline", el: "Εναέρια θέα της ακτογραμμής", it: "Vista aerea della costa", fr: "Vue aérienne de la côte", de: "Luftaufnahme der Küste" } },
  { src: "/images/naxos/gallery/naxos-chora.jpg", caption: { en: "Naxos Town (Chora)", el: "Χώρα της Νάξου", it: "Chora di Naxos", fr: "Chora de Naxos", de: "Naxos-Stadt (Chora)" } },
  { src: "/images/naxos/gallery/naxos-village.jpg", caption: { en: "A traditional Cycladic village", el: "Παραδοσιακό κυκλαδίτικο χωριό", it: "Un villaggio cicladico tradizionale", fr: "Un village cycladique traditionnel", de: "Ein traditionelles kykladisches Dorf" } },
  { src: "/images/naxos/gallery/naxos-mountain.jpg", caption: { en: "Mount Zas, highest peak of the Cyclades", el: "Όρος Ζας, η υψηλότερη κορυφή των Κυκλάδων", it: "Monte Zas, vetta più alta delle Cicladi", fr: "Mont Zas, sommet le plus haut des Cyclades", de: "Berg Zas, höchster Gipfel der Kykladen" } },
  { src: "/images/naxos/gallery/naxos-beach.jpg", caption: { en: "Crystal clear Aegean water", el: "Κρυστάλλινα νερά του Αιγαίου", it: "Acque cristalline del Mar Egeo", fr: "Eaux cristallines de la mer Égée", de: "Kristallklares ägäisches Wasser" } },
  { src: "/images/naxos/gallery/naxos-food.jpg", caption: { en: "Naxian cuisine  -  local produce and seafood", el: "Ναξιώτικη κουζίνα", it: "Cucina di Naxos", fr: "Cuisine de Naxos", de: "Naxiotische Küche" } },
  { src: "/images/naxos/gallery/naxos-windmill.jpg", caption: { en: "Traditional windmill, Chora", el: "Παραδοσιακός ανεμόμυλος, Χώρα", it: "Mulino tradizionale, Chora", fr: "Moulin à vent traditionnel, Chora", de: "Traditionelle Windmühle, Chora" } },
];

export default async function NaxosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDict(locale);
  const naxosTownRec = recommendForLocation("naxos-town", VEHICLES, 3);
  const nd = dict.naxos;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/naxos-island.jpg" alt="Naxos island aerial" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
          <Breadcrumbs label={dict.common.breadcrumb} items={[
            { label: dict.nav.home, href: localePath(locale) },
            { label: nd.pageTitle },
          ]} />
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">{nd.pageTitle}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">{nd.pageSubtitle}</p>
          <p className="mt-3 text-xs text-white/50">
            {nd.sourcedFrom}{" "}
            <a href="https://en.wikipedia.org/wiki/Naxos" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              Wikipedia  -  Naxos
            </a>{" "}
            (CC BY-SA 4.0)
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={localePath(locale, "naxos/beaches")} className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20">
              {nd.beachesTitle} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur hover:bg-white/20">
              {dict.nav.bookNow} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="bg-background border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{nd.quickFactsTitle}</h2>
          <div className="mt-6 overflow-hidden rounded-3xl border border-border">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {QUICK_FACTS.map((f) => (
                  <tr key={f.value} className="odd:bg-card even:bg-background">
                    <td className="px-5 py-3 font-bold text-foreground">{f.label[locale]}</td>
                    <td className="px-5 py-3 text-muted-foreground">{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            <Info className="mr-1 inline h-3.5 w-3.5" />
            {nd.sourcedFrom}{" "}
            <a href="https://en.wikipedia.org/wiki/Naxos" target="_blank" rel="noopener noreferrer" className="text-[var(--sea)] underline-offset-2 hover:underline">
              Wikipedia  -  Naxos <ExternalLink className="inline h-3 w-3" />
            </a>
          </p>
        </div>
      </section>

      {/* HISTORY */}
      <section className="bg-sand dark:bg-[var(--background)] border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Mountain className="h-6 w-6 text-[var(--sea)]" />
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{nd.historyTitle}</h2>
          </div>
          <div className="mt-8 space-y-4">
            {HISTORY.map((item) => (
              <details key={item.title.en} className="group rounded-3xl border border-border/60 bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 font-bold text-foreground transition-colors hover:text-[var(--sea)]">
                  {item.title[locale]}
                  <span className="ml-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{item.body[locale]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* GEOGRAPHY & CLIMATE */}
      <section className="bg-background border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Droplets className="h-6 w-6 text-[var(--sea)]" />
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{nd.geographyTitle}</h2>
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              {locale === "el" ? (
                <>
                  <p>Η Νάξος είναι το μεγαλύτερο νησί των Κυκλάδων με έκταση 430 km². Η ορεινή ενδοχώρα  -  η οποία δεν υπάρχει σε κανένα άλλο κυκλαδίτικο νησί σε τέτοια κλίμακα  -  κορυφώνεται στον Ζα (1.004 μ.), το ψηλότερο βουνό των Κυκλάδων.</p>
                  <p>Το κλίμα είναι τυπικά μεσογειακό: ξηρά, ζεστά καλοκαίρια (Ιούλιος–Αύγουστος 26–28°C) με έντονο μελτέμι από τον βορρά που δροσίζει τις ακτές, και ήπιοι χειμώνες με βροχές κυρίως τον Δεκέμβριο–Ιανουάριο. Η καλύτερη εποχή για ενοικίαση οχήματος: Μάιος–Ιούνιος και Σεπτέμβριος–Οκτώβριος.</p>
                </>
              ) : locale === "it" ? (
                <>
                  <p>Naxos è la più grande isola delle Cicladi con 430 km². Il suo entroterra montuoso  -  unico tra le isole cicladiche in tale misura  -  culmina nello Zas (1.004 m), la montagna più alta delle Cicladi.</p>
                  <p>Il clima è tipicamente mediterraneo: estati calde e secche (luglio–agosto 26–28°C) con il forte meltemi settentrionale che rinfresca le coste, e inverni miti con piogge principalmente a dicembre–gennaio. Periodo migliore per noleggiare: maggio–giugno e settembre–ottobre.</p>
                </>
              ) : locale === "fr" ? (
                <>
                  <p>Naxos est la plus grande île des Cyclades avec 430 km². Son arrière-pays montagneux  -  unique parmi les îles cycladiques à cette échelle  -  culmine au Zas (1 004 m), la plus haute montagne des Cyclades.</p>
                  <p>Le climat est typiquement méditerranéen : étés chauds et secs (juillet–août 26–28°C) avec un fort meltemi du nord qui rafraîchit les côtes, et hivers doux avec des pluies principalement en décembre–janvier. Meilleure période pour louer : mai–juin et septembre–octobre.</p>
                </>
              ) : locale === "de" ? (
                <>
                  <p>Naxos ist mit 430 km² die größte Insel der Kykladen. Das bergige Hinterland  -  einzigartig unter den Kykladeninseln in diesem Ausmaß  -  gipfelt im Zas (1.004 m), dem höchsten Berg der Kykladen.</p>
                  <p>Das Klima ist typisch mediterran: heiße, trockene Sommer (Juli–August 26–28°C) mit starkem Nordmeltemi, der die Küsten kühlt, und milde Winter mit Regen vor allem im Dezember–Januar. Beste Mietzeit: Mai–Juni und September–Oktober.</p>
                </>
              ) : (
                <>
                  <p>Naxos is the largest island of the Cyclades at 430 km². Its mountainous interior  -  found nowhere else in the Cyclades at this scale  -  peaks at Zas (1,004 m), the highest mountain of the Cyclades and a popular day hike from Filoti village.</p>
                  <p>The climate is typically Mediterranean: hot dry summers (July–August 26–28°C) with a strong north meltemi that keeps the beaches cool, and mild winters with rain mainly in December–January. Best time to rent a vehicle: May–June and September–October for quieter roads and comfortable temperatures.</p>
                </>
              )}
            </div>
            <div className="overflow-hidden rounded-3xl border border-border">
              <table className="w-full text-xs">
                <thead className="bg-[var(--sea-soft)] text-[var(--sea)] dark:bg-white/10 dark:text-[var(--sea-2)]">
                  <tr>
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
                      <th key={m} className="px-2 py-2 font-bold">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-white/5">
                    {[14,14,16,19,23,27,29,29,26,22,18,15].map((t, i) => (
                      <td key={i} className="px-2 py-2 text-center text-muted-foreground">{t}°</td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <p className="px-3 py-2 text-[10px] text-muted-foreground">Avg high °C  -  {nd.sourcedFrom} HNMS via Wikipedia</p>
            </div>
          </div>
        </div>
      </section>

      {/* ECONOMY & CULTURE */}
      <section className="bg-sand dark:bg-[var(--background)] border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Wheat className="h-6 w-6 text-[var(--sea)]" />
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{nd.economyTitle}</h2>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              {locale === "el" ? (
                <>
                  <p>Σε αντίθεση με πολλά κυκλαδίτικα νησιά που εξαρτώνται κυρίως από τον τουρισμό, η Νάξος παράγει ακόμα την τροφή της. Ο κάμπος της φιλοξενεί αμπελώνες, ελαιώνες, πατατόχωρα (η «Νάξια πατάτα» είναι ΠΓΕ) και τυροκομεία.</p>
                  <p>Τα σημαντικότερα τοπικά προϊόντα: <strong>Αρσενικό Νάξου</strong> (σκληρό ξυνό τυρί ΠΟΠ), <strong>Κίτρο</strong> (λικέρ από φύλλα κιτριάς  -  εντελώς μοναδικό στη Νάξο), <strong>Νάξιο μέλι</strong> από θυμάρι και <strong>Νάξιο μάρμαρο</strong> που εξακολουθεί να εξορύσσεται στα νοτιοανατολικά.</p>
                </>
              ) : locale === "it" ? (
                <>
                  <p>A differenza di molte isole cicladiche che dipendono principalmente dal turismo, Naxos produce ancora il proprio cibo. La sua pianura ospita vigneti, uliveti, campi di patate (la &quot;patata di Naxos&quot; è IGP) e caseifici.</p>
                  <p>I principali prodotti locali: <strong>Arseniko di Naxos</strong> (formaggio duro DOP), <strong>Kitron</strong> (liquore di foglie di cedro  -  unico a Naxos), <strong>miele di Naxos</strong> al timo e il <strong>marmo di Naxos</strong> ancora estratto a sudest.</p>
                </>
              ) : locale === "fr" ? (
                <>
                  <p>Contrairement à beaucoup d&apos;îles cycladiques qui dépendent principalement du tourisme, Naxos produit encore sa propre nourriture. Sa plaine accueille vignobles, oliveraies, champs de pommes de terre (la « pomme de terre de Naxos » est IGP) et fromageries.</p>
                  <p>Les principaux produits locaux : <strong>Arseniko de Naxos</strong> (fromage dur AOP), <strong>Kitron</strong> (liqueur de feuilles de cédratier  -  unique à Naxos), <strong>miel de Naxos</strong> au thym et le <strong>marbre de Naxos</strong> encore extrait au sud-est.</p>
                </>
              ) : locale === "de" ? (
                <>
                  <p>Im Gegensatz zu vielen anderen Kykladeninseln, die hauptsächlich vom Tourismus abhängen, produziert Naxos noch immer seine eigenen Lebensmittel. Die Ebene beherbergt Weinberge, Olivenhaine, Kartoffeläcker (die „Naxos-Kartoffel“ ist g.g.A.) und Käsereien.</p>
                  <p>Die wichtigsten lokalen Produkte: <strong>Arseniko von Naxos</strong> (hartkäse g.U.), <strong>Kitron</strong> (Zitronslikör  -  einzigartig auf Naxos), <strong>Naxos-Honig</strong> aus Thymian und der <strong>Naxos-Marmor</strong>, der im Südosten noch abgebaut wird.</p>
                </>
              ) : (
                <>
                  <p>Unlike many Cycladic islands that rely almost entirely on tourism, Naxos still produces its own food. Its fertile plain hosts vineyards, olive groves, potato fields (the “Naxian potato” holds EU PGI status) and cheese dairies.</p>
                  <p>Key local products: <strong>Arseniko Naxou</strong> (hard sharp PDO cheese), <strong>Kitron</strong> (a liqueur made from citron leaves  -  completely unique to Naxos), <strong>Naxian thyme honey</strong> and <strong>Naxian marble</strong> still quarried in the southeast  -  the same stone used for the Portara 2,600 years ago.</p>
                </>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { src: "/images/naxos/kitron.jpg", alt: "Kitron liqueur" },
                { src: "/images/naxos/naxian-cheese.jpg", alt: "Arseniko cheese" },
                { src: "/images/naxos/taverna.jpg", alt: "Naxian taverna" },
                { src: "/images/naxos/landscape.jpg", alt: "Naxos landscape" },
              ].map((img) => (
                <div key={img.src} className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BEACHES & VILLAGES */}
      <section className="bg-background border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-[var(--sea)]" />
              <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{nd.beachesTitle}</h2>
            </div>
            <Link href={localePath(locale, "naxos/beaches")} className="inline-flex items-center gap-1 text-sm font-bold text-[var(--sea)] hover:text-[var(--brand-2)]">
              {nd.readMoreAbout} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BEACHES.map((beach) => {
              const loc = LOCATIONS.find((l) => l.slug === beach.slug);
              return (
                <Link key={beach.slug} href={localePath(locale, `locations/${beach.slug}`)} className="group island-card overflow-hidden rounded-3xl transition-transform hover:-translate-y-1">
                  <div className="relative h-40 overflow-hidden rounded-2xl">
                    <Image src={beach.image} alt={beach.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-foreground">{beach.name}</p>
                    {loc && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{loc.hero[locale]}</p>}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold text-foreground">
              {locale === "el" ? "Ορεινά Χωριά" : locale === "it" ? "Villaggi di Montagna" : locale === "fr" ? "Villages de Montagne" : locale === "de" ? "Bergdörfer" : "Mountain Villages"}
            </h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VILLAGES.map((village) => {
                const loc = LOCATIONS.find((l) => l.slug === village.slug);
                return (
                  <Link key={village.slug} href={localePath(locale, `locations/${village.slug}`)} className="group island-card overflow-hidden rounded-3xl transition-transform hover:-translate-y-1">
                    <div className="relative h-40 overflow-hidden rounded-2xl">
                      <Image src={village.image} alt={village.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-foreground">{village.name}</p>
                      {loc && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{loc.hero[locale]}</p>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDED VEHICLES */}
      {naxosTownRec.length > 0 && (
        <section className="bg-sand dark:bg-[var(--background)] border-b border-border/70">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
              {nd.bestVehicleFor} Naxos
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {naxosTownRec.map(({ vehicle, reason }) => (
                <div key={vehicle.slug} className="relative">
                  <span className="absolute -top-3 left-4 z-10 inline-flex rounded-full bg-[var(--sea)] px-3 py-1 text-[11px] font-bold text-[var(--primary-foreground)] shadow">
                    {reason[locale]}
                  </span>
                  <VehicleCard vehicle={vehicle} locale={locale} dict={dict} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      <section className="bg-background border-b border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{nd.galleryTitle}</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {GALLERY.map((item) => (
              <figure key={item.src} className="overflow-hidden rounded-2xl">
                <div className="relative aspect-square">
                  <Image src={item.src} alt={item.caption[locale]} fill className="object-cover" />
                </div>
                <figcaption className="mt-1 px-1 text-[10px] italic text-muted-foreground">{item.caption[locale]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="bg-sand dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-foreground">{nd.referencesTitle}</h2>
          <ol className="mt-4 space-y-2 text-xs text-muted-foreground">
            <li>[1] Wikipedia contributors. “Naxos.” Wikipedia, The Free Encyclopedia. <a href="https://en.wikipedia.org/wiki/Naxos" target="_blank" rel="noopener noreferrer" className="text-[var(--sea)] hover:underline">https://en.wikipedia.org/wiki/Naxos</a>. Accessed {new Date().getFullYear()}. Licensed under CC BY-SA 4.0.</li>
            <li>[2] Wikipedia contributors. “Duchy of the Archipelago.” Wikipedia. <a href="https://en.wikipedia.org/wiki/Duchy_of_the_Archipelago" target="_blank" rel="noopener noreferrer" className="text-[var(--sea)] hover:underline">https://en.wikipedia.org/wiki/Duchy_of_the_Archipelago</a>. Accessed {new Date().getFullYear()}. CC BY-SA 4.0.</li>
            <li>[3] Hellenic National Meteorological Service (HNMS) climate data, as cited in Wikipedia  -  Naxos. Licensed under CC BY-SA 4.0.</li>
            <li>[4] European Commission. “Arseniko Naxou” PDO registration. European Union geographical indications register.</li>
          </ol>
        </div>
      </section>
    </>
  );
}
