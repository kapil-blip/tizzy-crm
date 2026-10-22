import React, { useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Icon from '../../../components/Icon'
import { goBack, reset } from '../../../navigation/NavigationService'
import styles from './ResetPasswordStyle'
import { authApi } from '../../../services/apiservices/authApi'
import { useAppDispatch } from '../../../store/hooks'
import {
  hideLoader,
  showLoader,
  showToast,
} from '../../../store/slices/viewSlice'

type ResetStep = 'form' | 'token' | 'setpassword'

export default function ResetPasswordView() {
  const dispatch = useAppDispatch()

  const [step, setStep] = useState<ResetStep>('form')
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [emailFocused, setEmailFocused] = useState(false)

  const [resetToken, setResetToken] = useState('')
  const [resetTokenFocused, setResetTokenFocused] = useState(false)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordFocused, setPasswordFocused] = useState(false)
  const [confirmPasswordFocused, setConfirmPasswordFocused] =
    useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // --------------------------------------------------
  // Common values
  // --------------------------------------------------

  const hasEmailValue = email.trim().length > 0
  const isEmailActive = emailFocused || hasEmailValue

  const hasPasswordValue = password.length > 0
  const isPasswordActive =
    passwordFocused || hasPasswordValue

  const hasConfirmPasswordValue =
    confirmPassword.length > 0

  const isConfirmPasswordActive =
    confirmPasswordFocused || hasConfirmPasswordValue

  const hasResetTokenValue = resetToken.trim().length > 0
  const isResetTokenActive =
    resetTokenFocused || hasResetTokenValue

  const showMessage = (message: string, type: 'success' | 'error' = 'error') => {
    dispatch(showToast({ message, type }))
  }

  // --------------------------------------------------
  // Email validation
  // --------------------------------------------------

  const isValidEmail = (value: string) => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailRegex.test(value.trim())
  }

  // --------------------------------------------------
  // Step 1 - Submit Email
  // --------------------------------------------------

  const handleSubmitEmail = async () => {
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      showMessage('Please enter your email address')
      return
    }

    if (!isValidEmail(trimmedEmail)) {
      showMessage('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    dispatch(showLoader({ transparent: true }))

    try {
      const response = await authApi.forgotPassword({
        email: trimmedEmail,
      })

      if (!response.success) {
        showMessage(
          response.message || 'Unable to send reset link. Please try again.',
        )
        return
      }

      setEmail(trimmedEmail)
      setResetToken('')

      dispatch(
        showToast({
          message:
            response.message ||
            'Password reset link sent to your email.',
          type: 'success',
        }),
      )

      setStep('token')
    } finally {
      setIsLoading(false)
      dispatch(hideLoader())
    }
  }

  const handleContinueWithToken = () => {
    if (!resetToken.trim()) {
      showMessage('Please enter the reset token from your email')
      return
    }

    setStep('setpassword')
  }

  const handleResendResetLink = async () => {
    if (!email.trim()) {
      showMessage('Email is required')
      return
    }

    setIsLoading(true)
    dispatch(showLoader({ transparent: true }))

    try {
      const response = await authApi.forgotPassword({ email: email.trim() })

      if (!response.success) {
        showMessage(response.message || 'Unable to resend reset link.')
        return
      }

      setResetToken('')

      dispatch(
        showToast({
          message: response.message || 'Reset link sent again.',
          type: 'success',
        }),
      )
    } finally {
      setIsLoading(false)
      dispatch(hideLoader())
    }
  }

  // --------------------------------------------------
  // Password validation
  // --------------------------------------------------

  const isValidPassword = (value: string) => {
    /*
     * 8-12 characters
     * At least one alphabet
     * At least one number
     * At least one symbol
     */

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,12}$/

    return passwordRegex.test(value)
  }

  // --------------------------------------------------
  // Update password
  // --------------------------------------------------

  const handleUpdatePassword = async () => {
    if (!email.trim()) {
      showMessage('Email is required')
      return
    }

    if (!resetToken.trim()) {
      showMessage('Reset token is required')
      return
    }

    if (!password) {
      showMessage('Please enter your password')
      return
    }

    if (!isValidPassword(password)) {
      showMessage(
        'Password must be 8-12 characters with alphabets, numbers & symbols',
      )
      return
    }

    if (!confirmPassword) {
      showMessage('Please confirm your password')
      return
    }

    if (password !== confirmPassword) {
      showMessage('Passwords do not match')
      return
    }

    setIsLoading(true)
    dispatch(showLoader({ transparent: true }))

    try {
      const response = await authApi.resetPassword({
        email: email.trim(),
        token: resetToken.trim(),
        password,
        password_confirmation: confirmPassword,
      })

      if (!response.success) {
        showMessage(
          response.message || 'Unable to reset password. Please try again.',
        )
        return
      }

      dispatch(
        showToast({
          message:
            response.message ||
            'Password reset successfully. You can now login.',
          type: 'success',
        }),
      )

      setTimeout(() => {
        reset('Login')
      }, 1000)
    } finally {
      setIsLoading(false)
      dispatch(hideLoader())
    }
  }

  // --------------------------------------------------
  // Back to Login
  // --------------------------------------------------

  const handleBackToLogin = () => {
    reset('Login')
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* =================================================
            STEP 1 - EMAIL
        ================================================== */}

        {step === 'form' && (
          <View style={styles.centerContent}>

            <View style={styles.header}>
              <Text style={styles.title}>
                Reset Password
              </Text>

              <Text style={styles.subtitle}>
                Enter your email and we'll send you a link to
                reset your password.
              </Text>
            </View>

            <View style={styles.form}>

              <Text style={styles.label}>
                Email<Text style={styles.required}> *</Text>
              </Text>

              <TextInput
                style={[
                  styles.input,
                  isEmailActive
                    ? styles.inputFilled
                    : styles.inputEmpty,
                  hasEmailValue
                    ? styles.inputTextFilled
                    : styles.inputTextEmpty,
                ]}
                placeholder="Email"
                placeholderTextColor="#9BA6B7"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                onFocus={() =>
                  setEmailFocused(true)
                }
                onBlur={() =>
                  setEmailFocused(false)
                }
                returnKeyType="done"
                onSubmitEditing={handleSubmitEmail}
              />

              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.8}
                onPress={handleSubmitEmail}
              >
                <Text style={styles.submitText}>
                  Submit
                </Text>
              </TouchableOpacity>

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>
                  Back to{'  '}

                  <Text
                    style={styles.footerLink}
                    onPress={handleBackToLogin}
                  >
                    Sign In
                  </Text>
                </Text>
              </View>

            </View>
          </View>
        )}

        {/* =================================================
            STEP 2 - OTP
        ================================================== */}

        {step === 'token' && (
          <View style={styles.centerContent}>

            <View style={styles.header}>
              <Text style={styles.title}>
                Enter Reset Token
              </Text>

              <Text style={styles.subtitle}>
                Enter the reset token sent to your email
              </Text>

              <Text style={styles.subtitle}>
                <Text style={styles.otpEmailText}>
                  {email}
                </Text>
              </Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>
                Reset Token<Text style={styles.required}> *</Text>
              </Text>

              <TextInput
                style={[
                  styles.input,
                  isResetTokenActive
                    ? styles.inputFilled
                    : styles.inputEmpty,
                  hasResetTokenValue
                    ? styles.inputTextFilled
                    : styles.inputTextEmpty,
                ]}
                placeholder="Paste token from email"
                placeholderTextColor="#9BA6B7"
                autoCapitalize="none"
                autoCorrect={false}
                value={resetToken}
                onChangeText={setResetToken}
                onFocus={() => setResetTokenFocused(true)}
                onBlur={() => setResetTokenFocused(false)}
                returnKeyType="done"
                onSubmitEditing={handleContinueWithToken}
              />

              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.8}
                onPress={handleContinueWithToken}
                disabled={isLoading}
              >
                <Text style={styles.submitText}>
                  Continue
                </Text>
              </TouchableOpacity>

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>
                  Didn’t receive a token?{' '}

                  <Text
                    style={styles.footerLink}
                    onPress={handleResendResetLink}
                  >
                    Resend Again
                  </Text>
                </Text>
              </View>

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>
                  Back to{'  '}

                  <Text
                    style={styles.footerLink}
                    onPress={handleBackToLogin}
                  >
                    Sign In
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* =================================================
            STEP 3 - NEW PASSWORD
        ================================================== */}

        {step === 'setpassword' && (
          <View style={styles.centerContent}>

            <View style={styles.header}>

              <Text style={styles.title}>
                Setup New Password
              </Text>

              <Text style={styles.subtitle}>
                Your email is verified. Enter your new
                password.
              </Text>

            </View>

            <View style={styles.form}>

              {/* EMAIL */}

              <Text style={styles.label}>
                Email<Text style={styles.required}> *</Text>
              </Text>

              <TextInput
                style={[
                  styles.input,
                  styles.inputFilled,
                  styles.inputTextFilled,
                ]}
                placeholder="Email"
                placeholderTextColor="#9BA6B7"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              {/* PASSWORD */}

              <Text style={styles.label}>
                Password<Text style={styles.required}> *</Text>
              </Text>

              <View
                style={[
                  styles.passwordContainer,
                  isPasswordActive
                    ? styles.inputFilled
                    : styles.inputEmpty,
                ]}
              >

                <TextInput
                  style={[
                    styles.passwordInput,
                    hasPasswordValue
                      ? styles.inputTextFilled
                      : styles.inputTextEmpty,
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#9BA6B7"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() =>
                    setPasswordFocused(true)
                  }
                  onBlur={() =>
                    setPasswordFocused(false)
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TouchableOpacity
                  onPress={() =>
                    setShowPassword(
                      previous => !previous,
                    )
                  }
                  style={styles.passwordIconButton}
                >
                  <Icon
                    family="Ionicons"
                    name={
                      showPassword
                        ? 'eye-outline'
                        : 'eye-off-outline'
                    }
                    size={22}
                    color="#9BA6B7"
                  />
                </TouchableOpacity>

              </View>

              <Text style={styles.passwordHint}>
                Password Must Be 8-12 Characters With
                Alphabets, Numbers & Symbols.
              </Text>

              {/* CONFIRM PASSWORD */}

              <Text style={styles.label}>
                Confirm New Password
                <Text style={styles.required}> *</Text>
              </Text>

              <View
                style={[
                  styles.passwordContainer,
                  isConfirmPasswordActive
                    ? styles.inputFilled
                    : styles.inputEmpty,
                ]}
              >

                <TextInput
                  style={[
                    styles.passwordInput,
                    hasConfirmPasswordValue
                      ? styles.inputTextFilled
                      : styles.inputTextEmpty,
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#9BA6B7"
                  secureTextEntry={
                    !showConfirmPassword
                  }
                  value={confirmPassword}
                  onChangeText={
                    setConfirmPassword
                  }
                  onFocus={() =>
                    setConfirmPasswordFocused(
                      true,
                    )
                  }
                  onBlur={() =>
                    setConfirmPasswordFocused(
                      false,
                    )
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TouchableOpacity
                  onPress={() =>
                    setShowConfirmPassword(
                      previous => !previous,
                    )
                  }
                  style={styles.passwordIconButton}
                >
                  <Icon
                    family="Ionicons"
                    name={
                      showConfirmPassword
                        ? 'eye-outline'
                        : 'eye-off-outline'
                    }
                    size={22}
                    color="#9BA6B7"
                  />
                </TouchableOpacity>

              </View>

              {/* UPDATE */}

              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.8}
                onPress={handleUpdatePassword}
              >
                <Text style={styles.submitText}>
                  Update Password
                </Text>
              </TouchableOpacity>

              {/* BACK TO LOGIN */}

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>
                  Back to{'  '}

                  <Text
                    style={styles.footerLink}
                    onPress={handleBackToLogin}
                  >
                    Sign In
                  </Text>
                </Text>
              </View>

            </View>
          </View>
        )}

        {/* COPYRIGHT */}

        {step !== 'token' && (
          <Text style={styles.copyrightText}>
            © 2026 Tizzy Group. All rights reserved.
          </Text>
        )}

      </View>
    </SafeAreaView>
  )
}