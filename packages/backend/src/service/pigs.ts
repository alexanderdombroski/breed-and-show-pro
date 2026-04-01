import type { Pig } from "../../../shared/types/schemas.ts";
import {
  getAllPigs as getAllPigsModel,
  getPigById as getPigByIdModel,
  createPig as createPigModel,
  updatePig as updatePigModel,
  deletePig as deletePigModel,
} from "../models/pigs.model.mts";

export async function listPigs(): Promise<Pig[]> {
  return getAllPigsModel();
}

export async function getPigById(id: string): Promise<Pig | null> {
  return getPigByIdModel(id);
}

export async function createPig(pig: Pig) {
  return createPigModel(pig);
}

export async function updatePig(id: string, update: Partial<Pig>) {
  return updatePigModel(id, update);
}

export async function deletePig(id: string) {
  return deletePigModel(id);
}
