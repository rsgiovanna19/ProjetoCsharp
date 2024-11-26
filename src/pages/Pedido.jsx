import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Pedido() {
  const [pedidos, setPedidos] = useState([]);
  const [novoPedido, setNovoPedido] = useState({ descricao: '', realizado: false });
  const [pedidoEditado, setPedidoEditado] = useState({ id: null, descricao: '', realizado: false });

  useEffect(() => {
    listarPedidos();
  }, []);

  // Função para listar todos os pedidos
  function listarPedidos() {
    axios.get("http://localhost:5156/pedidos")
      .then((resposta) => {
        setPedidos(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao listar pedidos:", erro);
      });
  }

  // Função para adicionar um novo pedido
  function adicionarPedido() {
    axios.post("http://localhost:5156/pedidos", novoPedido)
      .then(() => {
        listarPedidos();
        setNovoPedido({ descricao: '', realizado: false }); // Limpar os campos
      })
      .catch((erro) => {
        console.error("Erro ao adicionar pedido:", erro);
      });
  }
  
  return (
    <></>
  );
}

export default Pedido;
