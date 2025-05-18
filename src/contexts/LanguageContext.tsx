
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt-BR' | 'en-US' | 'es-ES';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Header
  "search": {
    "pt-BR": "Pesquisar",
    "en-US": "Search",
    "es-ES": "Buscar"
  },
  "home": {
    "pt-BR": "Início",
    "en-US": "Home",
    "es-ES": "Inicio"
  },
  "favorites": {
    "pt-BR": "Favoritos",
    "en-US": "Favorites",
    "es-ES": "Favoritos"
  },
  "myAccount": {
    "pt-BR": "Minha Conta",
    "en-US": "My Account",
    "es-ES": "Mi Cuenta"
  },
  "watch": {
    "pt-BR": "Assistir",
    "en-US": "Watch",
    "es-ES": "Ver"
  },
  "downloadExtension": {
    "pt-BR": "Baixar Extensão",
    "en-US": "Download Extension",
    "es-ES": "Descargar Extensión"
  },
  "trending": {
    "pt-BR": "Tendências",
    "en-US": "Trending Now",
    "es-ES": "Tendencias"
  },
  "movies": {
    "pt-BR": "Filmes",
    "en-US": "Movies",
    "es-ES": "Películas"
  },
  "actionMovies": {
    "pt-BR": "Filmes de Ação",
    "en-US": "Action Movies",
    "es-ES": "Películas de Acción"
  },
  "moreLikeThis": {
    "pt-BR": "Semelhantes a este",
    "en-US": "More Like This",
    "es-ES": "Similares a Este"
  },
  "castAndCrew": {
    "pt-BR": "Elenco & Equipe",
    "en-US": "Cast & Crew",
    "es-ES": "Reparto y Equipo"
  },
  "director": {
    "pt-BR": "Diretor",
    "en-US": "Director",
    "es-ES": "Director"
  },
  "cast": {
    "pt-BR": "Elenco",
    "en-US": "Cast",
    "es-ES": "Reparto"
  },
  "toolStatus": {
    "pt-BR": "Status da Ferramenta",
    "en-US": "Tool Status",
    "es-ES": "Estado de la Herramienta"
  },
  "online": {
    "pt-BR": "Online",
    "en-US": "Online",
    "es-ES": "En Línea"
  },
  "lastUpdated": {
    "pt-BR": "Última Atualização",
    "en-US": "Last Updated",
    "es-ES": "Última Actualización"
  },
  "copyCookie": {
    "pt-BR": "Copiar Cookie",
    "en-US": "Copy Cookie",
    "es-ES": "Copiar Cookie"
  },
  "whatsappSupport": {
    "pt-BR": "Suporte WhatsApp",
    "en-US": "WhatsApp Support",
    "es-ES": "Soporte WhatsApp"
  },
  "humanSupport": {
    "pt-BR": "Suporte Humano",
    "en-US": "Human Support",
    "es-ES": "Soporte Humano"
  },
  "networkGroup": {
    "pt-BR": "Grupo de Network",
    "en-US": "Network Group",
    "es-ES": "Grupo de Red"
  },
  "channel": {
    "pt-BR": "Canal",
    "en-US": "Channel",
    "es-ES": "Canal"
  },
  "manageFavorites": {
    "pt-BR": "Gerenciar Favoritos",
    "en-US": "Manage Favorites",
    "es-ES": "Administrar Favoritos"
  },
  "filters": {
    "pt-BR": "Filtros",
    "en-US": "Filters",
    "es-ES": "Filtros"
  },
  "categories": {
    "pt-BR": "Categorias",
    "en-US": "Categories",
    "es-ES": "Categorías"
  },
  "status": {
    "pt-BR": "Status",
    "en-US": "Status",
    "es-ES": "Estado"
  },
  "active": {
    "pt-BR": "Ativo",
    "en-US": "Active",
    "es-ES": "Activo"
  },
  "inactive": {
    "pt-BR": "Inativo",
    "en-US": "Inactive",
    "es-ES": "Inactivo"
  },
  "addToFavorites": {
    "pt-BR": "Adicionar aos Favoritos",
    "en-US": "Add to Favorites",
    "es-ES": "Añadir a Favoritos"
  },
  "removeFromFavorites": {
    "pt-BR": "Remover dos Favoritos",
    "en-US": "Remove from Favorites",
    "es-ES": "Eliminar de Favoritos"
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'pt-BR',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt-BR');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['pt-BR', 'en-US', 'es-ES'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
