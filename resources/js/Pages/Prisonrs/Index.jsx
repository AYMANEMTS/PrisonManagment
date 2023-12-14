import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {useState} from "react";
import {Link, router, usePage} from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown.jsx";
import {CiEdit} from "react-icons/ci";
import {HiOutlineTrash} from "react-icons/hi";

function Index({prisoners}) {
    const [selectedItems, setSelectedItems] = useState([])
    const [dropdownStatus, setDropdownStatus] = useState(false)
    const {props} = usePage()
    const baseUrl = props.ziggy.url
    const toogleDropdown = () => {
        setDropdownStatus(!dropdownStatus)
    }
    function checkboxHandler(e){
        let isSelected = e.target.checked;
        let value = parseInt(e.target.value);

        if( isSelected ){
            setSelectedItems( [...selectedItems, value ] )
        }else{
            setSelectedItems((prevData)=>{
                return prevData.filter((id)=>{
                    return id!==value
                })
            })
        }
    }
    const deletePrisoners = async (e) => {
        e.preventDefault()
        await router.post(route('prisoners.destroy'),{ids:selectedItems})
    }

    return (
        <Authenticated>
            <div className={"container px-3 py-3"}>
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                                <div class="flex justify-between px-2 py-2">
                                    <h1 className={"mt-2 ml-2  text-lg font-medium"}>All Prisoners :  {prisoners.length} </h1>

                                    <div className="space-x-2 ">
                                        <button >
                                            <Link href={route('prisoners.create')} className="flex items-center justify-center px-4 py-2 text-sm font-medium  rounded-lg text-gray-900 bg-white border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                                </svg>
                                                Add new Prisoner
                                            </Link>
                                        </button>
                                        <button >
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <button className="flex items-center justify-center flex-shrink-0 px-8 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                        Action
                                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                                        </svg>
                                                    </button>

                                                </Dropdown.Trigger>
                                                <Dropdown.Content align="right" width="48">
                                                    <Dropdown.Link onClick={deletePrisoners} className={"hover:bg-red-300 "}>delete</Dropdown.Link>

                                                </Dropdown.Content>
                                            </Dropdown>
                                        </button>

                                    </div>
                                </div>

                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="py-3 px-4 pe-0">
                                                <div className="flex items-center h-5">
                                                    <input id="hs-table-pagination-checkbox-all" disabled type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
                                                    <label htmlFor="hs-table-pagination-checkbox-all" className="sr-only">Checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">CDP</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">date entry</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Alive in</th>
                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {prisoners?.map((prisoner,key) => {
                                            return <tr key={key}>
                                                <td className="py-3 ps-4">
                                                    <div className="flex items-center h-5">
                                                        <input id="hs-table-pagination-checkbox-1" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
                                                        <label htmlFor="hs-table-pagination-checkbox-1" className="sr-only">Checkbox</label>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                                    <div className="flex items-center ">
                                                        <img src={`${baseUrl+"/storage/"+prisoner?.image}`} className="w-auto h-8 mr-2"/>
                                                        <span className="mr-3">{prisoner?.fullName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{prisoner?.CDP}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{prisoner?.dateOfEntry}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{prisoner?.cellule?.quartier?.name}  ({prisoner?.cellule?.name})</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                    <div className={"flex-auto inline-flex "}>
                                                        <Link href={route('prisoners.edit',prisoner?.id)} method={"get"} as={"button"}>
                                                            <CiEdit  className={"hover:text-yellow-600 text-xl m-1 "}/>
                                                        </Link>
                                                        <Link href={route('prisoners.destroy',prisoner?.id)} method={'post'} as={"button"}>
                                                            <HiOutlineTrash  className={"hover:text-red-600 text-xl m-1"} />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="py-1 px-4">
                                    <nav className="flex items-center space-x-1">
                                        <button type="button" className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                            <span aria-hidden="true">«</span>
                                            <span className="sr-only">Previous</span>
                                        </button>
                                        <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10" aria-current="page">1</button>
                                        <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10">2</button>
                                        <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10">3</button>
                                        <button type="button" className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                            <span className="sr-only">Next</span>
                                            <span aria-hidden="true">»</span>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Authenticated>
    );
}

export default Index;
