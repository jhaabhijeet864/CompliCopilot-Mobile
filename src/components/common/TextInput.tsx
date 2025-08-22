import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  helperStyle?: TextStyle;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  helperStyle,
  variant = 'default',
  size = 'medium',
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const inputContainerStyle = [
    styles.inputContainer,
    styles[`${variant}Container`],
    styles[`${size}Container`],
    isFocused && styles.focused,
    error && styles.error,
    containerStyle,
  ];

  const inputStyleComposed = [
    styles.input,
    styles[`${variant}Input`],
    styles[`${size}Input`],
    inputStyle,
  ];

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      
      <View style={inputContainerStyle}>
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}
        
        <RNTextInput
          style={inputStyleComposed}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={colors.gray[400]}
          {...props}
        />
        
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && (
        <Text style={[styles.errorText, errorStyle]}>
          {error}
        </Text>
      )}
      
      {helper && !error && (
        <Text style={[styles.helperText, helperStyle]}>
          {helper}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
    marginBottom: 8,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  
  // Variants
  defaultContainer: {
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  outlinedContainer: {
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  filledContainer: {
    backgroundColor: colors.gray[50],
    borderColor: colors.gray[200],
  },
  
  // Sizes
  smallContainer: {
    minHeight: 40,
    paddingHorizontal: 12,
  },
  mediumContainer: {
    minHeight: 48,
    paddingHorizontal: 16,
  },
  largeContainer: {
    minHeight: 56,
    paddingHorizontal: 20,
  },
  
  // States
  focused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  
  error: {
    borderColor: colors.error,
  },
  
  input: {
    flex: 1,
    color: colors.text,
    fontFamily: typography.fontFamily.regular,
  },
  
  defaultInput: {
    fontSize: typography.fontSize.base,
  },
  outlinedInput: {
    fontSize: typography.fontSize.base,
  },
  filledInput: {
    fontSize: typography.fontSize.base,
  },
  
  smallInput: {
    fontSize: typography.fontSize.sm,
  },
  mediumInput: {
    fontSize: typography.fontSize.base,
  },
  largeInput: {
    fontSize: typography.fontSize.lg,
  },
  
  leftIcon: {
    marginRight: 12,
  },
  
  rightIcon: {
    marginLeft: 12,
  },
  
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    marginTop: 4,
  },
  
  helperText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
