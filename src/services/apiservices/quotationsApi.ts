import { apiClient, buildQuery } from './api';

export type QuotationPlan = {
  from_service_id?: string | null;
  provider_id: string;
  plan_id: string;
  quote_period?: string | null;
  billing_start_date?: string | null;
  billing_end_date?: string | null;
  sku?: string | null;
  quantity: string;
  rate: string;
  name: string;
  provider_name: string;
};

export type CrmQuotation = {
  id: number;
  quotation_no: string;
  lead_id: number | null;
  company_name?: string | null;
  gstin?: string | null;
  name?: string | null;
  email?: string | null;
  designation?: string | null;
  mailing_address?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  country?: string | null;
  provider_id?: number | null;
  service_name?: string | null;
  valid_date?: string | null;
  discount?: string | null;
  quotation_period?: string | null;
  domain_name?: string | null;
  sac?: string | null;
  domain_start?: string | null;
  domain_end?: string | null;
  domain_rate?: string | null;
  plans?: QuotationPlan[];
  plan_name?: string | null;
  quantity?: number | null;
  total_amount?: string | null;
  discount_status?: string | null;
  invoice_status?: string | null;
  assigned_to?: string | null;
  follow_up_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  sent_at?: string | null;
  sent_emails?: string[] | null;
  responded_email?: string | null;
  responded_at?: string | null;
  salutation?: string | null;
  mobile_code?: string | null;
  customer_status?: string | null;
  quotation_status?: string | null;
  invoice_responded_email?: string | null;
  order_id?: number | null;
  crm_order_no?: string | null;
  po_mode?: string | null;
  po_number?: string | null;
  po_date?: string | null;
  po_amount?: string | null;
  po_document_url?: string | null;
  po_journey_status?: string | null;
  deal_type?: string | null;
  sent_cc_emails?: string[] | null;
  invoice_sent_at?: string | null;
  invoice_sent_emails?: string[] | null;
  invoice_sent_cc_emails?: string[] | null;
  invoice_responded_at?: string | null;
  billing_start_date?: string | null;
  version_no?: number | null;
  version_total?: number | null;
  is_latest_version?: boolean;
  is_locked?: boolean;
};

export type QuotationsPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type QuotationsResponseData = {
  quotations: CrmQuotation[];
  pagination: QuotationsPagination;
  status_counts: Record<string, number>;
};

export type GetQuotationsParams = {
  tab?: string;
  status?: string;
  search?: string;
  date_type?: string;
  from?: string;
  to?: string;
  page?: number;
};

export type QuotationFormPlan = {
  from_service_id: number | null;
  provider_id: number | null;
  plan_id: number | null;
  quote_period: string;
  billing_start_date: string;
  sku: string;
  quantity: number;
  rate: number | null;
};

export type QuotationFormSample = {
  deal_type: string;
  lead_id: number | null;
  salutation: string;
  name: string;
  company_name: string;
  gstin: string;
  email: string;
  mobile_code: string;
  mobile: string;
  discount: number;
  domain_type: string;
  domain_name: string;
  domain_rate: number | null;
  sac: string;
  domain_start: string;
  domain_end: string;
  plans: QuotationFormPlan[];
};

export type QuotationFormContact = {
  id: number;
  lead_id: number;
  name: string;
  email: string | null;
  mobile: string | null;
};

export type QuotationFormLead = {
  id: number;
  company_name: string | null;
  name: string;
  salutation: string | null;
  email: string | null;
  gstin: string | null;
  designation: string | null;
  mobile: string | null;
  mobile_code: string | null;
  domain: string | null;
  domain_type: string | null;
  domain_rate: string | number | null;
  sac: string | null;
  domain_start: string | null;
  domain_end: string | null;
  lead_priority: string | null;
  contacts: QuotationFormContact[];
};

export type QuotationFormService = {
  id: number;
  [key: string]: unknown;
};

export type QuotationFormProvider = {
  id: number;
  name: string;
};

export type QuotationFormPlanOption = {
  id: number;
  name: string;
  sku: string;
  slug: string;
  actual_price: number;
  rate: number;
};

export type QuotationFormOptions = {
  deal_type: Record<string, string>;
  salutation: string[];
  domain_type: string[];
  quote_period: string[];
};

export type QuotationCreateFormData = {
  sample: QuotationFormSample;
  lead: QuotationFormLead | null;
  services: QuotationFormService[];
  current_services: QuotationFormService[];
  leads: QuotationFormLead[];
  providers: QuotationFormProvider[];
  plans: Record<string, QuotationFormPlanOption[]>;
  options: QuotationFormOptions;
};

export type GetQuotationCreateFormParams = {
  lead_id?: number;
  email?: string;
  mobile?: string;  
};

export type QuotationDetailLead = {
  id: number;
  name?: string | null;
  company_name?: string | null;
  email?: string | null;
  mobile?: string | null;
  mobile_code?: string | null;
  salutation?: string | null;
  gstin?: string | null;
  domain?: string | null;
  domain_type?: string | null;
};

export type QuotationDetailData = {
  quotation: CrmQuotation & { lead?: QuotationDetailLead | null };
  is_latest?: boolean;
  is_locked?: boolean;
};

export const quotationsApi = {
  // To fetch quotations
  getQuotations: (params: GetQuotationsParams = {}) =>
    apiClient.get<QuotationsResponseData>(
      `/quotations${buildQuery({ ...params, search: params.search?.trim() })}`,
    ),
  getQuotationById: (quotationId: number | string) =>
    apiClient.get<QuotationDetailData>(
      `/quotations/${encodeURIComponent(String(quotationId))}`,
    ),
  getCreateFormData: (params: GetQuotationCreateFormParams = {}) =>
    apiClient.get<{
      success: boolean;
      message: string;
      data: QuotationCreateFormData;
    }>(`/quotations/create${buildQuery(params)}`),
  createQuotation: (payload: QuotationFormSample) =>
    apiClient.post('/quotation-create', payload),
  updateQuotation: (quotationId: number | string, payload: QuotationFormSample) =>
    apiClient.post(
      `/quotations/${encodeURIComponent(String(quotationId))}/update`,
      payload,
    ),
};
