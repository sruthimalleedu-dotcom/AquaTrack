import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import PaymentHeader from "../../components/payment/PaymentHeader";
import PaymentSummaryCards from "../../components/payment/PaymentSummaryCards";
import PaymentSearch from "../../components/payment/PaymentSearch";
import PaymentFilter from "../../components/payment/PaymentFilter";
import PaymentTable from "../../components/payment/PaymentTable";
import PaymentPagination from "../../components/payment/PaymentPagination";
import PaymentEmptyState from "../../components/payment/PaymentEmptyState";
import PaymentDetailsModal from "../../components/payment/PaymentDetailsModal";
import UpdatePaymentStatusModal from "../../components/payment/UpdatePaymentStatusModal";

import {
    getAllPayments,
    getPaymentSummary,
    updatePaymentStatus,
} from "../../services/managerPaymentService";

export default function ManagerPaymentList() {

    // ==========================================
    // State
    // ==========================================

    const [payments, setPayments] = useState([]);

    const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({
        paymentStatus: "ALL",
        paymentMethod: "ALL",
        billingCycle: "",
    });

    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE = 10;

    const [selectedPayment, setSelectedPayment] = useState(null);

    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    // ==========================================
    // Load Data
    // ==========================================

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            setLoading(true);

            const [paymentResponse, summaryResponse] =
                await Promise.all([
                    getAllPayments(),
                    getPaymentSummary(),
                ]);

            setPayments(paymentResponse.data || []);

            setSummary(summaryResponse.data || null);

        } catch (error) {

            console.error(
                "Failed to load payments.",
                error
            );

            setPayments([]);

            setSummary(null);

        } finally {

            setLoading(false);

            setRefreshing(false);

        }

    }

    // ==========================================
    // Refresh
    // ==========================================

    async function handleRefresh() {

        setRefreshing(true);

        await loadData();

    }

    // ==========================================
    // Search + Filters
    // ==========================================

    const filteredPayments = useMemo(() => {

        const keyword = search.toLowerCase();

        return payments.filter((payment) => {

            const matchesSearch =

                payment.invoiceNumber?.toLowerCase().includes(keyword)

                ||

                payment.transactionId?.toLowerCase().includes(keyword)

                ||

                payment.householdName?.toLowerCase().includes(keyword)

                ||

                payment.residentName?.toLowerCase().includes(keyword);

            const matchesStatus =

                filters.paymentStatus === "ALL"

                ||

                payment.paymentStatus === filters.paymentStatus;

            const matchesMethod =

                filters.paymentMethod === "ALL"

                ||

                payment.paymentMethod === filters.paymentMethod;

            const matchesBillingCycle =

                !filters.billingCycle

                ||

                payment.billingCycle === filters.billingCycle;

            return (

                matchesSearch

                &&

                matchesStatus

                &&

                matchesMethod

                &&

                matchesBillingCycle

            );

        });

    }, [payments, search, filters]);

    // ==========================================
    // Pagination
    // ==========================================

    const totalPages = Math.ceil(
        filteredPayments.length / PAGE_SIZE
    );

    const paginatedPayments = useMemo(() => {

        const start = (currentPage - 1) * PAGE_SIZE;

        return filteredPayments.slice(
            start,
            start + PAGE_SIZE
        );

    }, [filteredPayments, currentPage]);

    // ==========================================
    // Reset Filters
    // ==========================================

    function handleResetFilters() {

        setSearch("");

        setCurrentPage(1);

        setFilters({
            paymentStatus: "ALL",
            paymentMethod: "ALL",
            billingCycle: "",
        });

    }

    // ==========================================
    // View Details
    // ==========================================

    function handleView(payment) {

        setSelectedPayment(payment);

        setShowDetailsModal(true);

    }

    // ==========================================
    // Update Payment
    // ==========================================

    function handleUpdate(payment) {

        setSelectedPayment(payment);

        setShowUpdateModal(true);

    }

    async function handleUpdateSubmit(payload) {

        try {

            await updatePaymentStatus(
                selectedPayment.paymentId,
                payload
            );

            setShowUpdateModal(false);

            loadData();

        } catch (error) {

            console.error(
                "Failed to update payment.",
                error
            );

        }

    }

    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <PaymentHeader
                    title="Building Payments"
                    subtitle="Manage payments for your assigned buildings."
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />

                <PaymentSummaryCards
                    summary={summary}
                />

                <PaymentSearch
                    value={search}
                    onChange={setSearch}
                />

                <PaymentFilter
                    filters={filters}
                    onChange={setFilters}
                    onReset={handleResetFilters}
                />

                {filteredPayments.length > 0 ? (

                    <PaymentTable
                        payments={paginatedPayments}
                        loading={loading}
                        role="MANAGER"
                        onView={handleView}
                        onUpdateStatus={handleUpdate}
                    />

                ) : (

                    <PaymentEmptyState
                        title="No Payments Found"
                        description="No payment records match your current search or filters."
                        showReset
                        onReset={handleResetFilters}
                    />

                )}

                {filteredPayments.length > 0 && (

                    <PaymentPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />

                )}

                <PaymentDetailsModal
                    isOpen={showDetailsModal}
                    payment={selectedPayment}
                    onClose={() => {

                        setShowDetailsModal(false);

                        setSelectedPayment(null);

                    }}
                />

                <UpdatePaymentStatusModal
                    isOpen={showUpdateModal}
                    payment={selectedPayment}
                    loading={loading}
                    onClose={() => {

                        setShowUpdateModal(false);

                        setSelectedPayment(null);

                    }}
                    onSubmit={handleUpdateSubmit}
                />

            </div>

        </DashboardLayout>

    );

}