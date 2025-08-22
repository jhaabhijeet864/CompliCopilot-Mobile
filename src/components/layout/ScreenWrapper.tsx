import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { colors } from '../../theme/colors';

export interface ScreenWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
  safeArea?: boolean;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  style?: ViewStyle;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  backgroundColor = colors.background,
  safeArea = true,
  scrollable = false,
  keyboardAvoiding = false,
  style,
}) => {
  const containerStyle = [
    styles.container,
    { backgroundColor },
    style,
  ];

  const content = (
    <View style={styles.content}>
      {children}
    </View>
  );

  let wrappedContent = content;

  if (scrollable) {
    wrappedContent = (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {content}
      </ScrollView>
    );
  }

  if (keyboardAvoiding) {
    wrappedContent = (
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {wrappedContent}
      </KeyboardAvoidingView>
    );
  }

  if (safeArea) {
    return (
      <SafeAreaView style={containerStyle}>
        {wrappedContent}
      </SafeAreaView>
    );
  }

  return (
    <View style={containerStyle}>
      {wrappedContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  content: {
    flex: 1,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
  },
  
  keyboardAvoiding: {
    flex: 1,
  },
});
