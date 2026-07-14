import { api } from "./api";


export async function getLocais() {

  const response = await api("/locais");

  return response.data;

}


export async function createLocal(local) {

  const response = await api("/locais", {
    method: "POST",
    body: JSON.stringify(local),
  });

  return response.data;

}


export async function updateLocal(id, local) {

  const response = await api(`/locais/${id}`, {
    method: "PUT",
    body: JSON.stringify(local),
  });

  return response.data;

}


export async function deleteLocal(id) {

  const response = await api(`/locais/${id}`, {
    method: "DELETE",
  });

  return response.data;

}