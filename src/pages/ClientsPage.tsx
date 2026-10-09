import { useQuery } from "@tanstack/react-query";
import z from "zod";
import TopTitleBar from "../components/TopTitleBar";
import { getClients } from "../api/clientsAPI";
import type { ClientSchema } from "../types";
import { MoonLoader } from "react-spinners";

export type Client = z.infer<typeof ClientSchema>;

export default function ClientsPage(){
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["clientes"],
        queryFn: getClients
    });

    if(isPending) return <div className="ml-56 h-screen flex justify-center items-center"><MoonLoader color="#36d7b7"/></div>;
    if(isError) return <div className="ml-56 h-screen flex justify-center items-center"><p>{error.message}</p></div>

    if(data) return(
        <div className="p-10 ml-56">
            <TopTitleBar title="Clientes" description="Lista de clientes"/>
            <div className="grid grid-1 w-1/2">
                <div className="flex w-full py-4 px-2 justify-evenly text-sm">
                    <p className="w-full font-semibold text-gray-500">Nombre</p>
                    <p className="w-32 font-semibold text-gray-500">Teléfono</p>
                </div>
                <div className="space-y-1">
                {
                    data.map( (client, index) => 
                        <div 
                            key={client.id} 
                            className={`flex w-full py-3 px-2 justify-evenly text-sm rounded-lg border border-amber-200 ${ index%2 === 0 ? "bg-white" : "bg-amber-100" }`}
                        >
                            <p className="w-full font-bold">{client.name}</p>
                            <p className="w-32">{client.phone}</p>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}