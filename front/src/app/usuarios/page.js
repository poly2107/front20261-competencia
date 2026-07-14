'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "@/services/userService";

export default function UsuariosPage() {

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    profile: "PROFESSOR"
  });
  const [user, setUser] = useState(null);

  async function loadUsers() {

  try {
    
    const loggedUser = JSON.parse(
      localStorage.getItem("user")
    );


    if(
      loggedUser.profile === "ADMIN" ||
      loggedUser.profile === "PROFESSOR"
    ){

      const data = await getUsers();

      setUsers(data);

    } else {

      const data = await getUserById(
        loggedUser.id
      );

      setUsers([data]);

    }


  } catch(error){

    alert(error.message);

  }

}


  useEffect(() => {

  const savedUser = localStorage.getItem("user");

  if(savedUser){

    const loggedUser = JSON.parse(savedUser);

    setCurrentUser(loggedUser);
    setUser(loggedUser);

  }

  loadUsers();

}, []);


  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  }


  async function handleCreate() {

  if (!form.username.trim()) {
    alert("O nome do usuário é obrigatório.");
    return;
  }

  if (!editingId && !form.email.trim()) {
    alert("O email é obrigatório.");
    return;
}

  if (!editingId && form.password.length < 6) {
    alert("A senha deve possuir no mínimo 6 caracteres.");
    return;
  }


  try {

    if (editingId) {

  const updateData = {
    username: form.username,
    profile: form.profile
  };

  if (form.password.trim()) {
    updateData.password = form.password;
  }

  await updateUser(editingId, updateData);

  alert("Usuário atualizado com sucesso!");

} else {

  await createUser(form);

  alert("Usuário criado com sucesso!");

}


    setForm({
      username: "",
      email: "",
      password: "",
      profile: "PROFESSOR"
    });


    setEditingId(null);

    loadUsers();


  } catch(error) {

    alert(error.message);

  }

}

function handleEdit(user) {

  setEditingId(user.id);

  setForm({
    username: user.username,
    email: user.email,
    password: "",
    profile: user.profile
  });

}

  async function handleDelete(id) {

    try {

      await deleteUser(id);

      alert("Usuário removido!");

      loadUsers();

    } catch(error) {
      alert(error.message);
    }

  }

  const isAdmin = currentUser?.profile === "ADMIN";

  return (
    <main>

      <Navbar />

      <h1>Usuários</h1>

        <h2>Novo usuário</h2>
        {isAdmin && (
        <>

        <input
          name="username"
          placeholder="Nome"
          value={form.username}
          onChange={handleChange}
        />


        <input
          name="email"
          placeholder="Email"
          value={form.email}
          disabled={editingId !== null}
          onChange={handleChange}
        />


        <input
          name="password"
          type="password"
          placeholder="Senha (mínimo 6 caracteres)"
          value={form.password}
          onChange={handleChange}
        />


        <select
          name="profile"
          value={form.profile}
          onChange={handleChange}
        >

          <option value="ADMIN">
            ADMIN
          </option>

          <option value="PROFESSOR">
            PROFESSOR
          </option>

            <option value="COORDENADOR">
             COORDENADOR
            </option>

            <option value="ALUNO">
            ALUNO
            </option>

            <option value="AVALIADOR_EXTERNO">
             AVALIADOR_EXTERNO
            </option>

        </select>


        <button onClick={handleCreate}>
            {editingId ? "Atualizar" : "Criar"}
        </button>
          <hr />
          </>
        )}



      <section>

        <h2>Lista de usuários</h2>


        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Perfil</th>
              <th>Ações</th>
            </tr>

          </thead>


          <tbody>

          {users.map((user)=>(

            <tr key={user.id}>

              <td>{user.id}</td>

              <td>{user.username}</td>

              <td>{user.email}</td>

              <td>{user.profile}</td>

              <td>

                <button onClick={() => handleEdit(user)}>
                  Editar
                </button>

                {currentUser?.profile === "ADMIN" && (
                <button onClick={() => handleDelete(user.id)}>
                  Excluir
                </button>
)}

              </td>

            </tr>

          ))}

          </tbody>

        </table>


      </section>


    </main>
  );
}