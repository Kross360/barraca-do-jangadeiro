import React from 'react';
import { useData } from '../contexts/DataContext';

const Footer: React.FC = () => {
  const { settings } = useData();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <p className="text-gray-500 text-sm mb-2">
          {settings.address}
        </p>
        <p className="text-gray-400 text-xs">
          &copy; {year} Barraca do Jangadeiro. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;