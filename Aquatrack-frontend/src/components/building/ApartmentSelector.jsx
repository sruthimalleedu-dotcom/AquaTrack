import { Building2 } from "lucide-react";

export default function ApartmentSelector({

    apartments,

    selectedApartment,

    onChange,

}) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
            "
        >

            <label
                className="
                    mb-3
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-slate-700
                "
            >

                <Building2
                    size={18}
                    className="text-blue-600"
                />

                Select Apartment

            </label>

            <select

                value={selectedApartment}

                onChange={(event) =>
                    onChange(event.target.value)
                }

                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    p-3
                    outline-none
                    focus:border-blue-500
                "
            >

                <option value="">

                    Choose Apartment

                </option>

                {apartments.map((apartment) => (

                    <option
                        key={apartment.id}
                        value={apartment.id}
                    >

                        {apartment.apartmentName}

                    </option>

                ))}

            </select>

        </div>

    );

}