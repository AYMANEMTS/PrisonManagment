import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {router , Link} from "@inertiajs/react";

function GradeForm({data,updateGradeId,gradeForm,setUpdateGradeId,setGradeForm}) {
    const {register,handleSubmit,reset,setValue,formState:{errors,isSubmitting}} = useForm()
    useEffect(() => {
        setValue('name',data)
    }, [data]);
    const storeGrade = async (data) => {
        if (updateGradeId !== undefined){
            router.patch('grade/update/'+updateGradeId,{
                name:data.name
            })
            reset()
            setUpdateGradeId(undefined)
            setGradeForm(false)

        }else{
            router.post(route('grade.store'),data)
            reset()
            setGradeForm(false)

        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(storeGrade)} className={`${gradeForm?'':'hidden'}`}>
                <InputLabel>Name {errors.name && <span className={"text-red-500"}>{errors.name.message}</span>}</InputLabel>
                <TextInput {...register('name',{
                    required:{value:true,message:'the name field is required'}
                })}  className={"h-8 mr-1"}/>

                <SecondaryButton disabled={isSubmitting} type={"submit"} className={"h-8"}>
                    {updateGradeId === undefined ? 'Create':'Update'}
                </SecondaryButton>
                {updateGradeId === undefined ? '':(
                    <SecondaryButton  type={"button"}
                          className={"h-8 bg-gray-500 text-white hover:bg-gray-700"}>
                        <Link href={route("settings.index")}  >Cancel</Link>
                    </SecondaryButton>
                )}
            </form>
        </>
    );
}

export default GradeForm;
