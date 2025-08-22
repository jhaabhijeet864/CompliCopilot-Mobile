import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useReceiptStore } from '../../../store/receiptStore';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { Button } from '../../../components/common/Button';
import { useCameraPermission } from '../hooks/useCameraPermission';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

export const CaptureScreen: React.FC = () => {
  const navigation = useNavigation();
  const { addReceipt } = useReceiptStore();
  const { hasPermission, requestPermission, showPermissionAlert } = useCameraPermission();
  
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = async () => {
    if (!hasPermission) {
      const granted = await requestPermission();
      if (!granted) {
        showPermissionAlert();
        return;
      }
    }

    setIsCapturing(true);
    
    try {
      // In a real app, you'd use react-native-camera here
      // For now, we'll simulate capturing an image
      setTimeout(() => {
        const mockImageUri = 'mock-receipt-image-uri';
        setCapturedImage(mockImageUri);
        setIsCapturing(false);
      }, 2000);
    } catch (error) {
      setIsCapturing(false);
      Alert.alert('Error', 'Failed to capture image. Please try again.');
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleProcess = async () => {
    if (!capturedImage) return;

    try {
      // Create a mock receipt
      const mockReceipt = {
        id: Date.now().toString(),
        userId: '1',
        imageUrl: capturedImage,
        merchantName: 'Sample Store',
        totalAmount: 25.99,
        currency: 'USD',
        date: new Date().toISOString(),
        category: 'Food & Dining',
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addReceipt(mockReceipt);
      
      // Navigate to processing screen
      // navigation.navigate('Processing', { receiptId: mockReceipt.id });
      
      Alert.alert('Success', 'Receipt captured successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to process receipt. Please try again.');
    }
  };

  const handleGalleryPick = () => {
    Alert.alert('Gallery', 'Gallery picker is not implemented yet.');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Capture Receipt</Text>
          <Text style={styles.subtitle}>
            Take a clear photo of your receipt for processing
          </Text>
        </View>

        <View style={styles.cameraContainer}>
          {capturedImage ? (
            <View style={styles.previewContainer}>
              <Image
                source={{ uri: capturedImage }}
                style={styles.previewImage}
                resizeMode="contain"
              />
              <View style={styles.previewOverlay}>
                <Text style={styles.previewText}>Receipt Captured</Text>
              </View>
            </View>
          ) : (
            <View style={styles.cameraPlaceholder}>
              <View style={styles.cameraIcon}>
                <Text style={styles.cameraIconText}>📷</Text>
              </View>
              <Text style={styles.cameraPlaceholderText}>
                Position your receipt within the frame
              </Text>
            </View>
          )}
        </View>

        <View style={styles.controls}>
          {!capturedImage ? (
            <>
              <Button
                title={isCapturing ? 'Capturing...' : 'Capture Receipt'}
                onPress={handleCapture}
                loading={isCapturing}
                fullWidth
                style={styles.captureButton}
              />
              
              <Button
                title="Choose from Gallery"
                onPress={handleGalleryPick}
                variant="outline"
                fullWidth
                style={styles.galleryButton}
              />
            </>
          ) : (
            <>
              <Button
                title="Process Receipt"
                onPress={handleProcess}
                fullWidth
                style={styles.processButton}
              />
              
              <Button
                title="Retake Photo"
                onPress={handleRetake}
                variant="outline"
                fullWidth
                style={styles.retakeButton}
              />
            </>
          )}
        </View>

        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>Tips for best results:</Text>
          <Text style={styles.tipText}>• Ensure good lighting</Text>
          <Text style={styles.tipText}>• Keep the receipt flat and in focus</Text>
          <Text style={styles.tipText}>• Include the entire receipt in the frame</Text>
          <Text style={styles.tipText}>• Avoid shadows and glare</Text>
        </View>
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
    marginBottom: 32,
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
  
  cameraContainer: {
    flex: 1,
    backgroundColor: colors.gray[100],
    borderRadius: 16,
    marginBottom: 32,
    overflow: 'hidden',
  },
  
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  
  cameraIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  cameraIconText: {
    fontSize: 40,
  },
  
  cameraPlaceholderText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  
  previewImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  previewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.overlay,
    padding: 16,
  },
  
  previewText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
    textAlign: 'center',
  },
  
  controls: {
    marginBottom: 32,
  },
  
  captureButton: {
    marginBottom: 16,
  },
  
  galleryButton: {
    marginBottom: 16,
  },
  
  processButton: {
    marginBottom: 16,
  },
  
  retakeButton: {
    marginBottom: 16,
  },
  
  tips: {
    backgroundColor: colors.gray[50],
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  
  tipsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: 12,
  },
  
  tipText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 4,
    lineHeight: 20,
  },
});
