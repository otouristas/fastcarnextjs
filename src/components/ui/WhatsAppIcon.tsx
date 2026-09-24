import Image from "next/image";

/** Unmodified WhatsApp brand artwork, stored locally. */
export function WhatsAppIcon({className}:{className?:string}) {
  return <Image src="/images/whatsapp.svg" alt="" aria-hidden="true" width={39} height={39} className={className} unoptimized />;
}
