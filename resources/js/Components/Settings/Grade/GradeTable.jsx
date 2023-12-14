import {CiEdit} from "react-icons/ci";
import {Link} from "@inertiajs/react";
import {HiOutlineTrash} from "react-icons/hi";

function GradeTable({grades,editGrade}) {

    return (
        <>
            <table className="w-full mt-1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Grade
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Employees
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {grades?.map((grade ,key) => {
                    return (
                        <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {grade?.name}
                            </th>
                            <td className="px-6 py-4">
                                {grade?.employes?.length}
                            </td>
                            <td className="px-6 py-4">
                                <div className={"flex-auto inline-flex "}>
                                    <CiEdit onClick={() => editGrade(grade?.id)} className={"hover:text-yellow-600 text-xl m-1 "}/>
                                    <Link href={route('grade.destroy',grade.id)} method={"post"} as={"button"}>
                                        <HiOutlineTrash  className={"hover:text-red-600 text-xl m-1"} />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>

        </>
    );
}

export default GradeTable;
