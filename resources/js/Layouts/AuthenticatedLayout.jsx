
import Sidebar from "@/Parts/SideBar.jsx";
import {useToasts} from "react-toast-notifications";
import {usePage} from "@inertiajs/react";
import {useEffect} from "react";
import Header from "@/Parts/Header.jsx";
import Footer from "@/Parts/Footer.jsx";

export default function Authenticated({ user,  children }) {
    const { addToast } = useToasts();
    const {props} = usePage()
    useEffect(() => {
        if (props.flash.message){
            const status = props.flash.status
            addToast(props.flash.message, {
                appearance: status || 'info',
                autoDismiss: true,
            });
        }
    }, [props]);
    return (
        <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
            <Sidebar />
            <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <Header />
                <div className="main-content flex flex-col flex-grow p-4">
                    <div className="flex flex-col flex-grow bg-white rounded mt-4">
                        {children}
                    </div>
                </div>
                <Footer />
            </main>
        </div>

    );
}
