import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import VideoCarousel from "@/components/member/VideoCarousel";
import ToolsSection from "@/components/member/ToolsSection";
import Footer from "@/components/member/Footer";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

// Dados das ferramentas importados do arquivo original
export const toolsData = [
  // Design/Creation Tools
  {
    id: 1,
    title: "Canva Pro",
    logoImage: "https://i.postimg.cc/TyJdn3w3/CANVA-PRO.png",
    bgColor: "#2A0B3B",
    textColor: "white",
    status: "online" as const,
    category: "Design/Criação"
  },
  {
    id: 2,
    title: "Adobe Stock",
    logoImage: "https://i.postimg.cc/t7CTtWFQ/ADOBE-STOCK.png",
    bgColor: "#E8E3FB",
    textColor: "black",
    status: "online" as const,
    category: "Design/Criação"
  },
  {
    id: 3,
    title: "Flaticon",
    logoImage: "https://i.postimg.cc/hz8dznFL/FLATICON.png",
    bgColor: "#001421",
    textColor: "white",
    status: "online" as const,
    category: "Design/Criação"
  },
  {
    id: 4,
    title: "Envato Elements",
    logoImage: "https://i.postimg.cc/68TnHFRK/ENVATO-ELEMENTS.png",
    bgColor: "#1E2609",
    textColor: "white",
    status: "online" as const,
    category: "Design/Criação"
  },
  {
    id: 5,
    title: "Freepik",
    logoImage: "https://i.postimg.cc/LhRfdJfN/FREEPIK.png",
    bgColor: "#001F49",
    textColor: "white",
    status: "online" as const,
    category: "Design/Criação"
  },
  {
    id: 6,
    title: "Storyblocks",
    logoImage: "https://i.postimg.cc/JDKhCzV2/STORYBLOCKS.png",
    bgColor: "#FFE53D",
    textColor: "black",
    status: "online" as const,
    category: "Design/Criação"
  },
  {
    id: 7,
    title: "CapCut Pro",
    logoImage: "https://i.postimg.cc/9DTFFpHT/CAPCUT-PRO.png",
    bgColor: "#E4E4E4",
    textColor: "black",
    status: "online" as const,
    category: "Design/Criação"
  },
  {
    id: 9,
    title: "LovePik",
    logoImage: "https://i.postimg.cc/jDWn6P0d/LOVEPIK.png",
    bgColor: "#081824",
    textColor: "white",
    status: "online" as const,
    category: "Design/Criação"
  },
  {
    id: 10,
    title: "Vectorizer",
    logoImage: "https://i.postimg.cc/FdhK6JqS/VECTORIZER.png",
    bgColor: "#1B22A3",
    textColor: "white",
    status: "online" as const,
    category: "Design/Criação"
  },
  {
    id: 11,
    title: "Epidemic Sound",
    logoImage: "https://i.postimg.cc/rDbW7gCr/EPIDEMIC-SOUND.png",
    bgColor: "#FFFFFF",
    textColor: "black",
    status: "online" as const,
    category: "Design/Criação"
  },
  
  // AI Tools
  {
    id: 12,
    title: "ChatGPT 4.0",
    logoImage: "https://i.postimg.cc/Q9NXmZ9k/CHAT-GPT.png",
    bgColor: "#000000",
    textColor: "white",
    status: "online" as const,
    category: "IA"
  },
  {
    id: 13,
    title: "Midjourney",
    logoImage: "https://i.postimg.cc/k6CVdHVB/MIDJOURNEY.png",
    bgColor: "#FFFFFF",
    textColor: "black",
    status: "online" as const,
    category: "IA"
  },
  {
    id: 14,
    title: "Leonardo AI",
    logoImage: "https://i.postimg.cc/nX6j3rpK/LEONARD-IA.png",
    bgColor: "#260F2B",
    textColor: "white",
    status: "online" as const,
    category: "IA"
  },
  {
    id: 15,
    title: "Gamma App",
    logoImage: "https://i.postimg.cc/4mx9djWc/GAMMA-APP.png",
    bgColor: "#23042E",
    textColor: "white",
    status: "online" as const,
    category: "IA"
  },
  {
    id: 16,
    title: "HeyGen",
    logoImage: "https://i.postimg.cc/56KFFprR/HEYGEN.png",
    bgColor: "#1A102B",
    textColor: "white",
    status: "online" as const,
    category: "IA"
  },
  {
    id: 17,
    title: "ChatBot X",
    logoImage: "https://i.postimg.cc/Pp6dFV1G/CHATBOT-X.png",
    bgColor: "#FFFFFF",
    textColor: "black",
    status: "maintenance" as const,
    category: "IA"
  },
  {
    id: 18,
    title: "Claude AI",
    logoImage: "https://i.postimg.cc/m1tTx3SP/CLAUDE-IA.png",
    bgColor: "#5A2F13",
    textColor: "white",
    status: "online" as const,
    category: "IA"
  },
  {
    id: 19,
    title: "Dreamface",
    logoImage: "https://i.postimg.cc/ThqVhVGz/DREAMFACE.png",
    bgColor: "#42F7A2",
    textColor: "black",
    status: "online" as const,
    category: "IA"
  },
  {
    id: 20,
    title: "Grok",
    logoImage: "https://i.postimg.cc/XX85nnk3/GROK.png",
    bgColor: "#FFFFFF",
    textColor: "black",
    status: "online" as const,
    category: "IA"
  },
  
  // Mining Tools
  {
    id: 23,
    title: "Filtrify",
    logoImage: "https://i.postimg.cc/N9vXjMnG/FILTRIFY.png",
    bgColor: "#1B2837",
    textColor: "white",
    status: "online" as const,
    category: "Mineração"
  },
  {
    id: 24,
    title: "DropTool",
    logoImage: "https://i.postimg.cc/SJgcfmnV/DROPTOOL.png",
    bgColor: "#F4EFFF",
    textColor: "black",
    status: "online" as const,
    category: "Mineração"
  },
  {
    id: 25,
    title: "Adminer",
    logoImage: "https://i.postimg.cc/Pvx5Xndr/ADMINER.png",
    bgColor: "#000000",
    textColor: "white",
    status: "online" as const,
    category: "Mineração"
  },
  {
    id: 26,
    title: "PipiAds",
    logoImage: "https://i.postimg.cc/5QN6XFSJ/PIPIADS.png",
    bgColor: "#FFFFFF",
    textColor: "black",
    status: "online" as const,
    category: "Mineração"
  },
  
  // SEO Tools
  {
    id: 27,
    title: "SEMrush",
    logoImage: "https://i.postimg.cc/c6XvVXdL/SEMRUSH.png",
    bgColor: "#FF6A22",
    textColor: "white",
    status: "online" as const,
    category: "SEO / Análise"
  },
  {
    id: 28,
    title: "UberSuggest",
    logoImage: "https://i.postimg.cc/qtsRQGm0/UBERSUGGEST.png",
    bgColor: "#FF6A22",
    textColor: "black",
    status: "online" as const,
    category: "SEO / Análise"
  },
  {
    id: 29,
    title: "Similar Web",
    logoImage: "https://i.postimg.cc/1fX8Pwzc/SIMILAR-WEB.png",
    bgColor: "#ECE4F5",
    textColor: "black",
    status: "online" as const,
    category: "SEO / Análise"
  },
  {
    id: 30,
    title: "AnswerThePublic",
    logoImage: "https://i.postimg.cc/nMRLdr1s/ANSWER-THE-PUBLIC.png",
    bgColor: "#FFFFFF",
    textColor: "black",
    status: "online" as const,
    category: "SEO / Análise"
  },
  
  // Espionagem Tools
  {
    id: 31,
    title: "BigSpy",
    logoImage: "https://i.postimg.cc/jLBSb1mt/BIGSPY.png",
    bgColor: "#001428",
    textColor: "white",
    status: "online" as const,
    category: "Espionagem"
  },
  {
    id: 32,
    title: "SpyHero",
    logoImage: "https://i.postimg.cc/yDSW3KcD/SPYHERO.png",
    bgColor: "#FFFFFF",
    textColor: "black",
    status: "offline" as const,
    category: "Espionagem"
  },
  {
    id: 33,
    title: "SpyGuru",
    logoImage: "https://i.postimg.cc/tYcYgJZ0/SPYGURU.png",
    bgColor: "#04111C",
    textColor: "white",
    status: "maintenance" as const,
    category: "Espionagem"
  },
  {
    id: 34,
    title: "AdSparo",
    logoImage: "https://i.postimg.cc/VdJk2w7K/ADSPARO.png",
    bgColor: "#450E22",
    textColor: "white",
    status: "online" as const,
    category: "Espionagem"
  },
  {
    id: 35,
    title: "SpyHorus",
    logoImage: "https://i.postimg.cc/CZT5j2sm/SPYHORUS.png",
    bgColor: "#3C0B4A",
    textColor: "white",
    status: "online" as const,
    category: "Espionagem"
  },
  
  // Streaming
  {
    id: 36,
    title: "Netflix Premium",
    logoImage: "https://i.postimg.cc/7C0Cd4ZF/NETFLIX-PREMIUM.png",
    bgColor: "#16070B",
    textColor: "white",
    status: "online" as const,
    category: "Streaming"
  },
  {
    id: 37,
    title: "Disney+",
    logoImage: "https://i.postimg.cc/1fmpF83f/DISNEY.png",
    bgColor: "#0C1B3D",
    textColor: "white",
    status: "online" as const,
    category: "Streaming"
  },
  {
    id: 38,
    title: "Prime Video",
    logoImage: "https://i.postimg.cc/s1VB6tdL/PRIME-VIDEO.png",
    bgColor: "#32A4FF",
    textColor: "white",
    status: "online" as const,
    category: "Streaming"
  },
  {
    id: 39,
    title: "Crunchyroll",
    logoImage: "https://i.postimg.cc/s1RPV6FP/CRUNCHYROLL.png",
    bgColor: "#FF5C00",
    textColor: "white",
    status: "online" as const,
    category: "Streaming"
  },
  {
    id: 40,
    title: "Paramount+",
    logoImage: "https://i.postimg.cc/PpMCfMZK/PARAMOUNT.png",
    bgColor: "#0075FF",
    textColor: "white",
    status: "online" as const,
    category: "Streaming"
  },
  
  // Diversos
  {
    id: 21,
    title: "CliCopy",
    logoImage: "https://i.postimg.cc/7JVZDPFR/CLICOPY.png",
    bgColor: "#101D0F",
    textColor: "white",
    status: "offline" as const,
    category: "Diversos"
  },
  {
    id: 8,
    title: "FreeLaHub",
    logoImage: "https://i.postimg.cc/BPq12zsd/FREELAHUB.png",
    bgColor: "#F5F9FF",
    textColor: "black",
    status: "online" as const,
    category: "Diversos"
  },
  {
    id: 41,
    title: "BlackRat",
    logoImage: "https://i.postimg.cc/HJgWJyTN/BLACKHAT.png",
    bgColor: "#1c1c1c",
    textColor: "white",
    status: "online" as const,
    category: "Diversos"
  }
];

