import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Cpu, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#1B4D3E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#8B5A3C]/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-[#1B4D3E] rounded-xl" />
              <Cpu className="absolute inset-0 m-auto w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A227] rounded-full animate-neural-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-[#2D3436]">MiCampo</span>
              <span className="text-xs text-[#8B5A3C] tracking-wider">SISTEMA NERVIOSO</span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-[#2D3436] mb-2 text-center">
            Bienvenido de vuelta
          </h1>
          <p className="text-[#2D3436]/60 text-center mb-6">
            Ingresa a tu cuenta para continuar
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[#2D3436]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 rounded-xl border-[#2D3436]/10 focus:border-[#1B4D3E] focus:ring-[#1B4D3E]"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#2D3436]">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 rounded-xl border-[#2D3436]/10 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D3436]/40 hover:text-[#2D3436]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-[#2D3436]/20" />
                <span className="text-[#2D3436]/60">Recordarme</span>
              </label>
              <a href="#" className="text-[#1B4D3E] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1B4D3E] hover:bg-[#143d31] text-white rounded-xl py-6 font-semibold transition-all duration-300 group"
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#2D3436]/60 text-sm">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-[#1B4D3E] font-semibold hover:underline">
                Crear cuenta
              </Link>
            </p>
          </div>

          {/* Demo info */}
          <div className="mt-6 p-4 bg-[#F5F2ED] rounded-xl text-center">
            <p className="text-xs text-[#2D3436]/50">
              <strong>Demo:</strong> Puedes usar cualquier email y contraseña para probar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
