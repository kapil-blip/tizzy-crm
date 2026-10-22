import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Linking,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '../../../components/Icon';
import styles from './FollowupStyle';
import { COLORS } from '../../../assets/themes/colors';
import Header from '../../../components/Header';
import FilterIcon from '../../../assets/images/option-filter.svg';

type FilterType = 'All' | 'Calls' | 'Meetings' | 'Renewals';

type FollowUpType = 'Call' | 'Meeting'|'Renewal';

type FollowUpStatus = 'Overdue' | 'Today' | 'Pending';

type FollowUpItem = {
  id: string;
  name: string;
  company: string;
  email: string;
  date: string;
  time: string;
  note: string;
  type: FollowUpType;
  status: FollowUpStatus;
  action: 'Call Now' | 'Join Meet' | 'Reminder';
  reminder?: string;
  phone?: string;
};

const FOLLOW_UP_DATA: FollowUpItem[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    company: 'Design Studio In.',
    email: 'priya@designstudio.in',
    date: '06-05-2026',
    time: '11:30 AM',
    note:
      'Call to discuss enterprise pricing and finalize quotation #1042',
    type: 'Call',
    status: 'Overdue',
    action: 'Call Now',
    phone: '9876543210',
  },
  {
    id: '2',
    name: 'Sashi Kamal',
    company: 'Tech Solutions Ltd.',
    email: 'amit.k@techsolutions.com',
    date: '05-05-2026',
    time: '11:30 AM',
    note:
      'Product demo meeting via Google Meet to showcase the new CRM features.',
    type: 'Meeting',
    status: 'Today',
    action: 'Join Meet',
    reminder: 'Tomorrow, 11:00 AM',
    phone: '9876543210',
  },
  {
    id: '3',
    name: 'Sashi Kamal',
    company: 'Tech Solutions Ltd.',
    email: 'amit.k@techsolutions.com',
    date: '07-05-2026',
    time: '11:30 AM',
    note:
      'Call to discuss enterprise pricing and finalize quotation #1042',
    type: 'Call',
    status: 'Today',
    action: 'Call Now',
    phone: '9876543210',
  },
  {
    id: '4',
    name: 'Amit Kumar',
    company: 'Tech Solutions Ltd.',
    email: 'amit.k@techsolutions.com',
    date: '08-05-2026',
    time: '11:30 AM',
    note:
      'Call to discuss enterprise pricing and finalize quotation #1042',
    type: 'Call',
    status: 'Pending',
    action: 'Call Now',
    phone: '9876543210',
  },
  {
    id: '5',
    name: 'Rahul Vish',
    company: 'Tech Solutions Ltd.',
    email: 'amit.k@techsolutions.com',
    date: '08-05-2026',
    time: '11:30 AM',
    note:
      'Call to discuss enterprise pricing and finalize quotation #1042',
    type: 'Call',
    status: 'Pending',
    action: 'Call Now',
    phone: '9876543210',
  },
  {
    id: '6',
    name: 'Amit Kumar',
    company: 'Tech Solutions Ltd.',
    email: 'amit.k@techsolutions.com',
    date: '08-05-2026',
    time: '11:30 AM',
    note:
      'Call to discuss enterprise pricing and finalize quotation #1042',
    type: 'Call',
    status: 'Pending',
    action: 'Call Now',
    phone: '9876543210',
  },
  {
    id: '7',
    name: 'Amit Kumar',
    company: 'Tech Solutions Ltd.',
    email: 'amit.k@techsolutions.com',
    date: '10-05-2026',
    time: '11:30 AM',
    note: 'Subscription renewal is due. Send renewal reminder to customer.',
    type: 'Renewal',
    status: 'Pending',
    action: 'Reminder',
  }
];

const FILTERS: FilterType[] = ['All', 'Calls', 'Meetings','Renewals'];

