'use client';

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav>
      <button onClick={() => router.push("/")}>
        Home
      </button>

      <button onClick={() => router.push("/usuarios")}>
        Usuários
      </button>

      <button onClick={() => router.push("/cursos")}>
        Cursos
      </button>

      <button onClick={() => router.push("/projetos")}>
        Projetos
      </button>

      <button onClick={() => router.push("/locais")}>
        Locais
      </button>

      <button onClick={logout}>
        Sair
      </button>
    </nav>
  );
}