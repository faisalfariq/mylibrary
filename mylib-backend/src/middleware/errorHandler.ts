import { Context, Next } from "hono";

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    console.error("Unhandled Error:", err);

    // Pastikan err memiliki tipe yang bisa kita baca
    if (err instanceof Error) {
      return c.json({ error: err.message }, 500);
    }

    return c.json({ error: "Internal Server Error" }, 500);
  }
};
