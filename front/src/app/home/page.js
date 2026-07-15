"use client";

import "./home.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home() {

  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {

  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if(!token || !savedUser){

    router.push("/login");

    return;

  }

  setUser(JSON.parse(savedUser));
  }, []);

  return (

    <main className="page-container">
      
      <Navbar />

      <h1 className="title">
        Sistema de Gestão de Projetos Integradores
      </h1>

      <h2 className="subtitle">
        Bem-vindo(a), {user?.username}!
      </h2>

      <div className="cards">

        <div
          className="card"
          onClick={() => router.push("/usuarios")}
        >

          <h3>👤 Usuários</h3>

          <p>
            Consultar usuários cadastrados.
          </p>

        </div>


        <div
          className="card"
          onClick={() => router.push("/locais")}
        >

          <h3>📍 Locais</h3>

          <p>
            Consultar locais cadastrados.
          </p>

        </div>

      </div>

    </main>

  );

}