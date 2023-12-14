import {Button, Modal} from "flowbite-react";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {router} from "@inertiajs/react";

function QuartierModalForm({openModal,setOpenModal,isUpdate,setIsUpdate,quartiers,employees}) {
    const {reset,register,handleSubmit,setValue,formState:{errors}} = useForm()
    const [chefQuartierId, setChefQuartierId] = useState(0)
    useEffect( () => {
        if (isUpdate.status === true){
            const id = isUpdate.id
            const data = quartiers.find(quartie => quartie.id === id)
            setValue('name',data.name)
            setValue('nombreDeCellule',data.nombreDeCellule)
            setValue('chefQuartier_id',data.chef_quartier.id)

        }
    }, [isUpdate]);
    const storeQuartier = (data) => {
        if (isUpdate.status === true){
            const id = isUpdate.id
            router.patch(`quartier/update/${id}`,data)
            setOpenModal(false)
            setIsUpdate({})
            reset()
        }else{
            router.post(route('quartier.store'),data)
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
                setChefQuartierId(0)
            }}>
                <Modal.Header className={'bg-gray-200'}>{isUpdate.status===true?'Edit quartier':'Create quartier'}</Modal.Header>
                <Modal.Body className={'bg-gray-200'}>
                    <div className="space-y-6">
                        <form onSubmit={handleSubmit(storeQuartier)} >
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="w-full">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input {...register('name',{required:{value:true,message:"this field is required"}})}
                                           type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="nom de quartier" required=""/>
                                    <span className={"text-red-600"}>{errors?.name && errors.name.message}</span>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="nombreDeCellule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de cellule</label>
                                    <input {...register('nombreDeCellule',{required:{value:true,message:"this field is required"}})}
                                           type="text" name="nombreDeCellule" id="nombreDeCellule" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="nombre des cellules dans le quartier" required=""/>
                                    <span className={"text-red-600"}>{errors?.nombreDeCellule && errors.nombreDeCellule.message}</span>
                                </div>
                                <div>
                                    <label htmlFor="chefQuartier_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chef de quartier</label>
                                    <select {...register('chefQuartier_id',{required:{value:true,message:"this field is required"}})} defaultValue={""}
                                        id="chefQuartier_id" name="chefQuartier_id"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value={""}>Select chef quartie</option>
                                        {employees?.map((em,key) => {
                                            return <option  key={key} value={em.id}>{em.fullName}</option>
                                        })}
                                    </select>
                                    <span className={"text-red-600"}>{errors?.chefQuartier_id && errors.chefQuartier_id.message}</span>
                                </div>

                            </div>
                            <button type="submit" className="inline-flex items-center m-1 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-white hover:text-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800">
                                {isUpdate.status === true ? 'Edit':'Create'} Quartier
                            </button>
                            <button onClick={()=>{
                                setOpenModal(false)
                                setIsUpdate({})
                                reset()
                                setChefQuartierId(0)
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

export default QuartierModalForm;
