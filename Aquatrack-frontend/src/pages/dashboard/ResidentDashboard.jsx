import DashboardLayout from "../../components/ui/DashboardLayout";

const ResidentDashboard = () => {

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* Header */}

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Resident Dashboard
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Welcome back! Here's an overview of your water usage and billing.
                    </p>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <div className="bg-white rounded-xl shadow p-6">

                        <h3 className="text-gray-500 text-sm">
                            Current Month Usage
                        </h3>

                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            0 L
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <h3 className="text-gray-500 text-sm">
                            Current Bill
                        </h3>

                        <p className="text-3xl font-bold text-green-600 mt-2">
                            ₹0
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <h3 className="text-gray-500 text-sm">
                            Billing Status
                        </h3>

                        <p className="text-2xl font-semibold text-orange-500 mt-2">
                            Pending
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <h3 className="text-gray-500 text-sm">
                            Water Alerts
                        </h3>

                        <p className="text-2xl font-semibold text-red-500 mt-2">
                            None
                        </p>

                    </div>

                </div>

                {/* Resident Info */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        My Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        <div>

                            <p className="text-gray-500">
                                Apartment
                            </p>

                            <p className="font-semibold">
                                --
                            </p>

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Building
                            </p>

                            <p className="font-semibold">
                                --
                            </p>

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Household
                            </p>

                            <p className="font-semibold">
                                --
                            </p>

                        </div>

                        <div>

                            <p className="text-gray-500">
                                Resident Name
                            </p>

                            <p className="font-semibold">
                                --
                            </p>

                        </div>

                    </div>

                </div>

                {/* Recent Activity */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Recent Activity
                    </h2>

                    <div className="text-gray-500">

                        No recent activity available.

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default ResidentDashboard;