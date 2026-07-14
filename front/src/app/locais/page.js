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

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    numero: ""
  });



  async function loadLocais() {

    try {

      const data = await getLocais();

      setLocais(data);

    } catch (error) {

      alert(error.message);

    }

  }



  useEffect(() => {

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


    if (!form.numero.trim()) {

      alert("O número do local é obrigatório.");

      return;

    }


    if (form.numero.length > 40) {

      alert("O número do local deve possuir no máximo 40 caracteres.");

      return;

    }



    try {


      if (editingId) {


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



      setForm({
        numero: ""
      });


      setEditingId(null);


      loadLocais();



    } catch (error) {


      alert(error.message);


    }


  }





  function handleEdit(local) {


    setEditingId(local.id);


    setForm({

      numero: local.numero

    });


  }





  async function handleDelete(id) {


    try {


      await deleteLocal(id);


      alert("Local removido com sucesso!");


      loadLocais();



    } catch(error) {


      alert(error.message);


    }


  }





  return (

    <main>

      <Navbar />


      <h1>Locais</h1>


      <div>


        <input

          type="text"

          name="numero"

          placeholder="Número do local"

          value={form.numero}

          onChange={handleChange}

        />


        <button onClick={handleSave}>

          {editingId ? "Atualizar" : "Criar"}

        </button>


      </div>



      <hr />



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


                <button onClick={() => handleEdit(local)}>

                  Editar

                </button>



                <button onClick={() => handleDelete(local.id)}>

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