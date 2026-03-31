import mongodb from "../db/index.mts";
import type { HerdSummary } from "../../../shared/js/types.ts";

const pigsCollection = () => mongodb.getDb().collection("pigs");

export async function getHerdSummaryCounts(): Promise<HerdSummary> {
  const total = await pigsCollection().countDocuments({});
  const bred = await pigsCollection().countDocuments({ status: "bred" });
  const farrowed = await pigsCollection().countDocuments({
    status: "farrowed",
  });
  const open = await pigsCollection().countDocuments({ status: "open" });

  return { total, bred, farrowed, open };
}

export async function getHerdCountByStatus(status: string) {
  return pigsCollection().countDocuments({ status });
}
