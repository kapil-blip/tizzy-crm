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
import { goBack } from '../../../../navigation/NavigationService';
import { useAppDispatch } from '../../../../store/hooks';
import { showToast } from '../../../../store/slices/viewSlice';
import styles from './HelpSupportStyle';

type HelpItem = {
  id: string;
  label: string;
};

const HELP_ITEMS: HelpItem[] = [
  { id: 'help-center', label: 'Help Center' },
  { id: 'contact', label: 'Contact Support' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'report', label: 'Report Issue' },
];

export default function HelpSupportView() {
  const dispatch = useAppDispatch();

  const handlePress = (item: HelpItem) => {
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
        title="Help & Support"
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
        <Text style={styles.subtitle}>App preferences & notifications</Text>

        {HELP_ITEMS.map(item => (
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
