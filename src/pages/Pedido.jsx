import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Pedido() {
  const [pedidos, setPedidos] = useState([]);
  const [novoPedido, setNovoPedido] = useState({ descricao: '', realizado: false });
  const [pedidoEditado, setPedidoEditado] = useState({ id: null, descricao: '', realizado: false });

  useEffect(() => {
    listarPedidos();
  }, []);

  
  return (
    <></>
  );
}

export default Pedido;
