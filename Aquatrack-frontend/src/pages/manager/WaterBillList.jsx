import { useEffect, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import WaterBillHeader from "../../components/waterBill/WaterBillHeader";
import WaterBillFilterBar from "../../components/waterBill/WaterBillFilterBar";
import WaterBillSummary from "../../components/waterBill/WaterBillSummary";
import WaterBillTable from "../../components/waterBill/WaterBillTable";
import WaterBillViewDialog from "../../components/waterBill/WaterBillViewDialog";
import WaterBillStatusDialog from "../../components/waterBill/WaterBillStatusDialog";

import waterBillService from "../../services/waterBillService";
import householdService from "../../services/householdService";
import * as billingCycleService from "../../services/billingCycleService";

export default function WaterBillList() {

    // ==========================================
    // State
    // ==========================================

    const [commonAreaUsage, setCommonAreaUsage] = useState(0);

    const [buildingId, setBuildingId] = useState("");

    const [billingCycleId, setBillingCycleId] = useState("");

    const [status, setStatus] = useState("");

    const [search, setSearch] = useState("");

    const [buildings, setBuildings] = useState([]);

    const [billingCycles, setBillingCycles] = useState([]);

    const [summary, setSummary] = useState(null);

    const [bills, setBills] = useState([]);

    const [loading, setLoading] = useState(false);

    // ==========================================
    // Dialog State
    // ==========================================

    const [selectedBill, setSelectedBill] = useState(null);

    const [viewOpen, setViewOpen] = useState(false);

    const [statusOpen, setStatusOpen] = useState(false);

    // ==========================================
    // Load Buildings
    // ==========================================

    useEffect(() => {

        loadBuildings();

    }, []);

    const loadBuildings = async () => {

        try {

            const response =
                await householdService.getManagerBuildings();

            setBuildings(response);

        } catch (error) {

            console.error(error);

        }

    };

    // ==========================================
    // Load Billing Cycles
    // ==========================================

    useEffect(() => {

        if (buildingId) {

            loadBillingCycles();

        } else {

            setBillingCycles([]);

            setBillingCycleId("");

        }

    }, [buildingId]);

    const loadBillingCycles = async () => {

        try {

            const response =
                await billingCycleService
                    .getBillingCyclesByBuilding(buildingId);

            setBillingCycles(response);

        } catch (error) {

            console.error(error);

        }

    };

    // ==========================================
    // Load Bills
    // ==========================================

    const computeSummaryFromBills = (bills = []) => {

        const summary = {

            totalBills: bills.length,

            pendingBills: 0,

            paidBills: 0,

            overdueBills: 0,

            totalRevenue: 0

        };

        bills.forEach((bill) => {

            const status = bill.billStatus?.toUpperCase?.() ?? "";

            if (status === "PENDING") summary.pendingBills += 1;

            else if (status === "PAID") summary.paidBills += 1;

            else if (status === "OVERDUE") summary.overdueBills += 1;

            const amount = Number(bill.totalAmount ?? bill.amount ?? 0);

            if (!Number.isNaN(amount)) {

                summary.totalRevenue += amount;

            }

        });

        return summary;

    };

    const loadBills = async () => {

        try {

            setLoading(true);

            const response =
                await waterBillService.getBills({

                    buildingId,

                    billingCycleId,

                    status,

                    search

                });

            const payload = response?.data ?? response;

            const normalizedSummary =
                payload?.summary ??
                payload?.data?.summary ??
                null;

            const normalizedBills =
                payload?.bills ??
                payload?.data?.bills ??
                (Array.isArray(payload) ? payload : []);

            const summaryToUse =
                normalizedSummary || computeSummaryFromBills(normalizedBills);

            setSummary(summaryToUse);

            setBills(normalizedBills);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

// ==========================================
// Generate Bills
// ==========================================

const handleGenerate = async () => {

    if (!buildingId || !billingCycleId) {

        alert("Please select Building and Billing Cycle.");

        return;

    }

    try {

        setLoading(true);

        await waterBillService.generateBills({

            buildingId: Number(buildingId),

            billingCycleId: Number(billingCycleId),

            commonAreaUsage: Number(commonAreaUsage)

        });

        await loadBills();

        alert("Water Bills generated successfully.");

    } catch (error) {

        console.error(error);

        console.error("Response:", error.response?.data);

        alert(

            error.response?.data?.message ||

            "Failed to generate bills."

        );

    } finally {

        setLoading(false);

    }

};

    // ==========================================
    // Clear Filters
    // ==========================================

    const handleClearFilters = () => {

        setBuildingId("");

        setBillingCycleId("");

        setStatus("");

        setSearch("");

        setBills([]);

        setSummary(null);

    };

    // ==========================================
    // Load Bills when Filters Change
    // ==========================================

    useEffect(() => {

        if (buildingId && billingCycleId) {

            loadBills();

        }

    }, [

        buildingId,

        billingCycleId,

        status,

        search

    ]);

    // ==========================================
    // Actions
    // ==========================================

    const handleView = (bill) => {

    setSelectedBill(bill);

    setViewOpen(true);

};

    const handleStatus = (bill) => {

    setSelectedBill(bill);

    setStatusOpen(true);

};

// ==========================================
// Download Invoice
// ==========================================

const handleDownload = async (bill) => {

    try {

        setLoading(true);

        await waterBillService.downloadInvoice(
            bill.billId
        );

    } catch (error) {

        console.error(error);

        alert(

            error.response?.data?.message ||

            "Failed to download invoice."

        );

    } finally {

        setLoading(false);

    }

};

    const handleStatusSave = async ({ billId, billStatus }) => {

        if (!billId) {

            console.error("Missing billId for update", { billId, billStatus });

            alert("Unable to update bill status: missing bill ID.");

            return;

        }

        try {

            setLoading(true);

            await waterBillService.updateBillStatus(billId, {

                billStatus

            });

            await loadBills();

            setStatusOpen(false);

            setSelectedBill(null);

            alert("Bill status updated successfully.");

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Failed to update bill status."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <WaterBillHeader

                    onGenerate={handleGenerate}

                    generating={loading}

                />

                <WaterBillFilterBar

    buildingId={buildingId}
    setBuildingId={setBuildingId}

    billingCycleId={billingCycleId}
    setBillingCycleId={setBillingCycleId}

    commonAreaUsage={commonAreaUsage}
    setCommonAreaUsage={setCommonAreaUsage}

    status={status}
    setStatus={setStatus}

    search={search}
    setSearch={setSearch}

    buildings={buildings}
    billingCycles={billingCycles}

    onRefresh={loadBills}
    onClear={handleClearFilters}

/>

                <WaterBillSummary

                    summary={summary}

                />

                <WaterBillTable

                    bills={bills}

                    loading={loading}

                    onView={handleView}

                    onStatus={handleStatus}

                    onDownload={handleDownload}

                />

                <WaterBillViewDialog

                    open={viewOpen}

                    onOpenChange={setViewOpen}

                    bill={selectedBill}

                />

                <WaterBillStatusDialog

                    open={statusOpen}

                    onOpenChange={setStatusOpen}

                    bill={selectedBill}

                    onSave={handleStatusSave}

                />

            </div>

        </DashboardLayout>

    );

}