export default function FollowUpView() {
  const [activeFilter, setActiveFilter] =
    useState<FilterType>('All');

  const [searchText, setSearchText] = useState('');

  const filteredData = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    return FOLLOW_UP_DATA.filter(item => {
      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Calls' && item.type === 'Call') ||
        (activeFilter === 'Meetings' && item.type === 'Meeting') ||
        (activeFilter === 'Renewals' && item.type === 'Renewal');

      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.company.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchText]);

  const getStatusStyle = (status: FollowUpStatus) => {
    switch (status) {
      case 'Overdue':
        return {
          badge: styles.overdueBadge,
          text: styles.overdueText,
        };

      case 'Today':
        return {
          badge: styles.todayBadge,
          text: styles.todayText,
        };

      default:
        return {
          badge: styles.pendingBadge,
          text: styles.pendingText,
        };
    }
  };

  const handleCallNow = async (phoneNumber?: string) => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Phone number is not available.');
      return;
    }
  
    const phoneUrl = `tel:${phoneNumber}`;
  
    try {
      await Linking.openURL(phoneUrl);
    } catch (error) {
      console.log('Call error:', error);
  
      Alert.alert(
        'Error',
        'Unable to open phone dialer. Please test this on a physical device.',
      );
    }
  };

  const renderItem = ({ item }: { item: FollowUpItem }) => {
    const statusStyle = getStatusStyle(item.status);

    return (
      <View style={styles.followUpCard}>
        {/* Name + Status */}
        <View style={styles.nameRow}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.company}>{item.company}</Text>
          </View>

          <View style={statusStyle.badge}>
            <Text style={statusStyle.text}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Email */}
        <View style={styles.detailRow}>
          <Icon
            family="Feather"
            name="mail"
            size={15}
            color="#6E747D"
          />

          <Text style={styles.detailText}>
            {item.email}
          </Text>
        </View>

        {/* Date */}
        <View style={styles.detailRow}>
          <Icon
            family="Feather"
            name="calendar"
            size={15}
            color="#6E747D"
          />

          <Text style={styles.detailText}>
            <Text style={styles.dateText}>
              {item.date}
            </Text>
            {'  •  '}
            {item.time}
          </Text>
        </View>

        {/* Note */}
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            <Text style={styles.noteTitle}>
              Follow Up Note:
            </Text>{' '}
            {item.note}
          </Text>
        </View>

        {/* Reminder */}
        {item.reminder && (
          <View style={styles.reminderBox}>
            <Icon
              family="Feather"
              name="clock"
              size={13}
              color={COLORS.PRIMARY}
            />

            <Text style={styles.reminderText}>
              {item.reminder}
            </Text>
          </View>
        )}

        {/* Actions */}
        {/* Actions */}
<View style={styles.actionRow}>
  {item.type === 'Renewal' ? (
    <Pressable
      style={({ pressed }) => [
        styles.primaryButton,
        {
          opacity: pressed ? 0.8 : 1,
          flex: 1,
        },
      ]}
      onPress={() => {
        // TODO: Send renewal reminder
        Alert.alert(
          'Reminder',
          `Renewal reminder sent to ${item.name}`,
        );
      }}
    >
      <Icon
        family="Feather"
        name="bell"
        size={16}
        color={COLORS.WHITE}
      />

      <Text style={styles.primaryButtonText}>
        Reminder
      </Text>
    </Pressable>
  ) : (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.secondaryButton,
          {
            opacity: pressed ? 0.8 : 1,
          },
        ]}
        onPress={() => {
          // TODO: Reschedule follow-up
        }}
      >
        <Icon
          family="Feather"
          name="calendar"
          size={16}
          color="#1E1E1E"
        />

        <Text style={styles.secondaryButtonText}>
          Reschedule
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          {
            opacity: pressed ? 0.8 : 1,
          },
        ]}
        onPress={() => {
          if (item.action === 'Join Meet') {
            // TODO: Join meeting
          } else {
            handleCallNow(item.phone);
          }
        }}
      >
        <Icon
          family="Feather"
          name={
            item.action === 'Join Meet'
              ? 'external-link'
              : 'phone'
          }
          size={16}
          color={COLORS.WHITE}
        />

        <Text style={styles.primaryButtonText}>
          {item.action}
        </Text>
      </Pressable>
    </>
  )}
</View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top']}
    >
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        translucent={false}
      />
      {/* Header */}
      <Header title="Follow up" />

      <View style={styles.headerShadow} />
      <View style={styles.content}>
      {/* Search + Filter */}
      <View style={styles.topSection}>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Icon
              family="Feather"
              name="search"
              size={20}
              color="#777E87"
            />

            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Quick Search..."
              placeholderTextColor="#9AA9BF"
              style={styles.searchInput}
            />
          </View>

          <Pressable
            style={styles.filterButton}
            onPress={() => {
              // TODO: open advanced filters
            }}
          >
            <FilterIcon width={20} height={20} />
          </Pressable>
        </View>

        {/* Tabs */}
        <View style={styles.filterTabs}>
          {FILTERS.map(filter => {
            const active = activeFilter === filter;

            return (
              <Pressable
                key={filter}
                style={[
                  styles.filterTab,
                  active && styles.activeFilterTab,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    active && styles.activeFilterTabText,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Follow Up List */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No follow-ups found
            </Text>
          </View>
        }
      />
      </View>
    </SafeAreaView>
  );
}