import mongodb from "../db/index.mts";
import type { UpcomingDate } from "../../../shared/js/types.ts";

const upcomingCollection = () =>
  mongodb.getDb().collection<UpcomingDate>("upcomingDates");

export async function getAllUpcomingDates() {
  return upcomingCollection().find().toArray();
}

export async function getUpcomingDateById(id: string) {
  return upcomingCollection().findOne({ id: id });
}

export async function createUpcomingDate(date: UpcomingDate) {
  return upcomingCollection().insertOne(date);
}

export async function updateUpcomingDate(
  id: string,
  update: Partial<UpcomingDate>,
) {
  return upcomingCollection().updateOne({ id: id }, { $set: update });
}

export async function deleteUpcomingDate(id: string) {
  return upcomingCollection().deleteOne({ id: id });
}
