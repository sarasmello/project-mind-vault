import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import path from "path";

const url =
  process.env.DATABASE_URL ??
  `file:${path.join(process.cwd(), "local.db").replace(/\\/g, "/")}`;

const client = createClient({
  url,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
export type DB = typeof db;
