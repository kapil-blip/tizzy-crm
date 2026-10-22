import React, { useCallback, useState } from 'react';
import {
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import Header from '../../../../components/Header';
import Icon from '../../../../components/Icon';
import { COLORS } from '../../../../assets/themes/colors';
import { goBack, navigate } from '../../../../navigation/NavigationService';
import styles from './LeadDetailStyle';
import LinearGradient from 'react-native-linear-gradient';
import { leadsApi } from '../../../../services';
import type {
  CrmLeadDetail,
  LeadDetailResponseData,
} from '../../../../services';
import { API_HOST } from '../../../../services/apiservices/api';
import { useAppDispatch } from '../../../../store/hooks';
import {
  hideLoader,
  showLoader,
  showToast,
} from '../../../../store/slices/viewSlice';
import {
  formatDate,
  formatMobile,
  textOrFallback,
} from '../../../../utils/Utils';
import PdfViewer from '../../../../components/PdfViewer';

type TabType = 'Overview' | 'Follow-up' | 'Services';

type LeadStatus = string;

type LeadDetail = {
  id: string;
  company: string;
  primaryContact: string;
  createdOn: string;
  createdMonthsAgo: string;
  status: LeadStatus;
  fullName: string;
  designation: string;
  email: string;
  contactNo: string;
  gstin: string;
  industry: string;
  employeeCount: string;
  address: string;
  specification: LeadSpecification;
  additionalContacts: [string, string][][];
  followUp: FollowUpDetail;
  businessType: string;
  currentServices: [string, string][][];
  ourServices: [string, string][][];
  domainRows: [string, string][];
  documents: { type: string; name: string; url: string }[];
  activities: { text: string; time: string }[];
};

type LeadSpecification = {
  priority: string;
  status: string;
  source: string;
  bifurcation: string;
  assignedTo: string;
};

type FollowUpDetail = {
  leadStatus: LeadStatus;
  assignedTo: string;
  followUpDate: string;
  note: string;
};

const formatPrice = (value?: string | null) => {
  const amount = Number(value);
  if (value == null || value === '' || Number.isNaN(amount)) return '-';
  return `₹ ${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const TABS: TabType[] = ['Overview', 'Follow-up', 'Services'];

const getMonthsAgo = (value?: string | null) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  const now = new Date();
  const months = Math.max(
    0,
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth()),
  );
  return `${months} ${months === 1 ? 'Month' : 'Months'}`;
};

const getTimeAgo = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  const minutes = Math.max(
    0,
    Math.floor((Date.now() - date.getTime()) / 60000),
  );
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  return formatDate(value);
};

const getActivityIcon = (text: string) => {
  const value = text.toLowerCase();
  if (value.includes('lead created')) {
    return { name: 'user-plus', color: '#7B61FF', backgroundColor: '#F0EDFF' };
  }
  if (value.includes('service')) {
    return { name: 'check', color: '#27AE60', backgroundColor: '#E8F7EF' };
  }
  if (value.includes('follow-up')) {
    return {
      name: 'phone-call',
      color: COLORS.PRIMARY,
      backgroundColor: '#EAF2FD',
    };
  }
  return {
    name: 'activity',
    color: COLORS.PRIMARY,
    backgroundColor: '#EAF2FD',
  };
};

const mapLeadDetail = (
  lead: CrmLeadDetail,
  history: LeadDetailResponseData['history'] = [],
): LeadDetail => {
  const services = lead.services ?? [];
  const status = lead.lead_status?.trim() || 'New';
  const primaryContact = [lead.salutation, lead.name].filter(Boolean).join(' ');
  const domainInfo =
    lead.domain && typeof lead.domain === 'object' ? lead.domain : null;
  const domainName =
    (typeof lead.domain === 'string'
      ? lead.domain
      : domainInfo?.domain
    )?.trim() || '';
  const domainType = (domainInfo?.domain_type ?? lead.domain_type)?.trim();
  const domainRate = domainInfo?.domain_rate ?? lead.domain_rate;
  const domainRows: [string, string][] = domainName
    ? [
      [
        'Domain Type',
        domainType === 'new'
          ? 'New'
          : domainType === 'existing'
            ? 'Existing'
            : '-',
      ],
      ['Domain Name', domainName],
      ...(domainType === 'new'
        ? ([
          [
            'Period',
            textOrFallback(domainInfo?.domain_period ?? lead.domain_period),
          ],
          ['Rate', domainRate ? `₹${Number(domainRate)}` : '-'],
          ['SAC', textOrFallback(domainInfo?.sac ?? lead.sac)],
          [
            'Domain Start',
            formatDate(domainInfo?.domain_start ?? lead.domain_start),
          ],
          [
            'Domain End',
            formatDate(domainInfo?.domain_end ?? lead.domain_end),
          ],
        ] as [string, string][])
        : []),
      ...(domainType === 'existing'
        ? ([
          [
            'Renewal Date',
            formatDate(
              domainInfo?.domain_renewal_date ?? lead.domain_renewal_date,
            ),
          ],
        ] as [string, string][])
        : []),
    ]
    : [];

  return {
    id: String(lead.id),
    company: textOrFallback(lead.company_name),
    primaryContact: textOrFallback(primaryContact),
    createdOn: formatDate(lead.created_at),
    createdMonthsAgo: getMonthsAgo(lead.created_at),
    status,
    fullName: textOrFallback(lead.name),
    designation: textOrFallback(lead.designation),
    email: textOrFallback(lead.email),
    contactNo: formatMobile(lead.mobile_code, lead.mobile),
    gstin: textOrFallback(lead.gstin),
    industry: textOrFallback(lead.industry),
    employeeCount: textOrFallback(lead.no_of_employees),
    address: textOrFallback(lead.mailing_address),
    specification: {
      priority: textOrFallback(lead.lead_priority || lead.lead_category),
      status,
      source: textOrFallback(lead.lead_source),
      bifurcation: textOrFallback(lead.lead_bifurcation),
      assignedTo: textOrFallback(lead.assigned_to),
    },
    additionalContacts: (lead.contacts ?? []).map(contact => [
      ['Full Name', textOrFallback(contact.name)],
      ['Designation', textOrFallback(contact.designation)],
      ['Email', textOrFallback(contact.email)],
      ['Contact No.', formatMobile(null, contact.mobile)],
    ]),
    followUp: {
      leadStatus: status,
      assignedTo: textOrFallback(lead.assigned_to),
      followUpDate: formatDate(lead.follow_up_date),
      note: textOrFallback(lead.follow_up_note),
    },
    businessType: lead.business_type === 'existing' ? 'Existing Business' : 'New Business',
    currentServices: services
      .filter(item => item.is_info)
      .map(item => [
        ['Domain', textOrFallback(item.domain)],
        ['Service', textOrFallback(item.provider?.name)],
        ['Plan Name', textOrFallback(item.plan?.name)],
        ['Current Price', formatPrice(item.rate)],
        ['Renewal Date', formatDate(item.renewal_date)],
        ['No of Users', textOrFallback(item.quantity)],
      ]),
    ourServices: services
      .filter(item => !item.is_info)
      .map(item => [
        ['Service', textOrFallback(item.provider?.name)],
        ['Plan Name', textOrFallback(item.plan?.name)],
        ['Quot Period', textOrFallback(item.quote_period)],
        ['Rate', formatPrice(item.rate)],
        ['No of Users', textOrFallback(item.quantity)],
      ]),
    domainRows,
    documents: Array.isArray(lead.document)
      ? lead.document.map(doc => ({
        type: textOrFallback(doc.type),
        name: textOrFallback(doc.name),
        url: `${API_HOST}/storage/${doc.path}`,
      }))
      : [],
    activities: history.map(item => ({
      text: item.text,
      time: getTimeAgo(item.at),
    })),
  };
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function LeadDetailView() {
  const route = useRoute<any>();
  const leadId = route.params?.leadId as string | undefined;

  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const [lead, setLead] = useState<LeadDetail | null>(null);
  // document pdf viewer
  const [selectedDocument, setSelectedDocument] = useState<{
    type: string;
    name: string;
    url: string;
  } | null>(null);

  const [documentLoading, setDocumentLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!leadId) return;

      const fetchLead = async () => {
        dispatch(showLoader({ transparent: true }));
        try {
          const response = await leadsApi.getLeadById(leadId);
          if (response.success && response.data?.lead) {
            setLead(mapLeadDetail(response.data.lead, response.data.history));
          } else {
            dispatch(
              showToast({
                message: response.message || 'Unable to fetch lead details.',
                type: 'error',
              }),
            );
          }
        } catch {
          dispatch(
            showToast({
              message: 'Something went wrong while fetching lead details.',
              type: 'error',
            }),
          );
        } finally {
          dispatch(hideLoader());
        }
      };

      fetchLead();
    }, [leadId, dispatch]),
  );

  const header = (
    <>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        translucent={false}
      />

      <Header
        title="Lead Detail"
        leftIconType="back"
        onLeftPress={() => goBack()}
        rightIconAsset={
          <View style={styles.editIconCircle}>
            <Icon
              family="Feather"
              name="edit-2"
              size={16}
              color={COLORS.PRIMARY}
            />
          </View>
        }
        onRightPress={() => {
          if (leadId) navigate('AddLeads', { leadId });
        }}
      />
      <View style={styles.bottomShadow} />
    </>
  );

  if (!lead) {
    return (
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        {header}
      </SafeAreaView>
    );
  }

  const renderOverview = () => (
    <>
      <View style={styles.infoCard}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Basic Information</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>{lead.status}</Text>
          </View>
        </View>

        <InfoRow label="Full Name" value={lead.fullName} />
        <InfoRow label="Designation" value={lead.designation} />
        <InfoRow label="Email" value={lead.email} />
        <InfoRow label="Contact No." value={lead.contactNo} />
        <InfoRow label="GSTIN" value={lead.gstin} />
        <InfoRow label="Industry" value={lead.industry} />
        <InfoRow label="Number of Employee" value={lead.employeeCount} />
        <InfoRow label="Address" value={lead.address} />
      </View>

      <View style={styles.infoCard}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Lead Specification</Text>
        </View>

        <InfoRow label="Lead Priority" value={lead.specification.priority} />
        <InfoRow label="Lead Status" value={lead.specification.status} />
        <InfoRow label="Lead Source" value={lead.specification.source} />
        <InfoRow
          label="Lead Bifurcation"
          value={lead.specification.bifurcation}
        />
        <InfoRow label="Assigned To" value={lead.specification.assignedTo} />
      </View>

      <View style={styles.infoCard}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Additional Contact</Text>
          <Pressable
            style={({ pressed }) => [
              styles.addContactButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => {
              // TODO: open add contact flow
            }}
          >
            <Icon
              family="Feather"
              name="plus"
              size={16}
              color={COLORS.PRIMARY}
            />
            <Text style={styles.addContactText}> ADD</Text>
          </Pressable>
        </View>

        {lead.additionalContacts.length > 0
          ? lead.additionalContacts.map((rows, index) => renderServiceBox(rows, index))
          : renderPlaceholder('No contacts added')}
      </View>

      <View style={styles.infoCard}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Documents</Text>
        </View>

        {lead.documents.length > 0
          ? lead.documents.map((doc, index) => (
            <Pressable
              key={`${doc.url}-${index}`}
              style={({ pressed }) => [
                styles.documentRow,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => {
                const extension = doc.name.split('.').pop()?.toLowerCase();

                if (extension === 'pdf') {
                  setSelectedDocument(doc);
                } else {
                  dispatch(
                    showToast({
                      message: 'This document format needs an in-app Word document viewer.',
                      type: 'error',
                    }),
                  );
                }
              }}
            >
              <Icon
                family="Feather"
                name="file-text"
                size={18}
                color={COLORS.PRIMARY}
              />

              <View style={styles.documentInfo}>
                <Text style={styles.documentType}>{doc.type}</Text>
                <Text style={styles.documentName} numberOfLines={1}>
                  {doc.name}
                </Text>
              </View>

              <Icon
                family="Feather"
                name="eye"
                size={18}
                color={COLORS.GREY_400}
              />
            </Pressable>
          ))
          : renderPlaceholder('No documents uploaded')}
      </View>
    </>
  );

  const renderFollowUp = () => (
    <View style={styles.followUpCard}>
      {/* Header */}
      <View style={styles.followUpHeader}>
        <Text style={styles.followUpTitle}>Follow Up Detail</Text>

        <View style={styles.followUpStatusBadge}>
          <Text style={styles.followUpStatusText}>
            {lead.followUp.leadStatus}
          </Text>
        </View>
      </View>

      {/* Follow Up Date */}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Follow Up Date</Text>

        <View style={styles.followUpDateRow}>
          <Text style={styles.infoValue}>{lead.followUp.followUpDate}</Text>
          <Icon
            family="Feather"
            name="calendar"
            size={18}
            color={COLORS.PRIMARY}
          />
        </View>
      </View>

      {/* Note */}
      <View style={styles.followUpNote}>
        <Text style={styles.followUpNoteText}>
          <Text style={styles.followUpNoteTitle}>Follow Up Note: </Text>
          {lead.followUp.note}
        </Text>
      </View>
    </View>
  );

  const renderServiceBox = (rows: [string, string][], index: number) => (
    <View key={index} style={styles.serviceBox}>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.serviceBoxCell}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      ))}
    </View>
  );

  const renderServices = () => (
    <>
      {lead.domainRows.length > 0 && (
        <View style={styles.infoCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Domain</Text>
          </View>

          {lead.domainRows.map(([label, value]) => (
            <InfoRow key={label} label={label} value={value} />
          ))}
        </View>
      )}

      <View style={styles.infoCard}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Choose Business</Text>
        </View>

        <InfoRow label="Business Type" value={lead.businessType} />
      </View>

      {lead.currentServices.length > 0 && (
        <View style={styles.infoCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Current Service (Info)</Text>
          </View>

          {lead.currentServices.map((rows, index) => renderServiceBox(rows, index))}
        </View>
      )}

      <View style={styles.infoCard}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Our Service</Text>
        </View>

        {lead.ourServices.length > 0
          ? lead.ourServices.map((rows, index) => renderServiceBox(rows, index))
          : renderPlaceholder('No services added')}
      </View>

      <View style={styles.infoCard}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Recent Activities</Text>
        </View>

        {lead.activities.length > 0
          ? lead.activities.map((item, index) => {
            const icon = getActivityIcon(item.text);
            const isLast = index === lead.activities.length - 1;
            return (
              <View key={`${item.text}-${index}`} style={styles.activityRow}>
                <View style={styles.activityIconColumn}>
                  <View
                    style={[
                      styles.activityIcon,
                      { backgroundColor: icon.backgroundColor },
                    ]}
                  >
                    <Icon
                      family="Feather"
                      name={icon.name}
                      size={16}
                      color={icon.color}
                    />
                  </View>
                  {!isLast && <View style={styles.activityLine} />}
                </View>

                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{item.text}</Text>
                  <Text style={styles.activityTime}>{item.time}</Text>
                </View>
              </View>
            );
          })
          : renderPlaceholder('No recent activities')}
      </View>
    </>
  );

  const renderPlaceholder = (message: string) => (
    <View style={styles.placeholderWrap}>
      <Text style={styles.placeholderText}>{message}</Text>
    </View>
  );

  const renderBottomActions = () => (
    <View style={styles.bottomBar}>
      <Pressable
        style={({ pressed }) => [
          styles.logCallButton,
          { opacity: pressed ? 0.85 : 1 },
        ]}
        onPress={() => { }}
      >
        <Icon family="Feather" name="phone" size={18} color={COLORS.GREY_900} />
        <Text style={styles.logCallText}>Log Call</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.followUpButton,
          { opacity: pressed ? 0.85 : 1 },
        ]}
        onPress={() => { }}
      >
        <Icon family="AntDesign" name="plus" size={18} color={COLORS.WHITE} />
        <Text style={styles.followUpText}>Follow-up</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      {header}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={['#187BE4', '#003670']}
          style={styles.bannerCard}
        >
          <View style={styles.bannerGradientTop} />

          <View style={styles.bannerContent}>
            <Text style={styles.bannerCompany}>{lead.company}</Text>
            <Text style={styles.bannerContact}>{lead.primaryContact}</Text>
            <Text style={styles.bannerMeta}>
              Created On : {lead.createdOn} ({lead.createdMonthsAgo})
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.tabsContainer}>
          {TABS.map(tab => {
            const active = activeTab === tab;

            return (
              <Pressable
                key={tab}
                style={[styles.tab, active && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, active && styles.activeTabText]}>
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {activeTab === 'Overview' && renderOverview()}
        {activeTab === 'Follow-up' && renderFollowUp()}
        {activeTab === 'Services' && renderServices()}

        {/* Pushes buttons to screen bottom when content is short */}
        <View style={styles.spacer} />

        {renderBottomActions()}
      </ScrollView>
      <Modal
        visible={!!selectedDocument}
        animationType="slide"
        onRequestClose={() => setSelectedDocument(null)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 16,
            }}
          >
            <Text numberOfLines={1} style={{ flex: 1, fontSize: 16 }}>
              {selectedDocument?.name ?? 'Document'}
            </Text>

            <Pressable onPress={() => setSelectedDocument(null)}>
              <Icon
                family="Feather"
                name="x"
                size={24}
                color={COLORS.GREY_900}
              />
            </Pressable>
          </View>

          {selectedDocument ? (
            <PdfViewer
              mode="inline"
              source={{
                uri: selectedDocument.url,
                cache: true,
              }}
              loading={documentLoading}
              onLoadingChange={setDocumentLoading}
              onError={() => {
                dispatch(
                  showToast({
                    message: 'Unable to open this PDF document.',
                    type: 'error',
                  }),
                );
              }}
              containerStyle={{ flex: 1 }}
            />
          ) : null}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
