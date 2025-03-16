import { appRouter } from "./trpc.js";
import { Hono } from "hono";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const trpcApp = new Hono();

trpcApp.all(
  "/trpc/*",
  async (c) => {
    console.log("Received request:", c.req.method, c.req.url);
    return await fetchRequestHandler({
      endpoint: "/trpc",
      req: c.req.raw,
      router: appRouter,
      createContext: () => ({}),
    })
  }
);

export default trpcApp;
