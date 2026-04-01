import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import AdBanner from '../components/AdBanner';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TipDetail'>;
  route: RouteProp<RootStackParamList, 'TipDetail'>;
};

const TIP_CONTENT: Record<string, { title: string; icon: string; sections: { heading: string; text: string }[]; source?: string }> = {
  serasa: {
    title: 'Como renegociar suas dívidas',
    icon: '🚨',
    sections: [
      {
        heading: 'Por que renegociar?',
        text: 'Dívidas em atraso geram juros sobre juros e podem comprometer até 30% da sua renda. Renegociar permite reduzir o valor total e parcelar em condições que cabem no bolso.',
      },
      {
        heading: 'Passo a passo',
        text: '1. Liste todas as suas dívidas (valor, credor, juros)\n2. Priorize as dívidas com maiores juros\n3. Entre em contato com cada credor e negocie descontos\n4. Peça para eliminar juros e multas — muitas empresas oferecem até 90% de desconto\n5. Prefira pagar à vista (maior desconto) ou em poucas parcelas',
      },
      {
        heading: 'Dicas importantes',
        text: '• Nunca aceite a primeira proposta — sempre peça condições melhores\n• Negocie por escrito (e-mail, chat) para ter comprovante\n• Só assuma parcelas que realmente cabem no seu orçamento\n• Após quitar, peça a carta de quitação',
      },
      {
        heading: 'Feirões de renegociação',
        text: 'Fique atento aos feirões de renegociação que acontecem regularmente. Nesses eventos, as empresas oferecem os maiores descontos do ano. Serasa, SPC e Procon costumam organizar esses eventos.',
      },
    ],
    source: 'Fonte: Serasa Limpa Nome, Procon, Banco Central do Brasil',
  },
  creditas: {
    title: 'Como organizar suas dívidas',
    icon: '💳',
    sections: [
      {
        heading: 'Entenda sua situação',
        text: 'O primeiro passo é saber exatamente quanto você deve, para quem e qual o juros de cada dívida. Anote tudo em uma planilha ou caderno.',
      },
      {
        heading: 'Método bola de neve',
        text: 'Pague o mínimo em todas as dívidas e concentre o máximo possível na dívida menor. Quando quitá-la, use esse valor para atacar a próxima. Isso gera motivação e acelera a quitação.',
      },
      {
        heading: 'Portabilidade de crédito',
        text: 'Você pode transferir sua dívida de um banco para outro com juros menores. Isso é um direito seu garantido pelo Banco Central. Pesquise taxas em pelo menos 3 bancos antes de decidir.',
      },
      {
        heading: 'Troque dívida cara por barata',
        text: '• Cartão de crédito: até 400% ao ano\n• Cheque especial: até 150% ao ano\n• Empréstimo pessoal: 30-80% ao ano\n• Consignado: 20-35% ao ano\n\nSe possível, troque dívidas caras por um empréstimo com juros menores.',
      },
    ],
    source: 'Fonte: Banco Central do Brasil, Febraban',
  },
  banco_digital: {
    title: 'Como criar sua reserva de emergência',
    icon: '🏦',
    sections: [
      {
        heading: 'O que é reserva de emergência?',
        text: 'É um dinheiro guardado para imprevistos como desemprego, doença ou consertos urgentes. O ideal é ter de 3 a 6 meses das suas despesas mensais guardados.',
      },
      {
        heading: 'Como começar',
        text: '1. Defina um valor mensal para guardar (mesmo que seja R$50)\n2. Abra uma conta separada só para a reserva\n3. Automatize a transferência no dia que receber o salário\n4. Não mexa nesse dinheiro a não ser em emergências reais',
      },
      {
        heading: 'Onde guardar?',
        text: '• CDB com liquidez diária (rende mais que poupança)\n• Tesouro Selic (investimento mais seguro do Brasil)\n• Conta remunerada de banco digital\n\nEvite poupança — ela rende menos que a inflação em muitos cenários.',
      },
      {
        heading: 'Quanto guardar por mês',
        text: 'Comece com o que puder, mesmo que seja pouco:\n• R$50/mês = R$600 em 1 ano\n• R$100/mês = R$1.200 em 1 ano\n• R$200/mês = R$2.400 em 1 ano\n\nO importante é criar o hábito. Com o tempo, aumente o valor.',
      },
    ],
    source: 'Fonte: CVM, Tesouro Nacional, Banco Central',
  },
  mobills: {
    title: 'Como controlar seus gastos',
    icon: '📊',
    sections: [
      {
        heading: 'A regra 50/30/20',
        text: '50% da renda para necessidades (aluguel, comida, transporte)\n30% para desejos (lazer, roupas, delivery)\n20% para poupança e investimentos\n\nEssa regra é um guia — adapte às suas necessidades.',
      },
      {
        heading: 'Anote tudo por 30 dias',
        text: 'O simples ato de anotar todos os gastos por 30 dias revela onde seu dinheiro está indo. Pesquisas mostram que quem anota gasta em média 20% menos.',
      },
      {
        heading: 'Identifique gastos invisíveis',
        text: '• Assinaturas que você não usa (streaming, apps, academia)\n• Compras por impulso (delivery, roupas)\n• Taxas bancárias desnecessárias\n• Juros de cartão de crédito\n\nSome esses gastos — você pode se surpreender com o total.',
      },
      {
        heading: 'Dicas práticas',
        text: '• Use dinheiro ou cartão de débito para gastos do dia a dia\n• Espere 24h antes de compras acima de R$100\n• Faça lista de compras e não saia dela\n• Cozinhe em casa — delivery pode custar 3x mais\n• Compare preços antes de comprar',
      },
    ],
    source: 'Fonte: SPC Brasil, CNDL, Banco Central',
  },
  hotmart: {
    title: 'Educação financeira gratuita',
    icon: '💡',
    sections: [
      {
        heading: 'Por que aprender sobre finanças?',
        text: 'Educação financeira não é sobre ficar rico — é sobre ter controle do seu dinheiro. Quem entende de finanças toma decisões melhores, evita dívidas e constrói patrimônio.',
      },
      {
        heading: 'Conceitos essenciais',
        text: '• Juros compostos: o "8ª maravilha do mundo" — fazem seu dinheiro crescer (ou suas dívidas explodirem)\n• Inflação: o aumento dos preços que come seu poder de compra\n• Renda fixa: investimentos mais seguros com retorno previsível\n• Diversificação: não coloque todos os ovos na mesma cesta',
      },
      {
        heading: 'Cursos gratuitos recomendados',
        text: '• Banco Central: Curso "Gestão de Finanças Pessoais" (gratuito e online)\n• CVM: "Educação Financeira para Jovens e Adultos"\n• Sebrae: Cursos de gestão financeira para empreendedores\n• B3: Cursos sobre investimentos para iniciantes\n\nTodos são gratuitos e com certificado.',
      },
      {
        heading: 'Livros acessíveis',
        text: '• "Pai Rico, Pai Pobre" — Robert Kiyosaki\n• "Me Poupe!" — Nathalia Arcuri\n• "O Homem Mais Rico da Babilônia" — George Clason\n• "Do Mil ao Milhão" — Thiago Nigro\n\nComece por um e aplique o que aprender.',
      },
    ],
    source: 'Fonte: Banco Central, CVM, B3, Sebrae',
  },
  general: {
    title: 'Planejamento financeiro de longo prazo',
    icon: '🎯',
    sections: [
      {
        heading: 'Pense no futuro',
        text: 'Com sua saúde financeira estável, é hora de pensar no longo prazo. Investir regularmente, mesmo valores pequenos, faz uma diferença enorme com o passar dos anos.',
      },
      {
        heading: 'Como começar a investir',
        text: '1. Monte sua reserva de emergência primeiro\n2. Defina seus objetivos (aposentadoria, casa, viagem)\n3. Comece pela renda fixa (Tesouro Direto, CDB)\n4. Depois diversifique (fundos, ações, FIIs)\n5. Invista todo mês, sem falta',
      },
      {
        heading: 'O poder do tempo',
        text: 'R$100/mês investidos a 10% ao ano:\n• Em 5 anos: R$7.744\n• Em 10 anos: R$20.484\n• Em 20 anos: R$72.399\n• Em 30 anos: R$217.132\n\nQuanto antes começar, melhor.',
      },
      {
        heading: 'Erros comuns',
        text: '• Esperar "sobrar" dinheiro para investir — invista primeiro\n• Investir sem reserva de emergência\n• Seguir dicas de influenciadores sem estudar\n• Vender na baixa por medo\n• Não diversificar',
      },
    ],
    source: 'Fonte: CVM, Tesouro Nacional, Anbima',
  },
};

