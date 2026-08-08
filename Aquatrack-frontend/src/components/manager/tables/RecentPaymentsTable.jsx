import {
    CreditCard,
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react";

export default function RecentPaymentsTable({

    data = [],

    loading = false,

}) {

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

                <div className="space-y-4">

                    {[1, 2, 3, 4, 5].map((i) => (

                        <div
                            key={i}
                            className="h-10 rounded bg-slate-100 animate-pulse"
                        />

                    ))}

                </div>

            </div>

        );

    }

    // ==========================================
    // Empty State
    // ==========================================

    if (!data.length) {

        return (

            <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">

                <CreditCard
                    size={56}
                    className="mx-auto text-slate-300"
                />

                <h3 className="mt-5 text-xl font-bold">

                    No Payments Found

                </h3>

                <p className="mt-2 text-slate-500">

                    Successful and pending payments will appear here.

                </p>

            </div>

        );

    }

    // ==========================================
    // Status Badge
    // ==========================================

    const statusBadge = (status) => {

        switch (status) {

            case "SUCCESS":

                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                        <CheckCircle2 size={13} />

                        Success

                    </span>
                );

            case "PENDING":

                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">

                        <Clock3 size={13} />

                        Pending

                    </span>
                );

            case "FAILED":

                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">

                        <XCircle size={13} />

                        Failed

                    </span>
                );

            default:

                return (

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">

                        {status}

                    </span>

                );

        }

    };

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b px-6 py-5">

                <h2 className="text-lg font-bold">

                    Recent Payments

                </h2>

                <p className="text-sm text-slate-500">

                    Latest payment transactions

                </p>

            </div>

            <table className="min-w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="px-6 py-4 text-left">

                            Transaction

                        </th>

                        <th className="px-6 py-4 text-left">

                            House

                        </th>

                        <th className="px-6 py-4 text-right">

                            Amount

                        </th>

                        <th className="px-6 py-4 text-center">

                            Method

                        </th>

                        <th className="px-6 py-4 text-center">

                            Date

                        </th>

                        <th className="px-6 py-4 text-center">

                            Status

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {data.map((payment) => (

                        <tr
                            key={payment.transactionId}
                            className="border-t even:bg-slate-50 hover:bg-blue-50 transition"
                        >

                            <td className="px-6 py-4 font-medium">

                                {payment.transactionId}

                            </td>

                            <td className="px-6 py-4">

                                {payment.houseNumber}

                            </td>

                            <td className="px-6 py-4 text-right font-semibold text-emerald-600">

                                ₹{payment.amount}

                            </td>

                            <td className="px-6 py-4 text-center">

                                {payment.paymentMethod}

                            </td>

                            <td className="px-6 py-4 text-center">

                                {payment.paymentDate}

                            </td>

                            <td className="px-6 py-4 text-center">

                                {statusBadge(payment.paymentStatus)}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}