import type { Event } from "../../../shared/types/schemas.ts";
import { getDb } from "../db/index.mts";

const eventCollection = async () => (await getDb()).collection<Event>("events");

export async function getAllEvents() {
  return (await eventCollection()).find().toArray();
}

export async function getEventById(id: string) {
  return (await eventCollection()).findOne({ _id: id });
}

export async function createEvent(event: Event) {
  return (await eventCollection()).insertOne(event);
}

export async function updateEvent(id: string, update: Partial<Event>) {
  return (await eventCollection()).updateOne({ _id: id }, { $set: update });
}

export async function deleteEvent(id: string) {
  return (await eventCollection()).deleteOne({ _id: id });
}
