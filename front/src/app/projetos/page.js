'use client';

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";

import {
  getProjetos,
  createProjeto,
  updateProjeto,
  deleteProjeto
} from "@/services/projetoService";

import {
  getUsers
} from "@/services/userService";

import {
  getLocais
} from "@/services/localService";

import {
  getTurmas
} from "@/services/turmaService";

import {
  getSemestres
} from "@/services/semestreService";


export default function ProjetosPage() {


  const [projetos, setProjetos] = useState([]);

  const [usuarios, setUsuarios] = useState([]);

  const [locais, setLocais] = useState([]);

  const [turmas, setTurmas] = useState([]);

  const [semestres, setSemestres] = useState([]);

  const [editingId, setEditingId] = useState(null);



  const [form, setForm] = useState({

    nome: "",
    descricao: "",
    turmaId: "",
    semestreId: "",
    professorOrientadorId: "",
    integranteIds: [],
    localId: "",
    horarioInicio: "",
    horarioFim: ""

  });



  async function loadData() {

    try {

      const [
        projetosData,
        usuariosData,
        locaisData,
        turmasData,
        semestresData
      ] = await Promise.all([

        getProjetos(),
        getUsers(),
        getLocais(),
        getTurmas(),
        getSemestres()

      ]);


      setProjetos(projetosData);
      setUsuarios(usuariosData);
      setLocais(locaisData);
      setTurmas(turmasData);
      setSemestres(semestresData);


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





  function handleIntegrantes(e) {

    const ids = Array.from(

      e.target.selectedOptions,

      option => Number(option.value)

    );


    setForm({

      ...form,

      integranteIds: ids

    });


  }





  async function handleSave() {


    if (!form.nome.trim()) {

      alert("Nome do projeto é obrigatório.");
      return;

    }


    if (!form.descricao.trim()) {

      alert("Descrição é obrigatória.");
      return;

    }



    try {


      const projeto = {

        nome: form.nome,

        descricao: form.descricao,

        turmaId: Number(form.turmaId),

        semestreId: Number(form.semestreId),

        professorOrientadorId: Number(form.professorOrientadorId),

        integranteIds: form.integranteIds,

        localId: Number(form.localId),

        horarioInicio: new Date(form.horarioInicio).toISOString(),

        horarioFim: new Date(form.horarioFim).toISOString()

      };




      if (editingId) {


        await updateProjeto(editingId, projeto);

        alert("Projeto atualizado!");



      } else {


        await createProjeto(projeto);

        alert("Projeto criado!");

      }




      setEditingId(null);


      setForm({

        nome: "",
        descricao: "",
        turmaId: "",
        semestreId: "",
        professorOrientadorId: "",
        integranteIds: [],
        localId: "",
        horarioInicio: "",
        horarioFim: ""

      });



      loadData();



    } catch(error) {

      alert(error.message);

    }

  }






  function handleEdit(projeto) {


    setEditingId(projeto.id);


    setForm({

      nome: projeto.nome,

      descricao: projeto.descricao,

      turmaId: projeto.turma.id,

      semestreId: projeto.semestre.id,

      professorOrientadorId: projeto.professorOrientador.id,

      integranteIds: projeto.integrantes.map(
        aluno => aluno.id
      ),

      localId: projeto.local.id,


      horarioInicio:
        projeto.horarioInicio.slice(0,16),


      horarioFim:
        projeto.horarioFim.slice(0,16)

    });


  }






  async function handleDelete(id) {


    try {

      await deleteProjeto(id);

      alert("Projeto removido!");

      loadData();


    } catch(error) {

      alert(error.message);

    }


  }






  const professores = usuarios.filter(

    user => user.profile === "PROFESSOR"

  );



  const alunos = usuarios.filter(

    user => user.profile === "ALUNO"

  );





  return (

    <main>


      <Navbar />


      <h1>Projetos</h1>



      <input

        name="nome"

        placeholder="Nome"

        value={form.nome}

        onChange={handleChange}

      />



      <br />



      <textarea

        name="descricao"

        placeholder="Descrição"

        value={form.descricao}

        onChange={handleChange}

      />



      <br />



      <select

        name="turmaId"

        value={form.turmaId}

        onChange={handleChange}

      >

        <option value="">
          Turma
        </option>


        {turmas.map(turma => (

          <option

            key={turma.id}

            value={turma.id}

          >

            {turma.nome}

          </option>

        ))}


      </select>




      <select

        name="semestreId"

        value={form.semestreId}

        onChange={handleChange}

      >

        <option value="">
          Semestre
        </option>


        {semestres.map(semestre => (

          <option

            key={semestre.id}

            value={semestre.id}

          >

            {semestre.nome}

          </option>

        ))}


      </select>




      <select

        name="professorOrientadorId"

        value={form.professorOrientadorId}

        onChange={handleChange}

      >

        <option value="">
          Professor orientador
        </option>


        {professores.map(professor => (

          <option

            key={professor.id}

            value={professor.id}

          >

            {professor.username}

          </option>

        ))}


      </select>




      <br />



      <label>
        Integrantes:
      </label>



      <br />



      <select

        multiple

        value={form.integranteIds}

        onChange={handleIntegrantes}

      >


        {alunos.map(aluno => (

          <option

            key={aluno.id}

            value={aluno.id}

          >

            {aluno.username}

          </option>

        ))}


      </select>




      <br />



      <select

        name="localId"

        value={form.localId}

        onChange={handleChange}

      >

        <option value="">
          Local
        </option>


        {locais.map(local => (

          <option

            key={local.id}

            value={local.id}

          >

            {local.numero}

          </option>

        ))}


      </select>




      <br />



      <input

        type="datetime-local"

        name="horarioInicio"

        value={form.horarioInicio}

        onChange={handleChange}

      />



      <input

        type="datetime-local"

        name="horarioFim"

        value={form.horarioFim}

        onChange={handleChange}

      />



      <br />



      <button onClick={handleSave}>

        {editingId ? "Atualizar" : "Criar"}

      </button>




      <hr />




      <table>


        <thead>

          <tr>

            <th>Nome</th>

            <th>Turma</th>

            <th>Professor</th>

            <th>Local</th>

            <th>Ações</th>

          </tr>

        </thead>



        <tbody>


          {projetos.map(projeto => (

            <tr key={projeto.id}>


              <td>
                {projeto.nome}
              </td>


              <td>
                {projeto.turma.nome}
              </td>


              <td>
                {projeto.professorOrientador.username}
              </td>


              <td>
                {projeto.local.nome}
              </td>


              <td>


                <button onClick={() => handleEdit(projeto)}>
                  Editar
                </button>


                <button onClick={() => handleDelete(projeto.id)}>
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