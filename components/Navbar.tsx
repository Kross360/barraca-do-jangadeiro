import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Anchor, LogIn, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
        isActive(to)
          ? 'text-babyBlueDark bg-blue-50'
          : 'text-gray-600 hover:text-babyBlueDark hover:bg-gray-50'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-babyBlue p-2 rounded-full text-white group-hover:bg-babyBlueDark transition-colors">
                <Anchor size={20} />
              </div>
              <span className="font-semibold text-lg text-gray-800 tracking-tight">Barraca do Jangadeiro</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'text-babyBlueDark' : 'text-gray-600 hover:text-babyBlueDark'}`}>Home</Link>
              <Link to="/cardapio" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/cardapio') ? 'text-babyBlueDark' : 'text-gray-600 hover:text-babyBlueDark'}`}>Cardápio</Link>
              <Link to="/contato" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/contato') ? 'text-babyBlueDark' : 'text-gray-600 hover:text-babyBlueDark'}`}>Contato</Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/admin/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-babyBlueDark flex items-center gap-1">
                    <LayoutDashboard size={16} /> Admin
                  </Link>
                   <button onClick={logout} className="px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:text-red-500 flex items-center gap-1">
                    <LogOut size={16} /> Sair
                  </button>
                </>
              ) : (
                <Link to="/admin/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-babyBlueDark">
                  <LogIn size={16} />
                </Link>
              )}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-babyBlueDark hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-babyBlue"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" label="Home" onClick={toggleMenu} />
            <NavLink to="/cardapio" label="Cardápio" onClick={toggleMenu} />
            <NavLink to="/contato" label="Contato" onClick={toggleMenu} />
            {isAuthenticated ? (
              <>
                <NavLink to="/admin/dashboard" label="Painel Admin" onClick={toggleMenu} />
                <button 
                  onClick={() => { logout(); toggleMenu(); }} 
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-50"
                >
                  Sair
                </button>
              </>
            ) : (
              <NavLink to="/admin/login" label="Área Restrita" onClick={toggleMenu} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;