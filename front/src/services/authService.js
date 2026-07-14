import { api } from "./api";

export async function login(email, password) {
  const response = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}