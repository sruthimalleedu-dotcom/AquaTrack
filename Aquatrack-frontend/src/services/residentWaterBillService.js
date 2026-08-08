import api from "../api/axios";

const BASE_URL = "/resident/water-bills";

const residentWaterBillService = {

    // ==========================================
    // Get My Water Bills
    // ==========================================

    getMyWaterBills: async () => {

        const response = await api.get(BASE_URL);

        return response.data.data;

    }

};

export default residentWaterBillService;