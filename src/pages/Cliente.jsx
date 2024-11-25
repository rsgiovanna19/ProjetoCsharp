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