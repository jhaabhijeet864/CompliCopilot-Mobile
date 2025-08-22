import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { Button } from '../../../components/common/Button';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

export const ProcessingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);

  const processingSteps = [
    'Analyzing receipt image...',
    'Extracting text data...',
    'Identifying merchant details...',
    'Calculating totals...',
    'Categorizing expenses...',
    'Finalizing data...',
  ];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsProcessing(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      if (currentStep < processingSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 2000);

    return () => clearInterval(stepInterval);
  }, [currentStep, processingSteps.length]);

  const handleViewResults = () => {
    // Navigate to results screen
    // navigation.navigate('Result');
    Alert.alert('Results', 'Navigate to results screen');
  };

  const handleCaptureAnother = () => {
    // Navigate back to capture screen
    // navigation.navigate('Capture');
    Alert.alert('Capture', 'Navigate to capture screen');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Processing Receipt</Text>
          <Text style={styles.subtitle}>
            We're extracting data from your receipt
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>

        <View style={styles.stepsContainer}>
          <Text style={styles.stepsTitle}>Current Step:</Text>
          <Text style={styles.currentStep}>
            {processingSteps[currentStep]}
          </Text>
          
          <View style={styles.stepsList}>
            {processingSteps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepIndicator,
                    index <= currentStep && styles.stepCompleted,
                  ]}
                >
                  {index < currentStep ? (
                    <Text style={styles.stepCheck}>✓</Text>
                  ) : (
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.stepText,
                    index <= currentStep && styles.stepTextCompleted,
                  ]}
                >
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {!isProcessing && (
          <View style={styles.completionContainer}>
            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✓</Text>
            </View>
            <Text style={styles.completionTitle}>Processing Complete!</Text>
            <Text style={styles.completionSubtitle}>
              Your receipt has been successfully processed and data extracted.
            </Text>
            
            <View style={styles.actionButtons}>
              <Button
                title="View Results"
                onPress={handleViewResults}
                fullWidth
                style={styles.viewResultsButton}
              />
              
              <Button
                title="Capture Another Receipt"
                onPress={handleCaptureAnother}
                variant="outline"
                fullWidth
                style={styles.captureAnotherButton}
              />
            </View>
          </View>
        )}

        {isProcessing && (
          <View style={styles.processingInfo}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.processingInfoText}>
              This usually takes 10-30 seconds
            </Text>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  
  progressContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  
  progressText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  
  stepsContainer: {
    marginBottom: 40,
  },
  
  stepsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: 16,
  },
  
  currentStep: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    marginBottom: 24,
    textAlign: 'center',
  },
  
  stepsList: {
    gap: 16,
  },
  
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  stepCompleted: {
    backgroundColor: colors.success,
  },
  
  stepNumber: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.gray[600],
  },
  
  stepCheck: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  
  stepText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    flex: 1,
  },
  
  stepTextCompleted: {
    color: colors.text,
    fontWeight: typography.fontWeight.medium,
  },
  
  completionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  
  successIconText: {
    fontSize: 40,
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  
  completionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  
  completionSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  
  actionButtons: {
    width: '100%',
  },
  
  viewResultsButton: {
    marginBottom: 16,
  },
  
  captureAnotherButton: {
    marginBottom: 16,
  },
  
  processingInfo: {
    alignItems: 'center',
  },
  
  processingInfoText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 16,
    textAlign: 'center',
  },
});
