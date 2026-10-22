import React from 'react';
import {
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../../../components/Header';
import Icon from '../../../../components/Icon';
import { goBack, navigate } from '../../../../navigation/NavigationService';
import { useAppDispatch } from '../../../../store/hooks';
import { showToast } from '../../../../store/slices/viewSlice';
import styles from './MyActivityStyle';

type ActivityItem = {
  id: string;
  label: string;
  route?: string;
};

const ACTIVITY_ITEMS: ActivityItem[] = [
  { id: 'leads', label: 'Leads', route: 'Leads' },
  { id: 'followups', label: 'Follow-ups', route: 'Followup' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'calls', label: 'Calls Log' },
  { id: 'tasks', label: 'Daily Tasks' },
];

export default function MyActivityView() {
  const dispatch = useAppDispatch();

  const handlePress = (item: ActivityItem) => {
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

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        translucent={false}
      />

      <Header
        title="My Activity"
        leftIconType="back"
        onLeftPress={() => goBack()}
        rightIconName="search-outline"
        onRightPress={() => {
          dispatch(
            showToast({
              message: 'Search coming soon',
              type: 'info',
            }),
          );
        }}
      />
      <View style={styles.bottomShadow} />

      <View style={styles.content}>
        <Text style={styles.subtitle}>Your personal work tracking</Text>

        {ACTIVITY_ITEMS.map(item => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              styles.listItem,
              { opacity: pressed ? 0.65 : 1 },
            ]}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.listLabel}>{item.label}</Text>
            <Icon
              family="Feather"
              name="chevron-right"
              size={20}
              color="#1E1E1E"
            />
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
