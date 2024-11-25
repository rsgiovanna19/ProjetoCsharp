import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="w-full flex flex-row justify-around gap-[100px] items-center bg-blue-300 p-3 text-white font-bold text-[20px]">
      <p className="text-[30px]">Gerenciamento da Loja</p>
      <div className="flex gap-6">
        <Link to="/pedido" className="hover:text-gray-200">Pedido</Link>
        <Link to="/cliente" className="hover:text-gray-200">Cliente</Link>
        <Link to="/livro" className="hover:text-gray-200">Livro</Link>
        <Link to="/pagamento" className="hover:text-gray-200">Pagamento</Link>
        <Link to="/autor" className="hover:text-gray-200">Autor</Link>
      </div>
    </header>
  );
}

export default Header;