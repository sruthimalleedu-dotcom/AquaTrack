import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

export default function DashboardLayout({ children }) {

    return (

        <div className="min-h-screen bg-slate-100">

            <Sidebar />

            <div className="ml-72">

                <Topbar />

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}