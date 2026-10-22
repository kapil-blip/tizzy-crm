import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './AddQuotationStyle.ts';
import Icon from '../../../../components/Icon.tsx';
import DatePicker, {
  formatDisplayDate,
  toApiDate,
} from '../../../../components/DatePicker';
import { COLORS } from '../../../../assets/themes/colors.ts';
import { quotationsApi } from '../../../../services/apiservices/quotationsApi.ts';
import { leadsApi } from '../../../../services/apiservices/leadsApi.ts';
import type { CheckDomainResponse } from '../../../../services';
import { useAppDispatch } from '../../../../store/hooks';
import {
  hideLoader,
  showLoader,
  showToast,
} from '../../../../store/slices/viewSlice';

type PlanDetail = {
  id: number;
  fromServiceId: number | null;
  providerId: number | null;
  provider: string;
  planId: number | null;
  plan: string;
  billingCycle: string;
  startDate: string;
  sku: string;
  quantity: string;
  rate: string;
};

const PERIODS = [
  'Monthly',
  'Quarterly',
  'Half Yearly',
  'Yearly',
];

const NO_DOMAIN = 'No domain';
const EXISTING_DOMAIN = 'Already have domain';
const NEW_DOMAIN = 'Need new domain';
const DOMAIN_OPTIONS = [NO_DOMAIN, EXISTING_DOMAIN, NEW_DOMAIN];

type DropdownType =
  | 'lead'
  | 'title'
  | 'orderType'
  | 'domainOption'
  | 'provider'
  | 'plan'
  | 'billingCycle';

type PlanFieldError = {
  provider?: string;
  plan?: string;
  billingCycle?: string;
  sku?: string;
  quantity?: string;
  rate?: string;
};

type FieldErrors = {
  companyName?: string;
  gstin?: string;
  name?: string;
  email?: string;
  discount?: string;
  orderType?: string;
  plans?: Record<number, PlanFieldError>;
};

const REQUIRED_MSG = 'This field is required';
const isEmpty = (value: unknown) => !String(value ?? '').trim();
const TOP_FIELD_ORDER: (keyof FieldErrors)[] = [
  'companyName',
  'gstin',
  'name',
  'email',
  'discount',
  'orderType',
];
const PLAN_FIELD_ORDER: (keyof PlanFieldError)[] = [
  'provider',
  'plan',
  'billingCycle',
  'sku',
  'quantity',
  'rate',
];

const createEmptyPlan = (): PlanDetail => ({
  id: Date.now(),
  fromServiceId: null,
  providerId: null,
  provider: '',
  planId: null,
  plan: '',
  billingCycle: '',
  startDate: '',
  sku: '',
  quantity: '',
  rate: '',
});

const toDisplayDate = (value?: string | null) => {
  if (!value) return '';
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(value);
  return Number.isNaN(date.getTime()) ? '' : formatDisplayDate(date);
};

const getLeadDomainName = (leadData: any) => {
  if (!leadData) return '';
  if (typeof leadData.domain === 'string') return leadData.domain.trim();
  if (leadData.domain && typeof leadData.domain === 'object') {
    return String(leadData.domain.domain ?? '').trim();
  }
  return String(leadData.domain_name ?? '').trim();
};

