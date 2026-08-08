import { Search } from "lucide-react";

export default function BuildingSearchBar({

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

                    size={18}

                    className="
                        absolute
                        left-4
                        top-3.5
                        text-slate-400
                    "

                />

                <input

                    type="text"

                    placeholder="Search Building..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        py-3
                        pl-11
                        pr-4
                        outline-none
                        focus:border-blue-500
                    "

                />

            </div>

        </div>

    );

}