import dotenv from "dotenv";

dotenv.config();

const DATABASE_NAME: string = process.env.DATABASE_NAME!;
const DATABASE_TYPE: string = process.env.DATABASE_TYPE!;
const DATABASE_HOST: string = process.env.DATABASE_HOST!;
const DATABASE_PORT: number = ~process.env.DATABASE_PORT!;
const DATABASE_USERNAME: string = process.env.DATABASE_USERNAME!;
const DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD!;
const DATABASE: string = process.env.DATABASE!;
const SERVER_PORT: number = ~process.env.SERVER_PORT!;


export {
    DATABASE_NAME,
    DATABASE_TYPE,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE,
    SERVER_PORT,
}