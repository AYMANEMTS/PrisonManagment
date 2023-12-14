import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";
import Dropdown from "@/Components/Dropdown.jsx";
function Index({employees,message}) {
    console.log(employees)

    const [selectedItems, setSelectedItems] = useState([])
    const [dropdownStatus, setDropdownStatus] = useState(false)
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
    const deleteEmployees = async (e) => {
        e.preventDefault()
        await router.post(route('employees.destroy'),{ids:selectedItems})
    }

    return (
        <Authenticated>
            <section className=" py-3 sm:py-5">
                <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
                    <h1 className={"text-2xl text-black my-3 "}>List Employees :</h1>
                    {message &&
                        <div
                            className="mb-4 rounded-lg bg-green-300 px-6 py-5 text-base text-success-700"
                            role="alert">
                            {message}
                        </div>
                    }
                    <div className="relative overflow-hidden bg-white text-black shadow-md  sm:rounded-lg">
                        <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                            <div className="flex items-center flex-1 space-x-4">
                                <h5>
                                    <span className="text-gray-500">All Employees:</span>
                                    <span className="text-black">   {employees?.length}</span>
                                </h5>
                            </div>
                            <div className="flex flex-col text-black flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                                <Link href={route('employees.create')} className="flex items-center justify-center px-4 py-2 text-sm font-medium  rounded-lg text-gray-900 bg-white border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Add new Employee
                                </Link>




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
                                        <Dropdown.Link onClick={deleteEmployees} className={"hover:bg-red-300 "}>delete</Dropdown.Link>

                                    </Dropdown.Content>
                                </Dropdown>




                            </div>

                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-all" type="checkbox" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-4 py-3">Image</th>
                                    <th scope="col" className="px-4 py-3">Name</th>
                                    <th scope="col" className="px-4 py-3">CNN</th>
                                    <th scope="col" className="px-4 py-3">CDW</th>
                                    <th scope="col" className="px-4 py-3">Phone</th>
                                    <th scope="col" className="px-4 py-3">Email</th>
                                    <th scope="col" className="px-4 py-3">Date birthday</th>
                                    <th scope="col" className="px-4 py-3">Grade</th>
                                    <th scope="col" className="px-4 py-3">Gender</th>
                                </tr>
                                </thead>
                                <tbody>
                                {employees?.map((employe,key) => {
                                    return (
                                        <tr key={key} className="border-b dark:border-gray-600 hover:bg-gray-100  dark:hover:bg-gray-700 dark:text-white">
                                            <td className="w-4 px-4 py-3">
                                                <div className="flex items-center">
                                                    <input type="checkbox" checked={ selectedItems.includes( employe.id ) } value={employe.id} onChange={checkboxHandler}
                                                          disabled={employe?.id === 1}     className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <img src={'http://127.0.0.1:8000/storage/'+employe?.image}  className="w-auto h-9 mr-2"/>
                                            </th>
                                            <td className="px-4 py-2">
                                                <span className="bg-primary-100 text-black text-xs  font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{employe?.fullName}</span>
                                            </td>
                                            <td className="px-4 py-2 font-medium text-black whitespace-nowrap ">
                                                <div className="flex items-center text-black">
                                                    {employe?.CNN}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 font-medium text-black whitespace-nowrap ">
                                                {employe?.CDW}
                                            </td>
                                            <td className="px-4 py-2 font-medium text-black whitespace-nowrap ">{employe?.phone}</td>
                                            <td className="px-4 py-2 font-medium text-black whitespace-nowrap ">
                                                {employe?.email}
                                            </td>
                                            <td className="px-4 py-2 font-medium text-black whitespace-nowrap ">
                                                {employe?.dateBirthday}
                                            </td>
                                            <td className="px-4 py-2 font-medium text-black  whitespace-nowrap">
                                                {employe?.grade?.name}
                                            </td>
                                            <td className="px-4 py-2 font-medium text-black  whitespace-nowrap ">
                                                {employe?.gender}
                                            </td>
                                        </tr>

                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              Showing
                              <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                              of
                              <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                          </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Next</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"     clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}

export default Index;
