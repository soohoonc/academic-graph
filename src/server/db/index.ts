import { Client } from "pg";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/env";
import * as schema from "./schema";

// const client = new Client({
//   connectionString: env.DATABASE_URL,
// });

// await client.connect();
const client = neon(env.DATABASE_URL);
export const db = drizzle(
  client,
  { schema }
);
