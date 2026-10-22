import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '../../../components/Icon';
import styles from './LoginStyle';
import { navigate, reset } from '../../../navigation/NavigationService';
import { authApi } from '../../../services/apiservices/authApi';
import { apiClient } from '../../../services/apiservices/api';
import { userStorage } from '../../../services/storage/userStorage';
import { useAppDispatch } from '../../../store/hooks';
import { setLogin } from '../../../store/slices/authSlice';
import {
  hideLoader,
  showLoader,
  showToast,
} from '../../../store/slices/viewSlice';

export default function LoginView() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setIsLoading(true);
    dispatch(showLoader({ transparent: true }));

    try {
      const response = await authApi.login({
        email: email.trim(),
        password,
      });

      if (!response.success || !response.data) {
        // navigate('Dashboard', {});
        dispatch(
          showToast({
            message: response.message || 'Login failed. Please try again.',
            type: 'error',
          }),
        );
        return;
      }

      const { token, user } = response.data;

      if (user.status && user.status !== 'active') {
        dispatch(
          showToast({
            message:
              'Your account is inactive. Please contact administrator.',
            type: 'error',
          }),
        );
        return;
      }

      await apiClient.clearToken();
      await apiClient.saveToken(token);

      dispatch(
        setLogin({
          token,
          user,
        }),
      );

      if (user.id != null) {
        await userStorage.saveUserId(user.id);
      }

      dispatch(
        showToast({
          message: response.message || 'Login successful.',
          type: 'success',
        }),
      );

      reset('Dashboard');
    } catch {
      dispatch(
        showToast({
          message: 'Login failed. Please try again.',
          type: 'error',
        }),
      );
    } finally {
      setIsLoading(false);
      dispatch(hideLoader());
    }
  };

  const onForgotPassword = () => {
    navigate('ResetPassword', {});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Login to access your CRM workspace
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>
            Email Address <Text style={styles.requiredAsterisk}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.inputField,
              emailFocused && styles.inputFocused,
              errors.email ? styles.inputError : null,
            ]}
            placeholder="Email"
            placeholderTextColor="#9BA6B7"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (errors.email) {
                setErrors(prev => ({ ...prev, email: undefined }));
              }
            }}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            editable={!isLoading}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <Text style={styles.label}>
            Password <Text style={styles.requiredAsterisk}>*</Text>
          </Text>
          <View
            style={[
              styles.passwordContainer,
              passwordFocused && styles.passwordContainerFocused,
              errors.password ? styles.passwordContainerError : null,
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#9BA6B7"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (errors.password) {
                  setErrors(prev => ({ ...prev, password: undefined }));
                }
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(prev => !prev)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Icon
                family="Ionicons"
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#9BA6B7"
              />
            </TouchableOpacity>
          </View>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.rememberMeButton}
              onPress={() => setRememberMe(v => !v)}
              activeOpacity={0.7}
            >
              <View
                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
              >
                {rememberMe ? (
                  <Text
                    style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}
                  >
                    ✓
                  </Text>
                ) : null}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7}>
              <Text style={styles.forgotText}>Reset Password</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            <Text style={styles.loginText}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.copyrightText}>
          © 2026 Tizzy Group. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}
