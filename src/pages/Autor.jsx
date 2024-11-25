import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Autor() {
  const [autores, setAutores] = useState([]);
  const [novoAutor, setNovoAutor] = useState({ nome: '', obra: '' });
  const [autorEditado, setAutorEditado] = useState({ id: null, nome: '', obra: '' });

  useEffect(() => {
    listarAutores();
  }, []);

  // Função para listar todos os autores
  function listarAutores() {
    axios.get("http://localhost:5156/autores")
      .then((resposta) => {
        setAutores(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao listar autores:", erro);
      });
  }

  // Função para adicionar um novo autor
  function adicionarAutor() {
    axios.post("http://localhost:5156/autores", novoAutor)
      .then(() => {
        listarAutores();
        setNovoAutor({ nome: '', obra: '' }); // Limpar os campos
      })
      .catch((erro) => {
        console.error("Erro ao adicionar autor:", erro);
      });
  }

  // Função para editar um autor
  function editarAutor() {
    if (autorEditado.id !== null) {
      axios.put(`http://localhost:5156/autores/${autorEditado.id}`, autorEditado)
        .then(() => {
          listarAutores();
          setAutorEditado({ id: null, nome: '', obra: '' });
        })
        .catch((erro) => {
          console.error("Erro ao editar autor:", erro);
        });
    }
  }

  // Função para excluir um autor
  function excluirAutor(id) {
    axios.delete(`http://localhost:5156/autores/${id}`)
      .then(() => {
        listarAutores();
      })
      .catch((erro) => {
        console.error("Erro ao excluir autor:", erro);
      });
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gestão de Autores</h1>

      {/* Cadastro de Novo Autor */}
      <section className="form-section bg-blue-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cadastrar Novo Autor</h2>
        <div className="input-group mb-4">
          <label className="flex flex-col">
            <span>Nome do Autor:</span>
            <input
              type="text"
              placeholder="Nome do autor"
              value={novoAutor.nome}
              onChange={(e) => setNovoAutor({ ...novoAutor, nome: e.target.value })}
              className="input"
            />
          </label>
        </div>
        <div className="input-group mb-4">
          <label className="flex flex-col">
            <span>Obra:</span>
            <input
              type="text"
              placeholder="Obra do autor"
              value={novoAutor.obra}
              onChange={(e) => setNovoAutor({ ...novoAutor, obra: e.target.value })}
              className="input"
            />
          </label>
        </div>
        <button className="btn bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition" onClick={adicionarAutor}>Adicionar Autor</button>
      </section>

      {/* Listagem dos Autores Cadastrados */}
      <section className="autores-list bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Autores Cadastrados</h2>
        <ul className="autores-list-ul space-y-4">
          {autores.map((autor) => (
            <li key={autor.id} className="autor-item bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <span className="autor-info text-lg font-medium">
                Autor #{autor.id} - {autor.nome} - Obra: {autor.obra}
              </span>
              <div className="button-group space-x-2">
                <button onClick={() => setAutorEditado(autor)} className="btn bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition">Editar</button>
                <button onClick={() => excluirAutor(autor.id)} className="btn bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Formulário de Edição de Autor */}
      {autorEditado.id && (
        <section className="form-section bg-orange-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Editar Autor</h2>
          <div className="input-group mb-4">
            <label className="flex flex-col">
              <span>Nome do Autor:</span>
              <input
                type="text"
                placeholder="Nome do autor"
                value={autorEditado.nome}
                onChange={(e) => setAutorEditado({ ...autorEditado, nome: e.target.value })}
                className="input"
              />
            </label>
          </div>
          <div className="input-group mb-4">
            <label className="flex flex-col">
              <span>Obra:</span>
              <input
                type="text"
                placeholder="Obra do autor"
                value={autorEditado.obra}
                onChange={(e) => setAutorEditado({ ...autorEditado, obra: e.target.value })}
                className="input"
              />
            </label>
          </div>
          <button className="btn bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition" onClick={editarAutor}>Salvar Alterações</button>
        </section>
      )}
    </div>
  );
}

export default Autor;
