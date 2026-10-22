import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { COLORS } from '../assets/themes/colors';

export default function Loader() {
  const loader = useSelector((state: RootState) => state.viewService.loader);

  if (!loader.visible) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: loader.transparent ? 'transparent' : COLORS.WHITE,
        zIndex: 9999,
        elevation: 10,
      }}
    >
      <ActivityIndicator size="large" color={COLORS.PRIMARY} />
    </View>
  );
}
