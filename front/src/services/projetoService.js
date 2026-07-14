import { api } from "./api";


export async function getProjetos() {

  const response = await api("/projetos");

  return response.data;

}



export async function createProjeto(projeto) {

  const response = await api("/projetos", {

    method: "POST",

    body: JSON.stringify(projeto),

  });


  return response.data;

}



export async function updateProjeto(id, projeto) {

  const response = await api(`/projetos/${id}`, {

    method: "PUT",

    body: JSON.stringify(projeto),

  });


  return response.data;

}



export async function deleteProjeto(id) {

  const response = await api(`/projetos/${id}`, {

    method: "DELETE",

  });


  return response.data;

}