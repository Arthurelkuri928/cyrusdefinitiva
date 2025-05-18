import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Star, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  onShowProfileDialog?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onShowProfileDialog }) => {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [username, setUsername] = useState("Usuário");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Verificar se é mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Carregar dados do usuário
  useEffect(() => {
    const userName = user?.user_metadata?.username || localStorage.getItem("username");
    if (userName) {
      setUsername(userName);
    }

    const savedAvatar = localStorage.getItem("selectedAvatar");
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
    }
  }, [user]);

  // Itens do menu
  const menuItems = [
    { 
      path: '/area-membro', 
      name: 'Início', 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      path: '/favoritos', 
      name: 'Favoritos', 
      icon: <Star className="h-5 w-5" /> 
    },
    { 
      path: '/perfil', 
      name: 'Meu Perfil', 
      icon: <User className="h-5 w-5" /> 
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setExpanded(!expanded);
    }
  };

  // Estilo da barra lateral com glassmorphism
  const sidebarClasses = `
    fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out
    bg-[#0e0e12]/70 backdrop-blur-md border-r border-white/10
    shadow-xl shadow-purple-500/10
    ${isMobile 
      ? `${mobileOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'}`
      : `${expanded ? 'w-64' : 'w-16'}`
    }
  `;

  // Componente para o botão do menu mobile
  const MobileMenuButton = () => (
    <button 
      className="fixed top-4 left-4 z-50 p-2 rounded-full bg-[#0e0e12]/90 text-white shadow-lg shadow-purple-500/20"
      onClick={toggleSidebar}
    >
      {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );

  return (
    <>
      {isMobile && <MobileMenuButton />}
      
      <div className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Cabeçalho */}
          <div className="p-4 flex items-center justify-between">
            {(expanded || mobileOpen) && (
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedAvatar} alt={username} />
                  <AvatarFallback className="bg-purple-800 text-white">
                    {username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-white font-medium truncate">{username}</span>
              </div>
            )}
            
            {!isMobile && (
              <button 
                onClick={toggleSidebar}
                className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                {expanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>

          {/* Menu de navegação */}
          <nav className="flex-1 px-2 py-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`
                        w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-purple-900/50 to-purple-600/30 text-white' 
                          : 'text-gray-300 hover:bg-white/5'
                        }
                        ${!expanded && !mobileOpen ? 'justify-center' : 'justify-start'}
                      `}
                    >
                      <div className={`${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {item.icon}
                      </div>
                      
                      {(expanded || mobileOpen) && (
                        <span className="ml-3 whitespace-nowrap">{item.name}</span>
                      )}
                      
                      {isActive && (
                        <div className="absolute left-0 w-1 h-8 bg-purple-500 rounded-r-full" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Rodapé */}
          <div className="p-4">
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
                text-gray-300 hover:bg-white/5
                ${!expanded && !mobileOpen ? 'justify-center' : 'justify-start'}
              `}
            >
              <LogOut className="h-5 w-5 text-gray-400" />
              {(expanded || mobileOpen) && (
                <span className="ml-3">Sair</span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay para fechar o menu no mobile */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
