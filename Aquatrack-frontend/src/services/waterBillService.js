import api from "../api/axios";

const BASE_URL = "/manager/water-bills";

const waterBillService = {

    // ==========================================
    // Generate Bills
    // ==========================================

    generateBills: async (payload) => {

        const response = await api.post(

            `${BASE_URL}/generate`,

            payload

        );

        return response.data;

    },

    // ==========================================
    // Get All Bills
    // ==========================================

    getBills: async (params = {}) => {

        const response = await api.get(

            BASE_URL,

            {
                params
            }

        );

        return response.data;

    },

    // ==========================================
    // Get Bill By ID
    // ==========================================

    getBillById: async (billId) => {

        const response = await api.get(

            `${BASE_URL}/${billId}`

        );

        return response.data;

    },

    // ==========================================
    // Update Bill Status
    // ==========================================

    updateBillStatus: async (billId, payload) => {

        const response = await api.put(

            `${BASE_URL}/${billId}/status`,

            payload

        );

        return response.data;

    },

    // ==========================================
    // Download Invoice PDF
    // ==========================================

    downloadInvoice: async (billId) => {

        const response = await api.get(

            `${BASE_URL}/${billId}/invoice`,

            {
                responseType: "blob"
            }

        );

        const blob = new Blob(

            [response.data],

            {
                type: "application/pdf"
            }

        );

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = `WaterBill-${billId}.pdf`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);

    }

};

export default waterBillService;