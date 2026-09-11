import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/content";
import { getLocale } from "@/lib/i18n-server";
import { pickLocalized } from "@/lib/i18n";

export const runtime = "nodejs";
export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const project = await getProjectBySlug(slug);
    const locale = await getLocale();

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#F7F5F0",
            color: "#1A1815",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 80,
            fontFamily: "serif",
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6E6962",
              display: "flex",
            }}
          >
            {project.platform.map((p) => p.toUpperCase()).join(" / ")}
          </div>
          <div style={{ fontSize: 96, lineHeight: 1.05, display: "flex" }}>
            {pickLocalized(locale, project.title)}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#6E6962",
              display: "flex",
              maxWidth: 900,
            }}
          >
            {pickLocalized(locale, project.summary)}
          </div>
        </div>
      ),
      { ...size },
    );
  } catch {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#F7F5F0",
            color: "#1A1815",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            fontFamily: "serif",
          }}
        >
          Not Found
        </div>
      ),
      { ...size },
    );
  }
}