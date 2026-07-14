'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

import {
  getCursos,
  createCurso,
  updateCurso,
  deleteCurso
} from "@/services/cursoService";

import {
  getUsers
} from "@/services/userService";


export default function CursosPage() {

  const [cursos, setCursos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    coordenadorId: "",
    professorIds: []
  });


  async function loadData() {

    try {

      const cursosData = await getCursos();
      const usersData = await getUsers();

      setCursos(cursosData);
      setUsuarios(usersData);

    } catch(error) {

      alert(error.message);

    }

  }


  useEffect(() => {

    loadData();

  }, []);



  function handleChange(e) {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

  }



  function handleProfessores(e) {

    const ids = Array.from(
      e.target.selectedOptions,
      option => Number(option.value)
    );


    setForm({
      ...form,
      professorIds: ids
    });

  }



  async function handleSave() {


    if (!form.nome.trim()) {

      alert("O nome do curso é obrigatório.");
      return;

    }


    if (!editingId) {

      if (!form.coordenadorId) {

        alert("Selecione um coordenador.");
        return;

      }


      if (form.professorIds.length === 0) {

        alert("Selecione pelo menos um professor.");
        return;

      }

    }



    try {


      const curso = {

        nome: form.nome,
        coordenadorId: Number(form.coordenadorId),
        professorIds: form.professorIds

      };



      if (editingId) {

        await updateCurso(editingId, curso);

        alert("Curso atualizado com sucesso!");

      } else {

        await createCurso(curso);

        alert("Curso criado com sucesso!");

      }



      setForm({
        nome: "",
        coordenadorId: "",
        professorIds: []
      });


      setEditingId(null);

      loadData();



    } catch(error) {

      alert(error.message);

    }

  }




  function handleEdit(curso) {

    setEditingId(curso.id);

    setForm({

      nome: curso.nome,

      coordenadorId: curso.coordenador.id,

      professorIds: curso.professores.map(
        professor => professor.id
      )

    });

  }




  async function handleDelete(id) {

    try {

      await deleteCurso(id);

      alert("Curso removido com sucesso!");

      loadData();

    } catch(error) {

      alert(error.message);

    }

  }



  const coordenadores = usuarios.filter(
    user => user.profile === "COORDENADOR"
  );


  const professores = usuarios.filter(
    user => user.profile === "PROFESSOR"
  );



  return (

    <main>

      <Navbar />

      <h1>Cursos</h1>


      <input
        type="text"
        name="nome"
        placeholder="Nome do curso"
        value={form.nome}
        onChange={handleChange}
      />


      <br /><br />


      <label>Coordenador:</label>


      <br />


      <select
        name="coordenadorId"
        value={form.coordenadorId}
        onChange={handleChange}
      >

        <option value="">
          Selecione
        </option>


        {coordenadores.map(user => (

          <option
            key={user.id}
            value={user.id}
          >

            {user.username}

          </option>

        ))}


      </select>



      <br /><br />



      <label>Professores:</label>


      <br />


      <select
        multiple
        value={form.professorIds}
        onChange={handleProfessores}
      >

        {professores.map(user => (

          <option
            key={user.id}
            value={user.id}
          >

            {user.username}

          </option>

        ))}


      </select>



      <br /><br />


      <button onClick={handleSave}>

        {editingId ? "Atualizar" : "Criar"}

      </button>



      <hr />



      <table>

        <thead>

          <tr>

            <th>ID</th>
            <th>Curso</th>
            <th>Coordenador</th>
            <th>Professores</th>
            <th>Ações</th>

          </tr>

        </thead>



        <tbody>


          {cursos.map(curso => (

            <tr key={curso.id}>

              <td>
                {curso.id}
              </td>


              <td>
                {curso.nome}
              </td>


              <td>
                {curso.coordenador?.username}
              </td>


              <td>

                {curso.professores
                  ?.map(professor => professor.username)
                  .join(", ")}

              </td>


              <td>

                <button onClick={() => handleEdit(curso)}>
                  Editar
                </button>


                <button onClick={() => handleDelete(curso.id)}>
                  Excluir
                </button>

              </td>

            </tr>

          ))}


        </tbody>


      </table>


    </main>

  );

}