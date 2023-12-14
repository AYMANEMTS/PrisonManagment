import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Link, useForm} from "@inertiajs/react";
import {Loader} from "lucide-react";

function Form({quartiers,cellules:celllesApi,prisonerEdit,isUpdate}) {
    const {data,setData,
        errors,processing, post,patch} = useForm({
        fullName: prisonerEdit?.fullName,
        address:prisonerEdit?.address,
        CNN:prisonerEdit?.CNN,
        dateBirthday:prisonerEdit?.dateBirthday,
        cellule_id:prisonerEdit?.cellule_id,
        status:prisonerEdit?.status,
        maladies:prisonerEdit?.maladies,
        dateOfEntry:prisonerEdit?.dateOfEntry,
        crime:prisonerEdit?.crime,
        contactEmergency:prisonerEdit?.contactEmergency,
        image:prisonerEdit?.image||null,
        dateOfSortie:prisonerEdit?.dateOfSortie,
        quartier_id:prisonerEdit?.cellule?.quartier?.id,
        gender:prisonerEdit?.gender,
    })
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setData(values => ({
            ...values,
            [key]: value,
        }))
    }
    const handlleSubmit = (e) => {
        e.preventDefault()
        if (isUpdate){
            post(`http://127.0.0.1:8000/prisoners/update/${prisonerEdit?.id}`,{
                data:data,
                forceFormData:true
            })
        }else{
            post(route("prisoners.store",data),{
                forceFormData: true,
            })
        }
    }
    const loadFile = (e) => {
        var input = event.target;
        var file = input.files[0];
        var type = file.type;
        var output = document.getElementById('preview_img');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
            URL.revokeObjectURL(output.src) // free memory
        }
    }

    return (
        <Authenticated>

            <section className="bg-white dark:bg-gray-900">
                <div className="  ml-20 max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{isUpdate?'Edit ':'Add a new '} prisoner</h2>
                    <form onSubmit={handlleSubmit} method={"post"}  >
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name </label>
                                <input onChange={handleChange} defaultValue={data.fullName}
                                       type="text" name="fullName" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="prisoner name" required=""/>
                                <span className={"text-red-600"}>{errors?.fullName && errors.fullName}</span>
                            </div>
                            <div className="w-full">
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input onChange={handleChange} defaultValue={data?.address}
                                       type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="prisoner address" required=""/>
                                <span className={"text-red-600"}>{errors?.address && errors.address}</span>
                            </div>
                            <div className="w-full">
                                <label htmlFor="CNN" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CNN</label>
                                <input onChange={handleChange} defaultValue={data?.CNN}
                                       type="text" name="CNN" id="CNN" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="code cart national" required=""/>
                                <span className={"text-red-600"}>{errors?.CNN && errors.CNN}</span>
                            </div>
                            <div className="w-full">
                                <label htmlFor="dateBirthday" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of birthday</label>
                                <input onChange={handleChange} defaultValue={data.dateBirthday}
                                       type="date" name="dateBirthday" id="dateBirthday" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="00/00/0000" required=""/>
                                <span className={"text-red-600"}>{errors?.dateBirthday && errors.dateBirthday}</span>
                            </div>
                            <div>
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <input onChange={handleChange} defaultValue={data?.status}
                                       type="text" name="status" id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="prisoner status" required=""/>
                                <span className={"text-red-600"}>{errors?.status && errors.status}</span>
                            </div>
                            <div>
                                <label htmlFor="maladies" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maladies</label>
                                <input onChange={handleChange} defaultValue={data?.maladies}
                                       type="text" name="maladies" id="maladies" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="maladies: ...." required=""/>
                                <span className={"text-red-600"}>{errors?.maladies && errors.maladies}</span>
                            </div>
                            <div className="w-full">
                                <label htmlFor="dateOfEntry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of entry</label>
                                <input onChange={handleChange} defaultValue={data?.dateOfEntry}
                                       type="date" name="dateOfEntry" id="dateOfEntry" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required=""/>
                                <span className={"text-red-600"}>{errors?.dateOfEntry && errors.dateOfEntry}</span>
                            </div>
                            <div className="w-full">
                                <label htmlFor="crime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Crime</label>
                                <input onChange={handleChange} defaultValue={data?.crime}
                                       type="text" name="crime" id="crime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder={"crime"} required=""/>
                                <span className={"text-red-600"}>{errors?.crime && errors.crime}</span>
                            </div>
                            <div>
                                <label htmlFor="quartier_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quartier </label>
                                <select onChange={handleChange} value={data.quartier_id}
                                        id="quartier_id" name="quartier_id"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option selected value={""}>select quartier</option>
                                    {quartiers?.map((quarter,key) => {
                                        return <option key={key} value={quarter.id}>{quarter.name}</option>
                                    } )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="grade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cellule </label>
                                <select placeholder={"select cellule"} onChange={handleChange} value={data.cellule_id}
                                        id="cellule_id" name="cellule_id" defaultValue={""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value={""}>  </option>
                                    {celllesApi.filter((cellule) => cellule.quartier_id === parseInt(data.quartier_id))
                                        .map((filtredCelule,key) => (
                                            <option key={key} value={filtredCelule.id}>{filtredCelule.name}</option>
                                        ) )
                                    }
                                </select>
                                <span className={"text-red-600"}>{errors?.cellule_id && errors.cellule_id}</span>
                            </div>
                            <div>
                                <label htmlFor="contactEmergency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact emergency</label>
                                <input onChange={handleChange} value={data?.contactEmergency}
                                       type="text" name="contactEmergency" id="contactEmergency" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder={"contact emergency"} required=""/>
                                <span className={"text-red-600"}>{errors?.contactEmergency && errors.contactEmergency}</span>
                            </div>
                            <div>
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <select  onChange={handleChange} value={data?.gender}
                                        id="gender" name="gender"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value={""}>Select gender</option>
                                    <option value={"men"}>Men</option>
                                    <option value={"women"}>Women</option>
                                </select>
                                <span className={"text-red-600"}>{errors?.gender && errors.gender}</span>
                            </div>
                            <div className="w-full">
                                <label htmlFor="dateOfSortie" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of sorty</label>
                                <input onChange={handleChange} value={data?.dateOfSortie}
                                       type="date" name="dateOfSortie" id="dateOfSortie" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required=""/>
                                <span className={"text-red-600"}>{errors?.dateOfSortie && errors.dateOfSortie}</span>
                            </div>
                            <div className="w-full">
                                <div className="flex items-center space-x-6">
                                    <div className="shrink-0">
                                        <img id='preview_img' className="h-16 w-16 object-cover rounded-full"
                                             src={data?.image === null?'data:image/png;base64,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'
                                            :'http://127.0.0.1:8000/storage/'+prisonerEdit?.image} alt="Current profile photo" />
                                    </div>
                                    <label className="block">
                                        <span className="sr-only">Choose profile photo</span>
                                        <input type="file" onChange={e => {
                                            setData('image', e.target.files[0])
                                            loadFile()
                                        }} id={"image"} name={"image"}
                                               className="block w-full text-sm text-slate-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-violet-50 file:text-violet-700
                                                hover:file:bg-violet-100"/>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button disabled={processing} type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800">
                            {processing && <Loader className={"my-2 mx-2 animate-spin"} />}{" "} {isUpdate?'Update':'Create'}
                        </button>
                        <Link href={route('prisoners.index')} className="inline-flex items-center ml-1 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800">
                            Cancel
                        </Link>
                    </form>
                </div>
            </section>
        </Authenticated>
    );
}

export default Form;
