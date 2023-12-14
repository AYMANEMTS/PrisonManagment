import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";

export default function Index({auth}) {
    return (
        <Authenticated user={auth.user} >
            hello dashboard
        </Authenticated>
    );
}

