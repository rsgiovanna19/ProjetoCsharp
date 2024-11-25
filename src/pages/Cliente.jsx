import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Cliente() {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: '', comprado: false });
  const [clienteEditado, setClienteEditado] = useState({ id: null, nome: '', comprado: false });

  useEffect(() => {
    listarClientes();
  }, []);

  // Função para listar todos os clientes
  function listarClientes() {
    axios.get("http://localhost:5156/clientes")
      .then((resposta) => {
        setClientes(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao listar clientes:", erro);
      });
  }
}
// Função para adicionar um novo cliente
function adicionarCliente() {
    axios.post("http://localhost:5156/clientes", novoCliente)
      .then(() => {
        listarClientes();
        setNovoCliente({ nome: '', comprado: false }); // Limpar os campos
      })
      .catch((erro) => {
        console.error("Erro ao adicionar cliente:", erro);
      });
  }

  // Função para editar um cliente
  function editarCliente() {
    if (clienteEditado.id !== null) {
      axios.put(`http://localhost:5156/clientes/${clienteEditado.id}`, clienteEditado)
        .then(() => {
          listarClientes();
          setClienteEditado({ id: null, nome: '', comprado: false });
        })
        .catch((erro) => {
          console.error("Erro ao editar cliente:", erro);
        });
    }

    // Função para excluir um cliente
  function excluirCliente(id) {
    axios.delete(`http://localhost:5156/clientes/${id}`)
      .then(() => {
        listarClientes();
      })
      .catch((erro) => {
        console.error("Erro ao excluir cliente:", erro);
      });
  }

  }