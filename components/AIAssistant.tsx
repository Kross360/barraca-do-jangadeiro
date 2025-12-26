
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, MapPin, Search, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { AppSettings, ChatMessage } from '../types';

interface AIAssistantProps {
  settings: AppSettings;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou o Jangadeiro Virtual. Quer saber sobre o clima, atrações próximas ou nosso cardápio?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let userLocation: GeolocationCoordinates | undefined;
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        userLocation = position.coords;
      } catch (e) { }

      const response = await sendMessageToGemini(userMsg.text, settings, userLocation);
      const text = response.text || "Desculpe, não consegui processar sua solicitação no momento.";
      
      const sources: { uri: string; title: string }[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web?.uri) {
            sources.push({ uri: chunk.web.uri, title: chunk.web.title || 'Fonte Web' });
          }
          if (chunk.maps?.uri) {
             sources.push({ uri: chunk.maps.uri, title: chunk.maps.title || 'Google Maps' });
          }
        });
      }

      setMessages(prev => [...prev, { role: 'model', text, sources }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Tive um problema ao consultar as marés digitais. Tente novamente.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
          isOpen ? 'scale-0 opacity-0' : 'bg-jangadeiro-blue text-white scale-100 opacity-100'
        }`}
      >
        <MessageCircle size={28} />
      </button>

      <div
        className={`fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right border border-slate-200 dark:border-slate-800 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-jangadeiro-blue p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-full">
               <Search size={16} className="text-white" />
            </div>
            <span className="font-semibold">Jangadeiro Virtual</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-jangadeiro-blue text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 shadow-sm border border-gray-100 dark:border-slate-700 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {msg.sources.map((source, sIdx) => (
                    <a
                      key={sIdx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs flex items-center gap-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-2 py-1 rounded-md text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      {source.uri.includes('maps') ? <MapPin size={10} /> : <Search size={10} />}
                      {source.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-jangadeiro-blue" />
                <span className="text-xs text-gray-400 dark:text-slate-500">Consultando o mar...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite aqui sua dúvida..."
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full px-5 py-2.5 text-sm text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:border-jangadeiro-blue focus:ring-4 focus:ring-jangadeiro-blue/20 transition-all placeholder:text-gray-500 dark:placeholder:text-slate-500 shadow-inner focus:bg-white dark:focus:bg-slate-700"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-jangadeiro-blue text-white p-2.5 rounded-full hover:bg-jangadeiro-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-[10px] text-center text-gray-400 dark:text-slate-600 mt-2">
            IA pode cometer erros. Verifique informações importantes.
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
