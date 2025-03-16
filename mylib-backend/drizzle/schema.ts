import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, serial, varchar, int, text, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const books = mysqlTable("books", {
	id: serial().notNull(),
	title: varchar({ length: 255 }).notNull(),
	category: varchar({ length: 100 }).notNull(),
	publisher: varchar({ length: 255 }).notNull(),
	isbn: varchar({ length: 20 }).notNull(),
	author: varchar({ length: 255 }).notNull(),
	year: int().notNull(),
	price: int().notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "books_id"}),
	unique("id").on(table.id),
]);
