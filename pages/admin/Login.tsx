import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, ArrowRight, AlertCircle, Info } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) throw error;
      
      if (data.session) {
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Tratamento de erros comuns do Supabase
      if (err.message.includes('Email not confirmed')) {
        setError('Seu email ainda não foi confirmado. Verifique sua caixa de entrada.');
      } else if (err.message.includes('Invalid login credentials')) {
        setError('Email ou senha incorretos.');
      } else {
        setError('Erro ao conectar. Verifique seus dados e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-babyBlue/20 p-4 rounded-full text-babyBlueDark mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Área Restrita</h2>
          <p className="text-gray-500 text-sm mt-1">Acesso via Supabase Auth</p>
        </div>

        {/* Info Box para Primeiro Acesso */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3">
          <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-blue-800 leading-relaxed">
            <strong>Primeiro acesso?</strong> Como o sistema usa segurança real, você precisa <Link to="/admin/cadastro" className="underline font-bold hover:text-blue-600">criar sua própria conta</Link> antes de entrar. O login de teste antigo foi removido.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 font-medium text-sm p-4 rounded-xl mb-6 flex items-start gap-2 border border-red-200">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 bg-slate-50 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-babyBlueDark focus:ring-4 focus:ring-babyBlue/20 outline-none transition-all duration-200"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 bg-slate-50 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-babyBlueDark focus:ring-4 focus:ring-babyBlue/20 outline-none transition-all duration-200"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-babyBlueDark hover:bg-sky-500 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : 'Entrar'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm mb-3">Ainda não tem cadastro?</p>
            <Link 
              to="/admin/cadastro"
              className="text-babyBlueDark hover:text-sky-600 font-bold flex items-center justify-center gap-1 transition-colors"
            >
               Criar conta de administrador <ArrowRight size={16} />
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;