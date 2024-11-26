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

    // Função para editar um pedido
    function editarPedido() {
        if (pedidoEditado.id !== null) {
            axios.put(`http://localhost:5156/pedidos/${pedidoEditado.id}`, pedidoEditado)
                .then(() => {
                    listarPedidos();
                    setPedidoEditado({ id: null, descricao: '', realizado: false });
                })
                .catch((erro) => {
                    console.error("Erro ao editar pedido:", erro);
                });
        }
    }

    // Função para excluir um pedido
    function excluirPedido(id) {
        axios.delete(`http://localhost:5156/pedidos/${id}`)
            .then(() => {
                listarPedidos();
            })
            .catch((erro) => {
                console.error("Erro ao excluir pedido:", erro);
            });
    }

    return (
        <></>
    );
}

export default Pedido;
