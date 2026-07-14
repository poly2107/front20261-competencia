import { api } from "./api";


export async function getTurmas() {

  const response = await api("/turmas");

  return response.data;

}