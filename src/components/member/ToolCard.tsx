import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export interface ToolCardProps {
  id: number;
  title: string;
  logoImage: string;
  bgColor: string;
  textColor: string;
  status: "online" | "maintenance" | "offline";
  category: string;
}

const ToolCard = ({ id, title, logoImage, bgColor, textColor, status, category }: ToolCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  // Check if this tool is in favorites on component mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(savedFavorites.includes(id));
  }, [id]);
  
  const getStatusInfo = () => {
    switch(status) {
      case "online":
        return { color: "bg-green-500", label: "Ativa" };
      case "maintenance":
        return { color: "bg-yellow-500", label: "Em Manutenção" };
      case "offline":
        return { color: "bg-red-500", label: "Offline" };
      default:
        return { color: "bg-gray-500", label: "Desconhecido" };
    }
  };
  
  const statusInfo = getStatusInfo();
  
  // Toggle favorite status
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    
    // Save to localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (newFavoriteState) {
      localStorage.setItem('favorites', JSON.stringify([...savedFavorites, id]));
    } else {
      localStorage.setItem('favorites', JSON.stringify(savedFavorites.filter((favId: number) => favId !== id)));
    }
  };
  
  return (
    <div 
      className="relative rounded-lg overflow-hidden h-[110px] cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/10"
      style={{ backgroundColor: bgColor || "#1E1E1E" }}
      onClick={() => navigate(`/ferramenta/${id}`)}
    >
      {/* Favorite button */}
      <button
        className="absolute top-3 left-3 z-20"
        onClick={toggleFavorite}
      >
        <Heart 
          className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white/70'} transition-colors`}
        />
      </button>
      
      {/* Status indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        <div className={`h-2 w-2 rounded-full ${statusInfo.color}`}></div>
        <span className={`text-xs font-medium ${textColor === 'white' ? 'text-white' : 'text-black'} opacity-80`}>
          {statusInfo.label}
        </span>
      </div>
      
      {/* Card layout */}
      <div className="flex h-full">
        {/* Logo side */}
        <div className="w-1/3 flex items-center justify-center p-3 border-r border-white/10">
          {logoImage && !logoError ? (
            <img 
              src={logoImage} 
              alt={title} 
              className="max-w-[85%] max-h-[85%] object-contain" 
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className={`text-4xl font-bold flex items-center justify-center ${textColor === 'white' ? 'text-white' : 'text-black'}`}>
              {title.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Content side */}
        <div className="w-2/3 flex flex-col justify-center p-4">
          <h3 className={`text-lg font-bold ${textColor === 'white' ? 'text-white' : 'text-black'} line-clamp-1`}>
            {title}
          </h3>
          
          <div className={`text-xs mt-1 ${textColor === 'white' ? 'text-white/70' : 'text-black/70'}`}>
            {category}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
