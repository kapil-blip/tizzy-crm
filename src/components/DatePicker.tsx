import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from './Icon';
import { COLORS } from '../assets/themes/colors';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatDisplayDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const parseDisplayDate = (value: string): Date | null => {
  if (!value) return null;
  const parts = value.split('/');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map(Number);
  if (!day || !month || !year) return null;
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
};

/** Converts "dd/mm/yyyy" to the API's "yyyy-mm-dd"; returns "" when empty or invalid. */
export const toApiDate = (value: string) => {
  const date = parseDisplayDate(value);
  if (!date) return '';
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

type DatePickerProps = {
  visible: boolean;
  title: string;
  value: string;
  minDate?: Date;
  maxDate?: Date;
  onClose: () => void;
  onSelect: (displayDate: string) => void;
};

export default function DatePicker({
  visible,
  title,
  value,
  minDate,
  maxDate,
  onClose,
  onSelect,
}: DatePickerProps) {
  const selected = parseDisplayDate(value);
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfDay(selected ?? new Date()),
  );

  useEffect(() => {
    if (visible) {
      setVisibleMonth(startOfDay(parseDisplayDate(value) ?? new Date()));
    }
  }, [visible, value]);

  const min = minDate ? startOfDay(minDate) : undefined;
  const max = maxDate ? startOfDay(maxDate) : undefined;

  const days = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: Array<Date | null> = [];

    for (let i = 0; i < firstDay; i += 1) {
      cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(year, month, day));
    }
    while (cells.length % 7 !== 0) {
      cells.push(null);
    }
    return cells;
  }, [visibleMonth]);

  const canGoPrev =
    !min ||
    new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 0) >= min;
  const nextMonthStart = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    1,
  );
  const canGoNext = !max || nextMonthStart <= max;

  const isDisabled = (date: Date) => {
    const day = startOfDay(date);
    if (min && day < min) return true;
    if (max && day > max) return true;
    return false;
  };

  const isSelected = (date: Date) =>
    Boolean(
      selected &&
        date.getFullYear() === selected.getFullYear() &&
        date.getMonth() === selected.getMonth() &&
        date.getDate() === selected.getDate(),
    );

  const isToday = (date: Date) =>
    startOfDay(date).getTime() === startOfDay(new Date()).getTime();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPress} onPress={onClose} />
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <Icon
                family="MaterialCommunityIcons"
                name="close"
                size={20}
                color="#64748B"
              />
            </Pressable>
          </View>

          <View style={styles.monthRow}>
            <Pressable
              onPress={() =>
                canGoPrev &&
                setVisibleMonth(
                  new Date(
                    visibleMonth.getFullYear(),
                    visibleMonth.getMonth() - 1,
                    1,
                  ),
                )
              }
              hitSlop={8}
              style={!canGoPrev && styles.navDisabled}
              disabled={!canGoPrev}
            >
              <Icon
                family="MaterialCommunityIcons"
                name="chevron-left"
                size={24}
                color={COLORS.GREY_900}
              />
            </Pressable>
            <Text style={styles.monthLabel}>
              {MONTHS[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
            </Text>
            <Pressable
              onPress={() =>
                canGoNext &&
                setVisibleMonth(
                  new Date(
                    visibleMonth.getFullYear(),
                    visibleMonth.getMonth() + 1,
                    1,
                  ),
                )
              }
              hitSlop={8}
              style={!canGoNext && styles.navDisabled}
              disabled={!canGoNext}
            >
              <Icon
                family="MaterialCommunityIcons"
                name="chevron-right"
                size={24}
                color={COLORS.GREY_900}
              />
            </Pressable>
          </View>

          <View style={styles.weekRow}>
            {WEEKDAYS.map((day, index) => (
              <Text key={`${day}-${index}`} style={styles.weekday}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.grid}>
            {days.map((date, index) => {
              if (!date) {
                return <View key={`empty-${index}`} style={styles.dayCell} />;
              }
              const disabled = isDisabled(date);
              const selectedDay = isSelected(date);
              return (
                <Pressable
                  key={date.toISOString()}
                  style={styles.dayCell}
                  disabled={disabled}
                  onPress={() => {
                    onSelect(formatDisplayDate(date));
                    onClose();
                  }}
                >
                  <View
                    style={[
                      styles.dayInner,
                      selectedDay && styles.daySelected,
                      !selectedDay && isToday(date) && styles.dayToday,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        selectedDay && styles.dayTextSelected,
                        disabled && styles.dayTextDisabled,
                      ]}
                    >
                      {date.getDate()}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backdropPress: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'BalooBhai2-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.GREY_900,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  navDisabled: {
    opacity: 0.3,
  },
  monthLabel: {
    fontFamily: 'BalooBhai2-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.GREY_900,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 12,
    color: COLORS.GREY_400,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelected: {
    backgroundColor: COLORS.PRIMARY,
  },
  dayToday: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  dayText: {
    fontFamily: 'BalooBhai2-Medium',
    fontSize: 13,
    color: COLORS.GREY_800,
  },
  dayTextSelected: {
    color: '#FFFFFF',
  },
  dayTextDisabled: {
    color: '#C5CDD6',
  },
});
