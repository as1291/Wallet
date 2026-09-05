// import { drizzle } from "drizzle-orm/neon-serverless";
// import { neon, neonConfig, Pool } from "@neondatabase/serverless";
// import { config } from "dotenv";
// import path from "path";
// import * as schema from "./schema";
// import ws from "ws";

// config({ path: path.resolve(__dirname, ".env") });



// // const sql = neon(process.env.DATABASE_URL!);
// // if (!sql) {
// //   throw new Error(
// //     "DATABASE_URL is not set. Make sure it is defined in your app's .env or .env.local file."
// //   );
// // }else{
// //   console.log("database url loaded");
// // }

// // export const db = drizzle({ client: sql });

// if (!process.env.DATABASE_URL) {
//   throw new Error(
//     "DATABASE_URL is not set. Make sure it is defined in your app's .env or .env.local file."
//   );
// } else {
//   console.log("database url loaded");
// }

// // Polyfill WebSocket for Node.js environments
// neonConfig.webSocketConstructor = ws;

// // Create a stateful connection pool instead of a stateless HTTP connection
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// //  const client = await pool.connect();

// // Initialize Drizzle with the Pool and your schema
// // export const db = drizzle({ client: pool, schema });
// export const db = drizzle(pool, {schema});

import { drizzle } from "drizzle-orm/neon-serverless";
import { neonConfig, Pool } from "@neondatabase/serverless";
import { config } from "dotenv";
import path from "path";
import ws from "ws";

import * as schema from "./schema";

config({
    path: path.resolve(__dirname, ".env")
});

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set.");
}

neonConfig.webSocketConstructor = ws;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const db = drizzle(pool, {
    schema
});