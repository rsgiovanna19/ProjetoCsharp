import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Livro from './pages/Livro';
import Pedido from './pages/Pedido';  // adicionado por Giovanna
import Cliente from './pages/Cliente'; // importação do novo componente Cliente
import Pagamento from './pages/Pagamento';  // importação do novo componente Pagamento
import Autor from './pages/Autor'; // importação do novo componente Autor

function App() {
  return (
    <Routes>
      {/* Rota inicial */}
      <Route
        path="/"
        element={
          <Layout>
            <Livro />
          </Layout>
        }
      />
      {/* Rota para Livros */}
      <Route
        path="/livro"
        element={
          <Layout>
            <Livro />
          </Layout>
        }
      />
      {/* Rota para Pedidos - adicionado por Giovanna */}
      <Route
        path="/pedido"
        element={
          <Layout>
            <Pedido />
          </Layout>
        }
      />
      {/* Rota para Clientes - nova rota */}
      <Route
        path="/cliente"
        element={
          <Layout>
            <Cliente />
          </Layout>
        }
      />
      {/* Rota para Pagamentos - nova rota */}
      <Route
        path="/pagamento"
        element={
          <Layout>
            <Pagamento />
          </Layout>
        }
      />
      {/* Rota para Autores - nova rota */}
      <Route
        path="/autor"
        element={
          <Layout>
            <Autor />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
