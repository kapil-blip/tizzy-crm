import React, { useEffect, useRef, useState } from 'react';
import {
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
import { useRoute } from '@react-navigation/native';
import {
  errorCodes,
  isErrorWithCode,
  pick,
  types,
} from '@react-native-documents/picker';
import ReactNativeBlobUtil from 'react-native-blob-util';

import Icon from '../../../../components/Icon';
import styles from './AddLeadsStyle';
import Header from '../../../../components/Header';
import DatePicker, {
  formatDisplayDate,
  toApiDate,
} from '../../../../components/DatePicker';
import { COLORS } from '../../../../assets/themes/colors';
import { goBack } from '../../../../navigation/NavigationService';
import { API_HOST } from '../../../../services/apiservices/api';
import { leadsApi, quotationsApi } from '../../../../services';
import type {
  CheckDomainResponse,
  CreateLeadOptions,
  CreateLeadPayload,
  LeadDocumentUpload,
  ProviderPlan,
} from '../../../../services';
import { useAppDispatch } from '../../../../store/hooks';
import {
  hideLoader,
  showLoader,
  showToast,
} from '../../../../store/slices/viewSlice';

type Contact = {
  name: string;
  designation: string;
  email: string;
  mobile: string;
};

const EMPTY_CONTACT: Contact = { name: '', designation: '', email: '', mobile: '' };

type CurrentService = {
  domain: string;
  providerId: number | null;
  plan: ProviderPlan | null;
  quantity: string;
  rate: string;
  renewalDate: string;
};

const EMPTY_CURRENT_SERVICE: CurrentService = {
  domain: '',
  providerId: null,
  plan: null,
  quantity: '',
  rate: '',
  renewalDate: '',
};

type OurService = {
  providerId: number | null;
  plan: ProviderPlan | null;
  quantity: string;
  renewalDate: string;
  quotePeriod: string;
  sku: string;
};

const EMPTY_OUR_SERVICE: OurService = {
  providerId: null,
  plan: null,
  quantity: '1',
  renewalDate: '',
  quotePeriod: 'Yearly',
  sku: '',
};

type Dropdown = {
  title: string;
  items: string[];
  onSelect: (value: string) => void;
};

type TabType = 'Overview' | 'Follow-up' | 'Services';

const TABS: TabType[] = ['Overview', 'Follow-up', 'Services'];
const GSTIN_REGEX = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const NO_DOMAIN = 'No domain';
const EXISTING_DOMAIN = 'Already have domain';
const NEW_DOMAIN = 'Need new domain';
const DOMAIN_OPTIONS = [NO_DOMAIN, EXISTING_DOMAIN, NEW_DOMAIN];
const DOCUMENT_TYPES = [
  'PAN Card',
  'GST Certificate',
  'Address Proof',
  'Company Registration',
  'Other',
];
const BUSINESS_TYPES = [
  { value: 'new', label: 'New Business' },
  { value: 'existing', label: 'Existing Business' },
];
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;
const DOCUMENT_EXTENSION_REGEX = /\.(pdf|docx?|jpe?g|png)$/i;

const toFileUri = (path: string) =>
  path.startsWith('file://') ? path : `file://${path}`;

/** Turn remaining docs into real file URIs (API: documents.* must be a file). */
const prepareDocumentsForUpload = async (docs: LeadDocumentUpload[]) => {
  const prepared: LeadDocumentUpload[] = [];
  for (const doc of docs) {
    if (!/^https?:\/\//i.test(doc.uri)) {
      prepared.push(doc);
      continue;
    }
    const safeName = doc.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const localPath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/lead-doc-${Date.now()}-${prepared.length}-${safeName}`;
    const res = await ReactNativeBlobUtil.config({
      path: localPath,
      fileCache: true,
    }).fetch('GET', doc.uri);
    prepared.push({
      uri: toFileUri(res.path()),
      name: doc.name,
      type: doc.type || 'application/octet-stream',
      documentType: doc.documentType,
    });
  }
  return prepared;
};

const toDisplayDate = (value?: string | null) => {
  if (!value) return '';
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(value);
  return Number.isNaN(date.getTime()) ? '' : formatDisplayDate(date);
};

const FieldLabel = ({ label, required }: { label: string; required?: boolean }) => (
  <Text style={styles.fieldLabel}>
    {label}
    {required && <Text style={styles.requiredMark}> *</Text>}
  </Text>
);

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  multiline = false,
  autoCapitalize,
  required,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: any;
  multiline?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  required?: boolean;
}) => {
  return (
    <View style={styles.fieldContainer}>
      <FieldLabel label={label} required={required} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0AABD"
        keyboardType={keyboardType}
        multiline={multiline}
        autoCapitalize={autoCapitalize}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[
          styles.textInput,
          multiline && styles.multilineInput,
        ]}
      />
    </View>
  );
};

const SelectInput = ({
  label,
  value,
  placeholder = 'Select',
  onPress,
  required,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onPress?: () => void;
  required?: boolean;
}) => {
  return (
    <View style={styles.fieldContainer}>
      <FieldLabel label={label} required={required} />

      <Pressable
        style={styles.selectInput}
        onPress={onPress}
      >
        <Text
          style={[
            styles.selectText,
            !value && styles.selectPlaceholder,
          ]}
        >
          {value || placeholder}
        </Text>

        <Icon
          family="Feather"
          name="chevron-down"
          size={18}
          color="#9AA9BF"
        />
      </Pressable>
    </View>
  );
};

export default function AddLeadView() {
  const route = useRoute<any>();
  const leadId = route.params?.leadId as number | string | undefined;

  const [activeTab, setActiveTab] =
    useState<TabType>('Overview');

  const [salutation, setSalutation] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [gstin, setGstin] = useState('');

  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Maharashtra');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [businessType, setBusinessType] = useState('new');

  const [leadPriority, setLeadPriority] = useState('');
  const [leadStatus, setLeadStatus] = useState('New');
  const [leadSource, setLeadSource] = useState('');
  const [sourceType, setSourceType] = useState('');
  const [leadReference, setLeadReference] = useState('');

  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<CreateLeadOptions | null>(null);
  const [dropdown, setDropdown] = useState<Dropdown | null>(null);
  const [documentType, setDocumentType] = useState(DOCUMENT_TYPES[0]);
  const [documents, setDocuments] = useState<LeadDocumentUpload[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([{ ...EMPTY_CONTACT }]);

  useEffect(() => {
    const fetchCreateLeadData = async () => {
      dispatch(showLoader({ transparent: true }));
      try {
        const [response, leadResponse] = await Promise.all([
          leadsApi.getCreateLeadData(),
          leadId ? leadsApi.getLeadById(leadId) : Promise.resolve(null),
        ]);
        if (response.success && response.data) {
          const { options: apiOptions, sample } = response.data;
          setOptions(apiOptions);

          const lead = leadResponse?.success ? leadResponse.data?.lead : null;
          if (!lead) {
            setSalutation(sample.customer_detail.salutation);
            setBusinessType(sample.customer_detail.business_type || 'new');
            setLeadStatus(sample.lead_specification.lead_status);
            if (leadId) {
              dispatch(
                showToast({
                  message: leadResponse?.message || 'Unable to fetch lead details.',
                  type: 'error',
                }),
              );
            }
            return;
          }

          const findPlan = (pid?: number | null, planId?: number | null) =>
            (pid ? apiOptions.plans[pid]?.find(item => item.id === planId) : null) ?? null;
          const domainInfo =
            lead.domain && typeof lead.domain === 'object' ? lead.domain : null;
          const domainType = domainInfo?.domain_type ?? lead.domain_type;
          const rate = domainInfo?.domain_rate ?? lead.domain_rate;

          setSalutation(lead.salutation || sample.customer_detail.salutation);
          setName(lead.name ?? '');
          setDesignation(lead.designation ?? '');
          setEmail(lead.email ?? '');
          setMobile(lead.mobile ?? '');
          setCompanyName(lead.company_name ?? '');
          setIndustry(lead.industry ?? '');
          setEmployeeCount(lead.no_of_employees != null ? String(lead.no_of_employees) : '');
          setGstin(lead.gstin ?? '');
          setAddress(lead.mailing_address ?? '');
          setCountry(lead.country ?? '');
          setState(lead.state ?? '');
          setCity(lead.city ?? '');
          setPincode(lead.pincode ?? '');
          setBusinessType(lead.business_type || 'new');
          setLeadPriority(lead.lead_category || lead.lead_priority || '');
          setLeadStatus(lead.lead_status || 'New');
          setLeadSource(lead.lead_source ?? '');
          setSourceType(lead.lead_bifurcation ?? '');
          setLeadReference(lead.assigned_to ?? '');
          setFollowUpDate(toDisplayDate(lead.follow_up_date));
          setFollowUpNote(lead.follow_up_note ?? '');

          setDomainOption(
            domainType === 'new'
              ? NEW_DOMAIN
              : domainType === 'existing'
                ? EXISTING_DOMAIN
                : NO_DOMAIN,
          );
          setDomain((typeof lead.domain === 'string' ? lead.domain : domainInfo?.domain) ?? '');
          setDomainPeriod(domainInfo?.domain_period ?? lead.domain_period ?? 'Yearly');
          setDomainRate(rate != null ? String(Number(rate)) : '');
          setSac(domainInfo?.sac ?? lead.sac ?? '');
          setDomainStart(toDisplayDate(domainInfo?.domain_start ?? lead.domain_start));
          setDomainEnd(toDisplayDate(domainInfo?.domain_end ?? lead.domain_end));
          setDomainRenewalDate(
            toDisplayDate(domainInfo?.domain_renewal_date ?? lead.domain_renewal_date),
          );

          const leadOurServices = lead.services?.filter(item => !item.is_info) ?? [];
          if (leadOurServices.length) {
            setOurServices(
              leadOurServices.map(item => ({
                providerId: item.provider_id ?? null,
                plan: findPlan(item.provider_id, item.plan_id),
                quantity: String(item.quantity ?? 1),
                renewalDate: toDisplayDate(item.renewal_date),
                quotePeriod: item.quote_period || 'Yearly',
                sku: item.sku ?? '',
              })),
            );
          }

          const infoServices = lead.services?.filter(item => item.is_info) ?? [];
          if (infoServices.length) {
            setCurrentServices(
              infoServices.map(item => ({
                domain: item.domain ?? '',
                providerId: item.provider_id ?? null,
                plan: findPlan(item.provider_id, item.plan_id),
                quantity: item.quantity != null ? String(item.quantity) : '',
                rate: item.rate ? String(Number(item.rate)) : '',
                renewalDate: toDisplayDate(item.renewal_date),
              })),
            );
          }

          if (lead.contacts?.length) {
            setContacts(
              lead.contacts.map(item => ({
                name: item.name ?? '',
                designation: item.designation ?? '',
                email: item.email ?? '',
                mobile: item.mobile ?? '',
              })),
            );
          }

          const existingDocs = Array.isArray(lead.document)
            ? lead.document.filter(doc => doc?.path)
            : [];
          if (existingDocs.length) {
            setDocuments(
              existingDocs.map(doc => ({
                uri: `${API_HOST}/storage/${doc.path}`,
                name: doc.name || doc.path.split('/').pop() || 'document',
                type: 'application/octet-stream',
                documentType: doc.type || DOCUMENT_TYPES[0],
                isExisting: true,
                path: doc.path,
              })),
            );
            if (
              existingDocs[0].type &&
              DOCUMENT_TYPES.includes(existingDocs[0].type)
            ) {
              setDocumentType(existingDocs[0].type);
            }
          }
        } else {
          dispatch(
            showToast({
              message: response.message || 'Unable to load lead options.',
              type: 'error',
            }),
          );
        }
      } catch {
        dispatch(
          showToast({
            message: 'Something went wrong while loading lead options.',
            type: 'error',
          }),
        );
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchCreateLeadData();
  }, [dispatch, leadId]);

  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    leadsApi
      .getCountries()
      .then(res => setCountries(res.success && res.data ? res.data : []))
      .catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    setStates([]);
    if (!country) return;

    let active = true;
    leadsApi
      .getStates(country)
      .then(res => active && setStates(res.success && res.data ? res.data : []))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [country]);

  useEffect(() => {
    setCities([]);
    if (!country || !state) return;

    let active = true;
    leadsApi
      .getCities(country, state)
      .then(res => active && setCities(res.success && res.data ? res.data : []))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [country, state]);

  const openDropdown = (
    title: string,
    items: string[] | undefined,
    onSelect: (value: string) => void,
  ) => {
    if (!items?.length) {
      dispatch(showToast({ message: `No ${title.toLowerCase()} options available.`, type: 'info' }));
      return;
    }
    setDropdown({ title, items, onSelect });
  };

  const handleDropdownSelect = (value: string) => {
    dropdown?.onSelect(value);
    setDropdown(null);
  };

  const handleCountrySelect = (value: string) => {
    if (value !== country) {
      setState('');
      setCity('');
    }
    setCountry(value);
  };

  const handleStateSelect = (value: string) => {
    if (value !== state) setCity('');
    setState(value);
  };

  const fetchGstinDetails = async (value: string) => {
    dispatch(showLoader({ transparent: true }));
    try {
      const response = await leadsApi.searchGstin(value);
      if (response.success && response.data) {
        const data = response.data;
        if (data.company_name) setCompanyName(data.company_name);
        if (data.constitution) setIndustry(data.constitution);
        if (data.company_address) setAddress(data.company_address);
        if (data.pincode) setPincode(data.pincode);
      } else {
        dispatch(
          showToast({
            message: response.message || 'Unable to fetch GSTIN details.',
            type: 'error',
          }),
        );
      }
    } catch {
      dispatch(
        showToast({
          message: 'Something went wrong while fetching GSTIN details.',
          type: 'error',
        }),
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleGstinChange = (value: string) => {
    const next = value.trim().toUpperCase();
    setGstin(next);
    if (next !== gstin && GSTIN_REGEX.test(next)) {
      fetchGstinDetails(next);
    }
  };

  const updateContact = (index: number, key: keyof Contact, value: string) => {
    setContacts(prev =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );
  };

  const pickDocuments = async () => {
    try {
      const files = await pick({
        allowMultiSelection: true,
        type: [types.pdf, types.images, types.doc, types.docx],
      });

      const accepted: LeadDocumentUpload[] = [];
      const rejected: string[] = [];
      files.forEach(file => {
        const fileName = file.name ?? 'document';
        if (
          !DOCUMENT_EXTENSION_REGEX.test(fileName) ||
          (file.size ?? 0) > MAX_DOCUMENT_SIZE
        ) {
          rejected.push(fileName);
          return;
        }
        accepted.push({
          uri: file.uri,
          name: fileName,
          type: file.type ?? 'application/octet-stream',
          documentType,
        });
      });

      if (accepted.length) setDocuments(prev => [...prev, ...accepted]);
      if (rejected.length) {
        dispatch(
          showToast({
            message: `Skipped ${rejected.join(', ')}. Only PDF, JPG, PNG, DOC or DOCX up to 10 MB are allowed.`,
            type: 'error',
          }),
        );
      }
    } catch (error) {
      if (isErrorWithCode(error) && error.code === errorCodes.OPERATION_CANCELED) {
        return;
      }
      dispatch(showToast({ message: 'Unable to pick document.', type: 'error' }));
    }
  };

  const [followUpNote, setFollowUpNote] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [domain, setDomain] = useState('');
  const [domainChecking, setDomainChecking] = useState(false);
  const [domainStatus, setDomainStatus] = useState<CheckDomainResponse | null>(null);
  const domainTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const domainRequestIdRef = useRef(0);

  useEffect(() => {
    return () => {
      if (domainTimerRef.current) clearTimeout(domainTimerRef.current);
    };
  }, []);

  const [domainOption, setDomainOption] = useState(NO_DOMAIN);
  const [domainPeriod, setDomainPeriod] = useState('Yearly');
  const [domainRate, setDomainRate] = useState('');
  const [sac, setSac] = useState('');
  const [domainStart, setDomainStart] = useState('');
  const [domainEnd, setDomainEnd] = useState('');
  const [domainRenewalDate, setDomainRenewalDate] = useState('');
  const [datePicker, setDatePicker] = useState<{
    title: string;
    value: string;
    onSelect: (value: string) => void;
  } | null>(null);

  const runDomainCheck = (text: string, delay: number) => {
    setDomainStatus(null);
    if (domainTimerRef.current) clearTimeout(domainTimerRef.current);

    const cleanDomain = text.trim().toLowerCase();
    const requestId = ++domainRequestIdRef.current;
    if (!cleanDomain) {
      setDomainChecking(false);
      return;
    }

    setDomainChecking(true);
    domainTimerRef.current = setTimeout(async () => {
      try {
        const response = await leadsApi.checkDomain(cleanDomain);
        if (requestId !== domainRequestIdRef.current) return;
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
        if (requestId !== domainRequestIdRef.current) return;
        setDomainStatus({
          ok: false,
          available: false,
          message: 'Unable to verify domain',
        });
      } finally {
        if (requestId === domainRequestIdRef.current) setDomainChecking(false);
      }
    }, delay);
  };

  const handleDomainChange = (text: string) => {
    setDomain(text);
    if (domainOption === NEW_DOMAIN) runDomainCheck(text, 450);
  };

  const handleDomainOptionSelect = (value: string) => {
    setDomainOption(value);
    runDomainCheck(value === NEW_DOMAIN ? domain : '', 0);
  };

  const renderDateField = (
    label: string,
    value: string,
    onSelect: (value: string) => void,
  ) => (
    <View style={styles.servicesFieldContainer}>
      <Text style={styles.servicesFieldLabel}>{label}</Text>

      <Pressable
        style={styles.servicesDateInput}
        onPress={() => setDatePicker({ title: label, value, onSelect })}
      >
        <Text style={[styles.selectText, !value && styles.selectPlaceholder]}>
          {value || 'dd/mm/yyyy'}
        </Text>
        <Icon family="Feather" name="calendar" size={16} color="#0561B9" />
      </Pressable>
    </View>
  );

  const [ourServices, setOurServices] = useState<OurService[]>([
    { ...EMPTY_OUR_SERVICE },
  ]);

  const updateOurService = (index: number, changes: Partial<OurService>) => {
    setOurServices(prev =>
      prev.map((item, i) => (i === index ? { ...item, ...changes } : item)),
    );
  };

  const [currentServices, setCurrentServices] = useState<CurrentService[]>([
    { ...EMPTY_CURRENT_SERVICE },
  ]);

  const updateCurrentService = (index: number, changes: Partial<CurrentService>) => {
    setCurrentServices(prev =>
      prev.map((item, i) => (i === index ? { ...item, ...changes } : item)),
    );
  };

  const handleSubmit = async () => {
    if (!leadId && activeTab !== 'Services') {
      setActiveTab(activeTab === 'Overview' ? 'Follow-up' : 'Services');
      return;
    }

    const requiredFields: [string, string][] = [
      ['Title', salutation],
      ['Name', name],
      ['Email', email],
      ['Contact No.', mobile],
      ['Lead Status', leadStatus],
    ];
    const missing = requiredFields
      .filter(([, value]) => !value.trim())
      .map(([label]) => label);

    if (missing.length) {
      setActiveTab('Overview');
      dispatch(
        showToast({
          message: `Please fill required fields: ${missing.join(', ')}`,
          type: 'error',
        }),
      );
      return;
    }

    dispatch(showLoader({ transparent: true }));
    try {
      const isNewDomain = domainOption === NEW_DOMAIN;
      const isExistingDomain = domainOption === EXISTING_DOMAIN;

      const payload: CreateLeadPayload = {
          customer_detail: {
            salutation,
            name: name.trim(),
            designation,
            email: email.trim(),
            mobile_code: '91',
            mobile: mobile.trim(),
            company_name: companyName,
            industry,
            no_of_employees: employeeCount ? Number(employeeCount) : null,
            gstin,
            business_type: businessType,
          },
          address_information: {
            mailing_address: address,
            country,
            state,
            city,
            pincode,
          },
          domain: {
            domain_type: isNewDomain ? 'new' : isExistingDomain ? 'existing' : '',
            domain: isNewDomain || isExistingDomain ? domain.trim().toLowerCase() : '',
            domain_period: isNewDomain ? domainPeriod : '',
            domain_rate: isNewDomain && domainRate ? Number(domainRate) : null,
            sac: isNewDomain ? sac : '',
            domain_start: isNewDomain ? toApiDate(domainStart) : '',
            domain_end: isNewDomain ? toApiDate(domainEnd) : '',
            domain_renewal_date: isExistingDomain ? toApiDate(domainRenewalDate) : '',
          },
          our_service_plan_detail: ourServices
            .filter(item => item.providerId && item.plan)
            .map(item => ({
              provider_id: item.providerId as number,
              plan_id: (item.plan as ProviderPlan).id,
              quote_period: item.quotePeriod,
              sku: item.sku || (item.plan as ProviderPlan).sku,
              quantity: Number(item.quantity) || 1,
              renewal_date: toApiDate(item.renewalDate),
            })),
          current_service_info:
            businessType === 'existing'
              ? currentServices
                  .filter(item => item.domain.trim() || item.providerId)
                  .map(item => ({
                    domain: item.domain.trim().toLowerCase(),
                    provider_id: item.providerId,
                    plan_id: item.plan?.id ?? null,
                    quantity: Number(item.quantity) || 1,
                    rate: item.rate ? Number(item.rate) : null,
                    renewal_date: toApiDate(item.renewalDate),
                  }))
              : [],
          additional_contact: contacts.filter(item => item.name.trim()),
          lead_specification: {
            lead_priority: leadPriority,
            lead_status: leadStatus,
            lead_source: leadSource,
            lead_bifurcation: sourceType,
            assigned_to: leadReference,
          },
          follow_up_detail: {
            follow_up_date: toApiDate(followUpDate),
            follow_up_note: followUpNote,
          },
      };

      const docsToSend = leadId
        ? await prepareDocumentsForUpload(documents)
        : documents.filter(doc => !doc.isExisting);

      const response = leadId
        ? await leadsApi.updateLead(leadId, payload, docsToSend)
        : await leadsApi.createLead(payload, docsToSend);
      if (response.success) {
        dispatch(
          showToast({
            message:
              response.message ||
              (leadId ? 'Lead updated successfully.' : 'Lead created successfully.'),
            type: 'success',
          }),
        );
        goBack();
      } else {
        dispatch(
          showToast({
            message:
              response.message || (leadId ? 'Unable to update lead.' : 'Unable to create lead.'),
            type: 'error',
          }),
        );
      }
    } catch {
      dispatch(
        showToast({
          message: `Something went wrong while ${leadId ? 'updating' : 'creating'} lead.`,
          type: 'error',
        }),
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top', 'bottom']}
    >
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        translucent={false}
      />

      <Header
        title={leadId ? 'Edit Lead' : 'Add Lead'}
        leftIconType="back"
        onLeftPress={() => goBack()}
      />
      <View style={styles.bottomShadow} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.scrollContent
          }
        >
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {TABS.map(tab => {
              const active = activeTab === tab;

              return (
                <Pressable
                  key={tab}
                  style={[
                    styles.tab,
                    active && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      active && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {activeTab === 'Overview' && (
            <>
              {/* Basic Information */}
              <Text style={styles.sectionTitle}>
                Basic Information
              </Text>

              <SelectInput
                label="Title"
                value={salutation}
                onPress={() =>
                  openDropdown('Title', options?.salutation, setSalutation)
                }
                required
              />

              <FormInput
                label="Name"
                value={name}
                onChangeText={setName}
                required
              />

              <FormInput
                label="Designation"
                value={designation}
                onChangeText={setDesignation}
              />

              <FormInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                required
              />

              {/* Contact Number */}
              <View style={styles.fieldContainer}>
                <FieldLabel label="Contact No." required />

                <View style={styles.phoneInputContainer}>
                  <Pressable style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>
                      +91
                    </Text>

                    <Icon
                      family="Feather"
                      name="chevron-down"
                      size={15}
                      color="#9AA9BF"
                    />
                  </Pressable>

                  <TextInput
                    value={mobile}
                    maxLength={10}
                    onChangeText={setMobile}
                    keyboardType="phone-pad"
                    style={styles.phoneInput}
                  />
                </View>
              </View>

              <FormInput
                label="Company Name"
                value={companyName}
                onChangeText={setCompanyName}
              />

              <SelectInput
                label="Industry"
                value={industry}
                onPress={() => {}}
              />

              <FormInput
                label="Number of Employee"
                value={employeeCount}
                onChangeText={setEmployeeCount}
                keyboardType="numeric"
              />

              <FormInput
                label="GSTIN"
                value={gstin}
                onChangeText={handleGstinChange}
                autoCapitalize="characters"
              />

              {/* Lead Specification */}
              <Text style={styles.sectionTitle}>
                Additional information
              </Text>

              <FormInput
                label="Mailing Address"
                value={address}
                onChangeText={setAddress}
                multiline
              />

              <SelectInput
                label="Country"
                value={country}
                onPress={() =>
                  openDropdown('Country', countries, handleCountrySelect)
                }
              />

              <SelectInput
                label="State"
                value={state}
                onPress={() =>
                  openDropdown('State', states, handleStateSelect)
                }
              />

              {/* City + Pincode */}
              <View style={styles.twoColumnRow}>
                <View style={styles.cityColumn}>
                  <SelectInput
                    label="City"
                    value={city}
                    onPress={() => openDropdown('City', cities, setCity)}
                  />
                </View>

                <View style={styles.pincodeColumn}>
                  <FormInput
                    label="Pincode"
                    value={pincode}
                    onChangeText={setPincode}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Lead Specification Box */}
              <View style={styles.leadSpecificationBox}>
                <Text style={styles.boxTitle}>
                  Lead Specification
                </Text>

                <SelectInput
                  label="Lead Priority"
                  value={leadPriority}
                  onPress={() =>
                    openDropdown('Lead Priority', options?.lead_priority, setLeadPriority)
                  }
                />

                <SelectInput
                  label="Lead Status"
                  value={leadStatus}
                  required
                  onPress={() =>
                    openDropdown('Lead Status', options?.lead_status, setLeadStatus)
                  }
                />

                <SelectInput
                  label="Lead Source"
                  value={leadSource}
                  onPress={() =>
                    openDropdown('Lead Source', options?.lead_source, setLeadSource)
                  }
                />

                <SelectInput
                  label="Lead Bifurcation"
                  value={sourceType}
                  onPress={() =>
                    openDropdown('Lead Bifurcation', options?.lead_bifurcation, setSourceType)
                  }
                />

                <SelectInput
                  label="Assigned To"
                  value={leadReference}
                  onPress={() =>
                    openDropdown('Assigned To', options?.assignees, setLeadReference)
                  }
                />
              </View>

              {/* Additional Contact */}
              <View style={styles.additionalHeader}>
                <Text style={styles.sectionTitleNoMargin}>
                  Additional Contact
                </Text>

                <Pressable
                  onPress={() =>
                    setContacts(prev => [...prev, { ...EMPTY_CONTACT }])
                  }
                  hitSlop={10}
                >
                  <Text style={styles.addText}>+ Add Contact</Text>
                </Pressable>
              </View>

              {contacts.map((contact, index) => (
                <View key={index} style={styles.leadSpecificationBox}>
                  <View style={styles.additionalHeader}>
                    <Text style={styles.sectionTitleNoMargin}>
                      Contact {index + 1}
                    </Text>

                    <Pressable
                      onPress={() =>
                        setContacts(prev => prev.filter((_, i) => i !== index))
                      }
                      hitSlop={10}
                    >
                      <Text style={styles.addText}>REMOVE</Text>
                    </Pressable>
                  </View>

                  <FormInput
                    label="Name"
                    value={contact.name}
                    onChangeText={value => updateContact(index, 'name', value)}
                  />

                  <FormInput
                    label="Email"
                    value={contact.email}
                    onChangeText={value => updateContact(index, 'email', value)}
                    keyboardType="email-address"
                  />

                  <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Mobile Number</Text>

                    <View style={styles.phoneInputContainer}>
                      <Pressable style={styles.countryCode}>
                        <Text style={styles.countryCodeText}>+91</Text>
                        <Icon
                          family="Feather"
                          name="chevron-down"
                          size={15}
                          color="#9AA9BF"
                        />
                      </Pressable>

                      <TextInput
                        value={contact.mobile}
                        onChangeText={value =>
                          updateContact(index, 'mobile', value)
                        }
                        keyboardType="phone-pad"
                        style={styles.phoneInput}
                      />
                    </View>
                  </View>

                  <FormInput
                    label="Designation"
                    value={contact.designation}
                    onChangeText={value =>
                      updateContact(index, 'designation', value)
                    }
                  />
                </View>
              ))}

              {/* Add Document */}
              <View style={styles.documentCard}>
                <View style={styles.documentHeader}>
                  <View style={styles.documentIconTile}>
                    <Icon family="Feather" name="folder-plus" size={20} color="#0561B9" />
                  </View>

                  <View style={styles.documentTextWrap}>
                    <Text style={styles.documentTitle}>Add Documents</Text>
                    <Text style={styles.documentSubtitle}>
                      PDF, JPG, PNG, DOC or DOCX. Max 10 MB each. Pick a type, then tap to upload.
                    </Text>
                  </View>
                </View>

                <SelectInput
                  label="Document Type"
                  value={documentType}
                  onPress={() =>
                    openDropdown('Document Type', DOCUMENT_TYPES, setDocumentType)
                  }
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.uploadBox,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                  onPress={pickDocuments}
                >
                  <Icon family="Feather" name="upload-cloud" size={24} color="#0561B9" />
                  <Text style={styles.uploadTitle}>Tap to upload files</Text>
                  <Text style={styles.uploadHint}>PDF · JPG · PNG · DOC · DOCX</Text>
                </Pressable>

                {documents.length > 0 && (
                  <>
                    <Text style={styles.selectedFilesTitle}>Selected files</Text>

                    {documents.map((doc, index) => (
                      <View key={`${doc.uri}-${index}`} style={styles.fileRow}>
                        <Icon family="Feather" name="file-text" size={18} color="#0561B9" />

                        <View style={styles.fileInfo}>
                          <Text style={styles.fileName} numberOfLines={1}>
                            {doc.name}
                          </Text>
                          <Text style={styles.fileType}>{doc.documentType}</Text>
                        </View>

                        <Pressable
                          onPress={() =>
                            setDocuments(prev => prev.filter((_, i) => i !== index))
                          }
                          hitSlop={10}
                        >
                          <Icon family="Feather" name="x" size={18} color="#8B929D" />
                        </Pressable>
                      </View>
                    ))}
                  </>
                )}
              </View>
            </>
          )}

          {activeTab === 'Follow-up' && (
            <>
            {/* Follow Up Detail */}
            <Text style={styles.followUpSectionTitle}>
              Follow Up Detail
            </Text>
        
            {/* Follow Up Date */}
            <View style={styles.followUpFieldContainer}>
              <Text style={styles.followUpFieldLabel}>
                Follow Up Date
              </Text>
        
              <Pressable
                style={styles.followUpDateInput}
                onPress={() =>
                  setDatePicker({
                    title: 'Follow Up Date',
                    value: followUpDate,
                    onSelect: setFollowUpDate,
                  })
                }
                accessibilityRole="button"
                accessibilityLabel="Select follow up date"
              >
                <Text style={[styles.followUpDateText, !!followUpDate && styles.dateValueText]}>
                  {followUpDate || 'dd/mm/yyyy'}
                </Text>
        
                <Icon
                  family="Feather"
                  name="calendar"
                  size={16}
                  color={COLORS.PRIMARY}
                />
              </Pressable>
            </View>
        
            {/* Add Note */}
            <View style={styles.followUpFieldContainer}>
              <Text style={styles.followUpFieldLabel}>
                Add Note
              </Text>
        
              <TextInput
                value={followUpNote}
                onChangeText={setFollowUpNote}
                placeholder="Quick Note....."
                placeholderTextColor="#A0AABD"
                multiline
                textAlignVertical="top"
                style={styles.followUpNoteInput}
              />
            </View>
          </>
          )}

{activeTab === 'Services' && (
  <>
    <Text style={styles.followUpSectionTitle}>
      Domain
    </Text>

    <View style={styles.servicesFieldContainer}>
      <Text style={styles.servicesFieldLabel}>
        Domain option
      </Text>

      <Pressable
        style={styles.servicesDateInput}
        onPress={() =>
          openDropdown('Domain option', DOMAIN_OPTIONS, handleDomainOptionSelect)
        }
      >
        <Text style={[styles.selectText, styles.servicesSelectText]}>
          {domainOption}
        </Text>
        <Icon family="Feather" name="chevron-down" size={18} color="#9AA9BF" />
      </Pressable>
    </View>

    {domainOption !== NO_DOMAIN && (
      <View style={styles.servicesFieldContainer}>
        <Text style={styles.servicesFieldLabel}>
          Domain Name
        </Text>

        <TextInput
          value={domain}
          onChangeText={handleDomainChange}
          style={styles.servicesTextInput}
          placeholder="example.com"
          placeholderTextColor="#9BA6B7"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
        />

        {domainOption === NEW_DOMAIN && (
          <>
            {domainChecking ? (
              <Text style={[styles.domainStatusText, styles.domainChecking]}>
                Checking...
              </Text>
            ) : domainStatus ? (
              <Text
                style={[
                  styles.domainStatusText,
                  domainStatus.available ? styles.domainAvailable : styles.domainUnavailable,
                ]}
              >
                {domainStatus.message}
              </Text>
            ) : null}

            <Pressable
              style={styles.checkAvailability}
              onPress={() => {
                if (!domain.trim()) {
                  dispatch(showToast({ message: 'Enter domain name first.', type: 'info' }));
                  return;
                }
                runDomainCheck(domain, 0);
              }}
              hitSlop={8}
            >
              <Text style={styles.addText}>Check Availability</Text>
            </Pressable>
          </>
        )}
      </View>
    )}

    {domainOption === EXISTING_DOMAIN &&
      renderDateField('Renewal Date', domainRenewalDate, setDomainRenewalDate)}

    {domainOption === NEW_DOMAIN && (
      <>
        <View style={styles.servicesFieldContainer}>
          <Text style={styles.servicesFieldLabel}>
            Period
          </Text>

          <Pressable
            style={styles.servicesDateInput}
            onPress={() =>
              openDropdown('Period', options?.domain_period, setDomainPeriod)
            }
          >
            <Text style={[styles.selectText, styles.servicesSelectText]}>
              {domainPeriod}
            </Text>
            <Icon family="Feather" name="chevron-down" size={18} color="#9AA9BF" />
          </Pressable>
        </View>

        <View style={styles.servicesFieldContainer}>
          <Text style={styles.servicesFieldLabel}>
            Rate
          </Text>

          <TextInput
            value={domainRate}
            onChangeText={setDomainRate}
            style={styles.servicesTextInput}
            keyboardType="numeric"
            placeholderTextColor="#9BA6B7"
          />
        </View>

        <View style={styles.servicesFieldContainer}>
          <Text style={styles.servicesFieldLabel}>
            SAC
          </Text>

          <TextInput
            value={sac}
            onChangeText={setSac}
            style={styles.servicesTextInput}
            placeholderTextColor="#9BA6B7"
          />
        </View>

        {renderDateField('Domain Start', domainStart, setDomainStart)}
        {renderDateField('Domain End', domainEnd, setDomainEnd)}
      </>
    )}

    {/* Choose Business */}
    <Text style={[styles.followUpSectionTitle, styles.sectionGap]}>
      Choose Business
    </Text>

    <View style={styles.radioRow}>
      {BUSINESS_TYPES.map(item => {
        const selected = businessType === item.value;
        return (
          <Pressable
            key={item.value}
            style={styles.radioOption}
            onPress={() => setBusinessType(item.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
          >
            <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
              {selected && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioText}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>

    {/* Current Service (Info) */}
    {businessType === 'existing' && (
      <>
        <View style={[styles.additionalHeader, styles.sectionGap]}>
          <Text style={styles.sectionTitleNoMargin}>
            Current Service (Info)
          </Text>

          <Pressable
            onPress={() =>
              setCurrentServices(prev => [...prev, { ...EMPTY_CURRENT_SERVICE }])
            }
            hitSlop={10}
          >
            <Text style={styles.addText}>+ Add Service</Text>
          </Pressable>
        </View>

        <Text style={styles.currentServiceHint}>
          For information only — what they use with another vendor. Add Tizzy plans below to quote.
        </Text>

        {currentServices.map((item, index) => {
          const itemProvider = options?.providers.find(
            provider => provider.id === item.providerId,
          );
          const itemPlans = item.providerId
            ? options?.plans[item.providerId] ?? []
            : [];

          return (
            <View key={index} style={styles.leadSpecificationBox}>
              <View style={styles.additionalHeader}>
                <Text style={styles.sectionTitleNoMargin}>
                  Service {index + 1}
                </Text>

                <Pressable
                  onPress={() =>
                    setCurrentServices(prev => prev.filter((_, i) => i !== index))
                  }
                  hitSlop={10}
                >
                  <Text style={styles.addText}>REMOVE</Text>
                </Pressable>
              </View>

              <FormInput
                label="Domain Name"
                value={item.domain}
                onChangeText={value => updateCurrentService(index, { domain: value })}
                placeholder="Domain Name"
                autoCapitalize="none"
              />

              <SelectInput
                label="Tizzy Service"
                value={itemProvider?.name ?? ''}
                placeholder="Select Service"
                onPress={() =>
                  openDropdown(
                    'Tizzy Service',
                    options?.providers.map(provider => provider.name),
                    value => {
                      const provider = options?.providers.find(p => p.name === value);
                      if (provider && provider.id !== item.providerId) {
                        updateCurrentService(index, { providerId: provider.id, plan: null });
                      }
                    },
                  )
                }
              />

              <SelectInput
                label="Plan Name"
                value={item.plan?.name ?? ''}
                placeholder="Plan Name"
                onPress={() => {
                  if (!item.providerId) {
                    dispatch(showToast({ message: 'Select a service first.', type: 'info' }));
                    return;
                  }
                  openDropdown(
                    'Plan Name',
                    itemPlans.map(p => p.name),
                    value =>
                      updateCurrentService(index, {
                        plan: itemPlans.find(p => p.name === value) ?? null,
                      }),
                  );
                }}
              />

              <FormInput
                label="No of Users"
                value={item.quantity}
                onChangeText={value => updateCurrentService(index, { quantity: value })}
                placeholder="Quantity"
                keyboardType="numeric"
              />

              <FormInput
                label="Current Price"
                value={item.rate}
                onChangeText={value => updateCurrentService(index, { rate: value })}
                placeholder="Price"
                keyboardType="numeric"
              />

              <View style={styles.fieldContainer}>
                <FieldLabel label="Renewal Date" />

                <Pressable
                  style={styles.selectInput}
                  onPress={() =>
                    setDatePicker({
                      title: 'Renewal Date',
                      value: item.renewalDate,
                      onSelect: value => updateCurrentService(index, { renewalDate: value }),
                    })
                  }
                >
                  <Text style={[styles.selectText, !item.renewalDate && styles.selectPlaceholder]}>
                    {item.renewalDate || 'dd/mm/yyyy'}
                  </Text>
                  <Icon family="Feather" name="calendar" size={16} color={COLORS.PRIMARY} />
                </Pressable>
              </View>
            </View>
          );
        })}
      </>
    )}

    {/* Our Service */}
    <View style={[styles.additionalHeader, styles.sectionGap]}>
      <Text style={styles.sectionTitleNoMargin}>
        Our Service
      </Text>

      <Pressable
        onPress={() => setOurServices(prev => [...prev, { ...EMPTY_OUR_SERVICE }])}
        hitSlop={10}
      >
        <Text style={styles.addText}>+ Add Service</Text>
      </Pressable>
    </View>

    {ourServices.map((item, index) => {
      const itemProvider = options?.providers.find(
        provider => provider.id === item.providerId,
      );
      const itemPlans = item.providerId
        ? options?.plans[item.providerId] ?? []
        : [];

      return (
        <View key={index} style={styles.leadSpecificationBox}>
          <View style={styles.additionalHeader}>
            <Text style={styles.sectionTitleNoMargin}>
              Service {index + 1}
            </Text>

            <Pressable
              onPress={() =>
                setOurServices(prev => prev.filter((_, i) => i !== index))
              }
              hitSlop={10}
            >
              <Text style={styles.addText}>REMOVE</Text>
            </Pressable>
          </View>

          <SelectInput
            label="Services"
            value={itemProvider?.name ?? ''}
            onPress={() =>
              openDropdown(
                'Services',
                options?.providers.map(provider => provider.name),
                value => {
                  const provider = options?.providers.find(p => p.name === value);
                  if (provider && provider.id !== item.providerId) {
                    updateOurService(index, { providerId: provider.id, plan: null, sku: '' });
                  }
                },
              )
            }
          />

          <SelectInput
            label="Plan"
            value={item.plan?.name ?? ''}
            onPress={() => {
              if (!item.providerId) {
                dispatch(showToast({ message: 'Select a service first.', type: 'info' }));
                return;
              }
              openDropdown(
                'Plan',
                itemPlans.map(p => p.name),
                value => {
                  const selectedPlan = itemPlans.find(p => p.name === value) ?? null;
                  updateOurService(index, {
                    plan: selectedPlan,
                    sku: selectedPlan?.sku ?? '',
                  });
                },
              );
            }}
          />

          <View style={styles.fieldContainer}>
            <FieldLabel label="Renewal Date" />

            <Pressable
              style={styles.selectInput}
              onPress={() =>
                setDatePicker({
                  title: 'Renewal Date',
                  value: item.renewalDate,
                  onSelect: value => updateOurService(index, { renewalDate: value }),
                })
              }
            >
              <Text style={[styles.selectText, !item.renewalDate && styles.selectPlaceholder]}>
                {item.renewalDate || 'dd/mm/yyyy'}
              </Text>
              <Icon family="Feather" name="calendar" size={16} color={COLORS.PRIMARY} />
            </Pressable>
          </View>

          <View style={styles.fieldContainer}>
            <FieldLabel label="Rate" />

            <View style={styles.selectInput}>
              <Text style={styles.selectText}>{item.plan ? `₹${item.plan.rate}` : ''}</Text>
              <Text style={styles.selectText}>Per User / Per Year</Text>
            </View>
          </View>

          <FormInput
            label="Quantity"
            value={item.quantity}
            onChangeText={value => updateOurService(index, { quantity: value })}
            keyboardType="numeric"
          />
        </View>
      );
    })}
  </>
)}

          {/* Bottom space for button */}
          <View style={styles.bottomSpacing} />
          <View style={styles.submitContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            {
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>
            {leadId || activeTab === 'Services' ? 'Save Lead' : 'Next'}
          </Text>
        </Pressable>
      </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={!!dropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdown(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDropdown(null)}
        >
          <Pressable style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{dropdown?.title}</Text>

            <ScrollView>
              {dropdown?.items.map(item => (
                <Pressable
                  key={item}
                  style={styles.option}
                  onPress={() => handleDropdownSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      <DatePicker
        visible={!!datePicker}
        title={datePicker?.title ?? ''}
        value={datePicker?.value ?? ''}
        onClose={() => setDatePicker(null)}
        onSelect={value => datePicker?.onSelect(value)}
      />
    </SafeAreaView>
  );
}