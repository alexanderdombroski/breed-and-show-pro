import mongodb from "./db/index.mts";
import app from "./app.ts";

const port = process.env.PORT || 3000;

mongodb.initDb((err: Error) => {
  if (err) {
    console.error("Error initializing database:", err);
    return;
  } else {
    const server = app.listen(port);

    if (process.env.NODE_ENV === "production") {
      process.on("SIGTERM", () => {
        server.close();
      });
    }
  }
});
