export * from "./cors.ts";
export * from "./logging.ts";
import cors from "cors";

// This is the "VIP List" that the browser checks
const allowedOrigins = [
  "https://alexanderdombroski.github.io", // Original GH Pages
  "http://alexdombroski.com", // Your new custom domain
  "https://alexdombroski.com", // Your domain with SSL
  "http://www.alexdombroski.com", // www version
  "https://www.alexdombroski.com", // www with SSL
  "http://localhost:4321", // Local Astro dev
  "http://localhost:3000", // Local Server dev
];

export const corsHandler = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // This will show up in your Render logs if a new domain tries to connect
      console.error(`CORS blocked for origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
