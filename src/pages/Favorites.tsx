import React, { useState, useEffect } from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, StarOff, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/member/Footer";
import { toolsData } from "./MemberArea";

const Favorites = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteTools, setFavoriteTools] = useState<any[]>([]);
  
  useEffect(() => {
    // Carregar favoritos do localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
    
    // Filtrar ferramentas favoritas
    const favTools = toolsData.filter(tool => savedFavorites.includes(tool.id));
    setFavoriteTools(favTools);
  }, []);
  
  const handleRemoveFavorite = (toolId: number) => {
    // Remover dos favoritos
    const updatedFavorites = favorites.filter(id => id !== toolId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    
    // Atualizar lista de ferramentas favoritas
    const updatedFavoriteTools = favoriteTools.filter(tool => tool.id !== toolId);
    setFavoriteTools(updatedFavoriteTools);
    
    // Mostrar toast de confirmação
    const tool = toolsData.find(t => t.id === toolId);
    if (tool) {
      toast({
        title: "Removido dos favoritos",
        description: `${tool.title} foi removido dos seus favoritos.`,
      });
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-600 hover:bg-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Online</Badge>;
      case 'offline':
        return <Badge className="bg-red-600 hover:bg-red-700"><AlertCircle className="h-3 w-3 mr-1" /> Offline</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-600 hover:bg-yellow-700"><Clock className="h-3 w-3 mr-1" /> Em Manutenção</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Barra Lateral */}
      <Sidebar />
      
      {/* Conteúdo Principal */}
      <main className="md:ml-64 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Meus Favoritos</h1>
            <p className="text-zinc-400">
              Acesse rapidamente suas ferramentas favoritas
            </p>
          </div>
          
          {favoriteTools.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <StarOff className="h-16 w-16 text-zinc-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Nenhum favorito encontrado</h2>
              <p className="text-zinc-400 mb-6 max-w-md">
                Você ainda não adicionou nenhuma ferramenta aos seus favoritos. 
                Explore o catálogo e adicione suas ferramentas preferidas.
              </p>
              <Button 
                className="bg-[#A259FF] hover:bg-[#C084FC]"
                onClick={() => navigate('/area-membro')}
              >
                Explorar Ferramentas
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteTools.map((tool) => (
                <Card 
                  key={tool.id}
                  className="bg-zinc-900/80 backdrop-blur-md border-zinc-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#A259FF]/10 hover:-translate-y-1"
                >
                  <div 
                    className="h-32 flex items-center justify-center relative" 
                    style={{ 
                      backgroundColor: tool.bgColor || '#1A1A1A',
                      color: tool.textColor || 'white'
                    }}
                  >
                    <img 
                      src={tool.logoImage} 
                      alt={tool.title} 
                      className="max-h-20 max-w-full object-contain"
                    />
                    <button 
                      className="absolute top-2 right-2 text-white hover:text-yellow-400 transition-colors"
                      onClick={() => handleRemoveFavorite(tool.id)}
                      title="Remover dos favoritos"
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </button>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold truncate">{tool.title}</h3>
                      {getStatusBadge(tool.status)}
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <Badge variant="outline" className="border-[#A259FF] text-[#A259FF]">
                        {tool.category}
                      </Badge>
                      
                      <Button 
                        size="sm" 
                        className="bg-[#A259FF] hover:bg-[#C084FC] text-xs px-3"
                        onClick={() => navigate(`/ferramenta/${tool.id}`)}
                      >
                        Acessar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Rodapé */}
        <Footer />
      </main>
    </div>
  );
};

export default Favorites;
