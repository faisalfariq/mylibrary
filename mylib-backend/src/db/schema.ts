import { mysqlTable, mysqlSchema, AnyMySqlColumn, serial, varchar, int, text, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"
// import {  } from "drizzle-orm/pg-core"

export const books = mysqlTable("books", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    publisher: varchar("publisher", { length: 255 }).notNull(),
    isbn: varchar("isbn", { length: 20 }).notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    year: int("year").notNull(),
    price: int("price").notNull(), 
    desc: text("description"),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull()
});

