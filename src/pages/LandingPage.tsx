import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Zap, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toolsData } from './MemberArea';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('new');
  const [filteredTools, setFilteredTools] = useState(toolsData.slice(0, 8));
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Categorias para o filtro
  const categories = [
    { id: "new", label: "Novas Ferramentas" },
    { id: "ia", label: "IA" },
    { id: "espionagem", label: "Espionagem" },
    { id: "mineracao", label: "Mineração" },
    { id: "seo", label: "SEO / Análise" },
    { id: "streaming", label: "Streaming" },
    { id: "design", label: "Design/Criação" },
    { id: "diversos", label: "Diversos" },
  ];
  
  // Filtrar ferramentas com base na categoria
  useEffect(() => {
    let result = [];
    
    if (activeCategory === "new") {
      // Para novas ferramentas, mostrar as 8 mais recentes
      result = [...toolsData]
        .sort((a, b) => b.id - a.id)
        .slice(0, 8);
    } else {
      // Filtrar por categoria
      result = toolsData.filter(tool => {
        const category = tool.category.toLowerCase();
        if (activeCategory === "ia" && category.includes("ia")) return true;
        if (activeCategory === "espionagem" && category.includes("espionagem")) return true;
        if (activeCategory === "mineracao" && category.includes("mineração")) return true;
        if (activeCategory === "seo" && category.includes("seo")) return true;
        if (activeCategory === "streaming" && category.includes("streaming")) return true;
        if (activeCategory === "design" && (category.includes("design") || category.includes("criação"))) return true;
        if (activeCategory === "diversos" && category.includes("diversos")) return true;
        return false;
      });
    }
    
    setFilteredTools(result);
  }, [activeCategory]);
  
  // Funções para navegação do carrossel
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  // Componente de card de ferramenta para o carrossel
  const ToolCard = ({ tool }: { tool: any }) => {
    return (
      <div 
        className="flex-shrink-0 w-[280px] h-[110px] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/10"
        style={{ backgroundColor: tool.bgColor || "#1E1E1E" }}
        onClick={() => navigate('/login')}
      >
        {/* Status indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <div className={`h-2 w-2 rounded-full ${tool.status === 'online' ? 'bg-green-500' : tool.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
          <span className={`text-xs font-medium ${tool.textColor === 'white' ? 'text-white' : 'text-black'} opacity-80`}>
            {tool.status === 'online' ? 'Ativa' : tool.status === 'maintenance' ? 'Em Manutenção' : 'Offline'}
          </span>
        </div>
        
        {/* Card layout */}
        <div className="flex h-full">
          {/* Logo side */}
          <div className="w-1/3 flex items-center justify-center p-3 border-r border-white/10">
            <img 
              src={tool.logoImage} 
              alt={tool.title} 
              className="max-w-[85%] max-h-[85%] object-contain" 
            />
          </div>
          
          {/* Content side */}
          <div className="w-2/3 flex flex-col justify-center p-4">
            <h3 className={`text-lg font-bold ${tool.textColor === 'white' ? 'text-white' : 'text-black'} line-clamp-1`}>
              {tool.title}
            </h3>
            
            <div className={`text-xs mt-1 ${tool.textColor === 'white' ? 'text-white/70' : 'text-black/70'}`}>
              {tool.category}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E2E8F0] overflow-x-hidden">
      {/* Header e Apresentação */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#9333EA]/20 to-transparent opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#A855F7]/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#9333EA]/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        {/* Header */}
        <header className="w-full max-w-7xl mx-auto py-6 px-4 flex justify-between items-center relative z-10">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-white tracking-wider">CYRUS</h1>
          </div>
          <Button 
            className="bg-[#9333EA] hover:bg-[#A855F7] text-white"
            onClick={() => navigate('/login')}
          >
            Acessar Plataforma
          </Button>
        </header>
        
        {/* Hero Content */}
        <div className="container mx-auto max-w-6xl px-4 flex flex-col lg:flex-row items-center justify-between gap-12 mt-12 mb-24 relative z-10">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Todas as <span className="text-[#A855F7]">ferramentas premium</span> em um único lugar
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Acesse mais de 40 ferramentas de IA, design, SEO e espionagem com um único login. Economize tempo e dinheiro com a CYRUS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                className="bg-[#9333EA] hover:bg-[#A855F7] text-white px-8 py-6 text-lg shadow-lg shadow-[#9333EA]/20 hover:shadow-[#9333EA]/40 transition-all"
                onClick={() => navigate('/login')}
              >
                Acessar Agora <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-[#9333EA] text-[#A855F7] hover:bg-[#9333EA]/10 px-8 py-6 text-lg"
                onClick={() => {
                  const toolsSection = document.getElementById('tools-section');
                  if (toolsSection) {
                    toolsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Ver Ferramentas
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9333EA] to-[#A855F7] rounded-lg blur opacity-30"></div>
              <div className="relative bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#9333EA]/20">
                <img 
                  src="https://i.postimg.cc/tJKhZXgC/dashboard-preview.png" 
                  alt="CYRUS Dashboard Preview" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <Badge className="bg-[#9333EA] text-white mb-2">Premium</Badge>
                  <h3 className="text-xl font-bold text-white">Acesso ilimitado a todas as ferramentas</h3>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-2">Conheça mais</p>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <motion.div 
                className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Diferenciais com Cards Tecnológicos */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher a <span className="text-[#A855F7]">CYRUS</span>?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Nossa plataforma foi desenvolvida para oferecer a melhor experiência em acesso a ferramentas premium.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <motion.div 
              className="bg-[#1A1A1A] rounded-xl p-6 border border-[#9333EA]/20 hover:border-[#9333EA]/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(147, 51, 234, 0.1)' }}
            >
              <div className="w-12 h-12 rounded-full bg-[#9333EA]/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-[#A855F7]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Segurança Avançada</h3>
              <p className="text-gray-400">
                Todas as suas credenciais são protegidas com criptografia de ponta a ponta e autenticação segura.
              </p>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              className="bg-[#1A1A1A] rounded-xl p-6 border border-[#9333EA]/20 hover:border-[#9333EA]/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(147, 51, 234, 0.1)' }}
            >
              <div className="w-12 h-12 rounded-full bg-[#9333EA]/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-[#A855F7]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Acesso Instantâneo</h3>
              <p className="text-gray-400">
                Sem downloads ou configurações complexas. Acesse todas as ferramentas com apenas um clique.
              </p>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div 
              className="bg-[#1A1A1A] rounded-xl p-6 border border-[#9333EA]/20 hover:border-[#9333EA]/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(147, 51, 234, 0.1)' }}
            >
              <div className="w-12 h-12 rounded-full bg-[#9333EA]/20 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-[#A855F7]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Disponibilidade 24/7</h3>
              <p className="text-gray-400">
                Nossas ferramentas estão sempre disponíveis, com monitoramento constante e atualizações regulares.
              </p>
            </motion.div>
            
            {/* Card 4 */}
            <motion.div 
              className="bg-[#1A1A1A] rounded-xl p-6 border border-[#9333EA]/20 hover:border-[#9333EA]/50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(147, 51, 234, 0.1)' }}
            >
              <div className="w-12 h-12 rounded-full bg-[#9333EA]/20 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-[#A855F7]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Acesso Exclusivo</h3>
              <p className="text-gray-400">
                Ferramentas premium selecionadas, disponíveis apenas para membros da plataforma CYRUS.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Carrossel de Ferramentas */}
      <section id="tools-section" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore nossas <span className="text-[#A855F7]">ferramentas</span></h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Mais de 40 ferramentas premium para impulsionar seus projetos e negócios.
            </p>
          </motion.div>
          
          {/* Filtros */}
          <div className="mb-8 overflow-x-auto scrollbar-none">
            <div className="flex space-x-2 pb-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className={activeCategory === category.id 
                    ? "bg-[#9333EA] hover:bg-[#A855F7] text-white whitespace-nowrap" 
                    : "bg-[#1A1A1A] border-zinc-700 text-zinc-300 hover:text-white hover:border-[#9333EA] whitespace-nowrap"
                  }
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Carrossel */}
          <div className="relative">
            <motion.div 
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#9333EA]/30 text-white hover:bg-[#9333EA]/20 hover:border-[#9333EA]"
                onClick={scrollLeft}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#9333EA]/30 text-white hover:bg-[#9333EA]/20 hover:border-[#9333EA]"
                onClick={scrollRight}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
            
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto gap-4 pb-6 scrollbar-none scroll-smooth snap-x"
            >
              {filteredTools.map((tool) => (
                <div key={tool.id} className="flex-shrink-0 snap-start">
                  <ToolCard tool={tool} />
                </div>
              ))}
              
              {/* Cartão final com CTA */}
              <div className="flex-shrink-0 w-[280px] h-[110px] rounded-lg overflow-hidden cursor-pointer bg-gradient-to-r from-[#9333EA] to-[#A855F7] flex items-center justify-center snap-start">
                <div className="text-center px-4">
                  <h3 className="text-lg font-bold text-white mb-1">Acesse Todas</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-white text-white hover:bg-white/20"
                    onClick={() => navigate('/login')}
                  >
                    Entrar Agora
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Final */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-[#1A1A1A] border-[#9333EA]/20 p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Pronto para acessar todas as ferramentas?</h3>
              <p className="text-gray-300 mb-6">
                Junte-se a milhares de profissionais que já economizam tempo e dinheiro com a CYRUS.
              </p>
              <Button 
                className="bg-[#9333EA] hover:bg-[#A855F7] text-white px-8 py-6 text-lg shadow-lg shadow-[#9333EA]/20 hover:shadow-[#9333EA]/40 transition-all"
                onClick={() => navigate('/login')}
              >
                Acessar Plataforma <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#0A0A0A] py-12 px-4 border-t border-[#9333EA]/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">CYRUS</h2>
              <p className="text-gray-400 mt-1">Sua Central de Pagamentos Unificada</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white"
                onClick={() => navigate('/login')}
              >
                Entrar
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white"
              >
                Termos de Uso
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white"
              >
                Política de Privacidade
              </Button>
            </div>
          </div>
          
          <div className="border-t border-[#9333EA]/10 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} CYRUS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
