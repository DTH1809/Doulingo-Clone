import "dotenv/config"
import { defineConfig, type Config } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    schema: "./db/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    }
});