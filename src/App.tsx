
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlanosPage from "./pages/PlanosPage";
import MemberArea from "./pages/MemberArea";
import ProfilePage from "./pages/ProfilePage";
import ContentDetail from "./pages/ContentDetail";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create QueryClient with better configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner position="top-right" theme="dark" />
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Index />} />
              <Route path="/entrar" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/planos" element={<PlanosPage />} />
              
              {/* Rotas protegidas - requer autenticação */}
              <Route element={<ProtectedRoute />}>
                <Route path="/area-membro" element={<MemberArea />} />
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/ferramentas" element={<MemberArea />} />
                <Route path="/content/:id" element={<ContentDetail />} />
                <Route path="/favoritos" element={<Favorites />} />
                <Route path="/ferramenta/:id" element={<ContentDetail />} />
              </Route>
              
              {/* Rota não encontrada */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
