import React, { useCallback, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet } from 'react-native';
import BootSplash from 'react-native-bootsplash';

const LOGO_WIDTH = 150;
const LOGO_HEIGHT = 51;
/** Match native BootSplash logo size — handoff starts here. */
const HANDOFF_SCALE = 1.14;
const END_SCALE = 1.5;
const ZOOM_DURATION_MS = 1400;

type AnimatedBootSplashProps = {
  ready: boolean;
  onHidden: () => void;
};

export default function AnimatedBootSplash({ ready, onHidden }: AnimatedBootSplashProps) {
  const scale = useRef(new Animated.Value(HANDOFF_SCALE)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(true);
  const zoomDone = useRef(false);
  const dismissed = useRef(false);
  const handoffStarted = useRef(false);
  const readyRef = useRef(ready);
  readyRef.current = ready;

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;

    Animated.timing(opacity, {
      toValue: 0,
      duration: 280,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onHidden();
    });
  }, [onHidden, opacity]);

  const tryDismiss = useCallback(() => {
    if (readyRef.current && zoomDone.current) {
      dismiss();
    }
  }, [dismiss]);

  const startZoom = useCallback(() => {
    Animated.timing(scale, {
      toValue: END_SCALE,
      duration: ZOOM_DURATION_MS,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        zoomDone.current = true;
        tryDismiss();
      }
    });
  }, [scale, tryDismiss]);

  /** Hide native splash only after the JS logo is painted at the same size. */
  const handoffFromNative = useCallback(() => {
    if (handoffStarted.current) return;
    handoffStarted.current = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        void BootSplash.hide({ fade: false });
        startZoom();
      });
    });
  }, [startZoom]);

  const onLogoReady = useCallback(() => {
    handoffFromNative();
  }, [handoffFromNative]);

  React.useEffect(() => {
    tryDismiss();
  }, [ready, tryDismiss]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]} pointerEvents="auto">
      <Animated.View style={{ transform: [{ scale }] }}>
        <Image
          source={require('../../assets/bootsplash/logo.png')}
          style={styles.logo}
          resizeMode="contain"
          onLoad={onLogoReady}
          onLayout={onLogoReady}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
});
