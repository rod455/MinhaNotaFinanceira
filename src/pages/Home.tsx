import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Zap, Download, ChevronDown } from "lucide-react";
import { Link } from "wouter";

/**
 * Design Philosophy: Minimalismo Moderno com Foco em Confiança
 * - Azul profundo (#1e3a8a) para transmitir segurança
 * - Tipografia clara com hierarquia forte
 * - Espaço em branco generoso
 * - Ícones para quebrar monotonia visual
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-lg font-bold text-primary">Minha Nota Financeira</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Recursos
              </a>
              <a href="#security" className="text-sm font-medium hover:text-primary transition-colors">
                Segurança
              </a>
              <Link href="/privacy" className="text-sm font-medium hover:text-primary transition-colors">
                Privacidade
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-900 text-white py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
              <span className="text-sm font-semibold">Descubra sua nota financeira em 60 segundos</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Sua Saúde Financeira em Números
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
              Minha Nota Financeira é um diagnóstico rápido que te dá uma nota de 0 a 100 baseada em 5 perguntas simples. Sem cadastro, sem dados bancários, 100% gratuito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-semibold"
                asChild
              >
                <a href="https://play.google.com/store/apps/details?id=com.appfactory.minhanotafinanceira" target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  Baixar na Play Store
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Saiba Mais
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-secondary/50">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Como Funciona</h2>
            <p className="text-lg text-muted-foreground">
              Em 5 passos simples, você descobre sua nota financeira e recebe um plano de ação personalizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { number: "1", title: "Responda", desc: "5 perguntas sobre sua situação financeira" },
              { number: "2", title: "Calcule", desc: "Sua nota é calculada em tempo real" },
              { number: "3", title: "Visualize", desc: "Veja seu resultado em gráficos claros" },
              { number: "4", title: "Planeje", desc: "Receba dicas personalizadas para melhorar" },
              { number: "5", title: "Compartilhe", desc: "Desafie amigos e compare resultados" },
            ].map((step, idx) => (
              <div key={idx} className="relative fade-in">
                <div className="bg-white rounded-lg p-6 border border-border h-full">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Segurança & Privacidade</h2>
            <p className="text-lg text-muted-foreground">
              Seus dados são sua responsabilidade. Por isso, protegemos sua privacidade desde o início.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary/50 rounded-lg p-8 border border-border fade-in">
              <Lock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Dados Locais</h3>
              <p className="text-muted-foreground">
                Suas respostas ficam apenas no seu dispositivo. Nunca enviamos seus dados para nossos servidores.
              </p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-8 border border-border fade-in">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Sem Cadastro</h3>
              <p className="text-muted-foreground">
                Não pedimos email, CPF ou qualquer dado pessoal. Use o app completamente anônimo.
              </p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-8 border border-border fade-in">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Controle Total</h3>
              <p className="text-muted-foreground">
                Você controla seus dados. Pode deletar tudo a qualquer momento com um toque.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-primary text-white rounded-lg p-8 md:p-12">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold mb-4">Conformidade Legal</h3>
              <p className="text-blue-100 mb-6">
                O Minha Nota Financeira está em conformidade com as principais regulações de proteção de dados:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm font-semibold">LGPD</p>
                  <p className="text-xs text-blue-200">Brasil</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">GDPR</p>
                  <p className="text-xs text-blue-200">Europa</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">Play Store</p>
                  <p className="text-xs text-blue-200">Políticas</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">App Store</p>
                  <p className="text-xs text-blue-200">Políticas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary/50 py-16 md:py-24 border-t border-border">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Descobrir Sua Nota?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Leva menos de 1 minuto. Sem cadastro. Sem dados bancários. 100% gratuito.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold"
              asChild
            >
              <a href="https://play.google.com/store/apps/details?id=com.appfactory.minhanotafinanceira" target="_blank" rel="noopener noreferrer">
                <Download className="w-5 h-5 mr-2" />
                Baixar Agora
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Legal Links Section */}
      <section className="py-12 border-t border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-secondary/50 rounded-lg p-6 border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Política de Privacidade
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Conheça como protegemos seus dados e como você pode controlar suas informações.
                </p>
                <Link href="/privacy" className="text-primary font-semibold hover:underline inline-flex items-center gap-2">
                  Ler Política Completa
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-secondary/50 rounded-lg p-6 border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Exclusão de Dados
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Saiba como deletar seus dados e exercer seu direito ao esquecimento.
                </p>
                <Link href="/privacy#data-deletion" className="text-primary font-semibold hover:underline inline-flex items-center gap-2">
                  Ver Instruções
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 AppFactory. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacidade</Link>
              <Link href="/privacy#data-deletion" className="hover:text-primary transition-colors">Exclusão de Dados</Link>
              <a href="mailto:contato@appfactory.com.br" className="hover:text-primary transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
