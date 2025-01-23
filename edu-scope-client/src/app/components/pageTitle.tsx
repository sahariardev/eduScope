import {useHeaderStore} from "@/app/hooks/useHeaderStore";

export default function PageTitle() {
    const {headerName} = useHeaderStore();
    return <h1 className="text-2xl font-bold mb-4">{headerName}</h1>
}