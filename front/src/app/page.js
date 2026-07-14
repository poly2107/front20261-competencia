'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <main>
      <Navbar />

      <h1>
        Sistema de Gestão de Projetos Integradores
      </h1>

      <h2>
        Bem-vindo, {user?.email}
      </h2>

      <p>
        Utilize o menu para acessar as funcionalidades.
      </p>
    </main>
  );
}