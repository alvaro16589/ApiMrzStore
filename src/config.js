import { config } from "dotenv";


config()

export const dotEnvValues = {
    PORT: process.env.PORT || 3000,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PORT: process.env.DB_PORT || 3306
}