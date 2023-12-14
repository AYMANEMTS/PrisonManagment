import { Modal} from "flowbite-react";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {router} from "@inertiajs/react";

function CelluleModalForm({openModal,setOpenModal,isUpdate,setIsUpdate,cellules,quartiers,employees}) {
    const {reset,register,handleSubmit,setValue,formState:{errors}} = useForm()
    useEffect( () => {
        if (isUpdate.status === true){
            const id = isUpdate.id
            const data = cellules.find(cellule => cellule.id === id)
                setValue('name',data.name)
                setValue('CapacityTotal',data.CapacityTotal)
                setValue('CapacityDisponible',data.CapacityDisponible)
                setValue('quartier_id',data.quartier_id)
        }
    }, [isUpdate]);
    const storeCellule = (data) => {
        if (isUpdate.status === true){
            const id = isUpdate.id
            router.patch(`cellule/update/${id}`,data)
            setOpenModal(false)
            setIsUpdate({})
            reset()
        }else{
            router.post(route('cellule.store'),data)
            setOpenModal(false)
            reset()
        }
    }
    return (
        <>
            <Modal className={"backdrop-blur-sm bg-black/30 "} show={openModal} onClose={() => {
                setOpenModal(false)
                setIsUpdate({})
                reset()
            }}>
                <Modal.Header className={'bg-gray-200'}>{isUpdate.status===true?'Edit ':'Create '}Cellule</Modal.Header>
                <Modal.Body className={'bg-gray-200'}>
                    <div className="space-y-6">
                        <form onSubmit={handleSubmit(storeCellule)} >
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="w-full">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input {...register('name',{required:{value:true,message:"this field is required"}})}
                                           type="number" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="nom de quartier" required=""/>
                                    <span className={"text-red-600"}>{errors?.name && errors.name.message}</span>
                                </div>
                                <div>
                                    <label htmlFor="CapacityTotal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacity total</label>
                                    <input {...register('CapacityTotal',{required:{value:true,message:"this field is required"}})}
                                           type="number" name="CapacityTotal" id="CapacityTotal" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Capacity total de quartier" required=""/>
                                    <span className={"text-red-600"}>{errors?.CapacityTotal && errors.CapacityTotal.message}</span>
                                </div>
                                <div>
                                    <label htmlFor="quartier_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quartier</label>
                                    <select defaultValue={""}  {...register('quartier_id',{required:true})}
                                            id="quartier_id" name="quartier_id"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value={""}>select quartier</option>
                                        {quartiers?.map((qrt,key) => {
                                            return <option key={key} value={qrt.id}>{qrt.name}</option>
                                        })}
                                    </select>
                                    {/*<span className={"text-red-600"}>{errors?.grade && errors.grade}</span>*/}
                                </div>

                            </div>
                            <button type="submit" className="inline-flex items-center m-1 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-white hover:text-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800">
                                {isUpdate.status === true ? 'Edit':'Create'} Quartier
                            </button>
                            <button onClick={()=>{
                                setOpenModal(false)
                                setIsUpdate({})
                                reset()
                            }} type="button" className="inline-flex items-center m-1 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800">
                                cancel
                            </button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CelluleModalForm;
