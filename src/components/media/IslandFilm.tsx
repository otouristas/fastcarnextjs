"use client";
import Image from "next/image";
import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/site";
const copy = {
  en: ["A moment on Naxos", "Watch the island film", "Portara & Chora · Naxos"],
  el: [
    "Μια στιγμή στη Νάξο",
    "Δες το βίντεο του νησιού",
    "Πορτάρα & Χώρα · Νάξος",
  ],
  it: [
    "Un momento a Naxos",
    "Guarda il film dell’isola",
    "Portara e Chora · Naxos",
  ],
  fr: [
    "Un instant à Naxos",
    "Voir le film de l’île",
    "Portara et Chora · Naxos",
  ],
  de: ["Ein Moment auf Naxos", "Inselfilm ansehen", "Portara & Chora · Naxos"],
};
export function IslandFilm({ locale }: { locale: Locale }) {
  const [playing, setPlaying] = useState(false),
    c = copy[locale];
  return (
    <figure className="island-film">
      <div className="island-film-frame">
        {playing ? (
          <video
            src="/videos/naxos-portara-pexels-29851806.mp4"
            poster="/images/pexels/naxos-portara-film.webp"
            controls
            autoPlay
            muted
            playsInline
            preload="none"
            aria-label={c[2]}
            onError={() => setPlaying(false)}
          />
        ) : (
          <>
            <Image
              src="/images/pexels/naxos-portara-film.webp"
              alt={c[2]}
              fill
              sizes="(max-width:760px) 100vw, 90vw"
            />
            <div className="island-film-overlay">
              <span className="eyebrow">NAXOS / 06 SEC</span>
              <p>{c[0]}</p>
              <button onClick={() => setPlaying(true)} aria-label={c[1]}>
                <Play size={23} fill="currentColor" />
                <span>{c[1]}</span>
              </button>
            </div>
          </>
        )}
      </div>
      <figcaption>
        <span>{c[2]}</span>
        <a
          href="https://www.pexels.com/video/aerial-view-of-portara-and-naxos-town-29851806/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Film: Jack Mulhern / Pexels
          <ArrowUpRight size={12} />
        </a>
      </figcaption>
    </figure>
  );
}
