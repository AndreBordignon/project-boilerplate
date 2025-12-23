import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="px-8 py-4 bg-background-light border-b border-border">
      <nav className="flex justify-between items-center max-w-container mx-auto">
        <Link to="/" className="text-2xl font-bold text-text-primary hover:text-primary-600 transition-colors">
          Logo
        </Link>
        <ul className="flex gap-8 list-none">
          <li>
            <Link to="/" className="text-text-primary hover:text-primary-600 transition-colors">
              Início
            </Link>
          </li>
          <li>
            <Link to="/sobre" className="text-text-primary hover:text-primary-600 transition-colors">
              Sobre
            </Link>
          </li>
          <li>
            <Link to="/servicos" className="text-text-primary hover:text-primary-600 transition-colors">
              Serviços
            </Link>
          </li>
          <li>
            <Link to="/contato" className="text-text-primary hover:text-primary-600 transition-colors">
              Contato
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-text-primary hover:text-primary-600 transition-colors">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
