import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// For development, use placeholder URL if not configured
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://placeholder:placeholder@placeholder:5432/placeholder";

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
