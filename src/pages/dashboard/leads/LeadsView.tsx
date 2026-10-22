import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Modal,
    Pressable,
    StatusBar,
    Text,
    TextInput,
    View,
} from 'react-native';
import {
    errorCodes,
    isErrorWithCode,
    pick,
    types,
} from '@react-native-documents/picker';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../../../components/Header';
import Icon from '../../../components/Icon';
import styles from './LeadStyle';
import { COLORS } from '../../../assets/themes/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterIcon from '../../../assets/images/option-filter.svg';
import ShapesBgIcon from '../../../assets/images/shapes-bg.svg';
import { navigate } from '../../../navigation/NavigationService';
import { leadsApi } from '../../../services';
import type {
    CrmLead,
    LeadsPagination,
    LeadsStats,
} from '../../../services';
import { useAppDispatch } from '../../../store/hooks';
import {
    hideLoader,
    showLoader,
    showToast,
} from '../../../store/slices/viewSlice';
import { formatDate, formatMobile, textOrFallback } from '../../../utils/Utils';

type LeadStatus = string;

type Lead = {
    id: string;
    name: string;
    designation: string;
    company: string;
    mobile: string;
    email: string;
    assignedTo: string;
    date: string;
    status: LeadStatus;
};

type LeadsMeta = {
    pagination: LeadsPagination | null;
    stats: LeadsStats | null;
    employees: string[];
};

type FetchMode = 'initial' | 'silent' | 'refresh' | 'more';

const FILTERS = ['All', 'JD', 'Exhibition'];
const SEARCH_DEBOUNCE_MS = 400;
const MAX_LEAD_FILE_SIZE = 10 * 1024 * 1024;
const LEAD_FILE_REGEX = /\.(csv|xlsx|xls)$/i;

const mapLead = (lead: CrmLead): Lead => ({
    id: String(lead.id),
    name: textOrFallback(lead.name),
    designation: textOrFallback(lead.designation),
    company: textOrFallback(lead.company_name),
    mobile: formatMobile(lead.mobile_code, lead.mobile),
    email: textOrFallback(lead.email),
    assignedTo: textOrFallback(lead.assigned_to),
    date: formatDate(lead.created_at),
    status: lead.lead_status?.trim() || 'New',
});