export default function TipDetailScreen({ navigation, route }: Props) {
  const { tipKey, tipTitle } = route.params;
  const content = TIP_CONTENT[tipKey] || TIP_CONTENT.general;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>{content.icon}</Text>
          <Text style={styles.headerTitle}>{content.title}</Text>
        </View>

        {/* Sections */}
        {content.sections.map((section, index) => (
          <View key={index} style={styles.sectionCard}>
            <Text style={styles.sectionHeading}>{section.heading}</Text>
            <Text style={styles.sectionText}>{section.text}</Text>
          </View>
        ))}

        {/* Source */}
        {content.source && (
          <Text style={styles.sourceText}>{content.source}</Text>
        )}
      </ScrollView>

      {/* Back button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar ao plano de ação</Text>
        </TouchableOpacity>
      </View>

      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl + SPACING.lg,
    paddingBottom: SPACING.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: COLORS.navyLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gold,
    marginBottom: SPACING.sm,
  },
  sectionText: {
    fontSize: 14,
    color: COLORS.gray300,
    lineHeight: 22,
  },
  sourceText: {
    fontSize: 11,
    color: COLORS.gray600,
    textAlign: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
    fontStyle: 'italic',
  },
  bottomContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.sm,
  },
  backButton: {
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.gray600,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray300,
  },
});
