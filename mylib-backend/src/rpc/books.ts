import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { db } from "../db/db.js"; // Import database instance
import { books } from "../db/schema.js"; // Import schema
import { like, and, eq } from "drizzle-orm";

export const t = initTRPC.create();

export const booksRouter = t.router({
  // ✅ Get All Books (with pagination & search)
  getAllBook: t.procedure
    .input(
      z.object({
        page: z.number().int().default(1),
        limit: z.number().int().default(10),
        search: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { page, limit, search } = input;
      const offset = (page - 1) * limit;

      const conditions = search ? [like(books.title, `%${search}%`)] : [];

      const totalBooks = await db.select().from(books).where(and(...conditions));
      const paginatedBooks = await db
        .select()
        .from(books)
        .where(and(...conditions))
        .limit(limit)
        .offset(offset);

      return {
        books: paginatedBooks,
        total: totalBooks.length,
        page,
        limit,
      };
    }),

  // ✅ Get Single Book by ID
  editBook: t.procedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const result = await db.select().from(books).where(eq(books.id, input.id));
      return result.length > 0 ? result[0] : null;
    }),

  // ✅ Add New Book
  addBook: t.procedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        category: z.string().min(1, "Category is required"),
        publisher: z.string().min(1, "Publisher is required"),
        isbn: z.string().min(1, "ISBN is required"),
        author: z.string().min(1, "Author is required"),
        year: z.number().int().positive().max(new Date().getFullYear()),
        price: z.number().int().positive(),
        desc: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const insertedId = await db.insert(books).values(input).$returningId();
      const newBook = { id: insertedId, ...input };
      return { success: true, book: newBook };
    }),

  // Update Book by ID
  updateBook: t.procedure
    .input(
      z.object({
        id: z.number().int().positive(),
        title: z.string().min(1, "Title is required"),
        category: z.string().min(1, "Category is required"),
        publisher: z.string().min(1, "Publisher is required"),
        isbn: z.string().min(1, "ISBN is required"),
        author: z.string().min(1, "Author is required"),
        year: z.number().int().positive().max(new Date().getFullYear()), 
        price: z.number().int().positive(),
        desc: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await db.update(books).set(input).where(eq(books.id, input.id));
      return { success: true, message: "Book updated successfully!" };
    }),

  deleteBook: t.procedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      await db.delete(books).where(eq(books.id, input.id));
      return { success: true, message: "Book deleted successfully!" };
    }),
});
