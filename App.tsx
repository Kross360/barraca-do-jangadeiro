
import React, { useState, useEffect } from 'react';
import { Menu, MapPin, Phone, Instagram, Key, User, ArrowRight, Waves, Sun, Moon } from 'lucide-react';
import { MenuItem, AppSettings } from './types';
import * as DataService from './services/dataService';
import MenuGrid from './components/MenuGrid';
import AdminPanel from './components/AdminPanel';
import AIAssistant from './components/AIAssistant';

// Enhanced Navigation Component with Theme Toggle
const Navbar = ({ 
  onNavigate, 
  transparent, 
  isDarkMode, 
  toggleTheme 
}: { 
  onNavigate: (page: string) => void, 
  transparent: boolean,
  isDarkMode: boolean,
  toggleTheme: () => void
}) => (
  <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
    transparent 
      ? 'bg-transparent py-6' 
      : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm py-4'
  }`}>
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <div 
        onClick={() => onNavigate('home')} 
        className={`font-bold text-xl tracking-tight cursor-pointer flex items-center gap-2 ${
          transparent ? 'text-white' : 'text-jangadeiro-blue dark:text-jangadeiro-blue'
        }`}
      >
        <Waves size={24} />
        Barraca do Jangadeiro
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <button onClick={() => onNavigate('menu')} className={`text-sm font-medium hover:opacity-80 transition-opacity ${transparent ? 'text-white' : 'text-gray-600 dark:text-slate-300'}`}>Cardápio</button>
        <button onClick={() => onNavigate('contact')} className={`text-sm font-medium hover:opacity-80 transition-opacity ${transparent ? 'text-white' : 'text-gray-600 dark:text-slate-300'}`}>Localização</button>
        <button onClick={() => onNavigate('admin-login')} className={`text-sm font-medium hover:opacity-80 transition-opacity ${transparent ? 'text-white' : 'text-gray-600 dark:text-slate-300'}`}>Admin</button>
        
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
            transparent ? 'text-white bg-white/10' : 'text-gray-600 dark:text-slate-300 bg-gray-100 dark:bg-slate-800'
          }`}
          aria-label="Alternar tema"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button 
          onClick={() => onNavigate('contact')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 ${
            transparent ? 'bg-white text-jangadeiro-blue' : 'bg-jangadeiro-blue text-white'
          }`}
        >
          Contato
        </button>
      </div>

      {/* Mobile Actions */}
      <div className="md:hidden flex items-center gap-4">
        <button onClick={toggleTheme} className={transparent ? 'text-white' : 'text-gray-600 dark:text-slate-300'}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="text-gray-500 dark:text-slate-300">
          <Menu size={24} color={transparent ? 'white' : 'currentColor'} />
        </button>
      </div>
    </div>
  </nav>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DataService.getSettings());
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('jangadeiro_theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    setMenuItems(DataService.getMenu());
    setSettings(DataService.getSettings());

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Apply theme class to html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('jangadeiro_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const handleUpdateMenu = (newItems: MenuItem[]) => {
    setMenuItems(newItems);
    DataService.saveMenu(newItems);
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    DataService.saveSettings(newSettings);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'admin@jangadeiro.com' && loginPass === 'barracadojangadeiro2022') {
      setAdminAuthenticated(true);
      setCurrentPage('admin-dash');
    } else {
      alert('Credenciais inválidas. (Use admin@jangadeiro.com / barracadojangadeiro2022)');
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Navbar onNavigate={setCurrentPage} transparent={!scrolled} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <header className="relative h-[90vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" 
                  alt="Praia" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
              </div>
              <div className="relative z-10 text-center px-4 animate-slide-up">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight shadow-sm">
                  {settings.heroTitle}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
                  {settings.heroSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setCurrentPage('menu')}
                    className="px-8 py-3 bg-jangadeiro-blue text-white rounded-full font-semibold hover:bg-jangadeiro-dark transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Ver Cardápio <ArrowRight size={18} />
                  </button>
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="px-8 py-3 bg-white/20 backdrop-blur-md text-white border border-white/40 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Localização <MapPin size={18} />
                  </button>
                </div>
              </div>
            </header>
            
            <div className="bg-white dark:bg-slate-950 py-20 px-6 transition-colors duration-300">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 text-jangadeiro-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Waves size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-slate-100">Vista para o Mar</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-sm">Aproveite a brisa do oceano enquanto saboreia nossos pratos.</p>
                </div>
                <div className="p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 text-jangadeiro-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <User size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-slate-100">Atendimento Vip</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-sm">Equipe dedicada para garantir seu conforto total.</p>
                </div>
                <div className="p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 text-jangadeiro-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-slate-100">Fácil Acesso</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-sm">Localização privilegiada com estacionamento seguro.</p>
                </div>
              </div>
            </div>
            
            <MenuGrid items={menuItems} />
            
            <div className="bg-jangadeiro-blue dark:bg-slate-900 py-16 px-6 text-center text-white">
              <h2 className="text-3xl font-bold mb-6">Venha viver essa experiência</h2>
              <button onClick={() => setCurrentPage('contact')} className="bg-white dark:bg-jangadeiro-blue text-jangadeiro-blue dark:text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all">
                Fazer Reserva
              </button>
            </div>
          </>
        );

      case 'menu':
        return (
          <>
            <Navbar onNavigate={setCurrentPage} transparent={false} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <div className="pt-20 bg-gray-50 dark:bg-slate-950 min-h-screen">
              <MenuGrid items={menuItems} />
            </div>
          </>
        );

      case 'contact':
        return (
          <>
            <Navbar onNavigate={setCurrentPage} transparent={false} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <div className="pt-28 pb-20 px-6 min-h-screen bg-white dark:bg-slate-950 transition-colors">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-light text-gray-800 dark:text-slate-100 mb-2">Contato & Localização</h2>
                  <div className="w-16 h-1 bg-jangadeiro-blue mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8 animate-slide-up">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 dark:bg-slate-800 p-3 rounded-full text-jangadeiro-blue">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-slate-100">Endereço</h3>
                        <p className="text-gray-500 dark:text-slate-400 mt-1">{settings.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-slate-100">WhatsApp</h3>
                        <a 
                          href={`https://wa.me/${settings.whatsapp}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-gray-500 dark:text-slate-400 mt-1 hover:text-green-600 dark:hover:text-green-400 block"
                        >
                          Falar no WhatsApp
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-pink-50 dark:bg-pink-900/30 p-3 rounded-full text-pink-500 dark:text-pink-400">
                        <Instagram size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-slate-100">Instagram</h3>
                        <a 
                          href={`https://instagram.com/${settings.instagram}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-gray-500 dark:text-slate-400 mt-1 hover:text-pink-500 dark:hover:text-pink-400 block"
                        >
                          @{settings.instagram}
                        </a>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800">
                      <h4 className="font-semibold text-gray-800 dark:text-slate-100 mb-2">Horário de Funcionamento</h4>
                      <p className="text-sm text-gray-500 dark:text-slate-400">Segunda à Sexta: 09:00 - 18:00</p>
                      <p className="text-sm text-gray-500 dark:text-slate-400">Sábado e Domingo: 08:00 - 20:00</p>
                    </div>
                  </div>

                  <div className="h-80 md:h-full bg-gray-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner relative animate-fade-in border border-transparent dark:border-slate-700">
                    <iframe 
                      title="map"
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      style={{ border: 0, filter: isDarkMode ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'admin-login':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md animate-slide-up border border-transparent dark:border-slate-800">
              <div className="text-center mb-8">
                <div className="bg-blue-50 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-jangadeiro-blue">
                  <Key size={28} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Área Restrita</h2>
                <p className="text-gray-400 dark:text-slate-500 text-sm mt-1">Apenas para administradores</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500"
                    placeholder="admin@jangadeiro.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Senha</label>
                  <input 
                    type="password" 
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-jangadeiro-blue/20 focus:border-jangadeiro-blue outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500"
                    placeholder="••••••"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-jangadeiro-blue text-white py-3 rounded-xl font-bold hover:bg-jangadeiro-dark transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
                >
                  Entrar
                </button>
              </form>
              <button onClick={() => setCurrentPage('home')} className="w-full text-center mt-6 text-sm text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300">
                Voltar ao site
              </button>
            </div>
          </div>
        );

      case 'admin-dash':
        if (!adminAuthenticated) {
          setCurrentPage('admin-login');
          return null;
        }
        return (
          <>
            <Navbar onNavigate={setCurrentPage} transparent={false} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <AdminPanel 
              menuItems={menuItems}
              settings={settings}
              onUpdateMenu={handleUpdateMenu}
              onUpdateSettings={handleUpdateSettings}
              onLogout={() => {
                setAdminAuthenticated(false);
                setCurrentPage('home');
              }}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {renderContent()}
      
      {currentPage !== 'admin-dash' && currentPage !== 'admin-login' && (
        <footer className="bg-gray-900 dark:bg-slate-900 text-white py-12 px-6 border-t dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-xl mb-2 flex items-center justify-center md:justify-start gap-2">
                <Waves size={20} /> Barraca do Jangadeiro
              </h3>
              <p className="text-gray-400 dark:text-slate-500 text-sm">© {new Date().getFullYear()} Todos os direitos reservados.</p>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setCurrentPage('menu')} className="text-gray-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-100 transition-colors">Cardápio</button>
              <button onClick={() => setCurrentPage('contact')} className="text-gray-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-100 transition-colors">Contato</button>
              <button onClick={() => setCurrentPage('admin-login')} className="text-gray-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-100 transition-colors">Admin</button>
            </div>
          </div>
        </footer>
      )}

      {currentPage !== 'admin-login' && currentPage !== 'admin-dash' && (
        <AIAssistant settings={settings} />
      )}
    </div>
  );
};

export default App;
