import { initTRPC } from "@trpc/server";
import { booksRouter } from "./rpc/books.js"

export const t = initTRPC.create();

export const appRouter = t.router({
    books: booksRouter,
});

export type AppRouter = typeof appRouter;
