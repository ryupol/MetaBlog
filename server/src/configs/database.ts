import pg from "pg";
import { DB_NAME, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } from ".";
import logger from "./log";

const pool = new pg.Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: DB_NAME,
  port: 5432,
});

// Connection Validation Function
const connectToDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    logger.info("✅ PostgreSQL connected successfully!");
  } catch (error) {
    logger.error("❌ Error connecting to PostgreSQL", error);
  }
};

connectToDB();

export default pool;
