import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../../../components/Header';
import Icon from '../../../components/Icon';
import FilterOptionsModal, {
  type FilterValues,
} from '../../../components/FilterOptionsModal';
import { COLORS } from '../../../assets/themes/colors';
import styles from './QuotationStyle';
import { navigate } from '../../../navigation/NavigationService';
import ShapesBgIcon from '../../../assets/images/shapes-bg.svg';
import FilterIcon from '../../../assets/images/option-filter.svg';
import ProfileIcon from '../../../assets/images/profile.svg';
import { quotationsApi } from '../../../services';
import { toApiDate } from '../../../components/DatePicker';
import type { CrmQuotation, QuotationsPagination } from '../../../services';
import { useAppDispatch } from '../../../store/hooks';
import {
  hideLoader,
  showLoader,
  showToast,
} from '../../../store/slices/viewSlice';
import { textOrFallback } from '../../../utils/Utils';

type FilterType =
  | 'All'
  | 'Discount Status'
  | 'Customer Status';

type QuotationItem = {
  id: string;
  name: string;
  company: string;
  quotationNo: string;
  serviceName: string;
  licenses: string;
  period: string;
  createdBy: string;
  amount: string;
  discount: string;
  status: string;
  invoiceStatus: string;
};

type FetchMode = 'initial' | 'silent' | 'refresh' | 'more';

const FILTERS: FilterType[] = [
  'All',
  'Discount Status',
  'Customer Status',
];

const FILTER_TABS: Record<FilterType, string> = {
  All: 'all',
  'Discount Status': 'discount',
  'Customer Status': 'email',
};

const SEARCH_DEBOUNCE_MS = 400;

const DATE_TYPE_OPTIONS = [
  { value: 'created_at', label: 'Created Date' },
  { value: 'follow_up', label: 'Follow-up Date' },
  { value: 'sent', label: 'Shared Date' },
];

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const DEFAULT_FILTERS: FilterValues = {
  dateType: 'created_at',
  fromDate: '',
  toDate: '',
  status: '',
};

const formatAmount = (value?: string | null) => {
  const amount = Number(value);
  if (value == null || value === '' || Number.isNaN(amount)) return '-';
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatDiscount = (value?: string | null) => {
  if (value == null || value === '') return '';
  return String(value).includes('%') ? String(value) : `${value}%`;
};

const mapQuotation = (
  quotation: CrmQuotation,
  tab: FilterType,
): QuotationItem => ({
  id: String(quotation.id),
  name: textOrFallback(quotation.name),
  company: textOrFallback(quotation.company_name),
  quotationNo: textOrFallback(quotation.quotation_no),
  serviceName: textOrFallback(
    quotation.service_name || quotation.plan_name || quotation.plans?.[0]?.name,
  ),
  licenses: textOrFallback(quotation.quantity),
  period: textOrFallback(quotation.quotation_period),
  createdBy: textOrFallback(quotation.assigned_to),
  amount: formatAmount(quotation.total_amount),
  discount: formatDiscount(quotation.discount),
  status:
    tab === 'Discount Status'
      ? quotation.discount_status?.trim() ||
        quotation.quotation_status?.trim() ||
        ''
      : quotation.quotation_status?.trim() ||
        quotation.customer_status?.trim() ||
        '',
  invoiceStatus: quotation.invoice_status?.trim() || '',
});

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return styles.statusApproved;
    case 'rejected':
      return styles.statusRejected;
    default:
      return styles.statusPending;
  }
};