const AddQuotationView = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useAppDispatch();
  const quotationId = route.params?.quotationId as string | number | undefined;
  const isEdit = quotationId != null && quotationId !== '';

  const [lead, setLead] = useState<any>(null);
  const [companyName, setCompanyName] = useState('');
  const [gstin, setGstin] = useState('');
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileCode, setMobileCode] = useState('91');
  const [mobile, setMobile] = useState('');
  const [discount, setDiscount] = useState('');
  const [orderType, setOrderType] = useState('');

  const [domainOption, setDomainOption] = useState(NO_DOMAIN);
  const [domain, setDomain] = useState('');
  const [domainStart, setDomainStart] = useState('');
  const [domainEnd, setDomainEnd] = useState('');
  const [domainSac, setDomainSac] = useState('');
  const [domainRate, setDomainRate] = useState('');
  const [domainChecking, setDomainChecking] = useState(false);
  const [domainStatus, setDomainStatus] = useState<CheckDomainResponse | null>(
    null,
  );
  const [datePicker, setDatePicker] = useState<{
    title: string;
    value: string;
    onSelect: (value: string) => void;
  } | null>(null);
  const [createFormData, setCreateFormData] = useState<any>(null);

  const [plans, setPlans] = useState<PlanDetail[]>([
    { ...createEmptyPlan(), id: 1 },
  ]);
  const [errors, setErrors] = useState<FieldErrors>({});

  const [dropdown, setDropdown] = useState<{
    visible: boolean;
    type: DropdownType | null;
    planId?: number;
  }>({
    visible: false,
    type: null,
  });
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(0);
  const fieldRefs = useRef<Record<string, View | null>>({});
  const inputRefs = useRef<Record<string, TextInput | null>>({});

  const applyQuotation = (quotation: any) => {
    const leadData = quotation.lead ?? {
      id: quotation.lead_id,
      company_name: quotation.company_name,
      name: quotation.name,
    };
    setLead(leadData);
    setCompanyName(quotation.company_name ?? '');
    setGstin(quotation.gstin ?? '');
    setTitle(quotation.salutation ?? '');
    setName(quotation.name ?? '');
    setEmail(quotation.email ?? '');
    setMobileCode(
      String(quotation.mobile_code ?? leadData?.mobile_code ?? '91').replace(
        /^\+/,
        '',
      ),
    );
    setMobile(leadData?.mobile ?? '');
    setDiscount(
      quotation.discount != null && quotation.discount !== ''
        ? String(quotation.discount)
        : '',
    );
    setOrderType(quotation.deal_type ?? '');

    const domainType = String(
      quotation.domain_type ?? leadData?.domain_type ?? '',
    ).toLowerCase();
    const domainName = quotation.domain_name || getLeadDomainName(leadData);
    setDomain(domainName);
    setDomainSac(quotation.sac ?? leadData?.sac ?? '');
    setDomainRate(
      quotation.domain_rate != null && quotation.domain_rate !== ''
        ? String(quotation.domain_rate)
        : '',
    );
    setDomainStart(toDisplayDate(quotation.domain_start));
    setDomainEnd(toDisplayDate(quotation.domain_end));
    setDomainStatus(null);
    setDomainOption(
      domainType === 'new'
        ? NEW_DOMAIN
        : domainType === 'existing' || domainName
          ? EXISTING_DOMAIN
          : NO_DOMAIN,
    );

    const quotationPlans = quotation.plans ?? [];
    if (!quotationPlans.length) {
      setPlans([{ ...createEmptyPlan(), id: 1 }]);
      return;
    }
    setPlans(
      quotationPlans.map((item: any, index: number) => ({
        id: Date.now() + index,
        fromServiceId: item.from_service_id ? Number(item.from_service_id) : null,
        providerId: item.provider_id != null ? Number(item.provider_id) : null,
        provider: item.provider_name ?? '',
        planId: item.plan_id != null ? Number(item.plan_id) : null,
        plan: item.name ?? '',
        billingCycle: item.quote_period ?? '',
        startDate: toDisplayDate(item.billing_start_date),
        sku: item.sku ?? '',
        quantity: item.quantity != null ? String(item.quantity) : '',
        rate: item.rate != null && item.rate !== '' ? String(item.rate) : '',
      })),
    );
  };

  useEffect(() => {
    const loadForm = async () => {
      dispatch(showLoader({ transparent: true }));
      try {
        const formResponse = await quotationsApi.getCreateFormData();
        if (formResponse.success === false) {
          Alert.alert('Error', formResponse.message);
        } else if (formResponse.data) {
          setCreateFormData(formResponse.data);
          if (!isEdit) {
            if (formResponse.data.sample?.deal_type) {
              setOrderType(formResponse.data.sample.deal_type);
            }
            if (formResponse.data.sample?.salutation) {
              setTitle(formResponse.data.sample.salutation);
            }
          }
        }

        if (isEdit && quotationId != null) {
          const detailResponse = await quotationsApi.getQuotationById(
            quotationId,
          );
          if (detailResponse.success && detailResponse.data?.quotation) {
            applyQuotation(detailResponse.data.quotation);
          } else {
            dispatch(
              showToast({
                message:
                  detailResponse.message || 'Unable to fetch quotation.',
                type: 'error',
              }),
            );
          }
        }
      } catch {
        dispatch(
          showToast({
            message: 'Something went wrong while loading quotation.',
            type: 'error',
          }),
        );
      } finally {
        dispatch(hideLoader());
      }
    };

    loadForm();
  }, [dispatch, isEdit, quotationId]);

  const fetchLeadDetails = async (leadId: number | string) => {
    try {
      // setLeadLoading(true);
      const response = await leadsApi.getLeadById(leadId);
      console.log('Lead details response:', response);
      if (response.success === false) {
        Alert.alert('Error', response.message || 'Failed to fetch lead details');
        return;
      }
      const leadDetails = response.data?.lead ?? response.data;
      applyLeadFields(leadDetails);
      applyLeadPlans(leadDetails);
    } catch (error: any) {
      console.log('Fetch lead details failed:', {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      Alert.alert('Error', 'Unable to fetch lead details.');
    } finally {
      // setLeadLoading(false);
    }
  };

  const applyLeadFields = (leadData: any) => {
    setCompanyName(leadData?.company_name ?? '');
    setGstin(leadData?.gstin ?? '');
    setTitle(leadData?.salutation ?? title);
    setName(leadData?.name ?? '');
    setEmail(leadData?.email ?? '');
    setMobileCode(String(leadData?.mobile_code ?? '91').replace(/^\+/, ''));
    setMobile(leadData?.mobile ?? '');
    applyLeadDomain(leadData);
    setErrors(prev => ({
      ...prev,
      companyName: undefined,
      gstin: undefined,
      name: undefined,
      email: undefined,
    }));
  };

  const applyLeadPlans = (leadData: any) => {
    const details = (leadData?.our_service_plan_detail ?? []).filter(
      (item: any) => item && item.is_info !== true,
    );
    if (!details.length) {
      setPlans([{ ...createEmptyPlan(), id: 1 }]);
      setErrors(prev => ({ ...prev, plans: undefined }));
      return;
    }

    setPlans(
      details.map((item: any, index: number) => ({
        id: item.id ?? Date.now() + index,
        fromServiceId: item.id ?? null,
        providerId: item.provider_id ?? item.provider?.id ?? null,
        provider: item.provider?.name ?? '',
        planId: item.plan_id ?? item.plan?.id ?? null,
        plan: item.plan?.name ?? '',
        billingCycle: item.quote_period ?? '',
        startDate: '',
        sku: item.sku ?? item.plan?.slug ?? '',
        quantity: item.quantity != null ? String(item.quantity) : '',
        rate:
          item.rate != null && item.rate !== '' ? String(item.rate) : '',
      })),
    );
    setErrors(prev => ({ ...prev, plans: undefined }));
  };

  const applyLeadDomain = (leadData: any) => {
    const domainInfo =
      leadData?.domain && typeof leadData.domain === 'object'
        ? leadData.domain
        : null;
    const domainName = getLeadDomainName(leadData);
    const rate = domainInfo?.domain_rate ?? leadData?.domain_rate;

    setDomain(domainName);
    setDomainSac(domainInfo?.sac ?? leadData?.sac ?? '');
    setDomainRate(rate != null && rate !== '' ? String(rate) : '');
    setDomainStart(
      toDisplayDate(domainInfo?.domain_start ?? leadData?.domain_start),
    );
    setDomainEnd(toDisplayDate(domainInfo?.domain_end ?? leadData?.domain_end));
    setDomainStatus(null);
    setDomainOption(domainName ? EXISTING_DOMAIN : NO_DOMAIN);
  };

  const checkDomainAvailability = async () => {
    const value = domain.trim();
    if (!value) {
      Alert.alert('Info', 'Enter domain name first.');
      return;
    }

    setDomainChecking(true);
    setDomainStatus(null);
    try {
      const response = await leadsApi.checkDomain(value);
      setDomainStatus(
        response.success && response.data
          ? response.data
          : {
              ok: false,
              available: false,
              message: response.message || 'Unable to verify domain',
            },
      );
    } catch {
      setDomainStatus({
        ok: false,
        available: false,
        message: 'Unable to verify domain',
      });
    } finally {
      setDomainChecking(false);
    }
  };

  const openDropdown = (
    type: DropdownType,
    planId?: number,
  ) => {
    setDropdown({
      visible: true,
      type,
      planId,
    });
  };

  const closeDropdown = () => {
    setDropdown({
      visible: false,
      type: null,
    });
  };

  const getDropdownTitle = () => {
    switch (dropdown.type) {
      case 'lead':
        return 'Select Lead';
      case 'title':
        return 'Select Title';
      case 'orderType':
        return 'Select Order Type';
      case 'domainOption':
        return 'Select Domain Option';
      case 'provider':
        return 'Select Provider';
      case 'plan':
        return 'Select Plan';
      case 'billingCycle':
        return 'Select Billing Cycle';
    }
  };

  const getDealTypeOptions = () => {
    const dealType = createFormData?.options?.deal_type;
    if (!dealType) return [{ value: 'new', label: 'New' }];
    if (Array.isArray(dealType)) {
      return dealType.map((item: string) => ({ value: item, label: item }));
    }
    return Object.entries(dealType).map(([value, label]) => ({
      value,
      label: String(label),
    }));
  };

  const getOrderTypeLabel = () => {
    const match = getDealTypeOptions().find(
      item => item.value === orderType || item.label === orderType,
    );
    return match?.label || orderType;
  };

  const getDropdownItems = () => {
    if (dropdown.type === 'lead') {
      return createFormData?.leads ?? [];
    }
    if (dropdown.type === 'title') {
      return createFormData?.options?.salutation ?? [];
    }
    if (dropdown.type === 'orderType') {
      return getDealTypeOptions();
    }
    if (dropdown.type === 'domainOption') {
      return DOMAIN_OPTIONS;
    }
    if (dropdown.type === 'provider') {
      return createFormData?.providers ?? [];
    }
    if (dropdown.type === 'plan') {
      const current = plans.find(item => item.id === dropdown.planId);
      if (current?.providerId == null) return [];
      return (
        createFormData?.plans?.[String(current.providerId)] ??
        createFormData?.plans?.[current.providerId] ??
        []
      );
    }
    if (dropdown.type === 'billingCycle') {
      return createFormData?.options?.quote_period ?? PERIODS;
    }
    return [];
  };

  const handleDropdownSelect = (value: any) => {
    if (dropdown.type === 'title') {
      setTitle(value);
    } else if (dropdown.type === 'lead') {
      setLead(value);
      applyLeadFields(value);
      fetchLeadDetails(value.id);
    } else if (dropdown.type === 'orderType') {
      setOrderType(value?.value ?? value);
      clearError('orderType');
    } else if (dropdown.type === 'domainOption') {
      setDomainOption(value);
      setDomainStatus(null);
    } else if (dropdown.type === 'provider' && dropdown.planId !== undefined) {
      setPlans(prev =>
        prev.map(item =>
          item.id === dropdown.planId
            ? {
                ...item,
                providerId: value.id,
                provider: value.name,
                planId: null,
                plan: '',
                sku: '',
                rate: '',
              }
            : item,
        ),
      );
      clearPlanError(dropdown.planId, 'provider');
    } else if (dropdown.type === 'plan' && dropdown.planId !== undefined) {
      setPlans(prev =>
        prev.map(item =>
          item.id === dropdown.planId
            ? {
                ...item,
                planId: value.id,
                plan: value.name,
                sku: value.sku ?? '',
                rate: value.rate != null ? String(value.rate) : '',
              }
            : item,
        ),
      );
      clearPlanError(dropdown.planId, 'plan');
      clearPlanError(dropdown.planId, 'sku');
      clearPlanError(dropdown.planId, 'rate');
    } else if (
      dropdown.type === 'billingCycle' &&
      dropdown.planId !== undefined
    ) {
      setPlans(prev =>
        prev.map(item =>
          item.id === dropdown.planId
            ? { ...item, billingCycle: value }
            : item,
        ),
      );
      clearPlanError(dropdown.planId, 'billingCycle');
    }

    closeDropdown();
  };

  const addPlan = () => {
    setPlans(prev => [...prev, createEmptyPlan()]);
  };

  const removePlan = (id: number) => {
    setPlans(prev => (prev.length === 1 ? prev : prev.filter(item => item.id !== id)));
    setErrors(prev => {
      if (!prev.plans?.[id]) return prev;
      const nextPlans = { ...prev.plans };
      delete nextPlans[id];
      return {
        ...prev,
        plans: Object.keys(nextPlans).length ? nextPlans : undefined,
      };
    });
    if (dropdown.planId === id) closeDropdown();
  };

  const updatePlan = (
    id: number,
    field: keyof PlanDetail,
    value: string,
  ) => {
    setPlans(prev =>
      prev.map(item =>
        item.id === id
          ? {
            ...item,
            [field]: value,
          }
          : item,
      ),
    );
    if (
      field === 'sku' ||
      field === 'quantity' ||
      field === 'rate' ||
      field === 'billingCycle'
    ) {
      clearPlanError(id, field);
    }
  };

  const clearError = (key: keyof FieldErrors) => {
    setErrors(prev => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const clearPlanError = (planId: number, field: keyof PlanFieldError) => {
    setErrors(prev => {
      if (!prev.plans?.[planId]?.[field]) return prev;
      return {
        ...prev,
        plans: {
          ...prev.plans,
          [planId]: { ...prev.plans[planId], [field]: undefined },
        },
      };
    });
  };

  const getFirstErrorKey = (next: FieldErrors) => {
    for (const key of TOP_FIELD_ORDER) {
      if (next[key]) return key;
    }
    for (const item of plans) {
      const planError = next.plans?.[item.id];
      if (!planError) continue;
      for (const field of PLAN_FIELD_ORDER) {
        if (planError[field]) return `plan-${item.id}-${field}`;
      }
    }
    return null;
  };

  const focusFirstError = (next: FieldErrors) => {
    const key = getFirstErrorKey(next);
    if (!key) return;

    const node = fieldRefs.current[key];
    node?.measureInWindow((_x, y) => {
      const nextY = scrollY.current + y - 120;
      scrollRef.current?.scrollTo({
        y: Math.max(nextY, 0),
        animated: true,
      });
    });

    setTimeout(() => {
      inputRefs.current[key]?.focus();
    }, 350);
  };

  const validateForm = () => {
    const next: FieldErrors = {};
    if (isEmpty(companyName)) next.companyName = REQUIRED_MSG;
    if (isEmpty(gstin)) next.gstin = REQUIRED_MSG;
    if (isEmpty(name)) next.name = REQUIRED_MSG;
    if (isEmpty(email)) next.email = REQUIRED_MSG;
    if (isEmpty(discount)) next.discount = REQUIRED_MSG;
    if (isEmpty(orderType)) next.orderType = REQUIRED_MSG;

    const planErrors: Record<number, PlanFieldError> = {};
    plans.forEach(item => {
      const planError: PlanFieldError = {};
      if (isEmpty(item.provider)) planError.provider = REQUIRED_MSG;
      if (isEmpty(item.plan)) planError.plan = REQUIRED_MSG;
      if (isEmpty(item.billingCycle)) planError.billingCycle = REQUIRED_MSG;
      if (isEmpty(item.sku)) planError.sku = REQUIRED_MSG;
      if (isEmpty(item.quantity)) planError.quantity = REQUIRED_MSG;
      if (isEmpty(item.rate)) planError.rate = REQUIRED_MSG;
      if (Object.keys(planError).length) {
        planErrors[item.id] = planError;
      }
    });
    if (Object.keys(planErrors).length) next.plans = planErrors;

    setErrors(next);
    return next;
  };

  const handleSave = async () => {
    const next = validateForm();
    if (Object.keys(next).length) {
      setTimeout(() => focusFirstError(next), 50);
      return;
    }

    const isNewDomain = domainOption === NEW_DOMAIN;
    const isExistingDomain = domainOption === EXISTING_DOMAIN;

    const payload = {
      deal_type: orderType,
      lead_id: lead?.id ?? null,
      salutation: title,
      name: name.trim(),
      company_name: companyName.trim(),
      gstin: gstin.trim(),
      email: email.trim(),
      mobile_code: mobileCode,
      mobile: mobile.trim(),
      discount: discount ? Number(discount) : 0,
      domain_type: isNewDomain ? 'new' : isExistingDomain ? 'existing' : '',
      domain_name:
        isNewDomain || isExistingDomain ? domain.trim().toLowerCase() : '',
      domain_rate: isNewDomain && domainRate ? Number(domainRate) : null,
      sac: isNewDomain ? domainSac.trim() : '',
      domain_start: isNewDomain ? toApiDate(domainStart) : '',
      domain_end: isNewDomain ? toApiDate(domainEnd) : '',
      plans: plans.map(item => ({
        from_service_id: item.fromServiceId,
        provider_id: item.providerId,
        plan_id: item.planId,
        quote_period: item.billingCycle,
        billing_start_date: toApiDate(item.startDate),
        sku: item.sku.trim(),
        quantity: Number(item.quantity) || 1,
        rate: item.rate ? Number(item.rate) : null,
      })),
    };

    dispatch(showLoader({ transparent: true }));
    try {
      const response = isEdit
        ? await quotationsApi.updateQuotation(quotationId as string | number, payload)
        : await quotationsApi.createQuotation(payload);
      if (response.success) {
        dispatch(
          showToast({
            message:
              response.message ||
              (isEdit
                ? 'Quotation updated successfully.'
                : 'Quotation saved successfully.'),
            type: 'success',
          }),
        );
        navigation.goBack();
      } else {
        dispatch(
          showToast({
            message:
              response.message ||
              (isEdit ? 'Unable to update quotation.' : 'Unable to save quotation.'),
            type: 'error',
          }),
        );
      }
    } catch {
      dispatch(
        showToast({
          message: `Something went wrong while ${
            isEdit ? 'updating' : 'saving'
          } quotation.`,
          type: 'error',
        }),
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  const renderLabel = (label: string, required?: boolean) => (
    <Text style={styles.label}>
      {label}
      {required ? <Text style={styles.requiredMark}> *</Text> : null}
    </Text>
  );

  const renderError = (message?: string) =>
    message ? <Text style={styles.errorText}>{message}</Text> : null;

  const renderDropdownField = (
    label: string,
    value: any,
    placeholder: string,
    type: DropdownType,
    planId?: number,
    required?: boolean,
    error?: string,
    fieldKey?: string,
  ) => {
    return (
      <View
        style={styles.fieldContainer}
        collapsable={false}
        ref={node => {
          if (fieldKey) fieldRefs.current[fieldKey] = node;
        }}
      >
        {renderLabel(label, required)}

        <Pressable
          style={styles.dropdown}
          onPress={() => openDropdown(type, planId)}>
          <Text
            style={[
              styles.dropdownText,
              !value && styles.placeholderText,
            ]}>
            {value || placeholder}
          </Text>
          <Icon name="chevron-down" size={20} color={COLORS.GREY_800} />
        </Pressable>
        {renderError(error)}
      </View>
    );
  };

  const renderPlan = (item: PlanDetail, index: number) => {
    const planError = errors.plans?.[item.id];
    return (
      <View style={styles.planCard} key={item.id}>
        <View style={styles.serialRow}>
          <Text style={styles.serialText}>Sr No : {index + 1}</Text>
          {plans.length > 1 ? (
            <Pressable
              style={styles.planClose}
              onPress={() => removePlan(item.id)}
              hitSlop={8}
            >
              <Icon family="Feather" name="x" size={16} color="#8B929D" />
            </Pressable>
          ) : null}
        </View>

        {renderDropdownField(
          'Provider',
          item.provider,
          'Select provider',
          'provider',
          item.id,
          true,
          planError?.provider,
          `plan-${item.id}-provider`,
        )}

        {renderDropdownField(
          'Plan',
          item.plan,
          'Select plan',
          'plan',
          item.id,
          true,
          planError?.plan,
          `plan-${item.id}-plan`,
        )}

        {renderDropdownField(
          'Billing Cycle',
          item.billingCycle,
          'Select billing cycle',
          'billingCycle',
          item.id,
          true,
          planError?.billingCycle,
          `plan-${item.id}-billingCycle`,
        )}

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Start Date</Text>
          <Pressable
            style={styles.dropdown}
            onPress={() =>
              setDatePicker({
                title: 'Start Date',
                value: item.startDate,
                onSelect: value => updatePlan(item.id, 'startDate', value),
              })
            }
          >
            <Text
              style={[
                styles.dropdownText,
                !item.startDate && styles.placeholderText,
              ]}
            >
              {item.startDate || 'dd/mm/yyyy'}
            </Text>
            <Icon
              family="Feather"
              name="calendar"
              size={16}
              color="#0561B9"
            />
          </Pressable>
        </View>

        <View
          style={styles.fieldContainer}
          collapsable={false}
          ref={node => {
            fieldRefs.current[`plan-${item.id}-sku`] = node;
          }}
        >
          {renderLabel('SKU', true)}
          <TextInput
            ref={node => {
              inputRefs.current[`plan-${item.id}-sku`] = node;
            }}
            style={styles.input}
            value={item.sku}
            onChangeText={value => updatePlan(item.id, 'sku', value)}
            placeholderTextColor="#9AAAC0"
          />
          {renderError(planError?.sku)}
        </View>

        <View
          style={styles.fieldContainer}
          collapsable={false}
          ref={node => {
            fieldRefs.current[`plan-${item.id}-quantity`] = node;
          }}
        >
          {renderLabel('Quantity', true)}
          <TextInput
            ref={node => {
              inputRefs.current[`plan-${item.id}-quantity`] = node;
            }}
            style={styles.input}
            value={item.quantity}
            keyboardType="numeric"
            onChangeText={value => updatePlan(item.id, 'quantity', value)}
            placeholderTextColor="#9AAAC0"
          />
          {renderError(planError?.quantity)}
        </View>

        <View
          style={styles.fieldContainer}
          collapsable={false}
          ref={node => {
            fieldRefs.current[`plan-${item.id}-rate`] = node;
          }}
        >
          {renderLabel('Rate', true)}
          <TextInput
            ref={node => {
              inputRefs.current[`plan-${item.id}-rate`] = node;
            }}
            style={styles.input}
            value={item.rate}
            keyboardType="decimal-pad"
            onChangeText={value => updatePlan(item.id, 'rate', value)}
            placeholderTextColor="#9AAAC0"
          />
          {renderError(planError?.rate)}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          {isEdit ? 'Edit Quotation' : 'Quotations'}
        </Text>
      </View>

      <View style={styles.headerShadow} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onScroll={event => {
            scrollY.current = event.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}>

          {/* Quotation Detail */}
          <Text style={styles.sectionTitle}>Quotation Detail</Text>

          {renderDropdownField(
            'Lead',
            lead
              ? `${lead.company_name || lead.name || 'Unnamed Lead'}${
                  lead.company_name && lead.name ? ` - ${lead.name}` : ''
                }`
              : '',
            'Select lead',
            'lead',
          )}

          <View
            style={styles.fieldContainer}
            collapsable={false}
            ref={node => {
              fieldRefs.current.companyName = node;
            }}
          >
            {renderLabel('Company Name', true)}
            <TextInput
              ref={node => {
                inputRefs.current.companyName = node;
              }}
              style={styles.input}
              value={companyName}
              onChangeText={value => {
                setCompanyName(value);
                clearError('companyName');
              }}
              placeholderTextColor="#9AAAC0"
            />
            {renderError(errors.companyName)}
          </View>

          <View
            style={styles.fieldContainer}
            collapsable={false}
            ref={node => {
              fieldRefs.current.gstin = node;
            }}
          >
            {renderLabel('GSTIN', true)}
            <TextInput
              ref={node => {
                inputRefs.current.gstin = node;
              }}
              style={styles.input}
              value={gstin}
              onChangeText={value => {
                setGstin(value);
                clearError('gstin');
              }}
              placeholderTextColor="#9AAAC0"
              autoCapitalize="characters"
            />
            {renderError(errors.gstin)}
          </View>

          <View
            style={styles.fieldContainer}
            collapsable={false}
            ref={node => {
              fieldRefs.current.name = node;
            }}
          >
            {renderLabel('Name', true)}
            <View style={styles.inlineRow}>
              <Pressable
                style={[styles.dropdown, styles.inlineDropdown]}
                onPress={() => openDropdown('title')}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    !title && styles.placeholderText,
                  ]}
                  numberOfLines={1}
                >
                  {title || 'Title'}
                </Text>
                <Icon name="chevron-down" size={18} color={COLORS.GREY_800} />
              </Pressable>
              <TextInput
                ref={node => {
                  inputRefs.current.name = node;
                }}
                style={[styles.input, styles.flexInput]}
                value={name}
                onChangeText={value => {
                  setName(value);
                  clearError('name');
                }}
                placeholderTextColor="#9AAAC0"
              />
            </View>
            {renderError(errors.name)}
          </View>

          <View
            style={styles.fieldContainer}
            collapsable={false}
            ref={node => {
              fieldRefs.current.email = node;
            }}
          >
            {renderLabel('Email', true)}
            <TextInput
              ref={node => {
                inputRefs.current.email = node;
              }}
              style={styles.input}
              value={email}
              onChangeText={value => {
                setEmail(value);
                clearError('email');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9AAAC0"
            />
            {renderError(errors.email)}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Mobile</Text>
            <View style={styles.inlineRow}>
              <View style={[styles.dropdown, styles.inlineDropdown]}>
                <Text style={styles.dropdownText}>+{mobileCode}</Text>
              </View>
              <TextInput
                style={[styles.input, styles.flexInput]}
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                maxLength={10}
                placeholderTextColor="#9AAAC0"
              />
            </View>
          </View>

          <View
            style={styles.fieldContainer}
            collapsable={false}
            ref={node => {
              fieldRefs.current.discount = node;
            }}
          >
            {renderLabel('Discount (in %)', true)}
            <TextInput
              ref={node => {
                inputRefs.current.discount = node;
              }}
              style={styles.input}
              value={discount}
              onChangeText={value => {
                setDiscount(value);
                clearError('discount');
              }}
              keyboardType="decimal-pad"
              placeholderTextColor="#9AAAC0"
            />
            {renderError(errors.discount)}
          </View>

          {renderDropdownField(
            'Order Type',
            getOrderTypeLabel(),
            'Select order type',
            'orderType',
            undefined,
            true,
            errors.orderType,
            'orderType',
          )}

          {/* Domain Details */}
          <Text style={styles.sectionTitle}>Domain Detail</Text>

          {renderDropdownField(
            'Domain option',
            domainOption,
            'Select domain option',
            'domainOption',
          )}

          {domainOption !== NO_DOMAIN && (
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Domain Name</Text>
              <TextInput
                style={styles.input}
                value={domain}
                onChangeText={text => {
                  setDomain(text);
                  setDomainStatus(null);
                }}
                placeholder="example.com"
                placeholderTextColor="#9AAAC0"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          )}

          {domainOption === NEW_DOMAIN && (
            <>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>SAC</Text>
                <TextInput
                  style={styles.input}
                  value={domainSac}
                  onChangeText={setDomainSac}
                  placeholderTextColor="#9AAAC0"
                />
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Domain Start</Text>
                <Pressable
                  style={styles.dropdown}
                  onPress={() =>
                    setDatePicker({
                      title: 'Domain Start',
                      value: domainStart,
                      onSelect: setDomainStart,
                    })
                  }
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      !domainStart && styles.placeholderText,
                    ]}
                  >
                    {domainStart || 'dd/mm/yyyy'}
                  </Text>
                  <Icon
                    family="Feather"
                    name="calendar"
                    size={16}
                    color="#0561B9"
                  />
                </Pressable>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Domain End</Text>
                <Pressable
                  style={styles.dropdown}
                  onPress={() =>
                    setDatePicker({
                      title: 'Domain End',
                      value: domainEnd,
                      onSelect: setDomainEnd,
                    })
                  }
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      !domainEnd && styles.placeholderText,
                    ]}
                  >
                    {domainEnd || 'dd/mm/yyyy'}
                  </Text>
                  <Icon
                    family="Feather"
                    name="calendar"
                    size={16}
                    color="#0561B9"
                  />
                </Pressable>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Rate</Text>
                <TextInput
                  style={styles.input}
                  value={domainRate}
                  onChangeText={setDomainRate}
                  keyboardType="decimal-pad"
                  placeholderTextColor="#9AAAC0"
                />
              </View>

              {domainChecking ? (
                <Text style={[styles.domainStatusText, styles.domainChecking]}>
                  Checking...
                </Text>
              ) : domainStatus ? (
                <Text
                  style={[
                    styles.domainStatusText,
                    domainStatus.available
                      ? styles.domainAvailable
                      : styles.domainUnavailable,
                  ]}
                >
                  {domainStatus.message}
                </Text>
              ) : null}

              <Pressable
                style={styles.checkAvailability}
                onPress={checkDomainAvailability}
                hitSlop={8}
              >
                <Text style={styles.checkAvailabilityText}>
                  Check Availability
                </Text>
              </Pressable>
            </>
          )}

          {/* Plan Details */}
          <View style={styles.planHeader}>
            <Text style={styles.sectionTitle}>Plan Detail</Text>

            <Pressable
              style={styles.addButton}
              onPress={addPlan}>
              {/* <Text style={styles.plus}>＋</Text> */}
              <Icon family="Feather" name="plus" size={20} color={COLORS.WHITE} />
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>

          {plans.map(renderPlan)}

          <View style={styles.bottomSpace} />
          <View style={styles.saveContainer}>
            <Pressable
              style={styles.saveButton}
              onPress={handleSave}>
              <Text style={styles.saveText}>{isEdit ? 'Update' : 'Save'}</Text>
            </Pressable>
          </View>
        </ScrollView>

        {/* Save */}

      </KeyboardAvoidingView>

      {/* Dropdown Modal */}
      <Modal
        visible={dropdown.visible}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}>
        <Pressable
          style={styles.modalOverlay}
          onPress={closeDropdown}>
          <Pressable style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {getDropdownTitle()}
            </Text>

            <ScrollView
              nestedScrollEnabled
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator
            >
              {(getDropdownItems() ?? []).map((item: any, index: number) => {
                const isLead = dropdown.type === 'lead';
                const key =
                  item?.id != null
                    ? String(item.id)
                    : item?.value != null
                      ? String(item.value)
                      : `${item}-${index}`;

                return (
                  <Pressable
                    key={key}
                    style={styles.option}
                    onPress={() => handleDropdownSelect(item)}
                  >
                    <Text style={styles.optionText}>
                      {isLead
                        ? `${item.company_name || item.name || 'Unnamed Lead'}${
                            item.company_name && item.name
                              ? ` - ${item.name}`
                              : ''
                          }`
                        : typeof item === 'object'
                          ? item.name ?? item.label ?? String(item.id)
                          : item}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      <DatePicker
        visible={!!datePicker}
        title={datePicker?.title ?? ''}
        value={datePicker?.value ?? ''}
        onClose={() => setDatePicker(null)}
        onSelect={value => {
          datePicker?.onSelect(value);
          setDatePicker(null);
        }}
      />
    </SafeAreaView>
  );
};

export default AddQuotationView;