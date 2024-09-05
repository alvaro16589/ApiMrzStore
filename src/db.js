import { createPool } from "mysql2/promise";
import { dotEnvValues } from "./config.js";

export const pool = createPool({
    host: dotEnvValues.DB_HOST,
    user: dotEnvValues.DB_USER,
    password: dotEnvValues.DB_PASSWORD,
    port: dotEnvValues.DB_PORT,
    database: dotEnvValues.DB_DATABASE
})