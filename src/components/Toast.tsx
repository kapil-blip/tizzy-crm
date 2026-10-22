import React, { useEffect } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Icon from './Icon';
import { hideToast } from '../store/slices/viewSlice';
import { RootState } from '../store/store';

const TOAST_DURATION_MS = 1500;

type ToastType = 'success' | 'error' | 'info' | 'warning';

const TOAST_CONFIG: Record<
  ToastType,
  {
    title: string;
    accentColor: string;
    iconBg: string;
    iconFamily: 'Feather' | 'Ionicons' | 'MaterialCommunityIcons';
    iconName: string;
  }
> = {
  success: {
    title: 'Success',
    accentColor: '#22C55E',
    iconBg: '#22C55E',
    iconFamily: 'Feather',
    iconName: 'check',
  },
  error: {
    title: 'Error',
    accentColor: '#EF4444',
    iconBg: '#EF4444',
    iconFamily: 'Feather',
    iconName: 'x',
  },
  info: {
    title: 'Info',
    accentColor: '#3B82F6',
    iconBg: '#3B82F6',
    iconFamily: 'Feather',
    iconName: 'info',
  },
  warning: {
    title: 'Warning',
    accentColor: '#F59E0B',
    iconBg: '#F59E0B',
    iconFamily: 'Feather',
    iconName: 'alert-triangle',
  },
};

function ToastStatusIcon({
  type,
  iconBg,
  iconFamily,
  iconName,
}: {
  type: ToastType;
  iconBg: string;
  iconFamily: 'Feather' | 'Ionicons' | 'MaterialCommunityIcons';
  iconName: string;
}) {
  if (type === 'warning') {
    return (
      <View style={styles.warningIconWrap}>
        <Icon family="Feather" name="alert-triangle" size={22} color={iconBg} />
      </View>
    );
  }

  return (
    <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
      <Icon family={iconFamily} name={iconName} size={14} color="#FFFFFF" />
    </View>
  );
}

export default function Toast() {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { message, title, type, key } = useSelector((state: RootState) => state.viewService.toast);

  const visible = Boolean(type && message.trim());

  useEffect(() => {
    if (!visible) return undefined;

    const timer = setTimeout(() => {
      dispatch(hideToast());
    }, TOAST_DURATION_MS);

    return () => clearTimeout(timer);
  }, [dispatch, visible, key]);

  if (!visible || !type) {
    return null;
  }

  const config = TOAST_CONFIG[type];
  const displayTitle = title.trim() || config.title;

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      presentationStyle="overFullScreen"
      onRequestClose={() => dispatch(hideToast())}
    >
      <View style={styles.modalRoot} pointerEvents="box-none">
        <View style={[styles.host, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <View style={styles.toast}>
            <View style={[styles.accentBar, { backgroundColor: config.accentColor }]} />

            <ToastStatusIcon
              type={type}
              iconBg={config.iconBg}
              iconFamily={config.iconFamily}
              iconName={config.iconName}
            />

            <View style={styles.textBlock}>
              <Text style={styles.title}>{displayTitle}</Text>
              <Text style={styles.message}>{message}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
              onPress={() => dispatch(hideToast())}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Dismiss notification"
            >
              <Icon family="Feather" name="x" size={20} color="#1E1E1E" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  host: {
    paddingHorizontal: 16,
    alignItems: 'stretch',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'stretch', // was 'flex-start'
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 0, // remove vertical padding so bar is flush with top & bottom
    paddingRight: 12,
    paddingLeft: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 60, // ensures a visible toast
  },
  accentBar: {
    width: 5,
    alignSelf: 'stretch',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 12,
    // Remove any conflicting height rules, make sure it stretches full
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16, // match icon alignment within new toast height
    marginRight: 12,
  },
  warningIconWrap: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginRight: 12,
  },
  textBlock: {
    flex: 1,
    paddingRight: 8,
    minWidth: 0,
    justifyContent: 'center',
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'BalooBhai2-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: '#1E1E1E',
    marginBottom: 4,
  },
  message: {
    fontFamily: 'BalooBhai2-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#9BA6B7',
  },
  closeButton: {
    padding: 4,
    marginTop: 16, // align with text/icon
    alignSelf: 'flex-start',
  },
  closeButtonPressed: {
    opacity: 0.5,
  },
});
