
import { CheckCircle, XCircle } from "lucide-react";

const features = [
  { 
    name: "Múltiplos gateways", 
    cyrus: true, 
    others: false 
  },
  { 
    name: "Interface unificada", 
    cyrus: true, 
    others: false 
  },
  { 
    name: "Split de pagamentos", 
    cyrus: true, 
    others: true 
  },
  { 
    name: "Gestão de assinaturas", 
    cyrus: true, 
    others: true 
  },
  { 
    name: "Checkout personalizado", 
    cyrus: true, 
    others: false 
  },
  { 
    name: "API aberta", 
    cyrus: true, 
    others: false 
  },
  { 
    name: "Relatórios unificados", 
    cyrus: true, 
    others: false 
  },
  { 
    name: "Sem taxas adicionais", 
    cyrus: true, 
    others: false 
  }
];

const ComparisonSection = () => {
  return (
    <div className="bg-[#0A0A0A] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Por que escolher a CYRUS?</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Compare nossa solução com outras plataformas do mercado e veja por que somos a melhor escolha
          </p>
        </div>
        
        <div className="relative overflow-x-auto rounded-xl border border-purple-900/20">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-[#1A1A1A] text-left py-4 px-6 text-gray-400 font-medium">Recursos</th>
                <th className="bg-[#1A1A1A] text-center py-4 px-6 text-white font-bold">
                  <span className="text-primary">CYRUS</span>
                </th>
                <th className="bg-[#1A1A1A] text-center py-4 px-6 text-gray-400 font-medium">
                  Outras plataformas
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-[#111]' : 'bg-[#191919]'}>
                  <td className="py-4 px-6 text-white">{feature.name}</td>
                  <td className="py-4 px-6 text-center">
                    {feature.cyrus ? (
                      <CheckCircle className="mx-auto h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="mx-auto h-6 w-6 text-red-500" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {feature.others ? (
                      <CheckCircle className="mx-auto h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="mx-auto h-6 w-6 text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
