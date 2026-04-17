import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.CLARITY_API_TOKEN;
  if (!token) {
    return NextResponse.json({
      configured: false,
      message: "Clarity API token not configured",
    });
  }

  try {
    const res = await fetch(
      "https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=1&dimension1=URL",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("[clarity] API error:", res.status, text);
      return NextResponse.json({
        configured: true,
        error: `Clarity API error: ${res.status}`,
      });
    }

    const raw = await res.json();

    // Parse the response into dashboard-friendly format
    let totalSessions = 0;
    let totalUsers = 0;
    let pagesPerSession = 0;
    let deadClicks = 0;
    let rageClicks = 0;
    const topPages: { url: string; sessions: number }[] = [];

    for (const metric of raw) {
      if (metric.metricName === "Traffic" && metric.information) {
        for (const info of metric.information) {
          const sessions = parseInt(info.totalSessionCount || "0", 10);
          const bots = parseInt(info.totalBotSessionCount || "0", 10);
          const realSessions = sessions - bots;
          totalSessions += realSessions;
          totalUsers += parseInt(info.distantUserCount || "0", 10);
          if (info.PagesPerSessionPercentage) {
            pagesPerSession = info.PagesPerSessionPercentage;
          }
          if (info.URL) {
            topPages.push({ url: info.URL, sessions: realSessions });
          }
        }
      }
      if (metric.metricName === "Dead Click Count" && metric.information) {
        for (const info of metric.information) {
          deadClicks += parseInt(info.totalCount || info.count || "0", 10);
        }
      }
      if (metric.metricName === "Rage Click Count" && metric.information) {
        for (const info of metric.information) {
          rageClicks += parseInt(info.totalCount || info.count || "0", 10);
        }
      }
    }

    // Sort top pages by sessions descending
    topPages.sort((a, b) => b.sessions - a.sessions);

    return NextResponse.json({
      configured: true,
      totalSessions,
      totalUsers,
      pagesPerSession: Math.round(pagesPerSession * 100) / 100,
      deadClicks,
      rageClicks,
      topPages: topPages.slice(0, 5),
    });
  } catch (err) {
    console.error("[clarity] Fetch error:", err);
    return NextResponse.json({
      configured: true,
      error: "Failed to fetch Clarity data",
    });
  }
}
