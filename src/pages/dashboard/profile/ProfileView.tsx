import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '../../../components/Icon';
import BellIcon from '../../../assets/images/bellicon.svg';
import { COLORS } from '../../../assets/themes/colors';
import { navigate } from '../../../navigation/NavigationService';
import { performLogout } from '../../../services/authSession';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  hideLoader,
  showLoader,
  showToast,
} from '../../../store/slices/viewSlice';
import {
  getColorFromName,
  getInitialFromName,
} from '../../../utils/Utils';
import styles from './ProfileStyle';

type MenuItem = {
  id: string;
  label: string;
  icon: string;
  iconFamily: 'Feather' | 'Ionicons' | 'MaterialCommunityIcons';
  route?: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'activity',
    label: 'My Activity',
    icon: 'account-star-outline',
    iconFamily: 'MaterialCommunityIcons',
    route: 'MyActivity',
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: 'bar-chart-2',
    iconFamily: 'Feather',
  },
  {
    id: 'security',
    label: 'Security',
    icon: 'shield',
    iconFamily: 'Feather',
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: 'headset',
    iconFamily: 'MaterialCommunityIcons',
    route: 'HelpSupport',
  },
];

export default function ProfileView() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const [search, setSearch] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const displayName = user?.name?.trim() || 'User';
  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : 'Team Member';
  const empId = user?.id != null ? `EMP-${String(user.id).padStart(3, '0')}` : '';
  const avatarColor = useMemo(
    () => getColorFromName(displayName),
    [displayName],
  );
  const initial = useMemo(
    () => getInitialFromName(displayName),
    [displayName],
  );

  const filteredMenu = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return MENU_ITEMS;
    return MENU_ITEMS.filter(item =>
      item.label.toLowerCase().includes(query),
    );
  }, [search]);

  const handleMenuPress = (item: MenuItem) => {
    if (item.route) {
      navigate(item.route, {});
      return;
    }

    dispatch(
      showToast({
        message: `${item.label} coming soon`,
        type: 'info',
      }),
    );
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    dispatch(showLoader({ transparent: true }));

    try {
      await performLogout();
    } catch {
      dispatch(
        showToast({
          message: 'Unable to logout. Please try again.',
          type: 'error',
        }),
      );
    } finally {
      setIsLoggingOut(false);
      dispatch(hideLoader());
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        translucent={false}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>

        <View style={styles.headerActions}>
          <Pressable
            style={({ pressed }) => [
              styles.headerIconWrap,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={() => {
              // TODO: notifications
            }}
          >
            <BellIcon width={22} height={22} />
            <View style={styles.badgeDot} />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.headerIconWrap,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={() => {
              // TODO: chat / messages
            }}
          >
            <Icon
              family="Ionicons"
              name="chatbubble-ellipses-outline"
              size={22}
              color="#1E1E1E"
            />
            <View style={styles.badgeDot} />
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomShadow} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.searchContainer}>
          <Icon family="Feather" name="search" size={18} color="#737B86" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Quick Search..."
            placeholderTextColor="#9AA9BF"
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>

        <View style={styles.profileRow}>
          <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName} numberOfLines={1}>
              {displayName}
            </Text>

            <View style={styles.profileMetaRow}>
              <Text style={styles.profileRole} numberOfLines={1}>
                {displayRole}
              </Text>

              {empId ? (
                <View style={styles.empBadge}>
                  <Text style={styles.empBadgeText}>{empId}</Text>
                </View>
              ) : null}
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.editButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => {
              dispatch(
                showToast({
                  message: 'Edit profile coming soon',
                  type: 'info',
                }),
              );
            }}
          >
            <Icon
              family="Feather"
              name="edit-2"
              size={16}
              color={COLORS.PRIMARY}
            />
          </Pressable>
        </View>

        <View style={styles.menuList}>
          {filteredMenu.map(item => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.menuItem,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => handleMenuPress(item)}
            >
              <View style={styles.menuIconWrap}>
                <Icon
                  family={item.iconFamily}
                  name={item.icon}
                  size={22}
                  color="#1E1E1E"
                />
              </View>

              <Text style={styles.menuLabel}>{item.label}</Text>

              <Icon
                family="Feather"
                name="chevron-right"
                size={20}
                color="#1E1E1E"
              />
            </Pressable>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            { opacity: pressed || isLoggingOut ? 0.75 : 1 },
          ]}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          <Icon
            family="Feather"
            name="log-out"
            size={20}
            color="#E04B4B"
          />
          <Text style={styles.logoutText}>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
