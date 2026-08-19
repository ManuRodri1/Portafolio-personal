import { ImageResponse } from "next/og"
import { OFFICIAL_NAME } from "@/lib/profile"

export const alt =
  `${OFFICIAL_NAME} — Business Intelligence, software, and applied AI systems`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
  const stages = ["Operations", "Data", "Software", "Applied AI"]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 66px",
          background: "#F7F5EF",
          color: "#152138",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #CBD1D7",
            paddingBottom: "20px",
          }}
        >
          <div style={{ display: "flex", fontSize: 24, fontWeight: 700 }}>
            {OFFICIAL_NAME}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: 16,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Dominican Republic
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: "60px" }}>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "12px",
                height: "52px",
                background: "#D45C50",
              }}
            />
            <div
              style={{
                display: "flex",
                maxWidth: "760px",
                fontSize: 62,
                fontWeight: 750,
                letterSpacing: "-0.045em",
                lineHeight: 0.98,
              }}
            >
              Business Intelligence · Software · Applied AI
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "330px",
              flexDirection: "column",
              borderTop: "2px solid #8491A3",
              borderBottom: "2px solid #8491A3",
              background: "#FCFBF7",
              padding: "20px",
            }}
          >
            {stages.map((stage, index) => (
              <div
                key={stage}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom:
                    index === stages.length - 1
                      ? "none"
                      : "1px solid #CBD1D7",
                  padding: "12px 0",
                  fontFamily: "monospace",
                  fontSize: 18,
                }}
              >
                <span style={{ color: "#315E8C" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{stage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
