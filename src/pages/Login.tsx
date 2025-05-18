import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, User, Lock, Shield, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [shakeError, setShakeError] = useState(false);
  const [appearAnimation, setAppearAnimation] = useState(false);
  const { signIn, user, loading } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    // Trigger appearance animation after component mount
    setTimeout(() => {
      setAppearAnimation(true);
    }, 100);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    if (!email || !password) {
      setLoginError("Por favor, preencha todos os campos.");
      triggerShakeAnimation();
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signIn(email, password);
      if (!result.success) {
        setLoginError("Credenciais inválidas. Verifique seu email e senha.");
        triggerShakeAnimation();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const triggerShakeAnimation = () => {
    setShakeError(true);
    setTimeout(() => setShakeError(false), 600);
  };

  // Redirecionamento se o usuário já estiver autenticado
  if (user && !loading) {
    // Verifica se há um estado de redirecionamento
    const from = location.state?.from || "/area-membro";
    return <Navigate to={from} replace />;
  }
  
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-4">
      <div 
        className={`mb-8 text-center transition-all duration-700 transform ${
          appearAnimation ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-[#9333EA] text-5xl font-bold tracking-wider uppercase mb-2">CYRUS</h1>
        <p className="text-white/50 text-sm">Sua Central de Pagamentos Unificada</p>
      </div>

      <div 
        className={`w-full max-w-md bg-[#0D0D0D] rounded-xl shadow-lg border border-[#9333EA]/20 overflow-hidden transition-all duration-700 transform ${
          appearAnimation ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        } ${shakeError ? "animate-shake" : ""}`}
        style={{
          boxShadow: "0 10px 30px rgba(147, 51, 234, 0.15)"
        }}
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Acesse sua conta na CYRUS
          </h2>
          
          {loginError && (
            <Alert variant="destructive" className="mb-6 bg-red-900/30 border-red-800 text-white">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {loginError}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <User className="w-5 h-5" />
                </div>
                <Input 
                  type="text" 
                  placeholder="Email ou usuário" 
                  className="bg-[#1A1A1A] border border-[#9333EA]/30 text-white pl-10 h-12 transition-all duration-300 focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA]/30"
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <Lock className="w-5 h-5" />
                </div>
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Sua senha" 
                  className="bg-[#1A1A1A] border border-[#9333EA]/30 text-white pl-10 h-12 transition-all duration-300 focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA]/30"
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-700 bg-[#1A1A1A] text-[#9333EA] focus:ring-[#9333EA]/30"
                  />
                  <label htmlFor="remember-me" className="ml-2 block">
                    Manter senha
                  </label>
                </div>
                <div>
                  <span className="text-gray-500">Esqueci minha senha</span>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#9333EA] hover:bg-[#A855F7] text-white font-medium py-6 h-12 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </div>
                ) : "Entrar"}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="bg-[#0A0A0A] p-4 border-t border-[#9333EA]/10 text-center text-sm">
          <p className="text-gray-400 mb-1">
            Acesso restrito apenas para usuários cadastrados.
          </p>
          <p className="text-gray-500">
            Entre em contato com o administrador para obter credenciais.
          </p>
        </div>
      </div>
      
      <div 
        className={`mt-6 text-center text-xs text-gray-500 max-w-md transition-all duration-700 transform ${
          appearAnimation ? "translate-y-0 opacity-100 delay-200" : "translate-y-10 opacity-0"
        }`}
      >
        <p>Seus dados estão protegidos com criptografia de ponta.</p>
        <p className="mt-2">
          <a href="#" className="text-gray-500 hover:text-[#9333EA] transition-colors">Termos de Uso</a>
          {" e "}
          <a href="#" className="text-gray-500 hover:text-[#9333EA] transition-colors">Políticas de Privacidade</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
