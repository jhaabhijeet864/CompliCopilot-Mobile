import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

export interface CameraPermissionState {
  hasPermission: boolean;
  isRequesting: boolean;
  error: string | null;
}

export const useCameraPermission = () => {
  const [permissionState, setPermissionState] = useState<CameraPermissionState>({
    hasPermission: false,
    isRequesting: false,
    error: null,
  });

  const requestPermission = async (): Promise<boolean> => {
    setPermissionState(prev => ({ ...prev, isRequesting: true, error: null }));

    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to capture receipts.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        const hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
        setPermissionState({
          hasPermission,
          isRequesting: false,
          error: hasPermission ? null : 'Camera permission denied',
        });

        return hasPermission;
      } else {
        // iOS handles camera permissions through Info.plist
        // The camera will request permission when first accessed
        setPermissionState({
          hasPermission: true,
          isRequesting: false,
          error: null,
        });
        return true;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setPermissionState({
        hasPermission: false,
        isRequesting: false,
        error: errorMessage,
      });
      return false;
    }
  };

  const checkPermission = async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        
        setPermissionState(prev => ({
          ...prev,
          hasPermission,
          error: hasPermission ? null : 'Camera permission not granted',
        }));
        
        return hasPermission;
      } else {
        // iOS: Assume permission is available (will be requested at runtime)
        setPermissionState(prev => ({
          ...prev,
          hasPermission: true,
          error: null,
        }));
        return true;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setPermissionState(prev => ({
        ...prev,
        hasPermission: false,
        error: errorMessage,
      }));
      return false;
    }
  };

  const showPermissionAlert = () => {
    Alert.alert(
      'Camera Permission Required',
      'This app needs camera access to capture receipts. Please grant camera permission in your device settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Settings', onPress: () => {
          // In a real app, you'd open device settings
          console.log('Open device settings');
        }},
      ]
    );
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return {
    ...permissionState,
    requestPermission,
    checkPermission,
    showPermissionAlert,
  };
};
