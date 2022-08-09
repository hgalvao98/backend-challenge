import express from "express";
import knex from "knex";
import dotenv from "dotenv";
import getPokemons from "./endpoints/getPokemons";

dotenv.config();

export const connection = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
  },
});

const PORT = 3306;

const app = express();
app.use(express.json());

app.get("/", getPokemons);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
