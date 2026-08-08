import { Search } from "lucide-react";

export default function ManagerSearchBar({

    search,

    setSearch,

}) {

    return (

        <div
            className="
                rounded-2xl
                bg-white
                p-5
                shadow-sm
            "
        >

            <div className="relative">

                <Search
                    size={20}
                    className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                />

                <input
                    type="text"
                    placeholder="Search managers..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        py-4
                        pl-12
                        pr-4
                        text-slate-700
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                />

            </div>

        </div>

    );

}