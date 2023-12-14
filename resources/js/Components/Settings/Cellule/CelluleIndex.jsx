import {useState} from "react";
import CelluleModalForm from "@/Components/Settings/Cellule/CelluleModalForm.jsx";
import CelluleTable from "@/Components/Settings/Cellule/CelluleTable.jsx";

function CelluleIndex({cellules,quartiers,employees}) {
    const [openModal, setOpenModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState({
        id:null,
        status:false
    })
    return (
        <>
            <button onClick={() => setOpenModal(!openModal)} className="flex items-center justify-center my-2 px-4 py-2 text-sm font-medium  rounded-lg text-gray-900 bg-white border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" >
                Create Cellule
            </button>
            <CelluleModalForm employees={employees} cellules={cellules} isUpdate={isUpdate}
            setIsUpdate={setIsUpdate} openModal={openModal}
            setOpenModal={setOpenModal} quartiers={quartiers} />
            <CelluleTable setOpenModal={setOpenModal} setIsUpdate={setIsUpdate}  cellules={cellules} />
        </>
    );
}

export default CelluleIndex;
