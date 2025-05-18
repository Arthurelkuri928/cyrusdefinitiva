
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = () => {
  const { user, loading, session } = useAuth();
  const location = useLocation();

  // Verificação adicional de sessão
  useEffect(() => {
    // Verificar se a sessão é válida
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        console.error("Erro na verificação de sessão:", error?.message);
      }
    };

    if (user) {
      checkSession();
    }
  }, [user]);

  if (loading) {
    // Mostra um loader enquanto verifica o estado da autenticação
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0D0D0D]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A259FF]"></div>
      </div>
    );
  }

  // Verificação rigorosa: usuário deve estar presente E ter uma sessão válida
  if (!user || !session) {
    console.log("Usuário não autenticado, redirecionando para login");
    // Salva o local de onde veio para redirecionar de volta após o login
    return <Navigate to="/entrar" state={{ from: location.pathname }} replace />;
  }

  // Se estiver autenticado, renderiza o conteúdo da rota
  return <Outlet />;
};

export default ProtectedRoute;
