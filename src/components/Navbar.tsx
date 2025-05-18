
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#111]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-white text-2xl font-bold bg-gradient-to-r from-[#A259FF] to-purple-400 bg-clip-text text-transparent">CYRUS</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Início</Link>
              <Link to="/planos" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Planos</Link>
            </div>
          </div>
          
          <div className="hidden md:block space-x-2">
            {user ? (
              <Link to="/area-membro">
                <Button className="bg-primary hover:bg-primary/80 text-white font-bold">Área do Membro</Button>
              </Link>
            ) : (
              <>
                <Link to="/entrar">
                  <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">Entrar</Button>
                </Link>
                <Link to="/cadastro">
                  <Button className="bg-primary hover:bg-primary/80 text-white font-bold">Registrar</Button>
                </Link>
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