const MemberArea = () => {
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [username, setUsername] = useState("Usuário");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState(toolsData);
  const navigate = useNavigate();
  const { user } = useAuth();

  const predefinedAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956"
  ];

  useEffect(() => {
    // Carregar preferências do usuário
    const userName = user?.user_metadata?.username || localStorage.getItem("username");
    if (userName) {
      setUsername(userName);
    }

    const savedAvatar = localStorage.getItem("selectedAvatar");
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
    } else if (predefinedAvatars.length > 0) {
      setSelectedAvatar(predefinedAvatars[0]);
    }
  }, [user]);

  // Função para lidar com a pesquisa
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query) {
      setFilteredTools(toolsData);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = toolsData.filter(tool => 
      tool.title.toLowerCase().includes(lowerQuery) || 
      tool.category.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredTools(filtered);
  };

  const handleAvatarChange = (avatar: string) => {
    setSelectedAvatar(avatar);
    localStorage.setItem("selectedAvatar", avatar);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    localStorage.setItem("username", e.target.value);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Barra Lateral */}
      <Sidebar onShowProfileDialog={() => setShowProfileDialog(true)} />
      
      {/* Conteúdo Principal */}
      <main className="md:ml-64 min-h-screen">
        {/* Seção de Anúncios em Vídeo */}
        <section className="py-8 px-4 bg-[#0E0E12] backdrop-blur-md">
          <div className="container mx-auto max-w-[1300px]">
            <h2 className="text-2xl font-bold mb-6">Anúncios e Novidades</h2>
            <VideoCarousel className="mb-4" />
          </div>
        </section>
        
        {/* Barra de Pesquisa */}
        <section className="py-6 px-4">
          <div className="container mx-auto max-w-[1300px]">
            <Search 
              onSearch={handleSearch}
              placeholder="Pesquisar ferramenta..."
              className="max-w-md mx-auto md:mx-0"
            />
          </div>
        </section>
        
        {/* Seção de Ferramentas */}
        <ToolsSection 
          title="Catálogo de Acesso"
          tools={filteredTools}
        />
        
        {/* Rodapé */}
        <Footer />
      </main>
      
      {/* Dialog de Perfil */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="bg-zinc-900 border border-zinc-800 text-white max-w-md">
          <DialogTitle className="text-xl font-medium">Perfil do Usuário</DialogTitle>
          <div className="flex flex-col items-center mt-4">
            <Avatar className="h-24 w-24 rounded-full">
              <AvatarImage src={selectedAvatar} alt="Profile" />
              <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="mt-4 w-full">
              <label className="text-sm text-zinc-400 block mb-1">Nome de Usuário</label>
              <input 
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div className="mt-6 w-full">
              <label className="text-sm text-zinc-400 block mb-2">Escolher Avatar</label>
              <div className="grid grid-cols-3 gap-3">
                {predefinedAvatars.map((avatar, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded-full p-1 transition-all ${
                      selectedAvatar === avatar ? 'ring-2 ring-purple-500' : 'hover:bg-zinc-800'
                    }`}
                    onClick={() => handleAvatarChange(avatar)}
                  >
                    <Avatar>
                      <AvatarImage src={avatar} alt={`Avatar ${index + 1}`} />
                      <AvatarFallback>{index + 1}</AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              className="mt-6 bg-[#9333EA] hover:bg-[#A855F7] w-full"
              onClick={() => setShowProfileDialog(false)}
            >
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemberArea;
