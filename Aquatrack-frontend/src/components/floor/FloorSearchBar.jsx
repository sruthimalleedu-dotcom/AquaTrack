export default function FloorSearchBar({

    search,

    setSearch

}) {

    return (

        <div className="w-full">

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search floor by name..."
                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    placeholder:text-gray-400
                    focus:border-blue-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
            />

        </div>

    );

}