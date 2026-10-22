import React, { useRef } from 'react';
import {
  Image,
  ImageSourcePropType,
  LayoutRectangle,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Icon from './Icon';
import { COLORS } from '../assets/themes/colors';

type SvgIconComponent = React.ComponentType<SvgProps>;

type HeaderProps = {
  title: string;

  leftIconType?: 'back' | 'menu';
  rightIconName?: string;

  leftIconAsset?: ImageSourcePropType | SvgIconComponent | React.ReactElement;
  rightIconAsset?: React.ReactNode | SvgIconComponent;

  leftIconAssetType?: 'auto' | 'svg' | 'image';
  rightIconAssetType?: 'auto' | 'svg' | 'image';

  rightBadgeCount?: number;

  hideRightIcon?: boolean;
  hideLeftIcon?: boolean;

  onLeftPress?: () => void;
  onRightPress?: () => void;

  onRightIconLayout?: (layout: LayoutRectangle) => void;
};

const LEFT_ASSET_SIZE = 22;
const RIGHT_ASSET_SIZE = 22;

function renderHeaderAsset(
  asset:
    | ImageSourcePropType
    | SvgIconComponent
    | React.ReactElement
    | React.ReactNode
    | undefined,
  size: number,
): React.ReactNode {
  if (asset == null || asset === false) {
    return null;
  }

  if (React.isValidElement(asset)) {
    return asset;
  }

  if (typeof asset === 'function') {
    const Cmp = asset as SvgIconComponent;

    return <Cmp width={size} height={size} />;
  }

  return (
    <Image
      source={asset as ImageSourcePropType}
      style={{
        width: size,
        height: size,
      }}
      resizeMode="contain"
    />
  );
}

export default function Header({
  title,

  // IMPORTANT:
  // No default icon anymore
  leftIconType,
  rightIconName,

  leftIconAsset,
  rightIconAsset,

  leftIconAssetType: _leftIconAssetType = 'auto',
  rightIconAssetType: _rightIconAssetType = 'auto',

  rightBadgeCount = 0,

  hideRightIcon = false,
  hideLeftIcon = false,

  onLeftPress,
  onRightPress,
  onRightIconLayout,
}: HeaderProps) {
  const rightIconRef = useRef<View>(null);

  const leftIconName =
    leftIconType === 'back'
      ? 'chevron-back'
      : 'menu-outline';

  /**
   * Show left icon only when:
   * - leftIconType is provided
   * OR
   * - leftIconAsset is provided
   */
  const hasLeftIcon =
    !hideLeftIcon &&
    (!!leftIconType || !!leftIconAsset);

  /**
   * Show right icon only when:
   * - rightIconName is provided
   * OR
   * - rightIconAsset is provided
   */
  const hasRightIcon =
    !hideRightIcon &&
    (!!rightIconName || !!rightIconAsset);

  const handleRightIconLayout = () => {
    if (!onRightIconLayout) return;

    rightIconRef.current?.measureInWindow(
      (x, y, width, height) => {
        onRightIconLayout({
          x,
          y,
          width,
          height,
        });
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>

        {/* LEFT ICON */}
        {hasLeftIcon ? (
          <Pressable
            onPress={onLeftPress}
            style={({ pressed }) => [
              styles.iconButton,
              {
                opacity: pressed ? 0.4 : 1,
              },
            ]}
          >
            {leftIconAsset ? (
              renderHeaderAsset(
                leftIconAsset,
                LEFT_ASSET_SIZE,
              )
            ) : (
              <Icon
                family="Ionicons"
                name={leftIconName}
                size={26}
                color="#111827"
              />
            )}
          </Pressable>
        ) : null}

        {/* TITLE */}
        <Text
          style={[
            styles.title,
            !hasLeftIcon && styles.titleNoLeftIcon,
          ]}
        >
          {title}
        </Text>

        {/* RIGHT ICON */}
        {hasRightIcon ? (
          <Pressable
            ref={rightIconRef}
            onPress={onRightPress}
            style={({ pressed }) => [
              styles.iconButton,
              {
                opacity: pressed ? 0.4 : 1,
              },
            ]}
            onLayout={handleRightIconLayout}
          >
            {rightIconAsset ? (
              renderHeaderAsset(
                rightIconAsset,
                RIGHT_ASSET_SIZE,
              )
            ) : rightIconName ? (
              <Icon
                family="Ionicons"
                name={rightIconName}
                size={26}
                color="#111827"
              />
            ) : null}

            {rightBadgeCount > 0 ? (
              <View style={styles.badgeWrap}>
                <Text style={styles.badgeText}>
                  {rightBadgeCount > 99
                    ? '99+'
                    : rightBadgeCount}
                </Text>
              </View>
            ) : null}
          </Pressable>
        ) : null}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: COLORS.WHITE,

    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  title: {
    color: '#2C3139',
    flex: 1,
    textAlign: 'left',
    fontFamily: 'BalooBhai2-SemiBold',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },

  titleNoLeftIcon: {
    marginLeft: 0,
  },

  badgeWrap: {
    position: 'absolute',

    top: 4,
    right: 2,

    minWidth: 14,
    height: 14,

    borderRadius: 7,

    paddingHorizontal: 3,

    backgroundColor: '#FF4D4F',

    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: COLORS.WHITE,

    fontFamily: 'BalooBhai2-SemiBold',

    fontSize: 9,
    lineHeight: 11,

    fontWeight: '600',
  },
});