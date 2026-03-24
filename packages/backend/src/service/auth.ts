import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getMongoClient } from "../db/index.ts";

const baseURL = process.env.BETTER_AUTH_URL;
const db = getMongoClient().db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
