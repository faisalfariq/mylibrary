import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";

const connection = await (async () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQLLaragon123#",
    database: "my_library_db",
  });
})();

export const db = drizzle(connection, { schema, mode: "default" });