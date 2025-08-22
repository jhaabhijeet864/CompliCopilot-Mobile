import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

export interface SocialButtonProps {
  title: string;
  onPress: () => void;
  provider: 'google' | 'apple' | 'facebook';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  title,
  onPress,
  provider,
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.base,
    styles[provider],
    disabled && styles.disabled,
    style,
  ];

  const textStyleComposed = [
    styles.text,
    styles[`${provider}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyleComposed}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 48,
  },
  
  // Provider-specific styles
  google: {
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  apple: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  facebook: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  
  // Text styles
  text: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
  
  googleText: {
    color: colors.text,
  },
  appleText: {
    color: colors.white,
  },
  facebookText: {
    color: colors.white,
  },
  
  disabledText: {
    color: colors.gray[400],
  },
});
