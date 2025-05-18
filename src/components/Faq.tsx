
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "O pagamento é mensal?",
    answer: "Sim! O pagamento da plataforma é mensal e renovado automaticamente após um plano pago ser adquirido em sua conta."
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim, você pode cancelar sua assinatura a qualquer momento diretamente pela plataforma sem complicações."
  },
  {
    question: "Além da mensalidade, possui alguma taxa extra?",
    answer: "Não há taxas extras além da mensalidade. Todos os recursos incluídos no seu plano estão cobertos pelo valor mensal."
  },
  {
    question: "O que é um CLUB?",
    answer: "Um CLUB é uma área de membros personalizada onde você pode oferecer conteúdos exclusivos, cursos e recursos para seus clientes."
  },
  {
    question: "Consigo migrar meus alunos para a plataforma?",
    answer: "Sim, oferecemos ferramentas de importação que facilitam a migração de seus alunos de outras plataformas para a Astron."
  },
  {
    question: "Posso vender conteúdos separados dentro da minha área de membros/club?",
    answer: "Sim, você pode criar e vender diferentes produtos e conteúdos dentro da sua área de membros, configurando preços individuais para cada um."
  },
  {
    question: "Como funciona o suporte da Astron Members?",
    answer: "Oferecemos suporte via chat, e-mail e base de conhecimento. Para clientes de planos premium, disponibilizamos também atendimento prioritário."
  },
  {
    question: "Possui tutoriais para as configurações? É fácil de manusear?",
    answer: "Sim, temos uma ampla biblioteca de tutoriais em vídeo e documentação passo a passo que torna fácil a configuração e uso da plataforma."
  },
  {
    question: "Na Astron consigo entregar meu produto no formato de recorrência?",
    answer: "Sim, a plataforma suporta totalmente produtos com pagamento recorrente, ideal para assinaturas e membros."
  },
  {
    question: "Posso utilizar domínio próprio em minha área de membros?",
    answer: "Sim, você pode conectar seu próprio domínio à sua área de membros para uma experiência mais profissional e personalizada."
  },
  {
    question: "Posso integrar Gateways de pagamento?",
    answer: "Sim, integramos com mais de 20 gateways de pagamento como Hotmart, Monetizze, PagSeguro, Mercado Pago e muitos outros."
  },
  {
    question: "Qual o tempo de duração do plano degustação? (Período Gratuito)",
    answer: "O plano de degustação oferece 14 dias gratuitos para que você possa explorar todas as funcionalidades da plataforma antes de escolher um plano pago."
  }
];

const Faq = () => {
  return (
    <div id="faq" className="bg-[#111] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Perguntas Frequentes (FAQ)</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-800 rounded-md overflow-hidden bg-[#1A1A1A]"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-800/50 text-white font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 border-t border-gray-800 text-gray-300">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
