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
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gestão de Clientes</h1>

      {/* Cadastro de Novo Cliente */}
      <section className="form-section bg-blue-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cadastrar Novo Cliente</h2>
        <div className="input-group mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={novoCliente.comprado}
              onChange={(e) => setNovoCliente({ ...novoCliente, comprado: e.target.checked })}
              className="checkbox"
            />
            <span>Comprado</span>
          </label>
        </div>
        <div className="input-group mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Nome do cliente"
              value={novoCliente.nome}
              onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
              className="input"
            />
          </label>
        </div>
        <button className="btn bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition" onClick={adicionarCliente}>Adicionar Cliente</button>
      </section>

      {/* Listagem dos Clientes Cadastrados */}
      <section className="clientes-list bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Clientes Cadastrados</h2>
        <ul className="clientes-list-ul space-y-4">
          {clientes.map((cliente) => (
            <li key={cliente.id} className="cliente-item bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <span className="cliente-info text-lg font-medium">Cliente #{cliente.id} - {cliente.nome} - {cliente.comprado ? "Comprado" : "Não Comprado"}</span>
              <div className="button-group space-x-2">
                <button onClick={() => setClienteEditado(cliente)} className="btn bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition">Editar</button>
                <button onClick={() => excluirCliente(cliente.id)} className="btn bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
          
      {/* Formulário de Edição de Cliente */}
      {clienteEditado.id && (
        <section className="form-section bg-orange-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Editar Cliente</h2>
          <div className="input-group mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={clienteEditado.comprado}
                onChange={(e) => setClienteEditado({ ...clienteEditado, comprado: e.target.checked })}
                className="checkbox"
              />
              <span>Comprado</span>
            </label>
          </div>
          <div className="input-group mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Nome do cliente"
                value={clienteEditado.nome}
                onChange={(e) => setClienteEditado({ ...clienteEditado, nome: e.target.value })}
                className="input"
              />
            </label>
          </div>
          <button className="btn bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition" onClick={editarCliente}>Salvar Alterações</button>
        </section>
      )}
      </section>
    </div>
    );
    


  }