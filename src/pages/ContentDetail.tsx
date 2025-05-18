import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, CheckCircle, AlertCircle, Clock, ExternalLink, Mail, Key, Cookie } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useToolCredentials } from "@/hooks/use-tool-credentials";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/member/Footer";
import { toolsData } from "./MemberArea";

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { getCredentials } = useToolCredentials();
  
  const [tool, setTool] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Encontrar a ferramenta pelo ID
    const foundTool = toolsData.find(t => t.id.toString() === id);
    
    if (foundTool) {
      setTool(foundTool);
      
      // Verificar se a ferramenta está nos favoritos
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(foundTool.id));
    } else {
      // Ferramenta não encontrada, redirecionar para página 404
      navigate('/not-found');
    }
    
    setLoading(false);
  }, [id, navigate]);
  
  const handleCopy = (type: string) => {
    if (!user) return;
    
    let textToCopy = '';
    let successMessage = '';
    
    switch (type) {
      case 'email':
        textToCopy = 'usuario@cyrus.com.br';
        successMessage = 'Email copiado!';
        break;
      case 'password':
        textToCopy = 'senha_segura_123';
        successMessage = 'Senha copiada!';
        break;
      case 'cookie':
        textToCopy = 'session_token=abc123xyz456; expires=Sat, 31 Dec 2025 23:59:59 GMT; path=/';
        successMessage = 'Cookie copiado!';
        break;
      case 'all':
        textToCopy = 'Email: usuario@cyrus.com.br\nSenha: senha_segura_123';
        successMessage = 'Credenciais copiadas!';
        break;
      default:
        return;
    }
    
    navigator.clipboard.writeText(textToCopy);
    
    setCopiedType(type);
    toast({
      title: successMessage,
      description: "Informação copiada para sua área de transferência.",
    });
    
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };
  
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      // Remover dos favoritos
      const updatedFavorites = favorites.filter((favId: number) => favId !== tool.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      
      toast({
        title: "Removido dos favoritos",
        description: `${tool.title} foi removido dos seus favoritos.`,
      });
    } else {
      // Adicionar aos favoritos
      const updatedFavorites = [...favorites, tool.id];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
      
      toast({
        title: "Adicionado aos favoritos",
        description: `${tool.title} foi adicionado aos seus favoritos.`,
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9333EA]"></div>
      </div>
    );
  }
  
  if (!tool) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Ferramenta não encontrada</h1>
        <p className="text-gray-400 mb-6">A ferramenta que você está procurando não existe ou foi removida.</p>
        <Button onClick={() => navigate('/area-membro')} className="bg-[#9333EA] hover:bg-[#A855F7]">
          Voltar para Área de Membros
        </Button>
      </div>
    );
  }
  
  const getStatusBadge = () => {
    switch (tool.status) {
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
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
          {/* Botão de voltar */}
          <div className="w-full max-w-2xl mb-6">
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white"
              onClick={() => navigate('/area-membro')}
            >
              ← Voltar para Catálogo
            </Button>
          </div>
          
          {/* Card principal centralizado */}
          <Card className="w-full max-w-2xl bg-[#1A1A1A] border border-[#9333EA44] shadow-lg shadow-[#9333EA]/10 overflow-hidden">
            {/* Cabeçalho com logo e título */}
            <div className="flex flex-col items-center p-8 border-b border-[#9333EA]/20">
              <div 
                className="h-24 w-24 rounded-full flex items-center justify-center mb-4" 
                style={{ 
                  backgroundColor: tool.bgColor || '#1A1A1A',
                  padding: '1rem',
                  boxShadow: '0 4px 12px rgba(147, 51, 234, 0.15)'
                }}
              >
                <img 
                  src={tool.logoImage} 
                  alt={tool.title} 
                  className="max-h-16 max-w-16 object-contain"
                />
              </div>
              
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">{tool.title}</h1>
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="outline" className="border-[#9333EA] text-[#9333EA]">
                    {tool.category}
                  </Badge>
                  {getStatusBadge()}
                </div>
              </div>
            </div>
            
            {/* Seção de credenciais */}
            <div className="p-8">
              <h2 className="text-xl font-semibold mb-6 text-center">Credenciais de Acesso</h2>
              
              {tool.status === 'online' ? (
                <>
                  {/* Botões de cópia */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Button 
                      className={`flex items-center justify-center gap-2 ${
                        copiedType === 'email' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-[#9333EA] hover:bg-[#A855F7] hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                      }`}
                      onClick={() => handleCopy('email')}
                    >
                      {copiedType === 'email' ? <CheckCircle className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                      {copiedType === 'email' ? 'Copiado!' : 'Copiar Email'}
                    </Button>
                    
                    <Button 
                      className={`flex items-center justify-center gap-2 ${
                        copiedType === 'password' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-[#9333EA] hover:bg-[#A855F7] hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                      }`}
                      onClick={() => handleCopy('password')}
                    >
                      {copiedType === 'password' ? <CheckCircle className="h-4 w-4" /> : <Key className="h-4 w-4" />}
                      {copiedType === 'password' ? 'Copiado!' : 'Copiar Senha'}
                    </Button>
                    
                    <Button 
                      className={`flex items-center justify-center gap-2 ${
                        copiedType === 'cookie' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-[#9333EA] hover:bg-[#A855F7] hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                      }`}
                      onClick={() => handleCopy('cookie')}
                    >
                      {copiedType === 'cookie' ? <CheckCircle className="h-4 w-4" /> : <Cookie className="h-4 w-4" />}
                      {copiedType === 'cookie' ? 'Copiado!' : 'Copiar Cookie'}
                    </Button>
                  </div>
                  
                  {/* Botão de copiar tudo */}
                  <Button 
                    className={`w-full flex items-center justify-center gap-2 mb-6 ${
                      copiedType === 'all' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-zinc-800 hover:bg-zinc-700 border border-[#9333EA]/30'
                    }`}
                    onClick={() => handleCopy('all')}
                  >
                    {copiedType === 'all' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedType === 'all' ? 'Tudo Copiado!' : 'Copiar Todas as Credenciais'}
                  </Button>
                </>
              ) : (
                <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4 mb-6 text-center">
                  <AlertCircle className="h-6 w-6 mx-auto mb-2 text-red-500" />
                  <p className="text-white">
                    {tool.status === 'maintenance' 
                      ? 'Esta ferramenta está em manutenção. As credenciais estarão disponíveis em breve.' 
                      : 'Esta ferramenta está offline. As credenciais não estão disponíveis no momento.'}
                  </p>
                </div>
              )}
              
              {/* Instruções de uso */}
              <div className="bg-zinc-900/80 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-[#9333EA]" />
                  Instruções de Uso
                </h3>
                <ol className="list-decimal pl-5 text-gray-300 space-y-1 text-sm">
                  <li>Copie as credenciais usando os botões acima</li>
                  <li>Acesse o site oficial da ferramenta</li>
                  <li>Faça login usando as credenciais fornecidas</li>
                  <li>Não compartilhe estas credenciais com terceiros</li>
                </ol>
              </div>
              
              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className={`flex-1 ${isFavorite ? 'bg-zinc-800 hover:bg-zinc-700 border border-[#9333EA]/30' : 'bg-[#9333EA] hover:bg-[#A855F7]'}`}
                  onClick={toggleFavorite}
                >
                  {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </Button>
                
                <Button 
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center gap-2"
                  onClick={() => window.open(`https://${tool.title.toLowerCase().replace(/\s+/g, '')}.com`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                  Acessar Site Oficial
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Informações adicionais */}
          <div className="w-full max-w-2xl mt-8 text-center text-sm text-gray-400">
            <p>Última atualização das credenciais: {new Date().toLocaleDateString()}</p>
            <p className="mt-2">
              Problemas com o acesso? Entre em contato com o suporte da CYRUS.
            </p>
          </div>
        </div>
        
        {/* Rodapé */}
        <Footer />
      </main>
    </div>
  );
};

export default ContentDetail;
