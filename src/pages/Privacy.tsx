import { Shield, Lock, Eye, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Design Philosophy: Minimalismo Moderno com Foco em Confiança
 * - Azul profundo (#1e3a8a) para transmitir segurança
 * - Tipografia clara com hierarquia forte
 * - Espaço em branco generoso
 * - Ícones para quebrar monotonia visual
 */

export default function Privacy() {
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
              <a href="#privacy" className="text-sm font-medium hover:text-primary transition-colors">
                Privacidade
              </a>
              <a href="#data-deletion" className="text-sm font-medium hover:text-primary transition-colors">
                Exclusão de Dados
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contato
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-900 text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8" />
              <span className="text-sm font-semibold uppercase tracking-wider">Segurança & Conformidade</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Sua Privacidade é Nossa Prioridade
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Conheça como o Minha Nota Financeira protege seus dados e como você pode controlar suas informações.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-secondary/50 border-b border-border">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Transparência Total</h3>
                <p className="text-sm text-muted-foreground">Você sabe exatamente como seus dados são usados</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Dados Locais</h3>
                <p className="text-sm text-muted-foreground">Suas respostas ficam apenas no seu dispositivo</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Trash2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Controle Total</h3>
                <p className="text-sm text-muted-foreground">Você pode excluir seus dados a qualquer momento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section id="privacy" className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Política de Privacidade</h2>

          <div className="space-y-12">
            {/* 1. Dados Coletados */}
            <div className="fade-in">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</span>
                Dados Coletados
              </h3>
              <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
                <p>
                  O Minha Nota Financeira foi projetado com privacidade em mente. <strong>Não coletamos dados pessoais identificáveis</strong> como nome, CPF, email ou informações bancárias.
                </p>
                <p>
                  As respostas que você fornece no questionário (renda, gastos, dívidas, etc.) são processadas apenas no seu dispositivo e <strong>nunca são armazenadas ou enviadas para nossos servidores</strong>.
                </p>
                <div className="bg-white border-l-4 border-primary pl-4 py-2">
                  <p className="text-sm font-semibold text-primary mb-1">✓ O que NÃO coletamos:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Dados pessoais identificáveis (nome, CPF, email)</li>
                    <li>• Informações bancárias ou de contas</li>
                    <li>• Localização geográfica</li>
                    <li>• Dados de contato ou endereço</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Analytics */}
            <div className="fade-in">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</span>
                Analytics e Dados Anônimos
              </h3>
              <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
                <p>
                  Para melhorar o app, coletamos dados <strong>anônimos e agregados</strong> sobre como você usa o aplicativo, como:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Quantas pessoas completam o questionário</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Quais seções do app são mais usadas</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Tempo médio de sessão</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Nota média agregada por região (sem identificação)</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Esses dados são coletados através do Firebase Analytics e são completamente anônimos — não podemos identificar você.
                </p>
              </div>
            </div>

            {/* 3. Publicidade */}
            <div className="fade-in">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</span>
                Publicidade e Google AdMob
              </h3>
              <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
                <p>
                  O app exibe anúncios através do Google AdMob para manter o serviço gratuito. O Google pode coletar identificadores de publicidade anônimos (GAID no Android, IDFA no iOS) para:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Exibir anúncios relevantes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Medir eficácia de campanhas</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Combater fraude</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Você pode desabilitar rastreamento de publicidade nas configurações do seu dispositivo.
                </p>
              </div>
            </div>

            {/* 4. Compartilhamento */}
            <div className="fade-in">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">4</span>
                Compartilhamento de Dados
              </h3>
              <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
                <p>
                  Você tem <strong>controle total</strong> sobre o compartilhamento de seus resultados. O app permite que você compartilhe sua nota financeira via:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>WhatsApp</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Redes sociais</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Email</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Importante:</strong> Você escolhe voluntariamente compartilhar. Nunca compartilhamos seus dados sem sua permissão explícita.
                </p>
              </div>
            </div>

            {/* 5. Segurança */}
            <div className="fade-in">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">5</span>
                Segurança de Dados
              </h3>
              <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
                <p>
                  Como a maioria dos seus dados fica apenas no seu dispositivo, a segurança é sua responsabilidade. Recomendamos:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Manter seu dispositivo atualizado</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Usar senha/biometria para desbloquear</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Não compartilhar seu dispositivo com pessoas não confiáveis</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 6. Conformidade Legal */}
            <div className="fade-in">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">6</span>
                Conformidade Legal
              </h3>
              <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
                <p>
                  O Minha Nota Financeira está em conformidade com:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <span><strong>LGPD</strong> (Lei Geral de Proteção de Dados)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <span><strong>GDPR</strong> (Regulação Europeia)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <span><strong>Políticas da Play Store</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <span><strong>Políticas da App Store</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* 7. Menores de Idade */}
            <div className="fade-in">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">7</span>
                Proteção de Menores
              </h3>
              <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
                <p>
                  O Minha Nota Financeira <strong>não é direcionado a menores de 18 anos</strong>. O app contém conteúdo financeiro complexo destinado a adultos.
                </p>
                <p className="text-sm text-muted-foreground">
                  Se você é responsável por um menor que usa o app, recomendamos supervisão apropriada.
                </p>
              </div>
            </div>

            {/* 8. Alterações na Política */}
            <div className="fade-in">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">8</span>
                Alterações na Política
              </h3>
              <div className="bg-secondary/50 border border-border rounded-lg p-6 space-y-4">
                <p>
                  Podemos atualizar esta política de privacidade periodicamente. Notificaremos você sobre mudanças significativas através de:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Notificação no app</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Email (se fornecido)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Atualização desta página</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4">
                  Última atualização: 27 de março de 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Deletion Section */}
      <section id="data-deletion" className="bg-secondary/50 py-16 md:py-24 border-t border-border">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Exclusão de Dados</h2>

          <div className="space-y-8">
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <Trash2 className="w-6 h-6 text-primary" />
                Como Excluir Seus Dados
              </h3>
              <p className="text-muted-foreground mb-6">
                Como a maioria dos seus dados fica apenas no seu dispositivo, a exclusão é simples:
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-primary p-4">
                  <h4 className="font-semibold text-primary mb-2">Opção 1: Dentro do App</h4>
                  <ol className="text-sm space-y-2 text-muted-foreground">
                    <li>1. Abra o Minha Nota Financeira</li>
                    <li>2. Vá para Configurações (ícone de engrenagem)</li>
                    <li>3. Toque em "Limpar Dados Locais"</li>
                    <li>4. Confirme a exclusão</li>
                  </ol>
                </div>
                <div className="bg-blue-50 border-l-4 border-primary p-4">
                  <h4 className="font-semibold text-primary mb-2">Opção 2: Desinstalar o App</h4>
                  <p className="text-sm text-muted-foreground">
                    Todos os dados locais serão deletados automaticamente quando você desinstala o app do seu dispositivo.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Dados Agregados</h3>
              <p className="text-muted-foreground mb-4">
                Se você participou de estatísticas anônimas (nota média por região), esses dados agregados não podem ser rastreados até você e não podem ser deletados individualmente. No entanto:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Esses dados são completamente anônimos</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Não podem ser usados para identificá-lo</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>São usados apenas para melhorar o app</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Direito ao Esquecimento (LGPD)</h3>
              <p className="text-muted-foreground mb-4">
                Você tem o direito de solicitar a exclusão completa de qualquer dado pessoal que possamos ter. Para exercer esse direito:
              </p>
              <div className="bg-accent/10 border border-accent rounded-lg p-4 mt-4">
                <p className="text-sm font-semibold text-accent mb-2">Entre em contato conosco:</p>
                <a href="mailto:contato@appfactory.com.br" className="text-sm font-semibold text-primary hover:underline flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contato@appfactory.com.br
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Dúvidas sobre Privacidade?</h2>
          <div className="bg-primary text-white rounded-lg p-8 md:p-12">
            <p className="text-lg mb-6">
              Se você tem dúvidas sobre como protegemos seus dados ou deseja exercer seus direitos de privacidade, entre em contato conosco:
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-blue-100 mb-1">Email</p>
                <a href="mailto:contato@appfactory.com.br" className="text-xl font-semibold hover:text-blue-100 transition-colors">
                  contato@appfactory.com.br
                </a>
              </div>
              <div>
                <p className="text-sm text-blue-100 mb-1">Empresa</p>
                <p className="text-lg font-semibold">AppFactory</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-blue-400">
              <p className="text-sm text-blue-100 mb-4">
                Responderemos sua solicitação em até 30 dias úteis, conforme exigido pela LGPD.
              </p>
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
              <a href="#privacy" className="hover:text-primary transition-colors">Privacidade</a>
              <a href="#data-deletion" className="hover:text-primary transition-colors">Exclusão de Dados</a>
              <a href="mailto:contato@appfactory.com.br" className="hover:text-primary transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
