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

type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

export const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { login, isLoading, error, clearError } = useUserStore();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateForm = (): boolean => {
    let isValid = true;
    
    // Reset errors
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    
    // Validate first name
    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      isValid = false;
    }
    
    // Validate last name
    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      isValid = false;
    }
    
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
    
    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }
    
    return isValid;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    try {
      // In a real app, you'd call the API here
      // For now, we'll simulate a successful signup and login
      const mockUser = {
        id: '1',
        email,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        isEmailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      login(mockUser);
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Signup Failed', 'Please try again.');
    }
  };

  const handleSocialSignup = (provider: string) => {
    Alert.alert('Social Signup', `${provider} signup is not implemented yet.`);
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScreenWrapper scrollable keyboardAvoiding>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.nameRow}>
            <View style={styles.nameInput}>
              <TextInput
                label="First Name"
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                autoCorrect={false}
                error={firstNameError}
                onFocus={clearError}
              />
            </View>
            
            <View style={styles.nameInput}>
              <TextInput
                label="Last Name"
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                autoCorrect={false}
                error={lastNameError}
                onFocus={clearError}
              />
            </View>
          </View>

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
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={passwordError}
            onFocus={clearError}
          />

          <TextInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={confirmPasswordError}
            onFocus={clearError}
          />

          <Button
            title="Create Account"
            onPress={handleSignup}
            loading={isLoading}
            fullWidth
            style={styles.signupButton}
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
            title="Sign up with Google"
            provider="google"
            onPress={() => handleSocialSignup('Google')}
            style={styles.socialButton}
          />
          
          <SocialButton
            title="Sign up with Apple"
            provider="apple"
            onPress={() => handleSocialSignup('Apple')}
            style={styles.socialButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginText}>Sign In</Text>
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
  
  nameRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  
  nameInput: {
    flex: 1,
    marginRight: 12,
  },
  
  signupButton: {
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
  
  loginText: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});
