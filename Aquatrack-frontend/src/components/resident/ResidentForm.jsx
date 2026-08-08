export default function ResidentForm({

    formData,
    setFormData,
    errors = {}

}) {

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({

            ...formData,

            [name]: type === "checkbox"
                ? checked
                : value

        });

    };

    return (

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* First Name */}

            <div>

                <label className="mb-2 block text-sm font-medium">
                    First Name <span className="text-red-500">*</span>
                </label>

                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2"
                />

                {errors.firstName && (

                    <p className="mt-1 text-sm text-red-500">
                        {errors.firstName}
                    </p>

                )}

            </div>

            {/* Last Name */}

            <div>

                <label className="mb-2 block text-sm font-medium">
                    Last Name
                </label>

                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2"
                />

            </div>

            {/* Email */}

            <div>

                <label className="mb-2 block text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                </label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2"
                />

                {errors.email && (

                    <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                    </p>

                )}

            </div>

            {/* Phone */}

            <div>

                <label className="mb-2 block text-sm font-medium">
                    Phone Number <span className="text-red-500">*</span>
                </label>

                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2"
                />

                {errors.phone && (

                    <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
                    </p>

                )}

            </div>

            {/* Send Invitation */}

            <div className="md:col-span-2">

                <label className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        name="sendInvitation"
                        checked={formData.sendInvitation}
                        onChange={handleChange}
                    />

                    <span className="text-sm text-gray-700">
                        Send activation invitation email to the resident
                    </span>

                </label>

            </div>

        </div>

    );

}