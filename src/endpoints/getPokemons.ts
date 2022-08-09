import { connection } from "./../index";
import e, { Request, Response } from "express";
import selectPokemons from "../data/selectPokemons";

export default async function getPokemons(req: Request, res: Response) {
  try {
    const name = req.query.name || "%";
    const type = req.query.Type_1 || "%";
    const sort = req.query.sort === "Name" ? "Name" : "id";
    const order = req.query.order === "DESC" ? "DESC" : "ASC";
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;

    //pag1 offset 10 * 0
    //pag2 offset 10 * 1
    //pag3 offset 10 * 2

    const offset: number = size * (page - 1);

    const result = await connection
      .select("*")
      .from("pokemon_go")
      .where("Name", "LIKE", `%${name}%`)
      .orWhere("Type_1", "LIKE", `%${type}%`)
      .orderBy(sort, order)
      .limit(size)
      .offset(offset);

    res.status(200).send(result);
  } catch (error: any) {
    res.status(400).send({ message: error.message || error.sqlMessage });
  }
}
