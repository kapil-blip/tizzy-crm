export { apiClient, API_BASE_URL } from './apiservices/api';
export { authApi } from './apiservices/authApi';
export type { CrmUser } from './apiservices/authApi';
export { leadsApi } from './apiservices/leadsApi';
export type {
  CrmLead,
  LeadsPagination,
  LeadsStats,
  LeadsResponseData,
  GetLeadsParams,
  CrmLeadDetail,
  LeadDetailResponseData,
  CreateLeadPayload,
  CreateLeadOptions,
  CreateLeadDataResponse,
  GstinDetails,
  CreateLeadResponse,
  LeadDocumentUpload,
  ProviderPlan,
  CheckDomainResponse,
} from './apiservices/leadsApi';
export { quotationsApi } from './apiservices/quotationsApi';
export type {
  CrmQuotation,
  QuotationPlan,
  QuotationsPagination,
  QuotationsResponseData,
  GetQuotationsParams,
} from './apiservices/quotationsApi';
export { performLogout } from './authSession';
