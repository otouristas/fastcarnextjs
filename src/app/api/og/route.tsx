import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? SITE.brand;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(60% 80% at 20% 100%, rgba(255, 68, 0, 0.55) 0%, transparent 60%), radial-gradient(50% 70% at 80% 0%, rgba(255, 140, 0, 0.45) 0%, transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #141414 100%)",
          padding: "72px",
          color: "#fff",
          fontFamily: "Inter, system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "linear-gradient(135deg, #ff8c00 0%, #ff4400 50%, #ff0000 100%)",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>{SITE.brand}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.7)", maxWidth: 900 }}>
            Cars · Scooters · ATVs · Buggies on Naxos
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.6)" }}>fastmotorrentalnaxos.gr</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              padding: "10px 22px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #ff8c00 0%, #ff4400 50%, #ff0000 100%)",
            }}
          >
            Free airport & port delivery
          </div>
        </div>
      </div>
    ),
    size,
  );
}
