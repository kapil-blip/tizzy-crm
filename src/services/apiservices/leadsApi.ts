import ReactNativeBlobUtil from 'react-native-blob-util';
import { API_BASE_URL, API_HOST, apiClient, buildQuery } from './api';

export type LeadDomain = {
  domain_type: string | null;
  domain: string | null;
  domain_period: string | null;
  domain_rate: string | number | null;
  sac: string | null;
  domain_start: string | null;
  domain_end: string | null;
  domain_renewal_date: string | null;
};

export type CrmLead = {
  id: number;
  salutation?: string | null;
  name: string;
  designation?: string | null;
  email?: string | null;
  mobile_code?: string | null;
  mobile?: string | null;
  company_name?: string | null;
  industry?: string | null;
  no_of_employees?: number | null;
  gstin?: string | null;
  lead_category?: string | null;
  lead_priority?: string | null;
  lead_status?: string | null;
  lead_source?: string | null;
  lead_bifurcation?: string | null;
  assigned_to?: string | null;
  mailing_address?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  pincode?: string | null;
  follow_up_date?: string | null;
  follow_up_note?: string | null;
  business_type?: string | null;
  document?: { type: string; path: string; name: string }[] | string | null;
  domain?: LeadDomain | null;
  domain_type?: string | null;
  domain_rate?: string | null;
  domain_period?: string | null;
  domain_start?: string | null;
  domain_end?: string | null;
  domain_renewal_date?: string | null;
  sac?: string | null;
  justdial_lead_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
};

export type LeadsPagination = {
  page_no: number;
  current_page: number;
  item_per_page: number;
  last_page: number;
  total: number;
  from: number | null;
  to: number | null;
};

export type LeadsStats = {
  total: number;
  new: number;
  qualified: number;
  won: number;
  lost: number;
};

export type LeadsResponseData = {
  leads: CrmLead[];
  pagination: LeadsPagination;
  stats: LeadsStats;
  employees: string[];
};

export type CrmLeadContact = {
  id: number;
  lead_id: number;
  name?: string | null;
  designation?: string | null;
  email?: string | null;
  mobile?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type CrmProvider = {
  id: number;
  name: string;
  slug?: string | null;
  description?: string | null;
  logo?: string | null;
  type?: string | null;
  website_url?: string | null;
  api_base_url?: string | null;
  auth_type?: string | null;
  config_json?: string | null;
  transfer_type?: string | null;
  transfer_detail?: string | null;
  status?: string | null;
  has_variant?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type CrmPlan = {
  id: number;
  sr_no?: number | null;
  provider_id?: number | null;
  category_id?: number | null;
  program_id?: number | null;
  variant_id?: number | null;
  plan_type?: string | null;
  title?: string | null;
  name: string;
  slug?: string | null;
  storage?: string | null;
  price?: string | null;
  features?: string | null;
  customer_limit?: number | null;
  actual_price?: string | null;
  billing_cycle?: string | null;
  description?: string | null;
  limited_offer?: number | null;
  is_active?: number | null;
  status?: number | null;
  subscription_type?: string | null;
  discount_type?: string | null;
  discount_percentage?: string | null;
  microsoft_sku_id?: string | null;
  microsoft_product_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type CrmLeadService = {
  id: number;
  lead_id: number;
  provider_id?: number | null;
  plan_id?: number | null;
  quote_period?: string | null;
  sku?: string | null;
  quantity?: number | null;
  rate?: string | null;
  rate_provider?: string | null;
  renewal_date?: string | null;
  is_info?: boolean;
  domain?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  provider?: CrmProvider | null;
  plan?: CrmPlan | null;
};

export type CrmLeadDetail = CrmLead & {
  contacts?: CrmLeadContact[];
  services?: CrmLeadService[];
  our_service_plan_detail?: CrmLeadService[];
};

export type ProviderPlan = {
  id: number;
  name: string;
  sku: string;
  slug: string;
  actual_price: number;
  rate: number;
};

export type LeadDetailResponseData = {
  lead: CrmLeadDetail;
  providers: { id: number; name: string }[];
  provider_plans: Record<string, ProviderPlan[]>;
  history: { at: string; text: string }[];
  assignees: string[];
};

export type CreateLeadPayload = {
  customer_detail: {
    salutation: string;
    name: string;
    designation: string;
    email: string;
    mobile_code: string;
    mobile: string;
    company_name: string;
    industry: string;
    no_of_employees: number | null;
    gstin: string;
    business_type: string;
  };
  address_information: {
    mailing_address: string;
    country: string;
    state: string;
    city: string;
    pincode: string;
  };
  domain: {
    domain_type: string;
    domain: string;
    domain_period: string;
    domain_rate: number | null;
    sac: string;
    domain_start: string;
    domain_end: string;
    domain_renewal_date: string;
  };
  our_service_plan_detail: {
    provider_id: number | null;
    plan_id: number | null;
    quote_period: string;
    sku: string;
    quantity: number;
    rate?: number | null;
    renewal_date?: string;
  }[];
  current_service_info: {
    domain: string;
    provider_id: number | null;
    plan_id: number | null;
    quantity: number;
    rate: number | null;
    renewal_date: string;
  }[];
  additional_contact: {
    name: string;
    designation: string;
    email: string;
    mobile: string;
  }[];
  lead_specification: {
    lead_priority: string;
    lead_status: string;
    lead_source: string;
    lead_bifurcation: string;
    assigned_to: string;
  };
  follow_up_detail: {
    follow_up_date: string;
    follow_up_note: string;
  };
};

export type CreateLeadOptions = {
  salutation: string[];
  business_type: string[];
  domain_type: string[];
  domain_period: string[];
  quote_period: string[];
  countries: string[];
  states: Record<string, string[]>;
  cities: Record<string, Record<string, string[]>>;
  lead_priority: string[];
  lead_status: string[];
  lead_source: string[];
  lead_bifurcation: string[];
  designation: string[];
  assignees: string[];
  providers: { id: number; name: string }[];
  plans: Record<string, ProviderPlan[]>;
};

export type CreateLeadDataResponse = {
  sample: CreateLeadPayload;
  options: CreateLeadOptions;
};

export type GstinDetails = {
  company_name: string;
  legal_name: string;
  trade_name: string;
  company_address: string;
  last_updated: string;
  constitution: string;
  registration_date: string;
  nature_of_business: string[];
  state: string;
  pincode: string;
  gst_status: string;
  city: string;
  country: string;
  pan_no: string;
};

export type LeadDocumentUpload = {
  uri: string;
  name: string;
  type: string;
  documentType: string;
  isExisting?: boolean;
  path?: string;
};

export type CreateLeadResponse = {
  lead: CrmLeadDetail;
};

export type CheckDomainResponse = {
  ok: boolean;
  available: boolean;
  registered?: boolean;
  invalid?: boolean;
  message: string;
};

export type GetLeadsParams = {
  page_no?: number;
  item_per_page?: number;
  search?: string;
  source?: string;
};

const appendFormData = (formData: FormData, key: string, value: unknown) => {
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      appendFormData(formData, `${key}[${index}]`, item),
    );
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([childKey, childValue]) =>
      appendFormData(formData, `${key}[${childKey}]`, childValue),
    );
  } else {
    formData.append(key, value == null ? '' : String(value));
  }
};