export default function LeadsView() {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [leads, setLeads] = useState<Lead[]>([]);
    const [leadsMeta, setLeadsMeta] = useState<LeadsMeta>({
        pagination: null,
        stats: null,
        employees: [],
    });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const requestIdRef = useRef(0);
    const hasLoadedRef = useRef(false);
    const loadingMoreRef = useRef(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [uploadFile, setUploadFile] = useState<{
        uri: string;
        name: string;
        type: string;
    } | null>(null);
    const pageRef = useRef(1);

    useEffect(() => {
        const timer = setTimeout(
            () => setDebouncedSearch(search.trim()),
            SEARCH_DEBOUNCE_MS,
        );
        return () => clearTimeout(timer);
    }, [search]);

    const fetchLeads = useCallback(
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
                const response = await leadsApi.getLeads({
                    page_no: page,
                    item_per_page: 10,
                    search: debouncedSearch,
                    source:
                        selectedFilter === 'JD' || selectedFilter === 'Exhibition'
                            ? selectedFilter
                            : undefined,
                });
                if (requestId !== requestIdRef.current) return;

                if (response.success && response.data) {
                    const { leads: apiLeads, pagination, stats, employees } =
                        response.data;
                    const mapped = (apiLeads ?? []).map(mapLead);

                    setLeads(prev => {
                        if (page <= 1) {
                            return mapped;
                        }
                        const existingIds = new Set(prev.map(item => item.id));
                        const newLeads = mapped.filter(item => !existingIds.has(item.id));
                        return [...prev, ...newLeads];
                    });                    
                    setLeadsMeta({
                        pagination: pagination ?? null,
                        stats: stats ?? null,
                        employees: employees ?? [],
                    });
                    pageRef.current = page;
                    hasLoadedRef.current = true;
                    setHasLoaded(true);
                } else {
                    dispatch(
                        showToast({
                            message: response.message || 'Unable to fetch leads.',
                            type: 'error',
                        }),
                    );
                }
            } catch {
                if (requestId === requestIdRef.current) {
                    dispatch(
                        showToast({
                            message: 'Something went wrong while fetching leads.',
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
        [debouncedSearch, dispatch, selectedFilter],
    );

    useFocusEffect(
        useCallback(() => {
            fetchLeads(1, hasLoadedRef.current ? 'silent' : 'initial');
        }, [fetchLeads]),
    );

    const handleRefresh = () => {
        fetchLeads(1, 'refresh');
    };

    const closeUploadModal = () => {
        setUploadVisible(false);
        setUploadFile(null);
    };

    const pickLeadFile = async () => {
        try {
            const [file] = await pick({
                type: [types.csv, types.xls, types.xlsx],
            });
            const fileName = file.name ?? 'leads.csv';
            if (
                !LEAD_FILE_REGEX.test(fileName) ||
                (file.size ?? 0) > MAX_LEAD_FILE_SIZE
            ) {
                dispatch(
                    showToast({
                        message:
                            'Use a .csv, .xls or .xlsx file up to 10 MB.',
                        type: 'error',
                    }),
                );
                return;
            }
            setUploadFile({
                uri: file.uri,
                name: fileName,
                type: file.type || 'application/octet-stream',
            });
        } catch (error) {
            if (isErrorWithCode(error) && error.code === errorCodes.OPERATION_CANCELED) {
                return;
            }
            dispatch(showToast({ message: 'Unable to pick file.', type: 'error' }));
        }
    };

    const downloadSample = async () => {
        dispatch(showLoader({ transparent: true }));
        try {
            await leadsApi.downloadLeadSample();
            dispatch(
                showToast({
                    message: 'Sample CSV downloaded.',
                    type: 'success',
                }),
            );
        } catch {
            dispatch(
                showToast({
                    message: 'Unable to download sample file.',
                    type: 'error',
                }),
            );
        } finally {
            dispatch(hideLoader());
        }
    };

    const submitLeadUpload = async () => {
        if (!uploadFile) {
            dispatch(
                showToast({
                    message: 'Please select a file to upload.',
                    type: 'info',
                }),
            );
            return;
        }
        dispatch(showLoader({ transparent: true }));
        try {
            const response = await leadsApi.uploadLeadsFile(uploadFile);
            if (response.success) {
                dispatch(
                    showToast({
                        message: response.message || 'Leads uploaded successfully.',
                        type: 'success',
                    }),
                );
                closeUploadModal();
                fetchLeads(1, 'silent');
            } else {
                dispatch(
                    showToast({
                        message: response.message || 'Unable to upload leads.',
                        type: 'error',
                    }),
                );
            }
        } catch {
            dispatch(
                showToast({
                    message: 'Something went wrong while uploading leads.',
                    type: 'error',
                }),
            );
        } finally {
            dispatch(hideLoader());
        }
    };

    const handleLoadMore = () => {
        const { pagination } = leadsMeta;
        if (!pagination || loadingMoreRef.current || refreshing) return;
        if (pageRef.current >= pagination.last_page) return;
        fetchLeads(pageRef.current + 1, 'more');
    };

    const getStatusStyle = (status: LeadStatus) => {
        switch (status.toLowerCase()) {
            case 'new':
                return styles.statusNew;

            case 'not interested':
            case 'lost':
                return styles.statusNotInterested;

            case 'deal done':
            case 'won':
                return styles.statusDealDone;

            default:
                return styles.statusInProcess;
        }
    };

    const renderLead = ({ item }: { item: Lead }) => (
        <Pressable
            style={({ pressed }) => [
                styles.leadCard,
                { opacity: pressed ? 0.85 : 1 },
            ]}
            onPress={() => {
                navigate('LeadDetail', { leadId: item.id });
            }}
        >
            {/* Top section */}
            <View style={styles.leadTopRow}>
                <View style={styles.leadTitleContainer}>
                    <Text
                        style={styles.leadName}
                        numberOfLines={1}
                    >
                        {item.name}
                    </Text>

                    <Text
                        style={styles.leadCompany}
                        numberOfLines={1}
                    >
                        {item.designation} • {item.company}
                    </Text>
                </View>

                <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                    <Text style={styles.statusText}>
                        {item.status}
                    </Text>
                </View>
            </View>

            <View style={styles.cardDivider} />

            {/* Contact information */}
            <View style={styles.contactRow}>
                <View style={styles.contactColumn}>
                    <Text style={styles.fieldLabel}>MOBILE NO.</Text>
                    <Text
                        style={styles.fieldValue}
                        numberOfLines={1}
                    >
                        {item.mobile}
                    </Text>
                </View>

                <View style={styles.contactColumn}>
                    <Text style={styles.fieldLabel}>EMAIL</Text>
                    <Text
                        style={styles.fieldValue}
                        numberOfLines={2}
                    >
                        {item.email}
                    </Text>
                </View>
            </View>

            {/* Bottom section */}
            <View style={styles.leadBottomRow}>
                <View style={styles.assignedRow}>
                    <Icon
                        family="Feather"
                        name="user"
                        size={15}
                        color="#8B929D"
                    />
                    <Text style={styles.assignedLabel}>
                        Assigned:
                    </Text>
                    <Text style={styles.assignedValue}>
                        {item.assignedTo}
                    </Text>
                </View>
                <View style={styles.dateRow}>
                    <Icon
                        family="Feather"
                        name="calendar"
                        size={14}
                        color="#8B929D"
                    />
                    <Text style={styles.dateText}>
                        {item.date}
                    </Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.screen} edges={['top']}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} />
            <Header
                title="Leads"
            // rightIconType="notification"
            />
            <View style={styles.bottomShadow} />
            <View style={styles.content}>
                {/* Lead list */}
                <FlatList
                    data={leads}
                    keyExtractor={item => item.id}
                    renderItem={renderLead}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    keyboardShouldPersistTaps="handled"
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
                        <>
                        <View style={styles.searchRow}>
                    <View style={styles.searchContainer}>
                        <Icon
                            family="Feather"
                            name="search"
                            size={20}
                            color="#737B86"
                        />
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Quick Search..."
                            placeholderTextColor="#9AA9BF"
                            style={styles.searchInput}
                            returnKeyType="search"
                        />
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.filterButton,
                            { opacity: pressed ? 0.7 : 1 },
                        ]}
                        onPress={() => {
                            // Open filters
                        }}
                    >
                        <FilterIcon width={20} height={20} />
                    </Pressable>
                </View>

                {/* Add new lead banner */}
                <View style={styles.addLeadCard}>
                    {/* Background decorative pattern */}
                    <ShapesBgIcon style={styles.addLeadPatternBg} />

                    <View style={styles.addLeadCardContent}>
                        {/* Icon + Text */}
                        <View style={styles.addLeadTopRow}>
                            <View style={styles.addLeadIconTile}>
                                <Icon
                                    family="Feather"
                                    name="user-plus"
                                    size={24}
                                    color="#0561B9"
                                />
                            </View>

                            <View style={styles.addLeadTextWrap}>
                                <Text style={styles.addLeadTitle}>
                                    Add New Lead
                                </Text>

                                <Text style={styles.addLeadSubtitle}>
                                    Create and assign a new lead to start the
                                    {'\n'}
                                    sales process.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.addLeadCtaRow}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.addLeadCtaButton,
                                    { opacity: pressed ? 0.7 : 1 },
                                ]}
                                onPress={() => {
                                    navigate('AddLeads', {});
                                }}
                                accessibilityRole="button"
                                accessibilityLabel="Add New Lead"
                            >
                                <Text style={styles.addLeadCtaButtonText}>
                                    Add Lead
                                </Text>
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.addLeadCtaButton,
                                    { opacity: pressed ? 0.7 : 1 },
                                ]}
                                onPress={() => setUploadVisible(true)}
                                accessibilityRole="button"
                                accessibilityLabel="Upload Leads"
                            >
                                <Text style={styles.addLeadCtaButtonText}>
                                    Upload Leads
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                {/* Filters */}
                <View style={styles.filterTabs}>
                    {FILTERS.map(filter => {
                        const selected = selectedFilter === filter;

                        return (
                            <Pressable
                                key={filter}
                                style={[
                                    styles.filterTab,
                                    selected && styles.filterTabActive,
                                ]}
                                onPress={() => setSelectedFilter(filter)}
                            >
                                <Text
                                    style={[
                                        styles.filterTabText,
                                        selected && styles.filterTabTextActive,
                                    ]}
                                >
                                    {filter}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
                        </>
                    }
                    ListEmptyComponent={
                        hasLoaded ? (
                        <View style={styles.emptyContainer}>
                            <Icon
                                family="Feather"
                                name="users"
                                size={42}
                                color="#A5B1C2"
                            />

                            <Text style={styles.emptyTitle}>
                                No Leads Found
                            </Text>

                            <Text style={styles.emptyText}>
                                Try changing your search.
                            </Text>
                        </View>
                        ) : null
                    }
                />
            </View>

            <Modal
                visible={uploadVisible}
                transparent
                animationType="fade"
                onRequestClose={closeUploadModal}
            >
                <Pressable style={styles.uploadOverlay} onPress={closeUploadModal}>
                    <Pressable style={styles.uploadCard} onPress={() => {}}>
                        <Text style={styles.uploadTitle}>UPLOAD CUSTOMER LEADS</Text>

                        <Pressable style={styles.uploadBox} onPress={pickLeadFile}>
                            <Icon
                                family="Feather"
                                name="upload-cloud"
                                size={32}
                                color="#0561B9"
                            />
                            <Text style={styles.uploadBoxTitle}>
                                Tap to upload file
                            </Text>
                            <Text style={styles.uploadBoxHint}>
                                (.csv, .xls or .xlsx)
                            </Text>
                            <Text style={styles.uploadBoxNote}>
                                Use the sample CSV so columns match Name, Email, Mobile,
                                Company Name, and Lead Status.
                            </Text>
                            {!!uploadFile && (
                                <Text style={styles.uploadFileName} numberOfLines={1}>
                                    {uploadFile.name}
                                </Text>
                            )}
                        </Pressable>

                        <Pressable style={styles.sampleLink} onPress={downloadSample}>
                            <Text style={styles.sampleLinkText}>Download sample CSV</Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.uploadSubmitButton,
                                { opacity: pressed ? 0.75 : 1 },
                            ]}
                            onPress={submitLeadUpload}
                        >
                            <Text style={styles.uploadSubmitText}>Submit</Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>

            {/* Floating Add Button */}
            <Pressable
                style={({ pressed }) => [
                    styles.floatingButton,
                    { opacity: pressed ? 0.75 : 1 },
                ]}
                onPress={() => {
                    navigate('AddLeads', {});
                }}
            >
                <Icon
                    family="Feather"
                    name="plus"
                    size={30}
                    color="#FFFFFF"
                />
            </Pressable>
        </SafeAreaView>
    );
}