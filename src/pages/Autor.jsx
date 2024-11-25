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
  };
