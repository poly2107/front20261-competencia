import { api } from "./api";


export async function getUsers() {

  const response = await api("/users", {
    method: "GET",
  });

  return response.data;
}


export async function getUserById(id){

  const response = await api(`/users/${id}`);

  return response.data;
}


export async function createUser(user) {

  const response = await api("/users", {
    method: "POST",
    body: JSON.stringify(user),
  });

  return response.data;
}


export async function updateUser(id, user) {

  const response = await api(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });

  return response.data;
}


export async function deleteUser(id) {

  const response = await api(`/users/${id}`, {
    method: "DELETE",
  });

  return response.data;
}