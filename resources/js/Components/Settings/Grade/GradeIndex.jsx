import GradeForm from "@/Components/Settings/Grade/GradeForm.jsx";
import GradeTable from "@/Components/Settings/Grade/GradeTable.jsx";
import {useState} from "react";

function GradeIndex({grades}) {
    const [gradeForm, setGradeForm] = useState(false)
    const [updateGradeId, setUpdateGradeId] = useState(undefined)
    const [dataName, setDataName] = useState("")
    const editGrade = async (id) => {
        setUpdateGradeId(id)
        const x = await axios.get(route("grade.edit",id))
        if(x.data){
            setGradeForm(true)
            setDataName(x.data.name)
        }
    }
    return (
        <>
            <button onClick={() => setGradeForm(!gradeForm)} className="flex items-center justify-center my-2 px-4 py-2 text-sm font-medium  rounded-lg text-gray-900 bg-white border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" >
                Create grade
            </button>
            <div className="relative overflow-x-auto">
                <GradeForm gradeForm={gradeForm} setGradeForm={setGradeForm} updateGradeId={updateGradeId} setUpdateGradeId={setUpdateGradeId} data={dataName} />
                <GradeTable editGrade={editGrade} grades={grades} />
            </div>
        </>
    );
}

export default GradeIndex;
