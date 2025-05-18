import React, { useState, useEffect } from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/member/Footer";

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  
  const predefinedAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956"
  ];
  
  useEffect(() => {
    if (user) {
      // Carregar dados do usuário
      setEmail(user.email || "");
      
      // Carregar nome de usuário
      const userName = user.user_metadata?.username || localStorage.getItem("username") || "";
      setUsername(userName);
      
      // Carregar avatar
      const savedAvatar = localStorage.getItem("selectedAvatar") || "";
      setSelectedAvatar(savedAvatar);
    }
  }, [user]);
  
  const handleAvatarChange = (avatar: string) => {
    setSelectedAvatar(avatar);
  };
  
  const handleProfileUpdate = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Atualizar metadados do usuário no Supabase
      const { error } = await supabase.auth.updateUser({
        data: { username }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Salvar no localStorage também para redundância
      localStorage.setItem("username", username);
      localStorage.setItem("selectedAvatar", selectedAvatar);
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações de perfil foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: error.message || "Ocorreu um erro ao atualizar seu perfil.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordChange = async () => {
    if (!user) return;
    
    // Validar senhas
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Senhas não coincidem",
        description: "A nova senha e a confirmação devem ser iguais.",
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Atualizar senha no Supabase
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Limpar campos de senha
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar senha",
        description: error.message || "Ocorreu um erro ao atualizar sua senha.",
      });
    } finally {
      setIsLoading(false);
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
            <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
            <p className="text-zinc-400">
              Gerencie suas informações pessoais e preferências
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna da Esquerda - Avatar e Informações Básicas */}
            <div>
              <Card className="bg-zinc-900/80 backdrop-blur-md border-zinc-800 overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-6">
                    <AvatarImage src={selectedAvatar} alt={username} />
                    <AvatarFallback className="bg-zinc-800 text-white text-2xl">
                      {username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-semibold mb-1">{username}</h2>
                  <p className="text-zinc-400 mb-4">{email}</p>
                  
                  <div className="w-full mt-4">
                    <h3 className="text-sm text-zinc-400 mb-2">Membro desde</h3>
                    <p className="text-white">
                      {user?.created_at 
                        ? new Date(user.created_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })
                        : 'Data não disponível'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Coluna da Direita - Abas de Configurações */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="bg-zinc-900 border-b border-zinc-800 w-full justify-start rounded-none p-0">
                  <TabsTrigger 
                    value="profile" 
                    className={`px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#A259FF] data-[state=active]:text-white data-[state=active]:bg-transparent ${activeTab === 'profile' ? 'text-white' : 'text-gray-400'}`}
                  >
                    Perfil
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className={`px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#A259FF] data-[state=active]:text-white data-[state=active]:bg-transparent ${activeTab === 'security' ? 'text-white' : 'text-gray-400'}`}
                  >
                    Segurança
                  </TabsTrigger>
                  <TabsTrigger 
                    value="preferences" 
                    className={`px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#A259FF] data-[state=active]:text-white data-[state=active]:bg-transparent ${activeTab === 'preferences' ? 'text-white' : 'text-gray-400'}`}
                  >
                    Preferências
                  </TabsTrigger>
                </TabsList>
                
                {/* Aba de Perfil */}
                <TabsContent value="profile" className="pt-6">
                  <Card className="bg-zinc-900/80 backdrop-blur-md border-zinc-800">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Informações Pessoais</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-zinc-400 block mb-1">Nome de Usuário</label>
                            <Input 
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              className="bg-zinc-800 border-zinc-700 text-white focus:border-[#A259FF]"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm text-zinc-400 block mb-1">Email</label>
                            <Input 
                              type="email"
                              value={email}
                              disabled
                              className="bg-zinc-800 border-zinc-700 text-zinc-400 cursor-not-allowed"
                            />
                            <p className="text-xs text-zinc-500 mt-1">O email não pode ser alterado</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Avatar</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                          {predefinedAvatars.map((avatar, index) => (
                            <div 
                              key={index}
                              className={`cursor-pointer rounded-full p-1 transition-all ${
                                selectedAvatar === avatar ? 'ring-2 ring-[#A259FF]' : 'hover:bg-zinc-800'
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
                      
                      <div className="pt-4 flex justify-end">
                        <Button 
                          className="bg-[#A259FF] hover:bg-[#C084FC]"
                          onClick={handleProfileUpdate}
                          disabled={isLoading}
                        >
                          {isLoading ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Aba de Segurança */}
                <TabsContent value="security" className="pt-6">
                  <Card className="bg-zinc-900/80 backdrop-blur-md border-zinc-800">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Alterar Senha</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-zinc-400 block mb-1">Senha Atual</label>
                            <Input 
                              type="password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="bg-zinc-800 border-zinc-700 text-white focus:border-[#A259FF]"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm text-zinc-400 block mb-1">Nova Senha</label>
                            <Input 
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="bg-zinc-800 border-zinc-700 text-white focus:border-[#A259FF]"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm text-zinc-400 block mb-1">Confirmar Nova Senha</label>
                            <Input 
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="bg-zinc-800 border-zinc-700 text-white focus:border-[#A259FF]"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button 
                          className="bg-[#A259FF] hover:bg-[#C084FC]"
                          onClick={handlePasswordChange}
                          disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
                        >
                          {isLoading ? "Atualizando..." : "Atualizar Senha"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Aba de Preferências */}
                <TabsContent value="preferences" className="pt-6">
                  <Card className="bg-zinc-900/80 backdrop-blur-md border-zinc-800">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Preferências de Interface</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Modo Escuro</p>
                              <p className="text-sm text-zinc-400">A interface sempre usará o tema escuro</p>
                            </div>
                            <div className="w-12 h-6 bg-zinc-700 rounded-full relative">
                              <div className="absolute left-0 top-0 w-6 h-6 bg-[#A259FF] rounded-full"></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Animações</p>
                              <p className="text-sm text-zinc-400">Ativar animações na interface</p>
                            </div>
                            <div className="w-12 h-6 bg-zinc-700 rounded-full relative">
                              <div className="absolute left-0 top-0 w-6 h-6 bg-[#A259FF] rounded-full"></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Notificações</p>
                              <p className="text-sm text-zinc-400">Receber notificações do sistema</p>
                            </div>
                            <div className="w-12 h-6 bg-zinc-700 rounded-full relative">
                              <div className="absolute left-6 top-0 w-6 h-6 bg-[#A259FF] rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button 
                          className="bg-[#A259FF] hover:bg-[#C084FC]"
                        >
                          Salvar Preferências
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Rodapé */}
        <Footer />
      </main>
    </div>
  );
};

export default ProfilePage;
