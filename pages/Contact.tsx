import React from 'react';
import { MapPin, Phone, Instagram, Clock, ExternalLink } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Contact: React.FC = () => {
  const { settings } = useData();

  return (
    <div className="bg-white min-h-screen py-10 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-slide-up">Entre em Contato</h1>
          <p className="text-gray-500 text-lg">Estamos ansiosos para receber você e sua família.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <div className="space-y-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-babyBlue/20 p-3 rounded-xl text-babyBlueDark mr-4">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Horário de Funcionamento</h3>
                    <p className="text-gray-600 mt-1">{settings.openingHours}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-babyBlue/20 p-3 rounded-xl text-babyBlueDark mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Endereço</h3>
                    <p className="text-gray-600 mt-1">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-babyBlue/20 p-3 rounded-xl text-babyBlueDark mr-4">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp / Telefone</h3>
                    <p className="text-gray-600 mt-1 mb-2">+ {settings.whatsapp}</p>
                    <a 
                      href={`https://wa.me/${settings.whatsapp.replace(/\D/g,'')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-babyBlueDark hover:text-blue-600"
                    >
                      Enviar mensagem <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-babyBlue/20 p-3 rounded-xl text-babyBlueDark mr-4">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Instagram</h3>
                    <p className="text-gray-600 mt-1 mb-2">@{settings.instagram.replace('@','')}</p>
                    <a 
                      href={`https://instagram.com/${settings.instagram.replace('@','')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-babyBlueDark hover:text-blue-600"
                    >
                      Seguir perfil <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <a 
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g,'')}`}
              target="_blank"
              rel="noopener noreferrer" 
              className="block w-full py-4 bg-[#25D366] text-white text-center font-bold rounded-2xl shadow-lg hover:bg-[#20bd5a] transition-colors hover:-translate-y-1"
            >
              Chamar no WhatsApp Agora
            </a>
          </div>

          {/* Map Side */}
          <div className="h-[400px] lg:h-auto rounded-3xl overflow-hidden shadow-md border border-gray-200">
            <iframe
              src={settings.mapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Barraca do Jangadeiro"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;