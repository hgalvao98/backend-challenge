import { Request, Response } from "express";
import selectPokemons from "../data/selectPokemons";

export default async function getPokemons(req: Request, res: Response) {
  try {
    const pokemons = await selectPokemons();

    res.status(200).send(pokemons);
  } catch (error: any) {
    res.status(400).send({ message: error.message || error.sqlMessage });
  }
}
