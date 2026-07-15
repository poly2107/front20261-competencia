"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home(){

 const router = useRouter();
 const [user, setUser] = useState(null);

 useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if(savedUser){
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
    Bem-vindo, {user?.username}!
    </h2>


   <button onClick={() => router.push("/usuarios")}>
     Usuários
   </button>


   <button onClick={() => router.push("/locais")}>
     Locais
   </button>


  </main>
 );

}