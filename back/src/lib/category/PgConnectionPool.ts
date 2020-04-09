import { Pool } from "pg";

const pool = process.env.DATABASE_URL 
    ? new Pool({ connectionString: process.env.DATABASE_URL })
    : new Pool(); 

export default pool;