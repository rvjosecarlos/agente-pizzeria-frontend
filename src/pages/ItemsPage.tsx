import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";
import FormNewItem from "../components/FormNewItem";
import TopTitleBar from "../components/TopTitleBar";
import { getItems } from "../api/itemsAPI";

export default function ItemsPage(){
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["items"],
        queryFn: getItems
    });

    if(isPending) return <div className="ml-56 h-screen flex justify-center items-center"><MoonLoader color="#36d7b7"/></div>;
    if(isError) return <div className="ml-56 h-screen flex justify-center items-center"><p>{error.message}</p></div>

    return(
        <div className="p-10 ml-56">
            <TopTitleBar title="Items" description="Catálogo de la pizzería"/>
            <div>
                <FormNewItem />
            </div>
            <div className="grid grid-1 w-1/2">
                <div className="flex w-full py-4 px-2 justify-evenly text-sm">
                    <p className="w-full font-semibold text-gray-500">Nombre</p>
                    <p className="w-32 font-semibold text-gray-500">Tamaño</p>
                    <p className="w-32 font-semibold text-gray-500">Precio</p>
                </div>
                <div className="space-y-1">
                    {
                        data.map( (item, index) => 
                            <div 
                                key={item.id} 
                                className={`flex w-full py-3 px-2 justify-evenly text-sm rounded-lg border border-amber-200 ${ index%2 === 0 ? "bg-white" : "bg-amber-100" }`}
                            >
                                <p className="w-full font-bold">{item.name}</p>
                                <p className="w-32">{item.size}</p>
                                <p className="w-32">{item.precio}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};