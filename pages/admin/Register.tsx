import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { UserPlus, ArrowLeft, CheckCircle, ShieldAlert } from 'lucide-react';
import { ADMIN_REGISTRATION_CODE } from '../../constants';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validação do Código de Segurança
    if (securityCode !== ADMIN_REGISTRATION_CODE) {
        setError('Código de segurança inválido. Contate o proprietário.');
        return;
    }

    if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        return;
    }

    if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) throw error;

      if (data.user) {
        setSuccess(true);
        
        // Se user existe mas session é null, o Supabase exige confirmação de email
        if (data.user && !data.session) {
          setNeedsConfirmation(true);
        } else {
          // Se já tem sessão (ex: email confirm desligado no supabase), redireciona
          setTimeout(() => navigate('/admin/dashboard'), 1500);
        }
      }
      
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success && needsConfirmation) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 w-full max-w-md animate-fade-in text-center">
          <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center text-green-600 mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Conta Criada!</h2>
          <p className="text-gray-600 mb-8">
            Enviamos um link de confirmação para <strong>{email}</strong>. <br/>
            Por favor, verifique sua caixa de entrada (e spam) para ativar sua conta antes de logar.
          </p>
          <Link 
            to="/admin/login"
            className="block w-full bg-babyBlueDark text-white font-bold py-4 rounded-xl hover:bg-sky-500 transition-colors"
          >
            Voltar para Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-babyBlue/20 p-4 rounded-full text-babyBlueDark mb-4">
            <UserPlus size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Novo Cadastro</h2>
          <p className="text-gray-500 text-sm mt-1">Crie sua conta administrativa</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 font-medium text-sm p-4 rounded-xl mb-6 text-center border border-red-200">
            {error}
          </div>
        )}

        {success && !needsConfirmation && (
          <div className="bg-green-50 text-green-600 font-medium text-sm p-4 rounded-xl mb-6 text-center border border-green-200 flex items-center justify-center gap-2">
            <CheckCircle size={18} /> Conta criada! Redirecionando...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 flex items-center gap-2">
               <ShieldAlert size={14} className="text-orange-500" /> Código de Segurança
            </label>
            <input
              type="text"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value.toUpperCase())}
              className="w-full px-5 py-4 rounded-xl border-2 border-orange-200 bg-orange-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-200 uppercase tracking-widest font-bold"
              placeholder="CÓDIGO MESTRE"
              required
            />
            <p className="text-xs text-gray-400 mt-1 ml-1">Necessário para autorizar novos administradores.</p>
          </div>

          <div className="border-t border-gray-100 my-4"></div>

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
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 bg-slate-50 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-babyBlueDark focus:ring-4 focus:ring-babyBlue/20 outline-none transition-all duration-200"
              placeholder="Repita a senha"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-babyBlueDark hover:bg-sky-500 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
               <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : 'Cadastrar'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link 
              to="/admin/login"
              className="text-gray-500 hover:text-babyBlueDark font-medium flex items-center justify-center gap-1 transition-colors text-sm"
            >
               <ArrowLeft size={16} /> Voltar para Login
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;