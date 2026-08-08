import {
  MoreVertical,
  Mail,
  Phone,
  Building2,
} from "lucide-react";

export default function ManagerTable({

  managers = [],

  loading = false,

}) {

  // ==========================================
  // Status Badge
  // ==========================================

  const statusStyles = {

    PENDING:
      "bg-yellow-100 text-yellow-700 border-yellow-200",

    ACTIVATED:
      "bg-green-100 text-green-700 border-green-200",

  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {

    return (

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              {[
                "Manager",
                "Contact",
                "Apartment",
                "Buildings",
                "Status",
                "Invited On",
                "",
              ].map((heading) => (

                <th
                  key={heading}
                  className="px-6 py-4 text-left"
                >

                  <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />

                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {[1, 2, 3, 4, 5].map((i) => (

              <tr
                key={i}
                className="border-t"
              >

                <td
                  colSpan={7}
                  className="px-6 py-6"
                >

                  <div className="h-6 w-full rounded bg-slate-100 animate-pulse" />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    );

  }

  // ==========================================
  // Empty State
  // ==========================================

  if (!managers.length) {

    return (

      <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">

        <Building2
          size={56}
          className="mx-auto text-slate-300"
        />

        <h3 className="mt-5 text-xl font-bold text-slate-800">

          No Managers Found

        </h3>

        <p className="mt-2 text-sm text-slate-500">

          Invite your first manager to start managing buildings,
          residents and water operations.

        </p>

      </div>

    );

  }

  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="sticky top-0 bg-slate-50 z-10">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

              Manager

            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

              Contact

            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

              Apartment

            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

              Buildings

            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

              Status

            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">

              Invited On

            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {managers.map((manager) => (

            <tr
              key={manager.id}
              className="
                border-t
                even:bg-slate-50/40
                hover:bg-blue-50
                transition-colors
              "
            >

              {/* Manager */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-100
                      text-sm
                      font-bold
                      text-blue-700
                    "
                  >

                    {manager.firstName?.charAt(0)}
                    {manager.lastName?.charAt(0)}

                  </div>

                  <div>

                    <p className="font-semibold text-slate-800">

                      {manager.firstName} {manager.lastName}

                    </p>

                  </div>

                </div>

              </td>

              {/* Contact */}

              <td className="px-6 py-5">

                <div className="space-y-2">

                  <div className="flex items-center gap-2 text-sm text-slate-600">

                    <Mail size={15} />

                    {manager.email}

                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">

                    <Phone size={15} />

                    {manager.phone}

                  </div>

                </div>

              </td>

              {/* Apartment */}

              <td className="px-6 py-5">

                {manager.apartmentName}

              </td>

              {/* Buildings */}

              <td className="px-6 py-5">

                {manager.buildings?.length ? (

                  <div className="flex flex-wrap gap-2">

                    {manager.buildings.map((building) => (

                      <span
                        key={building.id}
                        className="
                          rounded-lg
                          bg-slate-100
                          px-2.5
                          py-1
                          text-xs
                          font-medium
                          text-slate-700
                        "
                      >

                        {building.buildingName}

                      </span>

                    ))}

                  </div>

                ) : (

                  <span className="text-sm text-slate-400">

                    No Buildings

                  </span>

                )}

              </td>

              {/* Status */}

              <td className="px-6 py-5">

                <span
                  className={`
                    rounded-full
                    border
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${statusStyles[manager.status]}
                  `}
                >

                  {manager.status}

                </span>

              </td>

              {/* Date */}

              <td className="px-6 py-5 text-sm text-slate-500">

                {manager.createdAt
                  ? new Date(manager.createdAt).toLocaleDateString()
                  : "-"}

              </td>

              {/* Actions */}

              <td className="px-6 py-5 text-right">

                <button
                  title="More Actions"
                  className="
                    rounded-lg
                    p-2
                    transition
                    hover:bg-slate-100
                  "
                >

                  <MoreVertical size={18} />

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* Footer */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          bg-slate-50
          px-6
          py-3
          text-sm
          text-slate-500
        "
      >

        Showing

        <span className="mx-1 font-semibold">

          {managers.length}

        </span>

        managers

      </div>

    </div>

  );

}