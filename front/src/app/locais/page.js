'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

import {
  getLocais,
  createLocal,
  updateLocal,
  deleteLocal
} from "@/services/localService";


export default function LocaisPage() {


  const [locais, setLocais] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [form, setForm] = useState({
    numero: ""
  });



  async function loadLocais() {

    try {

      const data = await getLocais();

      setLocais(data);


    } catch(error) {

      alert(error.message);

    }

  }



  useEffect(() => {

  const savedUser = localStorage.getItem("user");

  if(savedUser){

    setCurrentUser(JSON.parse(savedUser));

  }


  loadLocais();

}, []);





  function handleChange(e) {

    const { name, value } = e.target;


    setForm({
      ...form,
      [name]: value
    });

  }






  async function handleSave() {


    if(!form.numero.trim()) {

      alert("O número do local é obrigatório.");

      return;

    }


    if(form.numero.length > 40) {

      alert("O número do local deve possuir no máximo 40 caracteres.");

      return;

    }



    try {


      if(editingId) {


        await updateLocal(editingId, {

          numero: form.numero

        });


        alert("Local atualizado com sucesso!");



      } else {


        await createLocal({

          numero: form.numero

        });


        alert("Local criado com sucesso!");

      }



      handleCancel();

      loadLocais();



    } catch(error) {


      alert(error.message);


    }


  }







  function handleEdit(local) {


    setEditingId(local.id);


    setShowForm(true);


    setForm({

      numero: local.numero

    });


  }







  function handleCancel() {


    setShowForm(false);


    setEditingId(null);


    setForm({

      numero: ""

    });


  }








  async function handleDelete(id) {


    const confirmDelete = window.confirm(
      "Deseja realmente excluir este local?"
    );


    if(!confirmDelete) {

      return;

    }



    try {


      await deleteLocal(id);


      alert("Local removido com sucesso!");


      loadLocais();



    } catch(error) {


      alert(error.message);


    }


  }
const canManageLocal =
  currentUser?.profile === "ADMIN" ||
  currentUser?.profile === "COORDENADOR";

  return (

    <main>


      <Navbar />



      <h1>Locais</h1>



      {canManageLocal && (
        <button onClick={() => setShowForm(true)}>
          Novo local
        </button>
      )}




      {showForm && canManageLocal && (

        <div>


          <h2>

            {editingId ? "Editar local" : "Novo local"}

          </h2>



          <input

            type="text"

            name="numero"

            placeholder="Número do local"

            value={form.numero}

            onChange={handleChange}

          />



          <button onClick={handleSave}>

            Salvar

          </button>




          <button onClick={handleCancel}>

            Cancelar

          </button>



        </div>

      )}






      <hr />





      <h2>

        Lista de locais

      </h2>




      <table>


        <thead>


          <tr>

            <th>ID</th>

            <th>Número</th>

            <th>Ações</th>

          </tr>


        </thead>





        <tbody>



          {locais.map((local) => (



            <tr key={local.id}>


              <td>

                {local.id}

              </td>



              <td>

                {local.numero}

              </td>



              <td>


                {canManageLocal && (
                <button onClick={() => handleEdit(local)}>
                  Editar
                </button>
                )}



                {canManageLocal && (
               <button onClick={() => handleDelete(local.id)}>
                  Excluir
               </button>
                )}



              </td>



            </tr>



          ))}



        </tbody>



      </table>



    </main>

  );

}