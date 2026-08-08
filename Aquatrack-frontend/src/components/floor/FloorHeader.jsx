export default function FloorHeader({

    onCreate,

    disabled = false

}) {

    return (

        <div
            className="
                flex
                items-center
                justify-between
                gap-4
                flex-wrap
            "
        >

            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                        text-gray-900
                    "
                >
                    Floor Management
                </h1>

                <p
                    className="
                        mt-1
                        text-sm
                        text-gray-500
                    "
                >
                    Manage floors for the selected building.
                </p>

            </div>

            <button
                onClick={onCreate}
                disabled={disabled}
                className={`
                    px-5
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                    ${
                        disabled
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                    }
                `}
            >
                + Create Floor
            </button>

        </div>

    );

}