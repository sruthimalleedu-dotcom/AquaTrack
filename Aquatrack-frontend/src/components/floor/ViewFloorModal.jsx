import { useEffect, useState } from "react";

import { getFloorById } from "../../services/floorService";

export default function ViewFloorModal({

    open,

    buildingId,

    floor,

    onClose

}) {

    const [floorDetails, setFloorDetails] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (open && floor?.id && buildingId) {

            loadFloor();

        }

    }, [open, floor, buildingId]);

    async function loadFloor() {

        try {

            setLoading(true);

            const response = await getFloorById(

                buildingId,

                floor.id

            );

            setFloorDetails(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold">

                        Floor Details

                    </h2>

                    <button

                        onClick={onClose}

                        className="text-2xl text-gray-500 hover:text-black"

                    >

                        ×

                    </button>

                </div>

                {loading ? (

                    <p className="text-center text-gray-500">

                        Loading...

                    </p>

                ) : (

                    floorDetails && (

                        <div className="space-y-5">

                            <div>

                                <label className="text-sm text-gray-500">

                                    Floor Number

                                </label>

                                <p className="mt-1 font-semibold">

                                    {floorDetails.floorNumber}

                                </p>

                            </div>

                            <div>

                                <label className="text-sm text-gray-500">

                                    Floor Name

                                </label>

                                <p className="mt-1 font-semibold">

                                    {floorDetails.floorName}

                                </p>

                            </div>

                            <div>

                                <label className="text-sm text-gray-500">

                                    Building

                                </label>

                                <p className="mt-1 font-semibold">

                                    {floorDetails.buildingName}

                                </p>

                            </div>

                            <div>

                                <label className="text-sm text-gray-500">

                                    Created At

                                </label>

                                <p className="mt-1 font-semibold">

                                    {floorDetails.createdAt
                                        ? new Date(
                                              floorDetails.createdAt
                                          ).toLocaleString()
                                        : "-"}

                                </p>

                            </div>

                        </div>

                    )

                )}

                <div className="mt-8 flex justify-end">

                    <button

                        onClick={onClose}

                        className="rounded-lg border px-5 py-2 hover:bg-gray-100"

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}