import { api } from "./api";


export async function getCursos() {

  const response = await api("/cursos");

  return response.data;

}



export async function createCurso(curso) {

  const response = await api("/cursos", {
    method: "POST",
    body: JSON.stringify(curso),
  });


  return response.data;

}



export async function updateCurso(id, curso) {

  const response = await api(`/cursos/${id}`, {
    method: "PUT",
    body: JSON.stringify(curso),
  });


  return response.data;

}



export async function deleteCurso(id) {

  const response = await api(`/cursos/${id}`, {
    method: "DELETE",
  });


  return response.data;

}