import {
    Receipt,
    Clock3,
    CircleCheckBig,
    TriangleAlert,
    IndianRupee
} from "lucide-react";

export default function WaterBillSummary({ summary }) {

    const cards = [

        {
            title: "Total Bills",
            value: summary?.totalBills ?? 0,
            icon: Receipt,
            color: "bg-blue-500"
        },

        {
            title: "Pending",
            value: summary?.pendingBills ?? 0,
            icon: Clock3,
            color: "bg-yellow-500"
        },

        {
            title: "Paid",
            value: summary?.paidBills ?? 0,
            icon: CircleCheckBig,
            color: "bg-green-500"
        },

        {
            title: "Overdue",
            value: summary?.overdueBills ?? 0,
            icon: TriangleAlert,
            color: "bg-red-500"
        },

        {
            title: "Revenue",
            value: `₹ ${Number(summary?.totalRevenue ?? 0).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            )}`,
            icon: IndianRupee,
            color: "bg-purple-600"
        }

    ];

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

            {cards.map((card, index) => {

                const Icon = card.icon;

                return (

                    <div

                        key={index}

                        className="
                            bg-white
                            dark:bg-slate-900
                            rounded-xl
                            border
                            border-gray-200
                            dark:border-slate-700
                            shadow-sm
                            p-5
                            flex
                            items-center
                            justify-between
                        "

                    >

                        <div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">

                                {card.title}

                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">

                                {card.value}

                            </h2>

                        </div>

                        <div

                            className={`
                                ${card.color}
                                h-12
                                w-12
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                text-white
                            `}

                        >

                            <Icon size={24} />

                        </div>

                    </div>

                );

            })}

        </div>

    );

}