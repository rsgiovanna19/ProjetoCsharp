import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Pagamento() {
  const [pagamentos, setPagamentos] = useState([]);
  const [novoPagamento, setNovoPagamento] = useState({ cartao: false, dinheiro: false });
  const [pagamentoEditado, setPagamentoEditado] = useState({ id: null, cartao: false, dinheiro: false });

  useEffect(() => {
    listarPagamentos();
  }, []);

  // Função para listar todos os pagamentos
  function listarPagamentos() {
    axios.get("http://localhost:5156/pagamentos")
      .then((resposta) => {
        setPagamentos(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao listar pagamentos:", erro);
      });
  }

  // Função para adicionar um novo pagamento
  function adicionarPagamento() {
    axios.post("http://localhost:5156/pagamentos", novoPagamento)
      .then(() => {
        listarPagamentos();
        setNovoPagamento({ cartao: false, dinheiro: false }); // Limpar os campos
      })
      .catch((erro) => {
        console.error("Erro ao adicionar pagamento:", erro);
      });
  }

  // Função para editar um pagamento
  function editarPagamento() {
    if (pagamentoEditado.id !== null) {
      axios.put(`http://localhost:5156/pagamentos/${pagamentoEditado.id}`, pagamentoEditado)
        .then(() => {
          listarPagamentos();
          setPagamentoEditado({ id: null, cartao: false, dinheiro: false });
        })
        .catch((erro) => {
          console.error("Erro ao editar pagamento:", erro);
        });
    }
  }

  // Função para excluir um pagamento
  function excluirPagamento(id) {
    axios.delete(`http://localhost:5156/pagamentos/${id}`)
      .then(() => {
        listarPagamentos();
      })
      .catch((erro) => {
        console.error("Erro ao excluir pagamento:", erro);
      });
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gestão de Pagamentos</h1>

      {/* Cadastro de Novo Pagamento */}
      <section className="form-section bg-blue-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cadastrar Novo Pagamento</h2>
        <div className="input-group mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={novoPagamento.cartao}
              onChange={(e) => setNovoPagamento({ ...novoPagamento, cartao: e.target.checked })}
              className="checkbox"
            />
            <span>Cartão</span>
          </label>
        </div>
        <div className="input-group mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={novoPagamento.dinheiro}
              onChange={(e) => setNovoPagamento({ ...novoPagamento, dinheiro: e.target.checked })}
              className="checkbox"
            />
            <span>Dinheiro</span>
          </label>
        </div>
        <button className="btn bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition" onClick={adicionarPagamento}>Adicionar Pagamento</button>
      </section>

      {/* Listagem dos Pagamentos Cadastrados */}
      <section className="pagamentos-list bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pagamentos Cadastrados</h2>
        <ul className="pagamentos-list-ul space-y-4">
          {pagamentos.map((pagamento) => (
            <li key={pagamento.id} className="pagamento-item bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <span className="pagamento-info text-lg font-medium">Pagamento #{pagamento.id} - Cartão: {pagamento.cartao ? "Sim" : "Não"} - Dinheiro: {pagamento.dinheiro ? "Sim" : "Não"}</span>
              <div className="button-group space-x-2">
                <button onClick={() => setPagamentoEditado(pagamento)} className="btn bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition">Editar</button>
                <button onClick={() => excluirPagamento(pagamento.id)} className="btn bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Formulário de Edição de Pagamento */}
      {pagamentoEditado.id && (
        <section className="form-section bg-orange-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Editar Pagamento</h2>
          <div className="input-group mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={pagamentoEditado.cartao}
                onChange={(e) => setPagamentoEditado({ ...pagamentoEditado, cartao: e.target.checked })}
                className="checkbox"
              />
              <span>Cartão</span>
            </label>
          </div>
          <div className="input-group mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={pagamentoEditado.dinheiro}
                onChange={(e) => setPagamentoEditado({ ...pagamentoEditado, dinheiro: e.target.checked })}
                className="checkbox"
              />
              <span>Dinheiro</span>
            </label>
          </div>
          <button className="btn bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition" onClick={editarPagamento}>Salvar Alterações</button>
        </section>
      )}
    </div>
  );
}

export default Pagamento;