const buildLeadFormData = (
  data: CreateLeadPayload,
  documents: LeadDocumentUpload[],
) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) =>
    appendFormData(formData, key, value),
  );
  // API requires documents.* to be files. Only remaining docs in the list are sent.
  documents.forEach((doc, index) => {
    formData.append(`documents[${index}]`, {
      uri: doc.uri,
      name: doc.name,
      type: doc.type,
    } as any);
    formData.append(`document_types[${index}]`, doc.documentType);
  });
  return formData;
};

export const leadsApi = {
  // To fetch leads
  getLeads: (params: GetLeadsParams = {}) =>
    apiClient.get<LeadsResponseData>(
      `/leads${buildQuery({
        page_no: params.page_no,
        item_per_page: params.item_per_page,
        search: params.search?.trim(),
        source: params.source,
      })}`,
    ),

  createLead: (data: CreateLeadPayload, documents: LeadDocumentUpload[] = []) =>
    apiClient.post<CreateLeadResponse>(
      '/lead-create',
      buildLeadFormData(data, documents),
    ),

  updateLead: (
    leadId: number | string,
    data: CreateLeadPayload,
    documents: LeadDocumentUpload[] = [],
  ) =>
    apiClient.post<CreateLeadResponse>(
      `/leads/${encodeURIComponent(String(leadId))}/update`,
      buildLeadFormData(data, documents),
    ),

  // To get lead creation data options
  getCreateLeadData: () =>
    apiClient.get<CreateLeadDataResponse>('/leads/create'),

  searchGstin: (gstin: string) =>
    apiClient.post<GstinDetails>(
      `${API_HOST}/api/v1/search-gstin`,
      { gstin },
      false,
    ),

  checkDomain: (domain: string) =>
    apiClient.get<CheckDomainResponse>(
      `/leads/check-domain${buildQuery({ domain })}`,
    ),

  getCountries: () => apiClient.get<string[]>('/countries'),

  getStates: (country: string) =>
    apiClient.get<string[]>(`/states${buildQuery({ country })}`),

  getCities: (country: string, state: string) =>
    apiClient.get<string[]>(`/cities${buildQuery({ country, state })}`),

  // To fetch lead detail by id
  getLeadById: (leadId: number | string) =>
    apiClient.get<LeadDetailResponseData>(
      `/leads/${encodeURIComponent(String(leadId))}`,
    ),

  uploadLeadsFile: (file: { uri: string; name: string; type: string }) => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any);
    return apiClient.post('/leads/uploads', formData);
  },

  downloadLeadSample: async () => {
    const token = await apiClient.getToken();
    const path = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/leads_sample.csv`;
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    await ReactNativeBlobUtil.config({
      path,
      fileCache: true,
    }).fetch('GET', `${API_BASE_URL}/leads/uploads/sample`, headers);
    return path;
  },
};
