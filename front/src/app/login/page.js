'use client';

import "./login.css";
import { login } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import  Button  from "@/components/Button";
import FormInput from "@/components/FormInput";

export default function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const authenticate = async () => {
  if (!user.email || !user.password) {
    alert("Preencha email e senha.");
    return;
  }

  try {
    const data = await login(user.email, user.password);

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));


    router.push("/home");
  } catch (error) {
    alert(error.message);
  }
};

    const loadBootstrap = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/public/bootstrap",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    console.log("Bootstrap carregado:", data);

  } catch (error) {
    console.error("Erro no bootstrap:", error);
  }
};

  return (
    <div className="login-container">

  <div className="login-card">

    <h1>PIE Manager</h1>

    <p>
      Sistema de Gestão de Projetos Integradores
    </p>

    <FormInput
      label="Email"
      type="email"
      name="email"
      value={user.email}
      onChange={handleChange}
    />

    <FormInput
      label="Senha"
      type="password"
      name="password"
      value={user.password}
      onChange={handleChange}
    />

    <div className="login-buttons">

      <Button onClick={authenticate}>
        Entrar
      </Button>

    </div>

  </div>

</div>
  );
}
