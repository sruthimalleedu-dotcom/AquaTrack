import { Receipt } from "lucide-react";

export default function RecentBillsTable({

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

                    {[1,2,3,4,5].map((i)=>(

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

                <Receipt
                    size={56}
                    className="mx-auto text-slate-300"
                />

                <h3 className="mt-5 text-xl font-bold">

                    No Bills Found

                </h3>

                <p className="mt-2 text-slate-500">

                    Generated water bills will appear here.

                </p>

            </div>

        );

    }

    // ==========================================
    // Status Badge
    // ==========================================

    const badgeColor = (status) => {

        switch (status) {

            case "PAID":
                return "bg-green-100 text-green-700";

            case "PENDING":
                return "bg-yellow-100 text-yellow-700";

            case "OVERDUE":
                return "bg-red-100 text-red-700";

            default:
                return "bg-slate-100 text-slate-700";

        }

    };

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b px-6 py-5">

                <h2 className="text-lg font-bold">

                    Recent Bills

                </h2>

                <p className="text-sm text-slate-500">

                    Latest generated water bills

                </p>

            </div>

            <table className="min-w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="px-6 py-4 text-left">

                            Invoice

                        </th>

                        <th className="px-6 py-4 text-left">

                            House

                        </th>

                        <th className="px-6 py-4 text-right">

                            Amount

                        </th>

                        <th className="px-6 py-4 text-center">

                            Due Date

                        </th>

                        <th className="px-6 py-4 text-center">

                            Status

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {data.map((bill) => (

                        <tr
                            key={bill.invoiceNumber}
                            className="
                                border-t
                                even:bg-slate-50
                                hover:bg-blue-50
                                transition
                            "
                        >

                            <td className="px-6 py-4 font-semibold">

                                {bill.invoiceNumber}

                            </td>

                            <td className="px-6 py-4">

                                {bill.houseNumber}

                            </td>

                            <td className="px-6 py-4 text-right font-semibold">

                                ₹{bill.amount}

                            </td>

                            <td className="px-6 py-4 text-center">

                                {bill.dueDate}

                            </td>

                            <td className="px-6 py-4 text-center">

                                <span
                                    className={`
                                        rounded-full
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold
                                        ${badgeColor(bill.status)}
                                    `}
                                >

                                    {bill.status}

                                </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}