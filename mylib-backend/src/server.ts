import { Hono } from "hono";
import { db } from "./db/db.js";
import { books } from "./db/schema.js";
import { eq, like, and, or } from "drizzle-orm";
import { errorHandler } from "./middleware/errorHandler.js";
import {z} from "zod";
import { validate } from "./middleware/validate.js";
import bookRouter from "./routes/books.js";
import { cors } from "hono/cors";

const app = new Hono();

const bookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Category is required"),
    publisher: z.string().min(1, "Publisher is required"),
    isbn: z.string().min(1, "ISBN is required"),
    author: z.string().min(1, "Author is required"),
    year: z.number().int().positive().max(new Date().getFullYear()), 
    price: z.number().int().positive(), 
    desc: z.string().optional(),
});


app.use("*", errorHandler);

// Middleware CORS
app.use(
  cors({
    origin: "*", 
    allowMethods: ["GET", "POST", "PUT", "DELETE"], 
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (c) => {
  return c.text("Hello, Library!");
});

// Create book
app.post("/books", validate(bookSchema), async (c) => {
    const body = await c.req.json();
    await db.insert(books).values(body);
    return c.json({ message: "Book added successfully!" });
});

// Get All Books
app.get("/books", async (c) => {
  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 10;
  const offset = (page - 1) * limit;

  const keyword = c.req.query("keyword");
  const year = c.req.query("year");

  // Filter conditions
  const conditions = [];
  if (keyword) {
    conditions.push(
      or(
        like(books.title, `%${keyword}%`), 
        like(books.author, `%${keyword}%`) 
      )
    );
  }
  if (year) conditions.push(eq(books.year, Number(year)));

  const result = await db.select().from(books)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(limit)
    .offset(offset);

  return c.json({
    page,
    limit,
    total: result.length,
    data: result,
  });
});

//  Get Edited Book
app.get("/books/:id/edit", async (c) => {
    const id = Number(c.req.param("id"));
    const result = await db.select().from(books).where(eq(books.id, id));
    const book = result[0] || null; 
    return c.json({data: book});
});

// Get Showed Book
app.get("/books/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const result = await db.select().from(books).where(eq(books.id, id));
    const book = result[0] || null; 
    return c.json({data: book});
});

// Update Book
app.put("/books/:id",validate(bookSchema), async (c) => {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    await db.update(books).set(body).where(eq(books.id, id));
    return c.json({ message: "Book updated successfully!" });
});

// Delete book
app.delete("/books/:id", async (c) => {
    const id = Number(c.req.param("id"));
    await db.delete(books).where(eq(books.id, id));
    return c.json({ message: "Book deleted successfully!" });
});

export default app;
