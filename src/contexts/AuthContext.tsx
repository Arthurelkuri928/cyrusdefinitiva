
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Configurar listener de mudança de estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    // Verificar se já existe uma sessão ativa
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Erro ao fazer login:', error.message);
        let errorMessage = 'Erro ao fazer login. Tente novamente.';
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'E-mail não confirmado. Verifique sua caixa de entrada.';
        }
        
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }

      if (!data.session || !data.user) {
        const errorMessage = 'Falha na autenticação. Tente novamente.';
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }

      // Se o login for bem-sucedido, atualizamos o estado e redirecionamos
      setSession(data.session);
      setUser(data.user);
      navigate('/area-membro');
      toast.success('Login realizado com sucesso!');
      return { success: true };
    } catch (error: any) {
      console.error('Erro ao fazer login:', error.message);
      const errorMessage = `Erro inesperado: ${error.message}`;
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      navigate('/entrar');
      toast.success('Você foi desconectado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error.message);
      toast.error(`Erro ao fazer logout: ${error.message}`);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
