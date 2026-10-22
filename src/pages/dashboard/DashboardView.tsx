import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeView from './home/HomeView';
import styles from './DashboardStyle';
import { COLORS } from '../../assets/themes/colors';

import HouseIcon from '../../assets/images/house.svg';
import PersonsIcon from '../../assets/images/persons.svg';
import PhoneOutgoingIcon from '../../assets/images/PhoneOutgoing.svg';
import FileTextIcon from '../../assets/images/FileText.svg';
import ProfileIcon from '../../assets/images/profile.svg';

import HouseBlueOutlineIcon from '../../assets/images/house-blue-outline.svg';
import PersonsBlueOutlineIcon from '../../assets/images/persons-blue-outline.svg';
import PhoneOutgoingBlueOutlineIcon from '../../assets/images/PhoneOutgoing-blue-outline.svg';
import FileTextBlueOutlineIcon from '../../assets/images/FileText-blue-outline.svg';
import ProfileBlueOutlineIcon from '../../assets/images/profile-blue-outline.svg';

import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';
import LeadsView from './leads/LeadsView';
import FollowupView from './followup/FollowupView';
import QuotationView from './quotation/QuotationView';
import ProfileView from './profile/ProfileView';

export type DashboardTabParamList = {
  Home: undefined;
  Leads: undefined;
  FollowUp: undefined;
  Quotation: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<DashboardTabParamList>();

/**
 * Default tab icons
 */
const TAB_ICON_ASSETS: Record<
  keyof DashboardTabParamList,
  FC<SvgProps>
> = {
  Home: HouseIcon,
  Leads: PersonsIcon,
  FollowUp: PhoneOutgoingIcon,
  Quotation: FileTextIcon,
  Profile: ProfileIcon,
};

/**
 * Active tab icons
 */
const TAB_ICON_ASSETS_BLUE: Record<
  keyof DashboardTabParamList,
  FC<SvgProps>
> = {
  Home: HouseBlueOutlineIcon,
  Leads: PersonsBlueOutlineIcon,
  FollowUp: PhoneOutgoingBlueOutlineIcon,
  Quotation: FileTextBlueOutlineIcon,
  Profile: ProfileBlueOutlineIcon,
};

/**
 * Tab labels
 */
const TAB_LABELS: Record<
  keyof DashboardTabParamList,
  string
> = {
  Home: 'Home',
  Leads: 'Leads',
  FollowUp: 'Follow Up',
  Quotation: 'Quotation',
  Profile: 'Profile',
};

export default function DashboardView() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: '#98A2B3',
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        sceneStyle: styles.tabScene,
        /**
         * Tab Label
         */
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={[
              styles.tabBarLabel,
              {
                color,
                fontFamily: focused
                  ? 'BalooBhai2-SemiBold'
                  : 'BalooBhai2-Medium',
              },
            ]}
          >
            {TAB_LABELS[route.name]}
          </Text>
        ),

        /**
         * Tab Icon
         */
        tabBarIcon: ({ color, size, focused }) => {
          const TabIcon = focused
            ? TAB_ICON_ASSETS_BLUE[route.name]
            : TAB_ICON_ASSETS[route.name];

          return (
            <View
              style={[
                styles.tabIconWrap,
                focused ? styles.tabIconWrapActive : null,
              ]}
            >
              <TabIcon
                width={size}
                height={size}
                color={color}
              />
            </View>
          );
        },
      })}
    >
      {/* Home */}
      <Tab.Screen
        name="Home"
        component={HomeView}
      />

      {/* Leads */}
      <Tab.Screen
        name="Leads"
        component={LeadsView}
      />

      {/* Follow Up */}
      <Tab.Screen
        name="FollowUp"
        component={FollowupView}
      />

      {/* Quotation */}
      <Tab.Screen
        name="Quotation"
        component={QuotationView}
      />

      {/* Profile */}
      <Tab.Screen
        name="Profile"
        component={ProfileView}
      />
    </Tab.Navigator>
  );
}