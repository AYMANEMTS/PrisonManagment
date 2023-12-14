import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import { Accordion } from 'flowbite-react';

function Appels({appels}) {
    console.log(appels)
    return (
        <Authenticated>
            <div className={"px-3 py-3"}>
                <div className={"grid gap-4"}>
                    <Accordion alwaysOpen={false}>
                        {appels?.map((appel,key) => {
                            return  <Accordion.Panel alwaysOpen={false} key={key} >
                                    <Accordion.Title >Appel de {appel?.time} cellule ({appel.cellule_id})</Accordion.Title>
                                    <Accordion.Content >
                                        <form>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Nombre de Prison:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="border rounded w-full py-2 px-3"

                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Remarque:
                                                </label>
                                                <textarea
                                                    className="border rounded w-full py-2 px-3"

                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    </Accordion.Content>
                                </Accordion.Panel>

                        })}
                    </Accordion>
                </div>
            </div>
        </Authenticated>
    );
}

export default Appels;
