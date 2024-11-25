
function Footer() {
    return (
        <footer className="w-full bg-blue-200 text-grey py-8 px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <a href="/" className="text-2xl font-bold hover:text-gray-300">Gerenciamentos gerais</a>
                </div>

                <div className="mb-4">
                    <ul className="flex space-x-4">
                        <li><a href="" className="hover:text-gray">Trabalhe conosco!</a></li>
                    </ul>
                </div>

                <div className="flex space-x-4">
                    <a href="" className="hover:text-gray">Giovanna</a>
                    <a href="" className="hover:text-gray">Guilherme</a>
                    <a href="" className="hover:text-gray">Leonardo</a>
                    <a href="" className="hover:text-gray">Gustavo</a>
                    <a href="" className="hover:text-gray">Brian</a>
                </div>
            </div>
        </footer>
    )
}


export default Footer;