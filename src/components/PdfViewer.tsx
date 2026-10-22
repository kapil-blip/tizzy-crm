import React, { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../assets/themes/colors';
import styles from '../assets/style/PdfViewerStyle';
import Icon from './Icon';

export type PdfViewerSource = {
  uri: string;
  cache?: boolean;
};

type PdfViewerMode = 'inline' | 'fullscreen';

type PdfViewerProps = {
  source?: PdfViewerSource;
  mode?: PdfViewerMode;
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  loading?: boolean;
  onLoadingChange?: (loading: boolean) => void;
  /** When provided, shows a download icon in the fullscreen modal header. */
  onDownload?: () => void;
  onError?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

type LayoutSize = { width: number; height: number };

function PdfDocument({
  source,
  layout,
  mode,
  onLoadingChange,
  onError,
}: {
  source?: PdfViewerSource;
  layout: LayoutSize;
  mode: PdfViewerMode;
  onLoadingChange?: (loading: boolean) => void;
  onError?: () => void;
}) {
  const isInline = mode === 'inline';
  const hasLayout = layout.width > 0 && layout.height > 0;

  if (!source) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (!hasLayout) {
    return null;
  }

  return (
    <Pdf
      source={source}
      style={{ width: layout.width, height: layout.height }}
      fitPolicy={isInline ? 2 : 0}
      singlePage={false}
      page={undefined}
      spacing={0}
      enablePaging={mode === 'fullscreen'}
      scrollEnabled
      showsVerticalScrollIndicator
      trustAllCerts={false}
      onLoadProgress={() => {
        if (isInline) onLoadingChange?.(true);
      }}
      onLoadComplete={() => {
        if (isInline) onLoadingChange?.(false);
      }}
      onError={() => {
        if (isInline) onLoadingChange?.(false);
        onError?.();
      }}
    />
  );
}

export default function PdfViewer({
  source,
  mode = 'inline',
  visible = false,
  onClose,
  title = 'Preview',
  loading = false,
  onLoadingChange,
  onDownload,
  onError,
  containerStyle,
}: PdfViewerProps) {
  const [layout, setLayout] = useState<LayoutSize>({ width: 0, height: 0 });

  if (mode === 'fullscreen') {
    return (
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <SafeAreaView style={styles.modalRoot} edges={['top', 'bottom']}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <View style={styles.modalHeaderActions}>
              {onDownload ? (
                <TouchableOpacity
                  style={styles.modalDownloadBtn}
                  onPress={onDownload}
                  accessibilityRole="button"
                  accessibilityLabel="Download PDF"
                >
                  <Icon family="Feather" name="download" size={22} color={COLORS.PRIMARY} />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Close preview"
              >
                <Icon family="Feather" name="x" size={24} color="#1E1E1E" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={styles.modalBody}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setLayout({ width, height });
            }}
          >
            <PdfDocument
              source={source}
              layout={layout}
              mode="fullscreen"
              onError={onError}
            />
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <View
      style={[styles.previewContainer, containerStyle]}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setLayout({ width, height });
      }}
    >
      {onDownload ? (
        <TouchableOpacity
          style={styles.inlineDownloadBtn}
          onPress={onDownload}
          accessibilityRole="button"
          accessibilityLabel="Download PDF"
        >
          <Icon family="Feather" name="download" size={22} color={COLORS.PRIMARY} />
        </TouchableOpacity>
      ) : null}
      <View style={styles.viewerWrap}>
        <PdfDocument
          source={source}
          layout={layout}
          mode="inline"
          onLoadingChange={onLoadingChange}
          onError={onError}
        />
      </View>
      {loading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      ) : null}
    </View>
  );
}
