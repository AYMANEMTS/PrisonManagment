import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";

function Form() {
    const {data,setData,
        errors,processing, post} = useForm({
        name: "",
    })
    return (
        <>
           <h1>Add new grade : </h1>
           <form>
               <InputLabel>Name</InputLabel>
               <TextInput />
           </form>
        </>
    );
}

export default Form;
