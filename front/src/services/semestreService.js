import { api } from "./api";


export async function getSemestres() {

  const response = await api("/semestres");

  return response.data;

}