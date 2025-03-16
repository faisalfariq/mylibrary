import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { initTRPC } from "@trpc/server";
import trpcApp from "./trpcHandler.js";
import bookRoutes from "./server.js"; 

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello, Library!");
});

app.route("/api", bookRoutes); 

// implement trcp
// app.route("/trpc*", trpcApp);

// Jalankan server dengan `serve`
const PORT = process.env.PORT || 3000;
serve({
  fetch: app.fetch,
  port: Number(PORT),
});

console.log(`✅ Server berjalan di http://localhost:${PORT}`);
