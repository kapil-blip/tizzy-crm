
import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import Icon from '../../../components/Icon';
import { navigate } from '../../../navigation/NavigationService';
// import { useAppSelector } from '../../../store/hooks';
// import { getColorFromName } from '../../../utils/Utils';
import styles from './HomeStyle';
import Header from '../../../components/Header';
import BellIcon from '../../../assets/images/bellicon.svg'

type SummaryItem = {
  id: string;
  title: string;
  value: string;
  icon: string;
  iconFamily: 'Ionicons' | 'Feather';
  iconColor: string;
  iconBg: string;
};

type TaskItem = {
  id: string;
  title: string;
  value: string;
  icon: string;
  iconColor: string;
  iconBg: string;
};

type TeamMember = {
  id: number;
  name: string;
  designation: string;
  leads: string;
  calls: string;
  deals: string;
  conversion: string;
  initial: string;
  color: string;
  top?: boolean;
};

type Activity = {
  id: number;
  title: string;
  time: string;
  icon: string;
  iconColor: string;
  iconBg: string;
};

const SUMMARY_ITEMS: SummaryItem[] = [
  {
    id: 'followups',
    title: 'Follow-ups',
    value: '22',
    icon: 'call-outline',
    iconFamily: 'Ionicons',
    iconColor: '#0565C9',
    iconBg: '#EAF4FF',
  },
  {
    id: 'overdue',
    title: 'Overdue Tasks',
    value: '5',
    icon: 'alert-circle-outline',
    iconFamily: 'Ionicons',
    iconColor: '#FF5B7F',
    iconBg: '#FFF0F4',
  },
  {
    id: 'meetings',
    title: 'Meetings Scheduled',
    value: '2',
    icon: 'calendar-outline',
    iconFamily: 'Ionicons',
    iconColor: '#00BFA6',
    iconBg: '#E6FBF7',
  },
  {
    id: 'quotations',
    title: 'Pending Quotations',
    value: '22',
    icon: 'time-outline',
    iconFamily: 'Ionicons',
    iconColor: '#FFB42B',
    iconBg: '#FFF7E8',
  },
];

const TASK_ITEMS: TaskItem[] = [
  {
    id: 'calls',
    title: 'Pending Calls',
    value: '22',
    icon: 'call-outline',
    iconColor: '#0565C9',
    iconBg: '#EAF4FF',
  },
  {
    id: 'followups',
    title: 'Upcoming Follow-ups',
    value: '5',
    icon: 'time-outline',
    iconColor: '#FFB42B',
    iconBg: '#FFF7E8',
  },
  {
    id: 'meetings',
    title: 'Meetings Scheduled',
    value: '2',
    icon: 'calendar-outline',
    iconColor: '#00BFA6',
    iconBg: '#E6FBF7',
  },
  {
    id: 'leads',
    title: 'New Lead Assignments',
    value: '12',
    icon: 'person-add-outline',
    iconColor: '#8B78FF',
    iconBg: '#F0EDFF',
  },
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    designation: 'Senior Sales Executive',
    leads: '142',
    calls: '92',
    deals: '18',
    conversion: '32%',
    initial: 'P',
    color: '#D00000',
    top: true,
  },
  {
    id: 2,
    name: 'Rahul Verma',
    designation: 'Sales Executive',
    leads: '98',
    calls: '81',
    deals: '12',
    conversion: '24%',
    initial: 'R',
    color: '#B38B16',
  },
  {
    id: 3,
    name: 'Reeya Verma',
    designation: 'Sales Executive',
    leads: '98',
    calls: '81',
    deals: '12',
    conversion: '24%',
    initial: 'R',
    color: '#287BB8',
  },
];

const ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: 'Call completed with Reliance Retail',
    time: '10 mins ago',
    icon: 'call-outline',
    iconColor: '#287BB8',
    iconBg: '#EAF4FF',
  },
  {
    id: 2,
    title: 'Quotation created for Tech Mahindra',
    time: '45 mins ago',
    icon: 'document-text-outline',
    iconColor: '#FFB42B',
    iconBg: '#FFF7E8',
  },
  {
    id: 3,
    title: 'Deal moved to Negotiation for Wipro',
    time: '2 hours ago',
    icon: 'checkmark-outline',
    iconColor: '#00BFA6',
    iconBg: '#E6FBF7',
  },
  {
    id: 4,
    title: 'Lead updated Infosys Enterprise',
    time: '3 hours ago',
    icon: 'person-add-outline',
    iconColor: '#8B78FF',
    iconBg: '#F0EDFF',
  },
];

