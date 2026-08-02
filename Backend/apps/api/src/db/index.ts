import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import "dotenv/config";

const url = process.env.DATABASE_URL!;

if (!url) {
  throw new Error(
    "DATABASE_URL is not defined in the environment variables."
  );
}

export const client = postgres(url);

export const db = drizzle(client, {
  schema,
  casing: "snake_case",
});