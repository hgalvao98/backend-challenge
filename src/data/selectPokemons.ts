import { connection } from "./../index";
export default async function selectPokemons() {
  const result = await connection.select("*").from("pokemon_go");

  return result;
}
