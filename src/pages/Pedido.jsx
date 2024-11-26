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
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Gestão de Pedidos</h1>

            {/* Cadastro de Novo Pedido */}
            <section className="form-section bg-blue-100 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Cadastrar Novo Pedido</h2>
                <div className="input-group mb-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={novoPedido.realizado}
                            onChange={(e) => setNovoPedido({ ...novoPedido, realizado: e.target.checked })}
                            className="checkbox"
                        />
                        <span>Realizado</span>
                    </label>
                </div>
                <div className="input-group mb-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Descrição do pedido"
                            value={novoPedido.descricao}
                            onChange={(e) => setNovoPedido({ ...novoPedido, descricao: e.target.value })}
                            className="input"
                        />
                    </label>
                </div>
                <button className="btn bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition" onClick={adicionarPedido}>Adicionar Pedido</button>
            </section>

            {/* Listagem dos Pedidos Cadastrados */}
            <section className="pedidos-list bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Pedidos Cadastrados</h2>
                <ul className="pedidos-list-ul space-y-4">
                    {pedidos.map((pedido) => (
                        <li key={pedido.id} className="pedido-item bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <span className="pedido-info text-lg font-medium">Pedido #{pedido.id} - {pedido.descricao} - {pedido.realizado ? "Realizado" : "Pendente"}</span>
                            <div className="button-group space-x-2">
                                <button onClick={() => setPedidoEditado(pedido)} className="btn bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition">Editar</button>
                                <button onClick={() => excluirPedido(pedido.id)} className="btn bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition">Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Formulário de Edição de Pedido */}
            {pedidoEditado.id && (
                <section className="form-section bg-orange-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Editar Pedido</h2>
                    <div className="input-group mb-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={pedidoEditado.realizado}
                                onChange={(e) => setPedidoEditado({ ...pedidoEditado, realizado: e.target.checked })}
                                className="checkbox"
                            />
                            <span>Realizado</span>
                        </label>
                    </div>
                    <div className="input-group mb-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Descrição do pedido"
                                value={pedidoEditado.descricao}
                                onChange={(e) => setPedidoEditado({ ...pedidoEditado, descricao: e.target.value })}
                                className="input"
                            />
                        </label>
                    </div>
                    <button className="btn bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition" onClick={editarPedido}>Salvar Alterações</button>
                </section>
            )}
        </div>
    );
}

export default Pedido;
