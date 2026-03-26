import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getMongoClient } from "../db/index.ts";
import { isDev } from "../utils/index.ts";

const baseURL = process.env.BETTER_AUTH_URL;
const db = getMongoClient().db();

export const auth = betterAuth({
  appName: "Breed and Show Pro",
  database: mongodbAdapter(db),
  baseURL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  account: {
    skipStateCookieCheck: isDev,
  },
});
