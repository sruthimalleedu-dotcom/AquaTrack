import api from "../api/axios";

const BASE_URL = "/manager/distribution";

const distributionService = {

    // ==========================================
    // Generate Consumption Distribution
    // ==========================================

    generateDistribution: async (

        buildingId,

        billingCycleId,

        commonAreaUsage = 0

    ) => {

        const response = await api.post(

            `${BASE_URL}/generate`,

            {

                buildingId,

                billingCycleId,

                commonAreaUsage

            }

        );

        return response.data;

    }

};

export default distributionService;