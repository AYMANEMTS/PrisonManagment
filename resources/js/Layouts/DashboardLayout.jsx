import {useUserContext} from "@/context/UserContext.jsx";
import Sidebar from "../Parts/SideBar.jsx";

function DashboardLayout({children}) {
    const { isLogIn } = useUserContext()
    console.log(isLogIn)
    return (
        <div className="flex">
            <aside className="w-64">
                <Sidebar />
            </aside>
            <main className="flex-1 p-4">
                {children}
            </main>

        </div>
    );
}

export default DashboardLayout;