const QUICK_ACTIONS = [
  {
    id: 'leads',
    title: 'Add',
    subtitle: 'Leads',
    icon: 'person-add-outline',
  },
  {
    id: 'quotation',
    title: 'Add',
    subtitle: 'Quotation',
    icon: 'document-text-outline',
  },
  {
    id: 'upload',
    title: 'Upload',
    subtitle: 'Leads',
    icon: 'share-outline',
  },
  {
    id: 'call',
    title: 'Log',
    subtitle: 'Call',
    icon: 'call-outline',
  },
];

export default function HomeView() {
//   const user = useAppSelector(state => state.auth.user);

  const [searchQuery, setSearchQuery] = useState('');

  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good Morning,';
    if (hour < 16) return 'Good Afternoon,';
    if (hour < 19) return 'Good Evening,';
    return 'Good Night,';
  }, []);

  const avatarInitial = 'J';

  useFocusEffect(
    React.useCallback(() => {
      // Keep your existing API calls here.
      // Example:
      // fetchData();
    }, []),
  );

  const handleQuickAction = (id: string) => {
    switch (id) {
      case 'leads':
        navigate('AddCustomer', {});
        break;

      case 'quotation':
        navigate('SubscriptionPlans', {});
        break;

      case 'upload':
        navigate('AddCustomer', {});
        break;

      case 'call':
        navigate('CreateTicket', {});
        break;
    }
  };

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top']}
    >
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable
              style={styles.avatar}
              onPress={() => navigate('Profile', {})}
            >
              <Text style={styles.avatarText}>
                {avatarInitial}
              </Text>
            </Pressable>

            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>
                {greeting}
              </Text>

              <Text
                style={styles.userName}
                numberOfLines={1}
              >
                {'Ganesh Singh'}
              </Text>
            </View>
          </View>

          <View style={styles.headerActions}>
          <View style={styles.headerIconWrap}>
                <BellIcon width={24} height={24} color="#4C4C5C" />
                {/* {unreadCount > 0 ? (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>
                      {formatNotificationBadge(unreadCount)}
                    </Text>
                  </View>
                ) : null} */}
                <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>
                      10
                    </Text>
                  </View>
              </View>
            <Pressable
              style={styles.headerButton}
              onPress={() => navigate('Support', {})}
            >
              <View>
                <Icon
                  family="Ionicons"
                  name="chatbubble-ellipses-outline"
                  size={25}
                  color="#30343B"
                />

                <View style={styles.headerNotificationDot} />
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.bottomShadow} />


        {/* CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* SEARCH */}
          <View style={styles.searchContainer}>
            <Icon
              family="Ionicons"
              name="search-outline"
              size={23}
              color="#707985"
            />

            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Quick Search..."
              placeholderTextColor="#A2ADBD"
              style={styles.searchInput}
            />
          </View>

          {/* TODAY'S SUMMARY */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Today's Summary
            </Text>
          </View>

          <View style={styles.summaryGrid}>
            {SUMMARY_ITEMS.map(item => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.summaryCard,
                  { opacity: pressed ? 0.75 : 1 },
                ]}
              >
                <View
                  style={[
                    styles.summaryIcon,
                    { backgroundColor: item.iconBg },
                  ]}
                >
                  <Icon
                    family={item.iconFamily}
                    name={item.icon}
                    size={23}
                    color={item.iconColor}
                  />
                </View>

                <Text style={styles.summaryValue}>
                  {item.value}
                </Text>

                <Text style={styles.summaryLabel}>
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* TASK OVERVIEW */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Task Overview
            </Text>

            <Pressable
              onPress={() => navigate('Support', {})}
            >
              <Text style={styles.viewAll}>
                View All Tasks
              </Text>
            </Pressable>
          </View>

          <View style={styles.taskContainer}>
            {TASK_ITEMS.map(item => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.taskRow,
                  { opacity: pressed ? 0.75 : 1 },
                ]}
              >
                <View
                  style={[
                    styles.taskIcon,
                    { backgroundColor: item.iconBg },
                  ]}
                >
                  <Icon
                    family="Ionicons"
                    name={item.icon}
                    size={22}
                    color={item.iconColor}
                  />
                </View>

                <Text style={styles.taskTitle}>
                  {item.title}
                </Text>

                <Text style={styles.taskValue}>
                  {item.value}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* QUICK ACTION */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Quick Action
            </Text>
          </View>

          <View style={styles.quickActionRow}>
            {QUICK_ACTIONS.map(action => (
              <Pressable
                key={action.id}
                style={({ pressed }) => [
                  styles.quickAction,
                  { opacity: pressed ? 0.65 : 1 },
                ]}
                onPress={() => handleQuickAction(action.id)}
              >
                <View style={styles.quickActionIcon}>
                  <Icon
                    family="Ionicons"
                    name={action.icon}
                    size={28}
                    color="#0565C9"
                  />
                </View>

                <Text style={styles.quickActionTitle}>
                  {action.title}
                </Text>

                <Text style={styles.quickActionSubtitle}>
                  {action.subtitle}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* TEAM PERFORMANCE */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Team Performance
            </Text>

            <Pressable>
              <Text style={styles.viewAll}>
                View All
              </Text>
            </Pressable>
          </View>

          {/* FILTERS */}
          <View style={styles.filterRow}>
            <Pressable
              style={[
                styles.filterButton,
                styles.filterButtonActive,
              ]}
            >
              <Text style={styles.filterTextActive}>
                All
              </Text>
            </Pressable>

            <Pressable style={styles.filterButton}>
              <Text style={styles.filterText}>
                Cold Calling
              </Text>
            </Pressable>

            <Pressable style={styles.filterButton}>
              <Text style={styles.filterText}>
                JD Leads
              </Text>
            </Pressable>
          </View>

          {/* TEAM CARDS */}
          {TEAM_MEMBERS.map(member => (
            <View
              key={member.id}
              style={styles.teamCard}
            >
              <View style={styles.teamHeader}>
                <View
                  style={[
                    styles.teamAvatar,
                    { backgroundColor: member.color },
                  ]}
                >
                  <Text style={styles.teamAvatarText}>
                    {member.initial}
                  </Text>
                </View>

                <View style={styles.teamInfo}>
                  <Text style={styles.teamName}>
                    {member.name}
                  </Text>

                  <Text style={styles.teamDesignation}>
                    {member.designation}
                  </Text>
                </View>

                {member.top && (
                  <View style={styles.topBadge}>
                    <Text style={styles.topBadgeText}>
                      Top
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.performanceRow}>
                <View style={styles.performanceItem}>
                  <Text style={styles.performanceValue}>
                    {member.leads}
                  </Text>
                  <Text style={styles.performanceLabel}>
                    LEADS
                  </Text>
                </View>

                <View style={styles.performanceItem}>
                  <Text style={styles.performanceValue}>
                    {member.calls}
                  </Text>
                  <Text style={styles.performanceLabel}>
                    CALLS
                  </Text>
                </View>

                <View style={styles.performanceItem}>
                  <Text style={styles.performanceValue}>
                    {member.deals}
                  </Text>
                  <Text style={styles.performanceLabel}>
                    DEALS
                  </Text>
                </View>

                <View style={styles.performanceItem}>
                  <Text style={styles.performanceValue}>
                    {member.conversion}
                  </Text>
                  <Text style={styles.performanceLabel}>
                    CONV.
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* RECENT ACTIVITIES */}
          <View style={[styles.sectionHeader,{marginTop: 16}]}>
            <Text style={styles.sectionTitle}>
              Recent Activities
            </Text>

            <Pressable>
              <Text style={styles.viewAll}>
                View All
              </Text>
            </Pressable>
          </View>

          <View style={styles.activitiesCard}>
            {ACTIVITIES.map((activity, index) => (
              <View
                key={activity.id}
                style={styles.activityRow}
              >
                <View style={styles.activityIconContainer}>
                  <View
                    style={[
                      styles.activityIcon,
                      {
                        backgroundColor:
                          activity.iconBg,
                      },
                    ]}
                  >
                    <Icon
                      family="Ionicons"
                      name={activity.icon}
                      size={18}
                      color={activity.iconColor}
                    />
                  </View>

                  {index !== ACTIVITIES.length - 1 && (
                    <View
                      style={styles.activityLine}
                    />
                  )}
                </View>

                <View style={styles.activityContent}>
                  <Text
                    style={styles.activityTitle}
                    numberOfLines={1}
                  >
                    {activity.title}
                  </Text>

                  <Text style={styles.activityTime}>
                    {activity.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}