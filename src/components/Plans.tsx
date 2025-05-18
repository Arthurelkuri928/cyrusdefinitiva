import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
const plans = [{
  name: "Start",
  color: "#E91E63",
  price: 97.00,
  features: {
    alunos: "1.000",
    produtos: "50",
    cursos: "120",
    aulas: "200",
    vendas: "400",
    afiliados: "500",
    administradores: "3",
    integrações: "10",
    certificações: "1",
    videoconferência: "1",
    app: "✓",
    checkout: "✓"
  }
}, {
  name: "Starter",
  color: "#E91E63",
  price: 197.00,
  features: {
    alunos: "5.000",
    produtos: "100",
    cursos: "200",
    aulas: "400",
    vendas: "800",
    afiliados: "1.000",
    administradores: "10",
    integrações: "20",
    certificações: "3",
    videoconferência: "3",
    app: "✓",
    checkout: "✓"
  }
}, {
  name: "Professional",
  color: "#E91E63",
  price: 497.00,
  popular: true,
  features: {
    alunos: "10.000",
    produtos: "300",
    cursos: "500",
    aulas: "1.000",
    vendas: "2.000",
    afiliados: "3.000",
    administradores: "20",
    integrações: "30",
    certificações: "10",
    videoconferência: "10",
    app: "✓",
    checkout: "✓"
  }
}, {
  name: "Enterprise",
  color: "#E91E63",
  price: 997.00,
  features: {
    alunos: "50.000",
    produtos: "500",
    cursos: "1.000",
    aulas: "5.000",
    vendas: "10.000",
    afiliados: "5.000",
    administradores: "30",
    integrações: "40",
    certificações: "30",
    videoconferência: "30",
    app: "✓",
    checkout: "✓"
  }
}, {
  name: "Business",
  color: "#E91E63",
  price: 1.997,
  features: {
    alunos: "100.000",
    produtos: "1.000",
    cursos: "2.000",
    aulas: "10.000",
    vendas: "20.000",
    afiliados: "10.000",
    administradores: "50",
    integrações: "40",
    certificações: "50",
    videoconferência: "50",
    app: "✓",
    checkout: "✓"
  }
}, {
  name: "Personalizado",
  color: "#E91E63",
  price: 3.997,
  features: {
    alunos: "Ilimitado",
    produtos: "5.000",
    cursos: "5.000",
    aulas: "20.000",
    vendas: "50.000",
    afiliados: "20.000",
    administradores: "100",
    integrações: "40",
    certificações: "100",
    videoconferência: "100",
    app: "✓",
    checkout: "✓"
  }
}];

// Features para mostrar na tabela
const featuresOrder = [{
  key: "alunos",
  label: "Alunos"
}, {
  key: "produtos",
  label: "Produtos"
}, {
  key: "cursos",
  label: "Cursos"
}, {
  key: "aulas",
  label: "Aulas"
}, {
  key: "vendas",
  label: "Vendas"
}, {
  key: "afiliados",
  label: "Afiliados"
}, {
  key: "administradores",
  label: "Administradores"
}, {
  key: "integrações",
  label: "Integrações"
}, {
  key: "certificações",
  label: "Certificações"
}, {
  key: "videoconferência",
  label: "VideoConferência"
}, {
  key: "app",
  label: "App Native"
}, {
  key: "checkout",
  label: "Checkout"
}];
const Plans = () => {
  return <div id="recursos" className="bg-[#111] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Planos</h2>
        <p className="text-gray-400 mb-8">Confira os nossos planos</p>

        <div className="min-w-[1000px]">
          <div className="grid grid-cols-7 gap-2">
            {/* Header - Features column */}
            <div className="bg-[#1A1A1A] rounded-lg p-4">
              <div className="h-24 flex items-end">
                <p className="text-gray-400 font-medium text-sm">Features</p>
              </div>
              
              {featuresOrder.map(feature => <div key={feature.key} className="py-3 border-t border-gray-800 flex items-center">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-primary rounded-md flex items-center justify-center mr-2">
                      <span className="text-xs text-white font-bold">{feature.key.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="text-gray-300 text-sm">{feature.label}</span>
                  </div>
                </div>)}
            </div>

            {/* Plan columns */}
            {plans.map((plan, index) => <div key={index} className={`bg-[#1A1A1A] rounded-lg p-4 relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular}
                
                <div className="h-24 flex flex-col justify-between">
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">{plan.name}</p>
                    <p className="text-gray-400 text-sm">Plano</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-xl">
                      <span className="text-sm">R$</span> {plan.price.toFixed(2)}
                    </p>
                    <p className="text-gray-400 text-xs">pagamento mensal</p>
                  </div>
                </div>

                {featuresOrder.map(feature => <div key={feature.key} className="py-3 border-t border-gray-800 text-center">
                    <span className="text-gray-300 text-sm">
                      {typeof plan.features[feature.key as keyof typeof plan.features] === "string" ? plan.features[feature.key as keyof typeof plan.features] === "✓" ? <Check className="inline-block w-4 h-4 text-green-500" /> : plan.features[feature.key as keyof typeof plan.features] : <X className="inline-block w-4 h-4 text-red-500" />}
                    </span>
                  </div>)}

                <div className="mt-4">
                  <Button className="w-full bg-primary hover:bg-primary/80 text-white" asChild>
                    <Link to="/entrar">Começar Teste</Link>
                  </Button>
                </div>
              </div>)}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-6">Todos os nossos planos oferecem:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-6 relative">
              <div className="absolute -top-3 -left-3 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Acesso Imediato</h4>
              <p className="text-gray-400 text-sm">Comece a usar a plataforma instantaneamente após o cadastro, sem demora para configuração.</p>
            </div>
            
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-6 relative">
              <div className="absolute -top-3 -left-3 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Domínios personalizados</h4>
              <p className="text-gray-400 text-sm">Use seu próprio domínio para seus cursos e área de membros para uma experiência mais profissional.</p>
            </div>
            
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-6 relative">
              <div className="absolute -top-3 -left-3 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Upload ilimitado de anexos</h4>
              <p className="text-gray-400 text-sm">Compartilhe arquivos de qualquer tamanho com seus alunos sem limitações de espaço.</p>
            </div>
            
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-6 relative">
              <div className="absolute -top-3 -left-3 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                4
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Integração com apps e gateways de pagamento</h4>
              <p className="text-gray-400 text-sm">Conecte-se facilmente com múltiplas opções de pagamento para vender seus cursos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Plans;