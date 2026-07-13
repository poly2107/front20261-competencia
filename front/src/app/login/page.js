'use client';
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

    alert("Login realizado com sucesso!");

    router.push("/");
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
    <div>
      <h1>Login</h1>
      <FormInput label="Email" type="email" name="email" value={user.email} onChange={handleChange} />
      <FormInput label="Password" type="password" name="password" value={user.password} onChange={handleChange} />
      <Button type="submit" onClick={authenticate}>Login</Button>
      <Button type="button" onClick={() => console.log("Redirecionar para cadastro")}>Cadastrar</Button>
      <Button type="button" onClick={loadBootstrap}>Carregar Bootstrap</Button>
    </div>
  );
}
