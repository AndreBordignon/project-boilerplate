import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="p-8 bg-background-dark text-white mt-auto">
      <div className="max-w-container mx-auto grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Sobre</h3>
          <p className="text-secondary-300">Descrição da empresa</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Links</h3>
          <ul className="list-none space-y-2">
            <li className="text-secondary-300 hover:text-white transition-colors cursor-pointer">Início</li>
            <li className="text-secondary-300 hover:text-white transition-colors cursor-pointer">Sobre</li>
            <li className="text-secondary-300 hover:text-white transition-colors cursor-pointer">Serviços</li>
            <li className="text-secondary-300 hover:text-white transition-colors cursor-pointer">Contato</li>
            <li className="text-secondary-300 hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/formulario')}>Formulário</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contato</h3>
          <p className="text-secondary-300">Email: contato@exemplo.com</p>
          <p className="text-secondary-300">Telefone: (00) 0000-0000</p>
        </div>
      </div>
      <div className="text-center mt-8 pt-4 border-t border-border-dark">
        <p className="text-secondary-400">&copy; {new Date().getFullYear()} - Todos os direitos reservados</p>
      </div>
    </footer>
  )
}
