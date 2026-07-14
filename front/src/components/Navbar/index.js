'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <nav style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>

      <strong>
        {user ? `Olá, ${user.username}` : ""}
      </strong>

      <button onClick={() => router.push("/")}>
        Home
      </button>

      <button onClick={() => router.push("/usuarios")}>
        Usuários
      </button>

      {(user?.profile === "ADMIN" ||
        user?.profile === "COORDENADOR") && (
        <button onClick={() => router.push("/locais")}>
          Locais
        </button>
      )}

      <button onClick={logout}>
        Sair
      </button>

    </nav>
  );
}