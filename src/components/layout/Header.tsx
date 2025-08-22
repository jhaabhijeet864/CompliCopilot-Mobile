import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export interface HeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  variant?: 'default' | 'transparent';
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  variant = 'default',
  style,
}) => {
  return (
    <View style={[styles.container, styles[variant], style]}>
      <View style={styles.leftSection}>
        {leftIcon && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onLeftPress}
            activeOpacity={0.7}
          >
            {leftIcon}
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.centerSection}>
        <Text style={[styles.title, styles[`${variant}Title`]]}>
          {title}
        </Text>
      </View>
      
      <View style={styles.rightSection}>
        {rightIcon && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRightPress}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  
  default: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  
  transparent: {
    backgroundColor: 'transparent',
  },
  
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },
  
  defaultTitle: {
    color: colors.text,
  },
  
  transparentTitle: {
    color: colors.text,
  },
  
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
});
