import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDb } from "../db/index.mts";
import { isDev } from "../utils/index.ts";

const baseURL = process.env.BETTER_AUTH_URL;
const db = await getDb();

export const auth = betterAuth({
  appName: "Breed and Show Pro",
  database: mongodbAdapter(db),
  baseURL,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  account: {
    skipStateCookieCheck: isDev,
  },
  trustedOrigins: [
    "http://localhost:4321",
    "http://localhost:4322",
    "https://alexanderdombroski.github.io",
  ],
});
