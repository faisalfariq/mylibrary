import { Hono } from "hono";
import { db } from "../db/db.js";
import { books } from "../db/schema.js";
import { eq } from "drizzle-orm";

const bookRouter = new Hono();

// Ambil semua buku
bookRouter.get("/", async (c) => {
  const allBooks = await db.select().from(books);
  return c.json(allBooks);
});

// Tambah buku baru
bookRouter.post("/", async (c) => {
  const body = await c.req.json();
  const newBook = await db.insert(books).values(body);
  return c.json({ message: "Buku berhasil ditambahkan", book: newBook });
});

// Ambil detail buku berdasarkan ID
bookRouter.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const book = await db.select().from(books).where(eq(books.id, id));
  if (!book.length) return c.json({ message: "Buku tidak ditemukan" }, 404);
  return c.json(book[0]);
});

// Update buku berdasarkan ID
bookRouter.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  await db.update(books).set(body).where(eq(books.id, id));
  return c.json({ message: "Buku berhasil diperbarui" });
});

// Hapus buku berdasarkan ID
bookRouter.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await db.delete(books).where(eq(books.id, id));
  return c.json({ message: "Buku berhasil dihapus" });
});

export default bookRouter;
