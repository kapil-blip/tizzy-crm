import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import type { IconProps } from 'react-native-vector-icons/Icon';

const ICON_FAMILIES = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome5Pro,
  FontAwesome6,
  FontAwesome6Pro,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} as const;

export type IconFamily = keyof typeof ICON_FAMILIES;

export type FontAwesomeVariant =
  | 'regular'
  | 'light'
  | 'solid'
  | 'brand'
  | 'sharpSolid'
  | 'duotone'
  | 'thin';

export type AppIconProps = IconProps & {
  family?: IconFamily;
  variant?: FontAwesomeVariant;
};

const FONT_AWESOME_5_VARIANTS: FontAwesomeVariant[] = ['light', 'solid', 'brand'];
const FONT_AWESOME_6_VARIANTS: FontAwesomeVariant[] = [
  'light',
  'solid',
  'brand',
  'sharpSolid',
  'duotone',
  'thin',
];

function getVariantProps(family: IconFamily, variant?: FontAwesomeVariant) {
  if (!variant) {
    return {};
  }

  if (
    (family === 'FontAwesome5' || family === 'FontAwesome5Pro') &&
    FONT_AWESOME_5_VARIANTS.includes(variant)
  ) {
    return { [variant]: true };
  }

  if (
    (family === 'FontAwesome6' || family === 'FontAwesome6Pro') &&
    FONT_AWESOME_6_VARIANTS.includes(variant)
  ) {
    return { [variant]: true };
  }

  return {};
}

export default function Icon({
  family = 'Ionicons',
  variant,
  ...props
}: AppIconProps) {
  const IconComponent = ICON_FAMILIES[family] as React.ComponentType<any>;

  return <IconComponent {...props} {...getVariantProps(family, variant)} />;
}
