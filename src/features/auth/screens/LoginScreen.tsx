import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUserStore } from '../../../store/userStore';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { TextInput } from '../../../components/common/TextInput';
import { Button } from '../../../components/common/Button';
import { SocialButton } from '../components/SocialButton';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { AuthStackParamList } from '../../../navigation/AuthStack';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, isLoading, error, clearError } = useUserStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = (): boolean => {
    let isValid = true;
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    try {
      // In a real app, you'd call the API here
      // For now, we'll simulate a successful login
      const mockUser = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      login(mockUser);
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Social Login', `${provider} login is not implemented yet.`);
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality is not implemented yet.');
  };

  return (
    <ScreenWrapper scrollable keyboardAvoiding>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={emailError}
            onFocus={clearError}
          />

          <TextInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={passwordError}
            onFocus={clearError}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            fullWidth
            style={styles.loginButton}
          />

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtons}>
          <SocialButton
            title="Continue with Google"
            provider="google"
            onPress={() => handleSocialLogin('Google')}
            style={styles.socialButton}
          />
          
          <SocialButton
            title="Continue with Apple"
            provider="apple"
            onPress={() => handleSocialLogin('Apple')}
            style={styles.socialButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  form: {
    marginBottom: 32,
  },
  
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  
  forgotPasswordText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  
  loginButton: {
    marginBottom: 16,
  },
  
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    textAlign: 'center',
  },
  
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  
  dividerText: {
    marginHorizontal: 16,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  
  socialButtons: {
    marginBottom: 32,
  },
  
  socialButton: {
    marginBottom: 12,
  },
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  footerText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  
  signupText: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});
