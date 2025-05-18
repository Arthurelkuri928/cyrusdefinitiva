
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSelector from "./LanguageSelector";
import { UserRound, Search, LogOut, UserCog } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onShowProfileDialog?: () => void;
}

const Header = ({ onShowProfileDialog }: HeaderProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Usuário");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();
  
  useEffect(() => {
    // Get saved user data from localStorage or from user object
    const userName = user?.user_metadata?.username || localStorage.getItem("username") || "Usuário";
    setUsername(userName);
    
    // Check for custom avatar first, then fallback to selected avatar
    const customAvatar = localStorage.getItem("customAvatar");
    if (customAvatar) {
      setAvatarUrl(customAvatar);
    } else {
      const savedAvatar = localStorage.getItem("selectedAvatar");
      if (savedAvatar) {
        setAvatarUrl(savedAvatar);
      }
    }
  }, [user]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log(`Pesquisando por: ${searchQuery}`);
    // Clear the search field
    setSearchQuery("");
  };
  
  const handleLogout = async () => {
    await signOut();
  };
  
  return (
    <header className="bg-black border-b border-zinc-800 py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/area-membro" className="text-white font-bold text-2xl">
          CYRUS
        </Link>
        
        {/* Search Bar */}
        <div className="hidden md:flex-1 md:flex md:justify-center md:px-8 max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="w-full relative">
            <Input
              type="text"
              placeholder="Pesquisar ferramentas..."
              className="w-full bg-zinc-900 border-zinc-700 text-white pl-10 focus:border-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/area-membro" className="text-gray-400 hover:text-white transition-colors">
            Início
          </Link>
          <Link to="/ferramentas" className="text-gray-400 hover:text-white transition-colors">
            Ferramentas
          </Link>
          <Link to="/favoritos" className="text-gray-400 hover:text-white transition-colors">
            Favoritos
          </Link>
        </nav>
        
        {/* Right side - user controls */}
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          
          {/* Profile dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="bg-zinc-900 hover:bg-zinc-800 text-gray-300"
              >
                {avatarUrl ? (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={avatarUrl} alt={username} />
                    <AvatarFallback className="bg-zinc-800 text-white">{username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                ) : (
                  <UserRound className="h-5 w-5 mr-2" />
                )}
                <span className="hidden sm:inline">{username}</span>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className="bg-zinc-900 border-zinc-800 text-white">
              <DropdownMenuItem 
                className="hover:bg-zinc-800 cursor-pointer"
                onClick={() => navigate("/perfil")}
              >
                <UserCog className="mr-2 h-4 w-4" />
                <span>Editar Perfil</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-zinc-800" />
              
              <DropdownMenuItem 
                className="hover:bg-zinc-800 text-red-400 hover:text-red-300 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair da Conta</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
