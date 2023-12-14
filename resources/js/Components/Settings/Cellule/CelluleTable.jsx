import {CiEdit} from "react-icons/ci";
import {Link} from "@inertiajs/react";
import {HiOutlineTrash} from "react-icons/hi";

function CelluleTable({cellules , setOpenModal , setIsUpdate}) {
    return (
        <>
            <table className="w-full mt-1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Cellule
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Capacity total
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Capacity disponible
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Prisoners
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Quartier
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {cellules?.map((cellule ,key) => {
                    return (
                        <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {cellule?.name}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                                {cellule?.CapacityTotal}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                                {cellule?.CapacityTotal - cellule?.prisoners.length}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                                {cellule?.prisoners.length}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                                {cellule?.quartier?.name}
                            </th>
                            <td className="px-6 py-4">
                                <div className={"flex-auto inline-flex "}>
                                    <CiEdit onClick={() => {
                                        setOpenModal(true)
                                        setIsUpdate({id:cellule.id,status:true})
                                    }} className={"hover:text-yellow-600 text-xl m-1 "}/>
                                    <Link href={route('cellule.destroy',cellule.id)}  method={"post"} as={"button"}>
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

export default CelluleTable;
