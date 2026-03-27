import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
// expo-file-system used for image save (save feature simplified for MVP)
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SPACING, BORDER_RADIUS, SCORE_ZONES, NATIONAL_AVERAGE } from '../constants/theme';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Share'>;
  route: RouteProp<RootStackParamList, 'Share'>;
};

export default function ShareScreen({ navigation, route }: Props) {
  const { score } = route.params;
  const viewShotRef = useRef<ViewShot>(null);
  const zone = SCORE_ZONES[score.zone];

  const comparedToAverage = score.total - NATIONAL_AVERAGE;

  const handleShare = async () => {
    try {
      if (!viewShotRef.current?.capture) {
        Alert.alert('Erro', 'Não foi possível gerar a imagem.');
        return;
      }

      const uri = await viewShotRef.current.capture();

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/png',
          dialogTitle: 'Compartilhar minha nota financeira',
        });
      } else {
        Alert.alert('Ops', 'Compartilhamento não disponível neste dispositivo.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar a imagem.');
    }
  };

  const handleSaveImage = async () => {
    try {
      if (!viewShotRef.current?.capture) return;

      const uri = await viewShotRef.current.capture();
      Alert.alert('Salvo!', 'Imagem capturada com sucesso. Use o botão de compartilhar para enviar.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a imagem.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <View style={styles.content}>
        <Text style={styles.headerTitle}>Compartilhe seu resultado</Text>
        <Text style={styles.headerSubtitle}>
          Desafie seus amigos a descobrir a nota deles!
        </Text>

        {/* Share Card Preview */}
        <ViewShot
          ref={viewShotRef}
          options={{ format: 'png', quality: 1 }}
          style={styles.cardContainer}
        >
          <View style={styles.card}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardLogo}>📊 Minha Nota Financeira</Text>
            </View>

            {/* Score */}
            <View style={[styles.cardScoreCircle, { borderColor: zone.color }]}>
              <Text style={[styles.cardScoreNumber, { color: zone.color }]}>
                {score.total}
              </Text>
              <Text style={styles.cardScoreMax}>/100</Text>
            </View>

            {/* Zone badge */}
            <View style={[styles.cardZoneBadge, { backgroundColor: zone.color + '30' }]}>
              <Text style={[styles.cardZoneText, { color: zone.color }]}>
                {zone.emoji} {zone.label}
              </Text>
            </View>

            {/* Phrase */}
            <Text style={styles.cardPhrase}>
              Minha nota financeira é {score.total}/100.{'\n'}E a sua?
            </Text>

            {/* Thermometer */}
            <View style={styles.cardThermometer}>
              <View
                style={[
                  styles.cardThermometerFill,
                  {
                    width: `${score.total}%`,
                    backgroundColor: zone.color,
                  },
                ]}
              />
            </View>

            {/* Comparison */}
            <Text style={styles.cardComparison}>
              {comparedToAverage >= 0
                ? `${comparedToAverage} pontos acima da média nacional`
                : `${Math.abs(comparedToAverage)} pontos abaixo da média nacional`}
            </Text>

            {/* CTA */}
            <View style={styles.cardCta}>
              <Text style={styles.cardCtaText}>
                Descubra a sua nota! 🔗
              </Text>
            </View>
          </View>
        </ViewShot>
      </View>

      {/* Share buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.whatsappButton}
          activeOpacity={0.8}
          onPress={handleShare}
        >
          <Text style={styles.whatsappButtonText}>
            💬 Compartilhar no WhatsApp
          </Text>
        </TouchableOpacity>

        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={styles.tiktokButton}
            activeOpacity={0.8}
            onPress={handleShare}
          >
            <Text style={styles.tiktokButtonText}>🎵 TikTok</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={handleSaveImage}
          >
            <Text style={styles.saveButtonText}>💾 Salvar imagem</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const CARD_WIDTH = width - SPACING.lg * 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.gray400,
    marginBottom: SPACING.lg,
  },
  cardContainer: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.navyDark,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.navyLight,
  },
  cardHeader: {
    marginBottom: SPACING.md,
  },
  cardLogo: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gold,
  },
  cardScoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    backgroundColor: COLORS.navyLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  cardScoreNumber: {
    fontSize: 44,
    fontWeight: '800',
  },
  cardScoreMax: {
    fontSize: 14,
    color: COLORS.gray500,
    fontWeight: '600',
    marginTop: -6,
  },
  cardZoneBadge: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.round,
    marginBottom: SPACING.md,
  },
  cardZoneText: {
    fontSize: 14,
    fontWeight: '700',
  },
  cardPhrase: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.md,
    lineHeight: 24,
  },
  cardThermometer: {
    width: '100%',
    height: 8,
    backgroundColor: COLORS.navyLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  cardThermometerFill: {
    height: '100%',
    borderRadius: 4,
  },
  cardComparison: {
    fontSize: 12,
    color: COLORS.gray400,
    marginBottom: SPACING.md,
  },
  cardCta: {
    backgroundColor: COLORS.gold + '20',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
  },
  cardCtaText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gold,
  },
  bottomContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.md,
    gap: SPACING.sm,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
  },
  whatsappButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  rowButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  tiktokButton: {
    flex: 1,
    backgroundColor: COLORS.gray800,
    paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
  },
  tiktokButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.navyLight,
    paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray600,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray300,
  },
  backButton: {
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    color: COLORS.gray500,
  },
});
