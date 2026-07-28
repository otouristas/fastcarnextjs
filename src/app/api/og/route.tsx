import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Rent a Car Naxos";
    const subtitle = searchParams.get("subtitle") || SITE.tagline.en;
    const category = searchParams.get("category") || "Car Rental Naxos";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "60px 80px",
            backgroundColor: "#07204e",
            backgroundImage: "radial-gradient(circle at 80% 20%, #00b4d8 0%, #07204e 60%)",
            color: "white",
            fontFamily: "sans-serif",
          }}
        >
          {/* Top Bar / Brand */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  background: "linear-gradient(135deg, #0077b6, #00b4d8)",
                  padding: "10px 24px",
                  borderRadius: "30px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "white",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {category}
              </div>
            </div>
            <div style={{ fontSize: "20px", color: "#48cae4", fontWeight: "600" }}>
              naxos-carrentals.com
            </div>
          </div>

          {/* Main Title & Tagline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1000px" }}>
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "900",
                lineHeight: "1.1",
                color: "#f5faff",
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "26px",
                color: "#caf0f8",
                lineHeight: "1.4",
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              fontSize: "20px",
              color: "#90e0ef",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              paddingTop: "24px",
              width: "100%",
            }}
          >
            <span>🚗 Car rental on Naxos</span>
            <span>Fast Motor Rental Naxos</span>
            <span>naxos-carrentals.com</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response(`Failed to generate the OG image`, { status: 500 });
  }
}
