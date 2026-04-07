import { getDb } from "../db/index.mts";
import type { Pig } from "../../../shared/types/schemas.ts";

const pigCollection = async () => (await getDb()).collection<Pig>("pigs");

export interface HerdSummary {
  total: number;
  open: number;
  bred: number;
  farrowed: number;
  active: number;
  archived: number;
}

/**
 * Get summary counts for the entire herd
 */
export async function getHerdSummaryCounts(): Promise<HerdSummary> {
  const collection = await pigCollection();

  // Get all pigs (excluding archived by default)
  const allPigs = await collection.find({ isArchived: false }).toArray();

  const summary: HerdSummary = {
    total: allPigs.length,
    open: 0,
    bred: 0,
    farrowed: 0,
    active: 0,
    archived: 0,
  };

  // Count by status
  allPigs.forEach((pig) => {
    switch (pig.status) {
      case "open":
        summary.open++;
        break;
      case "bred":
        summary.bred++;
        break;
      case "farrowed":
        summary.farrowed++;
        break;
      case "active":
        summary.active++;
        break;
    }
  });

  // Get archived count separately
  summary.archived = await collection.countDocuments({ isArchived: true });

  return summary;
}

/**
 * Get count of pigs by a specific status
 */
export async function getHerdCountByStatus(
  status: "open" | "bred" | "farrowed" | "active",
): Promise<number> {
  const collection = await pigCollection();
  return await collection.countDocuments({ status, isArchived: false });
}