export default function QuotationView() {
  const dispatch = useAppDispatch();
  const [activeFilter, setActiveFilter] =
    useState<FilterType>('All');
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [menu, setMenu] = useState<{
    id: string;
    top: number;
    right: number;
  } | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(DEFAULT_FILTERS);
  const [quotations, setQuotations] = useState<QuotationItem[]>([]);
  const [pagination, setPagination] = useState<QuotationsPagination | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const requestIdRef = useRef(0);
  const hasLoadedRef = useRef(false);
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedSearch(searchText.trim()),
      SEARCH_DEBOUNCE_MS,
    );
    return () => clearTimeout(timer);
  }, [searchText]);

  const fetchQuotations = useCallback(
    async (page: number, mode: FetchMode) => {
      const requestId = ++requestIdRef.current;

      if (mode === 'initial') {
        dispatch(showLoader({ transparent: true }));
      } else if (mode === 'refresh') {
        setRefreshing(true);
      } else if (mode === 'more') {
        loadingMoreRef.current = true;
        setLoadingMore(true);
      }

      try {
        const response = await quotationsApi.getQuotations({
          page,
          tab: FILTER_TABS[activeFilter],
          status: appliedFilters.status || undefined,
          search: debouncedSearch,
          date_type:
            appliedFilters.fromDate || appliedFilters.toDate
              ? appliedFilters.dateType
              : undefined,
          from: toApiDate(appliedFilters.fromDate) || undefined,
          to: toApiDate(appliedFilters.toDate) || undefined,
        });
        if (requestId !== requestIdRef.current) return;

        if (response.success && response.data) {
          const mapped = (response.data.quotations ?? []).map(item =>
            mapQuotation(item, activeFilter),
          );
          setQuotations(prev => (page > 1 ? [...prev, ...mapped] : mapped));
          setPagination(response.data.pagination ?? null);
          hasLoadedRef.current = true;
          setHasLoaded(true);
        } else {
          dispatch(
            showToast({
              message: response.message || 'Unable to fetch quotations.',
              type: 'error',
            }),
          );
        }
      } catch {
        if (requestId === requestIdRef.current) {
          dispatch(
            showToast({
              message: 'Something went wrong while fetching quotations.',
              type: 'error',
            }),
          );
        }
      } finally {
        if (mode === 'initial') {
          dispatch(hideLoader());
        }
        if (requestId === requestIdRef.current) {
          setRefreshing(false);
          loadingMoreRef.current = false;
          setLoadingMore(false);
        }
      }
    },
    [activeFilter, appliedFilters, debouncedSearch, dispatch],
  );

  useFocusEffect(
    useCallback(() => {
      fetchQuotations(1, hasLoadedRef.current ? 'silent' : 'initial');
    }, [fetchQuotations]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setAppliedFilters(DEFAULT_FILTERS);
      };
    }, []),
  );

  const handleRefresh = () => {
    fetchQuotations(1, 'refresh');
  };

  const handleLoadMore = () => {
    if (!pagination || loadingMoreRef.current || refreshing) return;
    if (pagination.current_page >= pagination.last_page) return;
    fetchQuotations(pagination.current_page + 1, 'more');
  };

  const handleCreateQuotation = () => {
    // TODO:
    // navigation.navigate('CreateQuotation');
  };

  const handleEdit = (item: QuotationItem) => {
    setMenu(null);
    navigate('AddQuotation', { quotationId: item.id });
  };

  const handleSendQuotation = (item: QuotationItem) => {
    setMenu(null);
    // TODO: Send quotation API
    console.log('Send quotation:', item.id);
  };

  const closeMenu = () => setMenu(null);

  const handleMenu = (item: QuotationItem, event: any) => {
    if (menu?.id === item.id) {
      closeMenu();
      return;
    }
    const target = event?.currentTarget;
    if (typeof target?.measureInWindow === 'function') {
      target.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          setMenu({
            id: item.id,
            top: y + height,
            right: Math.max(Dimensions.get('window').width - x - width, 12),
          });
        },
      );
      return;
    }
    setMenu({
      id: item.id,
      top: event?.nativeEvent?.pageY ?? 80,
      right: 20,
    });
  };

  const renderStatusBadge = (
    status: string,
    index: number,
    isCustomer?: boolean,
  ) => {
    if (!status) return null;
    return (
      <View
        key={`${status}-${index}`}
        style={[
          styles.statusBadge,
          getStatusStyle(status),
          isCustomer && styles.customerStatusBadge,
        ]}
      >
        <Text style={styles.statusBadgeText}>{status.toUpperCase()}</Text>
      </View>
    );
  };

  const renderCustomerStatus = (label: string, status: string) => (
    <View style={styles.customerStatusCol}>
      <Text style={styles.customerStatusLabel}>{label}</Text>
      {renderStatusBadge(status || 'pending', 0, true)}
    </View>
  );

  const renderQuotationItem = ({
    item,
  }: {
    item: QuotationItem;
  }) => {
    const isCustomerTab = activeFilter === 'Customer Status';
    const serviceMeta = [
      item.licenses !== '-' ? `${item.licenses} Licenses` : '',
      item.period !== '-' ? item.period : '',
      item.amount !== '-' ? item.amount : '',
      item.discount,
    ]
      .filter(Boolean)
      .join('  |  ');

    return (
      <View style={styles.quotationCard}>
        <View style={styles.cardHeader}>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{item.name}</Text>
            <Text style={styles.companyName}>{item.company}</Text>
          </View>

          <Pressable
            hitSlop={10}
            onPress={event => handleMenu(item, event)}
            style={styles.menuButton}
          >
            <Icon
              family="Feather"
              name="more-vertical"
              size={20}
              color="#6E747D"
            />
          </Pressable>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.quotationNumberContainer}>
            <Text style={styles.quotationNumber}>{item.quotationNo}</Text>
          </View>

          {!isCustomerTab && (
            <View style={styles.statusRow}>
              {renderStatusBadge(item.status, 0)}
            </View>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.serviceRow}>
          <View style={styles.serviceIcon}>
            <View style={styles.serviceIconGrid}>
              <View style={[styles.serviceIconCell, styles.serviceIconBlue]} />
              <View style={[styles.serviceIconCell, styles.serviceIconRed]} />
              <View style={[styles.serviceIconCell, styles.serviceIconGreen]} />
              <View style={[styles.serviceIconCell, styles.serviceIconYellow]} />
            </View>
          </View>

          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName} numberOfLines={1}>
              {item.serviceName}
            </Text>
            {!!serviceMeta && (
              <Text style={styles.serviceMeta} numberOfLines={2}>
                {serviceMeta}
              </Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.createdByRow,
            isCustomerTab && styles.createdByRowCustomer,
          ]}
        >
          <View style={styles.createdByContainer}>
            <ProfileIcon width={15} height={15} />
            <Text style={styles.createdByText} numberOfLines={1}>
              Created by: {item.createdBy}
            </Text>
          </View>

          {isCustomerTab && (
            <View style={styles.customerStatusGroup}>
              {renderCustomerStatus('Quotation', item.status)}
              {renderCustomerStatus('Invoice', item.invoiceStatus)}
            </View>
          )}
        </View>

        {!isCustomerTab && (
          <View style={styles.actionRow}>
            <Pressable
              style={({ pressed }) => [
                styles.editButton,
                { opacity: pressed ? 0.8 : 1 },
              ]}
              onPress={() => handleEdit(item)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.sendButton,
                { opacity: pressed ? 0.8 : 1 },
              ]}
              onPress={() => handleSendQuotation(item)}
            >
              <Text style={styles.sendButtonText}>Send Quotation</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top']}
    >
      {/* Header - Fixed */}
      <Header title="Quotations" />
  
      <View style={styles.headerShadow} />
  
      <View style={styles.content}>
        <FlatList
          data={quotations}
          keyExtractor={item => item.id}
          renderItem={renderQuotationItem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContent}
          style={styles.quotationList}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                size="small"
                color={COLORS.PRIMARY}
                style={styles.footerLoader}
              />
            ) : null
          }
          ListHeaderComponent={
            <View>
              {/* Search */}
              <View style={styles.searchRow}>
                <View style={styles.searchContainer}>
                  <Icon
                    family="Feather"
                    name="search"
                    size={21}
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
                  style={({ pressed }) => [
                    styles.filterButton,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                  onPress={() => setFilterVisible(true)}
                  accessibilityRole="button"
                  accessibilityLabel="Open filters"
                >
                  <FilterIcon width={20} height={20} />
                </Pressable>
              </View>
  
              {/* Create Quotation Banner */}
              <View style={styles.quotationCardBanner}>
                {/* Background decorative pattern */}
                <ShapesBgIcon
                  style={styles.quotationPatternBg}
                />
  
                <View style={styles.quotationCardContent}>
                  {/* Icon + Text */}
                  <View style={styles.quotationTopRow}>
                    <View style={styles.quotationIconTile}>
                      <Icon
                        family="Feather"
                        name="file-text"
                        size={24}
                        color="#0561B9"
                      />
                    </View>
  
                    <View style={styles.quotationTextWrap}>
                      <Text style={styles.quotationTitle}>
                        Create New Quotation
                      </Text>
  
                      <Text style={styles.quotationSubtitle}>
                        Add quotation details and share pricing
                        {'\n'}
                        with the customer.
                      </Text>
                    </View>
                  </View>
  
                  {/* Add Quotation Button */}
                  <Pressable
                    style={({pressed}) => [
                      styles.quotationCtaButton,
                      {
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                    onPress={() => {
                      navigate('AddQuotation', {});
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Add Quotation"
                  >
                    <Text
                      style={styles.quotationCtaButtonText}>
                      Add Quotation
                    </Text>
                  </Pressable>
                </View>
              </View>
  
              {/* Filters */}
              <View style={styles.filterTabs}>
                {FILTERS.map(filter => {
                  const active = activeFilter === filter;
  
                  return (
                    <Pressable
                      key={filter}
                      onPress={() =>
                        setActiveFilter(filter)
                      }
                      style={[
                        styles.filterTab,
                        active &&
                          styles.activeFilterTab,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterTabText,
                          active &&
                            styles.activeFilterTabText,
                        ]}
                        numberOfLines={1}
                      >
                        {filter}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          }
          ListEmptyComponent={
            hasLoaded ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No quotations found
                </Text>
              </View>
            ) : null
          }
        />
  
        <FilterOptionsModal
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          value={appliedFilters}
          dateTypeOptions={DATE_TYPE_OPTIONS}
          statusOptions={STATUS_OPTIONS}
          onApply={setAppliedFilters}
        />

        {/* Floating Add Button - Fixed */}
        <Pressable
          style={({pressed}) => [
            styles.floatingButton,
            {
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={() => {
            navigate('AddQuotation', {});
          }}
        >
          <Icon
            family="Feather"
            name="plus"
            size={31}
            color={COLORS.WHITE}
          />
        </Pressable>
      </View>

      <Modal
        visible={!!menu}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.menuOverlay} onPress={closeMenu}>
          <Pressable
            style={[
              styles.dropdownMenu,
              menu ? { top: menu.top, right: menu.right } : null,
            ]}
            onPress={() => {}}
          >
            <Pressable
              style={styles.dropdownItem}
              onPress={() => {
                const item = quotations.find(row => row.id === menu?.id);
                if (item) handleEdit(item);
              }}
            >
              <Icon family="Feather" name="edit-2" size={15} color="#555D68" />
              <Text style={styles.dropdownText}>Edit</Text>
            </Pressable>
            <Pressable
              style={styles.dropdownItem}
              onPress={() => {
                const item = quotations.find(row => row.id === menu?.id);
                if (item) handleSendQuotation(item);
              }}
            >
              <Icon family="Feather" name="send" size={15} color="#555D68" />
              <Text style={styles.dropdownText}>Send Quotation</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}