import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DatePicker, { parseDisplayDate } from './DatePicker';
import Icon from './Icon';
import styles from '../assets/style/FilterOptionsModalStyle';

export type FilterOption = { value: string; label: string };

export type FilterValues = {
  dateType: string;
  fromDate: string;
  toDate: string;
  status: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  value: FilterValues;
  dateTypeOptions: FilterOption[];
  statusOptions: FilterOption[];
  onApply: (next: FilterValues) => void;
};

export default function FilterOptionsModal({
  visible,
  onClose,
  value,
  dateTypeOptions,
  statusOptions,
  onApply,
}: Props) {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState<FilterValues>(value);
  const [openDropdown, setOpenDropdown] = useState<'dateType' | 'status' | null>(
    null,
  );
  const [datePicker, setDatePicker] = useState<'from' | 'to' | null>(null);

  useEffect(() => {
    if (visible) {
      setDraft(value);
      setOpenDropdown(null);
    }
  }, [visible, value]);

  const dateTypeLabel =
    dateTypeOptions.find(item => item.value === draft.dateType)?.label ||
    'Select';
  const statusLabel =
    statusOptions.find(item => item.value === draft.status)?.label || 'Select';

  const handleReset = () => {
    setDraft({
      dateType: dateTypeOptions[0]?.value ?? '',
      fromDate: '',
      toDate: '',
      status: '',
    });
    setOpenDropdown(null);
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <Pressable style={styles.backdrop} onPress={onClose} />

          <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 12) }]}>
            <View style={styles.handleIndicator} />

            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>Filters Options</Text>
              <Pressable
                style={styles.closeBtn}
                onPress={onClose}
                hitSlop={12}
                accessibilityLabel="Close filters"
              >
                <Icon family="Ionicons" name="close" size={24} color="#9BA6B7" />
              </Pressable>
            </View>

            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.fieldLabel}>Date Type</Text>
              <Pressable
                style={styles.selectInput}
                onPress={() =>
                  setOpenDropdown(prev => (prev === 'dateType' ? null : 'dateType'))
                }
              >
                <Text
                  style={[
                    styles.selectText,
                    !draft.dateType && styles.selectPlaceholder,
                  ]}
                >
                  {dateTypeLabel}
                </Text>
                <Icon family="Feather" name="chevron-down" size={18} color="#9AA9BF" />
              </Pressable>
              {openDropdown === 'dateType' && (
                <View style={styles.optionList}>
                  {dateTypeOptions.map(item => (
                    <Pressable
                      key={item.value}
                      style={styles.option}
                      onPress={() => {
                        setDraft(prev => ({ ...prev, dateType: item.value }));
                        setOpenDropdown(null);
                      }}
                    >
                      <Text style={styles.optionText}>{item.label}</Text>
                    </Pressable>
                  ))}
                </View>
              )}

              <Text style={styles.fieldLabel}>Date Range</Text>
              <View style={styles.dateRow}>
                <View style={styles.dateField}>
                  <Pressable
                    style={styles.dateInput}
                    onPress={() => setDatePicker('from')}
                  >
                    <Text
                      style={[
                        styles.selectText,
                        !draft.fromDate && styles.selectPlaceholder,
                      ]}
                    >
                      {draft.fromDate || 'dd-mm-yyyy'}
                    </Text>
                    <Icon family="Feather" name="calendar" size={16} color="#0561B9" />
                  </Pressable>
                </View>
                <View style={styles.dateField}>
                  <Pressable
                    style={styles.dateInput}
                    onPress={() => setDatePicker('to')}
                  >
                    <Text
                      style={[
                        styles.selectText,
                        !draft.toDate && styles.selectPlaceholder,
                      ]}
                    >
                      {draft.toDate || 'dd-mm-yyyy'}
                    </Text>
                    <Icon family="Feather" name="calendar" size={16} color="#0561B9" />
                  </Pressable>
                </View>
              </View>

              <Text style={styles.fieldLabel}>Status</Text>
              <Pressable
                style={styles.selectInput}
                onPress={() =>
                  setOpenDropdown(prev => (prev === 'status' ? null : 'status'))
                }
              >
                <Text
                  style={[
                    styles.selectText,
                    !draft.status && styles.selectPlaceholder,
                  ]}
                >
                  {statusLabel}
                </Text>
                <Icon family="Feather" name="chevron-down" size={18} color="#9AA9BF" />
              </Pressable>
              {openDropdown === 'status' && (
                <View style={styles.optionList}>
                  {statusOptions.map(item => (
                    <Pressable
                      key={item.value}
                      style={styles.option}
                      onPress={() => {
                        setDraft(prev => ({ ...prev, status: item.value }));
                        setOpenDropdown(null);
                      }}
                    >
                      <Text style={styles.optionText}>{item.label}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </ScrollView>

            <View style={styles.footer}>
              <Pressable style={styles.resetBtn} onPress={handleReset}>
                <Text style={styles.resetBtnText}>Reset</Text>
              </Pressable>
              <Pressable style={styles.applyBtn} onPress={handleApply}>
                <Text style={styles.applyBtnText}>Apply Filters</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <DatePicker
        visible={!!datePicker}
        title={datePicker === 'to' ? 'To Date' : 'From Date'}
        value={datePicker === 'to' ? draft.toDate : draft.fromDate}
        minDate={
          datePicker === 'to' ? parseDisplayDate(draft.fromDate) ?? undefined : undefined
        }
        maxDate={
          datePicker === 'from' ? parseDisplayDate(draft.toDate) ?? undefined : undefined
        }
        onClose={() => setDatePicker(null)}
        onSelect={selected => {
          if (datePicker === 'from') {
            setDraft(prev => ({ ...prev, fromDate: selected }));
          } else {
            setDraft(prev => ({ ...prev, toDate: selected }));
          }
          setDatePicker(null);
        }}
      />
    </>
  );
}
