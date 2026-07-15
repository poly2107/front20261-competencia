'use client';

import "./navbar.css";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <nav className="navbar">

      <button onClick={() => router.push("/home")}>
        Início
      </button>

      <button onClick={logout}>
        Sair
      </button>

    </nav>
  );

}