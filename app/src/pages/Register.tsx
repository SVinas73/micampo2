import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Cpu, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [farmName, setFarmName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await register(name, email, password, farmName);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('El email ya está registrado');
      }
    } catch (err) {
      setError('Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (name && email) {
      setStep(2);
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
            Activar MiCampo
          </h1>
          <p className="text-[#2D3436]/60 text-center mb-6">
            Crea tu cuenta y comienza a operar con inteligencia
          </p>

          {/* Progress steps */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 1 ? 'bg-[#1B4D3E] text-white' : 'bg-[#2D3436]/10 text-[#2D3436]/40'
            }`}>
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div className={`w-16 h-1 rounded-full ${step > 1 ? 'bg-[#1B4D3E]' : 'bg-[#2D3436]/10'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 2 ? 'bg-[#1B4D3E] text-white' : 'bg-[#2D3436]/10 text-[#2D3436]/40'
            }`}>
              2
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <Label htmlFor="name" className="text-[#2D3436]">Nombre completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 rounded-xl border-[#2D3436]/10 focus:border-[#1B4D3E] focus:ring-[#1B4D3E]"
                    required
                  />
                </div>

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

                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-[#1B4D3E] hover:bg-[#143d31] text-white rounded-xl py-6 font-semibold transition-all duration-300 group"
                >
                  Continuar
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="farmName" className="text-[#2D3436]">Nombre de tu campo/estancia</Label>
                  <Input
                    id="farmName"
                    type="text"
                    placeholder="Estancia La Esperanza"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="mt-1 rounded-xl border-[#2D3436]/10 focus:border-[#1B4D3E] focus:ring-[#1B4D3E]"
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

                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 rounded border-[#2D3436]/20" required />
                  <span className="text-xs text-[#2D3436]/60">
                    Acepto los <a href="#" className="text-[#1B4D3E] hover:underline">términos de servicio</a> y la{' '}
                    <a href="#" className="text-[#1B4D3E] hover:underline">política de privacidad</a>
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1B4D3E] hover:bg-[#143d31] text-white rounded-xl py-6 font-semibold transition-all duration-300 group"
                  disabled={loading}
                >
                  {loading ? 'Creando cuenta...' : 'Activar MiCampo'}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="w-full text-[#2D3436]/60"
                >
                  Volver
                </Button>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#2D3436]/60 text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-[#1B4D3E] font-semibold hover:underline">
                Ingresar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
