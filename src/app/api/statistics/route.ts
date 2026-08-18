import { NextResponse } from "next/server";
import { collectAirWarMonitorData } from "@/lib/data-engine/collectors/air-war-monitor";
import { validateAttackRecord } from "@/lib/data-engine/validator";

export async function GET() {
  try {
    console.log("[WCT] Starting statistics collection...");

    const records = await collectAirWarMonitorData();

    console.log(
      `[WCT] Collected ${records.length} statistics records`
    );

    const validatedRecords = records.map((record) => {
      const validation = validateAttackRecord(record);

      return {
        ...record,
        validation,
      };
    });

    return NextResponse.json({
      success: true,
      source: "Ukraine Air War Monitor",
      records: validatedRecords,
      collectedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      "[WCT] Statistics API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        source: "Ukraine Air War Monitor",
        error: "Failed to collect statistics.",
        details:
          error instanceof Error
            ? error.message
            : "Unknown error",
        collectedAt: new Date().toISOString(),
      },
      {
        status: 500,
      }
    );
  }
}