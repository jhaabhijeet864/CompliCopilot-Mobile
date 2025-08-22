import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

const { width, height } = Dimensions.get('window');

export interface CameraOverlayProps {
  showGuidelines?: boolean;
  showInstructions?: boolean;
}

export const CameraOverlay: React.FC<CameraOverlayProps> = ({
  showGuidelines = true,
  showInstructions = true,
}) => {
  return (
    <View style={styles.overlay}>
      {showGuidelines && (
        <View style={styles.guidelines}>
          {/* Corner guides */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
          
          {/* Center frame */}
          <View style={styles.centerFrame}>
            <View style={styles.frameBorder} />
          </View>
        </View>
      )}
      
      {showInstructions && (
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Position receipt within the frame
          </Text>
          <Text style={styles.instructionSubtext}>
            Ensure good lighting and focus
          </Text>
        </View>
      )}
      
      {/* Bottom controls area */}
      <View style={styles.bottomArea} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  
  guidelines: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: colors.white,
    borderWidth: 3,
  },
  
  topLeft: {
    top: height * 0.2,
    left: width * 0.1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  
  topRight: {
    top: height * 0.2,
    right: width * 0.1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  
  bottomLeft: {
    bottom: height * 0.2,
    left: width * 0.1,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  
  bottomRight: {
    bottom: height * 0.2,
    right: width * 0.1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  
  centerFrame: {
    width: width * 0.8,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  frameBorder: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 8,
    opacity: 0.3,
  },
  
  instructions: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  
  instructionText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: colors.black,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  
  instructionSubtext: {
    fontSize: typography.fontSize.base,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.8,
    textShadowColor: colors.black,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  
  bottomArea: {
    height: 120,
    backgroundColor: 'transparent',
  },
});
