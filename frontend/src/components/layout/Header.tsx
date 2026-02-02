import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/servicos', label: 'Serviços' },
    { path: '/contato', label: 'Contato' },
    { path: '/login', label: 'Login' },
  ]

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-background-light border-b border-border">
      <nav className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-text-primary hover:text-primary-600 transition-colors"
            onClick={closeMenu}
          >
            Logo
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6 lg:gap-8 list-none">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`text-sm lg:text-base text-text-primary hover:text-primary-600 transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary-600 font-medium'
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:text-primary-600 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={24} className="text-text-primary" />
            ) : (
              <Menu size={24} className="text-text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMenu}
            />

            {/* Mobile Menu Panel */}
            <div className="md:hidden fixed top-16 left-0 right-0 bg-background-light border-b border-border shadow-lg z-50 transform transition-all duration-300 ease-in-out">
              <ul className="flex flex-col list-none py-4">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={closeMenu}
                      className={`block px-6 py-3 text-text-primary hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                        location.pathname === item.path
                          ? 'bg-primary-50 text-primary-600 font-medium border-l-4 border-primary-600'
                          : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}
