
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Plans from "@/components/Plans";
import Faq from "@/components/Faq";

const PlanosPage = () => {
  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Escolha o Plano Ideal para o Seu Negócio</h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Temos opções para todos os estágios do seu negócio digital. Comece com nosso teste gratuito e escale conforme seu crescimento.
            </p>
          </div>
        </div>
      </div>
      <Plans />
      <Faq />
      <Footer />
    </div>
  );
};

export default PlanosPage;
