import { Droplets } from "lucide-react";

export default function TopConsumersTable({

    data = [],

    loading = false,

}) {

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">

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

                <Droplets
                    size={60}
                    className="mx-auto text-blue-300"
                />

                <h3 className="mt-5 text-xl font-bold">

                    No Consumption Data

                </h3>

                <p className="mt-2 text-slate-500">

                    Water consumption records will appear here.

                </p>

            </div>

        );

    }

    return (

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b px-6 py-5">

                <h2 className="text-lg font-bold">

                    Top Water Consumers

                </h2>

                <p className="text-sm text-slate-500">

                    Highest water consumption this billing cycle

                </p>

            </div>

            <table className="min-w-full">

                <thead className="bg-slate-50">

                    <tr>

                        <th className="px-6 py-4 text-left">

                            House

                        </th>

                        <th className="px-6 py-4 text-left">

                            Building

                        </th>

                        <th className="px-6 py-4 text-right">

                            Consumption

                        </th>

                        <th className="px-6 py-4 text-right">

                            Bill

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {data.map((item,index)=>(

                        <tr
                            key={index}
                            className="border-t even:bg-slate-50 hover:bg-blue-50 transition"
                        >

                            <td className="px-6 py-4 font-semibold">

                                {item.houseNumber}

                            </td>

                            <td className="px-6 py-4">

                                {item.buildingName}

                            </td>

                            <td className="px-6 py-4 text-right">

                                {item.waterConsumption} KL

                            </td>

                            <td className="px-6 py-4 text-right font-semibold text-blue-700">

                                ₹{item.billAmount}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}