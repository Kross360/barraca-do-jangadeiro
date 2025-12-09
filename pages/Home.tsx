import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Utensils, MessageCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Home: React.FC = () => {
  const { settings } = useData();

  return (
    <div className="flex flex-col w-full h-full animate-fade-in">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1920" 
            alt="Praia" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-md tracking-tight">
            Barraca do Jangadeiro
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 font-light drop-shadow-sm max-w-2xl mx-auto">
            {settings.heroTitle} — {settings.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/cardapio" 
              className="bg-babyBlue hover:bg-babyBlueDark text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 min-w-[160px]"
            >
              Ver Cardápio
            </Link>
            <Link 
              to="/contato" 
              className="bg-white/90 hover:bg-white text-gray-800 px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 min-w-[160px]"
            >
              Onde Estamos
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Quick Access */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-babyBlueLight/30 transition-colors duration-300 flex flex-col items-center text-center group border border-slate-100">
              <div className="bg-babyBlue/20 p-4 rounded-full text-babyBlueDark mb-6 group-hover:bg-babyBlue group-hover:text-white transition-colors duration-300">
                <Utensils size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Gastronomia Local</h3>
              <p className="text-gray-600 leading-relaxed">
                Pratos típicos preparados com ingredientes frescos. Do caranguejo à peixada, o sabor do mar no seu prato.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-babyBlueLight/30 transition-colors duration-300 flex flex-col items-center text-center group border border-slate-100">
              <div className="bg-babyBlue/20 p-4 rounded-full text-babyBlueDark mb-6 group-hover:bg-babyBlue group-hover:text-white transition-colors duration-300">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Localização Privilegiada</h3>
              <p className="text-gray-600 leading-relaxed">
                Pé na areia, brisa do mar e uma vista inesquecível. O ambiente perfeito para relaxar com a família.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-babyBlueLight/30 transition-colors duration-300 flex flex-col items-center text-center group border border-slate-100">
              <div className="bg-babyBlue/20 p-4 rounded-full text-babyBlueDark mb-6 group-hover:bg-babyBlue group-hover:text-white transition-colors duration-300">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Atendimento Especial</h3>
              <p className="text-gray-600 leading-relaxed">
                Faça sua reserva ou tire dúvidas diretamente pelo WhatsApp. Estamos prontos para te receber.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mini CTA */}
      <section className="py-16 bg-babyBlue text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Pronto para relaxar?</h2>
          <p className="text-lg mb-8 opacity-90">Venha passar o dia com a gente. Estamos te esperando!</p>
          <Link to="/contato" className="inline-block bg-white text-babyBlueDark font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-md">
            Entre em contato
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;