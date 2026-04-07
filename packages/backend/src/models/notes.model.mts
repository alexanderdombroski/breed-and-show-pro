import type { GenericNote } from "../../../shared/types/schemas.ts";
import { getDb } from "../db/index.mts";

const noteCollection = async () =>
  (await getDb()).collection<GenericNote>("notes");

export async function getAllNotes() {
  return (await noteCollection()).find().toArray();
}

export async function getNoteById(id: string) {
  return (await noteCollection()).findOne({ _id: id });
}

export async function getNoteByPigId(pigId: string) {
  return (await noteCollection()).findOne({ pigId: pigId });
}

export async function createNote(note: GenericNote) {
  return (await noteCollection()).insertOne(note);
}

export async function updateNote(id: string, update: Partial<GenericNote>) {
  return (await noteCollection()).updateOne({ _id: id }, { $set: update });
}

export async function deleteNote(id: string) {
  return (await noteCollection()).deleteOne({ pigId: id });
}
