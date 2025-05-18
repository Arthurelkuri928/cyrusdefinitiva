import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import ToolCard, { ToolCardProps } from "./ToolCard";

interface ToolsSectionProps {
  title: string;
  tools: ToolCardProps[];
  filterCategory?: string;
}

// Categories matching the reference image
const categories = [
  { id: "new", label: "Novas Ferramentas" },
  { id: "ia", label: "IA" },
  { id: "espionagem", label: "Espionagem" },
  { id: "mineracao", label: "Mineração" },
  { id: "seo", label: "SEO / Análise" },
  { id: "streaming", label: "Streaming" },
  { id: "design", label: "Design/Criação" },
  { id: "diversos", label: "Diversos" },
  { id: "offline", label: "Offline" },
  { id: "maintenance", label: "Em Manutenção" },
];

const ToolsSection = ({ title, tools, filterCategory }: ToolsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState(filterCategory || "new");
  const [filteredTools, setFilteredTools] = useState<ToolCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  // Filter tools based on category, status and search query
  useEffect(() => {
    let result: ToolCardProps[] = [];
    
    // Apply category filter
    if (activeCategory === "offline") {
      result = tools.filter(tool => tool.status === "offline");
    } else if (activeCategory === "maintenance") {
      result = tools.filter(tool => tool.status === "maintenance");
    } else if (activeCategory === "new") {
      // For new tools category, show the 8 most recent tools
      result = [...tools]
        .sort((a, b) => b.id - a.id)
        .slice(0, 8);
    } else {
      // Filter by tool category
      result = tools.filter(tool => {
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
    
    // Apply search filter if there's a query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tool => 
        tool.title.toLowerCase().includes(query) || 
        tool.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredTools(result);
  }, [activeCategory, tools, searchQuery]);
  
  // Handle category filter change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Clear search when changing categories
    if (searchQuery) {
      setSearchQuery("");
    }
  };
  
  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };
  
  return (
    <section className="px-4 py-12 bg-black">
      <div className="container mx-auto max-w-[1300px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">{title}</h2>
          
          {/* Search input */}
          <div className="relative w-full md:w-64">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar ferramenta..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearching(true)}
                className="w-full bg-zinc-900/80 border border-zinc-700 rounded-lg py-2 pl-10 pr-10 text-white focus:outline-none focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA]/30 transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
              {searchQuery && (
                <button 
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Category filters */}
        <Card className="bg-zinc-900/40 border-zinc-800 mb-8 overflow-hidden">
          <CardContent className="p-4">
            <div className="overflow-x-auto scrollbar-none">
              <div className="flex space-x-2 pb-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    className={activeCategory === category.id 
                      ? "bg-[#A259FF] hover:bg-[#C084FC] text-white whitespace-nowrap" 
                      : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:border-[#A259FF] whitespace-nowrap"
                    }
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tools grid with animation */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredTools.map((tool, index) => (
            <motion.div 
              key={tool.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ToolCard {...tool} />
            </motion.div>
          ))}
        </motion.div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/40 rounded-lg border border-zinc-800">
            <p className="text-zinc-400 text-lg">
              {searchQuery 
                ? `Nenhuma ferramenta encontrada para "${searchQuery}"`
                : "Nenhuma ferramenta encontrada nesta categoria."
              }
            </p>
            <Button 
              variant="outline" 
              className="mt-4 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              onClick={() => {
                handleCategoryChange("new");
                clearSearch();
              }}
            >
              Ver novas ferramentas
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ToolsSection;
