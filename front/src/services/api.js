const BASE_URL = "http://localhost:8080/api";

export async function api(endpoint, options = {}) {

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };


  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }


  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });


  const text = await response.text();

  const data = text ? JSON.parse(text) : null;


  if (!response.ok) {

    throw new Error(data?.message || "Erro na requisição.");

  }


  return data;

}