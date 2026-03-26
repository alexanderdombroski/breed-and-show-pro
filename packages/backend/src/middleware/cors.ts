import cors from "cors";
import { isDev } from "../utils/index.ts";

export const corsHandler = cors({
  origin: isDev
    ? (origin, callback) => {
        if (
          !origin ||
          origin === "http://localhost:4321" ||
          origin === "http://localhost:4322"
        ) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
      }
    : "https://alexanderdombroski.github.io",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});
