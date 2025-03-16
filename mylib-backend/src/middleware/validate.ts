import { Context, Next } from "hono";
import { ZodSchema, ZodError } from "zod";

export const validate =
  (schema: ZodSchema) =>
  async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      schema.parse(body);
      await next();
    } catch (err) {
        if(err instanceof ZodError){
            return c.json({ error: err.format()}, 400);
        }
        return c.json({ error: "Internal Server Error"}, 400);
    }
  };
